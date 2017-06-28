import * as clogy from 'clogy';
import * as fp from 'lodash/fp';

import {
  computeObservable,
  Observable,
  observableFromPromise,
  observableOf,
} from '@webui/utils/rxjs';

// TODO: Replace with redux state
export interface LocaleSettings {
  defaultLocale: string;
  currentLocale: string;
}
const localeSettings: LocaleSettings = {
  defaultLocale: 'en',
  currentLocale: __LANGUAGE__,
};

export const checkIfLocaleIsString = (locale: string) => {
  if (fp.negate(fp.isString)(locale)) {
    throw new TypeError(`${locale} should be string`);
  }
};

export const config = ({ locale }: { locale: string }) => {
  checkIfLocaleIsString(locale);

  localeSettings.currentLocale = locale;
};

export const getLocaleFile$ = ({ path, filename }: { path: string, filename: string }) => {
  const { defaultLocale, currentLocale }: LocaleSettings = localeSettings;

  if (defaultLocale !== currentLocale) {
    try {
      return observableFromPromise<KeyValuePair>(
        // TODO: 1. Remove space after import once tslint v5.5 gets released
        //       2. Add es6 template string once this is fixed:
        //          https://github.com/Microsoft/TypeScript/issues/16763
        //       3. Also try to use [request] if it works in next webpack version
        import (/* webpackChunkName: "i18n/" */ '@webui/' + path + '/locales/' + currentLocale + '/' + filename + '.i18n.json'),
      );
    } catch (e) {
      clogy.error(`Can't load locale i.e. ${currentLocale} for path: ${path}, filename: ${filename}`, e);
    }
  }

  return observableOf({});
};

type GetValueFromLocaleFileT = <T, K extends keyof T, U>(
  localeFile: T,
  key: K,
  fallback: U,
) => T[K] | U;
export const getValueFromLocaleFile: GetValueFromLocaleFileT = (
  localeFile: KeyValuePair,
  key: keyof KeyValuePair,
  fallback: string,
) => fp.pathOr(fallback, key, localeFile);

const Localize = ({ path, filename }: { path: string, filename: string }) => {
  const localeFile$: Observable<KeyValuePair> = getLocaleFile$({ path, filename });

  return (key: string, text: string) =>
    computeObservable<KeyValuePair | string, string>(
      getValueFromLocaleFile, [
        localeFile$,
        observableOf(key),
        observableOf(text),
      ],
    );
};

export default Localize;
