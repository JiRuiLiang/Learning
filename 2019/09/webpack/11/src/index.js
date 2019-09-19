import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
  element.onclick = printMe.bind(null, 'Hello webpack!');

  return element;
}

document.body.appendChild(component());
