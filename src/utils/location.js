export const getCityFromCoords = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();
    const address = data?.address;

    const city =
      address?.city ||
      address?.town ||
      address?.village ||
      address?.suburb ||
      "";

    const state = address?.state || "";
    const country = address?.country || "";

    const finalLocation = [city, state, country].filter(Boolean).join(", ");

    return finalLocation || "Location Found";
  } catch (err) {
    return "Unable to fetch city";
  }
};

export const detectUserLocation = (setLocationText) => {
  if (!navigator.geolocation) {
    setLocationText("Location not supported");
    return;
  }

  setLocationText("Detecting...");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const cityName = await getCityFromCoords(lat, lng);
      setLocationText(cityName);
    },
    () => {
      setLocationText("Permission denied");
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};
