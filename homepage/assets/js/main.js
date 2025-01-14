let e = JSON.parse('{"id": 1,"poem_sent1": "古人无复洛城东， 今人还对落花风。","poem_sent2": "年年岁岁花相似， 岁岁年年人不同。","from": "代悲白头翁","from_who": "刘希夷"}')

document.getElementById("description").innerHTML = e.poem_sent1 + "<br/>" + e.poem_sent2 + "<br/> -「<strong>" + e.from + "</strong>」";
