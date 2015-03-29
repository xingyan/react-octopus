/**
 * @file 轮播图的例子
 */
;(function() {

  'use strict';

  var NEWS_DATA = [
    {
      "title" : "梅西获金球奖 4连冠成历史第一人",
      "url" : "http:\/\/sports.huanqiu.com\/pictures\/list\/2013-01\/2679090.html",
      "image_url" : "../img/7dd98d1001e939015663bdfa7bec54e737d19694.jpg"
    },{
      "title" : "江西种粮大户给农民发百万年终奖",
      "url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-08\/163662.shtml#nextpage",
      "image_url" : "../img/83025aafa40f4bfb1628ae90034f78f0f636187d.jpg"
    },{
      "title" : "美国前州长和谷歌总裁到达朝鲜",
      "url" : "http:\/\/news.ifeng.com\/photo\/hdnews\/detail_2013_01\/08\/20942777_0.shtml#p=1",
      "image_url" : "../img/d52a2834349b033b15bbce1e15ce36d3d439bdc6.jpg"
    },{
      "title" : "河南市民送廉政锦旗遭政府拒接",
      "url" : "http:\/\/photo.eastday.com\/hdqxb2013\/20130108_3\/index.html",
      "image_url" : "../img/503d269759ee3d6d4903aa0f43166d224e4ade28.jpg"
    },{
      "title" : "越南新娘：望乡路远",
      "url" : "http:\/\/photo.gmw.cn\/2013-01\/07\/content_6285058.htm#Content_Title",
      "image_url" : "../img/69fe41e918e20e3a3fdbf59ac55e43c3.jpg"
    },{
      "title" : "动姐摆\"动车style\"迎蛇年春运",
      "url" : "http:\/\/news.cnwest.com\/content\/2013-01\/07\/content_8186183.htm",
      "image_url" : "../img/fd039245d688d43f9e5b12317d1ed21b0ff43b06.jpg"
    },{
      "title" : "北京地铁10号线成最拥挤线路",
      "url" : "http:\/\/news.xinhuanet.com\/city\/2013-01\/07\/c_124198960.htm",
      "image_url" : "../img/b64543a98226cffc52e93e71b9014a90f703ea36.jpg"
    },{
      "title" : "2013央视蛇年春晚主持群确定",
      "url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-07\/163508.shtml#nextpage",
      "image_url" : "../img/d53f8794a4c27d1ee87296071bd5ad6edcc43898.jpg"
    },{
      "title" : "胡耀邦铜像在浙江大陈岛揭幕",
      "url" : "http:\/\/www.ccdy.cn\/xinwen\/wenhua\/xinwen\/201301\/t20130107_520855.htm",
      "image_url" : "../img/6b923a9fdc7448e1f46b2976f184792e.jpg"
    },{
      "title" : "大雾致成彭高速20多辆车连环追尾",
      "url" : "http:\/\/news.xinmin.cn\/shehui\/2013\/01\/07\/18007771.html",
      "image_url" : "../img/af6a98fd77ed76dc79edb03729d6defb.jpg"
    },{
      "title" : "美国会议员合影 后排4人系PS加入",
      "url" : "http:\/\/world.huanqiu.com\/well_read\/2013-01\/3453672.html",
      "image_url" : "../img/db0e56d2ebb7b3cfc6d55c06ff189b31.jpg"
    },{
      "title" : "江苏太仓窄道两侧建两所豪华公厕",
      "url" : "http:\/\/finance.china.com.cn\/news\/photo\/20130107\/3389.shtml?pic=2",
      "image_url" : "../img/dfeb2bf21bcee6a568748a721ef9f06a.jpg"
    },{
      "title" : "国足队员佩戴红领巾参加校园活动",
      "url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-07\/163447.shtml#nextpage",
      "image_url" : "../img/a9c3b171a058ce86e9418e52bfc69176.jpg"
    },{
      "title" : "山西长治苯胺泄漏 触目惊心",
      "url" : "http:\/\/pic.news.sohu.com\/911195\/911297\/group-406970.shtml#0",
      "image_url" : "../img/a8773912b31bb051dd2a63ea367adab44bede0e2.jpg"
    },{
      "title" : "江苏媒体刊登胡锦涛回乡考察照片",
      "url" : "http:\/\/news.ifeng.com\/photo\/hdnews\/detail_2013_01\/06\/20854266_0.shtml#p=1",
      "image_url" : "../img/29381f30e924b899dda8e4fa6e061d950b7bf658.jpg"
    },{
      "title" : "朝鲜内部一瞥:金正恩领导的朝鲜",
      "url" : "http:\/\/world.gmw.cn\/2013-01\/06\/content_6269998.htm#Content_Title",
      "image_url" : "../img/d62a6059252dd42aa2ccfc69033b5bb5c8eab82f.jpg"
    },{
      "title" : "杭州动物园游客持雪球砸狮子取乐",
      "url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/06\/content_27601301.htm",
      "image_url" : "../img/8326cffc1e178a8283218262f603738da877e8d7.jpg"
    },{
      "title" : "河北邯郸民众因水污染抢购矿泉水",
      "url" : "http:\/\/life.gmw.cn\/2013-01\/06\/content_6264864.htm",
      "image_url" : "../img/37d3d539b6003af3e9e460a2352ac65c1138b692.jpg"
    },{
      "title" : "成都机场大雾 上万名旅客滞留 ",
      "url" : "http:\/\/www.chinanews.com\/tp\/hd2011\/2013\/01-06\/162961.shtml#nextpage",
      "image_url" : "../img/4e4a20a4462309f721e913d0720e0cf3d6cad66a.jpg"
    },{
      "title" : "济南一路段1公里设10组红绿灯",
      "url" : "http:\/\/www.china.com.cn\/photochina\/2013-01\/06\/content_27595674.htm",
      "image_url" : "../img/a8ec8a13632762d0ab03417ea0ec08fa513dc636.jpg"
    },{
      "title" : "特写：奥巴马的2012",
      "url" : "http:\/\/news.xinhuanet.com\/photo\/2013-01\/06\/c_124189526.htm",
      "image_url" : "../img/8cb1cb1349540923f48d2ebc9258d109b2de490f.jpg"
    }
  ];

  var React = require('react');
  var o = require('g-octopus');
  var Slider = require('../../components/slider/slider.react');

  React.render(
    <Slider autoPlay={ true } data={ NEWS_DATA.slice(0, 10) }
      width={ o.dom.getWidth(o.g('slider_container')) } height= { o.dom.getHeight(o.g('slider_container')) }
    />,
    o.g('slider_container')
  );

})();