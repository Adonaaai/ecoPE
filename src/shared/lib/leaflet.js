const map = L.map("collection-map").setView([-8.0632, -34.8713], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const homeMarker = L.icon({
    iconUrl: new URL("../../../public/marcadorLocal.svg", import.meta.url).href,
    iconSize: [53, 110],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

const collectPointMarker = L.icon({
    iconUrl: new URL("../../../public/marcadorPontoColeta.svg", import.meta.url).href,
    iconSize: [53, 110],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

export { map, homeMarker, collectPointMarker };
