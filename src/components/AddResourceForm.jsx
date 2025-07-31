import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addResource } from '../firestoreService';

const AddResourceForm = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('DSA'); // Default category
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !link || !category) {
      alert('Please fill all fields');
      return;
    }

    const newResource = {
      title,
      link,
      category,
      userId: currentUser.uid, // Associate resource with the logged-in user
      createdAt: new Date(),
    };

    try {
      await addResource(newResource); 
      setTitle('');
      setLink('');
    } catch (error) {
      console.error("Error adding resource: ", error);
      alert('Failed to add resource.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl text-white font-semibold mb-4">Add a New Resource</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resource Title (e.g., Striver's SDE Sheet)"
            className="col-span-1 md:col-span-1 bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://... link to resource"
            className="col-span-1 md:col-span-1 bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="col-span-1 md:col-span-1 bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option>DSA</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit" className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
          {loading ? 'Adding...' : 'Add Resource'}
        </button>
      </form>
    </div>
  );
};

export default AddResourceForm;