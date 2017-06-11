import * as clogy from 'clogy';

if (__DEV__) {
  clogy.setLevel(clogy.LEVELS.log);
} else {
  clogy.setLevel(clogy.LEVELS.error);
}
