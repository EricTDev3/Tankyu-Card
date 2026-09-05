"use client";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";

export default function ItineraryMap({ shops }) {
  const [selectedShop, setSelectedShop] = useState(null);

  const mapRef = useRef();
  const longitudes = shops.map((shop) => shop.longitude);
  const latitudes = shops.map((shop) => shop.latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 139.6917,
          latitude: 35.6895,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onLoad={() => {
          mapRef.current.fitBounds(
            [
              [minLongitude, minLatitude],
              [maxLongitude, maxLatitude],
            ],
            { padding: 50 },
          );
        }}
      >
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            longitude={shop.longitude}
            latitude={shop.latitude}
            onClick={() => setSelectedShop(shop)}
          >
            <div style={{ cursor: "pointer", fontSize: "24px" }}>📍</div>
          </Marker>
        ))}
        {selectedShop && (
          <Popup
            longitude={selectedShop.longitude}
            latitude={selectedShop.latitude}
            onClose={() => setSelectedShop(null)}
            closeOnClick={false}
          >
            <div>
              <p className="font-bold">{selectedShop.shop_name}</p>
              <p>{selectedShop.address}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
