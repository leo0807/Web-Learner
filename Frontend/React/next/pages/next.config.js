const withCss = require('@zwit/next-css');
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { };
}

module.exports = withCss({})