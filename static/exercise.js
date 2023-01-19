//part 1: nubmer facts
let number = Math.floor(Math.random() * (42 - 0) + 0);
const generateRandomNums = (min, max, times) => {
    const randoms = [];
    for(let i = 0; i < times; i++){
        randoms.push(Math.floor(Math.random() * (max - min) + min))

    }
    return randoms;
}

//get a fact about a favorite number

const numberFacts = {
    async  getAFact(){
        let resp = await axios.get(`http://numbersapi.com/${number}?text`)
        console.log(resp)
    },
    //get facts about multiple numbers
    async  getMultipleFacts(){
        let resp = await axios.get(`http://numbersapi.com/${generateRandomNums(20,10,5)}?json`)
        console.log(resp)
    },
    //get 4 facts on a favorite number
    //make an array with a length of 4, then push 
    async get4Facts(){
        let resp = await Promise.all(
            Array.from({ length: 4 }, () => $.getJSON(`http://numbersapi.com/${number}?json`))
          );
        // console.log(resp)
        // append the fact
        resp.forEach(data => {
            $('body').append(`<h4> ${data.text}</h4>`)
        });
    }
}



//part 2
let baseURL = 'https://deckofcardsapi.com/api/';

//request a single card from a newly shuffled deck.
//first, we need a deck

const cardsAPI = {
    async  getDeck() {
        let resp = await axios.get(`${baseURL}/new`)
        this.deckID = resp.data.deck_id;
    },
    //we start by shuffling the cards
    async  shuffle(){
        let resp = await axios.get(`${baseURL}/deck/${this.deckID}/shuffle/`)
        console.log(resp)
    },


    //then, draw a card
    async  drawCard(){
        let resp = await axios.get(`${baseURL}/deck/${this.deckID}/draw/?count=1`,
        function(data) {
            let {s,v} = data.cards[0];
            console.log(`${s} of ${v}`)
        })
        console.log(resp)
    },
    //get another card
    async drawAnotherCard(){
        let resp = await axios.get(`${baseURL}/deck/${this.deckID}/draw/?count=1`,
        (data) => {
            let {s,v} = data.cards[0];
            console.log(`${s} of ${v}`)
        })
        console.log(resp)
    }

}
cardsAPI.getDeck()

//make an HTML page to draw cards
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');
    
  $.getJSON(`${baseURL}/new/shuffle/`, function(data) {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });



