'use strict'

function init() {
    renderGallery();
}

function onEditorPage(id) {
    getEditorPage(id);
    // checkHammer();
}

function renderGallery() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        return ` <div onclick="onEditorPage('${img.id}')">
        <img src="meme-imgs (square)/${img.id}.jpg">
        </div>`
    });
    var elGal = document.querySelector('.gallery .grid-container');
    elGal.innerHTML = strHtmls.join('');
    var gMaxNums = getgMaxNums();
    for (var i = gMaxNums; i >= 1; i--) {
        var elText = document.querySelector(`.textbox.line${i}`);
        var strHtmls = `<div "></div>`;
        elText.innerHTML = strHtmls;
    }
    document.getElementById('myInput').value = '';
    restgNums();
}

function onMoveToGallery() {
    switchToGallery();
    renderGallery();
}

function onInput() {
    var elLetter = document.getElementById("myInput").value;
    typeMeme(elLetter)
}

function onAddTextLine(val) {
    addTextLine(val);
}
function onSwitchTextLine(val) {
    switchTextLine(val);
}
function onDeleteTextLine(val) {
    deleteTextLine(val);
}
