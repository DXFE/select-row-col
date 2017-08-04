/**
 * @Creator: Liuyanqing
 * @Date: 8/4/17
 */
'use strict';

export var throttle = function throttle(fn, delay, mustRunDelay) {
    var timer = null;
    var t_start = void 0;
    return function () {
        var context = this,
            args = arguments,
            t_curr = +new Date();
        clearTimeout(timer);
        if (!t_start) {
            t_start = t_curr;
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(throttle, 'throttle', 'src/lib/utils.js');
}();

;