// ゲーム画面のキャンバス要素を取得
var canvas = document.getElementById("gameCanvas");
var info_c = document.getElementById("info");
var stage_c = document.getElementById("stage");

// キャンバスの描画コンテキストを取得
var ctx = canvas.getContext("2d");
var info = info_c.getContext("2d");
var stage = stage_c.getContext("2d");

// ゲームのステージサイズ
var canvasWidth = 400;
var canvasHeight = 800;

//ゲームキャンバスの各真ん中
var cvc_x = canvas.width / 2;
var cvc_y = canvas.height / 2;

// マウスの現在位置
var mouseX = 0;
var mouseY = 0;

//現在のゲーム状態
var nowPlay = false;

//プレイヤー情報
var playerSpeed = 15;//スピード
var nowFire = false;//発射中かどうか
var time = 0;
var secondTime = 0;
var kill = 0;
var nowWave = 0;
var score = 0;

//弾
var bullets = [];
//レーザー
var lasers = [];
//弾種類名前
var bullets_type_nameList = ["single", "triple", "single_laser", "x_laser", "+_laser", "wide", "single_slow",];
//弾種類ごと間隔
var bullets_type_interval = 1;

//テスト用弾変更インデックス
var test_bulletIndex = 0;


//敵
var enemys = [];

//アイテム
var items = [];

//プレイヤー
var player =null;


// イベントリスナーを登録する
var dm = [false, false, false, false];
canvas.addEventListener("mouseup", function (event) {
    if (event.button === 0) {
        if (nowPlay) {
            nowFire = false;
        }
    }
});
canvas.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
        if (nowPlay) {
            nowFire = true;
        }
        else {
            endF.reStart();
        }
    }
});
canvas.addEventListener('mousemove', function (event) {
    // マウスの座標を取得
    //mouseX = event.clientX - canvas.offsetLeft;
    //mouseY = event.clientY - canvas.offsetTop;
    const canvasRect = canvas.getBoundingClientRect();
    mouseX = event.clientX - canvasRect.left;
    mouseY = event.clientY - canvasRect.top;
});
document.addEventListener("keydown", function (event) { if (event.key === 'u' && dm[1]) { dm[2] = true; } });
