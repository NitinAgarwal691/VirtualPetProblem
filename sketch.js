var dog,dogImg,dogImg1;
var database;
var food;
var foodStock;
var feed,addFood;
// var foodStock;

function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happydog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  
  food=new Food();
  foodStock=database.ref("Food")
  foodStock.on("value", readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

feed=createButton("Feed Dog")
feed.position (700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food")
addFood.position (800,95);
addFood.mousePressed(addFoods);
  // foodStock=database.ref('Food');
  // foodStock.on("value",readStock);
  // textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
  food.display();
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data) {
    lastFed=data.val();
  })
  if(lastFed>=12) {
    text("Last Feed : "+ lastFed%12+"pm",350,30);
  }
  else if(lastFed===0) {
    text("Last Feed : 12am",350,30);
  }
  else{
   text("Last Feed : "+ lastFed+"am",350,30);
  }
  drawSprites();
}

//Function to read values from DB
 function readStock(data){
   foodS=data.val();
   food.updateFoodStock(foodS);
 }

 function feedDog() {
   dog.addImage(dogImg1);
   food.updateFoodStock(food.getFoodStock()-1);
   database.ref("/").update({
     Food:food.getFoodStock(),
     FeedTime:hour()
   }) 
 }

 function addFoods() {
   foodS++
   database.ref("/").update({
     Food:foodS
   })
 }