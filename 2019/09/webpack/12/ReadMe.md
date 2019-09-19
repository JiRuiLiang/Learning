## library

## 注意
- 这个demo暂时不能用，因为我完全没有看明白

可以通过以下方式暴露 library：
  - 变量：作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
  - this：通过 this 对象访问（libraryTarget:'this'）。
  - window：通过 window 对象访问，在浏览器中（libraryTarget:'window'）。
  - UMD：在 AMD 或 CommonJS 的 require 之后可访问（libraryTarget:'umd'）。
