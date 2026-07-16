import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const CreateListing = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'Good',
    category_id: '',
    location: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, category_id: data[0].category_id }));
      } catch (error) { console.error('Error fetching categories:', error); }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', formData);
      toast.success('Listing created successfully!');
      navigate('/marketplace');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
            <Input label="Price ($)" type="number" name="price" value={formData.price} onChange={handleChange} required />
            
            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>

            <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
              {categories.map(cat => <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>)}
            </select>

            <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., NSU Campus" />

            <Button type="submit" className="w-full" isLoading={loading}>Create Listing</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateListing;