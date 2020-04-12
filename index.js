#!/usr/bin/env node

// https://github.com/tj/commander.js
const { program } = require('commander');
// https://www.npmjs.com/package/download-git-repo
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const fs = require('fs')
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
    /**
     * 
     * 把项目下的 package.json 文件读取出来
     * 使用向导的方式采集用户输入的数据
     * 使用模板引擎把用户输入的数据解析到 package.json 文件
     * 解析完毕，把解析之后的结果重新写入 package.josn 文件
     * 
     * 
     */
    inquirer.prompt([
      {
        type: 'input',
        name: 'name', // 用户作答时，作为答案的key值
        message: '请输入项目名称'
      }, {
        type: 'input',
        name: 'description',
        message: '请输入项目简介'
      }, {
        type: 'input',
        name: 'author',
        message: '请输入作者'
      }
    ]).then(answer => {
      // 获取用户输入内容
      // console.log(answer)
      // 把采集到的用户输入数据解析替换到 package.json 文件中
      const path = `${projectName}/package.json`
      // 读取文件内容
      const content = fs.readFileSync(path, 'utf8')
      // 用模板把数据解析进去
      const result = handlebars.compile(content)(answer)
      // 把填充了数据的模板，重新写入到文件中
      fs.writeFileSync(path, result)
      console.log('初始化模板成功')
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