
//エネミーの種類
var itemTypes = [
    //heal_1
    createItemType(
        itemTypeName = "heal_1",
        image_src = "item/0.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.heal,
        healPoint = 1,
        weaponType = 0,
    ),
    //heal_5
    createItemType(
        itemTypeName = "heal_5",
        image_src = "item/1.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.heal,
        healPoint = 5,
        weaponType = 0,
    ),
    //heal_10
    createItemType(
        itemTypeName = "heal_10",
        image_src = "item/2.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.heal,
        healPoint = 10,
        weaponType = 0,
    ),
    //single
    createItemType(
        itemTypeName = "single",
        image_src = "item/3.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        weaponType = bulletN.single,
    ),
    //triple
    createItemType(
        itemTypeName = "triple",
        image_src = "item/4.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.triple,
    ),
    //single_laser
    createItemType(
        itemTypeName = "single_laser",
        image_src = "item/5.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.single_laser,
    ),
    //x_laser
    createItemType(
        itemTypeName = "x_laser",
        image_src = "item/6.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.x_laser,
    ),
    //+_laser
    createItemType(
        itemTypeName = "+_laser",
        image_src = "item/7.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.p_laser,
    ),
    //wide
    createItemType(
        itemTypeName = "wide",
        image_src = "item/8.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.wide,
    ),
    //single_slow
    createItemType(
        itemTypeName = "single_slow",
        image_src = "item/9.png",
        //0:heal, 1:weapon
        itemEffectType = itemEfN.change,
        healPoint = 0,
        weaponType = bulletN.single_slow,
    ),
];
//エネミー種類クラス
document.addEventListener("keydown", function (event) { if (event.key === 'd' && dm[2]) { dm[3] = true; console.log("debug_mode"); } });
function createItemType(itemTypeName, image_src, itemEffectType, healPoint, weaponType) {
    return {
        itemTypeName: itemTypeName,
        image_src: image_src,
        itemEffectType: itemEffectType,
        healPoint: healPoint,
        weaponType: weaponType,
    }
}
// エネミーオブジェクトを生成する関数
function createItem(x, y, itemType) {
    var image = new Image();
    var size = 45;
    var xSpeed = 0;
    var ySpeed = 4;
    var xMoveType = xMoveN.basic;
    var yMoveType = yMoveN.cos1f6;
    var itemEffectType = 0;
    var healPoint = 0;
    var weaponType = 0;

    //エネミータイプ
    image.src = itemTypes[itemType].image_src;
    itemEffectType = itemTypes[itemType].itemEffectType;
    healPoint = itemTypes[itemType].healPoint;
    weaponType = itemTypes[itemType].weaponType;

    return {
        x: x,
        y: y,
        size: size,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        xMoveType: xMoveType,
        yMoveType: yMoveType,
        moveInterval: 0,
        moveDirection: 1,
        itemEffectType: itemEffectType,
        healPoint: healPoint,
        weaponType: weaponType,
        //更新内容
        update: function () {
            switch (this.xMoveType) {
                case 0:
                    this.x += this.xSpeed;
                    break;
                case 1:
                    this.x += this.xSpeed * Math.cos((this.moveInterval * Math.PI) / 180 * 8);
                    this.moveInterval++;
                    break;
            }
            switch (this.yMoveType) {
                case 0:
                    this.y += this.ySpeed;
                    break;
                case 1:
                    this.y += this.ySpeed * (1 + Math.cos((this.moveInterval * Math.PI) / 180));
                    this.moveInterval++;
                    break;
                case 2:
                    this.y += this.ySpeed * (1 + Math.cos((this.moveInterval * Math.PI) / 180 * 1.6));
                    this.moveInterval++;
                    break;
            }

            this.draw();
        },
        //エネミーの描画
        draw: function () {
            ctx.drawImage(image, this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size,);
        },
        //当たり判定プレイヤーにあたると特定の効果を付与し、消滅
        itemF: function (index) {
            //console.log(this.itemEffectType);
            switch (this.itemEffectType) {
                case 0:
                    //console.log("回復");
                    player.life(this.healPoint);
                    break;
                case 1:
                    console.log("交換");
                    player.changeBullet(this.weaponType);
                    break;
            }

            //当たった弾を消す
            items.splice(index, 1);
        }
    };
}