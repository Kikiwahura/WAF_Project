import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import HttpClients from "../../HttpClients";
import { useNavigate } from "react-router-dom";

const Security = () => {
	const [twoFactor, setTwoFactor] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await HttpClients.get("/api/logout");
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<SettingSection icon={Lock} title={"Security"}>
			<div className='mt-4'>
				<button
					className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200'
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</SettingSection>
	);
};
export default Security;
