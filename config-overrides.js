const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 设置为true
  }),
  // 添加loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#30C6B3' }, // 修改主题颜色
  })
)