module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  min: (a, b) => Math.min(a, b),
  max: (a, b) => Math.max(a, b)
}