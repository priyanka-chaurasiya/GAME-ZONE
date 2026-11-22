// ==========================================
// GAMEZONE JAVASCRIPT
// ==========================================


// ================= THEME =================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


// ================= GAME CARDS =================

const cards = document.querySelectorAll(".game-card");

const gameCount =
    document.getElementById("gameCount");

gameCount.textContent =
    cards.length + " Games";


// ================= FILTER =================

const filters =
    document.querySelectorAll(".filter");

filters.forEach(function(filter) {

    filter.addEventListener("click", function() {

        filters.forEach(function(btn) {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

        const category =
            filter.getAttribute("data-filter");

        cards.forEach(function(card) {

            if (
                category === "all" ||
                card.getAttribute("data-category") === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ================= MODAL =================

const modal =
    document.getElementById("gameModal");

const gameArea =
    document.getElementById("gameArea");

const closeBtn =
    document.getElementById("closeBtn");


closeBtn.addEventListener("click", function() {

    modal.classList.remove("show");

});


modal.addEventListener("click", function(e) {

    if (e.target === modal) {

        modal.classList.remove("show");

    }

});


// ================= OPEN GAME =================

cards.forEach(function(card) {

    const button =
        card.querySelector(".play-btn");

    button.addEventListener("click", function() {

        const game =
            card.getAttribute("data-game");

        modal.classList.add("show");

        if (game === "tic") {
            ticTacToe();
        }

        else if (game === "snake") {
            snakeLadder();
        }

        else if (game === "jump") {
            jumpingBall();
        }

        else if (game === "rps") {
            rockPaperScissors();
        }

        else if (game === "guess") {
            numberGuess();
        }

        else if (game === "memory") {
            memoryGame();
        }

        else if (game === "click") {
            clickRush();
        }

        else if (game === "dice") {
            diceDuel();
        }

    });

});


// =====================================================
// TIC TAC TOE
// =====================================================

function ticTacToe() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            ❌ Tic-Tac-Toe ⭕
        </h2>

        <div class="game-center">

            <h3 id="tttMessage">
                Your turn — X
            </h3>

            <br>

            <div
                class="ttt-board"
                id="tttBoard">
            </div>

            <br>

            <button
                class="restart"
                onclick="ticTacToe()">
                🔄 Restart
            </button>

        </div>

    `;


    const board =
        document.getElementById("tttBoard");

    const message =
        document.getElementById("tttMessage");


    let cells =
        Array(9).fill("");

    let currentPlayer = "X";

    let gameOver = false;


    const winningPatterns = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]

    ];


    for (let i = 0; i < 9; i++) {

        const cell =
            document.createElement("button");

        cell.className = "ttt-cell";

        cell.addEventListener("click", function() {

            if (cells[i] !== "" || gameOver) {
                return;
            }

            cells[i] = currentPlayer;

            cell.textContent =
                currentPlayer;


            if (checkWinner()) {

                message.textContent =
                    "🎉 " + currentPlayer + " Wins!";

                gameOver = true;

                return;
            }


            if (cells.every(cell => cell !== "")) {

                message.textContent =
                    "🤝 Game Draw!";

                gameOver = true;

                return;
            }


            currentPlayer =
                currentPlayer === "X"
                ? "O"
                : "X";


            message.textContent =
                currentPlayer + "'s Turn";

        });


        board.appendChild(cell);

    }


    function checkWinner() {

        return winningPatterns.some(function(pattern) {

            return pattern.every(function(index) {

                return cells[index] === currentPlayer;

            });

        });

    }

}


// =====================================================
// SNAKE AND LADDER
// =====================================================

function snakeLadder() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            🐍 Snake & Ladder 🪜
        </h2>

        <div class="game-center">

            <h3 id="snakeMessage">
                Your position: 1
            </h3>

            <button
                class="dice-btn"
                id="rollDice">
                🎲
            </button>

            <div
                class="board"
                id="snakeBoard">
            </div>

        </div>

    `;


    const board =
        document.getElementById("snakeBoard");

    const message =
        document.getElementById("snakeMessage");


    let position = 1;


    const ladders = {

        3: 22,
        8: 30,
        20: 41,
        28: 55,
        36: 44,
        50: 70,
        71: 92,
        80: 99

    };


    const snakes = {

        27: 5,
        42: 18,
        53: 31,
        61: 40,
        66: 45,
        89: 68,
        95: 75,
        97: 78

    };


    for (let i = 100; i >= 1; i--) {

        const square =
            document.createElement("div");

        square.className =
            "square";

        square.id =
            "square-" + i;

        square.innerHTML =
            i;


        if (ladders[i]) {

            square.innerHTML +=
                "<br>🪜";

        }


        if (snakes[i]) {

            square.innerHTML +=
                "<br>🐍";

        }


        board.appendChild(square);

    }


    function drawPlayer() {

        document
            .querySelectorAll(".player")
            .forEach(function(player) {
                player.remove();
            });


        const square =
            document.getElementById(
                "square-" + position
            );


        if (square) {

            const player =
                document.createElement("span");

            player.className =
                "player";

            player.textContent =
                "🧑";

            square.appendChild(player);

        }

    }


    drawPlayer();


    document
        .getElementById("rollDice")
        .addEventListener("click", function() {

            const dice =
                Math.floor(
                    Math.random() * 6
                ) + 1;


            let newPosition =
                position + dice;


            if (newPosition > 100) {

                newPosition =
                    position;

            }


            position =
                newPosition;


            if (ladders[position]) {

                position =
                    ladders[position];

            }


            else if (snakes[position]) {

                position =
                    snakes[position];

            }


            message.textContent =
                "🎲 You rolled " +
                dice +
                " | Position: " +
                position;


            drawPlayer();


            if (position === 100) {

                message.textContent =
                    "🏆 Congratulations! You won!";

            }

        });

}


// =====================================================
// JUMPING BALL
// =====================================================

function jumpingBall() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            🏀 Jumping Ball
        </h2>

        <div class="game-center">

            <p>
                Press SPACE or click the game to jump.
            </p>

            <h3>
                Score:
                <span id="jumpScore">
                    0
                </span>
            </h3>

            <br>

            <canvas
                id="jumpCanvas"
                class="jump-canvas"
                width="700"
                height="300">
            </canvas>

            <br><br>

            <button
                class="restart"
                onclick="jumpingBall()">
                🔄 Restart
            </button>

        </div>

    `;


    const canvas =
        document.getElementById("jumpCanvas");

    const ctx =
        canvas.getContext("2d");


    let ball = {

        x: 80,

        y: 230,

        velocity: 0

    };


    let obstacles = [];

    let score = 0;

    let frame = 0;

    let running = true;


    function jump() {

        if (ball.y >= 230) {

            ball.velocity = -11;

        }

    }


    canvas.addEventListener(
        "click",
        jump
    );


    document.onkeydown = function(event) {

        if (event.code === "Space") {

            jump();

        }

    };


    function gameLoop() {

        if (!running) {
            return;
        }


        frame++;


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Ground

        ctx.fillStyle =
            "#62d7ff";

        ctx.fillRect(
            0,
            270,
            canvas.width,
            30
        );


        // Gravity

        ball.velocity += 0.5;

        ball.y +=
            ball.velocity;


        if (ball.y > 230) {

            ball.y = 230;

            ball.velocity = 0;

        }


        // Create obstacles

        if (frame % 90 === 0) {

            obstacles.push({

                x: 700,

                y: 240,

                width: 30,

                height: 30

            });

        }


        // Move obstacles

        obstacles.forEach(function(obstacle) {

            obstacle.x -= 6;

        });


        // Remove old obstacles

        obstacles =
            obstacles.filter(
                obstacle =>
                    obstacle.x > -50
            );


        // Draw obstacles

        obstacles.forEach(function(obstacle) {

            ctx.fillStyle =
                "#ff5959";

            ctx.fillRect(

                obstacle.x,

                obstacle.y,

                obstacle.width,

                obstacle.height

            );


            // Collision

            if (

                ball.x + 25 >
                obstacle.x &&

                ball.x <
                obstacle.x +
                obstacle.width &&

                ball.y + 25 >
                obstacle.y &&

                ball.y <
                obstacle.y +
                obstacle.height

            ) {

                running = false;

                alert(
                    "Game Over! Score: " +
                    Math.floor(score / 10)
                );

            }

        });


        // Draw ball

        ctx.font =
            "40px Arial";

        ctx.fillText(
            "🏀",
            ball.x,
            ball.y + 35
        );


        score++;


        document
            .getElementById("jumpScore")
            .textContent =
            Math.floor(score / 10);


        requestAnimationFrame(
            gameLoop
        );

    }


    gameLoop();

}


// =====================================================
// ROCK PAPER SCISSORS
// =====================================================

function rockPaperScissors() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            ✊ Rock Paper Scissors ✌️
        </h2>

        <div class="game-center">

            <h3 id="rpsMessage">
                Choose your move!
            </h3>

            <br>

            <div class="choice-row">

                <button
                    class="choice"
                    onclick="playRPS('Rock')">
                    ✊
                </button>

                <button
                    class="choice"
                    onclick="playRPS('Paper')">
                    ✋
                </button>

                <button
                    class="choice"
                    onclick="playRPS('Scissors')">
                    ✌️
                </button>

            </div>

        </div>

    `;

}


function playRPS(player) {

    const choices = [

        "Rock",
        "Paper",
        "Scissors"

    ];


    const computer =
        choices[
            Math.floor(
                Math.random() *
                choices.length
            )
        ];


    let result;


    if (player === computer) {

        result = "🤝 Draw!";

    }

    else if (

        player === "Rock" &&
        computer === "Scissors"

        ||

        player === "Paper" &&
        computer === "Rock"

        ||

        player === "Scissors" &&
        computer === "Paper"

    ) {

        result = "🎉 You Win!";

    }

    else {

        result = "🤖 Computer Wins!";

    }


    document
        .getElementById("rpsMessage")
        .textContent =

        `You: ${player} | Computer: ${computer} | ${result}`;

}


// =====================================================
// NUMBER GUESS
// =====================================================

function numberGuess() {

    const secret =
        Math.floor(
            Math.random() * 100
        ) + 1;


    let attempts = 0;


    gameArea.innerHTML = `

        <h2 class="game-title">
            🔢 Number Guess
        </h2>

        <div class="game-center">

            <p>
                Guess a number between 1 and 100
            </p>

            <br>

            <input
                type="number"
                id="guessInput"
                class="input-box"
                placeholder="Enter number">

            <button
                class="play-btn"
                id="guessButton">
                Guess
            </button>

            <h3 id="guessMessage">
            </h3>

        </div>

    `;


    document
        .getElementById("guessButton")
        .addEventListener("click", function() {

            const guess =
                Number(
                    document
                    .getElementById(
                        "guessInput"
                    )
                    .value
                );


            attempts++;


            const message =
                document.getElementById(
                    "guessMessage"
                );


            if (guess === secret) {

                message.textContent =
                    `🎉 Correct! You guessed it in ${attempts} attempts.`;

            }

            else if (guess < secret) {

                message.textContent =
                    "⬆️ Try a higher number!";

            }

            else {

                message.textContent =
                    "⬇️ Try a lower number!";

            }

        });

}


// =====================================================
// MEMORY GAME
// =====================================================

function memoryGame() {

    const symbols = [

        "🍎",
        "🍌",
        "🍇",
        "🍉",
        "🐶",
        "🐱",
        "🦊",
        "🐼"

    ];


    const gameCards =
        [...symbols, ...symbols]
        .sort(
            () => Math.random() - 0.5
        );


    gameArea.innerHTML = `

        <h2 class="game-title">
            🧠 Memory Match
        </h2>

        <div
            class="memory-grid"
            id="memoryGrid">
        </div>

        <p
            class="game-center"
            id="memoryMessage">
            Find all matching pairs.
        </p>

    `;


    const grid =
        document.getElementById(
            "memoryGrid"
        );


    let firstCard = null;

    let lock = false;

    let matches = 0;


    gameCards.forEach(function(symbol) {

        const card =
            document.createElement("button");

        card.className =
            "memory-card";

        card.textContent =
            "❓";


        card.addEventListener(
            "click",
            function() {

                if (
                    lock ||
                    card.textContent !== "❓"
                ) {
                    return;
                }


                card.textContent =
                    symbol;


                if (!firstCard) {

                    firstCard = {

                        card: card,

                        symbol: symbol

                    };

                    return;

                }


                lock = true;


                if (
                    firstCard.symbol === symbol
                ) {

                    matches++;

                    firstCard = null;

                    lock = false;


                    if (matches === 8) {

                        document
                            .getElementById(
                                "memoryMessage"
                            )
                            .textContent =
                            "🎉 You found all pairs!";

                    }

                }

                else {

                    setTimeout(
                        function() {

                            card.textContent =
                                "❓";

                            firstCard
                                .card
                                .textContent =
                                "❓";

                            firstCard = null;

                            lock = false;

                        },
                        700
                    );

                }

            }
        );


        grid.appendChild(card);

    });

}


// =====================================================
// CLICK RUSH
// =====================================================

function clickRush() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            ⚡ Click Rush
        </h2>

        <div class="game-center">

            <h1 id="clickScore">
                0
            </h1>

            <p id="clickTimer">
                Time: 10 seconds
            </p>

            <br>

            <button
                id="clickButton"
                class="main-btn">
                CLICK ME!
            </button>

        </div>

    `;


    let score = 0;

    let time = 10;

    let started = false;


    const button =
        document.getElementById(
            "clickButton"
        );


    button.addEventListener(
        "click",
        function() {

            if (!started) {

                started = true;


                const timer =
                    setInterval(
                        function() {

                            time--;


                            document
                                .getElementById(
                                    "clickTimer"
                                )
                                .textContent =
                                "Time: " +
                                time +
                                " seconds";


                            if (time <= 0) {

                                clearInterval(timer);

                                button.disabled =
                                    true;

                                document
                                    .getElementById(
                                        "clickTimer"
                                    )
                                    .textContent =
                                    "🎉 Time Up!";

                            }

                        },
                        1000
                    );

            }


            if (time > 0) {

                score++;


                document
                    .getElementById(
                        "clickScore"
                    )
                    .textContent =
                    score;

            }

        }
    );

}


// =====================================================
// DICE DUEL
// =====================================================

function diceDuel() {

    gameArea.innerHTML = `

        <h2 class="game-title">
            🎲 Dice Duel
        </h2>

        <div class="game-center">

            <h3 id="diceMessage">
                First player to reach 5 points wins!
            </h3>

            <button
                class="dice-btn"
                id="diceRoll">
                🎲
            </button>

            <p id="diceResult">
                Roll the dice!
            </p>

            <h3 id="diceScore">
                You: 0 | Computer: 0
            </h3>

        </div>

    `;


    let playerScore = 0;

    let computerScore = 0;


    document
        .getElementById("diceRoll")
        .addEventListener(
            "click",
            function() {

                const player =
                    Math.floor(
                        Math.random() * 6
                    ) + 1;


                const computer =
                    Math.floor(
                        Math.random() * 6
                    ) + 1;


                if (player > computer) {

                    playerScore++;

                }

                else if (
                    computer > player
                ) {

                    computerScore++;

                }


                document
                    .getElementById(
                        "diceResult"
                    )
                    .textContent =
                    `You rolled ${player} | Computer rolled ${computer}`;


                document
                    .getElementById(
                        "diceScore"
                    )
                    .textContent =
                    `You: ${playerScore} | Computer: ${computerScore}`;


                if (playerScore === 5) {

                    document
                        .getElementById(
                            "diceMessage"
                        )
                        .textContent =
                        "🏆 You Win!";

                }


                if (computerScore === 5) {

                    document
                        .getElementById(
                            "diceMessage"
                        )
                        .textContent =
                        "🤖 Computer Wins!";

                }

            }
        );

}