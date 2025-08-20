import React from 'react';
import type { IGanpatiPandal } from '../../types/global';
import { MapPin, MapPinCheckInside, MapPinPlusInside } from 'lucide-react';

interface Props {
  pandal: IGanpatiPandal;
  search: string;
  isSelected?: boolean;
  visitedPandals: any[];
  highlightMatch: (text: string, filter: string) => React.ReactNode;
  onSelect?: () => void;
  onToggleVisited: () => void;
}

const SingleVerticalPandalCard: React.FC<Props> = ({
  pandal,
  search,
  isSelected,
  visitedPandals,
  highlightMatch,
  onSelect,
  onToggleVisited
}) => {
  const isVisited = visitedPandals.some((vp: any) => vp.name === pandal.name);
  return (
    <div
      className={`border px-3 py-2 flex gap-2 items-center bg-gray-100 rounded-xl ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div>
        <p className="font-semibold text-sm mb-0.5">{highlightMatch(pandal.name, search)}</p>
        <p className="text-xs text-gray-600 mb-0.5">{highlightMatch(pandal.address, search)}</p>
        <p className="text-xs text-gray-600">
          <strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}
        </p>
      </div>
      <div className='justify-end flex-1 flex items-center'>
        <button
          className={`px-2 transition-colors outline-none ${isSelected ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-500`}
          tabIndex={0}
          aria-label="Show on map"
          title='Show on map'
        >
          <MapPin size={20} className='mx-auto' />
        </button>
        <button
          className={`px-2 transition-colors outline-none ${isVisited ? 'text-green-600' : 'text-gray-500'} hover:text-green-500`}
          tabIndex={0}
          aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
          title={isVisited ? 'Mark as not visited' : 'Mark as visited'}
          onClick={e => {
            e.stopPropagation();
            onToggleVisited();
          }}
        >
          {isVisited ? <MapPinCheckInside size={20} className='mx-auto' /> : <MapPinPlusInside size={20} className='mx-auto' />}
          <span className='text-[10px] whitespace-nowrap'>
            {isVisited ? 'Visited' : 'Mark Visited'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SingleVerticalPandalCard;
