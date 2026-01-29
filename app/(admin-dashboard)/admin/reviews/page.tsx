"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Review {
    id: number;
    rating: number;
    reviewTitle: string | null;
    reviewText: string | null;
    isVerifiedPurchase: boolean;
    isApproved: boolean;
    helpfulCount: number;
    createdAt: string;
    book:{
        id: number;
        title: string;
        author: string;
        coverImageUrl: string | null;
    };
    user: {
        id: string;
        fullName: string;
        email: string;
    };
}

export default function ReviewsPage(){
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [updating, setUpdating] = useState<number | null>(null);



    return (
         <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600 mt-2">Manage user book reviews and ratings</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Reviews</div>
          <div className="text-3xl font-bold text-gray-900">length</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Average Rating</div>
          <div className="text-3xl font-bold text-yellow-600">averageRating ★</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Approved</div>
          <div className="text-3xl font-bold text-green-600">
           Approved
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-3xl font-bold text-orange-600">
            Pending
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          All Reviews
        </button>
        <button
         
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Approved
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Pending
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Verified Purchase
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
          
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <p className="text-gray-500">No reviews found.</p>
          </div>
        
           
            <div
            
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                {/* Book Cover */}
               
                  <img
                    src=""
                    alt=""
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        href={`/admin/books/id/details`}
                        className="text-lg font-bold text-gray-900 hover:text-indigo-600"
                      >
                     title
                      </Link>
                      <p className="text-sm text-gray-600">author</p>
                    </div>
                    <div className="flex items-center space-x-1">
                       
                        <span
                        
                          className={`text-xl text-yellow-400`}
                        >
                          ★
                        </span>
                      
                    </div>
                  </div>

                  {/* Review Title */}
                
                    <h3 className="font-semibold text-gray-900 mb-2">reviewTitle</h3>
                  

                  {/* Review Text */}
                 
                    <p className="text-gray-700 mb-3">reviewText</p>
                  

                  {/* Review Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <Link
                      href={`/admin/users/id`}
                      className="hover:text-indigo-600 font-medium"
                    >
                    fullName
                    </Link>
                    <span>•</span>
                    <span>createdAt</span>
                    
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">✓ Verified Purchase</span>
                      </>
                   
                    <span>•</span>
                    <span>  found helpful</span>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700`}
                    >
                     Pending Approval
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <button
                      
                     
                      className={`px-4 py-2 rounded-lg text-sm font-semibold bg-orange-100 text-orange-700 disabled:opacity-50`}
                    >
                     Approve
                    </button>
                    <button
                      
                       
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          
       
      </div>
    </div>
    );
}