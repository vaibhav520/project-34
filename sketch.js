var dog, food, database;
var img1, img2;

function preload() {
    img1 = loadImage("images/dogimg.png");
    img2 = loadImage("images/dogimg1.png");
}

function setup() {
    createCanvas(800, 700);
    database = firebase.database();
    food = database.ref('food');
    food.on("value", readStock)
    dog = createSprite(400, 500, 20, 20);
    dog.addImage(img2);
    dog.scale = 0.15
}


function draw() {
    background("green")
    if (keyWentDown(UP_ARROW)) {
        writeFood(food);
        dog.addImage(img1)
    }
    drawSprites();
    fill(255);
    textSize(15)
    text("food remainig :" + food, 150, 150)
}

function readStock(data) {
    food = data.val();
}

function writeFood(x) {
    if (x <= 0) {
        x = 0;
    } else {
        x = x - 1;
    }

    database.ref('/').update({
        food: x
    })
}