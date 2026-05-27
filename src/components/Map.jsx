import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
          />
          <IoIosSearch
            size={20}
            className="absolute left-3 top-3 text-gray-500"
          />
        </form>

        <button className="flex items-center gap-2 py-2 px-4 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 text-sm">
          <HiMiniViewfinderCircle size={20} color="green" />
          Near Me
        </button>
      </header>
      <div className="flex items-center gap-4 p-4 mx-auto w-full max-w-7xl overflow-x-auto">
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <IoIosRestaurant size={16} />
          Restaurants
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <CiHospital1 size={16} />
          Hospitals
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <IoIosSchool size={16} />
          Schools
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <CiBank size={16} />
          Banks
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <FaHotel size={16} />
          Hotels
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
          <IoMdCart size={16} />
          Markets
        </button>
        <button className="flex items-center gap-2 text-sm border border-gray-500 rounded-full py-1 px-4 hover:bg-gray-400 hover:text-green-200 hover:border-green-200 transition-colors duration-300">
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
