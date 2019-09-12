import _ from 'lodash';
import './assets/style.css';
import icon from './assets/01.jpg';

function component() {
  var element = document.createElement('div');

  // Lodash (目前通过一个script脚本引入) 对于执行这一行是必须的， 下面的_就是lodash
  element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
  element.classList.add('hello')

  var img = new Image();
  img.src = icon;
  element.appendChild(img)

  return element;
}

document.body.appendChild(component());
