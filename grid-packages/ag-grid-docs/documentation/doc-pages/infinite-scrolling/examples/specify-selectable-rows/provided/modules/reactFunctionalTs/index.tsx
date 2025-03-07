'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact, CustomCellRendererProps } from '@ag-grid-community/react';
import { ColDef, GridReadyEvent, IDatasource, ModuleRegistry, IRowNode } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import "@ag-grid-community/styles/ag-theme-quartz.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule]);

const GridExample = () => {

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        // this row shows the row index, doesn't use any data from the row
        {
            headerName: 'ID',
            maxWidth: 100,
            // it is important to have node.id here, so that when the id changes (which happens
            // when the row is loaded) then the cell is refreshed.
            valueGetter: 'node.id',
            cellRenderer: (props: CustomCellRendererProps) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
                }
            },
        },
        { field: 'athlete', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 200, checkboxSelection: true },
        { field: 'year' },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            sortable: false,
        }
    }, []);
    const isRowSelectable = useCallback(function (rowNode: IRowNode) {
        return rowNode.data ? rowNode.data.country === 'United States' : false;
    }, []);


    const onGridReady = useCallback((params: GridReadyEvent) => {

        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => {
                const dataSource: IDatasource = {
                    rowCount: undefined,
                    getRows: (params) => {
                        // console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                        // At this point in your code, you would call the server.
                        // To make the demo look real, wait for 500ms before returning
                        setTimeout(function () {
                            // take a slice of the total rows
                            const rowsThisPage = data.slice(params.startRow, params.endRow);
                            // if on or after the last page, work out the last row.
                            let lastRow = -1;
                            if (data.length <= params.endRow) {
                                lastRow = data.length;
                            }
                            // call the success callback
                            params.successCallback(rowsThisPage, lastRow);
                        }, 500);
                    },
                };
                params.api.setGridOption('datasource', dataSource);
            });
    }, []);


    return (
        <div style={containerStyle}>

            <div style={gridStyle} className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowBuffer={0}
                    rowSelection={'multiple'}
                    isRowSelectable={isRowSelectable}
                    rowModelType={'infinite'}
                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={2}
                    infiniteInitialRowCount={1}
                    maxBlocksInCache={2}
                    onGridReady={onGridReady}
                />
            </div>

        </div>
    );

}

const root = createRoot(document.getElementById('root')!);
root.render(<GridExample />);
