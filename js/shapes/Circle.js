/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



export class Circle {
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