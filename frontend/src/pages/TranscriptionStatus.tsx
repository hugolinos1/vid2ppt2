import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import brain from "../brain";

interface TranscriptionData {
  job_id: string;
  status: "processing" | "completed" | "failed";
  text?: string;
  error?: string;
}

export default function TranscriptionStatus() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  
  const [transcription, setTranscription] = useState<TranscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // For the generate PPT button
  const [generating, setGenerating] = useState(false);

  // Function to fetch transcription status
  const fetchTranscriptionStatus = async () => {
    if (!jobId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await brain.get_transcription_status({ job_id: jobId });
      const data = await response.json();
      
      setTranscription(data);
    } catch (err) {
      console.error("Error fetching transcription:", err);
      setError("Failed to fetch transcription status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch transcription status when the component mounts
  useEffect(() => {
    fetchTranscriptionStatus();
    
    // Poll for updates if status is processing
    let intervalId: number | null = null;
    
    if (transcription?.status === "processing") {
      intervalId = window.setInterval(() => {
        fetchTranscriptionStatus();
      }, 5000); // Poll every 5 seconds
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, transcription?.status]);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleNewTranscription = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Transcription Status</h1>
            <p className="text-gray-600">
              Job ID: {jobId}
            </p>
          </div>
          
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {loading && !transcription ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Fetching transcription status...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-red-800 mb-2">Error</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={handleBackToHome}>Back to Home</Button>
              </div>
            ) : transcription ? (
              <div>
                <div className="flex items-center mb-6">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(transcription.status)}`}></div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Status: <span className="capitalize">{transcription.status}</span>
                  </h3>
                </div>
                
                {transcription.status === "processing" && (
                  <div className="py-6 text-center">
                    <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 mb-2">Your video is being processed</p>
                    <p className="text-sm text-gray-500">This may take a few minutes depending on the length of your video</p>
                  </div>
                )}
                
                {transcription.status === "completed" && transcription.text && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Transcription Result:</h4>
                    <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96 mb-6">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700">{transcription.text}</pre>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button 
                        variant="outline"
                        onClick={handleNewTranscription}
                      >
                        New Transcription
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          // Copy to clipboard
                          navigator.clipboard.writeText(transcription.text)
                            .then(() => alert("Transcription copied to clipboard!"))
                            .catch(err => console.error("Failed to copy text: ", err));
                        }}
                      >
                        Copy Text
                      </Button>
                      <Button
                        isLoading={generating}
                        onClick={() => {
                          setGenerating(true);
                          // Future implementation: Generate PowerPoint
                          setTimeout(() => {
                            alert("PowerPoint generation will be implemented in a future update!");
                            setGenerating(false);
                          }, 1000);
                        }}
                      >
                        Generate PowerPoint
                      </Button>
                    </div>
                  </div>
                )}
                
                {transcription.status === "failed" && (
                  <div className="text-center py-6">
                    <div className="text-red-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-red-800 mb-2">Transcription Failed</h3>
                    <p className="text-gray-600 mb-6">{transcription.error || "An unknown error occurred."}</p>
                    <Button onClick={handleNewTranscription}>Try Again</Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No transcription data found.</p>
              </div>
            )}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case "processing":
      return "bg-yellow-400";
    case "completed":
      return "bg-green-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}