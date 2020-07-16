const fs = require("fs");
const newsDataList = require("./data/data.json");
const cheerio = require("cheerio");   //引入该模块后能够像使用jquery一样操作文本
let currentPage;
const pageSize = 5;
module.exports = (p) => {
    currentPage = p||1;
  const template = fs.readFileSync('./views/news.html')
  const $ = cheerio.load(template)

  // return template
//   createNewsListInnerHtml();
 $('.news-list').html(createNewsListInnerHtml())
  //拿到每一条新闻之后进行渲染
//   return result
$('.pagination').html(createPagination())
return $.html()
};

//生成每一条新闻
const creatNewsItemHtml = (itemData,index) => {
    console.log(index)
  return `  <li class="news">
    <a href="javascript:;">
        <img src="${itemData.imgUrl}" alt="">
    </a>
    <div>
        <h3>
            <a href="/detail?p=${index}">${itemData.title}</a>
        </h3>
        <div class="info">
            <span class="tips"><span>${itemData.from}</span></span>
            <!-- <span class="line"></span> -->
            <span class="time">| &nbsp;&nbsp;${itemData.newTime}</span>
        </div>
    </div>
</li>`;
};
function createNewsListInnerHtml(){
    let result = "";
    let num=0;
    getCurrentPageNewsDataList().forEach((item, index) => {
    //   console.log(item);
      result += creatNewsItemHtml(item,index+1);
      num++;
 //   console.log(result);
    });
    // console.log(result)
    return result;
    
}

function getCurrentPageNewsDataList(){
    const start = currentPage-1;
    const end = start+pageSize
    return newsDataList.slice(start,end)
}
function createPagination(){
    const index = Math.ceil(newsDataList.length/pageSize)
    const pre = Math.max(currentPage-1,1);
    const next = Math.min(currentPage+1 ,index);
    let paginationList = `<a href="?p=${pre}" class="prev">⌜</a>`
    for(let i=1;i<=index;i++){
        paginationList +=` <a href="?p=${i}" class="prev">${i}</a>`
    }
    console.log(paginationList)
    paginationList+=`<a href="?p=${next}" class="next">⌝</a>`
    return paginationList;
}
