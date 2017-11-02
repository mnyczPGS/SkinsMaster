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
  //       // drawn = 18;
  //     }
  //     rouletteNumber.set(drawn)
  //     setTimeout(function() {
  //       rouletteLastNumbers.push(drawn)
  //       count = 10;
  //       var color = checkColor(drawn);
  //       summResults(color);
        
  //       setTimeout(() => {
  //         resetAmmount();
  //       }, 1000);

  //     }, 10000);
  //     console.log(drawn)
      
  //   },60000);

  //   setInterval(()=>{
  //     rouletteCountdown.set(count);
  //     if(count>60){
  //       count=0;
  //     } else {
  //       count+=10;
  //     }
  //   },10000)


    
    
    
  //   let lastNums = null;
  //   let ot = firebase.database().ref('rouletteLast');
  //   ot.limitToLast(10).on('value', function (snapshot) {
    
  //   ot.set(snapshot.val());
  //   })
  }

}

function resetAmmount(){
  let ratesRef = firebase.database().ref('rates');

  ratesRef.set({black:null,green:null,red:null})
}

function summResults(color){
  getBetsForColor(color);
}

function getBetsForColor(color){
  console.log(color);
  let bets = firebase.database().ref('rates');
  
    bets.once('value', snap =>{
      bets.child(color).once('value',snap =>{
        snap.forEach((player) => {
          var ammount = player.val().ammount;
          if(color=='red'|| color=='black'){
            ammount = ammount*2;
            console.log('*2',ammount)
          } else {
            ammount = ammount*7;
            console.log('*7',ammount);
          }
          addAmmountForWinner(player.val().id, ammount)
        });
      })
    })
}

function addAmmountForWinner(id, betAmmount){
  ammount = betAmmount;
  let user = firebase.database().ref('steamUsers').child(id);
  user.once('value',snap =>{
    ammount += snap.val().ammount;
    user.set({ammount})
  });
  console.log(ammount)
  

}

function checkColor(drawn) {
  if (drawn == 18) {
    return ('green')
  } if (drawn < 18) {
    if (drawn % 2 == 0) {
      return ('red')
    } else {
      return ('black')
    }
  } else {
    if (drawn % 2 == 0) {
      return ('black')
    } else {
      return ('red')
    }
  }
}