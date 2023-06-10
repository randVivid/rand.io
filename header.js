document.addEventListener('DOMContentLoaded', function() {
    var headerContainer = document.createElement('header');

    var nav = document.createElement('nav');
    var ul = document.createElement('ul');

    //ボタン
    var homeButton = createButton('Home', 'index','button');
    var madeButton = createButton('Made', 'made','button');
    var onBrowserButton = createButton('OnWeb', 'onWeb','button');
    var otherButton = createButton('Other','other','button');

    ul.appendChild(homeButton);
    ul.appendChild(madeButton);
    ul.appendChild(onBrowserButton);
    ul.appendChild(otherButton);

    //サブメニューアイコン
    var subMenu = createSubMenuIcon();

    nav.appendChild(ul);
    nav.appendChild(subMenu);
    headerContainer.appendChild(nav);

    // ページに追加
    document.body.insertBefore(headerContainer, document.body.firstChild);

    //  サブメニューアイコンを作成
    function createSubMenuIcon() {
        //var currentRootPath = "https://vividmeu.xsrv.jp/img"
        var currentRootPath = "https://randvivid.github.io/rand.io/img"
        //var currentRootPath = "https://meu-my.github.io/page/img"
        //var currentRootPath = "file:///M:/web/img";
        var imgPath = currentRootPath+"/subMenu_icon_black.png"

        var subMenu = document.createElement('div');
        subMenu.className = 'subMenu_icon';
        subMenu.setAttribute('onclick', "dispSubMenu()");
        //画像
        var img = document.createElement('img');
        img.setAttribute('src', imgPath);

        subMenu.appendChild(img);
        return subMenu;
    }
});

//サブメニューアイコンのホバー処理
document.addEventListener('DOMContentLoaded', function() {
    const subMenu = document.querySelector('header .subMenu_icon');
    const subMenuImg = document.querySelector('header .subMenu_icon img');
    
    //var currentRootPath = "https://vividmeu.xsrv.jp/img"
    var currentRootPath = "https://randvivid.github.io/rand.io/img"
    //var currentRootPath = "https://meu-my.github.io/page/img"
    //var currentRootPath = "file:///M:/web/img";
    var hoverImageSrc = currentRootPath+"/subMenu_icon_white.png"
    var defaultImageSrc = currentRootPath+"/subMenu_icon_black.png"

    subMenu.addEventListener('mouseover', function() {
        subMenuImg.src = hoverImageSrc;
    });

    subMenu.addEventListener('mouseout', function() {
        subMenuImg.src = defaultImageSrc;
    });
});
