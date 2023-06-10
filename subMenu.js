var loginState =false

document.addEventListener('DOMContentLoaded', function() {
    var subMenu = document.createElement('div');
    subMenu.className = 'subMenu';
    var subMenu_contents = document.createElement('div');
    subMenu_contents.className = 'contents';

    //ボタン
    if(false){
        if (loginState){
            var accountButton = createButton('Account', 'account/show_Account','accountButton');
        }
        else{
            var accountButton = createButton('Login', 'account/login_Account','loginButton');
        }
    }
    var homeButton = createButton('Home', 'index','button');
    var madeButton = createButton('Made', 'made','button');
    var onBrowserButton = createButton('OnWeb', 'onWeb','button');
    var otherButton = createButton('Other','other','button');

    //subMenu_contents.appendChild(accountButton);
    subMenu_contents.appendChild(homeButton);
    subMenu_contents.appendChild(madeButton);
    subMenu_contents.appendChild(onBrowserButton);
    subMenu_contents.appendChild(otherButton);

    subMenu.appendChild(subMenu_contents);
    // ページに追加
    document.body.insertBefore(subMenu, document.body.firstChild);
});

//サブメニューアイコンスイッチ時処理
var subMenu_dispedCheck = false
function dispSubMenu(){
    const subMenuContents = document.querySelector('.subMenu');
    
    if (subMenu_dispedCheck) {
        // メニューを非表示
        subMenuContents.style.transition = 'transform 0.3s ease'; // 0.3秒のトランジションを追加
        subMenuContents.style.transform = 'translateX(100%)';
        subMenu_dispedCheck = false
    } else {
        // メニューを表示
        subMenuContents.style.transition = 'transform 0.3s ease'; // 0.3秒のトランジションを追加
        subMenuContents.style.transform = 'translateX(0)';
        subMenu_dispedCheck = true
    }
}
