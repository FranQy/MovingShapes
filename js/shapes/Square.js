/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {ShapeAbstract} from './ShapeAbstract';


export class Square extends ShapeAbstract {
    constructor(canvas, left, top, width, height) {
        super(canvas, left, top);
        this._width = width;
        this._height = height;
    }

    _draw() {
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._left, this._top, this._width, this._height);
    }

}