import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoUploader } from "../components/VideoUploader";
import { Button } from "../components/Button";
import brain from "../brain";
import { useUserGuardContext } from "app";

interface Transcription {
  job_id: string;
  status: string;
  text?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all transcriptions
  const fetchTranscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await brain.list_transcriptions();
      const data = await response.json();
      
      setTranscriptions(data);
    } catch (err) {
      console.error("Error fetching transcriptions:", err);
      setError("Failed to fetch transcriptions. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const handleUploadSuccess = (jobId: string) => {
    navigate(`/transcription/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Vid2PPT</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-2">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 mr-4">
                {user.displayName || user.email}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
            <Button
              variant="destructive"
              onClick={() => navigate("/logout")}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload a Video</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <VideoUploader onUploadSuccess={handleUploadSuccess} />
            </div>
          </section>

          {/* Recent Transcriptions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transcriptions</h2>
            
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-40">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center py-8">
                <p className="text-red-500">{error}</p>
                <Button onClick={fetchTranscriptions} className="mt-4">Try Again</Button>
              </div>
            ) : transcriptions.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center py-8">
                <p className="text-gray-500 mb-4">You haven't transcribed any videos yet.</p>
                <p className="text-gray-600">Upload a video to get started!</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transcriptions.map((transcription) => (
                      <tr key={transcription.job_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transcription.job_id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(transcription.status)}`}>
                            {transcription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/transcription/${transcription.job_id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

// Helper function to get status badge color
function getStatusBadgeColor(status: string): string {
  switch (status) {
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}