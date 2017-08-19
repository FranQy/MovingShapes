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
            this._updateItemVector(item);

            item.move(this._frameDistance, this._frameDistance);
            item.draw(this._ctx);

        }
    }

    _updateItemVector(item) {
        let itemLeft = item.getLeft();
        let itemTop = item.getTop();

        if (itemLeft + item.getWidth() >= this._width || itemLeft <= 0) {
            item.bounceHorizontal();
        }

        if (itemTop + item.getHeight() >= this._height || itemTop <= 0) {
            item.bounceVertical();
        }
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