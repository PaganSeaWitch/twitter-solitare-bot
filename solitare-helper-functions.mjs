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
            deckString = deckString + ' \n'
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


export function computeMove(cards, card1, card2){

    const isValid = checkIfMoveIsValid(cards, card1, card2);
    if(isValid){
        let cardString1 = getCardFromText(card1.suite, card1.value);
        let cardString2 = getCardFromText(card2.suite, card2.value);
        let index1 = cards.indexOf(cardString1);
        if(index1 + 2 >= cards.length){
            cards = cards.substring(0, index1);
        }
        else{
            let part1 = cards.substring(0, index1);
            let part2 = cards.substring(index1+3);
            cards = part1 + part2;
        }
        cards = cards.replace(cardString2, cardString1);
        
        
    }
    return cards;
}


function checkIfMoveIsValid(cards, card1, card2){
    let cardString1 = getCardFromText(card1.suite, card1.value);
    let cardString2 = getCardFromText(card2.suite, card2.value);

    if(cardString1 === 'ERROR' || cardString2 === 'ERROR'){
        return false;
    }
    if(cardString1 === cardString2){
        return false;
    }
    if(cards.includes(cardString1) === false || cards.includes(cardString2) === false){
        return false;
    }
    let spaceBetween = countBetweenTwoCards(cards, cardString1, cardString2);

    if(spaceBetween !== 1 && spaceBetween !== 3){
        return false;
    }

    if(card1.suite !== card2.suite){
        if(card1.value === card2.value){
            return true;
        }
        return false;
    }
    return true;

}


function countBetweenTwoCards(cards, card1, card2){
    
    
    let index1 = cards.indexOf(card1);

    let index2 = cards.indexOf(card2);
    if(index1 < index2){
        return -1;
    }
    let cardsBetween = 0;

    while(index1 != index2){
        index1--;
        if(cards.charCodeAt(index1) === 32 || cards.charCodeAt(index1) === 10){
            cardsBetween++;
        }
    }
    return cardsBetween;
}


