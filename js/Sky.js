/**
 * Created by Machenike on 2018/5/10.
 */
(function (w) {
    /*
     * constructor { Sky } 绘制天空的构造函数
     * param { ctx: Context } 绘制环境
     * param { img: Image } 图片资源
     * param { speed: number } 图片移动速度
     * */
    function Sky(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;

        this.width = this.img.width;

        Sky.len++;

        //设置天空的起点x，y坐标
        this.x = this.width * (Sky.len - 1);
        this.y = 0;
    }

    //给原型添加静态成员
    Sky.len = 0;

    //给原型添加成员
    Sky.prototype = {
        constructor: Sky,
        //绘制天空
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        //更新下一帧绘制的数据
        update: function () {
            this.x -= this.speed;
            this.x = this.x < -this.width ? this.x + this.width * Sky.len : this.x;
        }
    };

    w.getSky = function (ctx, img, speed) {
        return new Sky(ctx, img, speed);
    }
}(window));