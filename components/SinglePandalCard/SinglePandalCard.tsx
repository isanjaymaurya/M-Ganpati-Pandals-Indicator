import React from 'react';
import type { IGanpatiPandal } from '../../types/global';
import { MapPinCheck } from 'lucide-react';

interface Props {
  pandal: IGanpatiPandal;
}

const SinglePandalCard: React.FC<Props> = ({ pandal }) => (
  <div className="bg-gray-100 border px-4 py-4 rounded-lg shadow cursor-pointer transition-colors bg-white w-full">
    <p className="font-semibold text-base text-center">{pandal.name}</p>
    <p className="text-sm text-gray-600 text-center">{pandal.address}</p>
    <p className="text-xs text-gray-600 text-center">
      <strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}
    </p>
    <hr className='my-4'/>
    <button
        className={`flex justify-center p-2 rounded-xl border text-center w-full text-white transition-colors outline-none bg-green-500 hover:bg-green-600`}
        tabIndex={0}
        aria-label="Visited"
        title='Mark as visited'
    >
        <MapPinCheck size={20} className='mr-2' /> VISITED
    </button>
  </div>
);

export default SinglePandalCard;
