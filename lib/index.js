import consoleImg from './img'
import consoleSvg from './svg'

if (console.prototype ) {
  console.prototype.svg = consoleSvg
  console.prototype.img = consoleImg

}
if (console.__proto__ ) {
  console.__proto__.svg = consoleSvg
  console.__proto__.img = consoleImg
}

export default console;
