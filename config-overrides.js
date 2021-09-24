const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc',
    src: path.resolve(__dirname, 'src'),
  }),
);