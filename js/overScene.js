/**
 * Created by Machenike on 2018/5/11.
 */
(function (w) {
    /*
    * constructor { overScene }
    * param { ctx: Context } 绘制环境
    * */
    function OverScene( ctx ){
        this.ctx = ctx;
    }
    OverScene.prototype.draw = function () {
        this.ctx.fillStyle = 'rgba(100,100,100,.8)';
        this.ctx.fillRect(0, 0, cvs.width, cvs.height);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'red';
        this.ctx.font = '900 40px 微软雅黑';
        this.ctx.fillText('GAME OVER!', cvs.width / 2, cvs.height / 2);
    };
    w.getOverScene = function ( ctx ) {
        return new OverScene( ctx );
    }
}(window))