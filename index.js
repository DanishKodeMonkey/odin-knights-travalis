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
	// Method returning a node from given coordinates
	// array of row/column [0, 3]
	findNode(coordinates) {
		for (let node of this.boardArray) {
			if (
				node.square[0] === coordinates[0] &&
				node.square[1] === coordinates[1]
			) {
				return node
			}
		}
	}

	// fast method for resetting visited flags after an operation.
	resetVisitFlags() {
		for (let node of this.boardArray) {
			node.visited = false
		}
	}
	// method returning a level order array of a graph
	// from the start point of the given node
	// leverages a BFS approach
	// accepts arrays of coordinates e.g [0,3]
	levelOrder(startCoordinates) {
		const node = this.findNode(startCoordinates)
		let queue = []
		let results = []

		// queue the node, and mark it as visited.
		queue.push(node)
		node.visited = true
		while (queue.length) {
			// Copy current node in queue for operation
			let currentNode = queue.shift()
			// move node to results
			results.push(currentNode)

			// start operation, checking adjacencies
			if (currentNode.adjacencies) {
				for (let adjacency of currentNode.adjacencies) {
					let neighborNode = this.findNode(adjacency)
					// if a adjacency was not visited, add it to the queue
					if (!neighborNode.visited) {
						// adjacency now visited, mark as true to avoid re-queue
						neighborNode.visited = true
						// set parent index of node for later tracing
						neighborNode.parentIndex = results.length - 1
						queue.push(neighborNode)
					}
				}
			}
		}
		this.resetVisitFlags()
		return results
	}
	// Method that puts all the previous methods together to find the shortest path
	// between two coordinate sets!!
	knightMoves(startCoords, endCoords) {
		// Array holding the path to the end coordinates
		// find the end node from the given coords
		const endNode = this.findNode(endCoords)

		// Perform a BFS using start coords
		const path = this.levelOrder(startCoords)

		// Find the index of the last node in the path matching the endNode coords
		const endIndex = path.findIndex(
			(node) =>
				node.square[0] === endNode.square[0] &&
				node.square[1] === endNode.square[1]
		)

		// If for whatever reason the end node is not reachable, return null
		if (endIndex === -1) {
			this.resetVisitFlags()
			return null
		}

		// Now backtrack from the end node to the start node using the parent indices.
		let shortestPath = []
		// Create a non-constant variable from endIndex const
		let currentNodeIndex = endIndex
		while (currentNodeIndex >= 0) {
			shortestPath.unshift(path[currentNodeIndex].square)
			currentNodeIndex = path[currentNodeIndex].parentIndex
		}
		// reset visited flags
		this.resetVisitFlags()
		return shortestPath
	}
}

class Node {
	constructor(row, column) {
		this.row = row
		this.column = column
		this.square = [row, column]
		this.visited = false
		this.adjacencies = this.populateAdjacencies()
		// parentIndex will be used for tracking a path for tracing.
		this.parentIndex = -1
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

// initialize the board
let board = new Board()
board.buildBoard()

// now show the shortest path baby!
console.log(board.knightMoves([0, 3], [4, 2]))
