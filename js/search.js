//导入数据
//设置接口
function initAjax() {
    let request= new XMLHttpRequest();
    request.open('GET',"../database.json")
    request.setRequestHeader("Content-Type", "application/json");
    return request
}
//
var timer = null;
$('input#search').on('input',function(e){
    timer = setTimeout(function () {
        timer = null;
        let value = $(e.currentTarget).val().trim()
        if(value === ''){
            return
        }else{
            searchPrepare(value)
            ajax(value)
        }
    },100)
    if(null){window.clearTimeout(timer)}
})

//search栏清除功能
$('.clearInput').on('click',function(e){
    $('input#search').val('')
    $('.result').removeClass('active')
})


//search prepare
function searchPrepare(value) {
    $('.result').addClass('active')
}

function  ajax(value) {
    let request = initAjax();
    //请求
    request.onload = function () {
        let data = parse(request);
        loadingSearch(data,value)
    }
    request.send()
}

function parse(request) {
    let data = JSON.parse(request.responseText);
    return data
}

function loadingSearch(data,value) {
    for(let i=0; i<data.length;i++){
        //信息包含歌曲或歌手或专辑
        if(data[i].name.includes(value)||data[i].singer === value||data[i].album.includes(value)){
            $('.result .history .history-Info').addClass('active').append(recordsTemplate(data[i]))
        }
    }
}
function recordsTemplate(song) {
    return  $(`<li data-id="${song.id}">
                 <svg class="icon-lishi"><use xlink:href="#icon-lishi"></use></svg>
                 <div class="lishi-name"><a href="../html/song.html?id=${song.id}">${song.name}</a></div>
                 <svg class="icon-clear" onclick="clearRecords(${song.id})"><use xlink:href="#icon-guanbixiao"></use></svg>
             </li>`)
}
function clearRecords(id) {
    let li = "li[data-id='"+ id +"']"
    $(li).remove()
}
