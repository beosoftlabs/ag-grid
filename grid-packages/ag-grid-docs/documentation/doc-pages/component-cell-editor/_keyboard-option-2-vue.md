<framework-specific-section frameworks="vue">
<snippet transform={false}>
|const KEY_UP = 'ArrowUp';
|const KEY_DOWN = 'ArrowDown';
|
|const MyGrid = {
|    template: `
|       &lt;ag-grid-vue
|           class="ag-theme-quartz"
|           :columnDefs="columnDefs">
|       &lt;/ag-grid-vue>
|    `,
|    components: {
|        'ag-grid-vue': AgGridVue
|    },
|    data: function () {
|        return {
|            columnDefs: [
|               {
|                   headerName: "Value Column",
|                   field: "value",
|                   suppressKeyboardEvent: params => {
|                       console.log('cell is editing: ' + params.editing);
|                       console.log('keyboard event:', params.event);
|                
|                       // return true (to suppress) if editing and user hit up/down keys
|                       const key = params.event.key;
|                       const gridShouldDoNothing = params.editing && (key === KEY_UP || key === KEY_DOWN);
|                       return gridShouldDoNothing;
|                   }
|               }
|            ]
|        }
|    },
|
|    // rest of the component
|}
</snippet>
</framework-specific-section>