import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import HttpClients from "../../HttpClients";

const BlockedTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Fetch logs from Flask API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await HttpClients.get("/api/blocked");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  // Filter logs based on search term
  const filteredLogs = logs
    .filter((log) =>
      log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip_address.includes(searchTerm) ||
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.blocked_at) - new Date(a.blocked_at));

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Blocked Requests</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search by IP, URL, reason, or status...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>IP Address</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>URL</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Blocked At</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Reason</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {currentLogs.length > 0 ? (
              currentLogs.map((log) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-gray-300'>{log.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-300'>{log.ip_address}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-300 truncate max-w-xs'>{log.url}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-300'>{new Date(log.blocked_at).toLocaleString()}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-300'>{log.reason}</td>
                  <td className={`px-6 py-4 whitespace-nowrap font-semibold ${log.status === "blocked" ? "text-red-400" : "text-green-400"}`}>{log.status}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='px-6 py-4 text-center text-gray-400'>No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center justify-between mt-4'>
        <div className='text-sm text-gray-400'>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
        </div>
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className='text-gray-300'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlockedTable;