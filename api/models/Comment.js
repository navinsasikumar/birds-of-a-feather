/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works
* and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    content: {
      type: 'String'
    },
    post: {
      model: 'post',
      required: true
    },
    user: {
      model: 'user',
      required: true
    },
    votes: {
      type: 'Integer',
      defaultsTo: 0
    }
  }
};

