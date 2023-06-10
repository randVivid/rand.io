
//ゲーム終了時のループを設定
function gameEnd() {

    if (endF.backPos >= canvas.height) {
        endF.update();
    }
    else {
        endF.endChange();
    }

    if (endF.gameEnd_outTime >= canvas.height) {
        console.log("nextGame");
        location.reload();
    }
    else {
        // 次のフレームを要求
        requestAnimationFrame(gameEnd);
    }
}

const endF = gameEndFunction();
function gameEndFunction() {
    return {
        gameEnd_inTime: 0,
        gameEnd_outTime: 0,
        backPos: 0,
        endCheck: false,
        update: function () {
            let inLimit = 30;

            // キャンバスをクリア
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            info.clearRect(0, 0, info_c.width, info_c.height);
            stage.clearRect(0, 0, stage_c.width, stage_c.height);


            //back
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            ctx.fillStyle = "white";
            //text1
            ctx.font = "30px Arial";
            var text = "Game Over";
            ctx.fillText(text, cvc_x - ctx.measureText(text).width / 2, cvc_y - 220);


            //score
            ctx.font = "13px Arial";
            var text = "score";
            ctx.fillText(text, cvc_x - ctx.measureText(text).width / 2, cvc_y - 80);

            ctx.font = "30px Arial";
            var text = scoreCal().toString();
            ctx.fillText(text, cvc_x - ctx.measureText(text).width / 2, cvc_y - 40);


            //restart
            let textLine_w = 180;
            let textLine_h = 0.8;
            let textLine_x = cvc_x - textLine_w / 2;
            let textLine_y = cvc_y + 105;

            ctx.font = "13px Arial";
            var text = "ReStart";
            let text_x = cvc_x - ctx.measureText(text).width / 2;
            let text_y = cvc_y + 100;

            let button_w = 300;
            let button_h = 80;
            let button_x = cvc_x;
            let button_y = cvc_y + 100;


            if (button_x - button_w / 2 < mouseX && mouseX < button_x + button_w / 2 &&
                button_y - button_h / 2 < mouseY && mouseY < button_y + button_h / 2) {

                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillText(text, text_x, text_y);

                //ctx.fillRect(button_x - button_w / 2, button_y - button_h / 2, button_w, button_h);

                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillRect(textLine_x, textLine_y, textLine_w, textLine_h);

                restartCheck = true;
            }
            else {
                ctx.fillStyle = "rgb(100,100,100)";
                ctx.fillText(text, text_x, text_y);
                restartCheck = false;
            }


            //text2
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "18px Arial";
            var text = "Thank you for playing!!!";
            ctx.fillText(text, cvc_x - ctx.measureText(text).width / 2, cvc_y + 230);

            ctx.font = "11px Arial";
            var text = "made by rand";
            ctx.fillText(text, cvc_x - ctx.measureText(text).width / 2, cvc_y + 260);

            //ゲームの再スタート
            if (this.endCheck) {
                this.startChange();
            }

            //初期表示フェード
            ctx.fillStyle = "rgb(0,0,0," + (1 - this.gameEnd_inTime / inLimit) + ")";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (this.gameEnd_inTime < inLimit) {
                this.gameEnd_inTime++;
            }
        },
        startChange: function () {
            let maxSpeed = 11;

            //back
            ctx.fillStyle = "white";
            ctx.fillRect(0, this.gameEnd_outTime - canvas.height, canvas.width, canvas.height);

            let speed = Math.max(1, maxSpeed * (canvas.height - this.gameEnd_outTime) / 80)
            this.gameEnd_outTime += speed;

        },
        endChange: function () {
            let maxSpeed = 11;

            let infoMove = this.backPos / 4;
            info.fillStyle = "white";
            stage.fillStyle = "white";
            info.fillRect(infoMove - info_c.width, 0, info_c.width, info_c.height);
            stage.fillRect(-infoMove + stage_c.width, 0, stage_c.width, stage_c.height);


            //back
            ctx.fillStyle = "black";
            ctx.fillRect(0, this.backPos - canvas.height, canvas.width, canvas.height);

            let speed = Math.max(1, maxSpeed * (canvas.height - this.backPos) / 80)
            this.backPos += speed;
            //console.log("changeNow" + speed);
        },
        reStart: function () {
            if (restartCheck) this.endCheck = true;
        }
    }
}
function gameStart_fade() {

    let setSecondTIme = 60;

    if (secondTime < setSecondTIme && time < 1) {

        let infoMove = secondTime * secondTime / 10;
        info.fillStyle = "white";
        stage.fillStyle = "white";
        info.fillRect(infoMove, 0, info_c.width, info_c.height);
        stage.fillRect(-infoMove, 0, stage_c.width, stage_c.height);
    }
}