var Player = {
  initialize: function(symbol) {
    this.symbol = symbol;
  },
  create: function(symbol){
    var player = Object.create(Player);
    player.initialize(symbol);
    return player;
  }
};

var Space = {
  allSpaces: [],
  markBy: function(player) {
    this.mark = player;
  },

  create: function(coordinates) {
    var space = Object.create(Space);
    space.initialize(coordinates);
    Space.allSpaces.push(space);
    return space;
  },

  initialize: function(coordinates){
    this.coordinates = coordinates;
    this.mark = "";
  },
  find: function(coordinateX, coordinateY) {
    var searchResult;
    Space.allSpaces.forEach(function(space) {
      if(space.coordinates[0]===coordinateX && space.coordinates[1]===coordinateY) {
        searchResult = space;
      }
    });
    return searchResult;
  }
};

var Board = {
  create: function() {
    var board = Object.create(Board);
    board.initialize();
    for(var i = 1; i <= 3 ; i++){
      for(var j = 1; j <= 3; j++){
        var space = Space.create([i, j]);
      };
    };
    board.spaces = Space.allSpaces;
    return board;
  },
  initialize: function() {
    this.spaces = [];
    this.xCoordinates = [];
    this.oCoordinates = [];
  },

  checkWin: function(player) {
    var oneCounter = 0;
    var twoCounter = 0;
    var threeCounter = 0;
    var result = false;

    this.xCoordinates.forEach(function(coordinateSet){
      if(coordinateSet[1] === 1){
        oneCounter ++;
      } else if(coordinateSet[1] === 2){
        twoCounter ++;
      } else if(coordinateSet[1] === 3){
        threeCounter ++;
      }
      console.log(oneCounter);
    });
    if(oneCounter === 3 || twoCounter === 3 || threeCounter === 3){
      this.winner = "Player X";
      result = true;
    } else {
      oneCounter = 0;
      twoCounter = 0;
      threeCounter = 0;
      this.xCoordinates.forEach(function(coordinateSet){
        if(coordinateSet[0] === 1){
          oneCounter ++;
        } else if(coordinateSet[0] === 2){
          twoCounter ++;
        } else if(coordinateSet[0] === 3){
          threeCounter ++;
        }
      });
      if(oneCounter === 3 || twoCounter === 3 || threeCounter === 3){
        this.winner = "Player X";
        result = true;
      } else {
          oneCounter = 0;
          twoCounter = 0;
          master1 = ["11", "22", "33"];
          master2 = ["13", "22", "31"];

            this.xCoordinates.forEach(function(coordinateSet) {
              if(master1.indexOf(coordinateSet.join("")) > -1) {
                oneCounter ++;
              }
              if(master2.indexOf(coordinateSet.join("")) > -1) {
                twoCounter ++;
              }
            });

            if(oneCounter === 3 || twoCounter === 3){
            this.winner = "Player X";
            result = true;
      }
    }
    }

    if(result) {
      return result;
    } else {
      oneCounter = 0;
      twoCounter = 0;
      threeCounter = 0;
      this.oCoordinates.forEach(function(coordinateSet){
        if(coordinateSet[1] === 1){
          oneCounter ++;
        } else if(coordinateSet[1] === 2){
          twoCounter ++;
        } else if(coordinateSet[1] === 3){
          threeCounter ++;
        }
      });
      if(oneCounter === 3 || twoCounter === 3 || threeCounter === 3){
        this.winner = "Player O";
        result= true;
      } else {
        oneCounter = 0;
        twoCounter = 0;
        threeCounter = 0;
        this.oCoordinates.forEach(function(coordinateSet){
          if(coordinateSet[0] === 1){
            oneCounter ++;
          } else if(coordinateSet[0] === 2){
            twoCounter ++;
          } else if(coordinateSet[0] === 3){
            threeCounter ++;
          }
        });
        if(oneCounter === 3 || twoCounter === 3 || threeCounter === 3){
          this.winner = "Player O";
          result = true;
        } else {
          oneCounter = 0;
          twoCounter = 0;
          master1 = ["11", "22", "33"];
          master2 = ["13", "22", "31"];

            this.oCoordinates.forEach(function(coordinateSet) {
              if(master1.indexOf(coordinateSet.join("")) > -1) {
                oneCounter ++;
              }
              if(master2.indexOf(coordinateSet.join("")) > -1) {
                twoCounter ++;
              }
            });

            if(oneCounter === 3 || twoCounter === 3){
            this.winner = "Player O";
            result = true;
           }
          }

        }
      return result;   
      }
    },
  checkCatsGame: function() {
    
  }
};

var Game = {
  initialize: function() {
    this.board = Board.create();
    this.playerX = Player.create('X');
    this.playerO = Player.create('O');
  },
  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game;
  }

};

$(function() {
  var currentPlayer;
  var newGame;
  var counter = 0;
  
  $('button#start-game').click(function(){
    newGame = Game.create();
    $('#game-table').show();
    $('#message-box').show();
    currentPlayer = newGame.playerX;
    $("button#start-game").hide();
  });

  $('td').click(function() {
    counter += 1;
    var currentXcoordinate = $(this).index()+1;
    var currentYcoordinate = $(this).parent().index()+1;

    currentSpace = Space.find(currentXcoordinate,currentYcoordinate);

    if(currentSpace.mark === "") {
      currentSpace.markBy(currentPlayer);
      $(this).children('div').append('<span class="' + currentPlayer.symbol +'">' + currentPlayer.symbol + '</span>');
      if(currentPlayer.symbol === 'X') {
        newGame.board.xCoordinates.push([currentXcoordinate,currentYcoordinate]);
      } else {
        newGame.board.oCoordinates.push([currentXcoordinate,currentYcoordinate]);
      }
    } else {
      alert("That space is already taken, please choose another.")
      return;
    }
    
    if(newGame.board.checkWin()) {
      
      if(window.confirm("Game over! "+newGame.board.winner+" wins! Would you like to play again?")) {
        $("td div").text("");
        counter = 0;
        $("button#start-game").trigger("click");
      }
      //alert("Game over! "+newGame.board.winner+" wins! Click 'Start Game' to play again.");
    } else {

      if(counter === 9) {
        if(window.confirm("Game over! There was no winner! Would you like to play again?")) {
        $("td div").text("");
        $("button#start-game").trigger("click");
        counter = 0;
        }
      } else {
      if(currentPlayer == newGame.playerX) {        
        currentPlayer = newGame.playerO;
      } else {
        currentPlayer = newGame.playerX;
      }
    }
  }

  });
});
