const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      'MyAssets': path.resolve(__dirname, 'src/assets/')
    }
  },
  // Use development mode to prevent minification of css.
  mode: 'development',
  context: path.resolve(__dirname),
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  // Add to head tag.
  entry: [
    './src/index.js',
    './src/styles.scss',
  ],
  // Location of compiled js.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Test for performance on js and css during compilation.
  performance: {
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js', '.css');
    }
  },
  // Define the modules used to compile.
  module: {
    rules: [
      // Twig is used for templating.
      {
        test: /\.twig$/,
        use: [
          'raw-loader',
          'twig-html-loader',
          {
            loader: 'twig-html-loader',
            // Set namespaces to be used in twig for shorthand paths.
            options: {
              namespaces: {
                'layouts': 'src/assets/templates/layouts',
                'components': 'src/assets/templates/components'
              },
              data: (context) => {
                const data = path.join(__dirname, 'src/assets/example_data/cases.json');
                context.addDependency(data); // Force webpack to watch file
                return context.fs.readJsonSync(data, { throws: false }) || {};
              }
            }
          }
        ]
      },
      {
        // The image types to compile.
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
            }
          },
        ],
      },
      {
        // Use scss as a preprocessor for css.
        test: /\.(s*)css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
            },
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              // Or array of paths
              resources: ['src/assets/scss/custom-variables.scss', 'src/assets/scss/bootstrap-custom.scss']
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: './[name].[ext]'}
          }
        ],
      },
    ],
  },
  // Define each template output separately.
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'frontpage.html',
      template: 'src/assets/templates/layouts/frontpage.twig',
    }),
    new HtmlWebpackPlugin({
      filename: 'search-results.html',
      template: 'src/assets/templates/layouts/search-results.twig',
    }),
    new HtmlWebpackPlugin({
      filename: 'search-results-agendas.html',
      template: 'src/assets/templates/layouts/search-results-agendas.twig',
    }),
    new HtmlWebpackPlugin({
      filename: 'agenda.html',
      template: 'src/assets/templates/layouts/agenda.twig',
    }),
    new HtmlWebpackPlugin({
      filename: 'static.html',
      template: 'src/assets/templates/layouts/static.twig',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin([
      { from: 'src/assets/example_data/cases.json', to: 'assets/example_data/cases.json' },
    ]),
  ],
};
