'use strict';

import React, {useCallback, useMemo, useRef, useState, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import {ColDef, ColGroupDef, Grid, GridOptions, GridReadyEvent} from '@ag-grid-community/core';
import {TAthlete, getData} from './data';
import {ModuleRegistry} from '@ag-grid-community/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import './styles.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [gridKey, setGridKey] = useState<string>(`grid-key-${Math.random()}`);
    const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState<any[]>(getData());

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {field: 'name', headerName: 'Athlete', width: 250},
        {field: 'person.country', headerName: 'Country'},
        {field: 'person.age', headerName: 'Age'},
        {field: 'medals.gold', headerName: 'Gold Medals'},
        {field: 'medals.silver', headerName: 'Silver Medals'},
        {field: 'medals.bronze', headerName: 'Bronze Medals'},
    ]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        const checkbox = document.querySelector<HTMLInputElement>('#pinFirstColumnOnLoad')!;
        const shouldPinFirstColumn = checkbox && checkbox.checked;
        if (shouldPinFirstColumn) {
            params.api.applyColumnState({
                state: [
                    {colId: 'name', pinned: 'left'},
                ],
            });
        }

    }, []);

    const reloadGrid = useCallback(() => {
        // Trigger re-load by assigning a new key to the Grid React component
        setGridKey(`grid-key-${Math.random()}`);
    }, [])

    return (
        <div style={containerStyle}>
            <div className="test-container">
                <div className="test-header">
                    <div style={{ "marginBottom": "1rem" }}>
                        <input type="checkbox" id="pinFirstColumnOnLoad" />
                        <label htmlFor="pinFirstColumnOnLoad">Pin first column on load</label>
                    </div>

                    <div style={{ "marginBottom": "1rem" }}>
                        <button id="reloadGridButton" onClick={reloadGrid}>Reload Grid</button>
                    </div>
                </div>

                <div style={gridStyle} className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/}>
                    <AgGridReact
                        key={gridKey}
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection={'multiple'}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><GridExample/></StrictMode>);
