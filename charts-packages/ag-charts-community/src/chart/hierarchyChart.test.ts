import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { AgChartOptions } from './agChartOptions';
import { AgChartV2 } from './agChartV2';
import { Chart, ChartUpdateType } from './chart';
import {
    waitForChartStability,
    IMAGE_SNAPSHOT_DEFAULTS,
    setupMockCanvas,
    extractImageData,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
} from './test/utils';
import * as examples from './test/examples';
import { HierarchyChart } from './hierarchyChart';
import { TreemapSeries } from './series/hierarchy/treemapSeries';

expect.extend({ toMatchImageSnapshot });

describe('HierarchyChart', () => {
    let ctx = setupMockCanvas();

    const compare = async (chart: Chart) => {
        await waitForChartStability(chart);

        const imageData = extractImageData(ctx);
        (expect(imageData) as any).toMatchImageSnapshot(IMAGE_SNAPSHOT_DEFAULTS);
    };

    describe('Series Highlighting', () => {
        beforeEach(() => {
            console.warn = jest.fn();
        });

        afterEach(() => {
            expect(console.warn).not.toBeCalled();
        });

        it('should render a complex chart', async () => {
            const options: AgChartOptions = { ...examples.MARKET_INDEX_TREEMAP_GRAPH_EXAMPLE };
            options.autoSize = false;
            options.width = CANVAS_WIDTH;
            options.height = CANVAS_HEIGHT;

            const chart = AgChartV2.create<any>(options);
            await compare(chart);
        });

        const childAtDepth = [7, 13, 0, 0];
        it.each([0, 1, 2, 3])(`should render highlight at depth %s`, async (depth) => {
            const options: AgChartOptions = { ...examples.MARKET_INDEX_TREEMAP_GRAPH_EXAMPLE };
            options.autoSize = false;
            options.width = CANVAS_WIDTH;
            options.height = CANVAS_HEIGHT;

            const chart: HierarchyChart = AgChartV2.create<any>(options);
            await waitForChartStability(chart);

            const seriesImpl = chart.series[0] as TreemapSeries;
            let node = seriesImpl['dataRoot'];
            let childIndexes = [...childAtDepth];
            while (depth > 0) {
                node = node?.children![childIndexes.shift() ?? 0];
                depth--;
            }

            chart.changeHighlightDatum({ datum: node as any });
            chart.update(ChartUpdateType.SERIES_UPDATE);
            await compare(chart);
        });
    });
});
