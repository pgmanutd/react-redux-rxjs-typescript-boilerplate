import { Observable } from 'rxjs';

const observableFromPromise = <T>(promise: Promise<T>): Observable<T> => Observable.fromPromise(promise);

export default observableFromPromise;
