import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={19} className="search-icon" />
      <input
        type="text"
        placeholder="Search burgers, pizza, pasta..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search menu"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  )
}