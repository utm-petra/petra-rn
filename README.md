# Petra
## An app for exploring UTM's awesome rock collection, built in React Native

Petra is a simple app that displays information about each of the 31 rocks around the UTM campus. The app was originally built for Android by Adi Sripathi. Mitchell McMillan ported it to React Native. The app is architected for ease of extending its features in the future, by other students. In such cases, the information provided here will be vital.

### React Native

React Native is a Javascript SDK built by Facebook and based on React. By writing the UI and business logic of the app in React Native, a native Android and iOS app can be generated from the same source code. React Native is a flexible platform that allows native code (Swift/Objective-C or Kotlin/Java) to interact with Javascript. However, for Petra, we are limiting ourselves to the Expo SDK, which doesn't allow us to touch native code. The reasons for this are explained as follows.

### Expo

React Native is an immature platform, and development is moving fast. It can be hard to maintain compatibility between the code you write, the modules you import, and React Native itself. Expo solves many of these problems by providing a standardized set of components and React Native distributions, as well as command-line tools and the XDE development environment. The end result is that it is much smoother to get up and running with Expo than it is with vanilla React Native.

For the Petra app, the limitations imposed by Expo are not important. The Expo SDK provides components for everything we need, including Google Maps, barcode scanning, and app navigation.

### Other choices

Google's Material Design provides a standard for building user interfaces on mobile, which makes developing new components much easier. The library `react-native-paper` provides many of the Material Design components for React Native and is compatible with Expo. Therefore, Paper should be the first choice for UI styling when creating a new component. 

Redux is a tried and true state management paradigm and was chosen for Petra's state. Broadly speaking, *state* is the data (javascript objects and primitives) about the App that changes over time as the user interacts with the UI; it describes the underlying state of the app. Redux encapsulates most or all of the state into a single javascript object, which is immutable. The object, and thus the state, can only be modified by `dispatch`ing objects called `action`s. Actions are handled by one or more `reducers`. An `action` contains a `type` property and a `payload` property; the `type` tells the reducer what the action does, and the `payload` contains any data the reducer may need to perform the action (for example, a string representing a modified description for a rock). The details of how Redux is implemented for Petra are described below.

## Resources

Before digging into the source code, get familiar with these concepts

- [React Native](https://facebook.github.io/react-native/docs/tutorial.html)
- [Expo](https://docs.expo.io/versions/latest/)
- [Redux](https://redux.js.org/)
- [React Navigatioin](https://reactnavigation.org/docs/en/getting-started.html)
- [Material Design/Paper](https://callstack.github.io/react-native-paper/)

## Modifying the javascript source

The source code consists largely of javascript files that describe the UI, business logic, and state of the app. They were originally written in Visual Studio Code, but any text editor or IDE can be used to write javascript. However, it is recommended to use Flow for type checking. VS Code has integrations for React Native and Flow that make this setup easy. In addition, the ESLint and Prettier extensions automatically format the code according to a set of rules, which makes maintaining a consistent coding style trivial.

Before modifying the source code, get familiar with how the app is organized.

### App architecture

Petra was bootstrapped by Expo. 

The app is organized into a few top-level folders that separate out the main concerns of Petra. These include `assets`, `components`, `constants`, `navigation`, `redux`, and `screens`. The `App.js` file contains the starting point for our source code, and exports a React component that contains the entire app. `App.json` is used by Expo to describe the metadata of the app, and `package.json` containis the Node modules used by Petra; see `package.json` for the current versions of React Native, Flow, and other libraries imported by Petra. Other top-level files are mainly configurations for the Babel transpiler (`.babelrc`), Flow type checking (`.flowconfig`), and Watchman (`.watchmanconfig`).

### The `assets` folder

This folder contains assets, files bundled with your app that your code requires at compile time. These commonly include fonts and images, and there are subfolders for these categories. Assets can be accessed in React Native using the `require("./path/to/asset")` syntax.

### The `components` folder

This folder contains small, reusable React components such as Buttons, custom Text components, List Items. Components can be combined or nested to make up larger components or entire `screen`s. Data for how a component looks and functions is usually passed down from parent components through `props`.

### The `constants` folder

This folder contains objects that remain constant for a given instance of Petra. This includes parameters about a user's device, such as `width` and `height`, as well as colours and styles that do not change dynamically during runtime.

### The `navigation` folder

This folder contains the logic needed to setup navigation for Petra. Navigation describes how a user moves from one `screen` to the next during the course of interacting with the app. Petra uses `react-navigation` for navigation. The main navigation for Petra consists of a TabBar, allowing the user to switch between the map, rock collection, etc. Each tab is actually a stack of screens that can be pushed or popped on top of each other.

### The `redux` folder

This folder encapsulates all logic relating to the app's state. 

>Important: The `data` folder contains `rocks.json`, the main database for the UTM rock collection. The database is an array of JSON objects, which can be easily parsed and read by any programming language. Each JSON object represents a rock and contains information such as its lat/lon coordinates, description, and mineral composition. For javascript, it is trivial to convert this into an array of javascript objects using `require(./path/to/rocks.json)`. The array can then be used to "hydrate" the redux store with this information.

The top-level files in `redux` contain functions for creating reducers, defining the store, and definitions for valid `action` types. The `redux` folder structure is meticulously set up to be fully typed. This is the goal: you shouldn't be able to dispatch an action that the reducers won't know how to handle; your reducers shouldn't be able to update state in a way that would result in an error. For example, you could make a typo in the action type ("SET_PREF" vs "SET_PERF" for example). You could also try to modify a property of your state that doesn't exist (`state.pref = true` vs `state.perf = true`). Flow can help make sure this doesn't happen by alerting us to type errors. Although this makes the whole redux flow quite verbose, it's worth it; errors and typos are much harder to make. To illustrate this, here's how you would go about creating a new redux action. Let's say you want to let the user set the color theme to "dark mode".

- Start in `actions.js` and define the action type as something like the following. The `type` property is required. The `payload` is optional; in this case it would be a boolean that says whether the user wants dark mode (true) or light mode (false).

`type SetDarkModeAction = { type: "SET_DARK_MODE", payload: boolean };`

- Scroll to the bottom of `actions.js` and add the new action to the type export `Action`.

`export type Action = ... | SetDarkModeAction;`

- Notice the file `createReducer.js`. This function gets the `Action` type defined in `actions.js`, and exports a function that will create reducers that only recognize those actions. If an action the reducer knows how to handle is called, the function will call that handler to update state; if an unrecognized action is passed, it just returns the initial state;

- Now create the module for the new action inside the `modules` folder. A module contains `redux-thunk` functions, which ultimately dispatch actions, the reducer for those actions, and any selectors that will be needed to access the state. The thunk functions will be the ones passed to the props of React components and connect the user to the Redux store. The module also contains the definition for its slice of state, and the initial state. The idea is that the modules know the "shape" of the state tree; components, screens, etc. should not have to know that. So it's up to the modules to provide functions (called selectors) for accessing the state tree in a controlled way. The upside to this is that these functions can be memoized using `reselect`, so that expensive computation is only performed when absolutely needed. 

- First create and export the thunk:

```js
// the thunk returns a ThunkAction, defined below
export function setDarkMode(isDark: boolean): ThunkAction {
  // flow will error if "SET_DARK_MODE" has a typo
  return dispatch => {
    dispatch({ type: "SET_DARK_MODE", payload: isDark });
  };
}
```

- Define the state and create the initial state:

```js
type State = {
  +isDark: boolean
};

const INITIAL_STATE: State = {
  isDark: false
};
```

- Create and export the reducer (remember to import the createReducer function):

```js
export default createReducer(INITIAL_STATE, {
  // Flow will not error if SET_DARK_MODE has a typo
  // but the app won't error either
  SET_DARK_MODE: (state, action) => ({
    ...state,
    isDark: action.payload
  })
});
```

### The `screens` folder

This folder contains React components that represent full-screen views for the user. An example is the `MapScreen`, which shows a map of the locations of the rocks at UTM. The screens are made up of smaller React components and are usually wrapped in a View with a style including `{flex: 1}`. These screens are ultimately imported by our navigator and used to define the routes for the app's navigation.
