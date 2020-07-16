const http = require("http");
const fs = require("fs");
const mime = require('./data/mime.json')
const path = require("path")
const url = require("url")
// const data = require("./data/data.json")
const news = require("./news")
const details = require('./detail')

// console.log(data);

const server = http.createServer((req, res) => {
    const {pathname,query}= url.parse(req.url,true)
    console.log("----req.url----",req.url)
    // console.log("----parse(req.url)----",url.parse(req.url,true))
    console.log("---pathname---",pathname);
    console.log("---query---",query)
  res.setHeader("content-type","charset:utf-8")
  const p = +query.p
    if(pathname === '/'){
        // const readFile = fs.readFileSync('./views/news.html')
        // console.log(query)
        res.end(news(p))
    }else if(pathname === '/detail'){
        const detail = fs.readFileSync('./views/detail.html')
        console.log(query)
        // const id = +query.p
        res.end(details(p))
        // res.end(detail);

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
