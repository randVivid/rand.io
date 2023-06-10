//共通機能一覧

//指定ページに移動
function redirectToPage(url) {
    //console.log(url)
    window.location.href = url;
}

//ボタンを作成
function createButton(text, page,className) {
    //var currentRootPath = "https://vividmeu.xsrv.jp/"
    //var currentRootPath = "https://meu-my.github.io/page/"
    var currentRootPath = "https://randvivid.github.io/rand.io/"
    //var currentRootPath = "file:///M:/web/";
    var path = currentRootPath+page+".html"
    
    var button = document.createElement('button');
    button.className = className;
    button.innerHTML = text;
    button.setAttribute('onclick', "redirectToPage('"+path+"')");
    return button;
}

//アイコンを作成
function createLinkIcon(img, page) {
    //var currentRootPath = "https://vividmeu.xsrv.jp/img"
    //var currentRootPath = "https://meu-my.github.io/page/img"
    var currentRootPath = "https://randvivid.github.io/rand.io/img"
    //var currentRootPath = "file:///M:/web/img";
    var pagePath = "https://"+page
    var imgPath = currentRootPath+"/"+img+".png"

    var icon = document.createElement('div');
    icon.className = 'icon';
    icon.setAttribute('onclick', "redirectToPage('"+pagePath+"')");

    var img = document.createElement('img');
    img.setAttribute('src', imgPath);

    icon.appendChild(img);
    return icon;
}


// リクエストデータ
const requestData = {
    // リクエストに必要なデータを適宜設定
    key1: 'value1',
    key2: 'value2'
  };
  
  // リクエストの設定
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  };
  
  // アプリケーション層へのリクエストを送信
  function app_request(text)
  {
      // サーバーのURL
      const url = 'http://162.43.104.44:5000';
      console.log(text)
      console.log(url)
  
      fetch(url, requestOptions)
      .then(response => {
          if (response.ok) {
          return response.json(); // レスポンスデータの取得
          } else {
          throw new Error('Request failed.'); // エラー処理
          }
      })
      .then(data => {
          // レスポンスデータの利用
          console.log(data);
      })
      .catch(error => {
          // エラーハンドリング
          console.error(error);
      });
  }
  