import { CallHandler, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
interface IResponse<T> {
  data: T;
  extra: Record<string, any>;
  code: number;
  message: string;
  success: boolean;
}

interface IResponseWithExtra<T, E = Record<string, any>> {
  data: T;
  extra: E;
}

export class TransformInterceptor<T = any>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(_, next: CallHandler<T>): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (this.isResponseWithExtra<T>(data)) {
          return {
            data: data.data,
            extra: data.extra,
            code: 200,
            message: '请求成功',
            success: true,
          };
        }

        return {
          data,
          extra: {},
          code: 200,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }

  private isResponseWithExtra<T>(data: any): data is IResponseWithExtra<T> {
    return data instanceof Object && 'data' in data && 'extra' in data;
  }
}
