import _ from 'lodash';
import './style.css';
import icon from './icon.png';
import Data from './data.xml';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var image = new Image();
  image.src = icon;

  element.appendChild(image);

  console.log(Data)
  return element;
}
document.body.appendChild(component());
