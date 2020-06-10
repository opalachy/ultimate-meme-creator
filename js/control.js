'use strict'

function init(){
    renderGallery();
}

function onEditorPage(id){
    getEditorPage(id);
}

function renderGallery(){
      var imgs = getImgs();
      var strHtmls = imgs.map(function (img) {
        return ` <div onclick="onEditorPage('${img.id}')">
        <img src="../sprint 2/meme-imgs (square)/${img.id}.jpg">
        </div>`
    });
    var elGal = document.querySelector('.gallery .grid-container');
    elGal.innerHTML = strHtmls.join('');
}

function onInput(){
    var x = document.getElementById("myInput").value;
    typeMeme(x)
}