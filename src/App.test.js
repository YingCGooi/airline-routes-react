import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TableContainer from './components/TableContainer';
import Data from './data';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

Enzyme.configure({ adapter: new Adapter() });

const PERPAGE = 25;
const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];
const rows = Data.routes;
const format = (new App()).formatValue;

function getRouteAirlineAirports(index) {
  const route = Data.routes[index];
  const airline = Data.getAirlineById(route.airline);
  const srcAirport = Data.getAirportByCode(route.src);
  const destAirport = Data.getAirportByCode(route.dest);
  return {airline, srcAirport, destAirport};
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App', () => {
  let wrapper = mount(<App />); // only need to mount once here

  it('should have the `th`s', () => {
    expect(
      wrapper.contains([
        <th>Airline</th>,
        <th>Source Airport</th>,
        <th>Destination Airport</th>,
      ])
    ).toBe(true);
  });

  it('should have `button` elements', () => {
    expect(
      wrapper.containsAllMatchingElements([
        <button>Show All Routes</button>,
        <button disabled><i></i>Previous Page</button>,
        <button>Next Page<i></i></button>
      ])
    ).toBe(true);
  });

  it('table should have the first row of data', () => {
    const {airline, srcAirport, destAirport} = getRouteAirlineAirports(0);

    expect(
      wrapper.containsMatchingElement(
        <tr>
          <td>{airline.name}</td>
          <td>{srcAirport.name}</td>          
          <td>{destAirport.name}</td>          
        </tr>
      )
    ).toBe(true);
  });

  describe('the user clicks on the buttons', () => {

    describe('Next Page', () => {
      beforeEach(() => {      
        wrapper = mount(
          <TableContainer
            columns={columns}
            rows={rows}
            format={format}
            perPage={PERPAGE}
          />
        );
        const button = wrapper.find('button#next');
        button.simulate('click', {
          preventDefault: () => {},
        });
      });

      it('should enable the "Previous Page" button', () => {
        expect(
          wrapper.containsMatchingElement(            
            <button><i></i>Previous Page</button>
          )
        ).toBe(true);

        expect(
          wrapper.containsMatchingElement(            
            <button disabled><i></i>Previous Page</button>
          )
        ).toBe(false);        
      });

      it('should not display the first row of data', () => {
        const {airline, srcAirport, destAirport} = getRouteAirlineAirports(0);

        expect(
          wrapper.containsMatchingElement(
            <tr>
              <td>{airline.name}</td>
              <td>{srcAirport.name}</td>
              <td>{destAirport.name}</td>
            </tr>
          )
        ).toBe(false);        
      });

      it('should display the PERPAGE-th row of data', () => {
        const {airline, srcAirport, destAirport} = getRouteAirlineAirports(PERPAGE);

        expect(
          wrapper.containsMatchingElement(
            <tr>
              <td>{airline.name}</td>
              <td>{srcAirport.name}</td>
              <td>{destAirport.name}</td>
            </tr>
          )
        ).toBe(true);   
      });
    });
  });
})