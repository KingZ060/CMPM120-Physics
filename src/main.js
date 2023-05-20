
let config={
    type:Phaser.WEBGL,
    width: 960,
    heigh: 540,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //debug: true,
        }
    },
    scene: [Intro,scene1,scene2,scene3,Ending]
};

var player;
var cursors;
var walls;

let game = new Phaser.Game(config);
