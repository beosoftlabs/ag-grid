import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';

let gridApi: GridApi;

const gridOptions: GridOptions = {
    columnDefs: [
      { field: 'country', rowGroup: true },
      { field: 'athlete' },
    ],
    autoGroupColumnDef: {
        cellRendererSelector: (params) => {
            if (['Australia', 'Norway'].includes(params.node.key!)) {
                return; // use Default Cell Renderer
            }
            return { component: 'agGroupCellRenderer' };
        },
    },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    gridApi = createGrid(gridDiv, gridOptions);
  
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(response => response.json())
      .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data))
});
