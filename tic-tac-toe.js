var TicTacToe = function(){

	var player = 1

	var gameOver = false

	var board = {
		'a1': 0,
		'a2': 0,
		'a3': 0,
		'b1': 0,
		'b2': 0,
		'b3': 0,
		'c1': 0,
		'c2': 0,
		'c3': 0
	}

	var winConditions = [[
		'a1','b1','c1'
	],[
		'a2','b2','c2'	
	],[
		'a3','b3','c3'	
	],[
		'a1','a2','a3'	
	],[
		'b1','b2','b3'	
	],[
		'c1','c2','c3'	
	],[
		'a1','b2','c3'	
	],[
		'a3','b2','c1'	
	]]

	var initialize = function(){
		var buttons = document.querySelectorAll('table button')
		buttons.forEach(function(button){
			button.onclick = clickHandler
		})
		var resetButton = document.querySelector('.reset')
		resetButton.onclick = function(event){
			window.location.reload()
		}
	}

	var clickHandler = function(event){
		var position = event.target.id
		if (gameOver) return
		if (board[position]) return // position has already been clicked.
		event.target.textContent = player == 1 ? 'X' : 'O' // update the button.
		board[position] = player // update the board state.
		var winner = determineWinner() // check for winner.
		if (winner){
			gameOver = true
			updateHeader(getPlayerSymbol(winner) + ' wins!')
			return
		}
		var availablePostions = getAvailablePositions() // check for draw.
		if (availablePostions.length == 0){ 
			gameOver = true
			updateHeader('Nobody wins.')
			return
		}
		updatePlayer()
	}

	var getPlayerSymbol = function(player){
		return player == 1 ? 'X' : 'O'
	}

	var updatePlayer = function(){
		player = player == 1 ? 2 : 1
		var letter = getPlayerSymbol(player)
		updateHeader(letter + "'s turn.")
	}

	var updateHeader = function(message){
		var header = document.querySelector('.message')
		header.textContent = message
	}

	var didPlayerWin = function(player){
		for (var i in winConditions){
			var winCondition = winConditions[i]
			var count = 0
			for (var ii in winCondition){
				var position = winCondition[ii]
				var state = board[position]
				if (state == player){
					count += 1
				}
			}
			if (count == 3) return true
		}
		return false
	}

	var determineWinner = function(){
		if (didPlayerWin(1)) return 1
		if (didPlayerWin(2)) return 2
	}

	var getAvailablePositions = function(){
		var output = []
		for (var id in board){
			if (board[id] == 0){
				output.push(id)
			}
		}
		return output
	}


	initialize()

}