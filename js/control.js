'use strict'

function init() {
    renderGallery();
}

function onEditorPage(id) {
    getEditorPage(id);
    checkHammer();
    setTimeout(drawRect, 3);
}

function renderGallery() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        return ` <div class="imges" onclick="onEditorPage('${img.id}')">
        <img style="width: 200px; height: 200px;" src="meme-imgs (square)/${img.id}.jpg">
        </div>`
    });
    var elGal = document.querySelector('.gallery.pictures');
    elGal.innerHTML = strHtmls.join('');
    restText();
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
function onSwitchTextLine() {
    switchTextLine();
}
function onDeleteTextLine() {
    deleteTextLine();
}
function onIncreaseFontSize(val) {
    increaseFontSize(val);
}
function onDecreaseFontSize(val) {
    decreaseFontSize(val);
}
function onChangeStrockeColor() {
    changeStrockeColor();
}
function onChangeFontColor() {
    changeFontColor();
}
function onAlignLeft(val) {
    alignLeft(val);
}
function onAlignRight(val) {
    alignRight(val);
}
function onAlignCenter(val) {
    alignCenter(val);
}
function onSetFontType(fonttype) {
    setFontType(fonttype);
}
function onDownloadCanvas(elLink) {
    downloadCanvas(elLink);
}
