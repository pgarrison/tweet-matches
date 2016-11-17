I copied this documentation from the [official page](https://dev.twitter.com/streaming/overview/request-parameters#track) as a backup in case the API changes.

# Streaming API request parameters

## track

A comma-separated list of phrases which will be used to determine what Tweets will be delivered on the stream. A phrase may be one or more terms separated by spaces, and a phrase will match if all of the terms in the phrase are present in the Tweet, regardless of order and ignoring case. By this model, you can think of commas as logical ORs, while spaces are equivalent to logical ANDs (e.g. ‘`the twitter`’ is `the AND twitter`, and ‘`the,twitter`’ is `the OR twitter`).

The text of the Tweet and some entity fields are considered for matches. Specifically, the `text` attribute of the Tweet, `expanded_url` and `display_url` for links and media, text for hashtags, and `screen_name` for user mentions are checked for matches.

Each phrase must be between 1 and 60 bytes, inclusive.

Exact matching of phrases (equivalent to quoted phrases in most search engines) is not supported.

Punctuation and special characters will be considered part of the term they are adjacent to. In this sense, “hello.” is a different track term than “hello”. However, matches will ignore punctuation present in the Tweet. So “hello” will match both “hello world” and “my brother says hello.” Note that punctuation is not considered to be part of a #hashtag or @mention, so a track term containing punctuation will not match either #hashtags or @mentions.

UTF-8 characters will match exactly, even in cases where an “equivalent” ASCII character exists. For example, “touché” will not match a Tweet containing “touche”.

Non-space separated languages, such as CJK are currently unsupported.

URLs are considered words for the purposes of matches which means that the entire domain and path must be included in the track query for a Tweet containing an URL to match. Note that `display_url` does not contain a protocol, so this is not required to perform a match.

Twitter currently canonicalizes the domain “www.example.com” to “example.com” before the match is performed, so omit the “www” from URL track terms.

Finally, to address a common use case where you may want to track all mentions of a particular domain name (i.e., regardless of subdomain or path), you should use “example com” as the track parameter for “example.com” (notice the lack of period between “example” and “com” in the track parameter). This will be over-inclusive, so make sure to do additional pattern-matching in your code. See the table below for more examples related to this issue.

Track examples:

<table>
  <tbody valign="top">
  <tr class="row-odd"><td>Parameter value</td>
  <td>Will match...</td>
  <td>Will not match...</td>
  </tr>
  <tr class="row-even"><td>Twitter</td>
  <td><dl class="first last docutils">
  <dt>TWITTER</dt>
  <dd>twitter
  &#8220;Twitter&#8221;
  twitter.
  #twitter
  &#64;twitter
  <a class="reference external" href="http://twitter.com">http://twitter.com</a></dd>
  </dl>
  </td>
  <td><dl class="first last docutils">
  <dt>TwitterTracker</dt>
  <dd>#newtwitter</dd>
  </dl>
  </td>
  </tr>
  <tr class="row-odd"><td>Twitter&#8217;s</td>
  <td>I like Twitter&#8217;s new design</td>
  <td>Someday I&#8217
  Tke to visit &#64;Twitter&#8217;s office</td>
  </tr>
  <tr class="row-even"><td>twitter api,twitter streaming</td>
  <td><dl class="first last docutils">
  <dt>The Twitter API is awesome</dt>
  <dd>The twitter streaming service is fast
  Twitter has a streaming API</dd>
  </dl>
  </td>
  <td>I&#8217;m new to Twitter</td>
  </tr>
  <tr class="row-odd"><td>example.com</td>
  <td>Someday I will visit example.com</td>
  <td>There is no example.com/foobarbaz</td>
  </tr>
  <tr class="row-even"><td>example.com/foobarbaz</td>
  <td><dl class="first last docutils">
  <dt>example.com/foobarbaz</dt>
  <dd>www.example.com/foobarbaz</dd>
  </dl>
  </td>
  <td>example.com</td>
  </tr>
  <tr class="row-odd"><td>www.example.com/foobarbaz</td>
  <td>&nbsp;</td>
  <td>www.example.com/foobarbaz</td>
  </tr>
  <tr class="row-even"><td>example com</td>
  <td><dl class="first last docutils">
  <dt>example.com</dt>
  <dd>www.example.com
  foo.example.com
  foo.example.com/bar
  I hope my startup isn&#8217;t merely another example of a dot com boom!</dd>
  </dl>
  </td>
  <td>&nbsp;</td>
  </tr>
  </tbody>
</table>
