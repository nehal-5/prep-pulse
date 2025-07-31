import React, { useState } from "react";
import { deleteResource } from "../firestoreService";
import EditResourceModal from "./EditResourceModal";

const ResourceCard = ({ resource }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
    if (confirmDelete) {
      await deleteResource(resource.id);
    }
  };

  const getFavicon = (url) => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch (error) {
      return "default-favicon.png";
    }
  };

  return (
    <>
      <div className="bg-slate-800 rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-sky-500/20 hover:-translate-y-1 transition-all duration-300">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={getFavicon(resource.link)}
              alt="favicon"
              className="w-8 h-8 rounded-full bg-white p-1"
            />
            <h4 className="text-lg font-bold text-white truncate">{resource.title}</h4>
          </div>
          <p className="text-xs text-sky-400 bg-sky-900/50 inline-block px-2 py-1 rounded-full">
            {resource.category}
          </p>
        </div>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Open Link
        </a>
        <div className="mt-3 flex justify-between gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-2 rounded-md text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <EditResourceModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        resource={resource}
      />
    </>
  );
};

export default ResourceCard;
