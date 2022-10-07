'use strict';

const provideArguments = (input, fn) => {
    const src = fn.toString();
    const paramSignature = src.substring(src.indexOf('(') + 1, src.indexOf(')'));
    const params = paramSignature.split(',').map(s => s.trim());
    const args = params.map(
      param => param.startsWith('{') ? input.record : input[param]
    );
    return args;
};

module.exports = provideArguments;
