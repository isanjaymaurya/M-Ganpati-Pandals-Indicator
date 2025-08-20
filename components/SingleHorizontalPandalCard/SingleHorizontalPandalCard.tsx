import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import type { VisitedPandal } from '../../store/appSlice';
import { markVisited, unmarkVisited } from '../../store/appSlice';
import type { IGanpatiPandal } from '../../types/global';
import { MapPinCheckInside, MapPinPlusInside } from 'lucide-react';

interface Props {
  pandal: IGanpatiPandal;
}

const SinglePandalCard: React.FC<Props> = ({ pandal }) => {
  const visitedPandals = useAppSelector(state => state.visitedPandals.visited);
  const dispatch = useAppDispatch();
  const isVisited = visitedPandals.some((vp: VisitedPandal) => vp.name === pandal.name);
  return (
    <div className="bg-gray-100 border px-4 py-4 rounded-lg shadow cursor-pointer transition-colors bg-white w-full">
      <p className="font-semibold text-base text-center">{pandal.name}</p>
      <p className="text-xs text-gray-600 text-center">{pandal.address}</p>
      <p className="text-xs text-gray-600 text-center">
        <strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}
      </p>
      <hr className='my-2'/>
      <button
        className={`flex text-sm justify-center p-2 rounded-xl border text-center w-full text-white transition-colors outline-none ${isVisited ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}`}
        tabIndex={0}
        aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
        title={isVisited ? 'Mark as not visited' : 'Mark as visited'}
        onClick={() => {
          if (isVisited) {
            dispatch(unmarkVisited(pandal.name));
          } else {
            dispatch(markVisited({ name: pandal.name, lat: Number(pandal.latitude), lng: Number(pandal.longitude) }));
          }
        }}
      >
        {isVisited ? (
          <MapPinCheckInside size={20} className='mr-2' />
        ) : (
          <MapPinPlusInside size={20} className='mr-2' />
        )}
        {isVisited ? 'VISITED' : 'MARK VISITED'}
      </button>
    </div>
  );
};

export default SinglePandalCard;
