$(document).ready(function() {
    $('.hit').on('click', function() {
        addCard();
        checkForLoss();
    });

    $('.dealerChips').text('Dealer Chips: ' + playerArr[playerArr.length - 1].chips);
    $('.playerChips').text('Simon\'s Chips: ' + playerArr[playerTurn_i].chips);

    $('.bet').on('click', function() {
        let bet = $('.chipInput').val();
        console.log(playerArr[playerTurn_i]);

        if (playerArr[playerTurn_i].chips >= bet && bet > 0 && bet !== '') {
            playerArr[playerTurn_i].bet = Number(bet);
            playerArr[playerTurn_i].chips = playerArr[playerTurn_i].chips - bet;
            $('.cardContainer .flipper').addClass('flip');
            $('.playerChips').text('Simon\'s Chips: ' + playerArr[playerTurn_i].chips);
        }
    });

    $('.stay').on('click', function() {
        checkForLoss();
        $($('.cardContainer')[playerTurn_i]);

        if (playerTurn_i !== playerArr - 1) {
            playerTurn_i++;
        }

        if (playerArr[playerTurn_i].name === 'Dealer') {
            dealersTurn();
        }
    });
})
    var playerArr = [{name: "Dealer", cards: [], chips: 10000}];
    var playerTurn_i = 0;

// Constructor function for making decks of cards
    function CreateDeck() {
        this.deckArray = [];
        this.usedDeckArray = [];
        this.faceCards = ['J', 'Q', 'K', 'A'];
        this.newNums = (suit) => {
            for (let i=2; i<11; i++) {
                let cardObj = {val: i, suit: suit};
                this.deckArray.push(cardObj);
            }
            this.newFaceCards(suit);
        }
        this.newFaceCards = (suit) => {
            for (let i=0; i<this.faceCards.length; i++) {
                let faceCardObj = {val: this.faceCards[i], suit: suit};
                this.deckArray.push(faceCardObj);
            }
        }
        this.makeCards = () => {
            this.newNums('hearts');
            this.newNums('diamonds');
            this.newNums('clubs');
            this.newNums('spades');
            this.shuffleDeck();
        }
        this.shuffleDeck = function() {
            for (let shuffleCount = 0; shuffleCount < 100; shuffleCount++) {
                for (let i=0; i<this.deckArray.length; i++) {
                    let randomIndex = Math.floor(Math.random() * this.deckArray.length);
                    let temp = this.deckArray[i];
                    this.deckArray[i] = this.deckArray[randomIndex];
                    this.deckArray[randomIndex] = temp;
                }
            }
            addPlayers('Simon');

            dealCards(2);
        }
    }

    function addPlayers(name) {
        this.playerArr.unshift({name: name, cards: [], chips: 100});
        createCardContainer();
    }
    function createCardContainer() {
        var newDiv = $('<div>').addClass('cardContainer');
        $('.playerContainer').append(newDiv);
    }

    function dealCards(num) {
        let cardCount = 0;

        for (let player_i = 0; player_i < playerArr.length; player_i++) {
            while (cardCount < num) {
                playerArr[player_i].cards.push(deck.deckArray[0]);
                cardCount++;
                deck.usedDeckArray.push(deck.deckArray[0]);
                deck.deckArray.splice(0,1);
            }
            cardCount = 0;
        }
        //prevents cards from being rendered on screen again
        renderCardsOnDOM($('.cardContainer img').length, '');
        renderDealerCardsOnDOM($('.dealerContainer img').length, '');
    }
    function addCard() {
        playerArr[playerTurn_i].cards.push(deck.deckArray[0]);
        deck.usedDeckArray.push(deck.deckArray[0]);
        deck.deckArray.splice(0,1);

        if (playerArr[playerTurn_i].name !== 'Dealer') {
            renderCardsOnDOM($('.cardContainer img').length, 'flip');
        } else {
            renderDealerCardsOnDOM($('.dealerContainer img').length, 'flip');
        }

    }

    function renderDealerCardsOnDOM(instantiate, addClass) {
        for (let card_i = instantiate; card_i < playerArr[playerTurn_i].cards.length; card_i++) {


            let flipContainer = $('<div>').addClass('flip-container');
            let flipper = $('<div>').addClass('flipper '+addClass+'');
            let front = $('<div>').addClass('front');
            let back = $('<div>').addClass('back');
            let backImg = $('<img>').attr('src', 'images/'+playerArr[playerArr.length - 1].cards[card_i].val+playerArr[playerArr.length - 1].cards[card_i].suit+'.png');
            let frontImg = $('<div>').addClass('frontImg');

            $(front).append(frontImg);
            $(back).append(backImg);
            $(flipper).append(front, back);
            $(flipContainer).append(flipper);

            $('.dealerContainer').append(flipContainer);
        }
    }

    function renderCardsOnDOM(instantiate, addClass) {
        if (instantiate === undefined) {
            instantiate = 0;
        }

        for (let card_i = instantiate; card_i < playerArr[playerTurn_i].cards.length; card_i++) {
            let flipContainer = $('<div>').addClass('flip-container');
            let flipper = $('<div>').addClass('flipper '+addClass+'');
            let front = $('<div>').addClass('front');
            let back = $('<div>').addClass('back');
            let backImg = $('<img>').attr('src', 'images/'+playerArr[playerTurn_i].cards[card_i].val+playerArr[playerTurn_i].cards[card_i].suit+'.png');
            let frontImg = $('<div>').addClass('frontImg');

            $(front).append(frontImg)
            $(back).append(backImg);
            $(flipper).append(front, back);

            $(flipContainer).append(flipper);


            $($('.cardContainer')[playerTurn_i]).append(flipContainer);
        }

    }

    function checkForLoss() {
        var valCount = 0;
        for (let card_i = 0; card_i < playerArr[playerTurn_i].cards.length; card_i++) {
            switch(playerArr[playerTurn_i].cards[card_i].val) {
                case 'A':
                    valCount += 1;
                    break;
                case 'K':
                case 'Q':
                case 'J':
                    valCount += 10;
                    break;
                default:
                    valCount += playerArr[playerTurn_i].cards[card_i].val;
                    break;
            }
        }
        assignScore(valCount);

    }
    function assignScore(valCount) {
        if (valCount > 21) {
            playerArr[playerTurn_i].score = '-1';
            $($('.cardContainer')[playerTurn_i]);
            console.log('Bust!!!');
            if (playerTurn_i !== playerArr.length - 1) {
                playerTurn_i++;
            }
            if (playerArr[playerTurn_i].name === 'Dealer' && playerArr[playerArr.length  - 1].score !== '-1') {
                dealersTurn();
            }
        } else {
            playerArr[playerTurn_i].score = valCount;
            console.log(playerArr[playerTurn_i]);
        }
    }
    function dealersTurn() {
        $('.dealerContainer .flipper').addClass('flip');
        checkForLoss();
        while(playerArr[playerTurn_i].score < 17 && playerArr[playerTurn_i].score !== '-1') {
            $('.hit').click();
            console.log('click');
        }
        console.log('last');
        console.log('final score obj', playerArr[0], playerArr[1]);
        winCheck();
    }
    function winCheck() {
        for (let i = 0; i<playerArr.length - 1; i++) {
            if (playerArr[i].score === playerArr[playerArr.length - 1].score) {
                console.log('Loss');
                playerArr[playerArr.length - 1].chips += playerArr[i].bet;
                $('.dealerChips').text('Dealer Chips: ' + playerArr[playerArr.length - 1].chips);
            }
            else if (playerArr[i].score > playerArr[playerArr.length - 1].score) {
                console.log('WIN');
                playerArr[i].chips += (playerArr[i].bet * 2);
                $('.playerChips').text('Simon\'s Chips: ' + playerArr[i].chips);
            }
        }

        const newRoundTimeout = setTimeout(function() {
            $('.cardContainer').empty();
            $('.dealerContainer').empty();
            playerTurn_i = 0;
            for (let i=0; i<playerArr.length; i++) {
                playerArr[i].score = null;
                playerArr[i].cards = [];
                playerArr[i].bet = null;
            }
            dealCards(2);
            clearTimeout(newRoundTimeout);
        }, 2000);

    }

    var deck = new CreateDeck();
    deck.makeCards();


