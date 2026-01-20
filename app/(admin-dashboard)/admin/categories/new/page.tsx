"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function NewCategoryPage(){

    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "",
        displayOrder: 0,
        isActive: true
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
        }));
    }



    return (
         <div className="max-w-3xl mx-auto">
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
    <p className="text-gray-600 mt-2">Create a new book category</p>
    </div>

    <form className="space-y-6">
    
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        general
        </div>
    

    {/* Category Information */}
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
        Category Information
        </h2>
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
            </label>
            <input
            type="text"
            name="name" 

            required
            placeholder="e.g., Business, Self-Help, Technology"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            
            <p className="mt-1 text-sm text-red-600">name</p>
            
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
            </label>
            <textarea
            name="description" 

            rows={3}
            placeholder="Brief description of this category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            
            <p className="mt-1 text-sm text-red-600">description</p>
            
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Icon (Emoji or Text)
            </label>
            <div className="flex items-center space-x-3">
            <input
                type="text"
                name="icon"
                
                placeholder="📚"
                maxLength={10}
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl"
            />
            
                <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Preview:</span>
                <span className="text-3xl">icon</span>
                </div>
            
            </div>
            <p className="mt-1 text-xs text-gray-500">
            Enter an emoji or short text (e.g., 📚, 💼, 🧠)
            </p>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Order
            </label>
            <input
            type="number"
            name="displayOrder" 

            min="0"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
            Lower numbers appear first
            </p>
        </div>

        <div className="flex items-center space-x-3">
            <input
            type="checkbox"
            id="isActive"
            name="isActive" 

            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Active (Visible to users)
            </label>
        </div>
        </div>
    </div>

    {/* Action Buttons */}
    <div className="flex items-center justify-end space-x-4">
        <button
        type="button"
            
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
        
        >
        Cancel
        </button>
        <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
            
        >
        Create Category
        </button>
    </div>
    </form>
</div>
    );
}

