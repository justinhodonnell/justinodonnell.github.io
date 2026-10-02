/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * Justin O'Donnell
 */

/** namespace. */
var rhit = rhit || {};

rhit.numButtons = 7;

rhit.PageController = class {
	constructor() {
		this.game = new rhit.Game;

		const boxes = document.querySelectorAll(".box");
		for (const box of boxes) {
			box.onclick = (event) => {
				const buttonIndex = parseInt(box.dataset.buttonIndex);
				console.log("Button ", buttonIndex);
				this.game.pressedButtonAtIndex(buttonIndex);
				this.updateView();
			}
		}
		document.querySelector("#newGameButton").onclick = (event) => {
			this.game = new rhit.Game();
			this.updateView();
		}
		this.updateView();
	}

	updateView() {
		const boxes = document.querySelectorAll(".box");
		boxes.forEach((box, index) => {
			const mark = this.game.getMarkAtIndex(index);
			box.innerHTML = mark;

			//change background
			if (mark == rhit.Game.Mark.ONE) {
				box.style.backgroundColor = "yellow";
				box.style.color = "black";
			} else {
				box.style.backgroundColor = "black";
				box.style.color = "white";
			}
		});

		document.querySelector("#gameplayText").innerHTML = this.game.state;
	}
}

rhit.Game = class {

	static Mark = {
		ONE: "1",
		ZERO: "0",
	}

	static State = {
		STARTING: "Make the buttons match",
		PLAYING: (numMoves) => `You have taken ${numMoves} moves so far.`,
		LIGHTSOUT: (numMoves) => `You won in ${numMoves}!`,
	}

	constructor() {
		this.gameIsOver = false;
		this.board = [];
		this.numMoves = 0;
		this.state = rhit.Game.State.PLAYING(0);
		for (let k = 0; k < 7; k++) {
			this.board.push(rhit.Game.Mark.ONE);
		}

		const numMoves = Math.floor(Math.random() * 4) + 4;

		for (let i = 0; i < numMoves; i++) {
			const randomIndex = Math.floor(Math.random() * rhit.numButtons);
			console.log("Random Index: ", randomIndex)
			this.pressedButtonAtIndex(randomIndex);
			this.gameIsOver = false;

			// making sure it doesn't start in solved position
			if (this.board.every(mark => mark === rhit.Game.Mark.ZERO) || this.board.every(mark => mark === rhit.Game.Mark.ONE)) {
				this.pressedButtonAtIndex(randomIndex);

				//did two moves bc why not
				if(randomIndex == 6) {
					this.pressedButtonAtIndex(0);
				} else {
					this.pressedButtonAtIndex(randomIndex + 1);
				}
			}
		}

		this.numMoves = 0;

		this.state = rhit.Game.State.STARTING;
	}

	getMarkAtIndex(index) {
		return this.board[index];
	}

	_toggleAt(index) {
		const toggle = (i) => {
			if(this.board[i] == rhit.Game.Mark.ZERO) {
				this.board[i] = rhit.Game.Mark.ONE;
			} else {
				this.board[i] = rhit.Game.Mark.ZERO;
			}
		};

		toggle(index);
		if (index > 0) toggle(index - 1);
		if (index < rhit.numButtons - 1) toggle(index + 1);
	}

	pressedButtonAtIndex(buttonIndex) {
		if(this.gameIsOver) {
			console.log("The game is over");
			return;
		}

		this._toggleAt(buttonIndex);
		this.numMoves++;

		if (this._winCondition()) {
			this.state = rhit.Game.State.LIGHTSOUT(this.numMoves);
			this.gameIsOver = true;
		} else {
			this.state = rhit.Game.State.PLAYING(this.numMoves);
		}
	}

	_winCondition() {
		if (this.numMoves > 0) {
			return this.board.every(mark => mark === rhit.Game.Mark.ZERO) ||
			   this.board.every(mark => mark === rhit.Game.Mark.ONE);
		} else {
			return false;
		}
		
	}
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	new rhit.PageController();
};

rhit.main();
