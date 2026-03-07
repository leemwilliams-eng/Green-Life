export interface ApiError {
  code: string;
  message: string;
}

export interface ApiEnvelope<T> {
  data: T;
  meta: Record<string, unknown>;
  error: ApiError | null;
}
