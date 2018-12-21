/**
 * Created by Machenike on 2018/5/10.
 */
var util = {
    //混入式继承（copy继承）
    extend: function ( o1, o2 ) {
        for(var key in o2 ){
            if(o2.hasOwnProperty(key)){
                o1[key] = o2[key];
            }
        }
    },
    /*
    * constructor { loadImg } 加载图片资源的构造函数
    * param { img: ImgObj } 以键值对的形式存储图片资源
    * param { fn: Function } 图片加载完毕的时候调用回调函数并返回图片
    * */
    loadImg: function ( imgUrl, fn ) {
        var imgObj = {};
        var tempImg,loaded = 0,imgLeng = 0;
        for( var key in imgUrl ){
            imgLeng++;
            tempImg = new Image();
            tempImg.onload = function () {
                loaded++;
                if(loaded >= imgLeng){
                    fn(imgObj);
                }
            };
            tempImg.setAttribute('src',imgUrl[key]);
            imgObj[key] = tempImg;
        }
    }
};