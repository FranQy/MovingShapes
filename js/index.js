/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




import {MovingShapes} from './MovingShapes';
import {Star} from './shapes/Star';



let canvas = document.querySelector("canvas");


var movingShapes = new MovingShapes(canvas, canvas.parentNode.offsetWidth, canvas.parentNode.offsetHeight);
let width = movingShapes.getWidth();
let height = movingShapes.getHeight()

let items = [];

for (var i = 0; i < 50; i++) {
    let radius = Math.floor(Math.random() * 10) + 1;
    let left = Math.floor(Math.random() * width) - radius;
    let top = Math.floor(Math.random() * height) - radius;

    let item = new Star(left, top, radius);
    item.setSpeed((Math.floor(Math.random() * (5)) - 1) / 10);

    if (i % 2) {
        item.bounceHorizontal();
    }

    if (i % 3) {
        item.bounceVertical();
    }

    item.setColor('rgba(255,255,255,0.5');
    items.push(item);
}

movingShapes.setItems(items);
movingShapes.start();