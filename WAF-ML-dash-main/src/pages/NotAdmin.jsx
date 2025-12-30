import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotAdmin = () => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 max-w-md w-full mx-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="bg-red-500 bg-opacity-20 p-4 rounded-full mb-6">
                        <Shield className="h-12 w-12 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-100 mb-2">Access Denied</h1>
                    <p className="text-gray-400 mb-8">
                        You don't have permission to access this page. This area is restricted to administrators only.
                    </p>
                    <Link
                        to="/dashboard"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Return to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotAdmin; 