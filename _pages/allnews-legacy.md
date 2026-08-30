---
title: "News | Travel Behavior Research Group"
layout: textlay
excerpt: "News from the Travel Behavior Research Group."
sitemap: false
permalink: /allnews.html
---

<p class="page-kicker">News</p>

# Group news

The news archive now lives at <a href="{{ '/news/' | relative_url }}">News</a>.

<ol class="news-list">
{% for article in site.data.news %}
  <li class="news-item">
    <time class="news-date">{{ article.date }}</time>
    <p class="news-headline">{{ article.headline }}</p>
  </li>
{% endfor %}
</ol>
