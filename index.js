var postcss = require('postcss');
var Color = require('color');
var messages = require('postcss-message-helpers');
var helpers = require('./helpers');

var PLUGIN_NAME = 'postcss-color-unify';

module.exports = postcss.plugin(PLUGIN_NAME, function transformDecl(opts) {
    var colorMapper = new Map();
    var colors = [];

    opts = Object.assign({
        verbose:  false,
        jndDelta: 2.3 // just noticeable difference
    }, opts || {});

    return function (style) {
        style.walkDecls(/^color/, decl => {
            if (decl.value.match(/rgba|hsla/i)) {
                // doesn't support rgba notation and hsla
                return;
            }

            messages.try(function () {
                var color = new Color(decl.value);
                var hexColorVal = color.hexString();
                var jndColor;

                if (!colorMapper.has(hexColorVal)) {
                    jndColor = helpers.findJNDColor(color, colors, opts.jndDelta);
                    if (!colors.some(v => jndColor.hexString() === v.hexString())) {
                        colors.push(jndColor);
                    }
                    colorMapper.set(hexColorVal, jndColor);
                }

                if (opts.verbose) {
                    console.log('verbose');
                } else {
                    decl.value = colorMapper.get(hexColorVal).hexString();
                }
            }, decl.source);
        });
    };
});
