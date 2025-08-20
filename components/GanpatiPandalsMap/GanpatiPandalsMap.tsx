import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { IGanpatiPandal } from '../../types/global';

type Props = {
  ganpatiPandals: IGanpatiPandal[];
  selectedPandal?: IGanpatiPandal | null;
};

const ganeshIcon = new L.Icon({
  iconUrl: 'pending-visit-ganpati-pandal-marker.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const selectedIcon = new L.Icon({
  iconUrl: 'visited-ganpati-pandal-marker.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

export default function GanpatiPandalsMap({ ganpatiPandals, selectedPandal }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const [popupIdx, setPopupIdx] = React.useState<number | null>(null);

  useEffect(() => {
    if (selectedPandal && mapRef.current) {
      const lat = parseFloat(selectedPandal.latitude);
      const lng = parseFloat(selectedPandal.longitude);
      // Use fitBounds for mobile, setView for desktop
      if (window.innerWidth < 768) {
        mapRef.current.setView([lat, lng], 16, { animate: true });
      } else {
        mapRef.current.setView([lat, lng], 15, { animate: true });
      }
      const idx = ganpatiPandals.findIndex(
        p => p.name === selectedPandal.name && p.address === selectedPandal.address
      );
      setPopupIdx(idx !== -1 ? idx : null);
    } else {
      setPopupIdx(null);
    }
  }, [selectedPandal, ganpatiPandals]);

  return (
    <MapContainer
      center={[18.9582, 72.8321]}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        // attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a> &copy; <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
      />
      {ganpatiPandals.map((pandal, idx) => {
        const isSelected = selectedPandal && pandal.name === selectedPandal.name && pandal.address === selectedPandal.address;
        return (
          <Marker
            key={idx}
            position={[parseFloat(pandal.latitude), parseFloat(pandal.longitude)]}
            icon={isSelected ? selectedIcon : ganeshIcon}
            ref={el => {
              if (el && popupIdx === idx) {
                el.openPopup();
              }
            }}
          >
            <Popup position={[parseFloat(pandal.latitude), parseFloat(pandal.longitude)]}>
              <p className='text-base font-bold mb-0.5'>{pandal.name}</p>
              <p><strong>Address:</strong> {pandal.address}</p>
              <p><strong>How to Reach:</strong> {pandal.how_to_reach}</p>
              <p><strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}</p>
              <p>
                <a href={pandal.google_link} target="_blank" rel="noopener noreferrer">
                  Google Map
                </a>
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}