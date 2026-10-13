// This function checks if two geographical points are within a specified maximum distance of each other,
// Haversine formula is needed for this work.
export const isWithinDistance = (firstLatitude, firstLongitude, secondLatitude, secondLongitude, maxDistanceKm) => {
    // degrees to radians
    const toRadians = (value) => (value * Math.PI) / 180;

    // Earth's radius in KM
    const earthRadiusKm = 6371;

    // Haversine formula
    const latitudeDeltaRadians = toRadians(secondLatitude - firstLatitude);
    const longitudeDeltaRadians = toRadians(secondLongitude - firstLongitude);
    const haversineTerm =
        Math.sin(latitudeDeltaRadians / 2) * Math.sin(latitudeDeltaRadians / 2) +
        Math.cos(toRadians(firstLatitude)) * Math.cos(toRadians(secondLatitude)) *
        Math.sin(longitudeDeltaRadians / 2) * Math.sin(longitudeDeltaRadians / 2);

    const angularDistanceRadians = 2 * Math.atan2(Math.sqrt(haversineTerm), Math.sqrt(1 - haversineTerm));
    const distanceKm = earthRadiusKm * angularDistanceRadians;
    // Return boolean based on filter
    return distanceKm <= maxDistanceKm;
};