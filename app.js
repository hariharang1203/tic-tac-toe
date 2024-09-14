const boxes = document.querySelectorAll('.box');
        const status = document.querySelector('.status');
        const button = document.querySelector('.restart');
        const winnerMessage = document.getElementById('winnerMessage');
        let score1 = document.getElementById('score1');
        let score2 = document.getElementById('score2');
        const winCombos = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ];
        let currentPlayer = 'X';
        let options = Array(9).fill('');
        let running = false;

        init();

        function init() {
            boxes.forEach((box) => box.addEventListener('click', boxClick));
            button.addEventListener('click', resetGame);
            status.textContent = `${currentPlayer}'s Turn`;
            running = true;
        }

        function boxClick() {
            const index = this.dataset.item;
            if (options[index] !== "" || !running) return;
            updateBox(this, index);
            checkWinner();
        }

        function updateBox(box, index) {
            options[index] = currentPlayer;
            box.textContent = currentPlayer;
        }

        function checkWinner() {
            let roundWon = false;

            for (let i = 0; i < winCombos.length; i++) {
                const [a, b, c] = winCombos[i];
                if (options[a] && options[a] === options[b] && options[a] === options[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                running = false;
                status.textContent = `${currentPlayer} Wins!`;
                showWinnerMessage(`${currentPlayer} Wins!`, currentPlayer === 'X' ? '#4CAF50' : '#388E3C');
                updateScore();
            } else if (!options.includes("")) {
                status.textContent = "It's a Draw!";
                showWinnerMessage("It's a Draw!", '#F51720');  // Change background color for draw
                running = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `${currentPlayer}'s Turn`;
            }
        }

        function updateScore() {
            if (currentPlayer === 'X') {
                score1.textContent = parseInt(score1.textContent) + 1;
            } else {
                score2.textContent = parseInt(score2.textContent) + 1;
            }
        }

        function showWinnerMessage(message, bgColor) {
            winnerMessage.textContent = message;
            winnerMessage.style.backgroundColor = bgColor;
            winnerMessage.classList.add('show');
            setTimeout(() => winnerMessage.classList.remove('show'), 2000);
        }

        function resetGame() {
            options.fill('');
            boxes.forEach(box => box.textContent = '');
            currentPlayer = 'X';
            status.textContent = `${currentPlayer}'s Turn`;
            running = true;
        }