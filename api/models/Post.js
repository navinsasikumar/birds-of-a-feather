/**
* Post.js
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
    postType: {
      type: 'String',
      enum: ['Regular', 'ID Help', 'Alert', 'Photo'],
      defaultsTo: 'regular'
    },
    user: {
      model: 'user'
    },
    votes: {
      type: 'Integer',
      defaultsTo: 0
    },
    tags: {
      type: 'Array'
    },
    location: {
      type: 'String'
    },
    timeTaken: {
      type: 'Datetime'
    },
    comments: {
      collection: 'comment',
      via: 'post'
    }
  }
};
