import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { IGanpatiPandal } from '../../types/global';

type Props = {
  ganpatiPandals: IGanpatiPandal[];
};

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
        >
          <Popup>
            <strong>{pandal.name}</strong>
            <br />
            {pandal.address}
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