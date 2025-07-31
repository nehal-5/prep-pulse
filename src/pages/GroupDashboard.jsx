import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import { useAuth } from '../context/AuthContext';
import { getGroupDetails, addSharedResource, getSharedResources } from '../firestoreService';

const GroupDashboard = () => {
  const { groupId } = useParams();
  const { currentUser } = useAuth();
  const [group, setGroup] = useState(null);
  const [sharedResources, setSharedResources] = useState([]);
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceLink, setNewResourceLink] = useState('');

  useEffect(() => {
    const unsubscribeGroup = getGroupDetails(groupId, setGroup);
    const unsubscribeResources = getSharedResources(groupId, setSharedResources);
    return () => {
      unsubscribeGroup();
      unsubscribeResources();
    };
  }, [groupId]);

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!newResourceTitle.trim() || !newResourceLink.trim()) return;
    const resourceData = {
      title: newResourceTitle,
      link: newResourceLink,
      category: 'Shared',
      userId: currentUser.uid,
      addedBy: currentUser.email,
      createdAt: new Date(),
    };
    await addSharedResource(groupId, resourceData);
    setNewResourceTitle('');
    setNewResourceLink('');
  };

  if (!group) return <div className="bg-slate-900 min-h-screen text-white text-center p-10">Loading group...</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-4xl font-bold text-sky-400 mb-2">{group.groupName}</h1>
        <p className="text-gray-400 mb-8">{group.members?.length} members</p>
        <form onSubmit={handleAddResource} className="bg-slate-800 p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-2">
          <input type="text" value={newResourceTitle} onChange={e => setNewResourceTitle(e.target.value)} placeholder="Resource Title" className="flex-grow bg-slate-700 text-white p-3 rounded-md" />
          <input type="url" value={newResourceLink} onChange={e => setNewResourceLink(e.target.value)} placeholder="https://..." className="flex-grow bg-slate-700 text-white p-3 rounded-md" />
          <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">Share Link</button>
        </form>
        <h2 className="text-2xl font-semibold text-white mb-4">Shared Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GroupDashboard;