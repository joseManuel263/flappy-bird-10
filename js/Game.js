class Game {
  constructor(){
    this.gameOver = createElement('h2');
  }

  getState(){
    var gameState1Ref  = database.ref('gameState1');
    gameState1Ref.on("value",function(data){
       gameState1 = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState1: state
    });
  }

  async start(){
    if(gameState1 === 0){
      
      player = new Player();
      
      var playerCount1Ref = await database.ref('playerCount1').once("value");
      if(playerCount1Ref.exists()){
        playerCount1 = playerCount1Ref.val();
        
        player.getCount();
        
      }
      
      form = new Form()
      form.display();
    }
   bird = createSprite(100,150);
   bird1 = createSprite(150,250);
   bird2 = createSprite(200,350);
   bird3 = createSprite(250,450);

   bird.addImage("bird",birdImg);
   bird1.addImage("bird",birdImg);
   bird2.addImage("bird",birdImg);
   bird3.addImage("bird",birdImg);

   bird.scale = 0.2;
   bird1.scale = 0.2;
   bird2.scale = 0.2;
   bird3.scale = 0.2;
  }

  play(){
    console.log("jugando =)");

    Player.getPlayerInfo();

    console.log(player.index);

    var index = 0;
    var x = 100;
    var y = 150;
  
    for(var plr in allPlayers){
      index = index + 1;

      x = 100;
      y = displayHeight - allPlayers[plr].distance;
      bird.x = x;
      bird.y = y;
      
    }

    form.hideGreeting();

        background("white");

      if(keyIsDown(32)||keyIsDown(UP_ARROW)){
        player.distance +=1;
      }
      
      player.distance = player.distance - 5;
      
      if(frameCount % 100 === 0){
        pipesA = createSprite(displayWidth,displayHeight-300);
        pipesA.addImage("pipesA",pipesA_img);
        pipesA.velocityX = -3;
        pipesB = createSprite(displayWidth,displayHeight/2-150);
        pipesB.addImage("pipesB",pipesB_img);
        pipesB.velocityX = -3;
        pipesAG.add(pipesA);
        pipesBG.add(pipesB);
      }
      
      if(pipesAG.isTouching(bird)||pipesBG.isTouching(bird)||pipesAG.isTouching(bird1)||
      pipesBG.isTouching(bird1)||pipesAG.isTouching(bird2)||pipesBG.isTouching(bird2)||
      pipesAG.isTouching(bird3)||pipesBG.isTouching(bird3)){
        game.update(2);
        gameOver.display();
        //coneccion de update a base de datos, para cambiar el game state a cero
      }

      drawSprites();
  }

  end(){
    gameOver.display();
  }
}
