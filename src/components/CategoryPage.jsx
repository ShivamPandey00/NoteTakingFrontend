import React, { useEffect, useState } from 'react';
import './demo/CategoryPage.css';
import { fetchWithAuth } from './api';

export function CategoryPage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    // Fetch all notes data from the backend
    const fetchNotes = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8080/notes/list');
        const data = await response.json();
        setNotes(data);

        // Extract unique categories from notes
        const uniqueCategories = [...new Set(data.map(note => note.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCategoryClick = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      const notesByCategory = notes.filter(note => note.category === category);
      setFilteredNotes(notesByCategory);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category} className="category-item">
            <button
              onClick={() => handleCategoryClick(category)}
              className="category-button"
            >
              {category}
              <span className="badge">
                {notes.filter(note => note.category === category).length}
              </span>
            </button>
            {expandedCategory === category && (
              <div className="notes-container">
                {filteredNotes.map((note) => (
                  <div key={note.id} className="note-card">
                    <h2 className="font-bold">{note.title}</h2>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}