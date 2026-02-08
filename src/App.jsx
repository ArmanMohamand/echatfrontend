// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import "./App.css";

// function App() {
//   return (
//     <div
//       className="
//             bg-linear-to-b from-black from-10% via-red-800 via-40% to-gray-900 to-90%
//       min-h-screen w-screen
//       overflow-x-hidden
//     "
//     >
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import "./App.css";

// function App() {
//   return (
//     <div
//       className="
//       bg-[url('/bgImage.svg')]
//       bg-contain
//     "
//     >
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext.jsx";

function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <div
      className="
      bg-linear-to-b from-black from-10% via-red-800 via-40% to-gray-900 to-90%
    "
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
