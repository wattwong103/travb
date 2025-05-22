---
title: "News | Travel Behavior Research Group"
layout: textlay
excerpt: "News | Travel Behavior Research Group"
sitemap: false
permalink: /allnews.html
---

# News

{% for article in site.data.news %}

<p>{{ article.date }} <br>
<em>{{ article.headline }}</em></p>
{% endfor %}
