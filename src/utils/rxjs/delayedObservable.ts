import { Observable } from 'rxjs';

export type projectT = <T, R>(value: T, index: number) => Observable<R>;
const delayedObservable = (delay: number, project: projectT) =>
  Observable.timer(delay).switchMap(project);

export default delayedObservable;
