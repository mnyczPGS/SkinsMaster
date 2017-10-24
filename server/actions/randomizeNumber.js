var firebase = require('firebase')
, config = require('../../config');

module.exports = {
  randomizeRoulette: function(){
    

    
    var rouletteNumber = firebase.database().ref('roulette');
    var rouletteLastNumbers = firebase.database().ref('rouletteLast');
    setInterval(function(){
      var drawn = -1;
      var seed = Math.floor(Math.random(new Date()) * 1000000);
      var a = seed.toString();
      var seed2 = Math.random(seed);
      var seed3 = Math.random(seed2);
      var seed4 = Math.random(seed3);
      while (drawn < 0 || drawn > 36) {
        drawn = Math.floor((Math.random(seed4) * 100) + 1);
      }
      rouletteNumber.set(drawn)
      rouletteLastNumbers.push(drawn)
      console.log(drawn)
    },12000)
  }
}