import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { createGroup, getPublicGroups, getUserGroups, joinGroup } from '../firestoreService';

const GroupsPage = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [publicGroups, setPublicGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsubscribeMyGroups = getUserGroups(currentUser.uid, setMyGroups);
      const unsubscribePublicGroups = getPublicGroups(setPublicGroups);
      return () => {
        unsubscribeMyGroups();
        unsubscribePublicGroups();
      };
    }
  }, [currentUser]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim() || !currentUser) return;
    const groupData = {
      groupName: newGroupName,
      createdBy: currentUser.uid,
      members: [currentUser.uid],
      isPublic: true,
      createdAt: new Date(),
    };
    await createGroup(groupData);
    setNewGroupName('');
  };

  const handleJoinGroup = (groupId) => {
    joinGroup(groupId, currentUser.uid);
  };

  const userIsMember = (group) => group.members.includes(currentUser.uid);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Study Groups</h1>
        <form onSubmit={handleCreateGroup} className="bg-slate-800 p-4 rounded-lg mb-8 flex gap-2">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name..."
            className="flex-grow bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md">Create Group</button>
        </form>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myGroups.map(group => (
              <Link to={`/group/${group.id}`} key={group.id} className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold text-sky-400">{group.groupName}</h3>
                <p className="text-sm text-gray-400">{group.members.length} members</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Discover Groups</h2>
          <div className="space-y-3">
            {publicGroups.map(group => (
              <div key={group.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">{group.groupName}</h3>
                  <p className="text-sm text-gray-400">{group.members.length} members</p>
                </div>
                {!userIsMember(group) && (
                  <button onClick={() => handleJoinGroup(group.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md">Join</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupsPage;