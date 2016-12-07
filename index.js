'use strict';

var getFields = require('./lib/get-fields');

function tweetMatches(tweet, query) {
  var fields = getFields(tweet);
  // query matches if any of its phrases matches
  return query.some(function(phrase) {
    // phrase matches if all of its terms match
    return phrase.every(function(term) {
      if (term === '') return false;
      // non-empty term matches if it is a substring of any of the fields
      return fields.some(function(tweetField) {
        return tweetField.indexOf(term) !== -1;
      });
    });
  });
}

tweetMatches.compile = function(rawQuery) {
  // ',' means OR
  var phrases = rawQuery.split(',').map(function(phrase) {
    // ' ' means AND
    var terms = phrase.split(' ').map(function(term) {
      // everything is case insensitive
      return term.toLowerCase();
    });
    return terms.filter(function(term) {
      return term !== '';
    });
  });
  return phrases.filter(function(phrase) {
    return phrase.length > 0;
  });
};

module.exports = tweetMatches;
