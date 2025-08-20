import React, { useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import type { VisitedPandal } from '../../store/appSlice';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import type { IGanpatiPandal } from '../../types/global';
import SingleVerticalPandalCard from '../SingleVerticalPandalCard/SingleVerticalPandalCard';

interface Props {
  ganpatiPandals: IGanpatiPandal[];
  onSelectPandal?: (pandal: IGanpatiPandal) => void;
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 80,
});

const VISITED_FILTERS = ['all', 'visited', 'non-visited'] as const;
type VisitedFilterType = typeof VISITED_FILTERS[number];

const PandalsVirutalList: React.FC<Props> = ({ ganpatiPandals, onSelectPandal }) => {
  const visitedPandals = useAppSelector(state => state.visitedPandals.visited);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [visitedFilter, setVisitedFilter] = useState<VisitedFilterType>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Filter by search
  const searchedPandals = useMemo(() => {
    return ganpatiPandals.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [ganpatiPandals, search]);

  // Filter by visited
  const filteredPandals = useMemo(() => {
    if (visitedFilter === 'all') return searchedPandals;
    if (visitedFilter === 'visited') return searchedPandals.filter(p => visitedPandals.some((vp: VisitedPandal) => vp.name === p.name));
    if (visitedFilter === 'non-visited') return searchedPandals.filter(p => !visitedPandals.some((vp: VisitedPandal) => vp.name === p.name));
    return searchedPandals;
  }, [visitedFilter, searchedPandals, visitedPandals]);

  // Helper to highlight matched text
  const highlightMatch = (text: string, filter: string) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  const rowRenderer = ({ index, key, style }: any) => {
    const pandal = filteredPandals[index];
    const isSelected = selectedIndex === index;
    return (
      <div key={key} style={style} className='p-1'>
        <SingleVerticalPandalCard
          pandal={pandal}
          search={search}
          isSelected={isSelected}
          visitedPandals={visitedPandals}
          highlightMatch={highlightMatch}
          onSelect={() => {
            setSelectedIndex(index);
            if (onSelectPandal) onSelectPandal(pandal);
          }}
          onToggleVisited={() => {
            if (visitedPandals.some((vp: VisitedPandal) => vp.name === pandal.name)) {
              dispatch(require('../../store/appSlice').unmarkVisited(pandal.name));
            } else {
              dispatch(require('../../store/appSlice').markVisited({ name: pandal.name, lat: pandal.latitude, lng: pandal.longitude }));
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[500px]">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or address..."
        className="mb-2 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-100"
      />
      {/* Visited Filter Buttons */}
      <div className="flex gap-2 mb-2 mt-1 justify-end">
        {VISITED_FILTERS.map(f => (
          <button
            key={f}
            className={`px-2 py-1 rounded text-xs border transition-colors duration-150 ${visitedFilter === f ? 'bg-blue-500 text-white font-bold shadow' : 'bg-white text-blue-500'} border-blue-500`}
            onClick={() => { setVisitedFilter(f); setSelectedIndex(0); }}
          >
            {f === 'all' ? 'All' : f === 'visited' ? 'Visited' : 'Non Visited'}
          </button>
        ))}
      </div>
      <div className="flex-1">
        {filteredPandals.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-base">
            No pandals found {search.length > 0 ? `for "${search}"` : ''}
          </div>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={filteredPandals.length}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                rowRenderer={({ index, key, style, parent }) => (
                  <CellMeasurer
                    key={key}
                    cache={cache}
                    columnIndex={0}
                    rowIndex={index}
                    parent={parent}
                  >
                    {rowRenderer({ index, key, style })}
                  </CellMeasurer>
                )}
                overscanRowCount={5}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
};

export default PandalsVirutalList;
