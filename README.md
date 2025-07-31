# PrepPulse – Smart Study Resource Organizer 🧠

**PrepPulse** is a personal academic dashboard designed to help students organize study materials, track goals, and collaborate with peers in a gamified environment. It's a one-stop solution to streamline your learning process and stay motivated.

🔗 **Live Demo**: [PrepPulse](https://prep-pulse.netlify.app/)


## ✨ Key Features

- 📚 **Resource Organizer**:  
  Collect and categorize links to notes, YouTube videos, articles, and online courses. Features tag-based filtering and search for easy access.

- 🎯 **Goal & Task Tracker**:  
  Set weekly study goals and visually track your progress with circular progress bars.

- 🔐 **Secure Authentication**:  
  User-specific dashboards with secure Email/Password and Google authentication via Firebase.

- 🧑‍🤝‍🧑 **Collaborative Study Groups**:  
  Create or join public/private study groups. Share resources and notes on a common board.

- 🌱 **Gamified Learning**:  
  Stay motivated with a daily streak counter and an XP (Experience Points) system. Earn points for completing tasks and build a consistent study habit.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (with Vite)  
- **Styling**: Tailwind CSS  
- **Routing**: React Router  
- **State Management**: React Context API  
- **Visualizations**: [`react-circular-progressbar`](https://www.npmjs.com/package/react-circular-progressbar)

### Backend (BaaS)
- **Service**: Firebase  
  - **Authentication**: For user sign-up and login  
  - **Firestore**: NoSQL database for storing resources, goals, and user data  
  - **Hosting**: Deployed via Netlify with CI/CD
