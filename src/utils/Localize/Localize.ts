import * as clogy from 'clogy';
import * as fp from 'lodash/fp';

import {
  computeObservable,
  Observable,
  observableFromPromise,
  observableOf
} from '@webui/utils/rxjs';

// TODO: Replace with redux state
export interface LocaleSettings {
  defaultLocale: string;
  currentLocale: string;
}
const localeSettings: LocaleSettings = {
  defaultLocale: 'en',
  currentLocale: __LANGUAGE__
};

type checkIfLocaleIsStringT = (locale: string) => never | void;
export const checkIfLocaleIsString: checkIfLocaleIsStringT = (locale) => {
  if (fp.negate(fp.isString)(locale)) {
    throw new TypeError(`${locale} should be string`);
  }
};

type ConfigT = ({ locale }: { locale: string }) => void;
export const config: ConfigT = ({ locale }) => {
  checkIfLocaleIsString(locale);

  localeSettings.currentLocale = locale;
};

type GetLocaleFile$T = (path: string) => Observable<KeyValuePair>;
export const getLocaleFile$: GetLocaleFile$T = (path: string) => {
  const { defaultLocale, currentLocale }: LocaleSettings = localeSettings;

  if (defaultLocale !== currentLocale) {
    try {
      return observableFromPromise<KeyValuePair>(
        System.import<KeyValuePair>(`./${currentLocale}/${path}.i18n.json`)
      );
    } catch (e) {
      clogy.warn(`Can't load locale i.e. ${currentLocale} for ${path}`, e);
    }
  }

  return observableOf({});
};

type GetValueFromLocaleFileT = <T, K extends keyof T, U>(
  localeFile: T,
  key: K,
  fallback: U
) => T[K] | U;
export const getValueFromLocaleFile: GetValueFromLocaleFileT = (
  localeFile: KeyValuePair,
  key: keyof KeyValuePair,
  fallback: string
) => fp.pathOr(fallback, key, localeFile);

type LocalizeT = (path: string) => (key: string, text: string) => Observable<string>;
const Localize: LocalizeT = (path: string) => {
  const localeFile$: Observable<KeyValuePair> = getLocaleFile$(path);

  return (key: string, text: string) =>
    computeObservable<KeyValuePair | string, string>(
      getValueFromLocaleFile, [
        localeFile$,
        observableOf(key),
        observableOf(text)
      ]
    );
};

export default Localize;
