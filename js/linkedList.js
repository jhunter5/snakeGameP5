class Node{
    constructor(x,y){
        this.x = x
        this.y = y
        this.next = null
        this.prev = null
    }
}

export default class LinkedList{
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