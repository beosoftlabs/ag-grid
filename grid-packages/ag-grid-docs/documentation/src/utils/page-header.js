import { agChartsVersion, agGridVersion } from 'utils/consts';

export const getHeaderTitle = (title, framework = 'react', isCharts = false, version = '') =>
    `${getProductType(framework, isCharts, version)}: ${title}`;

export const getProductType = (framework, isCharts = false, version = '') =>
    `${getFrameworkName(framework)}${version} ${isCharts ? 'Charts' : 'Data Grid'}`;

export const getFrameworkName = (framework) => {
    const mappings = {
        react: 'React',
        angular: 'Angular',
        vue: 'Vue',
        javascript: 'JavaScript',
    };

    return mappings[framework] || '';
};

export const getGridVersionMessage = (framework) =>
    `Download v${agGridVersion.split('.')[0]} of the best ${getProductType(framework, false)} in the world now.`;
export const getChartsVersionMessage = (framework) =>
    `Download v${agChartsVersion.split('.')[0]} of our ${getProductType(framework, true)} now.`;
