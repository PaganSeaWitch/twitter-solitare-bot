import internal from 'stream';
import { ETwitterStreamEvent, TwitterApi } from 'twitter-api-v2';
import { getStringDeck, computeMove } from './solitare-helper-functions.mjs';
// Instanciate with desired auth type (here's Bearer v2 auth)
const client = new TwitterApi(); // (create a client)

const rules = await client.v2.streamRules();

if(rules.data?.length != 2){
    await client.v2.updateStreamRules({
        add:[
            { value: '@accordian-bot AND -is:reply AND -is:retweet AND "start game"', tag: 'startGame'},
            { value: 'is:reply AND -is:retweet AND to:accordian-bot', tag: 'tryMove'},
        ]
})};

const stream = await client.v2.searchStream(
    {
    'tweet.fields' : ['author_id', 'conversation_id', 'text', 'tag', 'in_reply_to_user_id', 'referenced_tweets'],
    expansions : ['referenced_tweets.id.author_id','referenced_tweets.id',],
    }
);


// Enable reconnect feature
stream.autoReconnect = true;

stream.on(ETwitterStreamEvent.Data, async tweet => {
   
    if(tweet.tag === 'startGame'){
        await client.v2.reply(getStringDeck(), tweet.data.id);
    }
    if(tweet.tag === 'tryMove'){
        await computeInput(tweet);
    }
});

async function computeInput(tweet) {
    let input = tweet.data.text;
    if(input.includes('move') && input.includes('to')){
        tryMove(input, tweet);
    }
    else if(input.includes('restart')){
        restartGame(tweet.data.conversation_id, tweet);
    }
    else if(input.includes('new game')){
        await client.v2.reply(getStringDeck(), tweet.data.id);
    }
    else{
        await client.v2.reply(getGameState(tweet, 0), tweet.data.id);
    }
}


async function restartGame(convoID, tweet){
    const conversation = await client.v2.search(`conversation_id:${convoID}`);
    const tweets = await conversation.fetchLast(1000);
    
    const originalReply = tweets.data[tweets.data.length-2];
    await client.v2.reply(originalReply.data.text, tweet.data.id);

}


async function tryMove(input, tweet){
    let cards = getGameState(tweet);
    let moveIndex =  0;
    let toIndex = 0;
    let toString = '';
    let moveString = '';
    if(input.includes('move:') && input.includes('to:')){
        moveIndex = input.indexOf('move:');
        toIndex = input.indexOf('to:'); 
        if(moveIndex > toIndex){
            toString = input.subString(toIndex +3, moveIndex);
            moveString = input.subString(moveIndex + 5);
        }
        else{
            moveString = input.subString(moveIndex + 5, toIndex);
            toString = input.subString(toIndex +3);
        }
    }
    else{
        moveIndex = input.indexOf('move');
        toIndex = input.indexOf('to'); 
        if(moveIndex > toIndex){
            toString = input.subString(toIndex +2, moveIndex);
            moveString = input.subString(moveIndex + 4);
        }
        else{
            moveString = input.subString(moveIndex + 4, toIndex);
            toString = input.subString(toIndex +2);
        }
    }
    toString.trim();
    moveString.trim();
    let toCard = tryGetValidValues(toString);
    let moveCard = tryGetValidValues(moveString);

    await client.v2.reply(computeMove(cards, moveCard, toCard), tweet.data.id);
    
}


function tryGetValidValues(string){
    let tempArray = [];
    if(string.includes('|')){
        tempArray = string.split('|');
    }
    else if(string.includes(' ')){
        tempArray = string.split(' ');

    }
    else if(string.includes(',')){
        tempArray = string.split(',');

    }
    else if(string.includes('.')){
        tempArray = string.split('.');

    }
    else if(string.includes(':')){
        tempArray = string.split(':');
    }
    else{
        tempArray = string.split();

    }
    return {suite: tempArray[0], value: tempArray[1]}

}


function getTweetIdFromReferecedTweets(tweetedTo, index){
    return tweetedTo[index].id;
}


async function getGameState(tweet){

    const id = getTweetRepliedTo(tweet.data.referenced_tweets, 0);
    const gameStateTweet = await client.v2.singleTweet(id, {
        'tweet.fields' : ['text']
      });
    return gameStateTweet.text;
}