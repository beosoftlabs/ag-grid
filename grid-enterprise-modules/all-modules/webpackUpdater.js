const fs = require('fs');
const glob = require("glob");

const frameworkModules = [
    'react',
    'angular',
    'vue',
    'vue3',
    'solid'
];

const cssModules = [
    'styles'
];

const modules = glob.sync("../../grid-community-modules/*")
    .concat(glob.sync("../../grid-enterprise-modules/*"))
    .filter(module => !frameworkModules.includes(module.replace(`../../grid-community-modules/`, '')))
    .filter(module => !frameworkModules.includes(module.replace(`../../grid-enterprise-modules/`, '')))
    .filter(module => !cssModules.includes(module.replace(`../../grid-community-modules/`, '')))
    .filter(module => module.indexOf('all-modules') === -1)
    .filter(module => module.indexOf('charts') === -1) // we add charts below
    .map(module => glob.sync(`${module}/src/*Module.ts`)[0])
    .map(module => module.replace('.ts', ''))
    .map(module => {
        // this relies on the module name within the module class to be the same as the filename
        const directory = module.substring(0, module.lastIndexOf('/src'));
        const filename = module.substring(module.lastIndexOf('/') + 1);
        const moduleName = filename.charAt(0).toUpperCase() + filename.slice(1);
        return {
            directory,
            moduleName
        }
    });

const moduleRequireLines = modules.map(module => `var ${module.moduleName} = require('${module.directory}');`);
const moduleRegisterLines = modules.filter(module => module.directory.indexOf('core') === -1) // exclude core - we don't register core
    .map(module => `agGrid.ModuleRegistry.register(${module.moduleName}.${module.moduleName});`)
    .concat('agGrid.ModuleRegistry.register(GridChartsModule.GridChartsModule);')
const moduleIsUmdLine = `agGrid.ModuleRegistry.__setIsBundled();`

const css = glob.sync("./styles/*.css")
    .filter(css => css.indexOf('.min.css') === -1)
    .map(css => `require('${css}');`);

const webpackBase = fs.readFileSync('./webpack-base.config.js', 'UTF-8').toString();

const generatedFileTemplate = `/**
 * AUTOMATICALLY GENERATED FILE, DO NOT EDIT MANUALLY!
 * Update this file by running \`lerna run webpack-updater\` in the monorepo root folder.
 */
`;

function getWebpackNoStyles(chartsEnterprise) {
    return generatedFileTemplate + moduleRequireLines.concat(`var GridChartsModule = require('../../grid-enterprise-modules/charts${chartsEnterprise ? '-enterprise' : ''}');`).join('\n').concat('\n')
        .concat(webpackBase)
        .concat(moduleRegisterLines.join('\n').concat('\n'))
        .concat(moduleIsUmdLine.concat('\n'));
}

const webpackCommunityChartsNoStyles = getWebpackNoStyles(false);
fs.writeFileSync('./webpack-no-styles.js', webpackCommunityChartsNoStyles);

const webpackEnterpriseChartsNoStyles = getWebpackNoStyles(true);
fs.writeFileSync('./webpack-chartsEnterprise-no-styles.js', webpackEnterpriseChartsNoStyles);

const webpackCommunityStyles = webpackCommunityChartsNoStyles.concat(css.join('\n'));
fs.writeFileSync('./webpack-with-styles.js', webpackCommunityStyles);

const webpackEnterpriseStyles = webpackEnterpriseChartsNoStyles.concat(css.join('\n'));
fs.writeFileSync('./webpack-chartsEnterprise-with-styles.js', webpackEnterpriseStyles);


