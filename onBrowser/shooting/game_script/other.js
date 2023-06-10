
//スコア計算
function scoreCal() {
    let time_cal = 1.0;
    let kill_cal = 10.0;
    let wave_cal = 2.0;
    let mode = 1.0;

    if (dm[3]) mode = 0;
    return (time * time_cal + kill * kill_cal + nowWave * wave_cal) * mode;
}



//文字ランダム変更演出
function textRandomChange(text) {
    return {
        text_l: text.length + 1,
        index: 0,
        setText: text,
        resultText: "",
        startTime: 0,
        inUpdate: function (setTime) {
            let intervalTime = Math.floor(setTime / this.text_l * 100) / 100;

            //添え字がはみ出した時
            if (this.index + 1 >= this.text_l) return;

            //文字のランダム表示
            if (this.resultText.length < this.index + 1) {
                this.resultText += randomCharacter(this.setText[this.index]);
            } else {
                this.resultText = this.resultText.slice(0, - 1);
                this.resultText += randomCharacter(this.setText[this.index]);
            }

            //一文字表示時間を終えたとき
            //console.log(this.startTime + intervalTime +"<"+ time_f);
            if (this.startTime + intervalTime <= detailTime) {
                this.resultText = this.resultText.slice(0, - 1);
                this.resultText += this.setText[this.index];

                //console.log("InsertText : " + this.setText[this.index]);
                //console.log("InsertIndex : " + this.index);
                //console.log("ResultText : " + this.resultText[this.index]);

                //インデックスを次に
                this.index++;
                //一文字表示開始時間を更新
                this.startTime = detailTime;
            }
        },
        outUpdate: function (setTime) {
            let intervalTime = Math.floor(setTime / this.text_l * 100) / 100;

            //添え字がはみ出した時
            if (this.index + 1 >= this.text_l) return;

            //文字のランダム表示
            this.resultText = this.resultText.slice(0, - 1);
            this.resultText += randomCharacter(this.setText[this.resultText.length]);

            //一文字表示時間を終えたとき
            //console.log(this.startTime + intervalTime +"<"+ time_f);
            if (this.startTime + intervalTime <= detailTime) {
                this.resultText = this.setText.slice(0, -this.index - 1);

                //console.log("ResultText : " + this.resultText[this.index]);

                //インデックスを次に
                this.index++;
                //一文字表示開始時間を更新
                this.startTime = detailTime;
            }
        },
        trc: function () {
            return this.resultText;
        },
        reSet: function () {
            this.index = 0;
        }
    }
}



//文字の種類に合ったランダム文字を生成
function randomCharacter(refText) {
    const bigCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const smallCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const nuberCharacters = '0123456789';

    switch (charactersCheck(refText)) {
        case 0:
            return nuberCharacters.charAt(Math.floor(Math.random() * nuberCharacters.length));
        case 1:
            return bigCharacters.charAt(Math.floor(Math.random() * bigCharacters.length));
        case 2:
            return smallCharacters.charAt(Math.floor(Math.random() * smallCharacters.length));
    }
}


//文字種類判定チェッカー
document.addEventListener("keydown", function (event) { if (event.key === 'e' && dm[0]) { dm[1] = true; } });
function charactersCheck(str) {
    // 数字であるかを判定
    if (!isNaN(str)) {
        return 0;
    }
    // 大文字であるかを判定
    if (str.toUpperCase() === str) {
        return 1;
    }
    // 小文字であるかを判定
    if (str.toLowerCase() === str) {
        return 2;
    }

    console.log("error");
    return 99;
}


//相手に対して上下にいるかの判定
function checkHighLow(angle, y1, y2) {
    //上に向かって撃つっているとき
    if (angle % 360 === 0 && y1 > y2) {
        //console.log( parseInt(y1) +">"+  parseInt(y2));
        return true;
    }

    //下に向かって撃つっているとき
    if (angle % 360 === 180 && y1 < y2) {
        //console.log( parseInt(y1) +"<"+  parseInt(y2));
        return true;
    }

    return false;
}
//角度をxyベクトルに変換
function angleToVector(angle) {
    const radians = angle * Math.PI / 180; // 角度をラジアンに変換
    const x = Math.cos(radians);
    const y = Math.sin(radians);
    return { x: x, y: y }; // x方向とy方向のベクトルをオブジェクトとして返す
}

function textRandomEffect() {
    var textRC;
    return {
        text:"",
        textRC: textRC,
        changeNow: false,
        waveWait: false,
        inStartTime: 0,
        outStartTime: 0,
        changeInTime: 0.6,
        changeOutTime: 0.5,
        posX:0,
        posY:0,
        fontSize:0,
        inUpdate: function () {

            if (this.inStartTime + this.changeInTime > detailTime) {
                this.textRC.inUpdate(this.changeInTime);
            }
            else {
                this.textRC.reSet();
                this.changeNow = false;
            }

            ctx.font = this.fontSize+"px Arial";
            ctx.fillText(this.textRC.trc(),  this.posX - ctx.measureText(this.text).width / 2, this.posY);
            //console.log(this.textRC.trc());
        },
        outUpdate: function () {

            if (this.outStartTime + this.changeOutTime > detailTime) {
                this.waveWait = false;
                this.textRC.outUpdate(this.changeOutTime);
            }
            else {
                this.textRC.reSet();
                this.changeNow = false;
            }

            ctx.font = this.fontSize+"px Arial";
            ctx.fillText(this.textRC.trc(), this.posX - ctx.measureText(this.text).width / 2, this.posY);
            //console.log(this.textRC.trc());
        },
        in: function (text,fontSize,posX,posY) {
            this.changeNow = true;
            this.waveWait = true;
            this.inStartTime = detailTime;
            this.textRC = textRandomChange(text);
            this.text = text;
            this.posX = posX;
            this.posY = posY;
            this.fontSize = fontSize;
        },
        out: function () {
            this.changeNow = true;
            this.waveWait = true;
            this.outStartTime = detailTime;
        }
    }
}

//wave変更演出
function waveChange() {
    var textRC;
    return {
        textRC: textRC,
        changeNow: false,
        startTime: 0,
        changeInTime: 1,
        changePoseTime: 0.5,
        changeOutTime: 0.7,
        changeEndPoseTime: 0.5,
        update: function () {
            //console.log(time_f);
            if (this.startTime + this.changeInTime > detailTime) {
                this.textRC.inUpdate(this.changeInTime);
            }
            else if (this.startTime + this.changeInTime + this.changePoseTime > detailTime) {
                this.textRC._text = "Wave " + (nowWave + 1);
                this.textRC.reSet();
            }
            else if (this.startTime + this.changeInTime + this.changePoseTime + this.changeOutTime > detailTime) {
                this.textRC.outUpdate(this.changeOutTime);
            }
            else {
                this.textRC.reSet();
                this.changeNow = false;
            }

            ctx.font = "40px Arial";
            ctx.fillText(this.textRC.trc(), cvc_x - ctx.measureText("Wave " + (nowWave + 1)).width / 2, cvc_y);
            //console.log(this.textRC.trc());
        },
        on: function () {
            this.changeNow = true;
            this.startTime = detailTime;
            this.textRC = textRandomChange("Wave " + (nowWave + 1));
            //console.log(this.textRC.text);
        }
    }
}