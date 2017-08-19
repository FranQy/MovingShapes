/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



export class Square {
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