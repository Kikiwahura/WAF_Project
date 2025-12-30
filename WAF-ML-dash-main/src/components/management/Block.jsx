import { Lock } from "lucide-react";
import SettingSection from "../settings/SettingSection";
import { useState } from "react";
import HttpClients from "../../HttpClients";

const Block = () => {
    const [ipInput, setIpInput] = useState("");

    const HandleSubmit = async () => {
        try {
            // Convert input string to an array (supports comma-separated input)
            const ipList = ipInput.split(",").map(ip => ip.trim());

            const response = await HttpClients.post("/api/block", 
                { ips: ipList }, // Correct JSON format
                { headers: { "Content-Type": "application/json" } }
            );

            alert("Blocked: " + ipList.join(", "));
        } catch (error) {
            alert("Invalid ip or already blocked");
        }
    };

    return (
        <SettingSection icon={Lock} title={"Block IP"}>
            <input
                type="text"
                placeholder="Enter IPs (comma-separated)"
                className="bg-gray-800 text-white p-2 rounded w-full"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
            />
            <div className='mt-4'>
                <button
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200'
                    onClick={HandleSubmit}
                >
                    Block
                </button>
            </div>
        </SettingSection>
    );
};

export default Block;
