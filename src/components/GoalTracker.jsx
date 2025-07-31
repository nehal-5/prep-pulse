import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addGoal, getGoals } from '../firestoreService';
import GoalItem from './GoalItem';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getGoals(currentUser.uid, setGoals);
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (newGoal.trim() === '') return;

    const goalData = {
      title: newGoal,
      status: 'In Progress',
      userId: currentUser.uid,
      createdAt: new Date(),
    };

    await addGoal(goalData);
    setNewGoal('');
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl text-white font-semibold mb-4">Weekly Goals</h3>
      <form onSubmit={handleAddGoal} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="e.g., Complete 2 DSA sheets"
          className="flex-grow bg-slate-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Add Goal
        </button>
      </form>
      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map(goal => <GoalItem key={goal.id} goal={goal} />)
        ) : (
          <p className="text-gray-400 text-center py-4">No goals set for this week. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;