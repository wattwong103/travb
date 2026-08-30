---
title: "People | Travel Behavior Research Group"
layout: gridlay
excerpt: "Faculty and researchers of the Travel Behavior Research Group."
sitemap: false
permalink: /team/
---

<p class="page-kicker">People</p>

# The group

The group is based in the Department of Civil Engineering at Chulalongkorn University.

{% assign faculty = site.data.team_members.items | default: site.data.team_members %}
{% assign students = site.data.students.items | default: site.data.students %}

## Faculty

{% assign faculty_count = 0 %}
{% for member in faculty %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
    {% assign faculty_count = faculty_count | plus: 1 %}
    <div class="faculty-block">
      <article class="person-row">
        {% if member.photo %}
          {% if member.photo contains "/" %}
            {% assign photo_src = member.photo %}
          {% else %}
            {% assign photo_src = "/images/teampic/" | append: member.photo %}
          {% endif %}
          <img class="person-photo" src="{{ photo_src | relative_url }}" alt="{{ member.name }}">
        {% else %}
          <div class="person-fallback" aria-hidden="true">{{ member.name | slice: 0 }}</div>
        {% endif %}
        <div>
          <h3>{{ member.name }}</h3>
          <p class="person-role">{{ member.info }}</p>
          {% if member.email %}<p class="person-meta">Email: <a href="mailto:{{ member.email }}">{{ member.email }}</a></p>{% endif %}
          {% if member.scholar %}
          <p class="person-meta"><a href="{{ member.scholar }}" target="_blank" rel="noopener">Google Scholar</a></p>
          {% elsif member.email == site.email %}
          <p class="person-meta"><a href="{{ site.scholar_url }}" target="_blank" rel="noopener">Google Scholar</a></p>
          {% endif %}
          {% if member.number_educ and member.number_educ > 0 %}
          <ul class="person-educ">
            {% if member.education1 %}<li>{{ member.education1 }}</li>{% endif %}
            {% if member.education2 %}<li>{{ member.education2 }}</li>{% endif %}
            {% if member.education3 %}<li>{{ member.education3 }}</li>{% endif %}
            {% if member.education4 %}<li>{{ member.education4 }}</li>{% endif %}
            {% if member.education5 %}<li>{{ member.education5 }}</li>{% endif %}
          </ul>
          {% endif %}
          {% if member.bio %}<p class="person-bio">{{ member.bio }}</p>{% endif %}
        </div>
      </article>
    </div>
  {% endunless %}
{% endfor %}
{% if faculty_count == 0 %}
<p class="empty-note">Faculty listings will appear here when they are added to the group data files.</p>
{% endif %}

{% assign researcher_count = 0 %}
{% for member in site.data.researchers %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
    {% assign researcher_count = researcher_count | plus: 1 %}
  {% endunless %}
{% endfor %}
{% if researcher_count > 0 %}
## Researchers
{% for member in site.data.researchers %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
  <article class="person-card">
    <div>
      <h3>{{ member.name }}</h3>
      {% if member.info %}<p class="person-role">{{ member.info }}</p>{% endif %}
      {% if member.email %}<p class="person-meta"><a href="mailto:{{ member.email }}">{{ member.email }}</a></p>{% endif %}
    </div>
  </article>
  {% endunless %}
{% endfor %}
{% endif %}

{% assign student_count = 0 %}
{% for member in students %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
    {% assign student_count = student_count | plus: 1 %}
  {% endunless %}
{% endfor %}
{% if student_count > 0 %}
## Students
<div class="people-strip">
{% for member in students %}
  {% include person_flags.html %}
  {% unless is_placeholder %}
  <article class="person-card">
    <div>
      <h3>{{ member.name }}</h3>
      {% if member.info %}<p class="person-role">{{ member.info }}</p>{% endif %}
      {% if member.email %}<p class="person-meta"><a href="mailto:{{ member.email }}">{{ member.email }}</a></p>{% endif %}
    </div>
  </article>
  {% endunless %}
{% endfor %}
</div>
{% endif %}

{% assign alumni_count = 0 %}
{% for member in site.data.alumni_visitors %}
  {% include person_flags.html %}
  {% unless is_placeholder %}{% assign alumni_count = alumni_count | plus: 1 %}{% endunless %}
{% endfor %}
{% for member in site.data.alumni_msc %}
  {% include person_flags.html %}
  {% unless is_placeholder %}{% assign alumni_count = alumni_count | plus: 1 %}{% endunless %}
{% endfor %}
{% for member in site.data.alumni_bsc %}
  {% include person_flags.html %}
  {% unless is_placeholder %}{% assign alumni_count = alumni_count | plus: 1 %}{% endunless %}
{% endfor %}
{% if alumni_count > 0 %}
## Alumni
{% for member in site.data.alumni_visitors %}
  {% include person_flags.html %}
  {% unless is_placeholder %}<p>{{ member.name }}</p>{% endunless %}
{% endfor %}
{% for member in site.data.alumni_msc %}
  {% include person_flags.html %}
  {% unless is_placeholder %}<p>{{ member.name }}</p>{% endunless %}
{% endfor %}
{% for member in site.data.alumni_bsc %}
  {% include person_flags.html %}
  {% unless is_placeholder %}<p>{{ member.name }}</p>{% endunless %}
{% endfor %}
{% endif %}
