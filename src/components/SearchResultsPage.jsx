import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchWithAuth } from './api';

export function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    const fetchSearchResults = async () => {
      try {
        const response = await fetchWithAuth(`http://localhost:8080/notes/search/${query}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((note) => (
            <li key={note.id} className="mb-2">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold">{note.title}</h2>
                <p>{note.category}</p>
                <p>{note.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}