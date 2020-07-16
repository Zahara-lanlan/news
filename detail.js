const detailDataList = require("./data/data.json");
const fs = require("fs");
const cheerio = require("cheerio");
module.exports = (id) => {
    console.log(id)
  const template = fs.readFileSync('./views/detail.html');
  const $ = cheerio.load(template);
  const dataList = getItemListId(id);
//   console.log($)
  $('.text').html(getCrearteDetailList(dataList))
  return $.html()
  

};
function getCrearteDetailList(dataList){
    // console.log(dataList)
    return `<h1 class="title">${dataList.title}</h1>
    <div class="article-info">${dataList.newTime}</div>
    <p class="content">
    ${dataList.title}
    </p>`
}
function getItemListId(id){
    return detailDataList.find(item=>item.id === id )

}