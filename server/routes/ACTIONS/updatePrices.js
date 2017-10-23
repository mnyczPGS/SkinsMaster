var firebase = require('firebase')
  , config = require('../../../config');

module.exports = {
  updatePrice: function (name) {
    let ref = firebase.database().ref('items').child(name);
    return ref.once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      
      return exists;
    });
  }
};