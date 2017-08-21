/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class ShapeAbstract {
    constructor(canvas, left, top) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
        this._top = top;
        this._left = left;
        this._speed = 1;
        this._xVector = 1;
        this._yVector = 1;
        this._color = 'red';
        this._decorators = [];
        this._alpha = 1;
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

    draw() {
        this._beforeDraw();
        this._draw();
        this._afterDraw();
    }

    setDecorator(decorator) {
        decorator.setItem(this);
        this._decorators.push(decorator);
    }

    _beforeDraw() {
        for (let i = 0; i < this._decorators.length; i++) {
            this._decorators[i].beforeItemDraw();
        }

        this._ctx.globalAlpha = this._alpha;
    }

    _draw() {
        throw "Abstract method";
    }

    _afterDraw() {
        for (let i = 0; i < this._decorators.length; i++) {
            this._decorators[i].afterItemDraw();
        }

        this._ctx.globalAlpha = this._alpha = 1;
    }

    setIfSmaller(value, propertyName) {
        propertyName = '_' + propertyName;
        if (this[propertyName] !== undefined) {
            this[propertyName] = this._getSmaller(this[propertyName], value);
        }
    }

    _getSmaller(number1, number2) {
        return number1 < number2 ? number1 : number2;
    }

    getProperty(name) {
        return this['_' + name];
    }
}