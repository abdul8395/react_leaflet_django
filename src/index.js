import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import MyMap from './Mapc';
import reportWebVitals from './reportWebVitals';

import Map from './Map_component';

function Mapdisplay() {
  return (
      <Map />
  );
}
ReactDOM.render(<Mapdisplay />, document.getElementById('root'));


// ReactDOM.render(
//   <React.StrictMode>
//     <MyMap />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
