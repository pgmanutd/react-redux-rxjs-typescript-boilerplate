import * as offlinePluginRuntime from 'offline-plugin/runtime';

if (!__DEV__) {
  offlinePluginRuntime.install({
    onUpdateReady: () => offlinePluginRuntime.applyUpdate(),
    onUpdated: () => location.reload(),
  });
}
