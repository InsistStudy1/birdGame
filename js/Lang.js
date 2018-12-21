/**
 * Created by Machenike on 2018/5/10.
 */
(function (w) {
    /*
     * constructor { Lang } 绘制大地的构造函数
     * param { ctx: Context } 绘制环境
     * param { img: Image } 图片资源
     * param { speed: number } 移动速度
     * */
    function Lang(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;

        //大地的宽高
        this.width = this.img.width;
        this.height = this.img.height;

        Lang.len++;

        //大地的绘制起点x，y坐标
        this.x = (Lang.len - 1) * this.width;
        this.y = this.ctx.canvas.height - this.height;
    }

    Lang.len = 0;

    //给原型添加成员
    Lang.prototype = {
        constructor: Lang,
        //绘制大地
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        //更新下一帧绘制的数据
        update: function () {
            this.x -= this.speed;
            this.x = this.x < -this.width ? this.x + Lang.len * this.width : this.x;
        }
    }
    w.getLang = function (ctx, img, speed) {
        return new Lang(ctx, img, speed);
    }
}(window));