#!/usr/bin/env node
// const chalk = require('chalk')
// console.log(chalk.red.bgBlue('hello world'))
// console.log(chalk.rgb(232, 123, 233).bgRgb(212, 22, 213)('hello world'))

// const ora = require('ora')
// const spinner = ora(chalk.red('this is a loading'))
// spinner.start() // 开始loading
// spinner.color = 'yellow' // 改变转圈圈的颜色

// setTimeout(() => {
//   spinner.stop() // 停止loading，并结束进程
// }, 2000);

const cm = require('commander')
const inquirer = require('inquirer')
// 用户查看版本信息
cm.version('1.0.0', '-v --version')
// 自定义命令
cm.option('a', 'project init', (n) => { console.log('init', n) })
cm.command('init <name>').action((name) => {
  // 提问
  inquirer.prompt([
    {
      type: 'input',
      name: 'anthor', // 用户作答时，作为答案的key值
      message: '请输入作者：'
    }, {
      type: 'input',
      name: 'age',
      message: '请输入年龄：'
    }
  ]).then(answer => {
    // 获取用户输入内容
    // console.log(answer) // { anthor: '洪华明', age: '18' }
    require('./bin')(name, answer)
  })
})
// 解析
cm.parse(process.argv)
// console.log(process.argv) // [ '/usr/local/bin/node', '/usr/local/bin/ph' ]