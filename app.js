const { createApp } = Vue;

createApp({
    data() {
        return {
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X',
            winner: null,
            isDraw: false
        }
    },
    methods: {
        makeMove(row, col) {
            // If cell is already taken or game is over, return
            if (this.board[row][col] || this.winner || this.isDraw) {
                return;
            }

            // Make the move
            this.board[row][col] = this.currentPlayer;

            // Check for winner
            if (this.checkWinner()) {
                this.winner = this.currentPlayer;
                return;
            }

            // Check for draw
            if (this.checkDraw()) {
                this.isDraw = true;
                return;
            }

            // Switch player
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        },

        checkWinner() {
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (this.board[i][0] && 
                    this.board[i][0] === this.board[i][1] && 
                    this.board[i][1] === this.board[i][2]) {
                    return true;
                }
            }

            // Check columns
            for (let i = 0; i < 3; i++) {
                if (this.board[0][i] && 
                    this.board[0][i] === this.board[1][i] && 
                    this.board[1][i] === this.board[2][i]) {
                    return true;
                }
            }

            // Check diagonals
            if (this.board[0][0] && 
                this.board[0][0] === this.board[1][1] && 
                this.board[1][1] === this.board[2][2]) {
                return true;
            }

            if (this.board[0][2] && 
                this.board[0][2] === this.board[1][1] && 
                this.board[1][1] === this.board[2][0]) {
                return true;
            }

            return false;
        },

        checkDraw() {
            return this.board.every(row => row.every(cell => cell !== ''));
        },

        resetGame() {
            this.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            this.currentPlayer = 'X';
            this.winner = null;
            this.isDraw = false;
        }
    }
}).mount('#app');
