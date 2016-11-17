# tweet-matches
Check if a tweet matches a twitter filter. Since the Twitter API allows you only
one or a couple connections from on IP at a time, tracking multiple queries to
the streaming API at once requires some processing on your end.

This module implements the key part of that post-processing: checking whether a
tweet matches a given value for the `track` parameter of the Twitter streaming
API. Twitter's documentation for this parameter is [here](https://dev.twitter.com/streaming/overview/request-parameters#track), and I've backed it up [here](official_docs.md).

## Usage
```js
var tweetMatches = require('tweet-matches');

var track = 'foo,bar bAZ , what is ';
var compiled = tweetMatches.compile(track);
tweetMatches({ text: 'foo' }, compiled); // true
tweetMatches({ text: 'some bAZ and some barrrr' }, compiled); // true
tweetMatches({ text: 'something else what' }, compiled); // false
tweetMatches({
  text: 'bAZ',
  quoted_status: {
    entities: {
      media: [ { display_url: 'bar.com' } ]
    }
  }
}, compiled); // true
```

## With Twit
This module is best used to consume tweet objects from [twit](https://github.com/ttezel/twit).
```js
var track = 'anything, as usual';
var stream = T.stream('statuses/filter', { track: track }
var compiled = tweetMatches.compile(track);
stream.on('tweet', function(tweet) {
  tweetMatches(tweet, compiled); // true
});
```

## Testing
Use `test.js` to test against the live twitter API. This module intends to
implement exactly the logic that Twitter uses to decide which tweets to send to
`statuses/filter`, so this test just compares our output to theirs.
```sh
$ node test.js 'value,for the,track parameter'
Connected
Matched 1 tweets
Matched 2 tweets
Matched 3 tweets
...
```
Of course if `tweetMatches` decides it's a match when it shouldn't, this won't
tell you.

## Related projects
* [twitter-stream-channels](https://github.com/topheman/twitter-stream-channels)
  is intended to solve the same problem
* [twitter-search-terms](https://github.com/SpiderStrategies/twitter-search-terms)
