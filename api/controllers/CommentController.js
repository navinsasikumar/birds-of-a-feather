/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    'use strict';
    var params = req.body;
    params.post = parseInt(req.params.postid);
    console.log(params);

    Comment.create(params).exec(function createCB(err, comment) {
      if (err) {
          return res.json(err);
      }
      Comment.findOneById(comment.id)
        .populate('user')
        .exec(function(err, comment) {
          if (err) {
            return res.json(err);
          }
          return res.json({comment: comment});
        });
    });
  },

  destroy: function(req, res) {
    'use strict';
    var postid = req.params.postid;
    var commentid = parseInt(req.params.commentid);

    Post.destroy({id: commentid, post: postid}).exec(function(err) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        notice: 'Comment ' + commentid  + ' deleted'
      });
    });
  },
};

