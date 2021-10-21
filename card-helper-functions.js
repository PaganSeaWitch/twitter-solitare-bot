export function getCardFromText(suite, value){
    suite = suite.toLowerCase();
    switch (suite) {
        case "dimaond":
        case "diamonds":
            return getDiamondValueFromText(value);
        case "clubs":
        case "club":
            return getClubValueFromText(value);
        case "hearts":
        case "heart":
            return getHeartValueFromText(value);
        case "spades":
        case "spade":
            return getSpadeValueFromText(value);
        default:
            return "ERROR";
    }
}


function getDiamondValueFromText(value){
    value = value.toLowerCase();
    switch(value){
        case "1":
        case "one":
        case "ace":
            return "🃁";
        case "2":
        case "two":
            return "🃂";
        
        case "3":
        case "three":
            return "🃃";
        
        case "4":
        case "four":
            return "🃄";
        
        case "5":
        case "five":
            return "🃅";
        
        case "6":
        case "six":
            return "🃆";
        
        case "7":
        case "seven":
            return "🃇";
        
        case "8":
        case "eight":
            return "🃈";

        case "9":
        case "nine":
            return "🃉";

        case "10":
        case "ten":
            return "🃊";

        case "jack":
        case "11":
        case "eleven":
            return "🃋";

        case "queen":
        case "12":
        case "tweleve":
            return "🃍";

        case "king":
        case "13":
        case "thirteen":
            return "🃎";
        default:
            return "ERROR";
    }
}


function getSpadeValueFromText(value){
    value = value.toLowerCase();
    switch(value){
        case "1":
        case "one":
        case "ace":
            return "🂡";
        case "2":
        case "two":
            return "🂢";
        
        case "3":
        case "three":
            return "🂣";
        
        case "4":
        case "four":
            return "🂤";
        
        case "5":
        case "five":
            return "🂥";
        
        case "6":
        case "six":
            return "🂦";
        
        case "7":
        case "seven":
            return "🂧";
        
        case "8":
        case "eight":
            return "🂨";

        case "9":
        case "nine":
            return "🂩";

        case "10":
        case "ten":
            return "🂪";

        case "jack":
        case "11":
        case "eleven":
            return "🂫";

        case "queen":
        case "12":
        case "tweleve":
            return "🂭";

        case "king":
        case "13":
        case "thirteen":
            return "🂮";
        default:
            return "ERROR";
    }
}


function getHeartValueFromText(value){
    value = value.toLowerCase();
    switch(value){
        case "1":
        case "one":
        case "ace":
            return "🂱";
        case "2":
        case "two":
            return "🂲";
        
        case "3":
        case "three":
            return "🂳";
        
        case "4":
        case "four":
            return "🂴";
        
        case "5":
        case "five":
            return "🂵";
        
        case "6":
        case "six":
            return "🂶";
        
        case "7":
        case "seven":
            return "🂷";
        
        case "8":
        case "eight":
            return "🂸";

        case "9":
        case "nine":
            return "🂹";

        case "10":
        case "ten":
            return "🂺";

        case "jack":
        case "11":
        case "eleven":
            return "🂻";

        case "queen":
        case "12":
        case "tweleve":
            return "🂽";

        case "king":
        case "13":
        case "thirteen":
            return "🂾";
        default:
            return "ERROR";
    }
}


function getClubValueFromText(value){
    value = value.toLowerCase();
    switch(value){
        case "1":
        case "one":
        case "ace":
            return "🃑";
        case "2":
        case "two":
            return "🃒";
        
        case "3":
        case "three":
            return "🃓";
        
        case "4":
        case "four":
            return "🃔";
        
        case "5":
        case "five":
            return "🃕";
        
        case "6":
        case "six":
            return "🃖";
        
        case "7":
        case "seven":
            return "🃗";
        
        case "8":
        case "eight":
            return "🃘";

        case "9":
        case "nine":
            return "🃙";

        case "10":
        case "ten":
            return "🃚";

        case "jack":
        case "11":
        case "eleven":
            return "🃛";

        case "queen":
        case "12":
        case "tweleve":
            return "🃝";

        case "king":
        case "13":
        case "thirteen":
            return "🃞";
        default:
            return "ERROR";
    }
}