import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

  btn.innerHTML = '点击我打印到控制台';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let element = component();

document.body.appendChild(element);

// 监听print.js变更，以便通知webpack接收更新的模块
if (module.hot) {
  module.hot.accept('./print.js', function(){
    console.log('print.js 更新！')
    printMe();
    element = component();
    document.body.appendChild(element);
  })
}
