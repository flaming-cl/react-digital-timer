const url = require('rollup-plugin-url');
const styles = require('rollup-plugin-styles');

module.exports = {
    rollup(config, options) {
        config.plugins = [
            url({
                limit: 100000,
                include: ['**/*.png', '**/*.woff2'],
            }),
            styles(),
            ...config.plugins,
        ]
        return config;
    },
};
