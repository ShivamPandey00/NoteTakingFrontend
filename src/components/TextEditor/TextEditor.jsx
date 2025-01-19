import React, { useCallback, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './Editor.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchWithAuth } from '../api';

export default function TextEditor() {
  const [formData, setFormData] = useState({ title: '', category: '', content: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.note) {
      setFormData(location.state.note);
    }
  }, [location.state]);

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement('div');
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: 'snow'
    });

    quill.on('text-change', () => {
      setFormData(prevFormData => ({
        ...prevFormData,
        content: quill.root.innerHTML
      }));
    });

    if (location.state && location.state.note) {
      quill.root.innerHTML = location.state.note.content;
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth('https://app-deployment-latest.onrender.com/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/notes');
      } else {
        console.error('Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="content">Content</Label>
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            <div ref={wrapperRef}></div>
          </div>
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Save Note
        </Button>
      </form>
    </div>
  );
}