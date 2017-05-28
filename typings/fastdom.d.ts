declare module 'fastdom' {
  type NoOpT = () => void;

  namespace Context {
    const noOp: NoOpT;
  }

  type TaskT = NoOpT | typeof Context.noOp;

  type QueueT = (fn: NoOpT, ctx?: typeof Context) => TaskT;

  interface FastDOM {
    measure: QueueT;
    mutate: QueueT;
    clear: (task: TaskT) => boolean;
    extend: (props: object) => FastDOM;
    catch: null | ((error?: Error) => void);
  }

  const fastDOM: FastDOM;
  export = fastDOM;
}
