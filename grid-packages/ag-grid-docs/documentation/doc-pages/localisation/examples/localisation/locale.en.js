// Example locale file for English, give this to your locale team to translate

const AG_GRID_LOCALE_EN = {
    // Set Filter
    selectAll: '(Select All)',
    selectAllSearchResults: '(Select All Search Results)',
    addCurrentSelectionToFilter: 'Add current selection to filter',
    searchOoo: 'Search...',
    blanks: '(Blanks)',
    noMatches: 'No matches',

    // Number Filter & Text Filter
    filterOoo: 'Filter...',
    equals: 'Equals',
    notEqual: 'Does not equal',
    blank: 'Blank',
    notBlank: 'Not blank',
    empty: 'Choose one',

    // Number Filter
    lessThan: 'Less than',
    greaterThan: 'Greater than',
    lessThanOrEqual: 'Less than or equal to',
    greaterThanOrEqual: 'Greater than or equal to',
    inRange: 'Between',
    inRangeStart: 'From',
    inRangeEnd: 'To',

    // Text Filter
    contains: 'Contains',
    notContains: 'Does not contain',
    startsWith: 'Begins with',
    endsWith: 'Ends with',

    // Date Filter
    dateFormatOoo: 'yyyy-mm-dd',
    before: 'Before',
    after: 'After',

    // Filter Conditions
    andCondition: 'AND',
    orCondition: 'OR',

    // Filter Buttons
    applyFilter: 'Apply',
    resetFilter: 'Reset',
    clearFilter: 'Clear',
    cancelFilter: 'Cancel',

    // Filter Titles
    textFilter: 'Text Filter',
    numberFilter: 'Number Filter',
    dateFilter: 'Date Filter',
    setFilter: 'Set Filter',

    // Group Column Filter
    groupFilterSelect: 'Select field:',

    // Advanced Filter
    advancedFilterContains: 'contains',
    advancedFilterNotContains: 'does not contain',
    advancedFilterTextEquals: 'equals',
    advancedFilterTextNotEqual: 'does not equal',
    advancedFilterStartsWith: 'begins with',
    advancedFilterEndsWith: 'ends with',
    advancedFilterBlank: 'is blank',
    advancedFilterNotBlank: 'is not blank',
    advancedFilterEquals: '=',
    advancedFilterNotEqual: '!=',
    advancedFilterGreaterThan: '>',
    advancedFilterGreaterThanOrEqual: '>=',
    advancedFilterLessThan: '<',
    advancedFilterLessThanOrEqual: '<=',
    advancedFilterTrue: 'is true',
    advancedFilterFalse: 'is false',
    advancedFilterAnd: 'AND',
    advancedFilterOr: 'OR',
    advancedFilterApply: 'Apply',
    advancedFilterBuilder: 'Builder',
    advancedFilterValidationMissingColumn: 'Column is missing',
    advancedFilterValidationMissingOption: 'Option is missing',
    advancedFilterValidationMissingValue: 'Value is missing',
    advancedFilterValidationInvalidColumn: 'Column not found',
    advancedFilterValidationInvalidOption: 'Option not found',
    advancedFilterValidationMissingQuote: 'Value is missing an end quote',
    advancedFilterValidationNotANumber: 'Value is not a number',
    advancedFilterValidationInvalidDate: 'Value is not a valid date',
    advancedFilterValidationMissingCondition: 'Condition is missing',
    advancedFilterValidationJoinOperatorMismatch: 'Join operators within a condition must be the same',
    advancedFilterValidationInvalidJoinOperator: 'Join operator not found',
    advancedFilterValidationMissingEndBracket: 'Missing end bracket',
    advancedFilterValidationExtraEndBracket: 'Too many end brackets',
    advancedFilterValidationMessage: 'Expression has an error. ${variable} - ${variable}.',
    advancedFilterValidationMessageAtEnd: 'Expression has an error. ${variable} at end of expression.',
    advancedFilterBuilderTitle: 'Advanced Filter',
    advancedFilterBuilderApply: 'Apply',
    advancedFilterBuilderCancel: 'Cancel',
    advancedFilterBuilderAddButtonTooltip: 'Add Filter or Group',
    advancedFilterBuilderRemoveButtonTooltip: 'Remove',
    advancedFilterBuilderMoveUpButtonTooltip: 'Move Up',
    advancedFilterBuilderMoveDownButtonTooltip: 'Move Down',
    advancedFilterBuilderAddJoin: 'Add Group',
    advancedFilterBuilderAddCondition: 'Add Filter',
    advancedFilterBuilderSelectColumn: 'Select a column',
    advancedFilterBuilderSelectOption: 'Select an option',
    advancedFilterBuilderEnterValue: 'Enter a value...',
    advancedFilterBuilderValidationAlreadyApplied: 'Current filter already applied.',
    advancedFilterBuilderValidationIncomplete: 'Not all conditions are complete.',
    advancedFilterBuilderValidationSelectColumn: 'Must select a column.',
    advancedFilterBuilderValidationSelectOption: 'Must select an option.',
    advancedFilterBuilderValidationEnterValue: 'Must enter a value.',

    // Side Bar
    columns: 'Columns',
    filters: 'Filters',

    // columns tool panel
    pivotMode: 'Pivot Mode',
    groups: 'Row Groups',
    rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    values: 'Values',
    valueColumnsEmptyMessage: 'Drag here to aggregate',
    pivots: 'Column Labels',
    pivotColumnsEmptyMessage: 'Drag here to set column labels',

    // Header of the Default Group Column
    group: 'Group',

    // Row Drag
    rowDragRow: 'row',
    rowDragRows:'rows',

    // Other
    loadingOoo: 'Loading...',
    loadingError: 'ERR',
    noRowsToShow: 'No Rows To Show',
    enabled: 'Enabled',

    // Menu
    pinColumn: 'Pin Column',
    pinLeft: 'Pin Left',
    pinRight: 'Pin Right',
    noPin: 'No Pin',
    valueAggregation: 'Value Aggregation',
    noAggregation: 'None',
    autosizeThiscolumn: 'Autosize This Column',
    autosizeAllColumns: 'Autosize All Columns',
    groupBy: 'Group by',
    ungroupBy: 'Un-Group by',
    ungroupAll: 'Un-Group All',
    addToValues: 'Add ${variable} to values',
    removeFromValues: 'Remove ${variable} from values',
    addToLabels: 'Add ${variable} to labels',
    removeFromLabels: 'Remove ${variable} from labels',
    resetColumns: 'Reset Columns',
    expandAll: 'Expand All Row Groups',
    collapseAll: 'Close All Row Groups',
    copy: 'Copy',
    ctrlC: 'Ctrl+C',
    ctrlX: 'Ctrl+X',
    copyWithHeaders: 'Copy With Headers',
    copyWithGroupHeaders: 'Copy with Group Headers',
    cut: 'Cut',
    paste: 'Paste',
    ctrlV: 'Ctrl+V',
    export: 'Export',
    csvExport: 'CSV Export',
    excelExport: 'Excel Export',
    columnFilter: 'Column Filter',
    columnChooser: 'Choose Columns',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortUnSort: 'Clear Sort',

    // Enterprise Menu Aggregation and Status Bar
    sum: 'Sum',
    first: 'First',
    last: 'Last',
    min: 'Min',
    max: 'Max',
    none: 'None',
    count: 'Count',
    avg: 'Average',
    filteredRows: 'Filtered',
    selectedRows: 'Selected',
    totalRows: 'Total Rows',
    totalAndFilteredRows: 'Rows',
    more: 'More',
    to: 'to',
    of: 'of',
    page: 'Page',
    pageLastRowUnknown: '?',
    nextPage: 'Next Page',
    lastPage: 'Last Page',
    firstPage: 'First Page',
    previousPage: 'Previous Page',
    pageSizeSelectorLabel: 'Page Size:',
    footerTotal: 'Total',

    // Pivoting
    pivotColumnGroupTotals: 'Total',

    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    pivotChart: 'Pivot Chart',
    chartRange: 'Chart Range',

    columnChart: 'Column',
    groupedColumn: 'Grouped',
    stackedColumn: 'Stacked',
    normalizedColumn: '100% Stacked',

    barChart: 'Bar',
    groupedBar: 'Grouped',
    stackedBar: 'Stacked',
    normalizedBar: '100% Stacked',

    pieChart: 'Pie',
    pie: 'Pie',
    doughnut: 'Doughnut',

    line: 'Line',

    xyChart: 'X Y (Scatter)',
    scatter: 'Scatter',
    bubble: 'Bubble',

    areaChart: 'Area',
    area: 'Area',
    stackedArea: 'Stacked',
    normalizedArea: '100% Stacked',

    histogramChart: 'Histogram',
    histogramFrequency: "Frequency",

    polarChart: 'Polar',
    radarLine: 'Radar Line',
    radarArea: 'Radar Area',
    nightingale: 'Nightingale',
    radialColumn: 'Radial Column',
    radialBar: 'Radial Bar',

    statisticalChart: 'Statistical',
    boxPlot: 'Box Plot',
    rangeBar: 'Range Bar',
    rangeArea: 'Range Area',

    hierarchicalChart: 'Hierarchical',
    treemap: 'Treemap',
    sunburst: 'Sunburst',

    specializedChart: 'Specialized',
    waterfall: 'Waterfall',
    heatmap: 'Heatmap',

    combinationChart: 'Combination',
    columnLineCombo: 'Column & Line',
    AreaColumnCombo: 'Area & Column',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Settings',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    radiusAxis: 'Radius Axis',
    navigator: 'Navigator',
    color: 'Color',
    thickness: 'Thickness',
    preferredLength: 'Preferred Length',
    xType: 'X Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    autoRotate: 'Auto Rotate',
    xRotation: 'X Rotation',
    yRotation: 'Y Rotation',
    labelRotation: 'Rotation',
    circle: 'Circle',
    polygon: 'Polygon',
    orientation: 'Orientation',
    fixed: 'Fixed',
    parallel: 'Parallel',
    perpendicular: 'Perpendicular',
    radiusAxisPosition: 'Position',
    ticks: 'Ticks',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    calloutLabels: 'Callout Labels',
    sectorLabels: 'Sector Labels',
    positionRatio: 'Position Ratio',
    size: 'Size',
    shape: 'Shape',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    lineDash: 'Line Dash',
    lineDashOffset: 'Dash Offset',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeColor: 'Line Color',
    strokeOpacity: 'Line Opacity',
    histogramBinCount: 'Bin count',
    connectorLine: 'Connector Line',
    seriesItems: 'Series Items',
    seriesItemType: 'Item Type',
    seriesItemPositive: 'Positive',
    seriesItemNegative: 'Negative',
    seriesItemLabels: 'Item Labels',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    polarGroup: 'Polar',
    statisticalGroup: 'Statistical',
    hierarchicalGroup: 'Hierarchical',
    specializedGroup: 'Specialized',
    combinationGroup: 'Combination',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    doughnutTooltip: 'Doughnut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    radialColumnTooltip: 'Radial Column',
    radialBarTooltip: 'Radial Bar',
    radarLineTooltip: 'Radar Line',
    radarAreaTooltip: 'Radar Area',
    nightingaleTooltip: 'Nightingale',
    rangeBarTooltip: 'Range Bar',
    rangeAreaTooltip: 'Range Area',
    boxPlotTooltip: 'Box Plot',
    treemapTooltip: 'Treemap',
    sunburstTooltip: 'Sunburst',
    waterfallTooltip: 'Waterfall',
    heatmapTooltip: 'Heatmap',
    columnLineComboTooltip: 'Column & Line',
    areaColumnComboTooltip: 'Area & Column',
    customComboTooltip: 'Custom Combination',
    innerRadius: 'Inner Radius',
    startAngle: 'Start Angle',
    endAngle: 'End Angle',
    groupPadding: 'Group Padding',
    seriesPadding: 'Series Padding',
    group: 'Group',
    tile: 'Tile',
    whisker: 'Whisker',
    cap: 'Cap',
    capLengthRatio: 'Length Ratio',
    labelPlacement: 'Placement',
    inside: 'Inside',
    outside: 'Outside',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
    chartSettingsToolbarTooltip: 'Menu',
    chartLinkToolbarTooltip: 'Linked to Grid',
    chartUnlinkToolbarTooltip: 'Unlinked from Grid',
    chartDownloadToolbarTooltip: 'Download Chart',
    seriesChartType: 'Series Chart Type',
    seriesType: 'Series Type',
    secondaryAxis: 'Secondary Axis',

    // ARIA
    ariaAdvancedFilterBuilderItem: '${variable}. Level ${variable}. Press ENTER to edit.',
    ariaAdvancedFilterBuilderItemValidation: '${variable}. Level ${variable}. ${variable} Press ENTER to edit.',
    ariaAdvancedFilterBuilderList: 'Advanced Filter Builder List',
    ariaAdvancedFilterBuilderFilterItem: 'Filter Condition',
    ariaAdvancedFilterBuilderGroupItem: 'Filter Group',
    ariaAdvancedFilterBuilderColumn: 'Column',
    ariaAdvancedFilterBuilderOption: 'Option',
    ariaAdvancedFilterBuilderValueP: 'Value',
    ariaAdvancedFilterBuilderJoinOperator: 'Join Operator',
    ariaAdvancedFilterInput: 'Advanced Filter Input',
    ariaChecked: 'checked',
    ariaColumn: 'Column',
    ariaColumnGroup: 'Column Group',
    ariaColumnFiltered: 'Column Filtered',
    ariaColumnSelectAll: 'Toggle Select All Columns',
    ariaDateFilterInput: 'Date Filter Input',
    ariaDefaultListName: 'List',
    ariaFilterColumnsInput: 'Filter Columns Input',
    ariaFilterFromValue: 'Filter from value',
    ariaFilterInput: 'Filter Input',
    ariaFilterList: 'Filter List',
    ariaFilterToValue: 'Filter to value',
    ariaFilterValue: 'Filter Value',
    ariaFilterMenuOpen: 'Open Filter Menu',
    ariaFilteringOperator: 'Filtering Operator',
    ariaHidden: 'hidden',
    ariaIndeterminate:'indeterminate',
    ariaInputEditor: 'Input Editor',
    ariaMenuColumn: 'Press ALT DOWN to open column menu',
    ariaFilterColumn: 'Press CTRL ENTER to open filter',
    ariaRowDeselect: 'Press SPACE to deselect this row',
    ariaRowSelectAll: 'Press Space to toggle all rows selection',
    ariaRowToggleSelection: 'Press Space to toggle row selection',
    ariaRowSelect: 'Press SPACE to select this row',
    ariaSearch: 'Search',
    ariaSortableColumn: 'Press ENTER to sort',
    ariaToggleVisibility: 'Press SPACE to toggle visibility',
    ariaToggleCellValue: 'Press SPACE to toggle cell value',
    ariaUnchecked: 'unchecked',
    ariaVisible: 'visible',
    ariaSearchFilterValues: 'Search filter values',
    ariaPageSizeSelectorLabel: 'Page Size',

    // ARIA Labels for Drop Zones
    ariaRowGroupDropZonePanelLabel: 'Row Groups',
    ariaValuesDropZonePanelLabel: 'Values',
    ariaPivotDropZonePanelLabel: 'Column Labels',
    ariaDropZoneColumnComponentDescription: 'Press DELETE to remove',
    ariaDropZoneColumnValueItemDescription: 'Press ENTER to change the aggregation type',
    ariaDropZoneColumnGroupItemDescription: 'Press ENTER to sort',
    // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeparator}{column name}
    ariaDropZoneColumnComponentAggFuncSeparator: ' of ',
    ariaDropZoneColumnComponentSortAscending: 'ascending',
    ariaDropZoneColumnComponentSortDescending: 'descending',

    // ARIA Labels for Dialogs
    ariaLabelColumnMenu: 'Column Menu',
    ariaLabelColumnFilter: 'Column Filter',
    ariaLabelCellEditor: 'Cell Editor',
    ariaLabelDialog: 'Dialog',
    ariaLabelSelectField: 'Select Field',
    ariaLabelRichSelectField: 'Rich Select Field',
    ariaLabelTooltip: 'Tooltip',
    ariaLabelContextMenu: 'Context Menu',
    ariaLabelSubMenu: 'SubMenu',
    ariaLabelAggregationFunction: 'Aggregation Function',
    ariaLabelAdvancedFilterAutocomplete: 'Advanced Filter Autocomplete',
    ariaLabelAdvancedFilterBuilderAddField: 'Advanced Filter Builder Add Field',
    ariaLabelAdvancedFilterBuilderColumnSelectField: 'Advanced Filter Builder Column Select Field',
    ariaLabelAdvancedFilterBuilderOptionSelectField: 'Advanced Filter Builder Option Select Field',
    ariaLabelAdvancedFilterBuilderJoinSelectField: 'Advanced Filter Builder Join Operator Select Field',

    // ARIA Labels for the Side Bar
    ariaColumnPanelList: 'Column List',
    ariaFilterPanelList: 'Filter List',

    // Number Format (Status Bar, Pagination Panel)
    thousandSeparator: ',',
    decimalSeparator: '.',

    // Data types
    true: 'True',
    false: 'False',
    invalidDate: 'Invalid Date',
    invalidNumber: 'Invalid Number',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
}