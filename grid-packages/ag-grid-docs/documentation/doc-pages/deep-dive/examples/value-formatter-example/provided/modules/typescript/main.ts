import { createGrid, ColDef, GridApi, GridOptions } from '@ag-grid-community/core';
import '@ag-grid-community/styles/ag-grid.css';
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry, ValueFormatterParams } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

// Grid API: Access to Grid API methods
let gridApi: GridApi;

// Grid Options: Contains all of the grid configurations
const gridOptions: GridOptions = {
  // Data to be displayed
  rowData: [] as IRow[],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    { 
      field: "mission", 
      filter: true 
    },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { 
      field: "price",
      valueFormatter: (params: ValueFormatterParams) => { return '£' + params.value.toLocaleString(); } 
    },
    { field: "successful" },
    { field: "rocket" }
  ] as ColDef[],
  // Configurations applied to all columns
  defaultColDef: {
    filter: true
  } as ColDef,
  // Grid Options
  pagination: true
}

// Create Grid: Create new grid within the #myGrid div, using the Grid Options object
gridApi = createGrid(document.querySelector<HTMLElement>('#myGrid')!, gridOptions);

// Fetch Remote Data
fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
  .then(response => response.json())
  .then((data: any) => gridApi.setGridOption('rowData', data))