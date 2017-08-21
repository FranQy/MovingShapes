/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {DecoratorAbstract} from './DecoratorAbstract';

export class FadeDecorator extends DecoratorAbstract {

    constructor(canvas) {
        super(canvas);
        this._alpha = 1;
        this._speed = 1;
        this._delta = 1 / 100;
        this._fading = false;
        this._fadingOperator = -1;

    }

    beforeItemDraw() {
        if (this._fading || this._canFade()) {
            this._changeFade();
        }
        this._saveContextProperties();
    }

    _canFade() {
        return Math.random() < 0.005;
    }

    _changeFade() {
        this._changeAlpha();
        this._limitAlpha();
        this._changeFadingState();
    }

    _changeAlpha() {
        this._fading = true;
        this._alpha += this._fadingOperator * this._delta * this._speed;
    }

    _limitAlpha() {
        if (this._alpha > 1) {
            this._alpha = 1;
        } else if (this._alpha < 0) {
            this._alpha = 0;
        }
    }

    _changeFadingState() {
        if (this._alpha === 1) {
            this._fading = false;
            this._fadingOperator = -1;
        } else if (this._alpha === 0) {
            this._fading = false;
            this._fadingOperator = +1;
        }
    }

    _saveContextProperties() {
        this._item.setIfSmaller(this._alpha, 'alpha');
    }
}