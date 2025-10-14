import type { IResponse, IResponseWithExtra } from '@ys/shared';

import { CallHandler, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

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
