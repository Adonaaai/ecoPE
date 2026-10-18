import {map, homeMarker} from "../shared/lib/leaflet.js";
import { findNearbyCollectionPoints } from "../controllers/findNearbyCollectionPoints.js";
import "./navigation.js";

const searchForm = document.querySelector(".home-search");
const searchInput = document.getElementById("search-input");
const wasteTypeSelect = document.getElementById("waste-type-select");
let searchedLocationMarker;

searchForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
        alert("Por favor, insira um endereço para buscar.");
        return;
    };

    try {
        const params = new URLSearchParams({
            format: "jsonv2",
            limit: "1",
            countrycodes: "br",
            "accept-language": "pt-BR",
            q: query,
        });

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
        if (!response.ok) throw new Error(`Busca falhou (${response.status})`);

        const geocodingResults = await response.json();

        if (geocodingResults.length === 0) {
            alert("Nenhum resultado encontrado para o endereço fornecido.");
            return;
        };

        const {
            lat: geocodingLatitude,
            lon: geocodingLongitude,
            display_name: formattedAddress,
        } = geocodingResults[0];

        const latitude = Number(geocodingLatitude);
        const longitude = Number(geocodingLongitude);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            throw new Error("O serviço retornou coordenadas inválidas.");
        }

        const coordinates = [latitude, longitude];

        map.setView(coordinates, 13);

        if (!searchedLocationMarker) {
            searchedLocationMarker = L.marker(coordinates, { icon: homeMarker }).addTo(map);
        } else {
            searchedLocationMarker.setLatLng(coordinates);
        };
        searchedLocationMarker.bindPopup(formattedAddress).openPopup();

        const nearbyCollectionPoints = findNearbyCollectionPoints(latitude, longitude, wasteTypeSelect.value);
        if (nearbyCollectionPoints.length === 0) {
            alert("Nenhum ponto de coleta desse tipo foi encontrado em um raio de 10 km.");
        }

    } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        alert("Ocorreu um erro ao buscar o endereço. Por favor, tente novamente mais tarde.");
    }
})