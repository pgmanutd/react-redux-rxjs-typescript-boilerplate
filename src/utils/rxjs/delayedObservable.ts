import { Observable } from 'rxjs';

export type projectSwitchMapT<T, R> = (value: T, index: number) => Observable<R>;
const delayedObservable = <R>(delay: number, project: projectSwitchMapT<number, R>) =>
  Observable.timer(delay).switchMap(project);

export default delayedObservable;
