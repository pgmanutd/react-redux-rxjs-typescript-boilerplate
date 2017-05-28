declare module 'offline-plugin' {
  import { Plugin } from 'webpack';

  interface OfflinePlugin extends Plugin {
    new(options?: any): any;
  }

  const offlinePlugin: OfflinePlugin;
  export = offlinePlugin;
}

declare module 'offline-plugin/runtime' {
  interface OfflinePluginRuntime {
    install(options?: any): any;
    applyUpdate(): any;
  }

  const offlinePluginRuntime: OfflinePluginRuntime;
  export = offlinePluginRuntime;
}
