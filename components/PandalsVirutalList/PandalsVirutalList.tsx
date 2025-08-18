import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import type { IGanpatiPandal } from '../../types/global';
import { MapPin } from 'lucide-react';

interface Props {
  ganpatiPandals: IGanpatiPandal[];
  onSelectPandal?: (pandal: IGanpatiPandal) => void;
}

const rowHeight = 60;

const PandalsVirutalList: React.FC<Props> = ({ ganpatiPandals, onSelectPandal }) => {
  const [filter, setFilter] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const filteredPandals = ganpatiPandals.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.address.toLowerCase().includes(filter.toLowerCase())
  );

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
      <div
        key={key}
        style={style}
        className={`px-3 flex items-center transition-colors bg-gray-100 rounded-xl mb-3 group`}
      >
        <div>
          <p className="font-semibold text-base">{highlightMatch(pandal.name, filter)}</p>
          <p className="text-sm text-gray-600">{highlightMatch(pandal.address, filter)}</p>
        </div>
        <div className='justify-end flex-1 text-right'>
          <button
            onClick={() => {
              setSelectedIndex(index);
              if (onSelectPandal) onSelectPandal(pandal);
            }}
            className={`px-2 transition-colors outline-none ${isSelected ? 'text-blue-600' : 'text-gray-400'} group-hover:text-blue-500 hover:text-blue-500`}
            tabIndex={0}
            aria-label="Show on map"
          >
            <MapPin />
          </button>
        </div>
        {/* <p className="text-sm text-gray-600">
          <strong>Visarjan Date:</strong> {pandal.ganpati_visarjan_date}
        </p> */}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[500px]">
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search by name or address..."
        className="mb-2 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <div className="flex-1">
        {filteredPandals.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-base">
            No pandals found for "{filter}"
          </div>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={filteredPandals.length}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
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
