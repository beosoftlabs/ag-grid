import {
  GridApi,
  createGrid,
  ColDef,
  GridOptions,
  ColumnMenuVisibleChangedEvent
} from '@ag-grid-community/core';

const columnDefs: ColDef[] = [
  { field: 'athlete', minWidth: 200 },
  { field: 'age' },
  { field: 'country', minWidth: 200 },
  { field: 'year' },
  { field: 'sport', minWidth: 200 },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
]

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
  },
  columnMenu: 'new',
  onColumnMenuVisibleChanged: (event: ColumnMenuVisibleChangedEvent) => {
    console.log('columnMenuVisibleChanged', event);
  },
}

function showColumnChooser() {
  gridApi.showColumnChooser();
}

function showColumnFilter(colKey: string) {
  gridApi.showColumnFilter(colKey);
}

function showColumnMenu(colKey: string) {
  gridApi.showColumnMenu(colKey);
}

function hideColumnChooser() {
  gridApi.hideColumnChooser();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then((data: IOlympicData[]) => gridApi!.setGridOption('rowData', data))
})
