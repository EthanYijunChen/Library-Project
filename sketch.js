let handpose;
let video;
let hands = [];
let ball;
let character;
let characterImg;
let isSquished = false;

function preload() {
    characterImg = loadImage('character.png');
}

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent('canvas-container');
    
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    
    handpose = ml5.handpose(video, modelLoaded);
    handpose.on('predict', results => {
        hands = results;
    });
    
    ball = document.getElementById('ball');
    character = createImg('character.png', 'character');
    character.class('character gray');
    character.size(100, 100);
    character.position(width / 2 - 50, height / 2 - 50);
}

function modelLoaded() {
    console.log('ready');
}

function draw() {
    background(255);
    image(video, 0, 0, width, height);
    
    if (hands.length > 0) {
        let hand = hands[0];
        let keypoint = hand.landmarks[8];
        let x = width - keypoint[0];
        let y = keypoint[1];
        
        ball.style.left = x - 15 + 'px';
        ball.style.top = y - 15 + 'px';
        
        let charX = width / 2 - 50;
        let charY = height / 2 - 50;
        let charW = 100;
        let charH = 100;
        
        if (x > charX && x < charX + charW && y > charY && y < charY + charH) {
            if (!isSquished) {
                character.class('character squished');
                character.removeClass('gray');
                isSquished = true;
            }
        } else {
            if (isSquished) {
                character.class('character gray');
                character.removeClass('squished');
                isSquished = false;
            }
        }
    }
}