var monkey , monkey_running,ground;
var banana ,bananaImage, obstacleImage ,obstacleGroup;
var FoodGroup;
var score 

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  //creating monkey
    monkey = createSprite(80, 315, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.addAnimation("collided");
    monkey.scale = 0.1
  
  //creating ground
    ground = createSprite(400, 350, 800, 10);
    ground.velocityX = -4;
    ground.x = ground.width/2;
    console.log(ground.x)

    invisibleGround = createSprite(400,340,800,10);
   invisibleGround.visible = false;
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  createCanvas(600,400);
  background("255");
  
  if (ground.x>0){
      ground.x=ground.width/2;     
    }
  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(ground);
  
  var survivalTime = 0;
      //stroke("black");
      //textSize(20);
      //fill("black");
      //text("Score: "+ score, 250, 50);
  
      stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/getFrameRate())
      text("Survival Time: "+ survivalTime, 40, 50)
  
  obstacle();
  Food();
  
  drawSprites();
  
}

function Food(){
  if(World.frameCount % 80 === 0) {
     banana = createSprite(400,200,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.07
     banana.y = Math.round(random(120,200));
     banana.velocityX = -8;
     banana.setLifetime = 50;
    
     FoodGroup.add(banana);
   }
}

function obstacle(){
  if(frameCount % 300 === 0){
 var obstacle = createSprite(400,320,10,30);
     obstacle.addImage(obstacleImage);           
     obstacle.scale = 0.17;
     obstacle.velocityX = -6;
     obstacle.setLifetime = 50;
    
     obstacle.setCollider("circle",0,0,200);
   //obstacle.debug = true;

   //add each obstacle to the group
    obstacleGroup.add(obstacle);
     
  }
}