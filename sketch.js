var play = 1;
var END = 0;
var gameState = play;
var monkey , monkey_running
var banana ,bananaImage, stone, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var ground , invisibleground;
var survivalTime=0;
var food;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600 , 600);

  monkey=createSprite(80 , 315 , 20 , 20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(200 , 380 , 1500 , 10);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  monkey.setCollider("circle" , 0 , 0 , 350);
  monkey.debug=false;
  
  invisibleground=createSprite(200 , 390 , 400 , 10);
  invisibleground.visible=false;
  
  var score;
   
  FoodGroup=new Group();
  obstacleGroup = new Group();
}


function draw() {
   background(225);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("survivalTime : "+survivalTime , 55 , 100);
  
 if(gameState == play)
 {
   Food();
   obstacle();
   survivalTime=Math.ceil(frameCount/frameRate());
  if (ground.x < 0)
  {
      ground.x=ground.width/2;
  }
  
  if(keyDown("space"))
  {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
   if(monkey.isTouching(FoodGroup))
   {
     FoodGroup.destroyEach();
   }
  
  if(obstacleGroup.isTouching(monkey))
  {
        gameState = END;
  }
   
 }
  else if (gameState === END) 
  {
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    
  }

  monkey.collide(invisibleground);

 drawSprites();
  
  
 }

function Food(){
  
if(frameCount % 80 == 0)
 {
  food = createSprite(300 , 200 , 20 , 20);
  food.y = Math.round(random(120 , 200));
  food.addImage(bananaImage);
  food.velocityX= -5;
  food.setLifetime=200;
  food.scale= 0.1;
  FoodGroup.add(food);
  
 }
  
}

function obstacle(){
  if(frameCount % 300 == 0){
    stone = createSprite(400 , 355 , 10  , 40);
    stone.addImage(obstacleImage);
    //stone.collide(ground);
    stone.velocityX= - 6;
    stone.setLifetime=300;
    stone.scale=0.1;
    obstacleGroup.add(stone);
  }
  
}


