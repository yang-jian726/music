$(function () {
    $.get('../database.json').then(function (response) {
        response.forEach((i)=>{
            if(i.id >= 7 && i.id <= 16){
                let $li = newestTemplate(i)
                $('.newestList .newestSongs').append($li)
            }
        })
        $('.newestList .loading').remove()
    })
})
function newestTemplate(i) {
    return $(`<li>
                   <a href="../html/song.html?id=${i.id}">
                        <div class="newestList-content-name-intro l">
                            <div class="newestList-content-name">${i.name}</div>
                            <div class="newestList-content-intro"><i class="icon-sq"> </i><span>${i.singer} - ${i.name}</span></div>
                        </div>
                        <div class="playButton l">
                        <img src="../assets/images/player.png"></span>
                        </div>
                   </a>
               </li>`)
}