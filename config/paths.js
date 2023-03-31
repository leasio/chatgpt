const path = require('path');

function resolveResource(filename) {
  return path.resolve(__dirname, `../${filename}`);
}

module.exports = {
  clientEntry: resolveResource('src/index.tsx'),
  serverEntry: resolveResource('src/server.tsx'),
  sourceDir: resolveResource('src'),
  distDir: resolveResource('dist'),
};