import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { IGanpatiPandal } from '../../types/global';

type Props = {
  ganpatiPandals: IGanpatiPandal[];
};

const ganeshIcon = new L.Icon({
  iconUrl: '/pending-visit-ganpati-pandal-marker.svg',
  iconSize: [50, 50], // Size of the icon
  iconAnchor: [25, 50], // Anchor point of the icon
  popupAnchor: [0, -50], // Position of popup relative to icon
});

export default function GanpatiPandalsMap({ ganpatiPandals }: Props) {
  return (
    <MapContainer center={[19.076, 72.877]} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution="&copy; OpenStreetMap contributors"
      />
      {ganpatiPandals.map((pandal, idx) => (
        <Marker
          key={idx}
          position={[parseFloat(pandal.latitude), parseFloat(pandal.longitude)]}
          icon={ganeshIcon}
        >
          <Popup>
            <strong>{pandal.name}</strong>
            <br />
            {pandal.address}
            <br />
            {pandal.how_to_reach}
            <br />
            <a href={pandal.google_link} target="_blank" rel="noopener noreferrer">
              Google Map
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}