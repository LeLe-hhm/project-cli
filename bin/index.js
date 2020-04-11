const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const insper = ora(chalk.rgb(212, 22, 34)('模板下载中...'))
insper.color = 'yellow'
/**
 * 
 * @param {用户创建的项目名称} objName 
 * @param {用户选项} answer 
 */
const ob = []
const basePath = './template'
let curent = 0
function parseCommand (objName, answer) {
  insper.start()
  const targetBasePath = `./${objName}` // 用户模板下载文件，默认使用用户创建文件的名字
  // fs.readFile('./template/pages/Index.vue', function (err, files) {
  //   // 读取文件中的具体内容，Buffer 格式。要toSring()下
  //   // console.log(files.toString())
  // })
  fs.mkdir(targetBasePath, function () {
    // 读取模板文件路径
    fsFileArr(basePath)
    // 根据模板文件生成用户模板
    ob.forEach(item => {
      let targetPath = `${item[1]}`.replace('./template', `${targetBasePath}`)
      console.log(item, targetPath)
      if (item[0] === 'file') {
        let fileData = fs.readFileSync(item[1])
        fs.writeFileSync(targetPath, fileData)
        // downCallback()
        curent++
      } else {
        fs.mkdirSync(targetPath)
        // downCallback()
        curent++
      }
    })
    if (curent === ob.length) {
      console.log('模板下载完成')
      ora(chalk.rgb(212, 22, 34)('模板下载完成'))
      insper.stop()
    }
  })
}
// ob = [['dir', './template/pages'],['file','./template/pages/App.js']]
function fsFileArr (path) {
  // 采用同步读取方式
  const filesPathArr = fs.readdirSync(path)
  filesPathArr.forEach(itemPath => {
    let itemFilePath = `${path}/${itemPath}`
    let stat = fs.statSync(itemFilePath)
    // 判断是否是文件夹
    if (stat.isDirectory()) {
      ob.push(['dir', itemFilePath])
      // 递归读取文件夹
      // console.log(itemFilePath) // ./template/pages
      fsFileArr(itemFilePath)
    } else {
      ob.push(['file', itemFilePath])
    }
  })
}
function downCallback () {
  ob.shift()
  if (ob.length === 0) {

  }
}
module.exports = parseCommand

// 数据驱动思维
// 触发事件 -> 改变dom 原生时代
// 触发事件 -> 改变数据 -> 数据重新渲染dom  vue、react
// ob = [['dir', './pages'],['file','./pages/App.js']]