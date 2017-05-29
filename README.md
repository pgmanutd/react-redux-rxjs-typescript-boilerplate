# React Redux RxJS Typescript Boilerplate

## Getting started

This project uses [React](https://facebook.github.io/react/) based components and component state is managed by [Redux](http://redux.js.org/). Reactive Component (created using [React](https://facebook.github.io/react/) and [RxJS](http://reactivex.io/rxjs/)) is used for updating the DOM whenever [Redux](http://redux.js.org/) state changes. Your project has to provide a store from [react-redux](https://github.com/reactjs/react-redux).

### Technology Stack
* ```react```
* ```redux```
* ```rxjs```
* ```lodash/fp```
* ```bootstrap v4.0```
* [cssnext](http://cssnext.io/)
* ```typescript```
* ```tslint```
* Testing and Code Coverage using ```Mocha, Sinon, Chai, Enzyme and Istanbul```

## Development

### Environment
This project uses [yarn](https://yarnpkg.com/). If you do not have yarn, checkout installation steps [here](https://yarnpkg.com/en/docs/install).

```
yarn install
```

Once that is completed, you should be able to run the project:

```
yarn start
```

We don't need ```gulp``` or ```grunt```. ```npm scripts``` serves our purpose well. Though ```webpack``` (a module bundler) is required for creating module dependency tree.

### Editor
I use [VS Code](https://code.visualstudio.com/) for editing. The language is [TypeScript](https://www.typescriptlang.org/) and VS Code has the best experience.

VS Code Extensions:
* **TypeScript Import** - Automatically import dependencies. Also has a fix option if not automatically imported
* **TSLint** - Gives tslint errors
* **Auto Close Tag** - Helps with writing JSX

Some useful user settings (found in `settings.json`. Open command palette `Ctrl[Cmd]+Shift+P` and type `User settings`):
```json
{
  "terminal.integrated.shellArgs.osx": [
    "-l"
  ],
  "files.trimTrailingWhitespace": true,
  "editor.tabSize": 2,
  "editor.wrappingColumn": -1,
  "files.insertFinalNewline": true,
  "tslint.autoFixOnSave": true
}
```

The tslint setting fixes most tslint errors when you save.

## Testing

### Unit Testing
This project uses nodejs, mocha and chai for testing. No browser (That's why karma is not used) is used for unit testing by design for speed of development. Unit tests should only test the output of a given input for functions and components. UI testing is done elsewhere (For Eg. using [cypress](https://www.cypress.io)).

Run unit tests once:
```bash
yarn test
```

Run tests in watch mode for continuous development:
```bash
yarn test:watch
```

## Releasing
Pick what type of release (patch/minor/major)

```
yarn version:minor
```

Run the release task:

```
yarn release
```

## TODO

- [ ] Implement [Bundle Loader](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
- [ ] Configure redux with the help of rxjs for reactive components
- [ ] Remove unnecessary importing of lodash and rxjs (import what is required; will reduce bundle size)
- [ ] Add react-helmet for SEO (Search Engine Optimization)
- [ ] Identify areas of improvement, refactoring and add more test cases

## License

Copyright (c) 2017 pgmanutd

Licensed under the MIT license


**Free Software, Hell Yeah!**
