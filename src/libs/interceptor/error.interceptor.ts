import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { error } from 'console';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('this is error');

    return next.handle().pipe(
      catchError((err) => {
        // return throwError(() => doException(err));
        const error = {
          meta: {
            success:
              err.statusCode >= 200 && err.statusCode <= 300 ? true : false,
            message: err.message,
            devMessage: err.devMessage,
          },
          body: null,
        };
        return throwError(
          () => new HttpException(error, err.status || err.statusCode),
        );
      }),
    );
  }
}

// const doException = (err) => {
//   try {
//     let error = {};
//     if (err.response?.status === 'error') {
//       error = {
//         meta: {
//           success: err.status >= 200 && err.status <= 300 ? true : false,
//           messageEn: err.response.messageEn,
//           messageMm: err.response.messageMm,
//         },
//         body: null,
//       };
//       return new HttpException(error, err.status || err.statusCode);
//     } else {
//       if (err.error) {
//         error = {
//           meta: {
//             success:
//               err.statusCode >= 200 && err.statusCode <= 300 ? true : false,
//             message: err.message,
//             devMessage: err.devMessage,
//           },
//           body: null,
//         };
//       }
//       if (err.response && err.response.error) {
//         error = {
//           meta: {
//             success:
//               err.response.statusCode >= 200 && err.response.statusCode <= 300
//                 ? true
//                 : false,
//             messageEn: err.response.message[0],
//             messageMm: err.response.message[0],
//           },
//           body: null,
//         };
//       }

//       if (err.response && err.response.messageMm && err.response.messageEn) {
//         error = {
//           meta: {
//             success:
//               err.response.statusCode ??
//               (err.response.status >= 200 && err.response.statusCode) ??
//               err.response.status <= 300
//                 ? true
//                 : false,
//             messageEn: err.response.messageMm,
//             messageMm: err.response.messageEn,
//           },
//           body: null,
//         };
//       }

//       return new HttpException(error, err.status || err.statusCode);
//     }
//   } catch (e) {
//     console.log(e, 'ee');
//     const error = {
//       meta: {
//         success: false,
//         messageEn: err?.messageEn || 'Internal Server Error',
//         messageMm: err?.messageMm || 'Internal Server Error',
//       },
//       body: null,
//     };
//     return new HttpException(error, err?.statusCode || 500);
//   }
// };
