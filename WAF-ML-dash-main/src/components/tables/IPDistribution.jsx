import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import HttpClients from "../../HttpClients";

const API_URL = "/api/requests"; // Update with your API endpoint

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FED766", "#2AB7CA", "#A569BD", "#F39C12"];

const IpDistribution = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await HttpClients.get("/api/requests");
				const result = response.data;

				// Count occurrences of each IP address
				const ipCount = result.reduce((acc, log) => {
					acc[log.ip_address] = (acc[log.ip_address] || 0) + 1;
					return acc;
				}, {});

				// Convert to array format for Recharts
				const chartData = Object.keys(ipCount).map((ip) => ({
					name: ip,
					value: ipCount[ip],
				}));

				setData(chartData);
			} catch (err) {
				setError("Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p className="text-gray-200">Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-xl font-semibold text-gray-100 mb-4">IP Address Distribution</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							outerRadius={90}
							fill="#8884d8"
							dataKey="value"
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default IpDistribution;
