/**
 * Created by Machenike on 2018/5/10.
 */
(function (w) {
    /*
     * constructor { gameScene } 绘制游戏场景
     * param { ctx: } 绘制环境
     * param { imgObj: Object } 图片资源
     * */
    function gameScene(ctx, imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;

        //用来存储游戏里面所有的对象
        this.roles = [];

        //存储监听小鸟死亡的听众
        this.listeners = [];

        this._initRoles();
    }

    gameScene.prototype = {
        constructor: gameScene,
        //创建游戏对象
        _initRoles: function () {
            this.ctx.canvas.width = this.imgObj.sky.width;
            this.ctx.canvas.height = this.imgObj.sky.height;


            //控制画面的移动速度
            var speed = 5;


            //绘制2块背景
            this.roles.push(getSky(this.ctx, this.imgObj.sky, speed));
            this.roles.push(getSky(this.ctx, this.imgObj.sky, speed));

            //绘制6个管道
            for (var i = 0; i < 6; i++) {
                this.roles.push(getPipe(this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 130, this.imgObj.lang.height, speed));
            }
            //绘制5块大地
            for (var i = 0; i < 4; i++) {
                this.roles.push(getLang(this.ctx, this.imgObj.lang, speed));
            }

            //创建小鸟
            this.roles.push(getBird(this.ctx, this.imgObj.bird, 3, 1, 20, 20, 2));
        },
        //添加听众
        addListener: function( listener ) {
            this.listeners.push( listener );
        },
        //监听小鸟死亡
        triggerBirdOver: function() {
            // 死亡时告知所有的听众
            this.listeners.forEach( function( liste ) {
                liste();
            });
        },
        //让游戏场景里的所有角色开始表演
        draw: function () {
            //让画布的高度等于背景天空的高度


            var bird = getBird();
            //计算出小鸟的中心点
            var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;

            //判断小鸟是否继续飞行

            //小鸟撞到管道，飞过天空，撞到地面都算死亡
            if (ctx.isPointInPath(birdCoreX, birdCoreY)
                || birdCoreY < 0
                || birdCoreY > (this.ctx.canvas.height - this.imgObj.lang.height)) {
                this.triggerBirdOver();
            } else {
                this.ctx.beginPath();
                this.roles.forEach(function (role) {
                    role.draw();
                    role.update();
                });
            }
        }
    }
    w.getGameScene = function (ctx, imgObj) {
        return new gameScene(ctx, imgObj);
    }
}(window))