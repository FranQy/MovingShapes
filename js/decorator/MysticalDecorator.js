/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class MysticalDecorator {

    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._visibilityMarginRatio = 0.2;

        this._visibilityMarginVertical = this._height * this._visibilityMarginRatio / 2;
        this._visibilityMarginHorizontal = this._width * this._visibilityMarginRatio / 2;

        this._visibleAreaVerticalStart = this._visibilityMarginVertical;
        this._visibleAreaVerticalStop = this._height - this._visibilityMarginVertical;
        this._visibleAreaHorizontalStart = this._visibilityMarginHorizontal;
        this._visibleAreaHorizontalStop = this._width - this._visibilityMarginHorizontal;
    }

    setItem(item) {
        this._item = item;
    }

    beforeItemDraw() {
        this._setPositionOpacity();
    }

    afterItemDraw() {
        this._setVisibleAgain();
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

        this._ctx.globalAlpha = this._getSmaller(alphaVertical, alphaHorizontal);
    }

    _calcAlphaByCoordinates(biggerCoordinate, smallerCoordinate) {
        return 2 / (biggerCoordinate - smallerCoordinate);
    }

    _getSmaller(number1, number2) {
        return number1 < number2 ? number1 : number2;
    }
    
    _setVisibleAgain(ctx) {
        this._ctx.globalAlpha = 1;
    }
}