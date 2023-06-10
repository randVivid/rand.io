
//waveの開始時間
var wave_startTime = 0;
//waveの終了時間
var wave_endTime = 0;
//waveの時間
var wave_time = 0;
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
        if (_waveChange.changeNow || items.length > 0) {
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
        if (_waveChange.changeNow) {
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
    

    const wave_time_cnt = detailTime - wave_startTime;

    //初期生成
    if (wave_first) {
        wave_first = false;

        //wave種類
        switch (nextWave[0]) {
            case 1: wave_x(); break;
            case 2: wave_meteor(); break;
            case 3: wave_triangle(); break;
            case 4: wave_shake(); break;
            //case 5: wave_test(); break;
        }
    }

    //生成物の更新
    for (let i = 0; i < create.length; i++) {
        create[i].nowTime = wave_time_cnt;
        create[i].create();
        if (create[i].endCheck) {
            create.splice(i, 1);
        }
    }

    wave_end(wave_time);
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
        create = []

        player.life(1);

        //アイテム出現
        items.push(createItem(canvas.width * 3 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));
        items.push(createItem(canvas.width * 2 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));
        items.push(createItem(canvas.width * 1 / 4, 0, Math.max((Math.floor(Math.random() * itemTypes.length)), 0)));

        console.log("waveEnd");
    }
}

//wave内でエネミーを生成する関数
function wave_createE(enemyType, sT, eT, Interval, pT) {
    return {
        interval_cnt: 0,
        endCheck: false,
        nowTime: 0,
        old_TIme:0,//前に呼び出された時の時間
        create_cnt:0,//生成された回数
        create: function () {
            //設定時間内のとき
            if (sT <= this.nowTime && this.nowTime <= eT) {
                //エネミーの生成
                if (this.interval_cnt % Interval < 0) {
                    let posX;
                    let posY;
                    switch (pT) {
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
                //経過時間分インターバルを消費
                this.interval_cnt-=detailTime-this.old_TIme;
                //console.log(this.interval_cnt)
                this.old_TIme = detailTime;
            }
            //時間を過ぎると
            else if (eT < this.nowTime) {
                this.endCheck = true;
            }
        }
    }
}