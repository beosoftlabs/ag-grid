---
title: "Cell Data Types"
---

Working with values of different data types is made easy by using cell data types.

This allows different grid features to work without any additional configuration, including [Rendering](/cell-content/), [Editing](/cell-editing/), [Filtering](/filtering/), [Sorting](/row-sorting/), [Row Grouping](/grouping/) and Import & Export ([CSV Export](/csv-export/), [Excel Export](/excel-export/), [Clipboard](/clipboard/)).

## Enable Cell Data Types

There are six pre-defined cell data types: `'text'`, `'number'`, `'boolean'`, `'date'`, `'dateString'` and `'object'`.

These are enabled by default, with the data type being inferred from the row data if possible (see [Inferring Data Types](#inferring-data-types)).

Specific cell data types can also be defined by setting the `cellDataType` property on the column definition.

<snippet spaceBetweenProperties="true">
|const gridOptions = {
|    columnDefs: [
|        {
|            field: 'athlete',
|            // enables cell data type `text`
|            cellDataType: 'text'
|        }
|    ]
|}
</snippet>

The following example demonstrates the six pre-defined cell data types (inferred from the row data):
- The **Athlete** column has a `'text'` data type.
- The **Age** column has a `'number'` data type.
- The **Gold** column has a `'boolean'` data type.
- The **Date** column has a `'date'` data type (cell values are `Date` objects).
- The **Date (String)** column has a `'dateString'` data type (cell values are `string`s representing dates).
- The **Country** column has an `'object'` data type. This also [Overrides the Pre-Defined Cell Data Type Definition](#overriding-the-pre-defined-cell-data-type-definitions) so that the value parser and formatter work with the object structure.

<grid-example title='Enable Cell Data Types' name='enable-cell-data-types' type='generated'></grid-example>

## Inferring Data Types

By default the grid will infer cell data types the first time that row data is passed into the grid.

For inference to work for a column, it must contain non-null values and have the `field` property set. The resolved column definition (including the default column definition and column types) must also not have the Value Getter, Value Parser or reference data properties set, or be using [Sparklines](/sparklines-overview/). If these conditions are not met, no cell data type will be set (it will need to be defined directly on the column if desired).

Data type inference can be disabled by setting `cellDataType = false` on an individual column, or for all columns on the [Default Column Definition](/column-definitions/#default-column-definitions).

Note that where inference is possible but it does not match any of the pre-defined cell data types, it will default to `object`.

<note>
Inferring cell data types only works for the Client-Side Row Model. For other row models, you will need to define cell data types for each column.
</note>

## Pre-Defined Cell Data Types

Each of the pre-defined cell data types work by setting specific column definition properties with default values/callbacks. This enables the different grid features to work correctly for that data type.

The column definition properties that are set based on the cell data type will override any in the [Default Column Definition](/column-definitions/#default-column-definitions), but will be overridden by any [Column Type](/column-definitions/#default-column-definitions) properties as well as properties set directly on individual column definitions. Note that for `filterParams`, only nested properties on the default column definition will be overridden (rather than the entire object).

If you wish to override one of the properties set below for all types, you can do so by creating a [Column Type](/column-definitions/#default-column-definitions), and assigning the column type to the [Default Column Definition](/column-definitions/#default-column-definitions).

All the cell data types set the following (unless specified):
- A [Value Parser](/value-parsers/) to convert from `string` to the relevant data type.
- A [Value Formatter](/value-formatters/) to convert from the relevant data type to `string` (except for `'text'`).
- A [Key Creator](/grouping-complex-objects/#creating-group-keys-from-complex-objects) which uses the Value Formatter to allow Row Grouping to work (except for `'number'` and `'text'`).

Note that when using cell data types, the Value Formatter will not run for values in group columns (as they have already been formatted), or for aggregated values where the data type can differ. To apply custom formatting in these cases, cell data types will need to be disabled for the underlying columns.

### Text

The `'text'` cell data type is used for `string` values. As most grid functionality works directly with `string` values, the `'text'` cell data type does not set any properties outside of the ones specified above for all data types.

### Number

The `'number'` cell data type is used for `number` values.

The following properties are set:
- The [Number Cell Editor](/provided-cell-editors-number/) is used for editing.
- For AG Grid Community, the [Number Filter](/filter-number/) is used.
- For AG Grid Enterprise, `filterParams.comparator` is set to [Sort the Filter List](/filter-set-filter-list/#sorting-filter-lists).

To show only a certain number of decimal places, you can [Override the Pre-Defined Cell Data Type Definition](#overriding-the-pre-defined-cell-data-type-definitions) and provide your own Value Formatter. It is also possible to control the number of decimal places allowed during editing, by providing a precision to the [Number Cell Editor](/provided-cell-editors-number/).

### Boolean

The `'boolean'` cell data type is used for `boolean` values.

The following properties are set:
- The [Checkbox Cell Renderer](/cell-rendering/#checkbox-cell-renderer) is used for rendering, which displays a checkbox.
- The [Checkbox Cell Editor](/provided-cell-editors-checkbox/) is used for editing (similar to the renderer).
- `suppressKeyboardEvent` is set to enable the <kbd>␣ Space</kbd> key to toggle the renderer value.
- For AG Grid Community, the [Text Filter](/filter-text/) is used, and `filterParams` is set to display a single dropdown with `'True'`/`'False'` (or equivalents with [Localisation](/localisation/)).
- For AG Grid Enterprise, `filterParams.valueFormatter` is set to show `'True'`/`'False'` (or equivalents with [Localisation](/localisation/)).

### Date

The `'date'` cell data type is used for date values that are represented as `Date` objects.

The default Value Parser and Value Formatter use the ISO string format `'yyyy-mm-dd'`. If you wish to use a different date format, then you can [Override the Pre-Defined Cell Data Type Definition](#overriding-the-pre-defined-cell-data-type-definitions).

The following properties are set:
- The [Date Cell Editor](/provided-cell-editors-date/) is used for editing.
- For AG Grid Enterprise, the [Set Filter Tree List](/filter-set-tree-list/) is enabled, and the [Values are Formatted](/filter-set-tree-list/#formatting-values) by setting `filterParams.treeListFormatter` to convert the months to names and `filterParams.valueFormatter` to format the Floating Filter values using the Value Formatter.

### Date as String

The `'dateString'` cell data type is used for date values that are represented as `string` values.

This data type uses the ISO string format `'yyyy-mm-dd'`. If you wish to use a different date format, then you can [Override the Pre-Defined Cell Data Type Definition](#overriding-the-pre-defined-cell-data-type-definitions).

The following properties are set:
- The [Date as String Cell Editor](/provided-cell-editors-date/#enabling-date-as-string-cell-editor) is used for editing.
- For AG Grid Community, the [Date Filter](/filter-text/) is used, and `filterParams.comparator` is set to parse the `string` date values.
- For AG Grid Enterprise, the [Set Filter Tree List](/filter-set-tree-list/) is enabled, with `filterParams.treeListPathGetter` set to convert the `string` date values into paths, and the [Values are Formatted](/filter-set-tree-list/#formatting-values) by setting `filterParams.treeListFormatter` to convert the months to names and `filterParams.valueFormatter` to format the Floating Filter values using the Value Formatter.

### Object

The `'object'` cell data type is used for values that are complex objects (e.g. none of the above data types).

If you have different types of complex object, you will want to [Provide Custom Cell Data Types](#providing-custom-cell-data-types).

<note>
For objects to work properly, you must provide a Value Formatter, and a Value Parser if editing is enabled. This is because their behaviour needs to change based on the object structure. Generally these should be provided on the data type definition, but they can be provided directly on the column if necessary.
</note>

The following properties are set:
- `cellEditorParams.useFormatter = true` so that the cell editor uses the Value Formatter.
- A `comparator` is defined to allow [Custom Sorting](/row-sorting/#custom-sorting) using the Value Formatter.
- For AG Grid Community, a [Filter Value Getter](/value-getters/#filter-value-getters) is used to convert the value with the Value Formatter.
- For AG Grid Enterprise, `filterParams.valueFormatter` is set to format the values using the Value Formatter.

### Pre-Defined Cell Data Type Example

The [Enable Cell Data Types Example](#example-enable-cell-data-types) above demonstrates each of the different pre-defined cell data types with AG Grid Community.

The example below shows the same data types in AG Grid Enterprise:
- Row grouping is enabled allowing each of the fields to be grouped on.
- Import/Export features are enabled allowing the following:
    - Clipboard (copy/paste)
    - Fill handle
    - CSV/Excel export

<grid-example title='Pre-Defined Cell Data Types' name='pre-defined-cell-data-types' type='generated' options='{ "enterprise": true, "modules": ["clientside", "menu", "range", "rowgrouping", "excel", "clipboard", "setfilter"] }'></grid-example>

## Providing Custom Cell Data Types

Custom cell data types can be added by setting the grid option `dataTypeDefinitions`.

<api-documentation source='grid-options/properties.json' section='columns' names='["dataTypeDefinitions"]' ></api-documentation>

<snippet spaceBetweenProperties="true">
|const gridOptions = {
|    dataTypeDefinitions: {
|        percentage: {
|            extendsDataType: 'number',
|            baseDataType: 'number',
|            valueFormatter: params => params.value == null
|                ? ''
|                : `${Math.round(params.value * 100)}%`,
|        }
|    }
|}
</snippet>

Each custom data type definition must have a `baseDataType` of one of the six [Pre-Defined Cell Data Types](#pre-defined-cell-data-types), which represents the data type of the underlying cell values.

Data type definitions support inheritance via the `extendsDataType` property. Each custom cell data type must either extend one of the pre-defined types, or another custom type. Any non-overridden properties are inherited from the parent definition. To prevent inheriting properties from the parent definition, `suppressDefaultProperties = true` can be set on the definition.

[Column Types](/column-definitions/#default-column-definitions) can be set via the `columnTypes` property to allow other column definition properties to be set for the data type. By default these will replace any column types against the parent definition. To allow these to be appended to the parent definition column types, `appendColumnTypes = true` can be set.

To allow [Inferring Cell Data Types](#inferring-cell-data-types) to work for custom types, the `dataTypeMatcher` property can be set. This returns `true` if the value is of the correct type. Note that the data type matchers will be called in the order they are provided in `dataTypeDefinitions` (for custom only), and then the pre-defined data type matchers will be called.

The following example demonstrates providing custom cell data types:
- The **Country** column contains complex objects and has a cell data type of `'country'`.
- The **Sport** column contains a different type of complex object and has a cell data type of `'sport'`.
- The `dataTypeMatcher` callback is defined for both cell data types to allow inferring the type.

<grid-example title='Providing Custom Cell Data Types' name='providing-custom-cell-data-types' type='generated' options='{ "enterprise": true, "modules": ["clientside", "menu", "range", "setfilter"] }'></grid-example>

## Overriding the Pre-Defined Cell Data Type Definitions

The default properties for the [Pre-Defined Cell Data Types](#pre-defined-cell-data-types) can be overridden if desired.

For example, this is required if a different date format is desired.

This works in the same way as when [Providing Custom Cell Data Types](#providing-custom-cell-data-types).

<snippet spaceBetweenProperties="true">
|const gridOptions = {
|    dataTypeDefinitions: {
|        // override `date` to handle custom date format `dd/mm/yyyy`
|        date: {
|            baseDataType: 'date',
|            extendsDataType: 'date',
|            valueParser: params => {
|                if (params.newValue == null) {
|                   return null;
|                }
|                // convert from `dd/mm/yyyy`
|                const dateParts = params.newValue.split('/');
|                return dateParts.length === 3 ? new Date(
|                    parseInt(dateParts[2]),
|                    parseInt(dateParts[1]) - 1,
|                    parseInt(dateParts[0])
|                ) : null;
|            },
|            valueFormatter: params => {
|                // convert to `dd/mm/yyyy`
|                return params.value == null
|                    ? ''
|                    : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear}`;
|            },
|        }
|    }
|}
</snippet>

The following example demonstrates overriding pre-defined cell data types:
- The **Date** column is of type `'dateString'` which has been overridden to use a different date format (`dd/mm/yyyy`).
- The data type definition for `'dateString'` provides a `dateParser` and `dateFormatter` as it is a [Date as String Data Type Definition](#date-as-string-data-type-definition).

<grid-example title='Overriding Pre-Defined Cell Data Types' name='overriding-pre-defined-cell-data-types' type='generated'></grid-example>
### Date as String Data Type Definition

If overriding `'dateString'` due to a different date format, then a couple of extra properties need to be set to handle conversion between `Date` objects and the desired `string` format.

<interface-documentation interfaceName='DateStringDataTypeDefinition' names='["dateParser", "dateFormatter"]' config='{"description":""}'></interface-documentation>
