$(function(){
    var id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
    $.get('../database.json').then(function (response) {
        var songs = response;
        var song = songs.filter(s=>s.id === id)[0];
        var {url,name,singer,lyric,pagebg,cover} = song;

        //来源、背景、歌曲详细信息
        play(url);
        Img(pagebg,cover);
        SongInfo(name,singer,lyric);

    });

    function play(url){
        var audio = document.createElement('audio');
        audio.src= url;
        document.body.appendChild(audio)
        $('.icon-play').on('click',function(){audio.play(); add()});
        $('.icon-pause').on('click',function(){audio.pause(); remove()});
        audio.onended =function(){remove()}
    }
    function SongInfo(name,singer,lyric){
        //name、singer、lyric
        $('.song-description h1 .songName').text(name);
        $('.song-description h1 .author').text(singer);
        parseLyric.call(undefined,lyric)
    }
    function Img(pagebg,cover) {
        $('.page').css('background-image',`url(${pagebg})`)
        $('.disc > .cover').removeAttr('src')
        $('.disc > .cover').attr('src',`${cover}`)
    }
    function parseLyric(lyric) {
        let array = lyric.split('\n');
        let a = /^\[(.+)\](.*)$/;
        array = array.map(function (string,index) {
            let match = string.match(a);
            if(match){
                return{time:match[1],words:match[2]}
            }
        })
        let $lines = $('.lines')
        array.map(function (object) {
            if(!object){ return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lines)
        })
    }
})

function remove() {
    $('.disc .light').removeClass('playing');
    $('.disc .cover').removeClass('playing');
    $('.icon-wrapper').removeClass('playing')
}
function add() {
    $('.disc .light').addClass('playing');
    $('.disc .cover').addClass('playing');
    $('.icon-wrapper').addClass('playing')
}


var xhr = new XMLHttpRequest();
xhr.responseType = 'arraybuffer';
xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status===200){
        var aCtx = new AudioContext();
        aCtx.decodeAudioData(xhr.response,function (rr) {
            var sNode = aCtx.createBufferSource();
            sNode.buffer = rr;
            sNode.connect(aCtx.destination);
            sNode.start(0);
        })

    }else {
        console.log("错误")
    }
};
xhr.open("POST","../assets/music/dy.m4a",true);
xhr.send();

