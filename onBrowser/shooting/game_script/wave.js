
function wave_test() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 1;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(8, startTime = 0, endTime = 0, interval = 100, PosType = 10));
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
function wave_shake() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 10;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(7, startTime = 0, endTime = 10, interval = 6, PosType = 9));
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
function wave_shake() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 10;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(7, startTime = 0, endTime = 10, interval = 6, PosType = 9));
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
function wave_triangle() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 10;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(6, startTime = 1, endTime = 1, interval = 100, PosType = 4));
        create.push(wave_createEnemy(0, startTime = 2, endTime = 2, interval = 100, PosType = 3));
        create.push(wave_createEnemy(0, startTime = 2, endTime = 2, interval = 100, PosType = 5));
        create.push(wave_createEnemy(6, startTime = 3, endTime = 3, interval = 100, PosType = 2));
        create.push(wave_createEnemy(6, startTime = 3, endTime = 3, interval = 100, PosType = 6));
        create.push(wave_createEnemy(6, startTime = 4, endTime = 4, interval = 100, PosType = 1));
        create.push(wave_createEnemy(0, startTime = 4, endTime = 4, interval = 100, PosType = 4));
        create.push(wave_createEnemy(6, startTime = 4, endTime = 4, interval = 100, PosType = 7));
        create.push(wave_createEnemy(6, startTime = 5, endTime = 5, interval = 100, PosType = 2));
        create.push(wave_createEnemy(6, startTime = 5, endTime = 5, interval = 100, PosType = 6));
        create.push(wave_createEnemy(0, startTime = 6, endTime = 6, interval = 100, PosType = 3));
        create.push(wave_createEnemy(0, startTime = 6, endTime = 6, interval = 100, PosType = 5));
        create.push(wave_createEnemy(6, startTime = 7, endTime = 7, interval = 100, PosType = 4));
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
function wave_meteor() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 10;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(5, startTime = 1, endTime = 10, interval = 5, PosType = 9));
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
function wave_x() {
    const wave_time_cnt = time - wave_startTime;

    //waveの時間
    const wave_time = 5;

    //初期生成
    if (wave_first) {
        wave_first = false;

        create.push(wave_createEnemy(3, startTime = 1, endTime = 8, interval = 70, PosType = 2));
        create.push(wave_createEnemy(4, startTime = 0, endTime = 8, interval = 70, PosType = 4));
        create.push(wave_createEnemy(3, startTime = 1, endTime = 8, interval = 70, PosType = 6));
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
