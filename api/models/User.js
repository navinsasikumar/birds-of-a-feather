/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model
* ``works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: 'String'
    },
    email: {
      type: 'String',
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: 'String',
      required: true
    },
    posts: {
      collection: 'post',
      via: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'user'
    }
  },
  beforeCreate: function(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
          callback(null, user);
        }
      });
    });
  }
};

