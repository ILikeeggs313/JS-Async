// // let planet;
// // $.getJSON('https://swapi.co/api/planets/1/', resp =>{
// //     planet = resp;
// //     console.log(planet);
// //     $.getJSON(planet.residents[0], resp => {
// //         resident = resp;
// //         console.log(resident);
    
// //         $.getJSON(reisdent.films[0], resp => {
// //             film = resp;
// //             console.log(film);
// //         });
// //     });
// // });
// // 1+ 1;


// let url = "https:/swapi.dev/api/planets/1"

// // console.log(ourFirstPromise)
// //we can use then here
// // ourFirstPromise.then(data => console.log('resolved!!!!!', data));
// // ourFirstPromise.catch(err => console.log('rejected!!!!!', err));



// //this is how promise chaining works
// // axios.get(url)
// //     .then(res => console.log(res.data.residents[0]))
// //     .catch(err => console.log('REJECTED!', err));

// axios.get(url)
//     .then(res => {
//         console.log(res.data)
//         //we first make a promise, if it runs, we get the res.data,
//         //then we make another promise, if it doesn't run, we get catch
//         //but if it runs we get the data of residents[0]
//         axios.get(res.data.residents[0])
//     })
//     .then(res => {
//         console.log(res.data)
//     })

//     .then
//     .catch(err => console.log('rejected', err))

//     let baseURL = "https://pokeapi.co/api/v2/pokemon";

//     axios
//         .get('${baseURL}/1/')
//         .then(p1 => {
//             console.log(`The first pokemon is ${p1.data.name}`);
//             return axios.get(`${baseURL}/2/`);
//         })
//         .then(p2 => {
//             console.log(`The first pokemon is ${p2.data.name}`);
//             return axios.get(`${baseURL}/3/`);
//         })
//         .catch(err => {
//             console.log(`Oops, there was a problem: (${err})`);
//         })


// //asynchronous function pattern

// const request = new XMLHttpRequest();

// request.onload = function() {
//     if(request.readyState !== 4) return;
// }

// //check status code
// if(request.status >= 200 && request.status < 300){
//     console.log("It worked!", request)
    
// } else{
//     console.log("err!")
// }

// request.onerror = function handleErr(){
//     console.log('network error')
//     request = null;
// };

// request.open('GET', 'https://swapi.dev/api/planets/1');

// //send it
// request.send();

//but if we use axios

function get(url){
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onload = function(){
            if(request.readyState !== 4) return;
        }

        //check status code
        if(request.status >= 200 && request.status < 300){
            resolve(request.response)

        }  else{
            reject(request.status)
        }
        request.onerror = function handleError(){
            request = null;
            reject('network error')
        };
        request.open('get', url);
        request.send();
    })
}
get('https://swapi.dev/api/planets/1')
    .then(res => console.log(res))
    .catch(err => console.log(err))

    