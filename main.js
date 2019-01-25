//全局变量
var xxx = document.getElementById('xxx');
var context = xxx.getContext('2d');
var eraserEnable = false
var using = false
var lineWidth = 5
//自动设置画布大小
autoSetCanvasSize()

//工具选择
toolSwitch()

//选择铅笔颜色
listenToPalette()

//设置铅笔大小
setPencilSize()

//保存
savePicture()

//特性检测
peculiarityDetection()

/*****************************/


function savePicture(){
    var save = getTag('buttonSave')

buttonSave.onclick = function(){
    var url = xxx.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'My Picture'
    a.target = '_blank'
    a.click()
    console.log('1')
}
}

//监听画板
function listenToPalette() {
    var red = getTag('red')
    var green = getTag('green')
    var blue = getTag('blue')

    red.onclick = function () {
        context.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
    green.onclick = function () {
        context.strokeStyle = 'green'
        red.classList.remove('active')
        green.classList.add('active')
        blue.classList.remove('active')
    }
    blue.onclick = function () {
        context.strokeStyle = 'blue'
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.add('active')
    }
}

//特性检测
function peculiarityDetection() {
    if ('ontouchstart' in document.documentElement) { listenToTouch();console.log('当前是触屏设备')}
    else { listenToMouse() }
}

//触屏设备
function listenToTouch() {
    var lastPoint = { 'x': undefined, 'y': undefined }

    xxx.ontouchstart = function (info) {
        var x = info.touches[0].clientX
        var y = info.touches[0].clientY
        using = true

        if (eraserEnable) {
            context.clearRect(x, y, 8, 8)
        } else {
            lastPoint = { 'x': x, 'y': y }
        }
    }

    xxx.ontouchmove = function (info) {
        var x = info.touches[0].clientX
        var y = info.touches[0].clientY

        if (eraserEnable && using) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else if (using) {
            var newPoint = { 'x': x, 'y': y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //更新上一个点
        }
    }
    
    xxx.ontouchend = function () {
        using = false
    }
}

//非触屏设备
function listenToMouse() {
    var lastPoint = { 'x': undefined, 'y': undefined }

    xxx.onmousedown = function (info) {
        var x = info.clientX
        var y = info.clientY
        using = true

        if (eraserEnable) {
            context.clearRect(x, y, 8, 8)
        } else {
            lastPoint = { 'x': x, 'y': y }
        }
    }
    
    xxx.onmousemove = function (info) {
        var x = info.clientX
        var y = info.clientY

        if (eraserEnable && using) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else if (using) {
            var newPoint = { 'x': x, 'y': y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //更新上一个点
        }
    }

    xxx.onmouseup = function () {
        using = false
    }
}

function drawLine(x1, y1, x2, y2) {

    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = lineWidth
    context.stroke()
    context.closePath()


}

function getTag(tagid) {
    return document.getElementById(tagid)
}

function toolSwitch() {
    var pencil = getTag('pencil')
    var eraser = getTag('eraser')
    var clear = getTag('clear')


    pencil.onclick = function () {
        eraserEnable = false
        pencil.classList.add('active')
        eraser.classList.remove('active')
        clear.classList.remove('active')
    }
    eraser.onclick = function () {
        eraserEnable = true
        eraser.classList.add('active')
        pencil.classList.remove('active')
        clear.classList.remove('active')
    }
    clear.onclick = function () {
        context.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
        // pencil.classList.remove('active')
        // eraser.classList.remove('active')
        // clear.classList.add('active')
    }
}

function setPencilSize(){
    var onePx = getTag('onePx')
    var fivePx = getTag('fivePx')
    var tenPx = getTag('tenPx')
    
    onePx.onclick = function(){
        lineWidth = 1
    }
    fivePx.onclick = function(){
        lineWidth = 5
    }
    tenPx.onclick = function(){
        lineWidth = 10
    }
}




/*
function actionSwitch() {
    var eraser = getTag('eraser')
    var brush = getTag('brush')
    var action = getTag('action')

    eraser.onclick = function () {
        eraserEnable = true
        action.classList.add('b')
    }
    brush.onclick = function () {
        eraserEnable = false
        action.classList.remove('b')
    }
}
*/
function autoSetCanvasSize() {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }
}

function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    xxx.width = pageWidth
    xxx.height = pageHeight
}

