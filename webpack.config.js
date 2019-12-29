const path = require('path');

module.exports = {
    entry: './src/flashcards.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'flashcards.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
