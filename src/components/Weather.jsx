import { useEffect, useState } from "react";

function Weather() {
  const [temp, setTemp] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  // Step 1: Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setError("Location access denied");
      }
    );
  }, []);

  // Step 2: Fetch weather once we have coordinates
  useEffect(() => {
    if (!coords) return;

    async function fetchWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&temperature_unit=fahrenheit`
      );
      const data = await res.json();
      setTemp(data.current_weather.temperature);
    }

    fetchWeather();
  }, [coords]);

  return (
    <div>
      <h2>Your Weather</h2>

      {error && <p>{error}</p>}

      {!coords && !error && <p>Getting your location...</p>}

      {coords && temp === null && <p>Loading weather...</p>}

      {temp !== null && (
        <p>
          {temp}°F at ({coords.lat.toFixed(2)}, {coords.lon.toFixed(2)})
        </p>
      )}
    </div>
  );
}

export default Weather;
