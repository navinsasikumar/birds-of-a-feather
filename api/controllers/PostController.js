/* global Post: true */
/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var querystring = require('querystring');

function getPrevQuery(query) {
  'use strict';
  query.maxId = query.sinceId;
  delete query.sinceId;
  var prevQuery = '?' + querystring.stringify(query);
  return prevQuery;
}

function getSearchMetadata(posts, query) {
  'use strict';
  if (posts.length === 0) {
    var nextQuery = '?' + querystring.stringify(query);
    var prevQuery = getPrevQuery(query);

    return {
      next: nextQuery,
      prev: prevQuery
    };
  }
  var maxId = posts[0].id;
  var sinceId = posts[posts.length -1].id;
  var count = query.count;

  return {
    maxId: maxId,
    sinceId: sinceId,
    next: '?sinceId=' + maxId + '&count=' + count,
    prev: '?maxId=' + (sinceId - 1) + '&count=' + count
  };
}

function makeWhereConditions(sinceId, maxId) {
  'use strict';
  var where = {};
  if (sinceId !== '') {
    if (typeof where.id !== 'undefined') {
      where.id['>'] = sinceId;
    } else {
      where.id = {'>': sinceId};
    }
  }
  if (maxId !== '') {
    if (typeof where.id !== 'undefined') {
      where.id['<='] = maxId;
    } else {
      where.id = {'<=': maxId};
    }
  }
  return where;
}

function removeUneditable(params, fields) {
  'use strict';
  for (var i = 0, len = fields.length; i < len; i++) {
    if (typeof params[fields[i]] !== 'undefined') {
      delete params[fields[i]];
    }
  }
  return params;
}

function changeVote(req, res, value) {
    'use strict';
    var userid = parseInt(req.params.userid);
    var postid = req.params.postid;

    try {
      Post.query('BEGIN', function(err) {
        if (err) {
          throw new Error(err);
        }
        Post.findOne({id: postid, user: userid})
          .exec(function(err, post) {
            if (err) {
              throw new Error(err);
            } else if (typeof post === 'undefined') {
              return res.json({notice: 'No such post!'});
            } else {
              post.votes += value;
              post.save(function(err) {
                if (err) {
                  throw new Error(err);
                }
                Post.query('COMMIT', function (err) {
                  if (err) {
                    throw new Error(err);
                  }
                  res.json(post);
                });
              });
            }
        });
      });
    } catch(e) {
      Post.query('ROLLBACK', function (err) {
        if (err) {
          return res.serverError(err);
        } else {
          return res.serverError(e);
        }
      });
    }

}

module.exports = {
  create: function(req, res) {
    'use strict';
    var params = req.body;
    params.user = parseInt(req.params.userid);

    Post.create(params).exec(function createCB(err, post) {
      if (err) {
          return res.json(err);
      }
      Post.findOneById(post.id)
        .populate('user')
        .exec(function(err, post) {
          if (err) {
            return res.json(err);
          }
          return res.json({post: post});
        })
    });
  },

  destroy: function(req, res) {
    'use strict';
    var postId = req.params.postId;
    var userid = parseInt(req.params.userid);

    Post.destroy({id: postId, user: userid}).exec(function(err) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        notice: 'Post ' + postId  + ' deleted'
      });
    });
  },

  list: function(req, res) {
    'use strict';

    req.query.count = req.query.count || 25;
    var sinceId = req.query.sinceId || '';
    var maxId = req.query.maxId || '';

    var where = makeWhereConditions(sinceId, maxId);

    Post.find(
      {
        where: where,
        sort: 'createdAt DESC',
        limit: req.query.count
      })
    .populate('user')
    .populate('comments')
    .then(function(posts) {
      var commentUsersList = _.map(posts, function(post) {
        return _.pluck(post.comments, 'user');
      });
      commentUsersList = _.flatten(commentUsersList, true);
      var commentUsers = User.find({
        id: commentUsersList
      })
      .then(function(commentUsers) {
        return commentUsers;
      });
      return [posts, commentUsers];
    })
    .spread(function(posts, commentUsers) {
      commentUsers = _.indexBy(commentUsers, 'id');
      posts = _.map(posts, function(post) {
        post.comments = _.map(post.comments, function(comment) {
          comment.user = {name: commentUsers[comment.user].name, id: comment.user};
          return comment;
        });
        return post;
      });
      res.json({
        posts: posts,
        searchMetadata: getSearchMetadata(posts, req.query)
      });
    })
    .catch(function(err) {
      if (err) {
        return res.serverError(err);
      }
    });
  },

  find: function(req, res) {
    'use strict';
    var id = req.params.id;

    Post.findById(id).exec(function(err, post) {
      if (err) {
        return res.json(err);
      }
      return res.json(post);
    });
  },

  update: function(req, res) {
    'use strict';
    var postId = req.params.postId;
    var userId = parseInt(req.params.userid);
    var params = req.body;
    params = removeUneditable(params, ['votes', 'user', 'id']);

    Post.update({id: postId, user: userId}, params).exec(function(err, post) {
      if (err) {
        return res.json(err);
      }
      return res.json(post);
    });
  },

  findOnePost: function(req, res) {
    'use strict';
    var userid = parseInt(req.params.userid);
    var postid = req.params.postid;

    Post.findOneById(postid)
      .populate('user')
      .populate('comments')
      .then(function(post) {
          var commentUsers = User.find({
              id: _.pluck(post.comments, 'user')
            })
            .then(function(commentUsers) {
              return commentUsers;
            });
          return [post, commentUsers];
        })
        .spread(function(post, commentUsers) {
          commentUsers = _.indexBy(commentUsers, 'id');
          post.comments = _.map(post.comments, function(comment) {
            comment.user = commentUsers[comment.user].name;
            return comment;
          });
          res.json(post);
        })
        .catch(function(err) {
          if (err) {
            return res.serverError(err);
          }
    });
  },

  upVote: function(req, res) {
    'use strict';
    changeVote(req, res, 1);
  },

  downVote: function(req, res) {
    'use strict';
    changeVote(req, res, -1);
  }

};

