---
title: "Travel Behavior Research Group | Department of Civil Engineering, Chulalongkorn University"
layout: homelay
excerpt: "The Travel Behavior Research Group studies how people move through Bangkok and what those choices mean for transport systems, planning, and policy."
sitemap: false
permalink: /
---

<section class="hero">
  <p class="page-kicker">Travel Behavior Research Group · Bangkok</p>
  <h1>Bangkok moves by a million small decisions.</h1>
  <p class="lede">The Travel Behavior Research Group studies how people choose to travel — and what those choices mean for the city, the region, and the systems that serve them.</p>
  <p class="hero-meta">Department of Civil Engineering · Chulalongkorn University</p>
</section>

<p>TBRG is based at the <a href="https://civil.eng.chula.ac.th/web/">Department of Civil Engineering</a> at <a href="https://www.chula.ac.th/">Chulalongkorn University</a>. Our research aims to uncover the underlying factors influencing how individuals make travel decisions, the impact of these choices on transportation systems, and the broader implications for urban planning and policy. By integrating insights from transportation engineering, urban studies, psychology, and economics, TBRG seeks to develop innovative solutions that enhance mobility, reduce congestion, and promote sustainable travel practices.</p>

<div class="section-head">
  <h2>Three lines of work</h2>
</div>
<div class="pillars">
  <article class="pillar">
    <span class="pillar-num">01</span>
    <h3>Transportation Engineering</h3>
    <p>Focuses on the design, construction, and maintenance of transportation systems. We aim to ensure safe, efficient, and sustainable movement of people and goods.</p>
  </article>
  <article class="pillar">
    <span class="pillar-num">02</span>
    <h3>Travel Behavior Surveys &amp; Analysis</h3>
    <p>Collects and examines data on how people travel, including their mode choices, travel times, and trip purposes. This research helps understand travel patterns and preferences, informing policies and strategies to improve transportation systems.</p>
  </article>
  <article class="pillar">
    <span class="pillar-num">03</span>
    <h3>Transportation Planning</h3>
    <p>Develops strategies and plans to meet current and future transportation needs. It involves assessing existing transportation networks, forecasting future demands, and designing projects that enhance mobility and accessibility.</p>
  </article>
</div>

<div class="section-head">
  <h2>People</h2>
  <a href="{{ '/team/' | relative_url }}">Directory</a>
</div>
<div class="people-strip">
{% for member in site.data.team_members %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
  <article class="person-card">
    {% if member.photo %}
      <img class="person-photo" src="{{ '/images/teampic/' | append: member.photo | relative_url }}" alt="{{ member.name }}">
    {% else %}
      <div class="person-fallback" aria-hidden="true">{{ member.name | slice: 0 }}</div>
    {% endif %}
    <div>
      <h3>{{ member.name }}</h3>
      <p class="person-role">{{ member.info }}</p>
      {% if member.email %}<p class="person-meta"><a href="mailto:{{ member.email }}">{{ member.email }}</a></p>{% endif %}
    </div>
  </article>
  {% endunless %}
{% endfor %}
</div>

{% include news.html %}
