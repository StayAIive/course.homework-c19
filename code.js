var player, playerImg;
var ghost, ghostImg, ghostGroup;
var shoot, shootImg, shootGroup;
var food, foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6, foodImg7;
var sky, sky2, skyImg;
var monster, monsterImg, monsterGroup;
var ground;
var invisiblewall;

var foodLeft, shootLeft;

var score;

var gamestates;


function preload() {
    playerImg = loadAnimation("./playerwalk/player0.png", "./playerwalk/player1.png");

    skyImg = loadImage("background.png");

    shootImg = loadImage("shoot.png");

    monsterImg = loadAnimation("./enemy/enemy0.png", "./enemy/enemy1.png", "./enemy/enemy2.png", "./enemy/enemy3.png", "./enemy/enemy4.png", "./enemy/enemy5.png", "./enemy/enemy6.png", "./enemy/enemy7.png");

    ghostImg = loadAnimation("./ghost/ghost00.png");
    crazyghostImg = loadAnimation("./ghost/ghost01.png", "./ghost/ghost02.png", "./ghost/ghost03.png", "./ghost/ghost04.png", "./ghost/ghost05.png", "./ghost/ghost06.png", "./ghost/ghost07.png", "./ghost/ghost08.png");

    foodImg2 = loadImage("./bribe/bribe1.png");
    foodImg3 = loadImage("./bribe/bribe20.png");
    foodImg4 = loadImage("./bribe/bribe30.png");
    foodImg5 = loadImage("./bribe/bribe40.png");
    foodImg6 = loadImage("./bribe/bribe50.png");

}

function setup() {
    createCanvas(600, 600);

    score = 0;

    foodLeft = 2;
    shootLeft = 2;

    //play
    gamestates = 1;

    monsterGroup = new Group();
    shootGroup = new Group();
    ghostGroup = new Group();
    foodGroup = new Group();

    sky = createSprite(400, 200, 1, 1);
    sky.scale = 2;
    sky.addImage(skyImg);

    ground = createSprite(300, 560, 600, 20);
    ground.visible = false;

    invisiblewall = createSprite(0, 300, 20, 600);
    invisiblewall.visible = false;

    player = createSprite(50, 500, 1, 1);
    player.scale = 1.5;
    player.addAnimation("run", playerImg);
    player.setCollider("circle", 0, 0, 20);



}

function draw() {
    background(0);

    sky.velocityX = -2 - (score / 50);


    if (sky.x <= 200) {
        sky.x = 400;
    }

    if (keyDown("space") && player.y >= 170 && player.y) {
        player.velocityY = -10;
    }

    if (gamestates == 1) {
        spawnmonsters();
        spawnghost();
    }

    if (gamestates == 0) {
        fill("red");
        textSize(100);
        text("You Died", 90, 300);
        textSize(20);
        if (score == 0) {
            text("You didn't even kill any monster or save any ghost", 75, 350);
            text("Why are you here?", 200, 400);
        }
        else if (score >= 0 && score < 50) {
            text("without anyone knowing your existence", 125, 350);
        }
        else if (score >= 50 && score < 100) {
            text("People held a funeral to honor you", 135, 350);
        }
        else if (score >= 150 && score < 200) {
            text("You are listed as one of the heroes", 130, 350);
        }
        else if (score >= 200 && score < 250) {
            text("Many cried for you, including the dead", 125, 350);
        }
        else if (score >= 250) {
            text("Your a legend!", 225, 350);
            text("You will be forever remembered", 145, 400);
        }

    }

    //shoot
    for (var i = 0; i < shootGroup.length; i++) {
        if (shootGroup.get(i) != undefined && shootGroup.get(i).isTouching(monsterGroup)) {
            shootGroup.get(i).destroy();
            monsterGroup.destroyEach();
            score += Math.round(random(1, 7));
            shootLeft += 2;
        }
        if (shootGroup.get(i) != undefined && shootGroup.get(i).isTouching(ghostGroup)) {
            if (ghostGroup.isTouching(shootGroup)) {
                shootGroup.destroyEach()
                ghostGroup.setVelocityEach(-30, 0);
            }
        }
    }

    //food
    for (var i = 0; i < foodGroup.length; i++) {
        if (foodGroup.get(i) != undefined && foodGroup.get(i).isTouching(ghostGroup)) {
            foodGroup.get(i).destroy();
            ghostGroup.destroyEach();
            score += Math.round(random(1, 7));
            foodLeft += 2;
        }

        if (foodGroup.get(i) != undefined && foodGroup.get(i).isTouching(monsterGroup)) {
            foodGroup.destroyEach()
            monsterGroup.setVelocityEach(-30, 0);
        }
    }


    var test = 0;
    for (var i = 0; i < ghostGroup.length; i++) {
        //console.log(ghostGroup.get(i).x);
         //var yes = true
         //var less = 0;
        if (ghostGroup.get(i).x <= 300 && test < ghostGroup.length) {
            
            //console.log(ghostGroup.get(i).x);
            ghostGroup.get(i).changeAnimation("crazy");
            ghostGroup.get(i).frameDelay = 6
            test += 1;
            //less =1;
            //yes = false;
        }
    }


    //game over
    if (monsterGroup.isTouching(player)) {
        gamestates = 0;
        monsterGroup.destroyEach();
        shootGroup.destroyEach();
        player.destroy();
        sky.destroy();
        ghostGroup.destroyEach();
        foodGroup.destroyEach();
    }

    if (monsterGroup.isTouching(invisiblewall)) {
        gamestates = 0;
        monsterGroup.destroyEach();
        shootGroup.destroyEach();
        player.destroy();
        sky.destroy();
        ghostGroup.destroyEach();
        foodGroup.destroyEach();
    }

    if (ghostGroup.isTouching(player)) {
        gamestates = 0;
        monsterGroup.destroyEach();
        shootGroup.destroyEach();
        player.destroy();
        sky.destroy();
        ghostGroup.destroyEach();
        foodGroup.destroyEach();
    }

    if (ghostGroup.isTouching(invisiblewall)) {
        gamestates = 0;
        monsterGroup.destroyEach();
        shootGroup.destroyEach();
        player.destroy();
        sky.destroy();
        ghostGroup.destroyEach();
        foodGroup.destroyEach();
    }

    player.velocityY = player.velocityY + 0.5;
    player.collide(ground);




    drawSprites();

    fill("white")
    textSize(20);
    if (gamestates === 0) {
        fill("red");
    }
    text("you score: " + score, 20, 100);

    if (gamestates === 1) {
        fill("yellow")
        textSize(20);
        text("food left: " + foodLeft + "  shoot left: " + shootLeft, 10, 590);
    }

}

function keyPressed() {
    if (keyCode === DOWN_ARROW && gamestates == 1 && shootLeft > 0) {
        shoot = createSprite(50, player.y, 1, 1);
        shootGroup.add(shoot);
        shoot.depth = player.depth - 1;
        shoot.visible = false;
        shoot.scale = 0.10;
        shoot.addImage(shootImg);
        //shootLeft -= 1;
    }


    if (keyCode === UP_ARROW && gamestates == 1 && foodLeft > 0) {
        var type;
        food = createSprite(50, player.y, 1, 1);
        foodGroup.add(food);
        food.depth = player.depth - 1;
        food.visible = false;
        food.scale = 0.10;
        type = Math.round(random(2, 6));
        if (type == 2) {
            food.addImage(foodImg2);
        }
        else if (type == 3) {
            food.addImage(foodImg3);
        }
        else if (type == 4) {
            food.addImage(foodImg4);
        }
        else if (type == 5) {
            food.addImage(foodImg5);
        }
        else if (type == 6) {
            food.addImage(foodImg6);
        }
        //foodLeft -= 1;
    }

    if(keyCode === 82){
        window.location.reload();
    }

}

function keyReleased() {
    if (keyCode === DOWN_ARROW && gamestates == 1 && shootLeft>0) {
        shoot.y = player.y;
        shoot.visible = true;
        shoot.velocityX = 7;
        shoot.lifetime = 600 / 7;
        shootLeft -= 1;
    }

    if (keyCode === UP_ARROW && gamestates == 1 && foodLeft >0) {
        food.y = player.y;
        food.visible = true;
        food.velocityX = 7;
        food.lifetime = 600 / 7;
        foodLeft -= 1;
    }

}

function spawnmonsters() {
    if (frameCount % 120 == 0) {
        monster = createSprite(610, Math.round(random(50, 500)), 1, 1);
        monster.scale = 0.5;
        monster.addAnimation("fly", monsterImg);
        monster.lifetime = 600 / -(monster.velocityX);
        monster.velocityX = sky.velocityX - 3;
        monsterGroup.add(monster);
    }

}

function spawnghost() {
    if (frameCount % 170 == 0) {
        ghost = createSprite(610, Math.round(random(50, 500)), 1, 1);
        ghost.scale = 0.75;
        ghost.addAnimation("neutral", ghostImg);
        ghost.addAnimation("crazy",crazyghostImg);
        //ghost.changeAnimation("crazy");
        ghost.lifetime = 600 / -(ghost.velocityX);
        ghost.velocityX = sky.velocityX - 4;
        ghostGroup.add(ghost);

        //if(ghost.x = 300) {
        //  ghost.changeAnimation("neutral", crazyghostImg);
        //}

    }


}