var colorDiff = require('color-diff');

function findJNDColor(color, colors, jndDelta) {
    var nearest = color;

    if (!colors.length) {
        return nearest;
    }

    var c1 = colorDiff.rgb_to_lab({ R: color.red(), G: color.green(), B: color.blue() });
    colors.some(color2 => {
        var c2 = colorDiff.rgb_to_lab({ R: color2.red(), G: color2.green(), B: color2.blue() });
        var delta = colorDiff.diff(c1, c2);
        if (delta <= jndDelta) {
            nearest = color2;
            return true;
        }
        return false;
    });

    return nearest;
}

module.exports = {
    findJNDColor
};
