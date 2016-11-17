'use strict';

function tweetMatches(tweet, query) {
  console.log(tweet, query);
}

tweetMatches.compile = function(rawQuery) {
  return rawQuery;
};

module.exports = tweetMatches;
