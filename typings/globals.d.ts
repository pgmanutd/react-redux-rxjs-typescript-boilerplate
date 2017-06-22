/* tslint:disable:no-namespace */

interface KeyValuePair {
  readonly [name: string]: any;
}

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
    __DEV__: typeof __DEV__;
    __LANGUAGE__: typeof __LANGUAGE__;
    __FP_DEBUGGER__: typeof __FP_DEBUGGER__;
  }
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <T>(a: T) => T;
}
