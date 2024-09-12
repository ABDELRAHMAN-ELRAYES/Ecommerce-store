export interface error extends Error {
  status: string;
  statusCode: number;
}
