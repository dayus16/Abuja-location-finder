import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  Circle,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

import { FaMapLocationDot } from "react-icons/fa6";
import {
  IoIosSearch,
  IoIosRestaurant,
  IoIosSchool,
  IoMdCart,
} from "react-icons/io";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { CiHospital1, CiBank } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";

const Map = () => {
  const [coords, setCoords] = useState(null);
  const [inputField, setInputField] = useState("");
  const [nearByPlaces, setNearByPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "1ad747ef3318446096bc43be639a0f80";

  //   User location code
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(
          "Unable to retrieve your location. Please allow location access and refresh the page.",
        );
      },
    );
  }, []);

  //   CustomIcon
  const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/1483/1483285.png",
    iconSize: [32, 32],
  });
  //   Button for getting nearby locations code
  const findNearByPlaces = async (category) => {
    if (!coords) {
      alert(
        "Unable to retrieve your location. Please allow location access and refresh the page.",
      );
      return;
    }

    try {
      const res = await fetch(
        `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${coords.lng},${coords.lat},5000&limit=10&apiKey=${API_KEY}`,
      );
      const data = await res.json();
      setNearByPlaces(data.features || []);
    } catch (err) {
      console.error("Nearby places request failed:", err);
      alert("Unable to load nearby places. Check the console for details.");
    }
  };

  //   HandleSerach InputField
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!inputField.trim()) {
      alert("Please enter a location to search.");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${inputField}&apiKey=${API_KEY}`,
    );
    const data = await res.json();
    console.log("Search results:", data);
    if (data.features.length === 0)
      return alert("No results found for your search.");
    const lat = data.features[0].geometry.coordinates[1];
    const lng = data.features[0].geometry.coordinates[0];

    setCoords({ lat, lng });
    setInputField("");
    setLoading(false);
  };
  return (
    <div>
      <header className="flex items-center gap-4 w-full p-4 bg-gray-800 text-white">
        <div className="flex items-center gap-2">
          <FaMapLocationDot size={30} color="green" />
          <h1 className="text-lg font-bold">AbujaFind</h1>
        </div>

        <form className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for a location..."
            className="w-full py-2 px-10 outline-none border border-gray-500 bg-black rounded-lg"
            value={inputField}
            onChange={(e) => setInputField(e.target.value)}
          />
          <IoIosSearch
            size={20}
            className="absolute left-3 top-3 text-gray-500"
          />
        </form>

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 py-2 px-4 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 text-sm"
        >
          <HiMiniViewfinderCircle size={20} color="green" />
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "Near Me"
          )}
        </button>
      </header>
      <div className="flex items-center gap-4 p-4 mx-auto w-full max-w-7xl overflow-x-auto">
        <button
          onClick={() => findNearByPlaces("catering.restaurant")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <IoIosRestaurant size={16} />
          Restaurants
        </button>
        <button
          onClick={() => findNearByPlaces("healthcare.hospital")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <CiHospital1 size={16} />
          Hospitals
        </button>
        <button
          onClick={() => findNearByPlaces("education.school")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <IoIosSchool size={16} />
          Schools
        </button>
        <button
          onClick={() => findNearByPlaces("amenity.bank")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <CiBank size={16} />
          Banks
        </button>
        <button
          onClick={() => findNearByPlaces("accommodation.hotel")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <FaHotel size={16} />
          Hotels
        </button>
        <button
          onClick={() => findNearByPlaces("commercial.supermarket")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <IoMdCart size={16} />
          Markets
        </button>
        <button
          onClick={() => findNearByPlaces("service.vehicle.fuel")}
          className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300"
        >
          <BsFillFuelPumpFill size={16} />
          Fuel Stations
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full h-screen">
        <div className="w-[80%] h-full">
          {coords ? (
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100vh", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Circle
                center={[coords.lat, coords.lng]}
                radius={1000}
                pathOptions={{
                  color: "#3b82f6",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.15,
                  weight: 2,
                }}
              />

              <CircleMarker
                center={[coords.lat, coords.lng]}
                radius={8}
                pathOptions={{
                  color: "white",
                  fillColor: "#3b82f6",
                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>
                  You are here! <br />
                  Latitude: {coords.lat.toFixed(4)}, Longitude:
                  {coords.lng.toFixed(4)}
                </Popup>
              </CircleMarker>
              {nearByPlaces.map((place) => {
                if (!place.geometry || !place.geometry.coordinates) {
                  return null;
                }
                const [lng, lat] = place.geometry.coordinates;
                return (
                  <Marker
                    key={place.properties.place_id || `${lng}-${lat}`}
                    position={[lat, lng]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="text-sm font-semibold">
                        {place.properties.name ||
                          place.properties.address_line1 ||
                          "Nearby place"}
                      </div>
                      <div className="text-xs text-gray-600">
                        {place.properties.category || ""}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          ) : (
            <div className="w-full h-[70vh] flex items-center justify-center text-gray-500 text-2xl font-semibold">
              Loading map...
            </div>
          )}
        </div>
        <div className="w-[20%] h-full"></div>
      </div>
    </div>
  );
};

export default Map;
