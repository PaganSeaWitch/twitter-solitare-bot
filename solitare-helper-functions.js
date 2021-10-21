const suites = ['diamond', 'club', 'heart', 'spade'];
import { getCardFromText } from "./card-helper-functions";
export function getRandomCard(cards){
    const index = getRandomInt(0, card.length);

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
            deckString = deckString + '|\n'
        }
        for(let i = 0; i < 13; i++){
            let card = getCardFromText(getRandomCard(cards));
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