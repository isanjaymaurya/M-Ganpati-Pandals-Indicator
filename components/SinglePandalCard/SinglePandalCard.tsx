import React from 'react';
import type { IGanpatiPandal } from '../../types/global';

interface Props {
  pandal: IGanpatiPandal;
}

const SinglePandalCard: React.FC<Props> = ({ pandal }) => (
  <div className="border px-4 py-4 rounded-lg shadow cursor-pointer transition-colors bg-white w-full">
    <p className="font-semibold text-base text-center">{pandal.name}</p>
    <p className="text-sm text-gray-600 text-center">{pandal.address}</p>
    <p className="text-xs text-gray-600 text-center">
      <strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}
    </p>
  </div>
);

export default SinglePandalCard;
