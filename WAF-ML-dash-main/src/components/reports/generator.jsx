import { Lock } from "lucide-react";
import SettingSection from "../settings/SettingSection";
import HttpClients from "../../HttpClients";
import { useState } from "react";

const Generator = () => {
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportType, setReportType] = useState("requests"); // default report type

    const HandleSubmit = async () => {
        setError(null);
        const today = new Date().toISOString().split("T")[0];

        if ((startDate && startDate > today) || (endDate && endDate > today)) {
            setError("Start date and end date cannot be in the future.");
            return;
        }

        if (startDate && endDate && startDate > endDate) {
            setError("Start date cannot be after end date.");
            return;
        }

        setLoading(true);

        try {
            const params = new URLSearchParams();
            if (startDate) params.append('start_date', startDate);
            if (endDate) params.append('end_date', endDate);
            params.append('report_type', reportType);

            const response = await HttpClients.get(`/api/report?${params.toString()}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.setAttribute('download', `waf_report_${timestamp}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setReportData(response.data);
        } catch (error) {
            console.error("Error generating report", error);
            setError("Failed to generate report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <SettingSection icon={Lock} title={"Generate Report"}>
            <div className='mt-4 space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label className='text-gray-300'>Start Date</label>
                    <input
                        type='date'
                        max={maxDate}
                        className='bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-gray-300'>End Date</label>
                    <input
                        type='date'
                        max={maxDate}
                        className='bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-gray-300'>Report Type</label>
                    <select
                        className='bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="requests">Requests</option>
                        <option value="blocked">Blocked</option>
                        <option value="users">Users</option>
                    </select>
                </div>
                <button
                    className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
                    transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={HandleSubmit}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </SettingSection>
    );
};

export default Generator;
