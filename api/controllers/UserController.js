/* global User: true */
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    'use strict';
    var params = req.body;

    User.create(params).exec(function createCB(err, user) {
      if (err) {
          return res.json(err);
      }
      return res.json({
        notice: 'Created user with email: ' + user.email
      });
    });
  },
  destroy: function(req, res) {
    'use strict';
    var id = req.params.id;

    User.destroy(id).exec(function(err, user) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        notice: 'User ' + user.email + 'deleted'
      });
    });
  },
  listAll: function(req, res) {
    'use strict';
    User.find(function(err, users) {
      res.json({
        users: users
      });
    });
  },
  find: function(req, res) {
    'use strict';
    var id = req.params.id;

    User.findById(id).exec(function(err, user) {
      if (err) {
        return res.json(err);
      }
      return res.json(user);
    });
  },
  update: function(req, res) {
    'use strict';
    var id = req.params.id;
    var params = req.body;

    User.update({id: id}, params).exec(function(err, user) {
      if (err) {
        return res.json(err);
      }
      return res.json(user);
    });
  },
  findPosts: function(req, res) {
    'use strict';
    var userid = req.params.userid;

    User.findOneById(userid)
      .populate('posts')
      .exec(function(err, user) {
        if (err) {
          return res.json(err);
        }
        return res.json(user.posts);
    });
  }
};

