"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    subscriptionTier: string;
    subscriptionStatus: string;
    emailVerified: boolean;
    createdAt: string;
    _count?: {
        favorites: number;
        readingHistory: number;
        reviews: number;
    };
}

export default function UsersPage(){

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchUsers();
    },[]);

    async function fetchUsers(){
        try {
            const response = await fetch("/api/admin/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setLoading(false);
        }
    }



    return (
         <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">Manage user accounts and subscriptions</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-gray-900">length</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Premium Users</div>
          <div className="text-3xl font-bold text-indigo-600">
           Users
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Free Users</div>
          <div className="text-3xl font-bold text-gray-600">
            Users
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Verified Emails</div>
          <div className="text-3xl font-bold text-green-600">
          Users
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          All Users
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Premium
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Free
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Admins
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
            
                  <tr  className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          
                        </div>
                        <div className="ml-3">
                          <div className="font-semibold text-gray-900">fullName</div>
                           
                            <span className="text-xs text-green-600">✓ Verified</span>
                           
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">email</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700`}
                      >
                        role
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold  `}
                      >
                      subscriptionTier
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold $ `}
                      >
                      subscriptionStatus
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-600">
                        <div>  favorites</div>
                        <div>  reviews</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                       createdAt
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/users/id`}
                        className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}