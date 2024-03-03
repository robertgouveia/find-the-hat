const process = require('node:process');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    percentage = 0
    width = 0
    height = 0
    playerPos = [0, 0]

    constructor(width, height, percentage) {
        this.width = width
        this.height = height
        this.percentage = percentage
        this.field = this.generateField(width, height)
        this.generateHoles()
        this.generateHat()
        this.generatePlayer()
    }

    generateField = (height, width) => {
        let field = []
        for(let c = 0; c < width; c++){
            let row = []
            for(let r = 0; r < height; r++){
                row.push(fieldCharacter)
            }
            field.push(row)
        }
        return field;
    }

    generateHoles = () => {
        let total = this.height * this.width;
        let holeCount = Math.floor(total * (this.percentage / 100) + 1)
        for(let i = 0; i < holeCount; i++){
            let randHeight = Math.floor(Math.random() * this.height);
            let randWidth = Math.floor(Math.random() * this.width);
            if(this.field[randWidth][randHeight] !== hole){
                this.field[randWidth][randHeight] = hole
            }
        }
    }

    generateHat = () => {
        let hatPlaced = false
        while(!hatPlaced){
            let randHeight = Math.floor(Math.random() * this.height);
            let randWidth = Math.floor(Math.random() * this.width);
            if(this.field[randWidth][randHeight] !== hole){
                this.field[randWidth][randHeight] = hat;
                hatPlaced = true;
            }
        }
    }

    generatePlayer = () => {
        let player = false
        while(!player){
            let randHeight = Math.floor(Math.random() * this.height);
            let randWidth = Math.floor(Math.random() * this.width);
            if(this.field[randWidth][randHeight] !== hole && this.field[randWidth][randHeight] !== hat){
                this.field[randWidth][randHeight] = pathCharacter;
                this.playerPos = [randWidth, randHeight]
                player = true;
            }
        }
    }

    print = () => {
        for(let  i = 0; i < this.field.length; i++){
            console.log(this.field[i].join(' '))
        }
    }
}

const field = new Field(5,5, 20)
field.print()

const movePlayer = (userInput) => {
    let direction = userInput.toString().trim().toLowerCase()
    field.field[field.playerPos[0]][field.playerPos[1]] = fieldCharacter;
    if(direction === 'w'){
        field.playerPos[0]--
        if(field.playerPos[0] < 0){
            console.log('Game Over')
            process.exit()
        }
    }
    if(direction === 's'){
        field.playerPos[0]++
        if(field.playerPos[0] > field.field[0].length - 1){
            console.log('Game Over')
            process.exit()
        }
    }
    if(direction === 'a'){
        field.playerPos[1]--
        if(field.playerPos[1] < 0){
            console.log('Game Over')
            process.exit()
        }
    }
    if(direction === 'd'){
        field.playerPos[1]++
        if(field.playerPos[1] > field.field[1].length - 1){
            console.log('Game Over')
            process.exit()
        }
    }
    if(field.field[field.playerPos[0]][field.playerPos[1]] === hat){
        console.log('Won Game')
        process.exit()
    }
    if(field.field[field.playerPos[0]][field.playerPos[1]] === hole){
        console.log('Game Over')
        process.exit()
    }
    field.field[field.playerPos[0]][field.playerPos[1]] = pathCharacter
    console.clear()
    field.print()
}

process.stdin.on('data', movePlayer);