#!/usr/bin/env node

// https://github.com/tj/commander.js
const { program } = require('commander');
// https://www.npmjs.com/package/download-git-repo
const download = require('download-git-repo')
const templates = {
  'tmp-a': {
    'url': 'https://github.com/LeLe-hhm/template-a',
    'downlondUrl': 'https://github.com:LeLe-hhm/template-a#master',
    'description': '模板-a'
  },
  'tmp-b': {
    'url': 'https://github.com/LeLe-hhm/template-b',
    'downlondUrl': 'https://github.com:LeLe-hhm/template-b#master',
    'description': '模板-b'
  }
}
program
  .version('1.0.0')
// ph list 查看所有模板列表
program
  .command('list')
  .description('模板列表')
  .action(function (templateName, projectName) {
    for (let key in templates) {
      console.log(`
      ${key} ${templates[key]['description']}
      `)
    }
  });
// 初始化模板命令，<>：必填项
program
  .command('init <template> <project>')
  .description('初始化项目')
  .action((templateName, projectName) => {
    /**
     * 模板下载
     * 参数1: 模板下载地址
     * 参数2: 文件目录
     */
    download(`${templates[templateName]['downlondUrl']}`, projectName, { clone: true }, function (err) {
      console.log(err ? '下载失败' : '下载成功')
    })
  })

// process.argv 原生提供方法，获取用户输入命令参数
program.parse(process.argv);




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

// const cm = require('commander')
// const inquirer = require('inquirer')
// // 用户查看版本信息
// cm.version('1.0.0', '-v --version')
// // 自定义命令
// cm.option('a', 'project init', (n) => { console.log('init', n) })
// cm.command('init <name>').action((name) => {
//   // 提问
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'anthor', // 用户作答时，作为答案的key值
//       message: '请输入作者：'
//     }, {
//       type: 'input',
//       name: 'age',
//       message: '请输入年龄：'
//     }
//   ]).then(answer => {
//     // 获取用户输入内容
//     // console.log(answer) // { anthor: '洪华明', age: '18' }
//     require('./bin')(name, answer)
//   })
// })
// // 解析
// cm.parse(process.argv)
// console.log(process.argv) // [ '/usr/local/bin/node', '/usr/local/bin/ph' ]



// const ejs = require('ejs')
// inquire.prompt([
//   {
//     type: 'input',
//     name: 'name',
//     message: 'Progect name'
//   }
// ]).then(anwsers => {
//   // 根据用户回答的结果生成文件

//   // 模版目录
//   const tmplDir = path.join(__dirname, 'template')
//   // 目标目录
//   const destDir = process.cwd()
//   // 将模板下的文件全部转换到目标目录
//   fs.readdir(tmplDir, (err, files) => {
//     if (err) throw err
//     files.forEach(file => {
//       // file => 文件名称 App.js
//       ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
//         if (err) throw err
//         fs.writeFileSync(path.join(destDir, file), result)
//       })
//     })
//   })
// })