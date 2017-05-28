import { Observable } from 'rxjs';

const observableOf = <T>(input: T): Observable<T> => Observable.of(input);

export default observableOf;
