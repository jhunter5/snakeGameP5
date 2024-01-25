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

    move(){
        let prevX = this.body.head.x
        let prevY = this.body.head.y
        switch (this.direction){
            case "right":
                this.body.head.x++
                break
            case "left":
                this.body.head.x--
                break
            case "up":
                this.body.head.y--
                break
            case "down":
                this.body.head.y++
                break
        }
        this.verifyLimits()
        let node = this.body.head.next
        while (node != null){
            let auxX = node.x
            let auxY = node.y
            node.x = prevX
            node.y = prevY
            prevX = auxX
            prevY = auxY
            node = node.next
        }
    }

    changeDirection(direction){
        this.direction = direction
    }

    eat(food){
        if (this.body.head.x === food.x && this.body.head.y === food.y) {
            this.body.append(this.body.tail.x, this.body.tail.y);
            return true;
        }
        return false;
    }

    verifyDead(){
        let node = this.body.head.next
        while (node != null){
            if (node.x == this.body.head.x && node.y == this.body.head.y){
                this.die()
            }
            node = node.next
        }
        return false
    }

    die(){
        console.log("dead")
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

class Food{
    constructor(){
        this.x = Math.floor(Math.random()*Math.floor(window.innerWidth/25))
        this.y = Math.floor(Math.random()*Math.floor(window.innerHeight /25))
    }

    draw(){
        fill(255, 204, 0);
        rect(this.x*25, this.y*25, 25, 25)
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
let food = new Food()

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
    snake.verifyDead()

    if (keyIsDown(LEFT_ARROW)){
        snake.changeDirection("left")
    } else if (keyIsDown(RIGHT_ARROW)){
        snake.changeDirection("right")
    }
    if (keyIsDown(UP_ARROW)){
        snake.changeDirection("up")
    } else if (keyIsDown(DOWN_ARROW)){
        snake.changeDirection("down")
    }

    if (keyIsDown(65)){
        snake.eat()
    }

    if (snake.eat(food)){
        food = new Food()
    }
    food.draw()
}




