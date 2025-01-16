import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import '@/index.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/notes/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data["Login successful"];
        localStorage.setItem('authToken', token); // Store the token in localStorage
        navigate('/notes'); // Redirect to NoteLists page
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("login-form-container ", className)} {...props}>
      <Card className="login-card shadow-lg rounded-lg p-6 bg-white">
        <CardHeader className="login-card-header text-center">
          <CardTitle className="login-card-title text-3xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="login-card-description text-gray-600">Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="login-form-grid grid gap-4">
              <div className="login-form-group grid gap-2">
                <Label htmlFor="username" className="login-form-label text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="login-form-input border border-gray-300 rounded-md p-2 bg-white"
                />
              </div>
              <div className="login-form-group grid gap-2">
                <div className="login-form-flex flex items-center justify-between">
                  <Label htmlFor="password" className="login-form-label text-gray-700">Password</Label>
                  <a
                    href="#"
                    className="login-form-link text-sm text-blue-500 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="login-form-input border border-gray-300 rounded-md p-2 bg-white"
                />
              </div>
              {error && <div className="login-form-error text-red-500">{error}</div>}
              <Button type="submit" className="login-form-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Link to="/signup" className="SignUp-form-link text-sm text-blue-500 hover:underline">
                New User? Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}