import { cube } from './math.js'
function component() {
  var element = document.createElement('div');

  // Lodash (目前通过一个script脚本引入) 对于执行这一行是必须的， 下面的_就是lodash
  element.innerHTML = ['Hello', 'Webpack', '5 cubed is equal to' + cube(5)].join('\n\n');

  return element;
}

document.body.appendChild(component());
