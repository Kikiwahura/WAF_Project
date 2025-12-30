import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpClients from "../HttpClients";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        let strength = 0;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length >= minLength) strength += 1;
        if (hasUpperCase) strength += 1;
        if (hasLowerCase) strength += 1;
        if (hasNumbers) strength += 1;
        if (hasSpecialChar) strength += 1;

        return strength;
    };

    const getPasswordStrengthText = (strength) => {
        switch (strength) {
            case 0:
            case 1:
                return "Very Weak";
            case 2:
                return "Weak";
            case 3:
                return "Medium";
            case 4:
                return "Strong";
            case 5:
                return "Very Strong";
            default:
                return "Very Weak";
        }
    };

    const getPasswordStrengthColor = (strength) => {
        switch (strength) {
            case 0:
            case 1:
                return "bg-red-500";
            case 2:
                return "bg-orange-500";
            case 3:
                return "bg-yellow-500";
            case 4:
                return "bg-green-500";
            case 5:
                return "bg-green-600";
            default:
                return "bg-red-500";
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(validatePassword(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (passwordStrength < 3) {
            setError("Password is too weak. Please include uppercase, lowercase, numbers, and special characters.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await HttpClients.post("/api/register", formData.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });

            if (response.status === 200) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(response.data.message || "Registration failed");
            }
        } catch (error) {
            setError("Error connecting to server");
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center overflow-auto relative z-10 bg-gray-900">
            <div className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">Register</h2>
                {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                {success && <p className="text-green-400 text-sm mb-4 text-center">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div className="mt-2">
                            <div className="h-2 bg-gray-700 rounded-full">
                                <div
                                    className={`h-full rounded-full ${getPasswordStrengthColor(passwordStrength)} transition-all duration-300`}
                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                                Password Strength: {getPasswordStrengthText(passwordStrength)}
                            </p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
