/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

class MovingShapes {
    constructor(canvas, width, height) {
        this._canvas = canvas;
        this._width = this._canvas.width = width;
        this._height = this._canvas.height = height;
        this._ctx = this._canvas.getContext("2d");

        this._animationSpeed = 1 / 16;
        this._frameDistance = 0;
        this._playing = false;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
    setItems(items) {
        this._items = items || [];
        this._itemsCount = this._items.length;

    }

    _clear() {
        this._ctx.clearRect(0, 0, this._width, this._height);
    }

    _updateFrameDistance() {
        var newTime = Date.now();
        this._frameDistance = (newTime - this._time) * this._animationSpeed;
        this._time = newTime;
    }

    _mainLoop() {

        this._updateFrameDistance();

        this._clear();
        this._reDrawItems();
        this._loop();
    }

    _reDrawItems() {

        for (let i = 0; i < this._itemsCount; i++) {
            let item = this._items[i];
            this._updateItemVector(item);

            item.move(this._frameDistance, this._frameDistance);
            item.draw(this._ctx);

        }
    }

    _updateItemVector(item) {
        let itemLeft = item.getLeft();
        let itemTop = item.getTop();

        if (itemLeft + item.getWidth() >= this._width || itemLeft <= 0) {
            item.bounceHorizontal();
        }

        if (itemTop + item.getHeight() >= this._height || itemTop <= 0) {
            item.bounceVertical();
        }
    }

    start() {
        this._time = Date.now();
        this._playing = true;
        this._mainLoop();
    }

    stop() {
        this._playing = false;
    }

    _loop() {
        if (this._playing) {
            window.requestAnimationFrame(() => {
                this._mainLoop();
            });
        }
    }
}



class Square {
    constructor(top, left, width, height) {
        this._top = top;
        this._left = left;
        this._width = width;
        this._height = height;
        this._speed = 1;
        this._xVector = 1;
        this._yVector = 1;
        this._color = 'red';
    }

    setTop(top) {
        this._top = top;
    }
    setLeft(left) {
        this._left = left;
    }
    setWidth(width) {
        this._width = width;
    }
    setHeight(height) {
        this._height = height;
    }
    setColor(color) {
        this._color = color;
    }

    setSpeed(speed) {
        this._speed = speed;
    }
    getTop() {
        return this._top;
    }
    getLeft() {
        return this._left;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }

    bounceHorizontal() {
        this._xVector *= -1;
    }
    bounceVertical() {
        this._yVector *= -1;
    }

    move(xDistance, yDistance) {
        this._left += xDistance * this._xVector * this._speed;
        this._top += yDistance * this._yVector * this._speed;
    }

    draw(ctx) {
        ctx.fillStyle = this._color;
        ctx.fillRect(this._left, this._top, this._width, this._height);
    }

}

class Circle {
    constructor(top, left, radius) {
        this._top = top;
        this._left = left;
        this._width = radius * 2;
        this._height = radius * 2;
        this._radius = radius;
        this._speed = 1;
        this._xVector = 1;
        this._yVector = 1;
        this._color = 'red';
    }

    setTop(top) {
        this._top = top;
    }
    setLeft(left) {
        this._left = left;
    }
    setWidth(width) {
        this._width = width;
    }
    setHeight(height) {
        this._height = height;
    }
    setColor(color) {
        this._color = color;
    }

    setSpeed(speed) {
        this._speed = speed;
    }
    getTop() {
        return this._top - this._radius;
    }
    getLeft() {
        return this._left - this._radius;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }

    bounceHorizontal() {
        this._xVector *= -1;
    }
    bounceVertical() {
        this._yVector *= -1;
    }

    move(xDistance, yDistance) {
        this._left += xDistance * this._xVector * this._speed;
        this._top += yDistance * this._yVector * this._speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this._color;
        ctx.arc(this._left, this._top, this._radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

}

class Star extends Circle {
    constructor(top, left, radius) {
        super(top, left, radius);
        this._color = 'blue';
    }

    draw(ctx) {
        ctx.beginPath();
        var grd = ctx.createRadialGradient(this._left, this._top, 0, this._left, this._top, this._radius);
        grd.addColorStop(0, this._color);
        grd.addColorStop(1, "rgba(255,255,255,0)");


        ctx.arc(this._left, this._top, this._radius, 0, 2 * Math.PI, false);

        ctx.fillStyle = grd;
        ctx.fill();

    }
}

let canvas = document.querySelector("canvas");


window.anim = new MovingShapes(canvas, canvas.parentNode.offsetWidth, canvas.parentNode.offsetHeight)
let width = window.anim.getWidth();
let height = window.anim.getHeight()

let items = [];
for (var i = 0; i < 50; i++) {
    let radius = Math.floor(Math.random() * 10) + 1;
    let left = Math.floor(Math.random() * width) - radius;
    let top = Math.floor(Math.random() * height) - radius;

    let item = new Star(left, top, radius);
    item.setSpeed((Math.floor(Math.random() * (5)) - 1) / 10);

    if (i % 2) {
        item.bounceHorizontal();
    }

    if (i % 3) {
        item.bounceVertical();
    }

    item.setColor('rgba(255,255,255,0.5');
    items.push(item);
}

//
//var item1 = new Square(10, 10, 10, 10);
//var item2 = new Square(100, 10, 10, 10);
//var item3 = new Star(100, 100, 10);
//
//item2.setColor('green');
//item2.setSpeed(0.8);
//item3.setColor('rgba(255,255,255,0.8')

window.anim.setItems(items);
window.anim.start();