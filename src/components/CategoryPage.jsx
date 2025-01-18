import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from './api';
import './demo/CategoryPage.css';

export function CategoryPage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const navigate = useNavigate();

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

  const handleEditNote = (note) => {
    navigate('/TextEditor', { state: { note } }); // Navigate to the TextEditor page with note data
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
              <Table className="notes-table expanded w-full max-w-4xl mx-auto mt-4">
                <TableCaption>Notes in category {category}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotes.map((note) => (
                    <TableRow key={note.id} onClick={() => handleEditNote(note)} className="cursor-pointer">
                      <TableCell className="font-medium">{note.id}</TableCell>
                      <TableCell>{note.title}</TableCell>
                      <TableCell>{note.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total Notes: {filteredNotes.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}