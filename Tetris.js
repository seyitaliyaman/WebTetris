var KEY_LEFT = 37;
            var KEY_UP = 38;
            var KEY_RIGHT = 39;
            var KEY_DOWN = 40;
            var SPACE = 32;
            var PAUSE = 13;
            var RESTART =82
            var DELAY = 1000;
            var CHK = 500;
     
            var ROW = 20;
            var COLUMN = 10;
            
            var isOver = false

            var snd = 0;

           
            
            var board = []
            for(var i=0;i<ROW;i++){
                this.board[i] = []
                for(var j=0;j<COLUMN;j++){
                    this.board[i][j] = 0
                }
            }

            var smallboard = []
            for(var i=0;i<4;i++){
                this.smallboard[i] = []
                for(var j=0;j<4;j++){
                    this.smallboard[i][j] = 0
                }
            }
            


            
            
            window.addEventListener("load",playTetris) 
            function set(x,y){
                    console.log("x:"+x+" y:"+y)
                    for(var i=0;i<4;i++){
                        for(var j=0;j<4;j++){
                            if(this.currentShape.shape[i][j]>0){
                                if(y+i >= ROW|| x+j<0 ||x+j >= COLUMN||board[y+i][x+j]){
                                    return true;
                                }
                                    
                                    
                            }
                        }
                    }
                    return false;
            }

            

            function playTetris(){
               
                
                var gameSound = new Sound("../sounds/Tetris.mp3")
                var clearSound = new Sound("../sounds/clear.wav")
                var rotateSound = new Sound("../sounds/rotate2.mp3")
                var overSound = new Sound("../sounds/gameover.wav")
                var hitSound = new Sound("../sounds/hit.mp3")
                var moveSound = new Sound("./sounds/softhit.mp3") 

                
                this.currentShape = new Shape().getShape(getRandom())
                this.nextShape = new Shape().getShape(getRandom())
                this.score = 0;

                

                
                console.log(currentShape.shape)
                
                
               
                var interval = setInterval(function(){
                    
                    if(check()){
                        redraw()
                        gameSound.play()  
                        gameSound.loop()  
                    }else{
                        gameSound.stop()
                        clearInterval(interval)
                        console.log("TOTAL SCORE :"+this.score)
                    }
                    
                },DELAY)

                


               
                

                function Sound(src){
                    this.sound = document.createElement("audio")
                    this.sound.src = src 
                    this.sound.setAttribute("preload", "auto")
                    this.sound.setAttribute("controls", "none")
                    this.sound.style.display= "none"
                    document.body.appendChild(this.sound)
                    
                    this.play = function(){
                        this.sound.play()
                    }

                    this.stop = function(){
                        this.sound.pause()
                    }

                    this.loop = function(){
                        this.sound.loop()
                    }

                }   
                
                document.body.addEventListener("keydown",keyEventHandler)

                function keyEventHandler(kev){
                    switch(kev.keyCode){
                        case KEY_LEFT: 
                            moveLeft()
                            break;
                        case KEY_RIGHT:
                            moveRight()
                            break
                        
                        case KEY_UP:
                            rotateSound.play()
                            currentShape.prototype.rotate()
                            redraw()
                            break
                        case KEY_DOWN:
                            moveDown()
                            break
                        case SPACE:
                            fall()
                            break   
                        
                        case PAUSE:
                            
                            if(!isOver){
                                isOver=true;
                                KEY_DOWN=1;
                                KEY_LEFT=1
                                KEY_RIGHT=1
                                KEY_UP=1;
                                SPACE=1
                                gameSound.stop()    
                                clearInterval(interval)
                            }else{
                                
                                KEY_LEFT = 37;
                                KEY_UP = 38;
                                KEY_RIGHT = 39;
                                KEY_DOWN = 40;
                                SPACE = 32;
                                isOver=false;
                                gameSound.play()
                               
                                
                                console.log("girdi "+isOver);
                                interval = setInterval(function(){
                                    if(check()){
                                        redraw()
                                        gameSound.play()
                                        
                                    }else{
                                        gameSound.stop()
                                        //clearInterval(interval)
                                        console.log("TOTAL SCORE :"+this.score)
                                    }
                                },DELAY);   
                            }

                            break
                        
                        case RESTART:
                            window.location.reload()
                            break 
                    }
                    /*if(kev.keyCode == KEY_LEFT){
                        moveLeft()
                    }
                    else if(kev.keyCode == KEY_RIGHT){
                        
                        moveRight()
                    }
                    else if(kev.keyCode == KEY_UP){
                        //var shape = currentShape.shape
                        //currentShape = rotate(shape)
                        rotateSound.play()
                        currentShape.prototype.rotate()
                        redraw()
                    }
                    else if(kev.keyCode == KEY_DOWN){
                        moveDown()
                    }else if(kev.keyCode == SPACE){

                        fall();
                    }*/
                }
                
                function moveLeft(){
                    var x = currentShape.prototype.x
                    var y = currentShape.prototype.y
                    
                    if(!set((x-1),y)){
                        moveSound.play()
                        currentShape.prototype.x -= 1
                        redraw()
                    }

                }
                function moveRight(){
                    var x = currentShape.prototype.x
                    var y = currentShape.prototype.y
                    if(!set((x+1),y)){
                        moveSound.play()
                        currentShape.prototype.x += 1
                        redraw()
                    }
                    
                        
                    
                }
                function rotate(piece){
                    
                    return [
                        [piece[0][3], piece[1][3], piece[2][3], piece[3][3]],
                        [piece[0][2], piece[1][2], piece[2][2], piece[3][2]],
                        [piece[0][1], piece[1][1], piece[2][1], piece[3][1]],
                        [piece[0][0], piece[1][0], piece[2][0], piece[3][0]]
                      ];
                }
                function moveDown(){
                    var x = currentShape.prototype.x
                    var y = currentShape.prototype.y+1
                    if(!set(x,y)){
                        currentShape.prototype.y += 1
                        this.score+=1;
                        redraw()
                    }
                    
                }
                
                function fall(){
                    var x = currentShape.prototype.x
                    var y = currentShape.prototype.y
                    while(!set(x,y+1)){
                        
                        currentShape.prototype.y += 1
                        y++
                        this.score+=1  
                    }
                    check()
                    redraw()
                    hitSound.play()
                    
                    
                }
                
                
                
                
                function redraw(){
                    var elem = draw()
                    document.body.innerHTML=''
                    document.body.appendChild(elem)
                    
                    
                    
                }
                
                var color = ["yellow","cyan","orange","blue","red","green","purple"]
                
                

                

                function draw(){
                    var board = put()
                    var boardElem = document.createElement("div")
                    for(var i=0;i<ROW;i++){
                        for(var j=0;j<COLUMN;j++){
                            var block = document.createElement('div')
                            block.classList.add("block")
                            if(board[i][j]>0){
                                //block.classList.add("gotten")
                                var cindex = board[i][j]
                                console.log("color: "+color[cindex-1]+" "+board[i][j])
                                block.style.backgroundColor = color[cindex-1]
                            }
                            if(this.score>=CHK){
                                if(DELAY!=250){
                                    DELAY-=250;
                                    CHK+=500;
                                }
                                
                                
                                clearInterval(interval)
                                interval = setInterval(function(){
                                    if(check()){
                                        redraw()
                                        gameSound.play()
                                        gameSound.loop()  
                                    }else{
                                        gameSound.stop()
                                        clearInterval(interval)
                                        console.log("TOTAL SCORE :"+this.score)
                                    }
                                },DELAY);
                            }
                            block.style.top = (i*30)+"px"
                            block.style.left = (j*30)+"px"
                            boardElem.appendChild(block)
                        }
                    }
                    boardElem.classList.add("board")

                    var infoBox = tetrisInfoBoard()
                    var paneElem = document.createElement("div")
                    paneElem.classList.add("tetrisPane")
                    paneElem.append(boardElem);
                    paneElem.append(infoBox)
                    console.log("draw")
                    return paneElem;
                }  
                
                function check(){
                    if(!isOver){
                        var x = currentShape.prototype.x
                        var y = currentShape.prototype.y+1
                        if(set(x,y)){
                            board = put()
                            var res = deleteRow();
                            board = res.board
                            currentShape = nextShape;
                            currentShape.prototype.x = 3;
                            currentShape.prototype.y = -1;
                            nextShape = new Shape().getShape(getRandom())
                            console.log(currentShape)
                            this.score += 1+res.deletedRow*res.deletedRow*COLUMN 
                            if(set(3,0)){
                                isOver = true;
                                document.body.removeEventListener("keydown",keyEventHandler)
                                overSound.play();
                            }

                            
                        }
                        else{
                            currentShape.prototype.y += 1;
                        }
                        return true;
                    }else{
                        document.body.removeEventListener("keydown",keyEventHandler)
                        return false;
                    }
                    
                }
                
                function deleteRow(){
                    var newBoard = []
                    var k = ROW
                    for(var i=(ROW-1);i>=0;i--){
                        for(var j = 0;j<COLUMN;j++){
                            if(board[i][j]==0){
                               newBoard[--k] = board[i].slice()
                               break;
                            }
                        }
                    }
                    for(var i=0;i<k;i++){
                        newBoard[i] = []
                        for(var j=0;j<COLUMN;j++){
                            newBoard[i][j]=0;
                            
                        }
                    }

                    if(k!=0){
                        clearSound.play()
                    }
                    return{
                        "board" : newBoard,
                        "deletedRow" : k
                        
                    }
                }    
                function put(){
                    
                    var x = currentShape.prototype.x
                    var y = currentShape.prototype.y
                    var pane = board
                    var newBoard = []

                    for(var i=0;i<ROW;i++){
                        newBoard[i] = pane[i].slice(); 
                    }
                    console.log("board "+newBoard[0][0])
                    console.log(x)
                    console.log(y)
                    for (var i = 0; i < 4; i++)
                        for (var j = 0; j < 4; j++)
                          if (this.currentShape.shape[i][j]>0)
                            newBoard[y+i][x+j] = this.currentShape.shape[i][j];
                    return newBoard;
                }


                function tetrisInfoBoard(){
                    var info = howToPlay()
                    var score = showScore()
                    var nextPiece = previewPiece();

                    var infoBoard = document.createElement("div")
                    infoBoard.classList.add("infoBoard")
                    infoBoard.appendChild(nextPiece)
                    infoBoard.appendChild(info)
                    infoBoard.appendChild(score)
                    

                    return infoBoard
                }
                function putView(){
                    
                    var x = nextShape.prototype.x
                    var y = nextShape.prototype.y
                    var pane = smallboard
                    var newBoard = []

                    for(var i=0;i<4;i++){
                        newBoard[i] = pane[i].slice(); 
                    }
                    console.log("board "+newBoard[0][0])
                    console.log(x)
                    console.log(y)
                    for (var i = 0; i < 4; i++)
                        for (var j = 0; j < 4; j++)
                          if (this.nextShape.shape[i][j]>0)
                            newBoard[i][j] = this.nextShape.shape[i][j];
                    return newBoard;
                }

                function previewPiece(){
                    var board = putView()
                    var nextPiece = document.createElement("div")
                    for(var i=0;i<4;i++){
                        for(var j=0;j<4;j++){
                            var block = document.createElement('div')
                            block.classList.add("block")
                            if(board[i][j]>0){
                                //block.classList.add("gotten")
                                var cindex = board[i][j]
                                console.log("color: "+color[cindex-1]+" "+board[i][j])
                                block.style.backgroundColor = color[cindex-1]
                            }
                            block.style.top = (i*30)+"px"
                            block.style.left = (j*30)+"px"
                            nextPiece.appendChild(block)
                            var pieceBoard = document.createElement("div")
                            pieceBoard.classList.add("nextPiece")
                            pieceBoard.appendChild(nextPiece)
                        }
                    }

                    

                    return pieceBoard;
                }
                

                function howToPlay(){
                    var howToPlay = document.createElement("div");
                    howToPlay.classList.add("howToPlay")
                    howToPlay.innerHTML= "<table>" +
                        "<tr><th>Cursor Left-Right</th><td>   Move</td></tr>" +
                        "<tr><th>Cursor Up</th><td>Rotate</td></tr>" +
                        "<tr><th>Cursor Down</th><td>Move Down</td></tr>"+
                        "<tr><th>Space bar</th><td>Let fall</td></tr>" +
                        "<tr><th>Enter</th><td>Pause/Resume</td></tr>" +
                        "<tr><th>R</th><td>Restart game</td></tr>" +
                        "</table>";

                    return howToPlay
                }

                function showScore(){
                    var showScore = document.createElement("div")
                    showScore.classList.add("showScore")
                    showScore.innerHTML='<p>SCORE: ' +this.score +'</p>';

                    return showScore
                }

                


                
            } 
            function getRandom(){
                return Math.floor(Math.random()*7)
            } 
            function Shape(){
                this.x =3
                this.y = -2 
                this.getShape = function(index){
                    switch(index){
                        case 0:
                            this.shape = new OShape();
                            return this.shape
                            break;
                        case 1:
                            this.shape = new IShape();
                            return this.shape
                            break;
                        case 2:
                            this.shape = new LShape();
                            return this.shape
                            break;
                        case 3:
                            this.shape = new JShape();
                            return this.shape
                            break;
                        case 4:
                            this.shape = new ZShape();
                            return this.shape
                            break;
                        case 5:
                            this.shape = new SShape();
                            return this.shape
                            break;
                        case 6:
                            this.shape = new TShape();
                            return this.shape
                            break;
                    }       
                }                 
            }
            
            Shape.prototype.rotate = function(){
                var piece = currentShape.shape;
                currentShape.shape = [
                        [piece[0][3], piece[1][3], piece[2][3], piece[3][3]],
                        [piece[0][2], piece[1][2], piece[2][2], piece[3][2]],
                        [piece[0][1], piece[1][1], piece[2][1], piece[3][1]],
                        [piece[0][0], piece[1][0], piece[2][0], piece[3][0]]
                      ];
                if(set(this.x,this.y)){
                   currentShape.shape = piece 
                }
            }
            
            function OShape(){
                this.prototype = new Shape()
                this.color = "yellow"
                this.shape = [[0, 0, 0, 0],
                              [0, 1, 1, 0],
                              [0, 1, 1, 0],
                              [0, 0, 0, 0]]
            }
            function IShape(){
                this.prototype = new Shape()
                this.color = "cyan"
                this.shape = [[0, 0, 0, 0],
                              [2, 2, 2, 2],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0]]
            }
            function LShape(){
                this.prototype = new Shape()
                this.color = "orange"
                this.shape = [[0, 0, 0, 0],
                              [0, 0, 3, 0],
                              [3, 3, 3, 0],
                              [0, 0, 0, 0]]
            }
            function JShape(){
                this.prototype = new Shape()
                this.color = "blue"
                this.shape = [[0, 0, 0, 0],
                              [4, 0, 0, 0],
                              [4, 4, 4, 0],
                              [0, 0, 0, 0]]
            }
            function ZShape(){
                this.prototype = new Shape()
                this.color = "red"
                this.shape = [[0, 0, 0, 0],
                              [5, 5, 0, 0],
                              [0, 5, 5, 0],
                              [0, 0, 0, 0]]
            }
            function SShape(){
                this.prototype = new Shape()
                this.color = "green"
                this.shape = [[0, 0, 0, 0],
                              [0, 6, 6, 0],
                              [6, 6, 0, 0],
                              [0, 0, 0, 0]]
            }
            function TShape(){
                this.prototype = new Shape()
                this.color = "purple"
                this.shape = [[0, 0, 0, 0],
                              [0, 7, 0, 0],
                              [7, 7, 7, 0],
                              [0, 0, 0, 0]]
            }