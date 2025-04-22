import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Ensure the correct path to Navbar
import { getNumberColor } from "../utils/NumberColorUtil"; // Adjust path if needed

export default function AdminSpinHistory() {
  const [spins, setSpins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/spins")
      .then((res) => res.json())
      .then((data) => {
        setSpins(data.spins || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching spin history:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* Place Navbar at the top of the page */}
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-500">Admin: Spin History</h1>

        {loading ? (
          <p>Loading spin history...</p>
        ) : spins.length === 0 ? (
          <p>No spins found.</p>
        ) : (
          <table className="min-w-full table-auto border border-gray-600">
            <thead>
              <tr className="bg-zinc-800 text-yellow-400">
                <th className="px-4 py-2 border border-gray-600">Spin ID</th>
                <th className="px-4 py-2 border border-gray-600">Result</th>
                <th className="px-4 py-2 border border-gray-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {spins.map((spin) => {
                const color = getNumberColor(Number(spin.result));
                return (
                  <tr key={spin.spin_id} className="hover:bg-zinc-800 text-center">
                    <td className="px-4 py-2 border border-gray-700">{spin.spin_id}</td>
                    <td className="px-4 py-2 border border-gray-700">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white mx-auto ${
                          color === "red"
                            ? "bg-red-500"
                            : color === "black"
                            ? "bg-black"
                            : "bg-green-600"
                        }`}
                      >
                        {spin.result}
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {new Date(spin.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}