import React, { useState } from 'react';
import { Crown } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const Leaderboard = () => {
  // Sample data for the leaderboard
  const [topUsers, setTopUsers] = useState([
    { id: 1, name: "Bessie", time: "12h 27m", avatar: "/api/placeholder/100/100", rank: 1 },
    { id: 2, name: "Esther", time: "23h 47m", avatar: "/api/placeholder/100/100", rank: 2 },
    { id: 3, name: "Lily", time: "6h 03m", avatar: "/api/placeholder/100/100", rank: 3 },
  ]);

  const [tableUsers, setTableUsers] = useState([
    { id: 4, name: "Wendy", school: "Munich", section: "B", level: 3, time: "8h 36min" },
    { id: 5, name: "Wendy", school: "USA, Illinois", section: "B", level: 3, time: "8h 36min" },
    { id: 6, name: "Wendy", school: "Cape Town", section: "B", level: 3, time: "8h 36min" },
    { id: 7, name: "Dianne", school: "Toronto", section: "B", level: 3, time: "8h 36min" },
    { id: 8, name: "Jane", school: "Japa", section: "B", level: 3, time: "8h 36min" },
    { id: 9, name: "John", school: "Cambridge", section: "B", level: 3, time: "8h 36min" },
    { id: 10, name: "Sarah", school: "Paris", section: "A", level: 2, time: "10h 15min" },
    { id: 11, name: "Michael", school: "Berlin", section: "C", level: 4, time: "7h 22min" },
    { id: 12, name: "Emma", school: "Sydney", section: "A", level: 2, time: "9h 51min" },
    { id: 13, name: "David", school: "Tokyo", section: "D", level: 5, time: "6h 48min" },
    { id: 14, name: "Sophia", school: "Rome", section: "B", level: 3, time: "11h 05min" },
    { id: 15, name: "James", school: "Madrid", section: "C", level: 4, time: "8h 17min" },
    { id: 16, name: "Olivia", school: "Amsterdam", section: "A", level: 2, time: "12h 33min" },
    { id: 17, name: "Benjamin", school: "Moscow", section: "D", level: 5, time: "7h 59min" },
  ]);

  // Get crown color based on rank
  const getCrownColor = (rank: any) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-gray-400";
  };

  // Get circle color based on rank
  const getCircleColor = (rank: any) => {
    if (rank === 1) return "bg-yellow-100 border-yellow-400";
    if (rank === 2) return "bg-green-100 border-green-500";
    if (rank === 3) return "bg-blue-100 border-blue-500";
    return "bg-gray-100 border-gray-300";
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">Filter</h2>
          
          <div className="space-y-4">
            <div className="w-full">
              <Select>
                <div className="flex justify-between items-center border rounded-md p-3">
                  <span className="text-sm text-gray-500">School</span>
                  <span>⌄</span>
                </div>
              </Select>
            </div>
            
            <div className="w-full">
              <Select>
                <div className="flex justify-between items-center border rounded-md p-3">
                  <span className="text-sm text-gray-500">Level</span>
                  <span>⌄</span>
                </div>
              </Select>
            </div>
            
            <div className="w-full">
              <Select>
                <div className="flex justify-between items-center border rounded-md p-3">
                  <span className="text-sm text-gray-500">Ranking</span>
                  <span>⌄</span>
                </div>
              </Select>
            </div>
            
            <div className="w-full">
              <Select>
                <div className="flex justify-between items-center border rounded-md p-3">
                  <span className="text-sm text-gray-500">Level</span>
                  <span>⌄</span>
                </div>
              </Select>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
              Apply Filter
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3 bg-white px-6 rounded-lg shadow-sm">
          {/* Top 3 Users */}
          <div className="flex flex-wrap justify-center mb-10 gap-6">
            {topUsers.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <div className={`relative ${user.rank === 1 ? 'mt-0' : 'mt-4'}`}>
                  {user.rank === 1 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Crown className="w-10 h-10 text-yellow-400" />
                    </div>
                  )}
                  <div className={`relative w-24 h-24 rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}>
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-white">
                      <span className={`w-full h-full flex items-center justify-center rounded-full ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-green-500' : 'bg-blue-500'}`}>
                        {user.rank}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="font-semibold">{user.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {user.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Table for remaining users */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-2">No.</th>
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">School</th>
                  <th className="py-3 px-2">Section</th>
                  <th className="py-3 px-2">Level</th>
                  <th className="py-3 px-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {tableUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2 font-medium">{user.id}.</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                          <img src="/api/placeholder/40/40" alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-blue-600">View Profile →</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">{user.school}</td>
                    <td className="py-4 px-2">{user.section}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600">
                          {user.level}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {user.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;