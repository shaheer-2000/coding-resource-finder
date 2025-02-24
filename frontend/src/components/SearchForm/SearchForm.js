import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../appContext";
import { clearSearchIcon } from "../../svgs";

const initialSuggestions = [
  { text: "JavaScript", isSelected: false },
  { text: "React", isSelected: false },
  { text: "Python", isSelected: false },
  { text: "Java", isSelected: false },
  { text: "Node", isSelected: false },
  { text: "SQL", isSelected: false },
];

export default function SearchForm() {
  const { allResources, searchTerm, setSearchTerm, setRenderedResources } =
    useContext(Context);
  const [suggestions, setSuggestions] = useState(initialSuggestions || "");

  useEffect(() => {
    handleSearch();
    //eslint-disable-next-line
  }, [searchTerm]);

  function searchWithSuggestion(text) {
    setSuggestions(
      suggestions.map((suggestion) => {
        if (text === suggestion.text) {
          if (suggestion.isSelected) {
            setSearchTerm("");
            return { text: suggestion.text, isSelected: false };
          }
          setSearchTerm(suggestion.text.toLocaleLowerCase());
          return { text: suggestion.text, isSelected: true };
        }
        return { text: suggestion.text, isSelected: false };
      })
    );
  }

  function handleSearch() {
    let result = [];
    result = allResources.filter(({ title }) => {
      return title
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase().trim());
    });

    if (result.length > 0 && searchTerm.trim()) {
      setRenderedResources(result);
    } else if (searchTerm.trim() && !result.length) {
      setRenderedResources([]);
    } else {
      setRenderedResources(allResources);
      setSuggestions(initialSuggestions);
    }
  }

  function handleInputSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  function handleClickSearchTerm() {
    setSearchTerm("");
  }

  function handleClickSearchWithSuggestion(suggestion) {
    return () => {
      searchWithSuggestion(suggestion.text);
    };
  }

  return (
    <div className="search-input-wrapper">
      <div className="search-input-inner-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search a resource..."
          onInput={handleInputSearchTerm}
          value={searchTerm}
        />
        <div
          className="clear-button"
          onClick={handleClickSearchTerm}
          title="clear search text"
        >
          {clearSearchIcon}
        </div>
      </div>
      <div className="search-suggestions">
        {suggestions.map((suggestion) => {
          return (
            <p
              key={suggestion.text}
              className={`search-suggestion ${
                suggestion.isSelected ? "active" : ""
              }`}
              onClick={handleClickSearchWithSuggestion(suggestion)}
            >
              {suggestion.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
