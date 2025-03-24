import os
import uuid
import tempfile
from typing import List, Optional

import databutton as db
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from pydantic import BaseModel
from openai import OpenAI
import json
import subprocess

# Initialize the router
router = APIRouter()

# Initialize the OpenAI client
client = OpenAI(api_key=db.secrets.get("OPENAI_API_KEY"))

# Models for request and response
class TranscriptionResponse(BaseModel):
    """Response model for the transcription endpoint"""
    job_id: str
    status: str
    message: str

class TranscriptionResult(BaseModel):
    """Model for transcription result"""
    job_id: str
    status: str
    text: Optional[str] = None
    error: Optional[str] = None

class TranscriptionJobStatus(BaseModel):
    """Model for checking transcription job status"""
    job_id: str

# Helper functions
def sanitize_storage_key(key: str) -> str:
    """Sanitize storage key to only allow alphanumeric and ._- symbols"""
    return "".join(c for c in key if c.isalnum() or c in "._-")

def extract_audio_from_video(video_path: str, output_path: str) -> bool:
    """Extract audio from video using ffmpeg subprocess"""
    try:
        # Use ffmpeg to extract audio from video
        command = [
            "ffmpeg", "-i", video_path, "-vn", "-acodec", "libmp3lame", 
            "-q:a", "4", output_path, "-y"
        ]
        subprocess.run(command, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error extracting audio: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

async def process_video_transcription(job_id: str, video_file_path: str):
    """Background task to process video transcription"""
    try:
        # Create temporary files for processing
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as audio_temp:
            audio_path = audio_temp.name
        
        # Extract audio from video
        if not extract_audio_from_video(video_file_path, audio_path):
            # Update job status to failed
            result = TranscriptionResult(
                job_id=job_id,
                status="failed",
                error="Failed to extract audio from video"
            )
            db.storage.json.put(sanitize_storage_key(f"transcription_job_{job_id}"), result.model_dump())
            return
        
        # Transcribe audio using OpenAI's Whisper API
        try:
            with open(audio_path, "rb") as audio_file:
                transcription = client.audio.transcriptions.create(
                    file=audio_file,
                    model="whisper-1"
                )
            
            # Store the transcription result
            result = TranscriptionResult(
                job_id=job_id,
                status="completed",
                text=transcription.text
            )
            db.storage.json.put(sanitize_storage_key(f"transcription_job_{job_id}"), result.model_dump())
        
        except Exception as e:
            # Update job status to failed
            result = TranscriptionResult(
                job_id=job_id,
                status="failed",
                error=str(e)
            )
            db.storage.json.put(sanitize_storage_key(f"transcription_job_{job_id}"), result.model_dump())
        
        # Clean up temporary files
        os.unlink(audio_path)
        os.unlink(video_file_path)
        
    except Exception as e:
        # Handle any unexpected errors
        result = TranscriptionResult(
            job_id=job_id,
            status="failed",
            error=f"Unexpected error: {str(e)}"
        )
        db.storage.json.put(sanitize_storage_key(f"transcription_job_{job_id}"), result.model_dump())
        
        # Clean up temporary files if they exist
        try:
            if os.path.exists(audio_path):
                os.unlink(audio_path)
            if os.path.exists(video_file_path):
                os.unlink(video_file_path)
        except Exception:
            pass

# API Endpoints
@router.post("/upload-video")
async def upload_video_for_transcription(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
) -> TranscriptionResponse:
    """Upload a video file for transcription"""
    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Get file extension to validate video format
    file_ext = os.path.splitext(file.filename)[1].lower()
    valid_extensions = [".mp4", ".mov", ".avi", ".wmv", ".flv", ".mkv"]
    
    if file_ext not in valid_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file format. Supported formats: {', '.join(valid_extensions)}"
        )
    
    # Generate unique job ID
    job_id = str(uuid.uuid4())
    
    try:
        # Save uploaded file to temporary location
        with tempfile.NamedTemporaryFile(suffix=file_ext, delete=False) as temp_file:
            temp_file.write(await file.read())
            video_path = temp_file.name
        
        # Initialize job status
        initial_status = TranscriptionResult(
            job_id=job_id,
            status="processing"
        )
        db.storage.json.put(sanitize_storage_key(f"transcription_job_{job_id}"), initial_status.model_dump())
        
        # Start background processing
        background_tasks.add_task(process_video_transcription, job_id, video_path)
        
        return TranscriptionResponse(
            job_id=job_id,
            status="processing",
            message="Video uploaded successfully. Transcription is being processed."
        )
    
    except Exception as e:
        # Clean up in case of error
        if 'video_path' in locals() and os.path.exists(video_path):
            os.unlink(video_path)
        
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@router.get("/transcription-status/{job_id}")
async def get_transcription_status(job_id: str) -> TranscriptionResult:
    """Get the status of a transcription job"""
    try:
        # Retrieve job status from storage
        job_data = db.storage.json.get(sanitize_storage_key(f"transcription_job_{job_id}"), default=None)
        
        if not job_data:
            raise HTTPException(status_code=404, detail="Transcription job not found")
        
        return TranscriptionResult(**job_data)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving transcription status: {str(e)}")

@router.get("/list-transcriptions")
async def list_transcriptions() -> List[TranscriptionResult]:
    """List all transcription jobs"""
    try:
        # Get all transcription jobs from storage
        all_files = db.storage.json.list()
        transcriptions = []
        
        for file in all_files:
            if file.name.startswith("transcription_job_"):
                job_data = db.storage.json.get(file.name)
                transcriptions.append(TranscriptionResult(**job_data))
        
        return transcriptions
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing transcriptions: {str(e)}")