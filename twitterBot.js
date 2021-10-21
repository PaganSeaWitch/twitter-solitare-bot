import { ETwitterStreamEvent, TweetStream, TwitterApi, ETwitterApiError, TweetSearchV2StreamParams , meAsUser } from 'twitter-api-v2';
// Instanciate with desired auth type (here's Bearer v2 auth)
const client = new TwitterApi(); // (create a client)

const rules = await client.v2.streamRules();

if(rules.data?.length != 2){
    await client.v2.updateStreamRules({
        add:[
            { value: '@solitare-bot AND -is:reply AND -is:retweet AND "start game"', tag: 'startGame'},
            { value: '@solitare-bot AND is:reply AND -is:retweet AND to:soliatre-bot AND "move"', tag: 'tryMove'},
        ]
})};

const stream = await client.v2.searchStream(
    {
    'tweet.fields' : ['author_id', 'conversation_id', 'text', 'in_reply_to_user_id', 'referenced_tweets'],
    expansions : ['referenced_tweets.id.author_id','referenced_tweets.id',],
    }
    );


// Enable reconnect feature
stream.autoReconnect = true;

stream.on(ETwitterStreamEvent.Data, async tweet => {
   
    if(tweet.tag === 'startGame'){
        await client.v2.reply('This will start the GAME!', tweet.data.id);

    }
    if(tweet.tag === 'tryMove'){
        await client.v2.reply('This will try a move in the game!', tweet.data.id);

    }
    // Reply to tweet
});