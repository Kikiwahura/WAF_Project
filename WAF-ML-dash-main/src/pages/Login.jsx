import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpClients from "../HttpClients";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
      });
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async () => {


        try {
            const response = await HttpClients.post("/api/login", {
                email: input.username,  
                password: input.password
            }, {headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }});
        
            if (response.status === 200) {
                const userData = response.data; // Assuming the response contains user data
                
                if (userData.is_active && userData.is_approved) {
                    navigate("/dashboard");
                } else if (!userData.is_active) {
                    alert("Your account is not active.");
                } else if (!userData.is_approved) {
                    alert("Your account has not been approved yet.");
                }
            } else if (response.status === 401) {
                // Handle 401 Unauthorized response
                alert("Invalid username or password");
            } else {
                // Handle other unsuccessful responses
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
        
        };
    
    const handleInput = (e) => {
            const { name, value } = e.target;
            setInput((prev) => ({
              ...prev,
              [name]: value,
            }));
          };

    return (
        <div className="flex-1 flex items-center justify-center overflow-auto relative z-10 bg-gray-900">
            {/* Centered Login Box */}
            <div className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">Login</h2>
                {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2">Email or Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            name="username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInput}
                            name="password"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-sm mt-4 text-center">
                    Dont have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;