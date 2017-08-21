/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {DecoratorAbstract} from './DecoratorAbstract';

export class MysticalDecorator extends DecoratorAbstract {

    constructor(canvas) {
        super(canvas);
        
        this._visibilityMarginRatio = 0.2;

        this._visibilityMarginVertical = this._height * this._visibilityMarginRatio / 2;
        this._visibilityMarginHorizontal = this._width * this._visibilityMarginRatio / 2;

        this._visibleAreaVerticalStart = this._visibilityMarginVertical;
        this._visibleAreaVerticalStop = this._height - this._visibilityMarginVertical;
        this._visibleAreaHorizontalStart = this._visibilityMarginHorizontal;
        this._visibleAreaHorizontalStop = this._width - this._visibilityMarginHorizontal;
    }

    beforeItemDraw() {
        this._setPositionOpacity();
    }

    _setPositionOpacity() {
        let alphaVertical = 1;
        let alphaHorizontal = 1;
        let alpha;

        if (this._item.getTop() > this._visibleAreaVerticalStop) {
            alphaVertical = this._calcAlphaByCoordinates(this._item.getTop(), this._visibleAreaVerticalStop);
        } else if (this._item.getTop() < this._visibleAreaVerticalStart) {
            alphaVertical = this._calcAlphaByCoordinates(this._visibleAreaVerticalStart, this._item.getTop());
        }

        if (this._item.getLeft() > this._visibleAreaHorizontalStop) {
            alphaHorizontal = this._calcAlphaByCoordinates(this._item.getLeft(), this._visibleAreaHorizontalStop);
        } else if (this._item.getLeft() < this._visibleAreaHorizontalStart) {
            alphaHorizontal = this._calcAlphaByCoordinates(this._visibleAreaHorizontalStart, this._item.getLeft());
        }

        alpha = this._getSmaller(alphaVertical, alphaHorizontal);

        this._item.setIfSmaller(alpha, 'alpha');
    }

    _calcAlphaByCoordinates(biggerCoordinate, smallerCoordinate) {
        return 2 / (biggerCoordinate - smallerCoordinate);
    }

    _getSmaller(number1, number2) {
        return number1 < number2 ? number1 : number2;
    }
}