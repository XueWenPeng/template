const path = require('path');
const fs = require('fs');

// Get the working directory of the file executed by node
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolve absolute path from relative path
 * @param {string} relativePath relative path
 */
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// Default module extension
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];

/**
 * Resolve module path
 * @param {function} resolveFn resolve function
 * @param {string} filePath file path
 */
function resolveModule(resolveFn, filePath) {
  // Check if the file exists
  const extension = moduleFileExtensions.find((ex) => fs.existsSync(resolveFn(`${filePath}.${ex}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.ts`); // default is .ts
}

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appIndex: resolveModule(resolveApp, 'src/index'), // Package entry path
  appHtml: resolveApp('public/index.html'),
  appFav: resolveApp('public/favicon.ico'),
  appNodeModules: resolveApp('node_modules'), // node_modules path
  appSrc: resolveApp('src'),
  appSrcComponents: resolveApp('src/components'),
  appSrcUtils: resolveApp('src/utils'),
  appSrcPages: resolveApp('src/pages'),
  appSrcRoutes: resolveApp('src/routes'),
  appSrcApi: resolveApp('src/api'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appProxySetup: resolveModule(resolveApp, 'src/setProxy'),
  moduleFileExtensions,
};
