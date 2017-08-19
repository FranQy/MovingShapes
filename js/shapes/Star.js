/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Circle} from './Circle';


export class Star extends Circle {
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