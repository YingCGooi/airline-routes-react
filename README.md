## Airline Routes
This single-page application was built with React JS, bootstrapped via Create React App.

Semantic UI is used to apply general styling to elements, with some custom CSS overriding involved.

### Installation
If you wish to skip installation and view the demo app, navigate to https://airline-routes.herokuapp.com/

1. `cd` to the root path of the project folder
2. Run `npm install` to install dependencies
3. Run `npm start` 
4. If `npm` did not open up a new tab in your browser, navigate to `localhost:3000` in your browser to start the application

### Features
- Filter routes by airline
- Filter routes by airport
- Clicking an airport (represented by a circle) on the map will filter routes by that airport

### Tests
`cd` into the project root directory, then run `npm test` to run all tests.

### Rendering of SVG Map
The `Map` component renders SVG elements (paths and circles) using pure vanilla JS. This is done by calling the rendering methods within the `componentWillReceiveProps` and `componentDidMount` methods. Each time the new props are passed into the `Map` component, the vanilla JS code runs on order to render the SVG elements. The same call to render is included in `componentDidMount` so that the SVG elements will be rendered when the page first loads.

The reason for using pure vanilla JS in place of React's `render()` method is that it's significantly faster. Rendering ~1700 elements using JSX/`render()` puts significant burden on the client-side.

Running a benchmark through Chrome Devtools reveals that it:
- Took around 400ms to render the SVG elements by using JSX/`render()`
- Took around 80ms to render the SVG elements by using vanilla JS.