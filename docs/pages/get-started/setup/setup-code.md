# Set Up Code Files

The Data Steward Admin Tool contains code files that pipe data from multiple spreadsheets and save files to specific folders.

In your version of the Data Steward Admin Tool, update variables referencing sheets or folders in Atlas to the correct spreadsheet IDs from your copy of the Atlas directory. Replace the `{path}` section of the code below for each file with the correct spreadsheet or folder ID indicated by the path described in the curly braces.

##### utils.gs

```javascript
// update when setting up Atlas
const admin_sql_folder = '{Atlas > Admin > SQL/}';
```

##### activity-data.gs

```javascript
// update when setting up Atlas
const activity_data_id = '{Atlas > Modules > Thematic Data > Internal > Tabular > activity data}';
```

##### thematic-data.gs

```javascript
// update when setting up Atlas
const thematic_data_id = '{Atlas > Modules > Thematic Data > Shared Externally > Data Catalog}';
```

##### activity-location-data.gs

```javascript
// update when setting up Atlas
const activity_location_data_id = '{Atlas > Modules > Actiivty Location Data / Activity Location Data Compiler}';
```

##### compile-ald.gs

```javascript
// update when setting up Atlas
const inventory_id = '{Atlas > Atlas Data Inventory}';
const compile_id = '{Atlas > Modules > Actiivty Location Data / Activity Location Data Compiler}';
const tmp_folder = '{Atlas > Admin > tmp/}';
```

