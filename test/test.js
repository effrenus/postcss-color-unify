import postcss from 'postcss';
import test    from 'ava';

import plugin from '../';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('does something', t => {
    return run(t,
        'a{color: rgb(222, 49, 49) } b{color: rgb(224, 44, 44) }',
        'a{color: #DE3131 } b{color: #DE3131 }', { });
});
