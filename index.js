const http = require("http");
const fs = require("fs");
const mime = require('./data/mime.json')
const path = require("path")
const url = require("url")
// const data = require("./data/data.json")
const news = require("./news")
// console.log(data);

const server = http.createServer((req, res) => {
    const {pathname,query}= url.parse(req.url,true)
    // console.log(urlInfo)
  res.setHeader("content-type","charset:utf-8")
    if(pathname === '/'){
        // const readFile = fs.readFileSync('./views/news.html')
        // console.log(query)
        const p = +query.p
        res.end(news(p))
    }else{
        //引入css
        const extname = path.extname(req.url);
        const mimeType = mime[extname];
        res.setHeader("content-type",`${mimeType};charset:utf-8`)
        const css = fs.readFileSync('./static/css/style.css')
        res.end(css)
    }
});
server.listen(3000);
