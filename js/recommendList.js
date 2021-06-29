//recommendList

// console.log('recommend')
$(function () {
    $.get('../playlist.json').then(function (reponse) {
        // console.log(reponse)
        reponse.forEach((reSong)=>{
            if(reSong.id <= 6){
                let $li = recommendTemplate(reSong)
                $('.recommendList .recommend_song').append($li)
                console.log($li)
            }else{return}
        })
        $('.recommendList .loading').remove()
    })
})

function recommendTemplate(reSong) {
    // debugger
    return  $(`<li>
                    <a href="../html/recommendList_content.html?id=${reSong.id}">
                         <div class="cover">
                             <img src="../assets/images/wenrou.jpg" alt="推荐歌曲1" class="cover-img"/>
                         </div>
                         <h3 class="recommendList-content-title">${reSong.title}</h3>
                    </a>
                </li>`)
}
