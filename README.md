# Travel Behavior Research Group

Public website of the Travel Behavior Research Group (TBRG), Department of Civil Engineering, Faculty of Engineering, Chulalongkorn University.

Live site: <https://wattwong103.github.io/travb>

## Editing content

YAML files in `_data` are the source of truth:

- `_data/team_members.yml` — faculty
- `_data/students.yml`, `_data/researchers.yml`, alumni files — other people (placeholder names and emails are hidden in templates)
- `_data/publist.yml` — publications
- `_data/news.yml` — news items

Pages live in `_pages`. Navigation is Home, Research, People, Publications, News, Data.

## Design

Dark charcoal editorial layout with serif headlines, geometric sans UI, a CSS map-grid, and thin amber accents. Styles are in `css/tbrg.css`. The site does not use Bootstrap for layout.

## Local build

```bash
bundle install
bundle exec jekyll serve
```

The site is configured as a GitHub Pages project site with `url: https://wattwong103.github.io` and `baseurl: /travb`.

## License

Site content © 2026 Travel Behavior Research Group. Code is released under the MIT License (see `LICENSE`).
