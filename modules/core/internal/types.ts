import { Subscription } from './Subscription';
import { Observable } from './Observable';

export enum FOType {
  SUBSCRIBE = 0,
  NEXT = 1,
  COMPLETE = 2,
  ERROR = 3,
}

export type SinkArg<T> = T | void | any;

export interface Sink<T> {
  (type: FOType.SUBSCRIBE, subscription: Subs): void;
  (type: FOType.NEXT, value: T): void;
  (type: FOType.ERROR, err: any): void;
  (type: FOType.COMPLETE, arg: void): void;
  (type: FOType, arg: FObsArg<T>): void;
}

export interface Source<T> {
  (type: FOType.SUBSCRIBE, sink: Sink<T>): void;
}

export interface FObs<T> extends Source<T>, Sink<T>, Subs {
  (type: FOType, arg: FObsArg<T>): void;
}

export type FObsArg<T> = SinkArg<T> | void;

export type Teardown = SubscriptionLike | (() => void) | void;

export interface NextObserver<T> {
  next: (value: T, subscription: Subscription) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface ErrorObserver<T> {
  next?: (value: T, subscription: Subscription) => void;
  error: (err: any) => void;
  complete?: () => void;
}

export interface CompleteObserver<T> {
  next?: (value: T, subscription: Subscription) => void;
  error?: (err: any) => void;
  complete: () => void;
}

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompleteObserver<T>;

export interface Observer<T> {
  next: (value: T, subscription: Subscription) => void;
  error: (err: any) => void;
  complete: () => void;
}

export interface Scheduler {
  (): number;
  (work: () => void, delay: number, subs: Subscription): number;
}

export type Operation<T, R> = (source: Observable<T>) => Observable<R>;

export interface ObservableLike<T> {
  subscribe(observer: Observer<T>): Subscription;
}

export type ObservableInput<T> = Observable<T> | ObservableLike<T> | PromiseLike<T> | Iterable<T> | Array<T> | ArrayLike<T>;

export interface SubscriptionLike {
  unsubscribe(): void;
}