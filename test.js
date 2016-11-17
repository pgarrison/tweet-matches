'use strict';

var tweetMatches = require('./index');
var Twit = require('twit');
var assert = require('assert');
var credentials = require('./credentials.json');

var track = process.argv[2] || 'twitter clinton,trump obama,tacos,s.,@realDonaldTrump,#blacklivesmatter,nytimes.com';

var T = new Twit(credentials);
var stream = T.stream('statuses/filter', { track: track });
stream.on('connect',    function() { console.log('Connected'); });
stream.on('warning',    function() { console.log('Warning'); });
stream.on('limit',      function() { console.log('Rate limited'); });
stream.on('disconnect', function() { console.log('Disconnected'); });
stream.on('reconnect',  function() { console.log('Reconnecting...'); });

var compiled = tweetMatches.compile(track);
var counter = 0;
stream.on('tweet', function(tweet) {
  assert(tweetMatches(tweet, compiled));
  counter++;
  if (counter < 100 ||
      counter < 1000 && counter % 10 === 0 ||
      counter % 100 === 0) {
    console.log('Matched', counter, 'tweets');
  }
});
