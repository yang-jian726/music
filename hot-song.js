$(function () {
    $.get('database.json').then(function (response) {
        response.forEach((i)=>{
            // console.log('iiii::: ',i)
            // let $li1 = hotSongsTemplate(i)
            if(i.id <= 30){
                $('.hot-song-content .hot-song').append(hotSongsTemplate(i))
            }
        })
    })
})

function hotSongsTemplate(i) {
    // debugger
    return $(`<li>
                   <a href="./html/song.html?&id=${i.id}">
                            <div class="hot-song-name-intro l">
                                <div class="hot-song-name">${i.name}</div>
                                <div class="hot-song-intro">${i.singer} - ${i.description}</div>
                            </div>
                    </a>
               </li>`)
}

var x = '';
var y = '';
for(let i = 1;i <= 3;i ++){
    x = x + "0" + i + "<br>"
}
document.getElementById("hot-song-num1").innerHTML=x;
for(let i = 4;i<=30;i ++){
    if(i <= 9) {
        y = y + "0" + i + "<br>"
    }else{
        y = y + i + "<br>"
    }
}
document.getElementById("hot-song-num2").innerHTML=y;
var z = '';
for (let i = 1;i <= 30;i ++){
    z = z + "<img src=\"../assets/images/player.png\">"+"<br>"
}
document.getElementById("player").innerHTML = z;
