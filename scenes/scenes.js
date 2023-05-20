class scene1 extends Phaser.Scene {
    constructor() {
        super('level1');
        this.startTime = null;
        this.costTime = null;
        this.timerText = null;
        this.over=false;
    }

    preload (){
        this.load.path='./assets/';
        this.load.image('player', 'red_ball.png');
        this.load.image('end','endpoint.jpg')
        this.load.image('background', 'background.jpg');
        this.load.image('h_longwall', 'long_wall(h).png');
        this.load.image('s_longwall', 'long_wall(s).png');
    }

    updateTimer() {
        if (!this.over) {
            let time = new Date() - this.startTime;
            time = Math.floor(time / 1000);
            this.timerText.setText('Time: ' + time);
        }
    }

    create() {
        this.over=false;
        this.startTime = new Date();
        this.timerText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#FFF' });
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });


        player = this.physics.add.sprite(450, 590, 'player');
        let end = this.physics.add.sprite(450, 180, 'end');
        end.setImmovable(true);
        end.body.setCircle(end.displayWidth / 2, 10, 0);
        end.setScale(0.035);
        let graphics = this.make.graphics({});
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(end.x, end.y, end.displayWidth / 2);
        let mask = new Phaser.Display.Masks.BitmapMask(this, graphics);
        end.setMask(mask);
        
        
        walls = this.physics.add.staticGroup();
        walls.create(400,120,'s_longwall');
        walls.create(500,120,'s_longwall');
        
        walls.create(400,640,'s_longwall');
        walls.create(500,640,'s_longwall');

        walls.create(360,180,'h_longwall');
        walls.create(360,280,'h_longwall');
        walls.create(360,380,'h_longwall');
        walls.create(360,480,'h_longwall');
        walls.create(360,580,'h_longwall');
        
        walls.create(540,180,'h_longwall');
        walls.create(540,280,'h_longwall');
        walls.create(540,380,'h_longwall');
        walls.create(540,480,'h_longwall');
        walls.create(540,580,'h_longwall');


        this.physics.add.collider(player, walls, this.hitWall, null, this);
        this.physics.add.collider(player, end, this.hitEnd, null, this);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        const maxVelocity = 200;
        const acceleration = 10;
        const deceleration = 20;
    
        if (cursors.up.isDown){
            let velocity_y=player.body.velocity.y - acceleration
            if(velocity_y<-maxVelocity){
                player.body.velocity.y=-maxVelocity
            } else{
                player.body.velocity.y=velocity_y
            }
        } else if (cursors.down.isDown){
            let velocity_y=player.body.velocity.y + acceleration
            if(velocity_y>maxVelocity){
                player.body.velocity.y=maxVelocity
            } else{
                player.body.velocity.y=velocity_y
            }
        } else {
            if (player.body.velocity.y > 0) {
                player.body.velocity.y = Math.max(player.body.velocity.y - deceleration, 0);
            } else if (player.body.velocity.y < 0) {
                player.body.velocity.y = Math.min(player.body.velocity.y + deceleration, 0);
            }
        }
        
        if (cursors.right.isDown){
            let velocity_x=player.body.velocity.x + acceleration
            if(velocity_x>maxVelocity){
                player.body.velocity.x=maxVelocity
            } else{
                player.body.velocity.x=velocity_x
            }
        } else if (cursors.left.isDown){
            let velocity_x=player.body.velocity.x - acceleration
            if(velocity_x<-maxVelocity){
                player.body.velocity.x=-maxVelocity
            } else{
                player.body.velocity.x=velocity_x
            }
        } 
        else {
            // decelerate when no keys are pressed
            if (player.body.velocity.x > 0) {
                player.body.velocity.x = Math.max(player.body.velocity.x - deceleration, 0);
            } else if (player.body.velocity.x < 0) {
                player.body.velocity.x = Math.min(player.body.velocity.x + deceleration, 0);
            }
        }
    }

    hitWall (player, wall){
        player.setPosition(450, 590);
        player.setVelocityX(0);
        player.setVelocityY(0);
    }

    hitEnd (player, sprite){
        this.over=true;
        this.costTime = new Date() - this.startTime;
        player.setPosition(-100,-100);
        this.scene.start('Ending', { time: this.costTime, level: 'level1'});
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload (){
        this.load.path='./assets/';
        this.load.image('logo', 'logo_image.png');
        this.load.image('l1', 'l1.jpg');
        this.load.image('l2', 'l2.jpg');
        this.load.image('l3', 'l3.jpg');
    }

    create() {
        this.imageObject=this.add.image(
            480,
            290,
            'logo'
        )
        this.imageObject.setScale(0.5);

        this.add.text(290, 100, "Physics Game", { fontSize: '50px', fill: '#FFF' });

        let l1Button = this.add.image(280,525,'l1');
        l1Button.setScale(0.5);
        l1Button.setInteractive();
        l1Button.on('pointerdown', () => this.scene.start("level1"));
        let l2Button = this.add.image(480,525,'l2');
        l2Button.setScale(0.5);
        l2Button.setInteractive();
        l2Button.on('pointerdown', () => this.scene.start("level2"));
        let l3Button = this.add.image(680,525,'l3');
        l3Button.setScale(0.5);
        l3Button.setInteractive();
        l3Button.on('pointerdown', () => this.scene.start("level3"));

    }
}

class Ending extends Phaser.Scene {
    constructor() {
        super('Ending');
    }

    init(data) {
        this.costTime = data.time;
        this.currentLevel = data.level;
    }

    preload (){
        this.load.path='./assets/';
        this.load.image('time', 'spend.jpg');
        this.load.image('button1', 'button1.jpg');
        this.load.image('button2', 'button2.jpg');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.add.image(300,125,'time');
        this.add.text(525, 105, Math.floor(this.costTime / 1000)+"s", { fontSize: '50px', fill: '#FFF' });
        let playAgainButton = this.add.image(200,225,'button1');
        playAgainButton.setScale(0.5);
        //const playAgainButton = this.add.text(100, 200, 'Play Again', { fontSize: '32px', fill: '#FFF' });
        playAgainButton.setInteractive();
        this.add.text(400, 200, "<-- Click me to play \ncurrent level again", { fontSize: '25px', fill: '#F00' });
        playAgainButton.on('pointerdown', () => this.scene.start(this.currentLevel));
        
        if (this.currentLevel !== 'level3') {
            let nextLevelButton = this.add.image(220,325,'button2');
            nextLevelButton.setScale(0.5);
            //const nextLevelButton = this.add.text(100, 300, 'Next Level', { fontSize: '32px', fill: '#FFF' });
            nextLevelButton.setInteractive();
            this.add.text(400, 300, "<-- Click me to go to \nnext level", { fontSize: '25px', fill: '#F00' });
            nextLevelButton.on('pointerdown', () => {
                const nextLevel = 'level' + (parseInt(this.currentLevel.replace('level', '')) + 1);
                this.scene.start(nextLevel);
            });
        }
    }
}
