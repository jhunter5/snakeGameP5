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


let board = new Array(Math.floor(window.innerWidth/25))

for (let i = 0; i < board.length; i++){
    board[i] = new Array(Math.floor(window.innerHeight/25))
}

class Snake{
    constructor(){
        this.body = new LinkedList()
        this.head = this.body.head
        this.direction = "right"
        this.body.append(0,0)
        this.body.append(1,0)
        this.body.append(2,0)
    }

    verifyLimits(){
        switch (this.direction){
            case "right":
                if (this.body.head.x > board.length){
                    this.body.head.x = 0
                }
                break
            case "left":
                if (this.body.head.x < 0){
                    this.body.head.x = board.length
                }
                break
            case "up":
                if (this.body.head.y < 0){
                    this.body.head.y = board.length
                }
                break
            case "down":
                if (this.body.head.y > board.length){
                    this.body.head.y = 0
                }
                break
        }
    }

    moveBody(){
        let node = this.body.head.next;
        while (node != null){
            if (node.prev != null) {
                node.x = node.prev.x;
                node.y = node.prev.y;
            }
            node = node.prev;
        }
    }

    move(){
        if (this.direction == "right"){
            this.body.head.x++
            this.verifyLimits()
            this.moveBody()
        } else if (this.direction == "left"){
            this.body.head.x--
            this.verifyLimits()
            this.moveBody()
        } else if (this.direction == "up"){
            this.body.head.y--
            this.verifyLimits()
            this.moveBody()
        } else if (this.direction == "down"){
            this.body.head.y++
            this.verifyLimits()
            this.moveBody() 
        }
    }

    eat(){
        this.body.append(this.body.tail.x, this.body.tail.y)
    }

    draw(){
        let node = this.body.head
        while (node != null){
            fill(0)
            rect(node.x*25, node.y*25, 25, 25)
            node = node.next
        }
    }

}

function drawBoard(){
    fill(255)
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            rect(i*25, j*25, 25, 25)
        }
    }
}

let snake = new Snake()

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(200);
    drawBoard()
}

  
function draw() {
    background(200);
    drawBoard()
    snake.draw()
    snake.move()

    if (keyIsDown(LEFT_ARROW)){
        snake.direction = "left"
    } else if (keyIsDown(RIGHT_ARROW)){
        snake.direction = "right"
    }
    if (keyIsDown(UP_ARROW)){
        snake.direction = "up"
    } else if (keyIsDown(DOWN_ARROW)){
        snake.direction = "down"
    }

    if (keyIsDown(65)){
        snake.eat()
    }
}




