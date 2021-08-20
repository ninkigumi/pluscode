let olVectorMap = null;
const centerLat = 35.6852;
const centerLng = 139.7528;

/** Format the JavaScript and set up the tab listeners. */
function pageLoad() {
  try {
    document.getElementById('openlayers_vector').classList.add('example_show');
    showOpenlayersVector();

  } catch (e) {
    console.log(e)
  }
}

/**
 * Set the displayed map to Open Layers, and load the vector tiles.
 */
function showOpenlayersVector() {
  if (olVectorMap != null) {
    return;
  }
  olVectorMap = new ol.Map({
    target: document.querySelector('#openlayers_vector .map'),
    layers: [
      new ol.layer.Tile({source: new ol.source.OSM()}),
      new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
          maxZoom: 25,
          attributions: 'grid by <a href="https://plus.codes">plus codes</a>',
          format: new ol.format.GeoJSON(),
          url: 'https://{a-c}-grid.plus.codes/grid/wms/{z}/{x}/{y}.json?zoomadjust=2'
        }),
      }),
    ],
    
    view: new ol.View(
        {center: ol.proj.fromLonLat([centerLng, centerLat]), zoom: 12})
  });
  const selectPointerMove =
      new ol.interaction.Select({condition: ol.events.condition.click});
  selectPointerMove.on('select', (e) => {
    document.getElementById('ol_vector_pluscode').innerHTML =
        e.target.getFeatures().getArray()[0].get('global_code');
  });
  olVectorMap.addInteraction(selectPointerMove);
}
