var nowStart = true;
var _entry1 = textRandomEffect()
var _entry2 = textRandomEffect()

function gameFisrt_start(){
    _entry1.in("click start", 40, cvc_x, cvc_y-50);
    _entry2.in("※枠がちょうど入るように調整してください",15, cvc_x, cvc_y+100);

    requestAnimationFrame(gameFirst);
}


//ゲーム開始前
function gameFirst() {
    if(nowStart){
        if(_entry1.changeNow){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _entry1.inUpdate();
            _entry2.inUpdate();
        }
        requestAnimationFrame(gameFirst);
    }
    else{
        if(_entry1.changeNow){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _entry1.outUpdate();
            _entry2.outUpdate();
            requestAnimationFrame(gameFirst);
        }
        else{
            gameFirst_end();
        }
    }
}


function gameFirst_end(){
    // ゲームループを開始
    console.log("gameStart");
    nowStart = false;
    nowPlay = true;
    detailTime=0;

    nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);
    nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);
    nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);
    nextWave.push(Math.max((Math.floor(Math.random() * wave_name.length - 1)), 0) + 1);
    //console.log(nextWave);

    _waveChange = waveChange();
    _waveChange.on();

    console.log("waveStart");
    requestAnimationFrame(gameLoop);
    player = createPlayer(canvas.width / 2, canvas.height / 2 + 30, 10, 'black');
}

//右クリック
var canvas = document.getElementById("gameCanvas");
canvas.addEventListener('mousedown', function (event) {
    if (event.button === 0 ) {
        if (nowStart){
            nowStart = false;
            _entry1.out();
            _entry2.out();
        }
    }
});

// ゲームループを開始
document.addEventListener('DOMContentLoaded', function() {
    requestAnimationFrame(gameFisrt_start);
})