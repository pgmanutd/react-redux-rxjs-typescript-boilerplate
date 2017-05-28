declare module 'ignore-styles' {
  type DEFAULT_EXTENSIONS_T = string[];
  type NoOpT = () => void;

  interface IgnoreStyles {
    (extensions: DEFAULT_EXTENSIONS_T, handler: NoOpT): void;
    DEFAULT_EXTENSIONS: DEFAULT_EXTENSIONS_T;
    oldHandlers: {
      [ext: string]: NoOpT
    };
    noOp: NoOpT;
    restore: NoOpT;
  }

  const ignoreStyles: IgnoreStyles;
  export default ignoreStyles;
}
