

//全体の当たり判定
document.addEventListener("keydown", function (event) { if (event.key === 'z' && dm[3]) { test_bulletIndex++; if (test_bulletIndex >= bullets_type_nameList.length) { test_bulletIndex = 0 }; player.changeBullet(test_bulletIndex); } });
function checkCollision() {
    //敵の接触
    for (let i = 0; i < enemys.length; i++) {

        //存在しないとき
        if (!enemys[i]) continue;

        //プレイヤーとの接触
        const dx = player.x - enemys[i].x;
        const dy = player.y - enemys[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.size + (enemys[i].size / 2)) {
            // エネミーのライフを減らす
            enemys[i].life(-1);
            //プレイヤーのライフを減らす
            player.life(-1);
        }
    };

    //アイテムの接触
    for (let i = 0; i < items.length; i++) {

        //存在しないとき
        if (!items[i]) continue;

        //プレイヤーとの接触
        const dx = player.x - items[i].x;
        const dy = player.y - items[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.size + (items[i].size / 2)) {
            items[i].itemF(i);
        }
    };

    //弾の接触
    for (let i = 0; i < bullets.length; i++) {
        //プレイヤーからの弾のとき
        if (bullets[i].charaType == 0) {
            //エネミー毎に当たっているか
            for (let j = 0; j < enemys.length; j++) {

                //存在しないとき
                if (!enemys[j] || !bullets[i]) continue;

                const dx = bullets[i].x - enemys[j].x;
                const dy = bullets[i].y - enemys[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < bullets[i].size + (enemys[j].size / 2)) {

                    // 敵のライフを減らす
                    enemys[j].life(-bullets[i].damage);

                    //当たった弾を消す
                    bullets.splice(i, 1);

                }
            }
        }
        //敵からの弾のとき
        else if (bullets[i].charaType == 1) {

            //存在しないとき
            if (!bullets[i]) continue;

            const dx = bullets[i].x - player.x;
            const dy = bullets[i].y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bullets[i].size + player.size) {

                //プレイヤーのライフを減らす
                player.life(-bullets[i].damage);

                //当たった弾を消す
                bullets.splice(i, 1);

            }
        }
    }
}

