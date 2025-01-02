import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Message ChatGPT"
          className="search-input"
          aria-label="Search input"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button type="submit" className="search-button">
        Send
      </button>
    </form>
  );
};

export default SearchInput;