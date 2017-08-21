/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {ShapeAbstract} from './ShapeAbstract';

export class Circle extends ShapeAbstract {
    constructor(canvas, left, top, radius) {
        super(canvas, left, top);

        this._width = radius * 2;
        this._height = radius * 2;
        this._radius = radius;
    }

    setTop(top) {
        this._top = top + this._radius;
    }
    setLeft(left) {
        this._left = left + this._radius;
    }

    getTop() {
        return this._top - this._radius;
    }
    getLeft() {
        return this._left - this._radius;
    }

    _draw() {
        this._ctx.beginPath();
        this._ctx.fillStyle = this._color;
        this._ctx.arc(this._left, this._top, this._radius, 0, 2 * Math.PI, false);
        this._ctx.fill();
    }

}