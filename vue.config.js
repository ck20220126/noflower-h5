// lodash 按需加载
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const LessFunc = require('less-plugin-functions');
const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

// 主题文件
const themeLess = resolve('src/style/theme.less');

const plugins = [new LodashModuleReplacementPlugin()];

module.exports = {
    lintOnSave: true,
    /* chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@/comps', resolve('src/components'))
    }, */
    configureWebpack: {
        resolve: {
            alias: Object.assign(
                {
                    '@': path.resolve(__dirname, 'src/'),
                    utils: path.resolve(__dirname, 'src/utils/'),
                    comps: path.resolve(__dirname, 'src/components/'),
                    styles: path.resolve(__dirname, 'src/styles'),
                }
                // (process.env.VUE_APP_CURRENTMODE == 'prod'
                //   ? {
                //     'vconsole': '@geeeger/fn-empty-class'
                //   }
                //   : {}
                // )
            ),
        },
        plugins: plugins,
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${themeLess}";`,
                },
                plugins: [new LessFunc()],
            },
        },
    },
    productionSourceMap: false,
};
