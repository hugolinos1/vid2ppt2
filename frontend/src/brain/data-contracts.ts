/** Body_upload_video_for_transcription */
export interface BodyUploadVideoForTranscription {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/**
 * TranscriptionResponse
 * Response model for the transcription endpoint
 */
export interface TranscriptionResponse {
  /** Job Id */
  job_id: string;
  /** Status */
  status: string;
  /** Message */
  message: string;
}

/**
 * TranscriptionResult
 * Model for transcription result
 */
export interface TranscriptionResult {
  /** Job Id */
  job_id: string;
  /** Status */
  status: string;
  /** Text */
  text?: string | null;
  /** Error */
  error?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export type UploadVideoForTranscriptionData = TranscriptionResponse;

export type UploadVideoForTranscriptionError = HTTPValidationError;

export interface GetTranscriptionStatusParams {
  /** Job Id */
  jobId: string;
}

export type GetTranscriptionStatusData = TranscriptionResult;

export type GetTranscriptionStatusError = HTTPValidationError;

/** Response List Transcriptions */
export type ListTranscriptionsData = TranscriptionResult[];
