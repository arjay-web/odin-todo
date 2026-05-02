import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default {
    entry: {
        app: "./src/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            title: 'Todo App',
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(_dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
        ],
    },
};