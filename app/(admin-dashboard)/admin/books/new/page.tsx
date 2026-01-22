"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Category {
    id: number;
    name: string;
}

export default function AddNewBookPage(){

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string>("");
    const [generatingSummary, setGeneratingSummary] = useState(false);
    const [generatingAudio, setGeneratingAudio] = useState(false);
    const [summaryProgress, setSummaryProgress] = useState("");
    const [audioProgress, setAudioProgress] = useState("");
    const [bookId, setBookId] = useState<number | null>(null);






    return (
        <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
        <p className="text-gray-600 mt-2">
          Create a new book entry with AI-generated summary and audio
        </p>
      </div>

      <div>
        <form  className="space-y-6">
          
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
             general
            </div>
          

          {/* Book Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📚 Book Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value="title" 

                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value="author" 

                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value="categoryId" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                 
                    <option >
                    name
                    </option>
                  
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value="description" 

                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter book description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Cover Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*" 

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                
                    <img
                      src=" "
                      alt="Cover preview"
                      className="mt-2 w-32 h-48 object-cover rounded-lg border"
                    />
                  
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF File *
                  </label>
                  <input
                    type="file"
                    accept=".pdf" 

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                 
                    <p className="text-sm text-green-600 mt-2">
                      ✓ name
                    </p>
                  
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    name="publicationYear"
                    value="publicationYear" 

                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value="isbn" 

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="978-0-123456-78-9"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value="tags" 

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="business, finance"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🚀 Publishing Options
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"  

                  className="w-4 h-4 text-indigo-600"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                  Featured Book (Show on homepage)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished" 

                  className="w-4 h-4 text-indigo-600"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Publish Book (Make visible to users)
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 Keep unpublished while generating summary and audio
                </p>
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
              Create Book
            </button>
          </div>
        </form>

        {/* AI Summary Generation */}
        
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🤖 AI Summary Generation
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Generate AI-powered summary using ChatGPT
              </p>

              
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">summaryProgress</p>
                </div>
              

              <button
               
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              >
               Generate Summary with ChatGPT
              </button>
            </div>
          </div>
        

        {/* Audio Generation */}
        
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🎧 Audio Generation
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Generate audio using Text-to-Speech
              </p>

              
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800">audioProgress</p>
                </div>
               

              <button
              
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
              >
                🎧 Generate Audio
              </button>
            </div>
          </div>
         
      </div>
    </div>
    );
}