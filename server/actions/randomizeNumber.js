var firebase = require('firebase')
, config = require('../../config');

var count = 10;

function setCountdown(rouletteCountdown){
    let i =count;
    
}

module.exports = {
  randomizeRoulette: function(){
  
  //   var rouletteNumber = firebase.database().ref('roulette');
  //   var rouletteLastNumbers = firebase.database().ref('rouletteLast');
  //   var rouletteCountdown = firebase.database().ref('rouletteCountdown');
  //   setInterval(function(){
  //     var drawn = -1;
  //     var seed = Math.floor(Math.random(new Date()) * 1000000);
  //     var a = seed.toString();
  //     var seed2 = Math.random(seed);
  //     var seed3 = Math.random(seed2);
  //     var seed4 = Math.random(seed3);
  //     while (drawn < 0 || drawn > 36) {
  //       drawn = Math.floor((Math.random(seed4) * 100) + 1);
  //     }
  //     rouletteNumber.set(drawn)
  //     setTimeout(function() {
  //       rouletteLastNumbers.push(drawn)
  //       count = 10;
  //       resetAmmount();
  //     }, 10000);
  //     console.log(drawn)
      
  //   },60000);

  //   setInterval(()=>{
  //     rouletteCountdown.set(count);
  //     if(count>60){
  //       count=0;
  //     } else {
  //       count+=1;
  //     }
  //   },1000)


    
    
    
  //   let lastNums = null;
  //   let ot = firebase.database().ref('rouletteLast');
  //   ot.limitToLast(10).on('value', function (snapshot) {
    
  //   ot.set(snapshot.val());
  //   })
  // }

}

function resetAmmount(){
  let ratesRef = firebase.database().ref('rates');

  ratesRef.set({black:null,green:null,red:null})
}