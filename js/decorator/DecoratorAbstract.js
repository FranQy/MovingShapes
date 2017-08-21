/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



export class DecoratorAbstract {

    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    }

    setItem(item) {
        this._item = item;
    }

    beforeItemDraw() {
    }

    afterItemDraw() {
    }
}