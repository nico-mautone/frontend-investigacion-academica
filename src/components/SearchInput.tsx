import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative flex justify-center">
      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask academic chatbot..."
            className="search-input"
            aria-label="Search input"
            disabled={isLoading}
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
