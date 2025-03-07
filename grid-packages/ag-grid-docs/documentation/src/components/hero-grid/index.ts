/**
 * Hero Grid demo
 */

// NOTE: Only typescript types should be imported from the AG Grid packages
// to prevent AG Grid from loading the code twice
import { GetRowIdParams, GridOptions, GridSizeChangedEvent, ISetFilter, GridApi } from 'ag-grid-community';
import { createGenerator } from '../../utils/grid/generator-utils';
import { COLUMN_ID_PRIORITIES, FILTER_ROWS_BREAKPOINT, UPDATE_INTERVAL } from './constants';
import { columnDefs, generateStocks, generateStockUpdate } from './data';
import { fixtureData } from './rowDataFixture';

let api: GridApi;
const rowData = generateStocks();
const generator = createGenerator({
    interval: UPDATE_INTERVAL,
    callback: () => {
        if (!api) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * rowData.length);
        const stockToUpdate = rowData[randomIndex];
        const newStock = generateStockUpdate(stockToUpdate);

        rowData[randomIndex] = newStock;
        api.applyTransactionAsync({
            update: [newStock],
        });
    },
});
const gridOptions: GridOptions = {
    columnDefs,
    rowData,
    rowHeight: 48,
    headerHeight: 30,
    domLayout: 'autoHeight',
    animateRows: false,
    getRowId: ({ data }: GetRowIdParams) => {
        return data.stock;
    },
    onGridSizeChanged(params: GridSizeChangedEvent) {
        const columnsToShow: string[] = [];
        const columnsToHide: string[] = [];
        let totalWidth: number = 0;
        let hasFilledColumns = false;
        COLUMN_ID_PRIORITIES.forEach((colId) => {
            const col = params.api.getColumn(colId);
            const minWidth = col?.getMinWidth() || 0;
            const newTotalWidth = totalWidth + minWidth;

            if (!hasFilledColumns && newTotalWidth <= params.clientWidth) {
                columnsToShow.push(colId);
                totalWidth = newTotalWidth;
            } else {
                hasFilledColumns = true;
                columnsToHide.push(colId);
            }
        });

        // show/hide columns based on current grid width
        params.api.setColumnsVisible(columnsToShow, true);
        params.api.setColumnsVisible(columnsToHide, false);

        params.api.getColumnFilterInstance<ISetFilter>('stock').then(stockFilter => {
            const stocks = stockFilter!.getFilterValues();
            const values = innerWidth < FILTER_ROWS_BREAKPOINT ? stocks.slice(0, 6) : stocks;
            
            stockFilter!.setModel({
                values,
            }).then(() => {
                params.api.onFilterChanged();
            });
        })!;
    },
};

/*
 * Initialise the grid using plain JavaScript, so grid can be dynamically loaded.
 */
export function initGrid({
    selector,
    suppressUpdates,
    useStaticData,
}: {
    selector: string;
    suppressUpdates?: boolean;
    useStaticData?: boolean;
}) {
    const init = () => {
        const gridDiv = document.querySelector(selector);
        if (!gridDiv) {
            return;
        }

        if (useStaticData) {
            gridOptions.rowData = fixtureData;
        }
        gridOptions.popupParent = document.querySelector('body');
        gridOptions.onGridReady = () => {
            if (suppressUpdates) {
                return;
            }

            generator.start();
        };
        api = globalThis.agGrid.createGrid(gridDiv, gridOptions);

        gridDiv.classList.add('loaded');
    };

    const loadGrid = function () {
        if (document.querySelector(selector) && globalThis.agGrid) {
            init();
        } else {
            requestAnimationFrame(() => loadGrid());
        }
    };

    loadGrid();
}

export function cleanUp() {
    generator.stop();
    api?.destroy();

    // Clean up tooltip, if user mouse happens to be hovering over
    document.querySelector('.ag-sparkline-tooltip-wrapper')?.remove();
}

/**
 * Clean up between hot module replacement on dev server
 */
// @ts-ignore
if (import.meta.webpackHot) {
    // @ts-ignore
    import.meta.webpackHot.dispose(() => {
        cleanUp();
    });
}
