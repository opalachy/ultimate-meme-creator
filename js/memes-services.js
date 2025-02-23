'use strict'
var KEY = 'memes';
var gElCanvas;
var gCtx;
var gFontColor = 'white';
var gStrockeColor = 'black';
var gFontType = 'Impact';
var gFontSize = 30;
var gTextAlign = 'center'
var gNumTextBox = 1;
var gX = 250;
var gMemes;
var gSortImgs = [];
var gMaxNums = 3;
var gRecSize = 0;
gElCanvas = document.getElementById('my-canvas');
gCtx = gElCanvas.getContext('2d');
var gY = [70, 450, 250];
var gKeywords = { 'happy': 0, 'funny': 0, 'animals': 0, 'childrens': 0, 'leaders': 0, 'movie star': 0 };
var gImgs = [
    { id: 1, url: 'meme-imgs(square)/1.jpg', keywords: ['leaders'] },
    { id: 2, url: 'meme-imgs(square)/2.jpg', keywords: ['animals'] },
    { id: 3, url: 'meme-imgs(square)/3.jpg', keywords: ['animals', 'childrens'] },
    { id: 4, url: 'meme-imgs(square)/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'meme-imgs(square)/5.jpg', keywords: ['childrens'] },
    { id: 6, url: 'meme-imgs(square)/6.jpg', keywords: ['movie star'] },
    { id: 7, url: 'meme-imgs(square)/7.jpg', keywords: ['childrens'] },
    { id: 8, url: 'meme-imgs(square)/8.jpg', keywords: ['happy', 'movie star'] },
    { id: 9, url: 'meme-imgs(square)/9.jpg', keywords: ['happy', 'childrens'] },
    { id: 10, url: 'meme-imgs(square)/10.jpg', keywords: ['happy', 'leaders'] },
    { id: 11, url: 'meme-imgs(square)/11.jpg', keywords: ['movie star'] },
    { id: 12, url: 'meme-imgs(square)/12.jpg', keywords: ['movie star'] },
    { id: 13, url: 'meme-imgs(square)/13.jpg', keywords: ['movie star'] },
    { id: 14, url: 'meme-imgs(square)/14.jpg', keywords: ['movie star'] },
    { id: 15, url: 'meme-imgs(square)/15.jpg', keywords: ['movie star'] },
    { id: 16, url: 'meme-imgs(square)/16.jpg', keywords: ['happy', 'movie star'] },
    { id: 17, url: 'meme-imgs(square)/17.jpg', keywords: ['leaders'] },
    { id: 18, url: 'meme-imgs(square)/18.jpg', keywords: ['movie star'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 20, align: '', color: '', strocke: '', fontfamily: '' },
        { txt: '', size: 20, align: '', color: '', strocke: '', fontfamily: '' },
        { txt: '', size: 20, align: '', color: '', strocke: '', fontfamily: '' }
    ]
}

function getImgs() {
    if (gSortImgs.length === 0) {
        gSortImgs = gImgs;
    }
    return gSortImgs;
}

function getEditorPage(id) {
    var elGal = document.querySelector('.gallery-wrapper.container.flex');
    elGal.style.display = 'none'
    var elEditor = document.querySelector('.editor.flex');
    elEditor.style.display = 'flex' //check if you can just put flex before
    gMeme.selectedImgId = id;
    drawImg(id);
}

function showSavedMemes() {
    var elGal = document.querySelector('.gallery-wrapper.container.flex');
    elGal.style.display = 'none'
    var elSavsedMemes = document.querySelector('.gallery-wrapper.container.flex.saved-memes');
    elSavsedMemes.style.display = 'flex'
    renderSavedMemes();
}

function getSearchKeyword() {
    gSortImgs = [];
    var searchWord = document.getElementById("mySearch").value;
    document.getElementById("mySearch").value = '';
    //todo: use forEach
    gImgs.map(function (img) {
        img.keywords.filter(function (keyword) {
            if (keyword === searchWord) {
                gSortImgs.push(img);
            }
            return
        });
        return
    });
}

function switchToGallery() {
    var elGal = document.querySelector('.gallery-wrapper.container.flex');
    elGal.style.display = 'block'
    var elEditor = document.querySelector('.editor.flex');
    elEditor.style.display = 'none'
    var elSavsedMemes = document.querySelector('.gallery-wrapper.container.flex.saved-memes');
    elSavsedMemes.style.display = 'none'
    gY = [70, 450, 250];
}

function restText() {
    for (let i = 0; i < gMaxNums; i++) {
        gMeme.lines[i].txt = '';
    }
}
function drawImg(id) {
    var elImg = new Image();
    elImg.src = `meme-imgs (square)/${id}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText();
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function getgMaxNums() {
    return gMaxNums;
}

function restgNums() {
    gNumTextBox = 1;
}
function setFontType(fonttype) {
    gFontType = fonttype;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}

function increaseFontSize(val) {
    gFontSize += val;
    gRecSize += val;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function decreaseFontSize(val) {
    gFontSize -= val;
    gRecSize -= val;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function alignLeft(val) {
    gTextAlign = val;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function alignRight(val) {
    gTextAlign = val;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function alignCenter(val) {
    gTextAlign = val;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function changeStrockeColor() {
    gStrockeColor = document.querySelector('[name=strockeColor]').value;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
}
function changeFontColor() {
    gFontColor = document.querySelector('[name=textColor]').value;
    typeMeme(gMeme.lines[gNumTextBox - 1].txt)
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
    drawImg(gMeme.selectedImgId);

}

function addTextLine(val) {
    if (gNumTextBox <= 2) {
        gNumTextBox += val;
        typeMeme(gMeme.lines[gNumTextBox - 1].txt);
        document.getElementById('myInput').value = gMeme.lines[gNumTextBox - 1].txt;
    } else return
}

function switchTextLine() {
    if (gNumTextBox === 2) {
        gNumTextBox = 1;
    } else if (gNumTextBox === 1 && gMeme.lines[2].txt === '') {
        gNumTextBox = 2;
    } else if (gNumTextBox === 1 && gMeme.lines[2].txt !== '') {
        gNumTextBox = 3;
    } else {
        gNumTextBox = 2;
    }
    document.getElementById('myInput').value = gMeme.lines[gNumTextBox - 1].txt;
    drawImg(gMeme.selectedImgId);
}

function deleteTextLine() {
    gMeme.lines[gNumTextBox - 1].txt = '';
    document.getElementById('myInput').value = '';
    drawImg(gMeme.selectedImgId);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'Your Awesome Meme';
}

function drawRect() {
    var y = getY();
    gCtx.beginPath();
    gCtx.rect(0, y, gElCanvas.width, (40 + gRecSize));
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = '#ffffff00';
    gCtx.fillRect(0, y, gElCanvas.width, (40 + gRecSize));
}

function getY() {
    var y;
    if (gNumTextBox === 1) {
        y = gY[0];
    } else if (gNumTextBox === 2) {
        y = gY[1];
    } else if (gNumTextBox === 3) {
        y = gY[2];
    } else {
        return null;
    }
    return y;
}

function drawText() {
    for (var i = gMaxNums; i >= 1; i--) {
        drawRect();
        gCtx.lineWidth = '1';
        gCtx.strokeStyle = `${gMeme.lines[i - 1].strocke}`;
        gCtx.fillStyle = `${gMeme.lines[i - 1].color}`;
        gCtx.font = `${gMeme.lines[i - 1].size + 'px'} ${gMeme.lines[i - 1].fontfamily}`;
        gCtx.textAlign = `${gMeme.lines[i - 1].align}`;
        gCtx.fillText(`${gMeme.lines[i - 1].txt}`, gX, gY[i - 1] + (gMeme.lines[i - 1].size));
        gCtx.strokeText(`${gMeme.lines[i - 1].txt}`, gX, gY[i - 1] + (gMeme.lines[i - 1].size));
    }
}

function checkHammer() {
    const elBox = document.querySelector('.canvas-container');
    var hammer = new Hammer(elBox);
    hammer.on('panup pandown panup panup', function (ev) {
        const { offsetY } = ev.srcEvent;
        gY[gNumTextBox - 1] = offsetY;
        typeMeme(gMeme.lines[gNumTextBox - 1].txt);
    });
}

function updategMemes() {
    var memes = loadFromStorage(KEY)
    if (!memes || !memes.length) {
        memes = [];
    }
    gMemes = memes;
    _saveMemesToStorage();
    gMemes.unshift(JSON.parse(JSON.stringify(gMeme)));
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)
}

function renderSavedMemes() {
    const memes = loadFromStorage(KEY)
    if (!memes || !memes.length) return;
    var strHtmls = memes.map(function (meme) {
        return ` <div class="imges" onclick="onEditorPage(${meme.selectedImgId})">
            <img style="width: 200px; height: 200px;" src="DESIGN/Meme1 - Sergei/ICONS/Under-Constraction.JPG">
            </div>`
    });
    var elGal = document.querySelector('.gallery.pictures.container.flex.saved-memess');
    elGal.innerHTML = strHtmls.join('');
    console.log(memes)
}
