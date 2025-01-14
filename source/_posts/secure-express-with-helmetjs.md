---
title: Secure Express apps with HelmetJS
date: 2022-04-19 02:37:07
tags: [Front-end, Programming, Express]
---





In this article, We introduce HelmetJS to secure Express apps. 

<!-- more -->


## Information Security with HelmetJS

HelmetJS is a type of middleware for Express-based applications that automatically sets HTTP headers. This way it can prevent sensitive information from unintentionally being passed between the server and client. You can install it by:

```shell
$ npm install --save-exact helmet@3.21.3
```





### Hide potentially dangerous information using `helmet.hidePoweredBy()`

Hackers can exploit know vulnerabilities in Express/Node if they see that your site is powered by Express. `X-Powered-By: Express` is sent in every request coming from Express by default. You can append the following line to the Express app to remove this header:

```js
app.use(helmet.hidePoweredBy());
```



### Mitigate the risk of clickjacking with `helmet.frameguard()`

Your page could be put in a `<frame>` or `<iframe>` without your consent. This can result in clickjacking attacks, among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained executing your page in a malicious context, by mean of iframing. In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. The middleware `helmet.frameguard()` sets the `X-Frame-Options` header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM. For example: 

```js
app.use(helmet.frameguard({action: 'deny'}));
```



### Mitigate the risk of Cross-site scripting (XSS) attacks with `helmet.xssFilter()`

Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.

The basic rule to lower the risk of an XSS attack is simple: "Never trust user's input". As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. `<`, `>`. 

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers. The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support. 

You can use `app.use(helmet.xssFilter())` to sanitize input sent to your server. 



### Avoid inferring the response MIME type with `helmet.noSniff()`

Browsers can use content or MIME sniffing to override response `Content-Type` headers to guess and process the data using an implicit content type. While this can be convenient in some scenarios, it can also lead to some danguerous attacks. This middleware sets the X-Content-Type-Options header to `nosniff`, instructing the browser to not bypass the provided `Content-Type`. This can be done with the `app.use(helmet.noSniff())` method. 



### Prevent IE from opening untrusted HTML with `helmet.ieNoOpen()`

Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site's context. This can be done by adding `app.use(helmet.ieNoOpen())`. 



### Ask browsers to access your site via HTTPs only with `helmet.hsts()`

HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. If your website can be accessed via HTTPs you can ask user's browsers to avoid using insecure HTTP. By setting the header Strict-Transport-Security, you tell the browsers to use HTTPs for the future requests in a specified amount of time. This will work for the requests coming after the initial request. 

For example, you can configure `helmet.hsts()` to use HTTPs for the next 90 days by passing the config object `{maxAge: 90*24*60*60, force: true}`



### Disable DNS prefetching with `helmet.dnsPrefetchControl()`

To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people...), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs, you can disable DNS prefetching, at the cost of a performance penalty. This can be done by adding `app.use(helmet.dnsPrefetchControl())` method on your server. 



### Disable client-side caching with `helmet.noCache()`

If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client's browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need. You can use `app.use(helmet.noCache())` to disable caching. 



### Set a content security policy with `helmet.contentSecurityPolicy()`

By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more. CSP works by defining an allowed list of content sources which are trusted. You can configure them for each kind of resource a web page may need (scripts, stylessheets, fonts, frames, media, and so on...). There are multiple directives available, so a website owner can have a granular control. See HTML 5 Rocks, KeyCDN for more details. Unfortunately CSP is unsupported by older browser. 

By default, directives are wide open, so it's important to set the defaultSrc directive as a fallback. Helmet supports both defaultsSrc and default-src naming styles. The fallback applies for most of the unspecified directives. 

For example, you can use `helmet.contentSecurityPolicy()` and configure it by adding a `directives` object. In the object, set the `defaultSrc` to `["'self'"]` (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the `scriptSrc` directive so that you only allow scripts to be downloaded from your website (`'self'`), and from the domain `'trusted-cdn.com'`. For example: 

```js
app.use(helmet.contentSecurityPolicy({ 
    directives: { 
        defaultSrc: ["'self'"], 
        scriptSrc : ["'self'", "trusted-cdn.com"] 
    }
}));
```



Hint: in the `'self'` keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working. 





### Configure Helmet using the `parent` helmet() middleware

`app.use(helmet())` will automatically include all the middleware introduced above, except `noCache()`, and `contentSecurityPolicy()`, but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object. For example: 

```js
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
```





### Understand BCrypt hashes

BCrypt hashes are very secure. BCrypt hashes will always looks like `$2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm` which does have a structure. The first small bit of data `$2a` is defining what kind of hash algorithm was used. The next portion `$13` defines the cost. Cost is about how much power it takes to compute the hash. It is on a logarithmic scale of `2^cost` and determines how many times the data is put through the hashing algorithm. For example, at a cost of 10, you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash, at a cost of 31 it would takes multiple days to complete a hash. A cost of 12 is considered very secure at this time. The last portion of your hash is actually two separate pieces of information. The first 22 characters is the salt in plain text, and the rest is the hashed data. 

As hashing is designed to be computationally intensive, it is recommended to do so asynchronously on your server as to avoid blocking incoming connections while you hash. All you have to do to hash a password asynchronous is call:

```js
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  /*Store hash in your db*/
});
```



Now when you need to figure out if a new input is the same data as the hash you would just use the compare function:

```js
bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
  /*res == true or false*/
});
```



Hashing synchronously is just as easy to do but can cause lag if using it server side with a high cost or with hashing done very often. Hashing with this method is as easy as calling: 

```js
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

var result = bcrypt.compareSync(myPlaintextPassword, hash);
```



### Sources:

1. [freeCodeCamp](https://www.freecodecamp.org)

   