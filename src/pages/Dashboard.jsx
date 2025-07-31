import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddResourceForm from "../components/AddResourceForm";
import ResourceCard from "../components/ResourceCard";
import { useAuth } from "../context/AuthContext";
import { getResources } from "../firestoreService";
import GoalTracker from "../components/GoalTracker";
import StatsDisplay from "../components/StatsDisplay";

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const unsubscribe = getResources(currentUser.uid, (fetchedResources) => {
      setResources(fetchedResources);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <StatsDisplay />

          <AddResourceForm />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <GoalTracker />
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-2xl text-white font-semibold mb-4">
                Your Resources
              </h3>
              {loading && <p className="text-white">Loading resources...</p>}

              {!loading && resources.length === 0 && (
                <div className="text-center py-10 bg-slate-800 rounded-lg">
                  <p className="text-gray-400">No resources found.</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
