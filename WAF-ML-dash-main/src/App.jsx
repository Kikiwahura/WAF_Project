import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import BlockedPage from "./pages/BlockedPage";
import RequestsPage from "./pages/RequestsPage";
import Reports from "./pages/Reports";
import Management from "./pages/Management";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import UsersPage from "./pages/UsersPage";
import UserManual from "./pages/UserManual";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";

const App = () => {
	const location = useLocation();

	return (
		<div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
			{/* BG */}
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
				<div className="absolute inset-0 backdrop-blur-sm" />
			</div>

			{!(location.pathname === "/login" || location.pathname === "/register") && <Sidebar />}

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/dashboard" element={<ProtectedRoute><RequestsPage /></ProtectedRoute>} />
				<Route path="/blocklist" element={<ProtectedRoute><BlockedPage /></ProtectedRoute>} />
				<Route path="/manage" element={<ProtectedRoute><Management /></ProtectedRoute>} />
				<Route path="/reports" element={<ProtectedRoute requireAdmin><Reports /></ProtectedRoute>} />
				<Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
				<Route path="/users" element={<ProtectedRoute requireAdmin><UsersPage /></ProtectedRoute>} />
				<Route path="faq" element={<FAQ />} />
				<Route path="feedback" element={<Feedback />} />
				<Route path="/viewfeedback" element={<ProtectedRoute requireAdmin><AdminFeedback/></ProtectedRoute>} />
				<Route path="/manual" element={<UserManual />} />
				<Route path="/about" element={<About />} />

				<Route path="*" element={<ProtectedRoute><RequestsPage /></ProtectedRoute>} />
			</Routes>
		</div>
	);
};

export default App;
