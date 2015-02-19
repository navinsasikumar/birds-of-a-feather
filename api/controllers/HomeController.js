/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  home: function(req, res) {
    'use strict';
    res.view('homepage');
  }

};

