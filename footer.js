document.addEventListener('DOMContentLoaded', function() {
    var footerContainer = document.createElement('footer');

    var icon_row = document.createElement('div');
    icon_row.className = "icon_row"
    
    //リンクテキスト
    var footer_text = document.createElement('div');
    footer_text.className = "footer_text"
    var footer_text_txt = document.createElement('a');
    footer_text_txt.innerHTML = "Link"
    footer_text.appendChild(footer_text_txt);

    //アイコン
    var twitter_icon = createLinkIcon('twitter_icon', 'twitter.com/@bv_ivi_vd');
    var youtube_icon = createLinkIcon('youtube_icon', 'youtube.com/@bv_ivi_vd');

    //コピーライト
    var footer_copylight = document.createElement('div');
    footer_copylight.className = "footer_copylight"
    var footer_copylight_txt = document.createElement('a');
    footer_copylight_txt.innerHTML = "© 2023 rand"
    footer_copylight.appendChild(footer_copylight_txt);

    icon_row.appendChild(footer_text);
    icon_row.appendChild(twitter_icon);
    icon_row.appendChild(youtube_icon);
    icon_row.appendChild(footer_copylight);

    footerContainer.appendChild(icon_row);
    // ページに追加
    document.body.insertBefore(footerContainer, document.body.firstChild);
});
