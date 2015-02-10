/* global Post: true */
/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    'use strict';
    var params = req.body;

    Post.create(params).exec(function createCB(err, post) {
      if (err) {
          return res.json(err);
      }
      return res.json({
        notice: 'Created post with content: ' + post.content
      });
    });
  },
  destroy: function(req, res) {
    'use strict';
    var id = req.params.id;

    Post.destroy(id).exec(function(err, post) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        notice: 'Post ' + post.content + 'deleted'
      });
    });
  },
  listAll: function(req, res) {
    'use strict';
    Post.find(function(err, posts) {
      res.json({
        posts: posts
      });
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
    var id = req.params.id;
    var params = req.body;

    Post.update({id: id}, params).exec(function(err, post) {
      if (err) {
        return res.json(err);
      }
      return res.json(post);
    });
  }

};

