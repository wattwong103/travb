# Bangkok walk-isochrone builder

Offline pipeline for the public `/access/` map. Jekyll does not run this.

```bash
python3 -m venv scripts/access/.venv
scripts/access/.venv/bin/pip install -r scripts/access/requirements.txt
scripts/access/.venv/bin/python scripts/access/build.py
```

Walk speed defaults to 4.5 km/h in `config.yaml`. Change it there and re-run; the GitHub Pages site cannot recompute live.

`--fresh` ignores `scripts/access/cache/` and re-downloads OSM.

Outputs land in `access-data/` (GeoJSON + 16:9 PNG) and are what the site loads.
