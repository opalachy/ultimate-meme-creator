'use strict'
var gElCanvas;
var gCtx;
var gFontColor = 'white';
var gStrockeColor = 'black';
var gFontType = 'Impact';
var gFontSize = 30;
var gTextAlign = 'center'
var gNumTextBox = 1;
var gX = 150;
var gMemes;
var gMaxNums = 3;
gElCanvas = document.getElementById('my-canvas');
gCtx = gElCanvas.getContext('2d');
var gKeywords = { 'happy': 0, 'funny': 0, 'animals': 0, 'childrens': 0, 'leaders': 0, 'movie starts': 0 };
var gImgs = [
    { id: 1, url: 'meme-imgs(square)/1.jpg', keywords: ['leadrs'] },
    { id: 2, url: 'meme-imgs(square)/2.jpg', keywords: ['animals'] },
    { id: 3, url: 'meme-imgs(square)/3.jpg', keywords: ['animals', 'childrens'] },
    { id: 4, url: 'meme-imgs(square)/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'meme-imgs(square)/5.jpg', keywords: ['childrens'] },
    { id: 6, url: 'meme-imgs(square)/6.jpg', keywords: ['movie starts'] },
    { id: 7, url: 'meme-imgs(square)/7.jpg', keywords: ['childrens'] },
    { id: 8, url: 'meme-imgs(square)/8.jpg', keywords: ['happy', 'movie starts'] },
    { id: 9, url: 'meme-imgs(square)/9.jpg', keywords: ['happy', 'childrens'] },
    { id: 10, url: 'meme-imgs(square)/10.jpg', keywords: ['happy', 'leadrs'] },
    { id: 11, url: 'meme-imgs(square)/11.jpg', keywords: ['movie starts'] },
    { id: 12, url: 'meme-imgs(square)/12.jpg', keywords: ['movie starts'] },
    { id: 13, url: 'meme-imgs(square)/13.jpg', keywords: ['movie starts'] },
    { id: 14, url: 'meme-imgs(square)/14.jpg', keywords: ['movie starts'] },
    { id: 15, url: 'meme-imgs(square)/15.jpg', keywords: ['movie starts'] },
    { id: 16, url: 'meme-imgs(square)/16.jpg', keywords: ['happy', 'movie starts'] },
    { id: 17, url: 'meme-imgs(square)/17.jpg', keywords: ['leadrs'] },
    { id: 18, url: 'meme-imgs(square)/18.jpg', keywords: ['movie starts'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 0, align: '', color: '', strocke: '', fontfamily: '' },
        { txt: '', size: 0, align: '', color: '', strocke: '', fontfamily: '' },
        { txt: '', size: 0, align: '', color: '', strocke: '', fontfamily: '' }
    ]
}

function getImgs() {
    return gImgs;
}

function getEditorPage(id) {
    var elGal = document.querySelector('.gallery.container.flex');
    elGal.style.display = 'none'
    var elEditor = document.querySelector('.editor.flex');
    elEditor.style.display = 'flex'
    gMeme.selectedImgId = id;
    drawImg(id);
}

function switchToGallery() {
    var elGal = document.querySelector('.gallery.container.flex');
    elGal.style.display = 'block'
    var elEditor = document.querySelector('.editor.flex');
    elEditor.style.display = 'none'
}

function drawImg(id) {
    var elImg = new Image();
    elImg.src = `meme-imgs (square)/${id}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, 300, 150);
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, 500, 500);
}

function getgMaxNums(){
    return gMaxNums;
}

function restgNums(){
    gNumTextBox = 1;
}


function drawText() {
    for (var i = gNumTextBox; i >= 1; i--) {
        var elText = document.querySelector(`.textbox.line${i}`);
        // elText.style.display = 'list-item';
        var strHtmls = `<div style="font-size: ${gMeme.lines[i - 1].size + 'px'}; font-family: ${gMeme.lines[i - 1].fontfamily}; color:
         ${gMeme.lines[i - 1].color}; text-align: ${gMeme.lines[i - 1].align}; stroke: ${gMeme.lines[i - 1].strocke};">${gMeme.lines[i - 1].txt}</div>`;
        elText.innerHTML = strHtmls;
    }
}


function typeMeme(letter) {
    for (var i = 1; i < 4; i++) {
        if (i === gNumTextBox) break;
    }
    gMeme.lines[i - 1].txt = letter;
    gMeme.lines[i - 1].size = gFontSize;
    gMeme.lines[i - 1].align = gTextAlign;
    gMeme.lines[i - 1].color = gFontColor;
    gMeme.lines[i - 1].strocke = gStrockeColor;
    gMeme.lines[i - 1].fontfamily = gFontType;
    clearCanvas();
    drawImg(gMeme.selectedImgId);
    setTimeout(function () { drawText() }, 3);
}

function addTextLine(val) {
    if (gNumTextBox <= 2) {
        gNumTextBox++
        var elText = document.querySelector(`.textbox.line${gNumTextBox}`);
        elText.style.display = 'list-item';
        document.getElementById('myInput').value = gMeme.lines[gNumTextBox - 1].txt;
    } else {
        return
    }
}

function switchTextLine(val){
    if (gNumTextBox === 2 ){
        gNumTextBox =1;
    }else if (gNumTextBox === 1 && gMeme.lines[2].txt === ''){
        gNumTextBox=2;
    }else if (gNumTextBox === 1 && gMeme.lines[2].txt !== ''){
        gNumTextBox = 3;
    }else{
        gNumTextBox = 2;
    }
    document.getElementById('myInput').value = gMeme.lines[gNumTextBox - 1].txt;
}

function deleteTextLine(val){
    gMeme.lines[gNumTextBox - 1].txt = '';
    document.getElementById('myInput').value = '';
    drawText();
}

// var y = getY();

// function drawRect() {
//     var y = getY();
//     gCtx.beginPath();
//     gCtx.rect(0, y, 300, 30);
//     gCtx.strokeStyle = 'black';
//     gCtx.stroke();
//     gCtx.fillStyle = '#ffffff00';
//     gCtx.fillRect(0, y, 300, 30);
// }

// setTimeout(function () { drawText(letter, (y + (30 + 30) / 2)) }, 3);

// function getY() {
//     var y;
//     if (gNumTextBox === 1) {
//         y = 10;
//     } else if (gNumTextBox === 2) {
//         y = 110;
//     } else if (gNumTextBox === 3) {
//         y = 60;
//     } else {
//         return null;
//     }
//     return y;
// }


// function drawText(text, y) {
//     for (var i = gNumTextBox; i >= 1; i--) {

//     }
//     drawRect();
//     gCtx.lineWidth = '1';
//     gCtx.strokeStyle = `${gStrockeColor}`;
//     gCtx.fillStyle = `${gFontColor}`;
//     gCtx.font = `${gFontSize + 'px'} ${gFontType}`;
//     gCtx.textAlign = `${gTextAlign}`;
//     gCtx.fillText(text, gX, y);
//     gCtx.strokeText(text, gX, y);
// gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);


// var gCurrShape;
// var gX;
// var gY;
// var elTextColor;

// function init() {
//     gElCanvas = document.getElementById('my-canvas');
//     gCtx = gElCanvas.getContext('2d');
//     resizeCanvas();
//     gCtx.fillStyle = 'white';
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
//     window.addEventListener('resize', resizeCanvas);
//     gCurrShape = 'Triangle';
//     elTextColor = document.querySelector('[name=textColor]').value;
//     checkHammer();
// }
// function getColor() {
//     elTextColor = document.querySelector('[name=textColor]').value;
// }

// function checkHammer() {
//     const elBox = document.querySelector('.canvas-container');
//     var hammer = new Hammer(elBox);
//     hammer.on('panleft panright panup pandown tap doubletap press swipe', function (ev) {
//         drag(ev.srcEvent);
//         const { offsetX, offsetY } = ev;
//     });
// }

// function onDownloadCanvas(elLink) {
//     const data = gElCanvas.toDataURL();
//     elLink.href = data;
//     elLink.download = 'Your Awesome Canvas';
// }

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     gElCanvas.width = elContainer.offsetWidth;
//     gElCanvas.height = elContainer.offsetHeight;
// }

// function setShape(shape) {
//     gCurrShape = shape;
// }

// function draw(ev) {
//     const { offsetX, offsetY } = ev;
//     switch (gCurrShape) {
//         case 'Rectangle':
//             drawRect(offsetX, offsetY);
//             break;
//         case 'Random Letter':
//             drawText(String.fromCharCode(Math.floor(Math.random() * 26) + 65), offsetX, offsetY);
//             break;
//     }
// }
// }