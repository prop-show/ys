export interface IResponse<T> {
  data: T;
  extra: Record<string, any>;
  code: number;
  message: string;
  success: boolean;
}

export interface IResponseWithExtra<T, E = Record<string, any>> {
  data: T;
  extra: E;
}
