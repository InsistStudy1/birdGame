

2/**
 * Created by Machenike on 2018/5/10.
 */
(function (w) {
    /*
     * constructor { Pipe }
     * param { ctx: Context } 绘制环境
     * param { imgDown: Image } 下管道，管口朝上
     * param { imgDown: Image } 上管道，管口朝下
     * param { imgUp: Image } 下管道，管口朝上
     * param { space: number } 上下管道的间隔
     * param { langHeight: number } 大地的高度
     * param { speed: number } 管道的移动速度
     * */
    function Pipe(ctx, imgDown, imgUp, space, langHeight, speed) {
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.langHeight = langHeight;
        this.speed = speed || 2;

        this.width = this.imgDown.width;
        this.height = this.imgDown.height;

        Pipe.len++;

        //管道的x坐标
        this.x = 300 + this.width * 3 * (Pipe.len - 1);

        //管道的最小高度
        this.minHeight = 100;

        this._init();
    }

    Pipe.len = 0;

    //给原型添加成员
    util.extend(Pipe.prototype, {
        //初始化管道位置
        _init: function () {
            //当个管道的最大高度
            var maxHeight = this.ctx.canvas.height - this.langHeight - this.minHeight - this.space;
            //随机生成上管道的高度
            var randomHeight = Math.random() * (maxHeight - this.minHeight) + this.minHeight;
            this.downY = randomHeight - this.height;
            this.upY = this.downY + this.height + this.space;
        },
        draw: function () {
            this.ctx.drawImage(this.imgDown, this.x, this.downY);
            this.ctx.drawImage(this.imgUp, this.x, this.upY);
            this.ctx.rect(this.x, this.downY, this.width, this.height);
            this.ctx.rect(this.x, this.upY, this.width, this.height);
        },
        update: function () {
            this.x -= this.speed;
            this.x = this.x < -this.width ? this.x += this.width * 3 * Pipe.len : this.x;
        }
    })

    w.getPipe = function (ctx, imgDown, imgUp, space, langHeight, speed) {
        return new Pipe(ctx, imgDown, imgUp, space, langHeight, speed);
    }
}(window))
