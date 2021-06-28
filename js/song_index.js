$(function () {
    $.get('../playlist.json').then(function (reponse) {
        let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10);
        reponse.forEach((i)=>{
            if(i.id === id){
                $('.title-label .title .title-content').append(headTemplate(i));
                let detail = detailTemplate(i)
                //进行判断，是否有具体介绍
                if(detail.length <= 1){$('.intro > div').addClass('active')}else { $('.intro > div').removeClass('active')}
            }else{return}
        })
    });
    //歌曲列表
    $.get('../database.json').then(function (reponse) {
        reponse.forEach((i)=>{
            if(i.id <= 30){
                $('.list-content .list-song').append(playListTemplate(i))

            }
        })
    })
})
function headTemplate(i) {
    return  $(`<div class="cover">
                     <div class="song-menu">歌单</div>
                     <div class="listen">
                          <svg class="icon-headset"><use xlink:href="#icon-erjiicon"></use></svg><small class="listen-num">${i.listener}万</small>
                     </div>
                </div>
                <div>
                     <div class="subtitle-content">${i.title}</div>
                     <div class="avatar-link"><span>${i.author}</span></div>
                </div>`)
}

function detailTemplate(i) {
    let $intro = i.intro.split('<br/>')
    for(let j=0; j<$intro.length;j++){
        let $span = $(`<span>${$intro[j]}<br/></span>`)
        $('.intro > div.detail').append($span)
    }
    return $intro
}

function playListTemplate(i) {
    return $(`<li>
                <a href="../html/song.html?&id=${i.id}">
                     <div class="list-song-name-intro l">
                           <div class="list-song-name">${i.name}</div>
                           <div class="list-song-intro">${i.singer} - ${i.description}</div>
                     </div>
                </a>
              </li>`)
}

