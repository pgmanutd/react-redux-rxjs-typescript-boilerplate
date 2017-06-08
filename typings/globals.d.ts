/* tslint:disable:no-namespace */

interface KeyValuePair {
  readonly[name: string]: any;
}

// TODO: Replace System.import by import() once this proposal is accepted:
// https://github.com/tc39/proposal-dynamic-import
// Tracked here: https://github.com/Microsoft/TypeScript/issues/12364
interface System {
  import<T>(module: string): Promise<T>;
}
declare const System: System;

interface NodeModule {
  hot: any;
}

declare const __DEV__: boolean;
declare const __LANGUAGE__: string;
declare const __FP_DEBUGGER__: <T>(a: T) => T;

declare namespace NodeJS {
  interface Global {
    document: any;
    window: any;
    navigator: any;
    System: System;
    __DEV__: typeof __DEV__;
    __LANGUAGE__: typeof __LANGUAGE__;
  }
}
