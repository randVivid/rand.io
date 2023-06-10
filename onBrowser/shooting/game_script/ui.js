
//UIを描画
function drawUI() {

    info.fillStyle = "black";
    //プレイヤー情報を描画する関数
    UI_info()

    //ステージ情報を描画する関数
    UI_stage()

    gameStart_fade();
}
//プレイヤー情報を描画する関数
function UI_info() {

    info.font = "13px Arial";
    info.fillText("time", 10, 20);
    info.fillText("/s", 23, 35);

    info.font = "30px Arial";
    var time_text = time + ".";
    var second_text = secondTime.toString().padStart(2, '0');
    let second_text_posX = 50 + info.measureText(time_text).width;
    info.fillText(time_text, 50, 34);
    info.font = "15px Arial";
    info.fillText(second_text, second_text_posX, 34);

    info.font = "13px Arial";
    info.fillText("kill × ", 10, 73);
    info.font = "20px Arial";
    info.fillText(kill, 50, 74.5);

    UI_info_HealthBar(info);
    UI_info_bulletsType(info);
    UI_info_score(info);
}
//体力バーの描画関数
function UI_info_HealthBar(info) {
    let healthBar_Width = 5;        // 体力バーの1つの四角形の幅
    let healthBar_Height = 25;      // 体力バーの1つの四角形の高さ
    let healthBar_WidthPadding = 5; // 体力バーの四角形間の横余白
    let healthBar_HeightPadding = 5;// 体力バーの四角形間の縦余白
    let healthBarX = 10;            // 体力バーの左端のx座標
    let healthBarY = 120;           // 体力バーの上端のy座標
    let healthBar_cnt = 15;         //体力バーの横表示数

    info.font = "13px Arial";
    info.fillText("Life × " + player.playerLife, healthBarX, healthBarY - 10);
    let i = 0;
    let j = -1;
    for (let index = 0; index < player.playerLife; index++) {

        if (i % healthBar_cnt == 0) {
            j++;
            i = 0;
        }

        info.fillRect(
            healthBarX + i * (healthBar_Width + healthBar_WidthPadding),
            healthBarY + j * (healthBar_Height + healthBar_HeightPadding),
            healthBar_Width,
            healthBar_Height
        );

        i++;
    }
}
//弾種類の描画関数
function UI_info_bulletsType(info) {
    let posX = 10;
    let posY = 280;
    let height = 5;
    let width = 150;
    let _width = width;
    let percentage = (1 - (player.bulletInterval / bullets_type_interval));

    //弾の発射間隔
    _width = width * percentage;
    info.fillStyle = "black";
    info.fillRect(posX, posY, _width, height);

    //弾の発射間隔２
    let splitCnt = 10;
    let splitPadding = 5.5;
    let splitWidth = 10;
    let splitHeight = 2;
    let splitPosX = posX + 145;
    let splitPosY = posY + 9;
    for (let i = 0; i < splitCnt; i++) {
        if (player.bulletInterval < bullets_type_interval / (i + 1)) {
            info.fillRect(splitPosX - (splitWidth + splitPadding) * i, splitPosY, splitWidth, splitHeight);
        }
    }

    //弾種類
    let bulletType_padding = 30;
    info.font = "13px Arial";
    info.fillText("weapon : " + bullets_type_nameList[player.bulletType], posX, posY + bulletType_padding);

    //弾の発射間隔３
    let perPosX = posX;
    let perPosY = posY + 70;

    info.fillText("percentage : ", perPosX, perPosY);
    info.font = "15px Arial";
    info.fillText(Math.floor(percentage * 100).toString().padStart(3, '0'), perPosX + 80, perPosY + 2.2);
    info.font = "10px Arial";
    info.fillText("%", perPosX + 120, perPosY + 3);
}
//スコア描画関数
document.addEventListener("keydown", function (event) { if (event.key === 'm') { dm[0] = true; } });
function UI_info_score(info) {
    let posX = 10;
    let posY = 390;

    //スコア計算
    score = scoreCal();

    info.font = "13px Arial";
    info.fillText("score", posX, posY);
    info.font = "30px Arial";
    info.fillText(score, posX + 20, posY + 30);
}
//ステージ情報を描画する関数
function UI_stage() {
    let stage_text = "";

    //wave数
    stage.fillStyle = "black";
    stage.font = "30px Arial";
    stage_text = "Wave " + nowWave;
    stage.fillText(stage_text, stage_c.width - stage.measureText(stage_text).width - 10, 30);

    //wave種類
    let wave_type_posX = 15;
    let wave_type_posY = 58;

    stage.font = "20px Arial";
    stage_text = wave_name[nextWave[0]];
    stage_nowType_text_w = stage_c.width - stage.measureText(stage_text).width - wave_type_posX;
    stage.fillText(stage_text, stage_nowType_text_w, wave_type_posY);

    stage.font = "10px Arial";
    stage_text = wave_name[nextWave[1]] + " :   2nd";
    stage.fillText(stage_text, stage_c.width - stage.measureText(stage_text).width - wave_type_posX, wave_type_posY + 20 * 1);

    stage.font = "10px Arial";
    stage_text = wave_name[nextWave[2]] + " :   3rd";
    stage.fillText(stage_text, stage_c.width - stage.measureText(stage_text).width - wave_type_posX, wave_type_posY + 20 * 2);

    stage.font = "10px Arial";
    stage_text = wave_name[nextWave[3]] + " :   4th";
    stage.fillText(stage_text, stage_c.width - stage.measureText(stage_text).width - wave_type_posX, wave_type_posY + 20 * 3);

}