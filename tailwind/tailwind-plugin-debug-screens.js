module.exports = function ({ addComponents, theme }) {
    //https://github.com/jorenvanhee/tailwindcss-debug-screens
    //use: add class 'debug-screens' on any top element

    const screens = theme('screens'); // {sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'}

    const userStyles = theme('debugScreens.style', {});
    const ignoredScreens = theme('debugScreens.ignore', ['dark']);
    const prefix = theme('debugScreens.prefix', 'screen: ');
    const selector = theme('debugScreens.selector', '.debug-screens');

    const defaultPosition = ['bottom', 'left'];
    const position = theme('debugScreens.position', defaultPosition);
    const positionY = position[0] || defaultPosition[0];
    const positionX = position[1] || defaultPosition[1];

    const screenEntries = Object.entries(screens);

    const components = {
        [`${selector}::before`]: Object.assign({
            position: 'fixed',
            zIndex: '2147483647',
            [positionY]: '6px',
            [positionX]: '4px',
            padding: '.5em',
            fontSize: '12px',
            lineHeight: '1',
            fontFamily: 'sans-serif',
            borderRadius: '3px',
            border: '1px solid #b1b1b1',
            backgroundColor: '#0008',
            color: '#ddd',
            boxShadow: '0 0 2px 2px #fff5',
            content: `'${prefix}${screenEntries?.[0]?.[0] ? `less then ${screenEntries?.[0]?.[0]} (${screenEntries?.[0]?.[1]})` : '_'}'`,
        }, userStyles),
    };

    screenEntries
        .filter(([screen]) => !ignoredScreens.includes(screen))
        .forEach(([screen, size]) => {
            components[`@screen ${screen}`] = {
                [`${selector}::before`]: {
                    content: `'${prefix}${screen} (${size})'`,
                },
            };
        });

    addComponents(components);
};
