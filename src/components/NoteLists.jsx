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
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function NoteLists() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notes data from the backend
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8080/notes/list');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNewNote = () => {
    navigate('/TextEditor'); // Navigate to the create note page
  };

  const handleEditNote = (note) => {
    navigate('/TextEditor', { state: { note } }); // Navigate to the TextEditor page with note data
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/notes/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
        alert('Note deleted successfully');
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Table className="w-full max-w-4xl mx-auto">
        <TableCaption>A list of your notes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.sort((a, b) => a.title.localeCompare(b.title)).map((note, index) => (
            <TableRow key={note.id} onClick={() => handleEditNote(note)} className="cursor-pointer">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.category}</TableCell>
              <TableCell>
                <Button onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Notes: {notes.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button
        onClick={handleCreateNewNote}
        className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create New Note
      </Button>
    </div>
  );
}