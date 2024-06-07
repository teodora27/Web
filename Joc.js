window.onload = function() {
    const symbols = ["😀", "😎", "🤖", "🐱", "🌟", "🎉", "🍕", "❤️"];
    const allCards = symbols.concat(symbols); 
    const cards = allCards.sort(() => 0.5 - Math.random());
    
    const gameBoard = document.getElementById('game-board');
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('i', index);
        card.addEventListener('click', () => flipCard(index));
        gameBoard.appendChild(card);
    });
    
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let currentUser = null;

    function flipCard(cardIndex) {
        const card = document.querySelector(`[i='${cardIndex}']`);
        if (flippedCards.length < 2 && !flippedCards.includes(cardIndex) && !card.classList.contains('matched')) {
            card.innerText = cards[cardIndex];
            card.classList.add('flipped');
            flippedCards.push(cardIndex);
            moves++;
            updateMovesCounter();
            
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (cards[card1] === cards[card2]) {
            document.querySelector(`[i='${card1}']`).classList.add('matched');
            document.querySelector(`[i='${card2}']`).classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === symbols.length) {
                alert(`Bravo! ai Castigat in ${moves} miscari!`);
                if (currentUser) {
                    updateHighScore(currentUser.username, moves);
                }
            }
        } else {
            const cardElement1 = document.querySelector(`[i='${card1}']`);
            const cardElement2 = document.querySelector(`[i='${card2}']`);
            cardElement1.innerText = "";
            cardElement1.classList.remove('flipped');
            cardElement2.innerText = "";
            cardElement2.classList.remove('flipped');
        }
        flippedCards = [];
    }

    function updateMovesCounter() {
        document.getElementById('moves-counter').innerText = moves;
    }

    const header = document.querySelector('h3');
    header.style.color = 'white';
    header.style.fontSize = '32px';
    header.style.textAlign = 'center';
    header.style.position = 'fixed';
    header.style.top = '20px';
    header.style.left = '50%';
    header.style.transform = 'translateX(-50%)';
    header.style.fontFamily = 'Nosifer, cursive';
    header.innerText = 'Începe jocul!';

    function changeStyle() {
        const colors = ['', '#338062', '#af200e', '#af0e4c', '#8f0eaf', '#0e5caf']; 
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; 

        const randomPositionX = Math.random() * 20 - 10; 
        const randomPositionY = Math.random() * 20 - 10; 

        header.style.transition = 'color 0.5s, font-size 0.5s, transform 1s';
        header.style.color = randomColor;
        header.style.transform = 'translateX(-50%) translateY(' + randomPositionY + 'px) translateX(' + randomPositionX + 'px)';
    }

    setInterval(changeStyle, 200);

    window.login = function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('usersJoc.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    alert('Logare reușită!');
                    currentUser = user;
                    displayUserInfo(user);
                } else {
                    alert('Utilizator sau parolă greșită!');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function displayUserInfo(user) {
        document.getElementById('login-form').style.display = 'none';
        const userInfo = document.getElementById('user-info');
        document.getElementById('user-photo').src = user.photo;
        document.getElementById('user-name').innerText = user.username;
        const highscore = getHighScore(user.username);
        document.getElementById('high-score').innerText = highscore !== null ? `Highscore: ${highscore}` : 'No highscore yet';
        userInfo.style.display = 'flex';

        document.getElementById('logout-button').onclick = logout;
    }

    function logout() {
        document.getElementById('login-form').style.display = 'block';
        const userInfo = document.getElementById('user-info');
        userInfo.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        currentUser = null;
    }

    function updateHighScore(username, newScore) {
        const highscore = getHighScore(username);
        if (highscore === null || newScore < highscore) {
            localStorage.setItem(username, newScore);
            document.getElementById('high-score').innerText = `Highscore: ${newScore}`;
        }
    }

    function getHighScore(username) {
        return localStorage.getItem(username);
    }

    document.getElementById('login-button').onclick = login;
};
