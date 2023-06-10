
function wave_test() {
    //waveの時間
    wave_time = 1;
    
    //共通のインターバル
    CI = 1;

    //出現エネミー
    create.push(wave_createE(enemyN.test, sT = 0, eT = 0, interval = 1, posT.test));
}
function wave_shake() {
    //waveの時間
    wave_time = 10;

    //共通のインターバル
    CI = 0.07;

    //出現エネミー
    create.push(wave_createE(enemyN.shake, sT = 0, eT = 10, interval = CI, posT.random));
}
function wave_triangle() {
    //waveの時間
    wave_time = 10;

    //共通のインターバル
    CI = 1;

    //出現エネミー
    create.push(wave_createE(enemyN.wide,    sT = 1, eT = 2, interval = CI, posT.c0));
    create.push(wave_createE(enemyN.single,  sT = 2, eT = 3, interval = CI, posT.cm1));
    create.push(wave_createE(enemyN.single,  sT = 2, eT = 3, interval = CI, posT.cp1));
    create.push(wave_createE(enemyN.wide,    sT = 3, eT = 4, interval = CI, posT.cm2));
    create.push(wave_createE(enemyN.wide,    sT = 3, eT = 4, interval = CI, posT.cp2));
    create.push(wave_createE(enemyN.wide,    sT = 4, eT = 5, interval = CI, posT.cm3));
    create.push(wave_createE(enemyN.single,  sT = 4, eT = 5, interval = CI, posT.c0));
    create.push(wave_createE(enemyN.wide,    sT = 4, eT = 5, interval = CI, posT.cp3));
    create.push(wave_createE(enemyN.wide,    sT = 5, eT = 6, interval = CI, posT.cm2));
    create.push(wave_createE(enemyN.wide,    sT = 5, eT = 6, interval = CI, posT.cp2));
    create.push(wave_createE(enemyN.single,  sT = 6, eT = 7, interval = CI, posT.cm1));
    create.push(wave_createE(enemyN.single,  sT = 6, eT = 7, interval = CI, posT.cp1));
    create.push(wave_createE(enemyN.wide,    sT = 7, eT = 8, interval = CI, posT.c0));
}
function wave_meteor() {
    //waveの時間
    wave_time = 10;

    //共通のインターバル
    CI = 0.07;

    //出現エネミー
    create.push(wave_createE(enemyN.straight, sT = 1, eT = 10, interval = CI, posT.random));
}
function wave_x() {
    //waveの時間
    wave_time =5;

    //共通のインターバル
    CI = 1;

    //出現エネミー
    create.push(wave_createE(enemyN.x_laser, sT = 1, eT = 8, interval = CI, posT.cm2));
    create.push(wave_createE(enemyN.p_laser, sT = 0, eT = 8, interval = CI, posT.c0));
    create.push(wave_createE(enemyN.x_laser, sT = 1, eT = 8, interval = CI, posT.cp2));

    wave_end(wave_time);
}