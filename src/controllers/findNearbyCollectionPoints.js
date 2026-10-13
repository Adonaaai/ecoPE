import map from "../shared/lib/leaflet.js";
import collectionPoints from "../shared/api/collection-points.json" with { type: "json" };
import { isWithinDistance } from "./isWithinDistance.js";

const collectionPointMarkers = L.layerGroup().addTo(map);
const wasteTypeKeywords = {
    "recyclables": ["papel", "plastico", "metal", "vidro"],
    "cooking-oil": ["oleo"],
    "electronics-batteries": ["eletron", "pilha", "bateria"],
    "bulky-waste-construction": ["construcao", "entulho", "volumoso", "poda"],
    "clothing-textiles": ["roupa", "calcado", "tecido", "textil"],
};

const normalizeText = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const findNearbyCollectionPoints = (latitude, longitude, wasteType = "") => {
    collectionPointMarkers.clearLayers();
    const keywords = wasteTypeKeywords[wasteType] ?? [];

    const matchingCollectionPoints = collectionPoints.filter((collectionPoint) => {
        const acceptedWasteTypes = collectionPoint.acceptedWaste.map(normalizeText);
        const matchesWasteType = keywords.length === 0 || keywords.some((keyword) =>
            acceptedWasteTypes.some((accepted) => accepted.includes(keyword))
        );

        const isWithinSearchRadius = isWithinDistance(
            collectionPoint.latitude,
            collectionPoint.longitude,
            latitude,
            longitude,
            10,
        );
        return matchesWasteType && isWithinSearchRadius;
    });

    matchingCollectionPoints.forEach((collectionPoint) => {
        L.marker([collectionPoint.latitude, collectionPoint.longitude])
            .addTo(collectionPointMarkers)
            .bindPopup(`<b>${collectionPoint.name}</b><br>${collectionPoint.address}<br><strong>Materiais aceitos:</strong> ${collectionPoint.acceptedWaste.join(", ")}`);
    });

    return matchingCollectionPoints;
};