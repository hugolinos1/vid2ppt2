import {
  BodyUploadVideoForTranscription,
  CheckHealthData,
  GetTranscriptionStatusData,
  ListTranscriptionsData,
  UploadVideoForTranscriptionData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Upload a video file for transcription
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name upload_video_for_transcription
   * @summary Upload Video For Transcription
   * @request POST:/routes/upload-video
   */
  export namespace upload_video_for_transcription {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyUploadVideoForTranscription;
    export type RequestHeaders = {};
    export type ResponseBody = UploadVideoForTranscriptionData;
  }

  /**
   * @description Get the status of a transcription job
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name get_transcription_status
   * @summary Get Transcription Status
   * @request GET:/routes/transcription-status/{job_id}
   */
  export namespace get_transcription_status {
    export type RequestParams = {
      /** Job Id */
      jobId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTranscriptionStatusData;
  }

  /**
   * @description List all transcription jobs
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name list_transcriptions
   * @summary List Transcriptions
   * @request GET:/routes/list-transcriptions
   */
  export namespace list_transcriptions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListTranscriptionsData;
  }
}
