import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    if (id.includes("@radix-ui")) {
        return "radix-ui";
    }
    if (id.includes("recharts")) {
        return "recharts";
    }
    if (id.includes("@codemirror")) {
        return "codemirror";
    }
    // if (id.includes("node_modules")) {
    //     return "vendor";
    // }
}

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
