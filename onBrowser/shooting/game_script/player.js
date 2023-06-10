
// プレイヤーオブジェクトを生成する関数
function createPlayer(x, y, size, color) {
    var image = new Image();
    image.src = "player/0.png";

    return {
        x: x,
        y: y,
        size: size,
        color: color,
        bulletInterval: 0,
        bulletType: 0,
        playerLife: 30,
        charaType: 0,
        //更新内容
        update: function () {
            this.draw();
            if (nowFire) {
                this.bulletInterval =
                    fireBullet(this.x, this.y, this.bulletInterval, this.bulletType, this.charaType, this);
            }
            else if (this.bulletInterval > 0) {
                this.bulletInterval--;
            }
            this.followMouse();
        },
        //プレイヤーの描画
        draw: function () {
            ctx.drawImage(image, this.x - (this.size), this.y - (this.size), this.size * 2, this.size * 2,);
        },
        //プレイヤーのマウス追従
        followMouse: function () {
            if (time < 1) {
                mouseX = cvc_x;
                mouseY = cvc_y;
                return;
            }

            let pSpeed = playerSpeed;
            //発射していな時スピードアップ
            if (!nowFire) {
                pSpeed *= 3;
            }

            // マウスとプレイヤーの位置の差を計算する
            const dx = mouseX - player.x;
            const dy = mouseY - player.y;

            // 速度を制御するために、ベクトルの大きさを計算する
            let dist = Math.sqrt(dx * dx + dy * dy);

            // 距離が近づくほどスピードを減らす
            let speed = pSpeed * Math.min(1, dist / 100);

            player.x += (dx / dist) * speed;
            player.y += (dy / dist) * speed;
        },
        //プレイヤーのライフ操作
        life: function (value) {

            //プレイヤーのライフを減らす
            if (!dm[3]) this.playerLife += value;


            if (this.playerLife < 0) {
                this.playerLife = 0;
            }
            else if (this.playerLife > 60) {
                this.playerLife = 60;
            }
        },
        //レーザーの消去
        delete_laser: function () {
            for (let i = 0; i < lasers.length; i++) {
                if (lasers[i] && lasers[i].origin === this) {
                    lasers.splice(i, lasers[i].lasers_cnt);
                    break;
                }
            }
        },
        //弾の変更
        changeBullet: function (bulletType) {
            //インターバルの初期化
            this.bulletInterval = 1;
            //弾種類の変更
            this.bulletType = bulletType;
            //撃っていたレーザーの消去
            this.delete_laser();

            image.src = "player/" + bulletType + ".png";
        }
    };
}