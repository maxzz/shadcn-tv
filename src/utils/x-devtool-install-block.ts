/**
 * For electron app. Block the message "Download the React DevTools" in console.
 * add import './x-devtool-install-block'; before import 'react' in main.tsx.
 */
(function () {
    const orginalInfo = console.info;
    console.info = function (...rest: any[]) {
        if (!/Download the React DevTools/.test(rest[0])) {
            orginalInfo.apply(console, rest);
        }
    };
})();
