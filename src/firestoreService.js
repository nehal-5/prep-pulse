import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Add a new resource
export const addResource = (resourceData) => {
  const resourcesCollection = collection(db, 'resources');
  return addDoc(resourcesCollection, resourceData);
};

// Get real-time resources for a user
export const getResources = (userId, callback) => {
  const resourcesCollection = collection(db, 'resources');
  const q = query(
    resourcesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      resources.push({ id: doc.id, ...doc.data() });
    });
    callback(resources);
  });

  return unsubscribe;
};

// Update a specific resource
export const updateResource = (resourceId, updatedData) => {
  const resourceRef = doc(db, 'resources', resourceId);
  return updateDoc(resourceRef, updatedData);
};

// Delete a specific resource
export const deleteResource = (resourceId) => {
  const resourceRef = doc(db, 'resources', resourceId);
  return deleteDoc(resourceRef);
};


// --- GOAL FUNCTIONS ---

// Function to add a new goal
export const addGoal = (goalData) => {
  const goalsCollection = collection(db, 'goals');
  return addDoc(goalsCollection, goalData);
};

// Function to get real-time updates of goals for a user
export const getGoals = (userId, callback) => {
  const goalsCollection = collection(db, 'goals');
  const q = query(
    goalsCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const goals = [];
    querySnapshot.forEach((goalDoc) => {
      goals.push({ id: goalDoc.id, ...goalDoc.data() });
    });
    callback(goals);
  });

  return unsubscribe;
};

// Function to update a goal's status
export const updateGoalStatus = (goalId, status) => {
  const goalDoc = doc(db, 'goals', goalId);
  return updateDoc(goalDoc, { status });
};

// Function to delete a goal
export const deleteGoal = (goalId) => {
  const goalDoc = doc(db, 'goals', goalId);
  return deleteDoc(goalDoc);
};

// src/firestoreService.js ... (at the end of the file)
import { setDoc, getDoc, serverTimestamp, increment } from 'firebase/firestore';

// --- USER PROFILE & GAMIFICATION FUNCTIONS ---

// Create a user profile document if it doesn't exist
export const createUserProfile = async (user) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      email: user.email,
      createdAt: serverTimestamp(),
      xp: 0,
      streak: 0,
      lastActivityDate: null,
      badges: []
    });
  }
};

// Get real-time updates for a user's profile
export const getUserProfile = (userId, callback) => {
  const userDocRef = doc(db, 'users', userId);
  return onSnapshot(userDocRef, (doc) => {
    callback(doc.exists() ? doc.data() : null);
  });
};


// src/firestoreService.js

// This function will award XP and update the user's streak
export const updateUserActivity = async (userId, xpPoints = 0) => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) return;

  const userData = userDoc.data();
  const today = new Date();
  const todayDateString = today.toDateString(); // "Wed Jul 30 2025"

  let newStreak = userData.streak || 0;
  const lastActivity = userData.lastActivityDate?.toDate();

  if (lastActivity) {
    const lastActivityDateString = lastActivity.toDateString();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDateString = yesterday.toDateString();

    if (lastActivityDateString === yesterdayDateString) {
      // Continued streak
      newStreak += 1;
    } else if (lastActivityDateString !== todayDateString) {
      // Streak broken
      newStreak = 1;
    }
    // If last activity was today, streak doesn't change.
  } else {
    // First activity ever
    newStreak = 1;
  }

  await updateDoc(userDocRef, {
    xp: increment(xpPoints),
    streak: newStreak,
    lastActivityDate: serverTimestamp()
  });
};


// src/firestoreService.js ... (at the end of the file)
import { arrayUnion, arrayRemove } from 'firebase/firestore';

// --- GROUP FUNCTIONS ---

// Create a new study group
export const createGroup = (groupData) => {
  const groupsCollection = collection(db, 'groups');
  return addDoc(groupsCollection, groupData);
};

// Get a list of all public groups
export const getPublicGroups = (callback) => {
  const q = query(collection(db, 'groups'), where("isPublic", "==", true));
  return onSnapshot(q, (querySnapshot) => {
    const groups = [];
    querySnapshot.forEach((doc) => {
      groups.push({ id: doc.id, ...doc.data() });
    });
    callback(groups);
  });
};

// Get groups that a specific user is a member of
export const getUserGroups = (userId, callback) => {
  const q = query(collection(db, 'groups'), where("members", "array-contains", userId));
  return onSnapshot(q, (querySnapshot) => {
    const groups = [];
    querySnapshot.forEach((doc) => {
      groups.push({ id: doc.id, ...doc.data() });
    });
    callback(groups);
  });
};

// Join a group by adding userId to the members array
export const joinGroup = (groupId, userId) => {
  const groupDocRef = doc(db, 'groups', groupId);
  return updateDoc(groupDocRef, {
    members: arrayUnion(userId)
  });
};

// Get details for a single group
export const getGroupDetails = (groupId, callback) => {
  const groupDocRef = doc(db, 'groups', groupId);
  return onSnapshot(groupDocRef, (doc) => {
    callback(doc.exists() ? { id: doc.id, ...doc.data() } : null);
  });
};

// --- GROUP RESOURCES FUNCTIONS ---

// Add a resource to a group's sub-collection
export const addSharedResource = (groupId, resourceData) => {
  const sharedResourcesCollection = collection(db, 'groups', groupId, 'sharedResources');
  return addDoc(sharedResourcesCollection, resourceData);
};

// Get real-time updates for a group's shared resources
export const getSharedResources = (groupId, callback) => {
  const q = query(collection(db, 'groups', groupId, 'sharedResources'), orderBy("createdAt", "desc"));
  return onSnapshot(q, (querySnapshot) => {
    const resources = [];
    querySnapshot.forEach((doc) => {
      resources.push({ id: doc.id, ...doc.data() });
    });
    callback(resources);
  });
};