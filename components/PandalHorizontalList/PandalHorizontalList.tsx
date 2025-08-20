import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import type { VisitedPandal } from '../../store/appSlice';
import { useSwipeable } from 'react-swipeable';
import type { IGanpatiPandal } from '../../types/global';
import SinglePandalCard from '../SingleHorizontalPandalCard/SingleHorizontalPandalCard';

interface Props {
  ganpatiPandals: IGanpatiPandal[];
  selectedPandal: IGanpatiPandal | null;
  onSelectPandal: (pandal: IGanpatiPandal) => void;
}

const VISITED_FILTERS = ['all', 'visited', 'non-visited'] as const;
type VisitedFilterType = typeof VISITED_FILTERS[number];

const PandalHorizontalList: React.FC<Props> = ({ ganpatiPandals, selectedPandal, onSelectPandal }) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex(i => Math.min(i + 1, filteredPandals.length - 1));
    },
    onSwipedRight: () => {
      setCurrentIndex(i => Math.max(i - 1, 0));
    },
    trackMouse: true,
  });
  const visitedPandals = useAppSelector((state: RootState) => state.visitedPandals.visited);
  const [visitedFilter, setVisitedFilter] = useState<VisitedFilterType>('all');

  // Filtered list based on filter
  const filteredPandals = useMemo(() => {
    if (visitedFilter === 'all') return ganpatiPandals;
    if (visitedFilter === 'visited') return ganpatiPandals.filter(p => visitedPandals.some((vp: VisitedPandal) => vp.name === p.name));
    if (visitedFilter === 'non-visited') return ganpatiPandals.filter(p => !visitedPandals.some((vp: VisitedPandal) => vp.name === p.name));
    return ganpatiPandals;
  }, [visitedFilter, ganpatiPandals, visitedPandals]);

  const initialIndex = selectedPandal
    ? filteredPandals.findIndex(
        p => p.name === selectedPandal.name && p.address === selectedPandal.address
      )
    : 0;
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex >= 0 ? initialIndex : 0);

  const pandal = filteredPandals[currentIndex];

  return (
    <div className="flex flex-col h-[300px] w-full items-center" {...swipeHandlers}>
      {/* Filter Buttons */}
      <div className="w-full flex gap-2 mb-2 justify-end">
        {VISITED_FILTERS.map(f => (
          <button
            key={f}
            className={`px-2 py-1 rounded text-xs border transition-colors duration-150 ${visitedFilter === f ? 'bg-blue-500 text-white font-bold shadow' : 'bg-white text-blue-500'} border-blue-500`}
            onClick={() => {
              if (visitedFilter !== f) {
                setVisitedFilter(f);
              }
            }}
          >
            {f === 'all' ? 'All' : f === 'visited' ? 'Visited' : 'Non Visited'}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {filteredPandals.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-base">No pandals found</div>
        ) : (
          <>
            {pandal ? <SinglePandalCard pandal={pandal} /> : null}
            {/* Visited toggle button */}
            <div className="flex justify-between items-center w-full mt-2">
              <button
                className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
                disabled={currentIndex === 0}
              >Prev</button>
              <span className="text-xs">{currentIndex + 1} / {filteredPandals.length}</span>
              <button
                className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                onClick={() => setCurrentIndex(i => Math.min(i + 1, filteredPandals.length - 1))}
                disabled={currentIndex === filteredPandals.length - 1}
              >Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PandalHorizontalList;
