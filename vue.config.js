const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
  parallel: false,
  css: {
    loaderOptions: {
      // 这里的选项会传递给 postcss-loader
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            viewportHeight: 667,
            minPixelValue: 1, // 小于或等于`1px`不转换
            unitPrecision: 3, // vw值的小数位数
            // Circle 组件需要，否则环形会有问题
            // https://github.com/youzan/vant/issues/1948
            selectorBlackList: [".ignore", ".hairlines", "van-circle__layer"],
          }),
        ],
      },
    },
  },
  chainWebpack: config => {
    // vant 按需引入
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`,
              }),
            ],
          }),
          compilerOptions: {
            module: "es2015",
          },
        });
        return options;
      });
  },
};
