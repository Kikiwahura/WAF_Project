import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, User, Mail, Shield, Trash2, Edit2 , Archive, Check} from "lucide-react";
import HttpClients from "../HttpClients";
import Header from "../components/common/Header";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: "",
        email: "",
        password: "",
        is_admin: false
    });
    const recordsPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await HttpClients.get("/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Handle page changes
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Handle user actions
    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditForm({
            username: user.username,
            email: user.email,
            password: "",
            is_admin: user.is_admin || false
        });
    };

    const handleUpdateUser = async () => {
        try {
            const response = await HttpClients.put(`/api/users/${editingUser.id}`, editForm);
            setUsers(users.map(user => 
                user.id === editingUser.id ? response.data : user
            ));
            setEditingUser(null);
            setEditForm({ username: "", email: "", password: "", is_admin: false });
        } catch (error) {
            console.error("Error updating user:", error);
            alert(error.response?.data?.error || "Failed to update user");
        }
    };

    const handleApproveUser = async (email) => {
        try {
            await HttpClients.post("/api/approve", { email });
            setUsers(users.map(user =>
                user.email === email ? { ...user, approved: true } : user
            ));
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to archive this user?")) {
            try {
                await HttpClients.delete(`/api/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(error.response?.data?.error || "Failed to delete user");
            }
        }
    };

    if (loading) return <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-200">Loading users...</p>
    </div>;

    if (error) return <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
    </div>;

    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="User Management" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Approval Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                                                            <User className="h-6 w-6 text-gray-300" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-200">
                                                            {user.username}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <div className="text-sm text-gray-300">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.is_admin 
                                                            ? "bg-purple-100 text-purple-800" 
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                        {user.is_admin ? "Admin" : "ICT Staff"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.approved
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {user.approved  ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-4">

                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="flex items-center text-red-400 hover:text-red-300"
                                                        title="Archive User"
                                                    >
                                                        <Archive className="h-5 w-5 mr-2" />
                                                        <span>Archive</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleApproveUser(user.email)}
                                                        className="flex items-center text-green-400 hover:text-green-300"
                                                        title="Approve User"
                                                    >
                                                        <Check className="h-5 w-5 mr-2" />
                                                        <span>Approve</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center">
                            <button
                                className="text-sm text-gray-300 hover:text-gray-100"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="mx-2 text-sm text-gray-400">{currentPage} of {totalPages}</span>
                            <button
                                className="text-sm text-gray-300 hover:text-gray-100"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default UsersPage;
