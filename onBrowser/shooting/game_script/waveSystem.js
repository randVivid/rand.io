
//waveの開始時間
var wave_startTime = 0;
//waveの終了時間
var wave_endTime = 0;
//waveの初回動作
var wave_first = true;
//wave生成物
var create = [];
//wave状態
var wave_type = -1;
//UI_waveChange
var waveChange;
//次のwave
var nextWave = [];

//wave
var wave_name = ["", "X", "Meteor", "Triangle", "Shake",];
function wave() {
    //console.log("nowWave");
    if (wave_type === 0) {
        //waveInterval中
        if (_waveChange.waveWait || items.length > 0) {
            return;
        }
        nowWave++;
        console.log("waveStart");
        wave_startTime = time;

        //wave決定
        nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);
        //nextWave.push(wave_type);

        //console.log(nextWave);
        wave_type = 1;
    }
    //初回
    else if (wave_type === -1) {
        //waveInterval中
        if (_waveChange.waveWait) {
            return;
        }
        nowWave++;
        console.log("waveStart");
        wave_startTime = time;

        //wave決定
        nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);

        //console.log(nextWave);
        wave_type = 1;
    }

    //nextWave[0] = 5;
    switch (nextWave[0]) {
        case 1: wave_x(); break;
        case 2: wave_meteor(); break;
        case 3: wave_triangle(); break;
        case 4: wave_shake(); break;
        //case 5: wave_test(); break;
    }
}

//時間経過で次のwaveへ
function wave_end(wave_time) {
    //時間の経過でエネミーの召喚がなくなり、エネミー数が0になるとつぎのwaveへ
    if (time - wave_startTime > wave_time && enemys.length == 0) {
        wave_type = 0;
        wave_first = true;
        wave_endTime = time;
        _waveChange.on();
        nextWave.shift();

        player.life(1);

        //アイテム出現
        items.push(createItem(canvas.width * 3 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));
        items.push(createItem(canvas.width * 2 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));
        items.push(createItem(canvas.width * 1 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));

        console.log("waveEnd");
    }
}

//wave内でエネミーを生成する関数
function wave_createEnemy(enemyType, startTime, endTime, Interval, PosType) {
    return {
        interval_cnt: 0,
        endCheck: false,
        nowTime: 0,
        create: function () {
            //設定時間内のとき
            if (startTime <= this.nowTime && this.nowTime <= endTime) {
                //エネミーの生成
                if (this.interval_cnt % Interval === 0) {
                    let posX;
                    let posY;
                    switch (PosType) {
                        //上段8分割位置指定
                        case 0:
                            posX = canvas.width * 0 / 8;
                            posY = 0;
                            break;
                        case 1:
                            posX = canvas.width * 1 / 8;
                            posY = 0;
                            break;
                        case 2:
                            posX = canvas.width * 2 / 8;
                            posY = 0;
                            break;
                        case 3:
                            posX = canvas.width * 3 / 8;
                            posY = 0;
                            break;
                        case 4:
                            posX = canvas.width * 4 / 8;
                            posY = 0;
                            break;
                        case 5:
                            posX = canvas.width * 5 / 8;
                            posY = 0;
                            break;
                        case 6:
                            posX = canvas.width * 6 / 8;
                            posY = 0;
                            break;
                        case 7:
                            posX = canvas.width * 7 / 8;
                            posY = 0;
                            break;
                        case 8:
                            posX = canvas.width * 8 / 8;
                            posY = 0;
                            break;
                        //上段ランダム
                        case 9:
                            posX = Math.random() * canvas.width;
                            posY = 0;
                            break;
                        //真ん中
                        case 10:
                            posX = canvas.width / 2;
                            posY = canvas.height / 2;
                            break;

                    }

                    var enemy = createEnemy(posX, posY, enemyType);
                    enemys.push(enemy);
                    this.interval_cnt = Interval;
                }
                this.interval_cnt--;
            }
            //時間を過ぎると
            else if (endTime < this.nowTime) {
                this.endCheck = true;
            }
        }
    }
}
