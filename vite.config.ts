import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    if (id.includes("@radix-ui")) { // 204.10 kB
        return "02-radix-ui";
    }
    if (id.includes("@codemirror")) {
        return "codemirror";
    }
    if (id.includes("recharts")) { // 329.81 kB
        return "03-recharts";
    }
    if (id.includes("@nivo")) { // 409.60 kB
        return "04-nivo";
    }
    if (id.includes("embla")) { // 27.29 kB
        return "05-embla";
    }
    if (id.includes("@tanstack")) { // 60.77 kB
        return "06-tanstack";
    }
    if (id.includes("xarrows")) { // 120.15 kB
        return "07-xarrows";
    }
    if (id.includes("react-draggable")) { // 19.86 kB
        return "08-react-draggable";
    }
    // if (id.includes("react-day-picker")) { return "react-day-picker"; } // 2.05 kB
    // if (id.includes("node_modules")) { return "vendor"; } // bad idea
}

/*
import { createLogger, defineConfig } from 'vite';

const logger = createLogger();
const loggerInfo = logger.info;

logger.info = (msg, options) => {
    if (msg.includes('Could not Fast Refresh')) {
        return;
    }
    loggerInfo(msg, options);
};
*/

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    //customLogger: logger,
    build: {
        // chunkSizeWarningLimit: 600,
        target: "esnext",
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks,
            },
        },
    },
    plugins: [
        react(),

        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ],
});
