let score = 0;
let level =1;

function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    document.getElementById('result').textContent = '';
//style color and size
    const gridSize = Math.min(Math.floor(Math.sqrt(level)) + 1, 10);
    const boxSize = Math.floor(300 / gridSize);

    const baseColor = Math.floor(Math.random() * 360);
    const baseBrightness = Math.max(50, 100 - level * 2);
    const colorDifference = Math.max(5, 30 - level);

    const differentBox = Math.floor(Math.random() * (gridSize * gridSize));

    gameBoard.style.width = `${boxSize * gridSize}px`;
    gameBoard.style.height = `${boxSize * gridSize}px`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const box = document.createElement('div');
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        box.style.float = 'left';

        if (i === differentBox) {
            box.style.backgroundColor = `hsl(${baseColor}, 100%, ${baseBrightness}%)`;
            box.onclick = () => correctChoice();
        } else {
            box.style.backgroundColor = `hsl(${baseColor}, 100%, ${baseBrightness + colorDifference}%)`;
            box.onclick = () => wrongChoice();
        }

        gameBoard.appendChild(box);
    }
}
// correctgame
function correctChoice() {
    score++;
    level++;
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    
    if (score >= 30) {
        endGame(true);
    } else {
        document.getElementById('result').textContent = '🤗درست';
        setTimeout(startGame, 1000);
    }
}


function wrongChoice() {
    endGame(false);
}
//endgame
function endGame(isWinner) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    const resultElement = document.getElementById('result');
    if (isWinner) {
        resultElement.textContent = '😍تبریک! شما برنده شدید';
    } else {
        resultElement.textContent = '😥متأسفانه شما باختید';
    }
//restart
    const restartButton = document.createElement('button');
    restartButton.textContent = 'شروع مجدد بازی';
    restartButton.onclick = resetGame;
    resultElement.appendChild(document.createElement('br'));
    resultElement.appendChild(restartButton);
}

function resetGame() {
    score = 0;
    level = 1;
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    startGame();
}

startGame();
