import React, { useState } from 'react';
import { DropdownProps } from './dropdown.types';
import './dropdown.styles.scss';

function Dropdown({ items, onClick }: DropdownProps) {
  const [search, setSearch] = useState('');
  return (
    <div className="amidetor__dropdown">
      <input
        placeholder="Search..."
        aria-label="search for a block"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {items
        .filter((item) => item.title.includes(search))
        .map((item, i) => (
          <button
            key={i}
            className="amidetor__dropdown-item"
            role="button"
            onClick={() => onClick && onClick(item.type)}
          >
            <item.Icon />
            <h2>{item.title}</h2>
          </button>
        ))}
    </div>
  );
}

export default Dropdown;
