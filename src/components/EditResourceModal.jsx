import React, { useState, useEffect } from "react";
import { updateResource } from "../firestoreService";

const EditResourceModal = ({ isOpen, onClose, resource }) => {
  const [title, setTitle] = useState(resource.title);
  const [link, setLink] = useState(resource.link);
  const [category, setCategory] = useState(resource.category);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(resource.title);
      setLink(resource.link);
      setCategory(resource.category);
    }
  }, [isOpen, resource]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateResource(resource.id, { title, link, category });
      onClose();
    } catch (error) {
      alert("Update failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Edit Resource</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resource Title"
            className="w-full p-2 rounded-md bg-slate-700 text-white"
            required
          />
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://... link to resource"
            className="w-full p-2 rounded-md bg-slate-700 text-white"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-md bg-slate-700 text-white"
          >
            <option>DSA</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
            <option>Other</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResourceModal;
