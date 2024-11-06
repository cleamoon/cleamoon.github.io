if (!window.NexT) window.NexT = {};

(function() {
  const className = 'next-config';

  const staticConfig = {};
  let variableConfig = {};

  const parse = text => JSON.parse(text || '{}');

  const update = name => {
    const targetEle = document.querySelector(`.${className}[data-name="${name}"]`);
    if (!targetEle) return;
    const parsedConfig = parse(targetEle.text);
    if (name === 'main') {
      Object.assign(staticConfig, parsedConfig);
    } else {
      variableConfig[name] = parsedConfig;
    }
  };

  update('main');

  window.CONFIG = new Proxy({}, {
    get(overrideConfig, name) {
      let existing;
      if (name in staticConfig) {
        existing = staticConfig[name];
      } else {
        if (!(name in variableConfig)) update(name);
        existing = variableConfig[name];
      }

      // For unset override and mixable existing
      if (!(name in overrideConfig) && typeof existing === 'object') {
        // Get ready to mix.
        overrideConfig[name] = {};
      }

      if (name in overrideConfig) {
        const override = overrideConfig[name];

        // When mixable
        if (typeof override === 'object' && typeof existing === 'object') {
          // Mix, proxy changes to the override.
          return new Proxy({ ...existing, ...override }, {
            set(target, prop, value) {
              target[prop] = value;
              override[prop] = value;
              return true;
            }
          });
        }

        return override;
      }

      // Only when not mixable and override hasn't been set.
      return existing;
    }
  });

  document.addEventListener('pjax:success', () => {
    variableConfig = {};
  });
})();
;
/* global CONFIG */

window.addEventListener('tabs:register', () => {
  let { activeClass } = CONFIG.comments;
  if (CONFIG.comments.storage) {
    activeClass = localStorage.getItem('comments_active') || activeClass;
  }
  if (activeClass) {
    const activeTab = document.querySelector(`a[href="#comment-${activeClass}"]`);
    if (activeTab) {
      activeTab.click();
    }
  }
});
if (CONFIG.comments.storage) {
  window.addEventListener('tabs:click', event => {
    if (!event.target.matches('.tabs-comment .tab-content .tab-pane')) return;
    const commentClass = event.target.classList[1];
    localStorage.setItem('comments_active', commentClass);
  });
}
;
/* global NexT, CONFIG */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

(function() {
  const onPageLoaded = () => document.dispatchEvent(
    new Event('page:loaded', {
      bubbles: true
    })
  );

  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', onPageLoaded, { once: true });
  } else {
    onPageLoaded();
  }
  document.addEventListener('pjax:success', onPageLoaded);
})();

NexT.utils = {

  registerExtURL() {
    document.querySelectorAll('span.exturl').forEach(element => {
      const link = document.createElement('a');
      // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
      link.href = decodeURIComponent(atob(element.dataset.url).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      link.rel = 'noopener external nofollow noreferrer';
      link.target = '_blank';
      link.className = element.className;
      link.title = element.title;
      link.innerHTML = element.innerHTML;
      element.parentNode.replaceChild(link, element);
    });
  },

  registerCopyButton(target, element, code = '') {
    // One-click copy code support.
    target.insertAdjacentHTML('beforeend', '<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');
    const button = target.querySelector('.copy-btn');
    button.addEventListener('click', () => {
      if (!code) {
        const lines = element.querySelector('.code') || element.querySelector('code');
        code = lines.innerText;
      }
      if (navigator.clipboard) {
        // https://caniuse.com/mdn-api_clipboard_writetext
        navigator.clipboard.writeText(code).then(() => {
          button.querySelector('i').className = 'fa fa-check-circle fa-fw';
        }, () => {
          button.querySelector('i').className = 'fa fa-times-circle fa-fw';
        });
      } else {
        const ta = document.createElement('textarea');
        ta.style.top = window.scrollY + 'px'; // Prevent page scrolling
        ta.style.position = 'absolute';
        ta.style.opacity = '0';
        ta.readOnly = true;
        ta.value = code;
        document.body.append(ta);
        ta.select();
        ta.setSelectionRange(0, code.length);
        ta.readOnly = false;
        const result = document.execCommand('copy');
        button.querySelector('i').className = result ? 'fa fa-check-circle fa-fw' : 'fa fa-times-circle fa-fw';
        ta.blur(); // For iOS
        button.blur();
        document.body.removeChild(ta);
      }
    });
    // If copycode.style is not mac, element is larger than target
    // So we need to accept both of them as parameters
    element.addEventListener('mouseleave', () => {
      setTimeout(() => {
        button.querySelector('i').className = 'fa fa-copy fa-fw';
      }, 300);
    });
  },

  registerCodeblock(element) {
    const inited = !!element;
    let figure;
    if (CONFIG.hljswrap) {
      figure = (inited ? element : document).querySelectorAll('figure.highlight');
    } else {
      figure = document.querySelectorAll('pre');
    }
    figure.forEach(element => {
      // Skip pre > .mermaid for folding and copy button
      if (element.querySelector('.mermaid')) return;
      if (!inited) {
        let span = element.querySelectorAll('.code .line span');
        if (span.length === 0) {
          // Hljs without line_number and wrap
          span = element.querySelectorAll('code.highlight span');
        }
        span.forEach(s => {
          s.classList.forEach(name => {
            s.classList.replace(name, `hljs-${name}`);
          });
        });
      }
      const height = parseInt(window.getComputedStyle(element).height, 10);
      const needFold = CONFIG.fold.enable && (height > CONFIG.fold.height);
      if (!needFold && !CONFIG.copycode.enable) return;
      let target;
      if (CONFIG.hljswrap && CONFIG.copycode.style === 'mac') {
        target = element;
      } else {
        let box = element.querySelector('.code-container');
        if (!box) {
          // https://github.com/next-theme/hexo-theme-next/issues/98
          // https://github.com/next-theme/hexo-theme-next/pull/508
          const container = element.querySelector('.table-container') || element;
          box = document.createElement('div');
          box.className = 'code-container';
          container.wrap(box);

          // add "notranslate" to prevent Google Translate from translating it, which also completely messes up the layout
          box.classList.add('notranslate');
        }
        target = box;
      }
      if (needFold && !target.classList.contains('unfold')) {
        target.classList.add('highlight-fold');
        target.insertAdjacentHTML('beforeend', '<div class="fold-cover"></div><div class="expand-btn"><i class="fa fa-angle-down fa-fw"></i></div>');
        target.querySelector('.expand-btn').addEventListener('click', () => {
          target.classList.remove('highlight-fold');
          target.classList.add('unfold');
        });
      }
      if (!inited && CONFIG.copycode.enable) {
        this.registerCopyButton(target, element);
      }
    });
  },

  wrapTableWithBox() {
    document.querySelectorAll('table').forEach(element => {
      const box = document.createElement('div');
      box.className = 'table-container';
      element.wrap(box);
    });
  },

  registerVideoIframe() {
    document.querySelectorAll('iframe').forEach(element => {
      const supported = [
        'www.youtube.com',
        'player.vimeo.com',
        'player.youku.com',
        'player.bilibili.com',
        'www.tudou.com'
      ].some(host => element.src.includes(host));
      if (supported && !element.parentNode.matches('.video-container')) {
        const box = document.createElement('div');
        box.className = 'video-container';
        element.wrap(box);
        const width = Number(element.width);
        const height = Number(element.height);
        if (width && height) {
          box.style.paddingTop = (height / width * 100) + '%';
        }
      }
    });
  },

  updateActiveNav() {
    if (!Array.isArray(this.sections)) return;
    let index = this.sections.findIndex(element => {
      return element && element.getBoundingClientRect().top > 10;
    });
    if (index === -1) {
      index = this.sections.length - 1;
    } else if (index > 0) {
      index--;
    }
    this.activateNavByIndex(index);
  },

  registerScrollPercent() {
    const backToTop = document.querySelector('.back-to-top');
    const readingProgressBar = document.querySelector('.reading-progress-bar');
    // For init back to top in sidebar if page was scrolled after page refresh.
    window.addEventListener('scroll', () => {
      if (backToTop || readingProgressBar) {
        const contentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;
        if (backToTop) {
          backToTop.classList.toggle('back-to-top-on', Math.round(scrollPercent) >= 5);
          backToTop.querySelector('span').innerText = Math.round(scrollPercent) + '%';
        }
        if (readingProgressBar) {
          readingProgressBar.style.setProperty('--progress', scrollPercent.toFixed(2) + '%');
        }
      }
      this.updateActiveNav();
    }, { passive: true });

    backToTop && backToTop.addEventListener('click', () => {
      window.anime({
        targets  : document.scrollingElement,
        duration : 500,
        easing   : 'linear',
        scrollTop: 0
      });
    });
  },

  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag() {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs ul.nav-tabs .tab').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        // Prevent selected tab to select again.
        if (element.classList.contains('active')) return;
        const nav = element.parentNode;
        // Get the height of `tab-pane` which is activated before, and set it as the height of `tab-content` with extra margin / paddings.
        const tabContent = nav.nextElementSibling;
        tabContent.style.overflow = 'hidden';
        tabContent.style.transition = 'height 1s';
        // Comment system selection tab does not contain .active class.
        const activeTab = tabContent.querySelector('.active') || tabContent.firstElementChild;
        // Hight might be `auto`.
        const prevHeight = parseInt(window.getComputedStyle(activeTab).height, 10) || 0;
        const paddingTop = parseInt(window.getComputedStyle(activeTab).paddingTop, 10);
        const marginBottom = parseInt(window.getComputedStyle(activeTab.firstElementChild).marginBottom, 10);
        tabContent.style.height = prevHeight + paddingTop + marginBottom + 'px';
        // Add & Remove active class on `nav-tabs` & `tab-content`.
        [...nav.children].forEach(target => {
          target.classList.toggle('active', target === element);
        });
        // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
        const tActive = document.getElementById(element.querySelector('a').getAttribute('href').replace('#', ''));
        [...tActive.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === tActive);
        });
        // Trigger event
        tActive.dispatchEvent(new Event('tabs:click', {
          bubbles: true
        }));
        // Get the height of `tab-pane` which is activated now.
        const hasScrollBar = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
        const currHeight = parseInt(window.getComputedStyle(tabContent.querySelector('.active')).height, 10);
        // Reset the height of `tab-content` and see the animation.
        tabContent.style.height = currHeight + paddingTop + marginBottom + 'px';
        // Change the height of `tab-content` may cause scrollbar show / disappear, which may result in the change of the `tab-pane`'s height
        setTimeout(() => {
          if ((document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) !== hasScrollBar) {
            tabContent.style.transition = 'height 0.3s linear';
            // After the animation, we need reset the height of `tab-content` again.
            const currHeightAfterScrollBarChange = parseInt(window.getComputedStyle(tabContent.querySelector('.active')).height, 10);
            tabContent.style.height = currHeightAfterScrollBarChange + paddingTop + marginBottom + 'px';
          }
          // Remove all the inline styles, and let the height be adaptive again.
          setTimeout(() => {
            tabContent.style.transition = '';
            tabContent.style.height = '';
          }, 250);
        }, 1000);
        if (!CONFIG.stickytabs) return;
        const offset = nav.parentNode.getBoundingClientRect().top + window.scrollY + 10;
        window.anime({
          targets  : document.scrollingElement,
          duration : 500,
          easing   : 'linear',
          scrollTop: offset
        });
      });
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

  registerCanIUseTag() {
    // Get responsive height passed from iframe.
    window.addEventListener('message', ({ data }) => {
      if (typeof data === 'string' && data.includes('ciu_embed')) {
        const featureID = data.split(':')[1];
        const height = data.split(':')[2];
        document.querySelector(`iframe[data-feature=${featureID}]`).style.height = parseInt(height, 10) + 5 + 'px';
      }
    }, false);
  },

  registerActiveMenuItem() {
    document.querySelectorAll('.menu-item a[href]').forEach(target => {
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      const isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
      target.classList.toggle('menu-item-active', target.hostname === location.hostname && (isSamePath || isSubPath));
    });
  },

  registerLangSelect() {
    const selects = document.querySelectorAll('.lang-select');
    selects.forEach(sel => {
      sel.value = CONFIG.page.lang;
      sel.addEventListener('change', () => {
        const target = sel.options[sel.selectedIndex];
        document.querySelectorAll('.lang-select-label span').forEach(span => {
          span.innerText = target.text;
        });
        // Disable Pjax to force refresh translation of menu item
        window.location.href = target.dataset.href;
      });
    });
  },

  registerSidebarTOC() {
    this.sections = [...document.querySelectorAll('.post-toc:not(.placeholder-toc) li a.nav-link')].map(element => {
      const target = document.getElementById(decodeURI(element.getAttribute('href')).replace('#', ''));
      // TOC item animation navigate.
      element.addEventListener('click', event => {
        event.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY;
        window.anime({
          targets  : document.scrollingElement,
          duration : 500,
          easing   : 'linear',
          scrollTop: offset,
          complete : () => {
            history.pushState(null, document.title, element.href);
          }
        });
      });
      return target;
    });
    this.updateActiveNav();
  },

  registerPostReward() {
    const button = document.querySelector('.reward-container button');
    if (!button) return;
    button.addEventListener('click', () => {
      document.querySelector('.post-reward').classList.toggle('active');
    });
  },

  activateNavByIndex(index) {
    const nav = document.querySelector('.post-toc:not(.placeholder-toc) .nav');
    if (!nav) return;

    const navItemList = nav.querySelectorAll('.nav-item');
    const target = navItemList[index];
    if (!target || target.classList.contains('active-current')) return;

    const singleHeight = navItemList[navItemList.length - 1].offsetHeight;

    nav.querySelectorAll('.active').forEach(navItem => {
      navItem.classList.remove('active', 'active-current');
    });
    target.classList.add('active', 'active-current');

    let activateEle = target.querySelector('.nav-child') || target.parentElement;
    let navChildHeight = 0;

    while (nav.contains(activateEle)) {
      if (activateEle.classList.contains('nav-item')) {
        activateEle.classList.add('active');
      } else { // .nav-child or .nav
        // scrollHeight isn't reliable for transitioning child items.
        // The last nav-item in a list has a margin-bottom of 5px.
        navChildHeight += (singleHeight * activateEle.childElementCount) + 5;
        activateEle.style.setProperty('--height', `${navChildHeight}px`);
      }
      activateEle = activateEle.parentElement;
    }

    // Scrolling to center active TOC element if TOC content is taller then viewport.
    const tocElement = document.querySelector(CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini' ? '.sidebar-panel-container' : '.sidebar');
    if (!document.querySelector('.sidebar-toc-active')) return;
    window.anime({
      targets  : tocElement,
      duration : 200,
      easing   : 'linear',
      scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
    });
  },

  updateSidebarPosition() {
    if (window.innerWidth < 1200 || CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') return;
    // Expand sidebar on post detail page by default, when post has a toc.
    const hasTOC = document.querySelector('.post-toc:not(.placeholder-toc)');
    let display = CONFIG.page.sidebar;
    if (typeof display !== 'boolean') {
      // There's no definition sidebar in the page front-matter.
      display = CONFIG.sidebar.display === 'always' || (CONFIG.sidebar.display === 'post' && hasTOC);
    }
    if (display) {
      window.dispatchEvent(new Event('sidebar:show'));
    }
  },

  activateSidebarPanel(index) {
    const sidebar = document.querySelector('.sidebar-inner');
    const activeClassNames = ['sidebar-toc-active', 'sidebar-overview-active'];
    if (sidebar.classList.contains(activeClassNames[index])) return;

    const panelContainer = sidebar.querySelector('.sidebar-panel-container');
    const tocPanel = panelContainer.firstElementChild;
    const overviewPanel = panelContainer.lastElementChild;

    let postTOCHeight = tocPanel.scrollHeight;
    // For TOC activation, try to use the animated TOC height
    if (index === 0) {
      const nav = tocPanel.querySelector('.nav');
      if (nav) {
        postTOCHeight = parseInt(nav.style.getPropertyValue('--height'), 10);
      }
    }
    const panelHeights = [
      postTOCHeight,
      overviewPanel.scrollHeight
    ];
    panelContainer.style.setProperty('--inactive-panel-height', `${panelHeights[1 - index]}px`);
    panelContainer.style.setProperty('--active-panel-height', `${panelHeights[index]}px`);

    sidebar.classList.replace(activeClassNames[1 - index], activeClassNames[index]);
  },

  updateFooterPosition() {
    if (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') return;
    function updateFooterPosition() {
      const footer = document.querySelector('.footer');
      const containerHeight = document.querySelector('.main').offsetHeight + footer.offsetHeight;
      footer.classList.toggle('footer-fixed', containerHeight <= window.innerHeight);
    }

    updateFooterPosition();
    window.addEventListener('resize', updateFooterPosition);
    window.addEventListener('scroll', updateFooterPosition, { passive: true });
  },

  getScript(src, options = {}, legacyCondition) {
    if (typeof options === 'function') {
      return this.getScript(src, {
        condition: legacyCondition
      }).then(options);
    }
    const {
      condition = false,
      attributes: {
        id = '',
        async = false,
        defer = false,
        crossOrigin = '',
        dataset = {},
        ...otherAttributes
      } = {},
      parentNode = null
    } = options;
    return new Promise((resolve, reject) => {
      if (condition) {
        resolve();
      } else {
        const script = document.createElement('script');

        if (id) script.id = id;
        if (crossOrigin) script.crossOrigin = crossOrigin;
        script.async = async;
        script.defer = defer;
        Object.assign(script.dataset, dataset);
        Object.entries(otherAttributes).forEach(([name, value]) => {
          script.setAttribute(name, String(value));
        });

        script.onload = resolve;
        script.onerror = reject;

        if (typeof src === 'object') {
          const { url, integrity } = src;
          script.src = url;
          if (integrity) {
            script.integrity = integrity;
            script.crossOrigin = 'anonymous';
          }
        } else {
          script.src = src;
        }
        (parentNode || document.head).appendChild(script);
      }
    });
  },

  loadComments(selector, legacyCallback) {
    if (legacyCallback) {
      return this.loadComments(selector).then(legacyCallback);
    }
    return new Promise(resolve => {
      const element = document.querySelector(selector);
      if (!CONFIG.comments.lazyload || !element) {
        resolve();
        return;
      }
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        resolve();
        observer.disconnect();
      });
      intersectionObserver.observe(element);
    });
  },

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
};
;
/* global NexT, CONFIG */

NexT.motion = {};

NexT.motion.integrator = {
  queue: [],
  init() {
    this.queue = [];
    return this;
  },
  add(fn) {
    const sequence = fn();
    this.queue.push(sequence);
    return this;
  },
  bootstrap() {
    if (!CONFIG.motion.async) this.queue = [this.queue.flat()];
    this.queue.forEach(sequence => {
      const timeline = window.anime.timeline({
        duration: 200,
        easing  : 'linear'
      });
      sequence.forEach(item => {
        if (item.deltaT) timeline.add(item, item.deltaT);
        else timeline.add(item);
      });
    });
  }
};

NexT.motion.middleWares = {
  header() {
    const sequence = [];

    function getMistLineSettings(targets) {
      sequence.push({
        targets,
        scaleX  : [0, 1],
        duration: 500,
        deltaT  : '-=200'
      });
    }

    function pushToSequence(targets, sequenceQueue = false) {
      sequence.push({
        targets,
        opacity: 1,
        top    : 0,
        deltaT : sequenceQueue ? '-=200' : '-=0'
      });
    }

    pushToSequence('.column');
    CONFIG.scheme === 'Mist' && getMistLineSettings('.logo-line');
    CONFIG.scheme === 'Muse' && pushToSequence('.custom-logo-image');
    pushToSequence('.site-title');
    pushToSequence('.site-brand-container .toggle', true);
    pushToSequence('.site-subtitle');
    (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') && pushToSequence('.custom-logo-image');

    const menuItemTransition = CONFIG.motion.transition.menu_item;
    if (menuItemTransition) {
      document.querySelectorAll('.menu-item').forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', menuItemTransition),
          deltaT  : '-=200'
        });
      });
    }

    return sequence;
  },

  subMenu() {
    const subMenuItem = document.querySelectorAll('.sub-menu .menu-item');
    if (subMenuItem.length > 0) {
      subMenuItem.forEach(element => {
        element.classList.add('animated');
      });
    }
    return [];
  },

  postList() {
    const sequence = [];
    const { post_block, post_header, post_body, coll_header } = CONFIG.motion.transition;

    function animate(animation, elements) {
      if (!animation) return;
      elements.forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', animation),
          deltaT  : '-=100'
        });
      });
    }

    document.querySelectorAll('.post-block').forEach(targets => {
      sequence.push({
        targets,
        complete: () => targets.classList.add('animated', post_block),
        deltaT  : '-=100'
      });
      animate(coll_header, targets.querySelectorAll('.collection-header'));
      animate(post_header, targets.querySelectorAll('.post-header'));
      animate(post_body, targets.querySelectorAll('.post-body'));
    });

    animate(post_block, document.querySelectorAll('.pagination, .comments'));

    return sequence;
  },

  sidebar() {
    const sequence = [];
    const sidebar = document.querySelectorAll('.sidebar-inner');
    const sidebarTransition = CONFIG.motion.transition.sidebar;
    // Only for desktop of Pisces | Gemini.
    if (sidebarTransition && (CONFIG.scheme === 'Pisces' || CONFIG.scheme === 'Gemini') && window.innerWidth >= 992) {
      sidebar.forEach(targets => {
        sequence.push({
          targets,
          complete: () => targets.classList.add('animated', sidebarTransition),
          deltaT  : '-=100'
        });
      });
    }
    return sequence;
  },

  footer() {
    return [{
      targets: document.querySelector('.footer'),
      opacity: 1
    }];
  }
};
;
/* global CONFIG */

document.addEventListener('DOMContentLoaded', () => {

  const isRight = CONFIG.sidebar.position === 'right';

  const sidebarToggleMotion = {
    mouse: {},
    init() {
      window.addEventListener('mousedown', this.mousedownHandler.bind(this));
      window.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.querySelector('.sidebar-dimmer').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('click', this.clickHandler.bind(this));
      window.addEventListener('sidebar:show', this.showSidebar);
      window.addEventListener('sidebar:hide', this.hideSidebar);
    },
    mousedownHandler(event) {
      this.mouse.X = event.pageX;
      this.mouse.Y = event.pageY;
    },
    mouseupHandler(event) {
      const deltaX = event.pageX - this.mouse.X;
      const deltaY = event.pageY - this.mouse.Y;
      const clickingBlankPart = Math.hypot(deltaX, deltaY) < 20 && event.target.matches('.main');
      // Fancybox has z-index property, but medium-zoom does not, so the sidebar will overlay the zoomed image.
      if (clickingBlankPart || event.target.matches('img.medium-zoom-image')) {
        this.hideSidebar();
      }
    },
    clickHandler() {
      document.body.classList.contains('sidebar-active') ? this.hideSidebar() : this.showSidebar();
    },
    showSidebar() {
      document.body.classList.add('sidebar-active');
      const animateAction = isRight ? 'fadeInRight' : 'fadeInLeft';
      document.querySelectorAll('.sidebar .animated').forEach((element, index) => {
        element.style.animationDelay = (100 * index) + 'ms';
        element.classList.remove(animateAction);
        setTimeout(() => {
          // Trigger a DOM reflow
          element.classList.add(animateAction);
        });
      });
    },
    hideSidebar() {
      document.body.classList.remove('sidebar-active');
    }
  };
  sidebarToggleMotion.init();
});
;
/* global NexT, CONFIG */

NexT.boot = {};

NexT.boot.registerEvents = function() {

  NexT.utils.registerScrollPercent();
  NexT.utils.registerCanIUseTag();
  NexT.utils.updateFooterPosition();

  // Mobile top menu bar.
  document.querySelector('.site-nav-toggle .toggle').addEventListener('click', event => {
    event.currentTarget.classList.toggle('toggle-close');
    const siteNav = document.querySelector('.site-nav');
    if (!siteNav) return;
    siteNav.style.setProperty('--scroll-height', siteNav.scrollHeight + 'px');
    document.body.classList.toggle('site-nav-on');
  });

  document.querySelectorAll('.sidebar-nav li').forEach((element, index) => {
    element.addEventListener('click', () => {
      NexT.utils.activateSidebarPanel(index);
    });
  });

  window.addEventListener('hashchange', () => {
    const tHash = location.hash;
    if (tHash !== '' && !tHash.match(/%\S{2}/)) {
      const target = document.querySelector(`.tabs ul.nav-tabs li a[href="${tHash}"]`);
      target && target.click();
    }
  });

  window.addEventListener('tabs:click', e => {
    NexT.utils.registerCodeblock(e.target);
  });
};

NexT.boot.refresh = function() {

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
  CONFIG.prism && window.Prism.highlightAll();
  CONFIG.mediumzoom && window.mediumZoom('.post-body :not(a) > img, .post-body > img', {
    background: 'var(--content-bg-color)'
  });
  CONFIG.lazyload && window.lozad('.post-body img').observe();
  CONFIG.pangu && window.pangu.spacingPage();

  CONFIG.exturl && NexT.utils.registerExtURL();
  NexT.utils.wrapTableWithBox();
  NexT.utils.registerCodeblock();
  NexT.utils.registerTabsTag();
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerLangSelect();
  NexT.utils.registerSidebarTOC();
  NexT.utils.registerPostReward();
  NexT.utils.registerVideoIframe();
};

NexT.boot.motion = function() {
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .add(NexT.motion.middleWares.header)
      .add(NexT.motion.middleWares.sidebar)
      .add(NexT.motion.middleWares.postList)
      .add(NexT.motion.middleWares.footer)
      .bootstrap();
  }
  NexT.utils.updateSidebarPosition();
};

document.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
  NexT.boot.motion();
});
;
/* global CONFIG, pjax, LocalSearch */

document.addEventListener('DOMContentLoaded', () => {
  if (!CONFIG.path) {
    // Search DB path
    console.warn('`hexo-generator-searchdb` plugin is not installed!');
    return;
  }
  const localSearch = new LocalSearch({
    path             : CONFIG.path,
    top_n_per_article: CONFIG.localsearch.top_n_per_article,
    unescape         : CONFIG.localsearch.unescape
  });

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');

  const inputEventFunction = () => {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      resultItems = localSearch.getResultItems(keywords);
    }
    if (keywords.length === 1 && keywords[0] === '') {
      container.innerHTML = '<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';
    } else if (resultItems.length === 0) {
      container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount;
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount;
        }
        return right.id - left.id;
      });
      const stats = CONFIG.i18n.hits.replace('${hits}', resultItems.length);

      container.innerHTML = `<div class="search-stats">${stats}</div>
        <hr>
        <ul class="search-result-list">${resultItems.map(result => result.item).join('')}</ul>`;
      if (typeof pjax === 'object') pjax.refresh(container);
    }
  };

  localSearch.highlightSearchWords(document.querySelector('.post-body'));
  if (CONFIG.localsearch.preload) {
    localSearch.fetchData();
  }

  input.addEventListener('input', inputEventFunction);
  window.addEventListener('search:loaded', inputEventFunction);

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      // Wait for search-popup animation to complete
      setTimeout(() => input.focus(), 500);
      if (!localSearch.isfetched) localSearch.fetchData();
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.classList.remove('search-active');
  };

  document.querySelector('.search-pop-overlay').addEventListener('click', event => {
    if (event.target === document.querySelector('.search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('.popup-btn-close').addEventListener('click', onPopupClose);
  document.addEventListener('pjax:success', () => {
    localSearch.highlightSearchWords(document.querySelector('.post-body'));
    onPopupClose();
  });
  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      document.body.classList.add('search-active');
      setTimeout(() => input.focus(), 500);
      if (!localSearch.isfetched) localSearch.fetchData();
    }
  });
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
;
/* global NexT, CONFIG, MathJax */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.enableMath) return;

  if (typeof MathJax === 'undefined') {
    window.MathJax = {
      tex: {
        inlineMath: { '[+]': [['$', '$']] },
        tags      : CONFIG.mathjax.tags
      },
      options: {
        renderActions: {
          insertedScript: [200, () => {
            document.querySelectorAll('mjx-container').forEach(node => {
              const target = node.parentNode;
              if (target.nodeName.toLowerCase() === 'li') {
                target.parentNode.classList.add('has-jax');
              }
            });
          }, '', false]
        }
      }
    };
    NexT.utils.getScript(CONFIG.mathjax.js, {
      attributes: {
        defer: true
      }
    });
  } else {
    MathJax.startup.document.state(0);
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise();
  }
});
