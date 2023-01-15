// //asyn c function pattern
// function myAsyncFunc(){
//     //return a new promise
//     return new Promise((resolve, reject) =>{
//         setTimeout(resolve(), 3000)
//     })
// }

// // myAsyncFunc
// //     .then(() => console.log('alld done'))
// //     .catch(() => console.log('er'))

// const h1 = document.querySelector('h1');
// // setTimeout(function() {
// //     h1.style.color = 'red'
// //     setTimeout(() => {
// //         h1.style.color = 'orange'
// //     })
// // })

// function changeColor(el, color){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             el.style.color = color;
//             resolve()
//         }, 1000)
//     })
// }

// changeColor(h1, 'teal')

// function mockAjaxRequest(){
//     return new Promise(function (resolve, reject){
//         let probSuccess = 0.5;
//         let requestTime = 1000;
//         setTimeout(function() {
//             let randomNum = Math.random();
//             if(randomNum < probSuccess){
//                 let data = "here's your data";
//                 resolve(data);
//             }
//                 else{
//                     reject('sorry, your req fail');
//                 }
//         }, requestTime);
//     })
// }
// mockAjaxRequest()
//     .then(data => {
//         console.log(data);
//         return mockAjaxRequest()
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => console.log(err))



//promise.all
// let fourPokemonPromises = [];

// for(let i = 1; i <5; i++){
//     fourPokemonPromises.push(
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     );
//     Promise.all(fourPokemonPromises)
//         .then(pokemonArr => {
//            for (res of pokemonArr){
//                console.log(res.data.name)
//            }
//         })
//         .catch(err => console.log(err));
// }

// let fourPokemonPromises = [];

// for(let i = 1; i <5; i++){
//     fourPokemonPromises.push(
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     );
//     Promise.race(fourPokemonPromises)
//         .then(res => {
//             console.log(`${res.data.name} won the race!`)
//         })
//         .catch(err => console.log(err));
        
// }


//part 1: number facts
// let numberFactPromise = [];
// for (let i = 1; i <5 ;i++){
//     numberFactPromise.push(
//         axios.get(`https://numbersapi.com/${i}?json`)
//     );
//     Promise.all(numberFactPromise)
//         .then(resp =>{
//             for(response of resp){
//                 console.log(response)
//             }
//         })
//         .catch(err => console.log(err));
// }

//part 2: deck of cards
$.getJSON("https://deckofcardsapi.com/api/deck/new/draw")
    .then(data => {let {suit, value} = data.cards[0];
    console.log(`${value} of ${suit}`)
    })
    .then(data => {let {s, v} = data.cards[1];
        console.log(`${v} of ${s}`);
    })
    

//get a new card from the same deck

//part 3:
let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
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
