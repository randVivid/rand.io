
//エネミーの種類
var enemyTypes = [
    //0 single
    createEnemyType(
        enemyTypeName = "single",
        image_src = "chara/0.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.single_slow,
        enemyLife = 30,
    ),
    //1 triple
    createEnemyType(
        enemyTypeName = "triple",
        image_src = "chara/1.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.triple,
        enemyLife = 20,
    ),
    //2 single_laser
    createEnemyType(
        enemyTypeName = "single_laser",
        image_src = "chara/2.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.single_laser,
        enemyLife = 10,
    ),
    //3 x_laser
    createEnemyType(
        enemyTypeName = "x_laser",
        image_src = "chara/3.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.x_laser,
        enemyLife = 20,
    ),
    //4 +_laser
    createEnemyType(
        enemyTypeName = "+_laser",
        image_src = "chara/4.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.p_laser,
        enemyLife = 20,
    ),
    //5 bodyAttack
    createEnemyType(
        enemyTypeName = "bodyAttack",
        image_src = "chara/99.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 14,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.none,
        enemyLife = 20,
    ),
    //6 wide
    createEnemyType(
        enemyTypeName = "wide",
        image_src = "chara/5.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 2,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.wide,
        enemyLife = 20,
    ),
    //7 shake
    createEnemyType(
        enemyTypeName = "shake",
        image_src = "chara/99.png",
        size = 40,
        xSpeed = 2.4,
        ySpeed = 10,
        xMoveType = xMoveN.cos8,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.none,
        enemyLife = 10,
    ),
    //8
    createEnemyType(
        enemyTypeName = "test",
        image_src = "chara/99.png",
        size = 40,
        xSpeed = 0,
        ySpeed = 0,
        xMoveType = xMoveN.basic,
        yMoveType = yMoveN.basic,
        bulletType = bulletN.none,
        enemyLife = 10,
    ),
]
//エネミー種類クラス
function createEnemyType(enemyTypeName, image_src, size, xSpeed, ySpeed, xMoveType, yMoveType, bulletType, enemyLife) {
    return {
        enemyTypeName: enemyTypeName,
        image_src: image_src,
        size: size,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        xMoveType: xMoveType,
        yMoveType: yMoveType,
        bulletType: bulletType,
        enemyLife: enemyLife,
    }
}
// エネミーオブジェクトを生成する関数
function createEnemy(x, y, enemyType) {
    var image = new Image();
    var symbol = "";
    var size = 0;
    var xSpeed = 0;
    var ySpeed = 0;
    var xMoveType = 0;
    var yMoveType = 0;
    var bulletType = 0;
    var enemyLife = 0;

    //エネミータイプ
    image.src = enemyTypes[enemyType].image_src;
    size = enemyTypes[enemyType].size;
    xSpeed = enemyTypes[enemyType].xSpeed;
    ySpeed = enemyTypes[enemyType].ySpeed;
    xMoveType = enemyTypes[enemyType].xMoveType;
    yMoveType = enemyTypes[enemyType].yMoveType;
    bulletType = enemyTypes[enemyType].bulletType;
    enemyLife = enemyTypes[enemyType].enemyLife;

    return {
        x: x,
        y: y,
        symbol: symbol,
        size: size,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        xMoveType: xMoveType,
        yMoveType: yMoveType,
        moveInterval: 0,
        moveDirection: 1,
        bulletType: bulletType,
        bulletInterval: 30,
        enemyLife: enemyLife,
        charaType: 1,
        enemyType: enemyType,
        //更新内容
        update: function () {
            //ｘ軸の移動方法
            switch (this.xMoveType) {
                case 0:
                    this.x += this.xSpeed;
                    break;
                case 1:
                    this.x += this.xSpeed * Math.cos((this.moveInterval * Math.PI) / 180 * 8);
                    this.moveInterval++;
                    break;
            }
            //ｙ軸の移動方法
            switch (this.yMoveType) {
                case 0:
                    this.y += this.ySpeed;
                    break;
                case 1:
                    this.y += this.ySpeed * (1 + Math.cos((this.moveInterval * Math.PI) / 180));
                    this.moveInterval++;
                    break;
            }

            //speedUp
            //this.y += 1 + (time/100);

            this.bulletInterval =
                fireBullet(this.x, this.y, this.bulletInterval, this.bulletType, this.charaType, this);

            this.draw();
        },
        //エネミーの描画
        draw: function () {
            ctx.drawImage(image, this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size,);
        },
        //エネミーのライフ操作
        life: function (value) {

            // エネミーのライフを減らす
            this.enemyLife += value;

            // ライフが0になったら敵を削除
            for (let i = 0; i < enemys.length; i++) {
                if (enemys[i] != this) continue;

                if (this.enemyLife <= 0) {
                    this.death(i);
                }
            }
        },
        death: function (index) {
            this.delete_laser();

            //エネミーのキル
            kill++;
            enemys.splice(index, 1);
        },
        //レーザーの消去
        delete_laser: function () {
            for (let i = 0; i < lasers.length; i++) {
                if (lasers[i] && lasers[i].origin === this) {
                    lasers.splice(i, lasers[i].lasers_cnt);
                    break;
                }
            }
        }
    };
}