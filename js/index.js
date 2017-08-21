/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {MovingShapes} from './MovingShapes';
import {Star} from './shapes/Star';
import {Circle} from './shapes/Circle';
import {Square} from './shapes/Square';
import {MysticalDecorator} from './decorator/MysticalDecorator';
import {FadeDecorator} from './decorator/FadeDecorator';


let canvas = document.querySelector("canvas");
var movingShapes = new MovingShapes(canvas, canvas.parentNode.offsetWidth, canvas.parentNode.offsetHeight);
let width = movingShapes.getWidth();
let height = movingShapes.getHeight();

movingShapes.addItems(getItems(Star, 50));
movingShapes.start();



function getItems(Shape, count) {
    let items = [];

    for (var i = 0; i < count; i++) {
        let radius = Math.floor(Math.random() * 10) + 1;
        let left = Math.floor(Math.random() * width + 1) - radius;
        let top = Math.floor(Math.random() * height + 1) - radius;

        let item = new Shape(canvas, left, top, 10, 20);
        item.setSpeed((Math.random() * 2 - 1) / 2);

        if (i % 2) {
            item.bounceHorizontal();
        }

        if (i % 3) {
            item.bounceVertical();
        }

        item.setColor('rgba(255,255,255,0.5');
        item.setDecorator(new FadeDecorator(canvas));
        item.setDecorator(new MysticalDecorator(canvas));
        items.push(item);
    }

    return items;
}