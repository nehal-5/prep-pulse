import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateGoalStatus, deleteGoal, updateUserActivity } from '../firestoreService';
import { useAuth } from '../context/AuthContext';

const GoalItem = ({ goal }) => {
  const { currentUser } = useAuth();
  const isCompleted = goal.status === 'Completed';
  const percentage = isCompleted ? 100 : 0;

  const handleToggleComplete = () => {
    const newStatus = isCompleted ? 'In Progress' : 'Completed';
    updateGoalStatus(goal.id, newStatus);
    if (newStatus === 'Completed' && currentUser) {
      updateUserActivity(currentUser.uid, 10);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(goal.id);
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between gap-4 shadow-md">
      <div style={{ width: 60, height: 60 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: isCompleted ? '#10B981' : '#38BDF8',
            pathColor: isCompleted ? '#10B981' : '#38BDF8',
            trailColor: '#475569',
          })}
        />
      </div>
      <p className={`flex-grow font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
        {goal.title}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 rounded-md text-sm font-bold text-white transition-colors ${isCompleted ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
        >
          {isCompleted ? 'Undo' : 'Done'}
        </button>
        <button 
          onClick={handleDelete}
          className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-sm font-bold text-white transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalItem;