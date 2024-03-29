const path = require('path');

module.exports = {
    entry: {
        acceleratingMetronome: './src/accelerating-metronome.ts',
        calculator: './src/calculator.ts',
        flashcards: './src/flashcards.ts',
        metronome: './src/metronome.ts',
        oldEnglishLetters: './src/old-english-letters.ts',
        scheduledMetronome: './src/scheduled-metronome.ts',
        timer: './src/timer.ts',
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery",
    },
    //devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        // {
        //     test: /flashcards/,
        //     use: 'exports-loader?selectDeck()'
        // }
        // // {
        //     test: /flashcards/,
        //     use: [{
        //         loader: 'expose-loader',
        //         options: 'selectDeck()'
        //     }]
        // }],
    ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'static/js'),
        library: 'MyLibrary',
        libraryTarget: 'var'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
};
