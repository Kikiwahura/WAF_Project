import { Lock } from "lucide-react";
import SettingSection from "../settings/SettingSection";
import { useState } from "react";
import HttpClients from "../../HttpClients";

const Unblock = () => {
    const [ipInput, setIpInput] = useState("");

    const HandleSubmit = async () => {
        try {
            // Convert input string to an array (supports comma-separated input)
            const ipList = ipInput.split(",").map(ip => ip.trim());

            const response = await HttpClients.post("/api/unblock", 
                { ips: ipList }, // Correct JSON format
                { headers: { "Content-Type": "application/json" } }
            );
            
            alert("Unblocked: " + ipList.join(", "));
        } catch (error) {
            alert("Invalid ip or not Blocked");
        }
    };

    return (
        <SettingSection icon={Lock} title={"Unblock IP"}>
            <input
                type="text"
                placeholder="Enter IPs (comma-separated)"
                className="bg-gray-800 text-white p-2 rounded w-full"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
            />
            <div className='mt-4'>
                <button
                    className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200'
                    onClick={HandleSubmit}
                >
                    Unblock
                </button>
            </div>
        </SettingSection>
    );
};

export default Unblock;
