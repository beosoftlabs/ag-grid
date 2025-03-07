'use strict';

import React, { useCallback, useMemo, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef, GetContextMenuItemsParams, GetMainMenuItemsParams, GridReadyEvent } from '@ag-grid-community/core';
import MenuItem from './menuItem';
import { IOlympicData } from './interfaces'
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';


// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ExcelExportModule, RangeSelectionModule, ClipboardModule])

const GridExample = () => {    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete'},
        { field: 'country' },
        { field: 'sport' },
        { field: 'year'},
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => { return {
        flex: 1,
        minWidth: 100,
    } }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then((data: IOlympicData[]) => {
                setRowData( data);
            });
    }, []);

    const getMainMenuItems = useCallback((params: GetMainMenuItemsParams) => {
        return [
            ...params.defaultItems,
            'separator',
            {
                name: 'Click Alert Button and Close Menu',
                menuItem: MenuItem,
                menuItemParams: {
                    buttonValue: 'Alert'
                }
            },
            {
                name: 'Click Alert Button and Keep Menu Open',
                suppressCloseOnSelect: true,
                menuItem: MenuItem,
                menuItemParams: {
                    buttonValue: 'Alert'
                }
            }
        ];
    }, []);

    const getContextMenuItems = useCallback((params: GetContextMenuItemsParams) => {
        return [
            ...(params.defaultItems || []),
            'separator',
            {
                name: 'Click Alert Button and Close Menu',
                menuItem: MenuItem,
                menuItemParams: {
                    buttonValue: 'Alert'
                }
            },
            {
                name: 'Click Alert Button and Keep Menu Open',
                suppressCloseOnSelect: true,
                menuItem: MenuItem,
                menuItemParams: {
                    buttonValue: 'Alert'
                }
            }
        ]
    }, []);

    return  (
        <div style={containerStyle}>
            <div  style={gridStyle} className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/}>
                <AgGridReact<IOlympicData>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    getMainMenuItems={getMainMenuItems}
                    getContextMenuItems={getContextMenuItems}
                    suppressMenuHide
                    reactiveCustomComponents
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><GridExample /></StrictMode>);
