// A board class representing a 8x8 chess board
class Board {
	constructor(size = 8) {
		// Maybe experiment with bigger boards later?
		this.size = size
		this.boardArray = []
	}
	buildBoard() {
		for (let row = 0; row < this.size; row++) {
			for (let column = 0; column < this.size; column++)
				this.boardArray.push(new Node(row, column))
		}
	}
}

class Node {
	constructor(row, column) {
		this.row = row
		this.column = column
		this.adjacencies = this.populateAdjacencies()
	}

	// Adjacencies are the valid moves a knight can make
	// on the board
	populateAdjacencies() {
		let adjacencies = [
			[this.row + 1, this.column + 2],
			[this.row + 2, this.column + 1],
			[this.row - 1, this.column + 2],
			[this.row - 2, this.column + 1],
			[this.row - 2, this.column - 1],
			[this.row - 1, this.column - 2],
			[this.row + 1, this.column - 2],
			[this.row + 2, this.column - 1],
		]
		// filter adjacency list for invalid moves
		adjacencies = adjacencies.filter((adjacency) => {
			if (
				adjacency[0] > -1 &&
				adjacency[0] < 8 &&
				adjacency[1] > -1 &&
				adjacency[1] < 8
			) {
				return adjacency
			}
		})
		return adjacencies
	}
}

let board = new Board()
board.buildBoard()

console.log(board.boardArray[3])
console.log(board.boardArray[8])
