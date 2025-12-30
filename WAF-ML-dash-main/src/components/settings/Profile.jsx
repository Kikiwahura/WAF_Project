import { useState, useEffect } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import HttpClients from "../../HttpClients"; // Ensure correct path

const Profile = () => {
	// Single state object for username & email
	const [profile, setProfile] = useState({
		username: "",
		email: "",
	});

	useEffect(() => {
		const request = async () => {
			try {
				const response = await HttpClients.get("/api/@me");

				// Update profile state
				setProfile({
					username: response.data.username || "",
					email: response.data.email || "",
				});
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};
		request();
	}, []); // Empty dependency array runs once on mount

	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://randomuser.me/api/portraits/lego/5.jpg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>
						{profile.username || "Loading..."}
					</h3>
					<p className='text-gray-400'>
						{profile.email || "email@example.com"}
					</p>
				</div>
			</div>
		</SettingSection>
	);
};

export default Profile;
