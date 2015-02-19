/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default
 * Gruntfile in Sails copies flat files from `assets` to `.tmp/public`.
 * This allows you to do things like compile LESS or CoffeeScript for
 * the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    controller: 'HomeController',
    action: 'home'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  /** Users */
  'post /users': {
    controller: 'UserController',
    action: 'create'
  },
  'get /users': {
    controller: 'UserController',
    action: 'listAll'
  },
  'get /users/:id': {
    controller: 'UserController',
    action: 'find'
  },
  'put /users/:id': {
    controller: 'UserController',
    action: 'update'
  },
  'delete /users/:id': {
    controller: 'UserController',
    action: 'destroy'
  },


  /** Posts */
  'post /users/:userid/posts': {
    controller: 'PostController',
    action: 'create'
  },
  'get /posts': {
    controller: 'PostController',
    action: 'list'
  },
  'get /posts/:id': { //TODO restrict
    controller: 'PostController',
    action: 'find'
  },
  'put /users/:userid/posts/:postId': {
    controller: 'PostController',
    action: 'update'
  },
  'delete /users/:userid/posts/:postId': {
    controller: 'PostController',
    action: 'destroy'
  },
  'get /users/:userid/posts': {
    controller: 'UserController',
    action: 'findPosts'
  },
  'get /users/:userid/posts/:postid': {
    controller: 'PostController',
    action: 'findOnePost'
  },
  'put /users/:userid/posts/:postid/votes/up': {
    controller: 'PostController',
    action: 'upVote'
  },
  'put /users/:userid/posts/:postid/votes/down': {
    controller: 'PostController',
    action: 'downVote'
  },

  /** Comments */
  'post /users/:userid/posts/:postid/comments': {
    controller: 'CommentController',
    action: 'create'
  },

  /** Login and Signup*/
  'get /login': {
    controller: 'AuthController',
    action: 'login'
  },
  'post /login': {
    controller: 'AuthController',
    action: 'process'
  },
  '/logout': {
    controller: 'AuthController',
    action: 'logout'
  },
  '/signup': {
    controller: 'AuthController',
    action: 'signup'
  }
};
