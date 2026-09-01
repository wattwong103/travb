(function () {
  var el = document.getElementById("access-map");
  if (!el || typeof L === "undefined") return;

  var base = el.getAttribute("data-base") || "/access-data/";
  if (base.slice(-1) !== "/") base += "/";

  var map = L.map(el, { zoomControl: true, scrollWheelZoom: true }).setView(
    [13.75, 100.55],
    11
  );

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; OSM walk graph &copy; OpenStreetMap contributors",
      maxZoom: 19
    }
  ).addTo(map);

  var view = "combined";
  var classesLayer, khetLayer, railLayer, stationsLayer, isoLayer, studyLayer;

  function classStyle(feature) {
    var klass = feature.properties && feature.properties.class;
    if (view === "gaps10") {
      if (klass === "<10") return { fillOpacity: 0, stroke: false };
      return { color: "#d4564c", fillColor: "#d4564c", fillOpacity: 0.45, weight: 0 };
    }
    if (view === "gaps15") {
      if (klass === ">15")
        return { color: "#d4564c", fillColor: "#d4564c", fillOpacity: 0.45, weight: 0 };
      return { fillOpacity: 0, stroke: false };
    }
    if (klass === "<10")
      return { color: "#f7f4ef", fillColor: "#f7f4ef", fillOpacity: 0.12, weight: 0 };
    if (klass === "10-15")
      return { color: "#e8923a", fillColor: "#e8923a", fillOpacity: 0.48, weight: 0 };
    return { color: "#d4564c", fillColor: "#d4564c", fillOpacity: 0.45, weight: 0 };
  }

  function restyle() {
    if (classesLayer) classesLayer.setStyle(classStyle);
  }

  function loadJSON(name) {
    return fetch(base + name).then(function (r) {
      if (!r.ok) throw new Error(name);
      return r.json();
    });
  }

  Promise.all([
    loadJSON("classes.geojson"),
    loadJSON("khet.geojson"),
    loadJSON("rail.geojson"),
    loadJSON("stations.geojson"),
    loadJSON("study.geojson").catch(function () { return null; }),
    loadJSON("meta.json").catch(function () { return null; })
  ])
    .then(function (pack) {
      var classes = pack[0];
      var khet = pack[1];
      var rail = pack[2];
      var stations = pack[3];
      var study = pack[4];
      var meta = pack[5];

      classesLayer = L.geoJSON(classes, { style: classStyle, interactive: false }).addTo(map);

      if (study) {
        studyLayer = L.geoJSON(study, {
          style: { color: "#5b2d8e", weight: 2, fill: false },
          interactive: false
        }).addTo(map);
      }

      khetLayer = L.geoJSON(khet, {
        style: { color: "#2f6f6a", weight: 1, fill: false },
        interactive: false
      }).addTo(map);

      railLayer = L.geoJSON(rail, {
        style: { color: "#222", weight: 1.6, opacity: 0.85 },
        interactive: false
      }).addTo(map);

      function ensureIso(done) {
        if (isoLayer) {
          done();
          return;
        }
        loadJSON("station_iso.geojson")
          .then(function (data) {
            isoLayer = L.geoJSON(data, {
              style: function (f) {
                var band = f.properties && f.properties.band;
                return {
                  color: band === "10" ? "#888" : "#e8923a",
                  weight: 1.2,
                  fillOpacity: 0.15,
                  fillColor: band === "10" ? "#fff" : "#e8923a",
                  opacity: 0
                };
              }
            });
            done();
          })
          .catch(function () {
            done();
          });
      }

      stationsLayer = L.geoJSON(stations, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 3.5,
            color: "#111",
            fillColor: "#111",
            fillOpacity: 1,
            weight: 1
          });
        },
        onEachFeature: function (feature, layer) {
          var p = feature.properties || {};
          var name = p.station || p.name || "Station";
          var line = p.line ? "<br>" + p.line : "";
          var n = p.exits ? "<br>" + p.exits + " mapped exits" : "";
          layer.bindPopup("<strong>" + name + "</strong>" + line + n);
          layer.on("click", function () {
            ensureIso(function () {
              if (!isoLayer) return;
              isoLayer.eachLayer(function (lyr) {
                var same =
                  lyr.feature &&
                  lyr.feature.properties &&
                  lyr.feature.properties.station === name;
                lyr.setStyle({
                  opacity: same ? 1 : 0,
                  fillOpacity: same ? 0.2 : 0
                });
              });
              if (!map.hasLayer(isoLayer)) isoLayer.addTo(map);
            });
          });
        }
      }).addTo(map);

      var bounds = classesLayer.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [16, 16] });

      if (meta) {
        var box = document.getElementById("access-meta");
        if (box) {
          var speed = meta.walk_speed_kmh != null ? meta.walk_speed_kmh : 4.5;
          var n = meta.n_stations != null ? meta.n_stations + " stations" : "";
          var pulled = meta.osm_pulled ? " · OSM " + meta.osm_pulled : "";
          box.textContent = speed + " km/h · " + n + pulled;
        }
      }
    })
    .catch(function (err) {
      el.innerHTML =
        '<p class="access-missing">Map data is not in this build yet. Run <code>scripts/access/build.py</code>.</p>';
      console.error(err);
    });

  document.querySelectorAll('input[name="access-view"]').forEach(function (input) {
    input.addEventListener("change", function () {
      view = input.value;
      restyle();
    });
  });

  document.getElementById("tog-khet").addEventListener("change", function () {
    if (!khetLayer) return;
    if (this.checked) khetLayer.addTo(map);
    else map.removeLayer(khetLayer);
  });
  document.getElementById("tog-rail").addEventListener("change", function () {
    if (!railLayer) return;
    if (this.checked) railLayer.addTo(map);
    else map.removeLayer(railLayer);
  });
  document.getElementById("tog-stations").addEventListener("change", function () {
    if (!stationsLayer) return;
    if (this.checked) stationsLayer.addTo(map);
    else map.removeLayer(stationsLayer);
  });
})();
