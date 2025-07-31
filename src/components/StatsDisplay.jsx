import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../firestoreService';

const StatsDisplay = () => {
  const [profile, setProfile] = useState({ xp: 0, streak: 0 });
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getUserProfile(currentUser.uid, (userProfile) => {
        if (userProfile) {
          setProfile(userProfile);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="flex justify-center md:justify-start gap-6 mb-8">
      <div className="bg-slate-800 text-center p-4 rounded-lg shadow-lg w-36">
        <p className="text-4xl font-bold text-amber-400">{profile.xp}</p>
        <p className="text-sm text-gray-400">Total XP</p>
      </div>
      <div className="bg-slate-800 text-center p-4 rounded-lg shadow-lg w-36">
        <p className="text-4xl font-bold text-red-500">{profile.streak} 🔥</p>
        <p className="text-sm text-gray-400">Daily Streak</p>
      </div>
    </div>
  );
};

export default StatsDisplay;