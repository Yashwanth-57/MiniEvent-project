import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

import { useSelector } from "react-redux";


import ProtectedRoute from "./components/ProtectedRoute";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";
import JoinedEvents from "./pages/JoinedEvents";
import EditEvent from "./pages/EditEvent";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./pages/EventPage";



function App() {


  const { isAuthenticated } = useSelector(state => state.auth);

  
  return (
    
     <>
       {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       <Route
  path="/my-events"
  element={
    <ProtectedRoute>
      <MyEvents />
    </ProtectedRoute>
  }
/>

<Route
  path="/joined-events"
  element={
    <ProtectedRoute>
      <JoinedEvents />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-event"
  element={
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  }
/>
      <Route
      path="/events/:id"
      element ={
        <ProtectedRoute>
          <EventPage/>
        </ProtectedRoute>
      }
      />
      

<Route
  path="/events/:id/edit"
  element={
    <ProtectedRoute>
      <EditEvent />
    </ProtectedRoute>
  }
/>

                     

        {/* You can add more protected routes like */}
        {/* /my-events, /joined-events, /profile */}
      </Routes>

       <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      </>
    
  );
}

export default App;

