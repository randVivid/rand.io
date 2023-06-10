
var restartCheck = false;
//ゲーム中のループを設定
function gameLoop() {

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    info.clearRect(0, 0, info_c.width, info_c.height);
    stage.clearRect(0, 0, stage_c.width, stage_c.height);

    //waveを動作
    wave();

    // プレイヤーを描画
    player.update();
    // 敵を更新して描画
    enemys.forEach(function (enemy) {
        enemy.update();
    });
    // 弾を更新して描画
    bullets.forEach(function (bullet) {
        bullet.update();
    });
    // レーザーを更新して描画
    lasers.forEach(function (laser) {
        laser.update();
    });
    // アイテムを更新して描画
    items.forEach(function (item) {
        item.update();
    });

    //全体の当たり判定
    checkCollision();

    //UIを描画
    drawUI();

    //wave変更
    if (_waveChange.changeNow) {
        _waveChange.update();
    }

    // 画面上下外に出た弾を削除
    bullets.forEach(function (bullet, index) {
        if (bullet.y < 0 || canvas.height < bullet.y) {
            bullets.splice(index, 1);
        }
    });
    // 画面下外に出た敵を削除
    enemys.forEach(function (enemy, index) {
        if (enemy.y > canvas.height) {
            enemys.splice(index, 1);
        }
    });
    // 画面下外に出たアイテムを削除
    items.forEach(function (item, index) {
        if (item.y > canvas.height) {
            items.splice(index, 1);
        }
    });

    // ライフが0になったら負け
    if (player.playerLife <= 0) {
        console.log("gameOver");
        nowPlay = false;
        nowEnd = true
        restartCheck = false;
        requestAnimationFrame(gameEnd);
    }
    else {
        // 次のフレームを要求
        requestAnimationFrame(gameLoop);
    }
}

//ゲーム中時間計測
setInterval(function () {
    if (nowPlay) {
        secondTime++;
        if (secondTime >= 100) {
            time++;
            secondTime = 0;
        }
    }
    detailTime+=0.01;
}, 10);