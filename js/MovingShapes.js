/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class MovingShapes {
    constructor(canvas, width, height) {
        this._canvas = canvas;
        this._width = this._canvas.width = width;
        this._height = this._canvas.height = height;
        this._ctx = this._canvas.getContext("2d");

        this._animationSpeed = 1 / 16;
        this._frameDistance = 0;
        this._playing = false;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
    setItems(items) {
        this._items = items || [];
        this._itemsCount = this._items.length;

    }

    _clear() {
        this._ctx.clearRect(0, 0, this._width, this._height);
    }

    _updateFrameDistance() {
        var newTime = Date.now();
        this._frameDistance = (newTime - this._time) * this._animationSpeed;
        this._time = newTime;
    }

    _mainLoop() {

        this._updateFrameDistance();

        this._clear();
        this._reDrawItems();
        this._loop();
    }

    _reDrawItems() {

        for (let i = 0; i < this._itemsCount; i++) {
            let item = this._items[i];

            item.move(this._frameDistance, this._frameDistance);
            this._limitItemPositionInsideCanvas(item);
            item.draw(this._ctx);

        }
    }

    _limitItemPositionInsideCanvas(item) {
        if (this._isItemBeyondLeftBorder(item)) {
            this._fixItemHorizontalPosition(item, 0);
        }else if (this._isItemBeyondRightBorder(item)) {
            this._fixItemHorizontalPosition(item, this._width - item.getWidth());
        }

        if (this._isItemBeyondTopBorder(item)) {
            this._fixItemVerticalPosition(item, 0);
        } else if (this._isItemBeyondBottomBorder(item)) {
            this._fixItemVerticalPosition(item, this._height - item.getHeight());
        }
    }

    _isItemBeyondRightBorder(item) {
        return item.getLeft() + item.getWidth() >= this._width;
    }

    _isItemBeyondLeftBorder(item) {
        return item.getLeft() <= 0;
    }

    _isItemBeyondBottomBorder(item) {
        return item.getTop() + item.getHeight() >= this._height;
    }

    _isItemBeyondTopBorder(item) {
        return item.getTop() <= 0;
    }

    _fixItemHorizontalPosition(item, leftOffset) {
        item.bounceHorizontal();
        item.setLeft(leftOffset);
    }

    _fixItemVerticalPosition(item, topOffset) {
        item.bounceVertical();
        item.setTop(topOffset);

    }

    start() {
        this._time = Date.now();
        this._playing = true;
        this._mainLoop();
    }

    stop() {
        this._playing = false;
    }

    _loop() {
        if (this._playing) {
            window.requestAnimationFrame(() => {
                this._mainLoop();
            });
        }
    }
}