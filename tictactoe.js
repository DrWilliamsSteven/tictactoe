$(document).ready(function() {

  $('.alert').hide();

  var playerSymbol = 'O';
  var computerSymbol = 'X';
  var boardState = ["", "", "", "", "", "", "", "", ""];
  var gameOver;

  $(document).on('click', '.toggle-button', function() {
    $(this).toggleClass('toggle-button-selected');
    playerSymbol === "X" ? playerSymbol = "O" : playerSymbol = "X";
    playerSymbol === "X" ? computerSymbol = "O" : computerSymbol = "X";
    reset();
  });

  $('.square').click(function() {
    var slot = $(this).attr('id');
    playerTurn(playerSymbol, '#' + slot, slot);
    if (!gameOver) {
      setTimeout(function() {
        computerMove();
      }, 100);
    }
  });

  function playerTurn(symbol, id, slot) {
    var spotTaken = $(id).hasClass('square-taken');
    if (!spotTaken) {
      boardState[slot] = symbol;
      $(id).html('<h3>' + symbol + '</h3>');
      $(id).addClass('square-taken');
      $(id).css("pointer-events", "none");
    }
    checkWin();
  }

  function computerMove() {
    var randomSlot = Math.floor(Math.random() * 9);
    var spotTaken = $('#' + randomSlot).hasClass('square-taken');
    if (!spotTaken) {
      boardState[randomSlot] = computerSymbol;
      $('#' + randomSlot).html('<h3>' + computerSymbol + '</h3>');
      $('#' + randomSlot).addClass('square-taken');
      $('#' + randomSlot).css("pointer-events", "none");
      checkWin();
    } else {
      computerMove();
    }
  }

  var reset = function() {
    $(".square").html("");
    $(".square").removeClass('square-taken');
    $(".square").css("pointer-events", "auto");
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    $('.alert').hide();
    whoGoesFirst();
  };

  $('#reset-button').click(function() {
    reset();
  });

  function whoGoesFirst() {
    var check = (Math.random() < 0.5);
    if (check) {
      computerMove();
    }
  }

  function checkWin() {
    var winSolutions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winSolutions.find(function(array) {
      if (boardState[array[0]] !== "" && boardState[array[0]] == boardState[array[1]] && boardState[array[1]] == boardState[array[2]]) {
        if (boardState[array[0]] == playerSymbol) {
          $('.alert-success').show();
          gameOver = true;
          setTimeout(function() {
            reset();
          }, 1500);

        } else if (boardState[array[0]] == computerSymbol) {
          $('.alert-danger').show();
          gameOver = true;
          setTimeout(function() {
            reset();
          }, 1500);
        }
      }
    });

    if (!boardState.includes("") && !gameOver) {
      gameOver = true;
      $('.alert-warning').show();
      setTimeout(function() {
        reset();
      }, 1500);

    }
  }

});
