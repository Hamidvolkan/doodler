
document.addEventListener("DOMContentLoaded" , ()=>{
    let grid = document.querySelector(".grid");
    let doodler = document.createElement("div");
    let platform = document.createElement("div");
    let startPoint = 10;
    let doodlerBtmSpace = startPoint;
    let Gameisover = false ;
    let isjumping = false;
    let platformcount = 5 ;
    let platforms = [];

    let isGoingRight = false;
    let isGoingLeft = false;
    let rightTimerId;
    let leftTimerId;

    score = 0 ;

    class Platform {
        constructor(newPlatformBottom){

            this.bottom = newPlatformBottom
            this.left =Math.random() * 320;
            this.visual = document.createElement("div");
    
            const visual = this.visual
            visual.classList.add("platform")
            visual.style.left = this.left + "px"
            visual.style.bottom = this.bottom + "px"
            grid.appendChild(visual);
        }

    }

    function CRplatform(){
        for(let i=0 ; i < platformcount ; i++ ){
            let platformGap = 500 / platformcount;
            let newPlatformBottom = 50 + i * platformGap ;
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform)
            console.log(platforms)
        }
        
        
    };


    function CRdoodler() {
        doodler.classList.add("doodler")
        grid.appendChild(doodler);
        doodlerLeft = platforms[0].left;
        doodler.style.left  = doodlerLeft + "px";
        doodler.style.bottom  = doodlerBtmSpace +"px";

    };

    function movePlatforms() {
        if (doodlerBtmSpace > 50){
            platforms.forEach(platform =>{
                platform.bottom -= 2;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px'


                if(platform.bottom < 5){
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform')
                    platforms.shift();
                    score++
                    let newPlatform = new Platform(500)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    // function jump(){
    //     upTimer = setInterval(function(){
            
            
    //         doodlerBtmSpace += 10;
    //         doodler.style.bottom = doodlerBtmSpace + "px";
    //         if (doodlerBtmSpace > startPoint + 200 ){
    //             fall ()
    //         }
    //     },20)
    // }

    function platformSpeedDrop(){
        if (doodlerBtmSpace > 400){
            platforms.forEach(platform =>{
                platform.bottom -= 4;
                 let visual = platform.visual;
                 visual.style.bottom = platform.bottom + "px"
            })
        
        }
    }

    function jump(){
        clearInterval(platformSpeedDrop)
        
        upTimer = setInterval(function(){
            
            
            doodlerBtmSpace += 10;
            doodler.style.bottom = doodlerBtmSpace + "px";
            if (doodlerBtmSpace > startPoint + 200 ){
                
                fall()
               
            }else if(doodlerBtmSpace > 400 ){
                clearInterval(upTimer);
                setTimeout(fall,200)
                setInterval(platformSpeedDrop,30);
            }
        },20)
    }

    function fall(){
        clearInterval(upTimer);
        downTimer = setInterval(function(){
            doodlerBtmSpace -= 5;
            doodler.style.bottom = doodlerBtmSpace + "px";
            if(doodlerBtmSpace <= 0 ){
                gameOver()
            }
             platforms.forEach(platform =>{
                 if(
                 (doodlerBtmSpace >= platform.bottom) &&
                 (doodlerBtmSpace <= (platform.bottom + 10)) &&
                 ((doodlerLeft + 45 ) >= platform.left) &&
                 (doodlerLeft <= ( platform.left + 80)) &&
                 !isjumping
                 ){
                     console.log("jump");
                     clearInterval(downTimer);
                     startPoint = doodlerBtmSpace;
                     jump()
                        }
                 
             });

        },20)
    }



     function control(e){
         if(e.key === "ArrowLeft"){
             moveLeft();
         }
         else  if(e.key === "ArrowRight"){
             moveRight();
         }
      
     }

    // function control(e){
    //     if(document.addEventListener("keypress")){
    //         moveLeft();

    //     }
      
      
    // }

    function moveLeft(){

        if(isGoingLeft == false){

            isGoingLeft = true;
            if(isGoingLeft){
                clearInterval(rightTimerId);
                isGoingRight = false;
            }
        
                console.log("moving left")
                leftTimerId = setInterval(function(){
                    if(doodlerLeft >= 0 ){
                        doodlerLeft -= 8;
                        doodler.style.left = doodlerLeft + "px";
                        }else{
                           
                            moveRight();
                        }
        
                    },20)
        }
      
    }


     function moveRight(){

          if(isGoingRight == false){

             isGoingRight = true;
             if(isGoingRight){
                 clearInterval(leftTimerId);
                 isGoingLeft = false;
             }
              
                 rightTimerId = setInterval(function(){
                       if(doodlerLeft <= 355){
                           doodlerLeft += 8 ;
                           doodler.style.left = doodlerLeft + "px";
                       }
                      else{
                          moveLeft()
                       }
                  },20);
                }
     }


    function gameOver(){
        
        Gameisover = true;
        console.log("game is over");
        clearInterval(upTimer);
        clearInterval(downTimer)

        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = "game over " + score ; 
        
        
    }

    
    function start(){
        if(!Gameisover){
            CRplatform();
            CRdoodler();
            setInterval(movePlatforms,30);
            jump();
            document.addEventListener("keyup",control);
}}

start()



})