# vue-inject-env

`vue-inject-env` is a tool that allows you to inject your environment variables after building the static files, allowing you to deploy the same build to multiple environments quickly.

## Usage

[Sample project](./sample/v2/README.md)

### 1. Install vue-inject-env

```
npm install vue-inject-env --save-dev
yarn add vue-inject-env --dev
```

### 2. Update Code

- Add the following to `index.html`

```html
<script src='/env.js'></script>
```

- Create a new file called `env.js` in your `src` directory and copy the
following code:

```js
export const env = { ...process.env, ...window['env'] }
```

- Replace all instances of `process.env` with the newly created `env` variable

```jsx
import { env } from './env'

export const App = () => {
  return (
    <div style={{backgroundColor: env.VITE_COLOR}}>
      <span>{env.VITE_MAIN_TEXT}</span>
    </div>
  )
}
```

### 3. Build your static files

Using `vite`, you can just run `npm run build`.

### 4. Inject environment variables

```
[env variables] npx vue-inject-env set
```

Pass in all your environment variables.

```shell
# with a black background
VITE_COLOR=black VITE_MAIN_TEXT="Black Background" npx vue-inject-env set

# with a blue background
VITE_COLOR=blue VITE_MAIN_TEXT="Blue Background" npx vue-inject-env set

# for windows
set VITE_COLOR=navy&& set VITE_MAIN_TEXT=Navy Background&& npx vue-inject-env set
```

### Additional options

`-d / --dir`: The location of your static build folder. Defaults to `./dist`

`-n / --name`: The name of the env file that is outputted. Defaults to `env.js`

`-v / --var`: The variable name in `window` object that stores the environment variables. The default is `env` (window.**env**). However if you already have a variable called `window.env`, you may rename it to avoid conflicts.

`-p / --prefix`: Defines the prefix of variables that are supposed to be used. Defaults to `VITE_`

## .env / dotenv

`.env` files are supported. `vue-inject-env` will automatically detect environment variables in your `.env` file located in your root folder.

Note: Environment variables passed in through the command line will take precedence over `.env` variables.

## Information

### Why do I need this?

A typical CI/CD process usually involves building a base image, followed by injecting variables and deploying it.

Unfortunately React applications does not allow for this workflow as it requires environment variables to be present before building it.

There have been a few workarounds, with the most common solution being to load environment variables from an external source. However this now causes the additional problem that environment variables can only be accessed asynchronously.

### Goals

`vue-inject-env` attempts to solve this problem in the simplest, and most straightforward way with the following goals in mind:

1. Does not require a rebuild
2. Minimal code change required
3. Allows synchronous access of environment variables
4. Supports a wide amount of tools and scripts
5. Works with command line environment variables
6. Simple and straightforward

### Port

This project is ported from [react-inject-env](https://github.com/codegowhere/react-inject-env) and adapted to work in a Vue + Vite environment.
