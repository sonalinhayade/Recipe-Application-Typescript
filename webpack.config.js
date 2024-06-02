const path = require('path');

module.exports = {
    entry: './src/index.tsx', // Specify the entry point as index.tsx
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Specify the output directory
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Add .tsx and .ts as valid extensions
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Use ts-loader to handle TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
