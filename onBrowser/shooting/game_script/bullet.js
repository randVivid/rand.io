
//弾オブジェクトを打ち出す関数
function fireBullet(x, y, interval, type, charaType, origin) {
    let size;
    let color = 'black';
    let damage;
    let speed;
    let maxReflect;
    let fireTime;
    let chargeTime;
    let bulletInterval;

    let lasers_cnt;
    if (interval <= 0) {
        switch (type) {//ボム、ホーミング
            //single
            case 0:
                damage = 5;
                speed = 5
                size = 5;
                bulletInterval = 5;
                maxReflect = 1;

                bullets.push(createBullet(x, y, size, color, speed, 0, charaType, damage, maxReflect));

                break;
            //triple
            case 1:
                damage = 3;
                speed = 5
                size = 3;
                bulletInterval = 7;
                maxReflect = 2;

                bullets.push(createBullet(x, y, size, color, speed, -20, charaType, damage, maxReflect));
                bullets.push(createBullet(x, y, size, color, speed, 0, charaType, damage, maxReflect));
                bullets.push(createBullet(x, y, size, color, speed, 20, charaType, damage, maxReflect));

                break;
            //single_laser
            case 2:
                damage = 1;
                bulletInterval = 90;
                size = 1;
                maxReflect = 3;
                chargeTime = 30;
                fireTime = 50;
                lasers_cnt = 1;

                lasers.push(createLaser(origin, 0, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));

                break;
            //x_laser
            case 3:
                damage = 1;
                bulletInterval = 100;
                size = 1;
                maxReflect = 1;
                chargeTime = 50;
                fireTime = 20;
                lasers_cnt = 4;

                lasers.push(createLaser(origin, 45, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, 135, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, -45, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, -135, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));

                break;
            //+_laser
            case 4:
                damage = 1;
                bulletInterval = 100;
                size = 1;
                maxReflect = 1;
                chargeTime = 50;
                fireTime = 20;
                lasers_cnt = 4;

                lasers.push(createLaser(origin, 0, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, 90, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, -90, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));
                lasers.push(createLaser(origin, 180, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt));

                break;
            //wide
            case 5:
                damage = 4;
                speed = 5
                size = 4;
                bulletInterval = 6;
                maxReflect = 3;

                bullets.push(createBullet(x, y, size, color, speed, -20, charaType, damage, maxReflect));
                bullets.push(createBullet(x, y, size, color, speed, 20, charaType, damage, maxReflect));
                break;
            //single_slow
            case 6:
                damage = 10;
                speed = 5
                size = 8;
                bulletInterval = 14;
                maxReflect = 1;

                bullets.push(createBullet(x, y, size, color, speed, 0, charaType, damage, maxReflect));
                break;
        }
        //プレイヤーが撃ったときインターバルを記録
        if (charaType == 0) bullets_type_interval = bulletInterval;

        return bulletInterval;
    }
    else {
        interval--;
        return interval;
    }
}
//弾オブジェクトを生成する関数
function createBullet(x, y, size, color, speed, angle, charaType, damage, reflect_cnt) {
    return {
        x: x,
        y: y,
        size: size,
        color: color,
        speed: speed,
        angle: angle,
        charaType: charaType,
        damage: damage,
        reflect_cnt: reflect_cnt,
        update: function () {
            switch (charaType) {
                //プレイヤー
                case 0:
                    this.x += this.speed * angleToVector(this.angle - 90).x;
                    this.y += this.speed * angleToVector(this.angle - 90).y;
                    break;
                //エネミー
                case 1:
                    this.x += this.speed * angleToVector(this.angle + 90).x;
                    this.y += this.speed * angleToVector(this.angle + 90).y;
                    break;
            }
            this.draw();
            this.reflect();

            //一定以上反射したら
            if (this.reflect_cnt <= 0) this.delete();
        },
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        },
        //反射
        reflect: function () {
            if (this.x <= 0 || this.x >= canvas.width) {
                this.angle *= -1;
                this.reflect_cnt--;
            }
        },
        //弾の消去
        delete: function () {
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i] == this) {
                    bullets.splice(i, 1);
                    break;
                };

            }
        }
    };
}
//レーザーオブジェクトを生成する関数
function createLaser(origin, angle, maxReflect, size, damage, charaType, fireTime, chargeTime, lasers_cnt) {
    return {
        origin: origin,
        fireTime: fireTime,
        chargeTime: chargeTime,
        time_cnt: 0,
        angle: angle,
        lasers_cnt: lasers_cnt,
        //更新内容
        update: function () {
            let _angle = this.angle
            switch (charaType) {
                //プレイヤー
                case 0:
                    break;
                //エネミー
                case 1:
                    _angle -= 180;
                    break;
            }

            //チャージ中
            if (chargeTime > this.time_cnt) {
                Laser(_angle, maxReflect, size, damage, charaType, origin, this.time_cnt, this.time_cnt);
            }
            //発射中
            else {
                Laser(_angle, maxReflect, size, damage, charaType, origin, 0, this.time_cnt);
            }
            this.time_cnt++;
            if (fireTime + chargeTime < this.time_cnt) this.delete();
        },
        delete: function () {
            for (let i = 0; i < lasers.length; i++) {
                if (lasers[i] == this) {
                    lasers.splice(i, 1);
                    break;
                }
            }
        }
    }
}
//レーザーを描画、当たり判定関数
function Laser(angle, maxReflect, size, damage, charaType, origin, chargeTime, time_cnt) {
    let vx = angleToVector(angle - 90).x;
    let vy = angleToVector(angle - 90).y;
    let posX = origin.x;
    let posY = origin.y;
    let fromPosX;
    let fromPosY;
    let width = size;

    for (let i = 0; i < maxReflect; i++) {
        //始点を記録
        fromPosX = posX;
        fromPosY = posY;

        //測定
        while (true) {
            //上下の壁にぶつかったとき
            if (posY < 0 || canvas.height < posY) {
                i = maxReflect;
                break;
            }

            //左右の壁にぶつかったとき
            if (posX < 0 || canvas.width < posX) {
                //反射
                vx = -vx;
                posX += vx;
                posY += vy;
                break;
            }

            posX += vx;
            posY += vy;
        }

        //チャージ中のとき
        if (chargeTime > 0) {
            ctx.strokeStyle = "rgb(100,100,100)";
            ctx.setLineDash([time_cnt, 5]);
            width = size * 3;
        }
        else {
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.setLineDash([1, 0]);
            width = size;
        }

        //始点からぶつかった地点まで描画
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(fromPosX, fromPosY);
        ctx.lineTo(posX, posY);
        ctx.stroke();

        //チャージ中のとき
        if (chargeTime > 0) continue;

        // 線分の方程式 y = a * x + b を求める
        const a = (posY - fromPosY) / (posX - fromPosX);
        const b = fromPosY - a * fromPosX;
        //console.log("y=" + parseInt(a) + "x+" + parseInt(b));

        //傾きが縦のとき
        var Nan = false;
        if (isNaN(a + b)) {
            Nan = true;
        }

        //接触判定
        switch (charaType) {
            //プレイヤーによる接触
            case 0:
                for (let i = 0; i < enemys.length; i++) {

                    //存在しないとき
                    if (!enemys[i]) continue;

                    //レーザーとの接触
                    for (let x = enemys[i].x - (enemys[i].size / 2); x < enemys[i].x + (enemys[i].size / 2); x++) {
                        if (
                            (Nan && parseInt(enemys[i].x) - enemys[i].size / 2 < parseInt(posX) && parseInt(posX) < parseInt(enemys[i].x) + enemys[i].size / 2 && checkHighLow(angle, origin.y, enemys[i].y)) ||
                            (enemys[i].y - (enemys[i].size / 2) <= a * x + b && a * x + b <= enemys[i].y + (enemys[i].size / 2))) {
                            enemys[i].life(-damage);
                            break;
                        }
                    }
                };
                break;
            //エネミーによる接触
            case 1:
                let playerLeftX = player.x - player.size;
                let playerRightX = player.x + player.size;

                for (let x = parseInt(player.x) - (player.size / 2); x < parseInt(player.x) + (player.size / 2); x++) {
                    if (
                        (Nan && (playerLeftX < posX && posX < playerRightX) && checkHighLow(-angle, origin.y, player.y)) ||
                        (parseInt(player.y) - (player.size / 2) <= a * x + b && a * x + b <= parseInt(player.y) + (player.size / 2))) {

                        player.life(-damage);
                        break;
                    }
                }
                break;
        }
    }
}