class Node{
    constructor(x,y){
        this.x = x
        this.y = y
        this.next = null
        this.prev = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(x, y){
        let node = new Node(x, y)
        if (this.head == null){
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.length++
    }
    
}




function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(200);
    snake.show();
}
  
function draw() {
    background(200);
    snake.update();
    

    if (keyIsDown(LEFT_ARROW)){
        snake.move(-1, 0);
    }
    if (keyIsDown(RIGHT_ARROW)){
        snake.move(1, 0);
    }
    if (keyIsDown(UP_ARROW)){
        snake.move(0, -1);
    }
    if (keyIsDown(DOWN_ARROW)){
        snake.move(0, 1);
    }
    
    if (keyIsDown(32)){
        snake.eat();
    }
}



