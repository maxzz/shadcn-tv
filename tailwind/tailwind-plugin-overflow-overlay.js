const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {

    /*
    Don't use plugin: tailwind cannot have two overlays: auto and overlay at the same time and will break for Firefox. Use index.css instead: 
        @layer utilities {
            .overflow-overlay {
                overflow: auto;
                overflow: overlay;
            }
        }
        //TODO: Is it still true? It is still true for tailwind 3.2.0.
    */
    
    const overlays = {
        '.overflow-overlay': {
            'overflow': 'auto',
            'overflow': 'overlay',
        },
        '.overflow-y-overlay': {
            'overflow-y': 'auto',
            'overflow-y': 'overlay',
        },
        '.overflow-x-overlay': {
            'overflow-x': 'auto',
            'overflow-x': 'overlay',
        },

        "@supports (overflow: overlay)": {
            ".overflow-overlay": {
                'overflow': "overlay",
            },
            '.overflow-y-overlay': {
                'overflow-y': 'overlay',
            },
            '.overflow-x-overlay': {
                'overflow-x': 'overlay',
            },
        }
    };
    addUtilities(overlays);

    const smallscroll = {
        /* Firefox scrollbars */
        ".smallscroll": {
            "--sb-width": "8px",
            "--sb-radius": "4px",
            "--sb-color": "#666b7a",
            scrollbarColor: "var(--sb-color) transparent",
            scrollbarWidth: "thin",
        },

        /* Chrome scrollbars */
        ".smallscroll::-webkit-scrollbar": {
            width: "var(--sb-width)",
            height: "var(--sb-width)",
            backgroundColor: "transparent"
        },

        ".smallscroll::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--sb-color)",
            borderRadius: "var(--sb-radius)"
        },

        ".smallscroll::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
        },
    };
    addUtilities(smallscroll);

    // Additional customizations can be done from the app like: [&::-webkit-resizer]:rounded
    const resizer = {
        ".resizer": {
            "&::-webkit-resizer": {
                backgroundColor: 'transparent',
                backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAG11AABzoAAA9q8AAIWZAABumgAA57sAADF9AAAXvQF2CngAAABESURBVHjajM67DQAgDENBw6x0WZDtHi3KR4klF5ausAAVvf8u0TGjgwFlMEUeepR+DCj72CJAC9AkW8OM4QMAAP//AwD5ltVB1vqf0gAAAABJRU5ErkJggg==")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                backgroundSize: '95% 95%',
            }
        },
    };
    addUtilities(resizer);

});
