'use strict';

var _ = require('lodash');

var tweetLikeObjectsToCheck = [
  null,
  'extended_tweet',
  'quoted_status',
  'quoted_status.extended_tweet',
  'retweeted_status',
  'retweeted_status.extended_tweet'
];

var fieldsToCheck = [
  'text',
  'full_text'
];

// This will get, for instance, `tweet.entities.hashtags[x].text` for all `x`
var arrayFieldsToCheck = [
  { arrayAt: 'entities.hashtags',
    inEach: 'text'
  },
  { arrayAt: 'entities.urls',
    inEach: 'display_url'
  },
  { arrayAt: 'entities.urls',
    inEach: 'expanded_url'
  },
  { arrayAt: 'entities.media',
    inEach: 'display_url'
  },
  { arrayAt: 'entities.media',
    inEach: 'expanded_url'
  },
  { arrayAt: 'entities.user_mentions',
    inEach: 'screen_name'
  }
];

// Create an array of the strings at the positions in the tweet object
// specified by the above arrays of field names
function getFields(tweet) {
  return _.flatten(tweetLikeObjectsToCheck.map(function(tweetLikeName) {
    var tweetLike;
    if (tweetLikeName === null) {
      tweetLike = tweet;
    } else {
      tweetLike = _.get(tweet, tweetLikeName);
    }
    if (!tweetLike) return [];
    return getFieldsFromTweetLike(tweetLike);
  }));
}

// Takes a tweet or a subobject of tweet and looks for strings in the positions
// listed in fieldsToCheck and arrayFieldsToCheck
function getFieldsFromTweetLike(tweetLike) {
  var fields = fieldsToCheck.map(function(fieldName) {
    return _.get(tweetLike, fieldName);
  });

  arrayFieldsToCheck.forEach(function(fieldDescription) {
    var arr = _.get(tweetLike, fieldDescription.arrayAt);
    if (_.isArray(arr)) {
      arr.forEach(function(element) {
        fields.push(_.get(element, fieldDescription.inEach));
      });
    }
  });

  return fields.filter(function(field) {
    return typeof field === 'string' && field.trim().length !== 0;
  }).map(function(field) {
    return field.toLowerCase();
  });
}

module.exports = getFields;
