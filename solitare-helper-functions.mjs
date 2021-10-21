const suites = ['diamond', 'club', 'heart', 'spade'];
import { getCardFromText } from "./card-helper-functions.mjs";
export function getRandomCard(cards){
    const index = getRandomInt(0, cards.length);

    let card = cards[index];
    cards.splice(index, 1);
    return card;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getStandardDeckOfCards(){
    const tempArray = []
    for(let i = 1; i < 14; i++){
        tempArray.push({suite:suites[0], value: i});
    }
    for(let i = 1; i < 14; i++){
        tempArray.push({suite:suites[1], value: i});
    }
    for(let i = 1; i < 14; i++){
        tempArray.push({suite:suites[2], value: i});
    }
    for(let i = 1; i < 14; i++){
        tempArray.push({suite:suites[3], value: i});
    }
    return tempArray;
}

export function getStringDeck(){
    const cards = getStandardDeckOfCards();
    let deckString = '';
    for(let j = 0; j < 4; j++){
        if(j != 0){
            deckString = deckString + '\n'
        }
        for(let i = 0; i < 13; i++){
            const cardObject = getRandomCard(cards);
            let card = getCardFromText(cardObject.suite, cardObject.value);
            if(i == 0){
                deckString = deckString + card;
            }
            else{
                deckString = deckString + ' ' + card;
            }
        }
    }
    
    return deckString;

}

export function countBetweenTwoCards(cards, card1, card2){
    if(card1 === 'ERROR' || card2 === 'ERROR'){
        return -1;
    }
    if(cards.includes(card1) === false || cards.includes(card2) === false){
        return -1;
    }
    let index1 = cards.indexOf(card1);
    let index2 = cards.indexOf(card2);
    if(index1 > index2){
        return -1;
    }
    let cardsBetween = 0;
    while(index1 != index2){
        index1++;
        if(cards.charAt(index1) !== ' '){
            cardsBetween++;
        }
    }
    return cardsBetween;
}

const deck = getStringDeck();
console.log(deck);
console.log(countBetweenTwoCards(deck, '🂵','🃅'));