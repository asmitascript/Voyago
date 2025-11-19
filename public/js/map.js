const map = new maplibregl.Map({
    container: 'map',
    style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_API_KEY}`,
    center: [long, lat],
    zoom: 9
});
const popup = new maplibregl.Popup({ offset: 25 }).setText("The perfect spot for your next stay");

map.addControl(new maplibregl.NavigationControl());

new maplibregl.Marker({ color: "red" })
    .setLngLat([long, lat])
    .setPopup(popup) // attach popup
    .addTo(map)
    .togglePopup(); 
