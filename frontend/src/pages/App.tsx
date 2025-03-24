import React from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Vid2PPT</h1>
        </div>
        <div>
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button 
            variant="default" 
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <div className="py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Video Presentations into PowerPoint Slides
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Automatically extract key points and screenshots from your videos to create professional presentations in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg"
                onClick={() => navigate("/dashboard")}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551184451-76b792a9a4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80" 
                alt="Vid2PPT Demo" 
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 md:py-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Automated Transcription</h4>
              <p className="text-gray-600">
                Our advanced AI automatically transcribes your video content with high accuracy, supporting multiple languages.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Smart Key Points Extraction</h4>
              <p className="text-gray-600">
                Extract the most important points from your presentation with timestamps, allowing for perfect slide generation.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Professional PowerPoint Generation</h4>
              <p className="text-gray-600">
                Generate beautiful, professional PowerPoint presentations with perfectly timed screenshots and key points.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 md:py-20 bg-gray-50 rounded-xl my-10">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 md:mb-0">1</div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">Upload Your Video</h4>
                <p className="text-gray-600">Simply upload your presentation video in any common format (up to 30 minutes in length).</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 md:mb-0">2</div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">AI Processing</h4>
                <p className="text-gray-600">Our AI transcribes the content, identifies key points, and captures relevant screenshots.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 md:mb-0">3</div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">Download Your PowerPoint</h4>
                <p className="text-gray-600">Receive a notification when your PowerPoint is ready, then download and use it immediately.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 md:py-20 text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Save Hours on Presentation Creation?  
          </h3>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who are creating presentations in minutes instead of hours.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
            onClick={() => navigate("/signup")}
          >
            Get Started For Free
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-8 md:mb-0">
              <h1 className="text-2xl font-bold text-blue-600 mb-4">Vid2PPT</h1>
              <p className="text-gray-600 max-w-xs">
                Automatically convert video presentations to PowerPoint slides with key points and screenshots.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Enterprise</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Vid2PPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
