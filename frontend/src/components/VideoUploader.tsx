import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import brain from "../brain";

interface Props {
  onUploadSuccess?: (jobId: string) => void;
  className?: string;
}

const VideoUploader: React.FC<Props> = ({ onUploadSuccess, className = "" }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setError(null);
    
    if (!selectedFile) {
      return;
    }
    
    // Check if file is a video
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-flv', 'video/x-matroska'];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid video file (MP4, MOV, AVI, WMV, FLV, MKV)");
      return;
    }
    
    // Check if file size is less than 200MB
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes
    if (selectedFile.size > maxSize) {
      setError("File size exceeds the 200MB limit");
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      // Upload the file
      const response = await brain.upload_video_for_transcription(formData);
      const data = await response.json();
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (onUploadSuccess) {
        onUploadSuccess(data.job_id);
      } else {
        // Navigate to the status page if no callback is provided
        navigate(`/transcription/${data.job_id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    // Check if file is a video
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-flv', 'video/x-matroska'];
    if (!validTypes.includes(droppedFile.type)) {
      setError("Please upload a valid video file (MP4, MOV, AVI, WMV, FLV, MKV)");
      return;
    }
    
    // Check file size
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes
    if (droppedFile.size > maxSize) {
      setError("File size exceeds the 200MB limit");
      return;
    }

    setFile(droppedFile);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 ${isUploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'} transition-colors cursor-pointer text-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isUploading && document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="py-6">
            <div className="mb-2 text-blue-600 font-medium">Uploading {file?.name}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-gray-500 text-sm">{uploadProgress}% uploaded</div>
          </div>
        ) : file ? (
          <div className="py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-gray-700">{file.name}</p>
            <p className="mt-1 text-sm text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Drag and drop your video file
            </p>
            <p className="mt-2 text-gray-500">
              or <span className="text-blue-600 font-medium">browse</span> to select a file
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Supported formats: MP4, MOV, AVI, WMV, FLV, MKV (max 200MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`w-full md:w-auto ${!file || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>
      </div>
    </div>
  );
};

export { VideoUploader };
export type { Props as VideoUploaderProps };