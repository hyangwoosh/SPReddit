import axios, { Axios } from "axios";
import { string } from "yup";

const { REACT_APP_API_SERVER } = process.env;

export interface ApiResponse<T = any> {
  message: string;
  result: T;
}

export interface ApiRequestQuery {
  filter: ApiRequestQueryFilter;
}

export type ApiRequestQueryFilter = {
  title?: string;
  content?: string;
  // title?: { operand: string | number; operator: string | number };
};

export interface ApiResponseCreated extends ApiResponse<{ id: number }> {}

const serializeRequest = (request: string) => JSON.stringify(request);
const serializeResponse = (response: string) => JSON.parse(response);

export const ApiService = new Axios({
  baseURL: REACT_APP_API_SERVER,
  transformRequest: serializeRequest,
  transformResponse: serializeResponse,
  headers: { "Content-Type": "application/json" },
});
