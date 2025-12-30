import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import HttpClients from "../../HttpClients";

const RequestsChart = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await HttpClients.get("/api/requests");
				const result = response.data;

				// Group requests by date
				const groupedData = result.reduce((acc, log) => {
					const date = log.timestamp.split("T")[0]; // Extract YYYY-MM-DD
					acc[date] = (acc[date] || 0) + 1; // Count requests per day
					return acc;
				}, {});

				// Convert grouped data into an array for Recharts
				const chartData = Object.keys(groupedData).map((date) => ({
					date,
					requests: groupedData[date],
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
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-xl font-semibold text-gray-100 mb-4">Requests Per Day</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis dataKey="date" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type="monotone" dataKey="requests" stroke="#8B5CF6" strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default RequestsChart;
