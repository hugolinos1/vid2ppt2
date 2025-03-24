import {
  BodyUploadVideoForTranscription,
  CheckHealthData,
  GetTranscriptionStatusData,
  GetTranscriptionStatusError,
  GetTranscriptionStatusParams,
  ListTranscriptionsData,
  UploadVideoForTranscriptionData,
  UploadVideoForTranscriptionError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Upload a video file for transcription
   *
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name upload_video_for_transcription
   * @summary Upload Video For Transcription
   * @request POST:/routes/upload-video
   */
  upload_video_for_transcription = (data: BodyUploadVideoForTranscription, params: RequestParams = {}) =>
    this.request<UploadVideoForTranscriptionData, UploadVideoForTranscriptionError>({
      path: `/routes/upload-video`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * @description Get the status of a transcription job
   *
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name get_transcription_status
   * @summary Get Transcription Status
   * @request GET:/routes/transcription-status/{job_id}
   */
  get_transcription_status = ({ jobId, ...query }: GetTranscriptionStatusParams, params: RequestParams = {}) =>
    this.request<GetTranscriptionStatusData, GetTranscriptionStatusError>({
      path: `/routes/transcription-status/${jobId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description List all transcription jobs
   *
   * @tags dbtn/module:video_processing, dbtn/hasAuth
   * @name list_transcriptions
   * @summary List Transcriptions
   * @request GET:/routes/list-transcriptions
   */
  list_transcriptions = (params: RequestParams = {}) =>
    this.request<ListTranscriptionsData, any>({
      path: `/routes/list-transcriptions`,
      method: "GET",
      ...params,
    });
}
