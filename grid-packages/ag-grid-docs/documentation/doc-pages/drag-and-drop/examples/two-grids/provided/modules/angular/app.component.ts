import { Component } from '@angular/core';

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

@Component({
    standalone: true,
    imports: [AgGridAngular],
    selector: 'my-app',
    template: `
        <div class="outer">
            <div style="height: 100%;" class="inner-col" (dragover)="gridDragOver($event)"
                 (drop)="gridDrop($event,'left')">
                <ag-grid-angular
                        style="height: 100%"
                        [class]="themeClass"
                        [gridOptions]="leftGridOptions"
                        [columnDefs]="columnDefs"
                        (gridReady)="onGridReady($event,'left')">
                </ag-grid-angular>
            </div>

            <div class="inner-col factory-panel">
                <span id="eBin" (dragover)="binDragOver($event)" (drop)="binDrop($event)" class="factory factory-bin">
                    <i class="far fa-trash-alt"><span class="filename"> Trash - </span></i>
                    Drop target to destroy row
                </span>
                <span draggable="true" (dragstart)="dragStart($event,'Red')" class="factory factory-red">
                    <i class="far fa-plus-square"><span class="filename"> Create - </span></i>
                    Drag source for new red item
                </span>
                <span draggable="true" (dragstart)="dragStart($event,'Green')" class="factory factory-green">
                    <i class="far fa-plus-square"><span class="filename"> Create - </span></i>
                    Drag source for new green item
                </span>
                <span draggable="true" (dragstart)="dragStart($event,'Blue')" class="factory factory-blue">
                    <i class="far fa-plus-square"><span class="filename"> Create - </span></i>
                    Drag source for new blue item
                </span>
            </div>

            <div style="height: 100%;" class="inner-col" (dragover)="gridDragOver($event)"
                 (drop)="gridDrop($event,'right')">
                <ag-grid-angular
                        style="height: 100%"
                        [class]="themeClass"
                        [gridOptions]="rightGridOptions"
                        [columnDefs]="columnDefs"
                        (gridReady)="onGridReady($event,'right')">
                </ag-grid-angular>
            </div>
        </div>
    `
})
export class AppComponent {
    themeClass = /** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/;
    
    private leftGridApi!: GridApi<IOlympicData>;
    private rightGridApi!: GridApi<IOlympicData>;
    
    rowIdSequence = 100;

    columnDefs: ColDef[] = [
        { field: "id", dndSource: true },
        { field: "color" },
        { field: "value1" },
        { field: "value2" }
    ];

    leftGridOptions: GridOptions = {
        defaultColDef: {
            flex: 1,
            filter: true,
        },
        rowClassRules: {
            "red-row": 'data.color == "Red"',
            "green-row": 'data.color == "Green"',
            "blue-row": 'data.color == "Blue"',
        },
        getRowId: (params) => {
            return params.data.id
        },
        rowData: this.createLeftRowData(),
        rowDragManaged: true,
    };

    rightGridOptions: GridOptions = {
        defaultColDef: {
            flex: 1,
            filter: true,
        },
        rowClassRules: {
            "red-row": 'data.color == "Red"',
            "green-row": 'data.color == "Green"',
            "blue-row": 'data.color == "Blue"',
        },
        getRowId: (params) => {
            return params.data.id
        },
        rowData: [],
        rowDragManaged: true,
    };

    createLeftRowData() {
        const data: any[] = [];
        ['Red', 'Green', 'Blue'].forEach((color) => {
            data.push(this.createDataItem(color));
        });
        return data;
    }

    createDataItem(color: string) {
        return {
            id: this.rowIdSequence++,
            color: color,
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 100)
        };
    }

    binDragOver(event: any) {
        var dragSupported = event.dataTransfer.types.indexOf('application/json') >= 0;
        if (dragSupported) {
            event.dataTransfer.dropEffect = "move";
            event.preventDefault();
        }
    }

    binDrop(event: any) {
        event.preventDefault();
        var jsonData = event.dataTransfer.getData("application/json");
        var data = JSON.parse(jsonData);

        // if data missing or data has no id, do nothing
        if (!data || data.id == null) {
            return;
        }

        var transaction = {
            remove: [data]
        };

        var rowIsInLeftGrid = !!this.leftGridApi.getRowNode(data.id);
        if (rowIsInLeftGrid) {
            this.leftGridApi.applyTransaction(transaction);
        }

        var rowIsInRightGrid = !!this.rightGridApi.getRowNode(data.id);
        if (rowIsInRightGrid) {
            this.rightGridApi.applyTransaction(transaction);
        }
    }

    dragStart(event: any, color: string) {
        var newItem = this.createDataItem(color);
        var jsonData = JSON.stringify(newItem);
        event.dataTransfer.setData('application/json', jsonData);
    }

    gridDragOver(event: any) {
        var dragSupported = event.dataTransfer.types.length;

        if (dragSupported) {
            event.dataTransfer.dropEffect = "copy";
            event.preventDefault();
        }
    }

    gridDrop(event: any, grid: string) {
        event.preventDefault();

        var jsonData = event.dataTransfer.getData('application/json');
        var data = JSON.parse(jsonData);

        // if data missing or data has no it, do nothing
        if (!data || data.id == null) {
            return;
        }

        var gridApi = grid == 'left' ? this.leftGridApi : this.rightGridApi;

        // do nothing if row is already in the grid, otherwise we would have duplicates
        var rowAlreadyInGrid = !!gridApi!.getRowNode(data.id);
        if (rowAlreadyInGrid) {
            console.log('not adding row to avoid duplicates in the grid');
            return;
        }

        var transaction = {
            add: [data]
        };
        gridApi!.applyTransaction(transaction);
    }

    onGridReady(params: GridReadyEvent, grid: 'left' | 'right') {
        if (grid === 'left') {
            this.leftGridApi = params.api;
        } else {
            this.rightGridApi = params.api;
        }
    }

}
