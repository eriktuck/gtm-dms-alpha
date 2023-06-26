# Set up Data Steward Admin Tool

Before you begin, make sure you are logged into your work-issued Google Workspace account where the Atlas project will be stored.

1. Follow this [link](https://script.google.com/d/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit?usp=sharing) to access the Data Steward Admin Tool.
2. In the **Overview** window (see the left sidebar), click **Make a Copy**. 
   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_q0QiNe3nSW.png)
3. The script project will be copied to your repository on [script.google.com](https://script.google.com/home) as `Copy of Data Steward Admin`. 
4. Rename the project to `Data Steward Admin`.
5. Close the original Data Steward Admin project.
6. In your version of `Data Steward Admin`, update variables referencing sheets in Atlas to the correct spreadsheet IDs. See the code snippets below. The script files also include comments to indicate which sheet should be referenced by each ID. Replace the `{path}` section of the code below with the correct spreadsheet or folder ID indicated by the path described in the curly braces.

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

