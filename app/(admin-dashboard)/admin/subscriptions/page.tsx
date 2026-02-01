"use client";
import { useState,useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface SubscriptionOrder {
    id : number;
    planType: string;
    amount: string;
    currency: string;
    paymentMethod: string;
    paymentProofUrl: string | null;
    transactionReference: string | null;
    orderStatus: string;
    approvedBy: string | null;
    approvedAt: string | null;
    rejectedReason: string | null;
    notes: string | null;
    createdAt: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        subscriptionTier: string;
        subscriptionStatus: string;
    };
}


export default function SubscriptionPage(){

    const [orders, setOrders] = useState<SubscriptionOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("PENDING");
    const [processing, setProcessing] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders()
    },[filter]);


    async function fetchOrders(){
        try {
            const response = await fetch(`/api/admin/subscription-orders?status=${filter}`);
            if (response.ok) {
                const data = await response.json();
                console.log("order data", data);
                setOrders(data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    }





    return (
        <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Orders</h1>
        <p className="text-gray-600 mt-2">Review and approve subscription payments</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Orders</div>
          <div className="text-3xl font-bold text-gray-900">length</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">
           PENDING
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Approved</div>
          <div className="text-3xl font-bold text-green-600">
           Approved
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Rejected</div>
          <div className="text-3xl font-bold text-red-600">
           REJECTED
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          All Orders
        </button>
        <button
        
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Pending
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Approved
        </button>
        <button
          
          className={`px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white`}
        >
          Rejected
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
       
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <p className="text-gray-500">No subscription orders found.</p>
          </div>
        
         
            <div
              
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      planType Plan
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold  }`}
                    >
                     orderStatus
                    </span>
                  </div>
                  <Link
                    href={`/admin/users/id`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                  fullName
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    Current: subscriptionStatus
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                  currency
                  </p>
                  <p className="text-sm text-gray-600">
                    createdAt
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">paymentMethod</span>
                    </div>
                   
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference:</span>
                        <code className="text-xs bg-white px-2 py-1 rounded">
                        transactionReference
                        </code>
                      </div>
                    
                  </div>
                </div>

                {/* Payment Proof */}
               
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Proof</h4>
                    <img
                      src=""
                      alt="Payment proof"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90"
                     
                    />
                    <button
                      
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-2"
                    >
                      View Full Size →
                    </button>
                  </div>
                 
              </div>

              {/* Notes and Rejection Reason */}
             
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                 
                    <div className="mb-2">
                      <span className="font-semibold text-red-700">Rejection Reason: </span>
                      <span className="text-red-600">rejectedReason</span>
                    </div>
                
                  
                    <div>
                      <span className="font-semibold text-blue-800">Notes: </span>
                      <span className="text-blue-700">notes</span>
                    </div>
                 
                </div>
              

              {/* Actions */}
             
                <div className="flex items-center space-x-3">
                  <button
                   
                   
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                  >
                   Processing
                  </button>
                  <button
                    
                    
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
             

             
                <p className="text-sm text-gray-600">
                  Approved on approvedAt
                </p>
              
            </div>
          

      </div>

      {/* Image Modal */}
       
        {/* <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src=""
              alt="Payment proof"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
            <button
              
              className="absolute top-4 right-4 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div> */}
       
    </div>
    );
}