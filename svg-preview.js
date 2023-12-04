#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// 指定SVG文件所在的目录
const svgDirectory = process.argv[2];

// 读取SVG文件列表
fs.readdir(svgDirectory, (err, files) => {
  if (err) {
    console.error('Error reading SVG directory:', err)
    return
  }

  // 创建HTML文件并写入基本结构
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SVG Collection</title>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
          background: #efefef;
        }
        div {
          margin: 20px;
        }
        svg {
          min-width: 100px;
        }
      </style>
    </head>
    <body>
  `

  // 将每个SVG文件的内容添加到HTML中
  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const svgPath = path.join(svgDirectory, file)
      const svgContent = fs.readFileSync(svgPath, 'utf-8')
      htmlContent += `<div class="${file}">${svgContent}</div>`
    }
  })

  // 完成HTML文件
  htmlContent += `
    </body>
    </html>
  `

  // 将HTML写入文件
  const htmlFilePath = path.join('./', 'svg_collection.html')
  fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8')

  // 打开默认浏览器查看HTML文件
  const { exec } = require('child_process')
  exec(`start ${htmlFilePath}`)
})
