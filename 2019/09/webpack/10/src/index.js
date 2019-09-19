import _ from 'lodash';

function component () {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = '点击查看打印';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/*webpackChunkName: "print"*/ './print').then(module => {
    var print = module.default;
    print();
  })

  return element;
}

document.body.appendChild(component());
