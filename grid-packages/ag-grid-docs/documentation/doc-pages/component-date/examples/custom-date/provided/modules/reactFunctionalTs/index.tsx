
'use strict';

import React, { useCallback, useMemo, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import './styles.css';
import { ColDef } from '@ag-grid-community/core';
import CustomDateComponent from './customDateComponent';
import { IOlympicData } from './interfaces'
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        {
            field: 'date',
            minWidth: 190,
        },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => { return {
        editable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
    } }, []);
    const components = useMemo<{ [p: string]: any; }>(() => ({ agDateInput: CustomDateComponent }), []);

    const onGridReady = useCallback(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then((data: IOlympicData[]) => {
                setRowData( data.map(row => {
                    const dateParts = (row.date as any).split('/');
                    const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                    return {
                        ...row,
                        date
                    };
                }));
            });
    }, []);

    return  (
        <div style={containerStyle}>      
            <div  style={gridStyle} className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/}>
                <AgGridReact<IOlympicData>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    components={components}
                    reactiveCustomComponents
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><GridExample /></StrictMode>);
