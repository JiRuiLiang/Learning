/*
import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'Webpack'], ' ');



  return element;
}
document.body.appendChild(component());

*/

// 动态导入start

// 方法1
// function getComponent() {
//   return import (/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
//     var element = document.createElement('div')
//
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//     return element;
//   }).catch(error => 'An error occurred while loading the component');
// }
// 方法2
async function getComponent() {
  var element = document.createElement('div')
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
})
// 动态导入end
