import React, { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import type { IGanpatiPandal } from '../../types/global';
import SinglePandalCard from '../SinglePandalCard/SinglePandalCard';

interface Props {
  ganpatiPandals: IGanpatiPandal[];
  selectedPandal: IGanpatiPandal | null;
  onSelectPandal: (pandal: IGanpatiPandal) => void;
}

const PandalHorizontalList: React.FC<Props> = ({ ganpatiPandals, selectedPandal, onSelectPandal }) => {
  const initialIndex = selectedPandal
    ? ganpatiPandals.findIndex(
        p => p.name === selectedPandal.name && p.address === selectedPandal.address
      )
    : 0;
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    if (selectedPandal) {
      const idx = ganpatiPandals.findIndex(
        p => p.name === selectedPandal.name && p.address === selectedPandal.address
      );
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPandal]);

  useEffect(() => {
    onSelectPandal(ganpatiPandals[currentIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex(i => Math.min(i + 1, ganpatiPandals.length - 1));
    },
    onSwipedRight: () => {
      setCurrentIndex(i => Math.max(i - 1, 0));
    },
    trackMouse: true,
  });

  if (!ganpatiPandals.length) {
    return <div className="flex items-center justify-center h-full text-gray-500 text-base">No pandals found</div>;
  }

  const pandal = ganpatiPandals[currentIndex];

  return (
    <div className="flex flex-col h-[300px] w-full items-center" {...swipeHandlers}>
      <div className="w-full flex flex-col items-center justify-center">
        <SinglePandalCard pandal={pandal} />
        <div className="flex justify-between items-center w-full mt-2">
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
            onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
          >Prev</button>
          <span className="text-xs">{currentIndex + 1} / {ganpatiPandals.length}</span>
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
            onClick={() => setCurrentIndex(i => Math.min(i + 1, ganpatiPandals.length - 1))}
            disabled={currentIndex === ganpatiPandals.length - 1}
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default PandalHorizontalList;
