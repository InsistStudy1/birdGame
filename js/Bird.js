/**
 * Created by Machenike on 2018/5/10.
 */
(function (w) {
    /*
     * constructor { Bird }
     * param { ctx: Context } 绘制环境
     * param { img: Image } 图片资源
     * param { widthFrame: number } 一行的帧数
     * param { heightFrame: number } 一列的帧数
     * param { x: number } 起点的x坐标
     * param { y: number } 起点的y坐标
     * param { speed: number } 小鸟下落的速度
     * */
    function Bird(ctx, img, widthFrame, heightFrame, x, y, speed) {
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;
        this.speed = speed || 2;

        //小鸟的宽高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;

        //当前帧数
        this.currentFrame = 0;

        //小鸟下落加速的值
        this.speedPlus = 0.1;

        this._bind();
    }

    //给原型添加成员
    Bird.prototype = {
        constructor: Bird,
        //绘制小鸟
        draw: function () {
            //控制小鸟的方向
            this.ctx.save();

            //设置一个基础旋转值
            var baseRadian = Math.PI / 180 * 5;
            var rotateRadian = this.speed * baseRadian;
            rotateRadian = rotateRadian > baseRadian * 4.5 ? rotateRadian = baseRadian * 4.5 : rotateRadian;
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

            this.ctx.rotate( rotateRadian );
            this.ctx.drawImage(this.img,
                this.currentFrame * this.width, 0, this.width, this.height,
                -this.width / 2, -this.height / 2, this.width, this.height);

            this.ctx.restore();
        },
        //更新下一帧绘制的数据
        update: function () {
            // 控制小鸟切换下一帧
            this.currentFrame++;
            this.currentFrame = this.currentFrame >= this.widthFrame ? this.currentFrame = 0 : this.currentFrame;

            //让小鸟下落
            this.y += this.speed;
            this.speed += this.speedPlus;
        },
        //添加点击事件
        _bind: function () {
            var self = this;
            document.addEventListener('click', function () {
                //当点击鼠标时，小鸟下落速度变为负数
                self.speed = -3;
            });
        }
    };
    //用来判断是否创建了小鸟
    var bird = null;

    w.getBird = function (ctx, img, widthFrame, heightFrame, x, y, speed) {
        //单利模式
        if (!bird) {
            bird = new Bird(ctx, img, widthFrame, heightFrame, x, y, speed);
        }
        return bird;
    }
}(window));