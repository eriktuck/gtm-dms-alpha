# Data Pipeline Options

This article describes the rationale for developing the semi-automated data pipelines.

## Piping data to the database

The Activity Database, Thematic Database, and most Activity data will be stored in Google Drive. Each needs to be on Google Drive to either allow users to interact with it (Activity DB, Activity data) or serve to the Data Hub (Thematic Database). 

For the Activity Database especially, the data most be converted from a flat file to a set of related tables that can be stored in a relational database. In addition, the Activity Database includes some procurement sensitive information that we may want to exclude from the Mission Database or partition to a sensitive layer.

ETL of these data into the Mission Database therefore requires a strategy for (1) reading data from Google Drive, (2) manipulating data into desired formats, and (3) reading the data in to the Mission Database. A layer of data validation may also be useful. 

The Mission has immediate access to tools such as Python (Google Collab) and JavaScript (Google Apps Script) for these tasks, or the Data Steward could request access to additional technology like a cloud database. Below we discuss each option for ETL of Mission data into the Mission Database.

1. **Get permission to use a cloud database.** If approved, a cloud database would  be able to serve data for applications that require it (e.g, Data Hub) and allow programmatic access to use a scripting language like Python for ETL tasks. This is likely the best option for functionality but the least likely option given M/CIO attitudes towards cloud databases.
2. **Use Python (Google Collab):** Python libraries like SQLAlchemy can support loading data into the Mission Database. The fatal flaw of this option is M/CIO's restriction on programmatic access to Google Drive by Google Collab. Without this access, you must download data to csv and upload each to Google Collab before processing and passing to the database. 
3. **Use JavaScript (Google Apps Script):** Google Apps Script allows easy access to data/docs on Google Drive. However, Apps Script does not have a clean interface to download data locally (it stores it back in Google Drive instead). As with Python, JavaScript could be used to create `.sql` files for defining and manipulating the database based on Google Sheets.
4. **Use PL/pgSQL**: Apparently [PostgreSQL can interact with JavaScript](https://chiubaca.com/using-javascript-to-write-postgresql-functions-1ac/) through it's PL/pgSQL language. I don't have experience with this but it could be combined with Google Apps Script to avoid an interim step of storing data locally.
5. **Use PostgreSQL `PROGRAM` and `curl`:** for public data, PostgreSQL can read directly from a url. Because PostgreSQL cannot authenticate with  Google Drive, this option will not work for sensitive data. However, it will save considerable lines of SQL for data that can be served publicly. 
6. **Use Google Sheets**: one or more tabs could be added to the sheet or IMPORTRANGE could be used to import data that is further manipulated in that sheet. A download link can be created to give access to any program that can read from the web (including PostgreSQL).

### Recommendation

Of the options explored above, the best option in my opinion is to use Google Apps Script given the ease with which it interacts with Google Drive. Google Sheets can also be used for some intermediate processing, especially when intermediate processing is necessary for other downstream applications (e.g. Tableau needs well-formatted data from the Activity Database). Google Apps Script provides a few options for implementation.

1. **Custom menu:** A custom menu allows the Data Steward to very easily run the script, but slows loading time for the sheet considerably and exposes the menu to external users, which may not be desired. When those drawbacks are acceptable, this is a good choice.
2. **Containerized non-menu script:** A script can be containerized within a Google Sheet but not exposed through a custom menu. Instead, the Data Steward would open the Apps Script editor and run the script manually. One advantage is that the script is copied anytime the Sheet is copied, which could be useful for often-replicated sheets like the Activity Data Tracker.
3. **Non-containerized:** A non-containerized script would only be accessible to the Data Steward. It could be deployed as a web app with additional administrative functionality. This option requires that each sheet is registered individually (which could be done in a Sheet like the Data Inventory) so the script knows where data resides. Long term, a web app could provide really useful functionality for the Data Steward.
4. **Scheduled:** A trigger can be set to run the script (or a function) at some regular interval. This can save the Data Steward from needing to interact with the script file to update the Mission Database, however if the solution cannot both interact with Google Drive and the database, the Data Steward will need to manually close the loop. 

### Converting tables to SQL

1. Google Apps Script [Content Service](https://developers.google.com/apps-script/reference/content/text-output) can serve the `.sql` to the web, which can be accessed with `curl` to programmatically read the `.sql` to a local file before uploading, rather than requiring the Data Steward to do this manually, however, each `.sql` file would require it's own project.
2. Would an API service on Google Apps Script work here?
3. Could the Data Steward Admin dashboard have a download button rather than save the file to Google Drive?

Always use prepared statements to sanitize inputs! See example in Activity Database below.

## Specific Designs

### Activity Database

This process automates the update of the Mission Database with changes to the Activity Database on a daily basis. 

1. In the Activity Database sheet, add a tab to format data for export to another Google Sheet (`export2gdb`). Copy each column individually (using named ranges when available) to avoid changing data ranges when columns are added. 

2. In a new Google Sheet within the MECLA Toolkit (`GIS/Thematic Data/internal/activity-data.ghseet`) use IMPORTRANGE to import the `export2gdb` sheet, wrapping with a QUERY to exclude procurement-sensitive data. Because this sheet has read permissions on the Activity Database, you must NEVER SHARE edit access outside of USAID.

3. In the `activity-data` sheet, process data from the flat file to multiple tabs to third-normal form

4. Use a Google Apps Script to create a `.sql` script to `INSERT` the tabs in the `activity-data.gsheet` as a `.sql` file on Google Drive. Use `PREPARE` and `EXECUTE` to sanitize inputs. Note that prepared statement names (`fooplan`) below, must be unique across the session ([docs](https://www.postgresql.org/docs/current/sql-prepare.html#SQL-PREPARE-EXAMPLES)).

   ```sql
   PREPARE fooplan (int, text, bool, numeric) AS
       INSERT INTO foo VALUES($1, $2, $3, $4);
   EXECUTE fooplan(1, 'Hunter Valley', 't', 200.00);
   ```

5. Use the saved `.sql` file to read the data into the Mission Database using `psql`. Drop the original table and add the new table in its place. Curl will not work with these data unless they are published with global view access since Postgres doesn't have access to my Google Account. 


### Thematic Data

This process supports as-needed updates of thematic data in the Mission Database. We use a non-containerized script to prevent slow loading with the Data Hub and avoid exposing the script to the public (`thematic-data.gsheet` is shared publicly).

The process described below describes how to **add a new dataset** to the thematic dataset

1. Describe the new dataset in the data tab of the `Data Inventory-internal` worksheet. If the data provider is new, update the providers tab.
2. Add dataset to a new tab in the the thematic database. Ensure that geocodes (`Codigo` and `Codigo1`) are correct and that municipalities and departments are spelled correctly. Populate all blank fields with #N/A (use find/replace if needed). 
3. Translate to English if needed and record translations in the `TRANSLATIONS` tab.
4. Describe codes in the `CODES` tab.
5. Add definitions to the `DEFINITIONS` tab. To allow access to the data in Map Viewer, ensure the data type attribute is set to one of the [Map Viewer supported data types](#Map-Viewer-supported-data-types).
6. Use a Google Apps Script to create a `.sql` script to `COPY` the new dataset along with the `DEFINITIONS`, `CODES`, and `TRANSLATIONS` tables on Google Drive. 
7. Use the saved `.sql` file to read the data into the Mission Database using `psql`. Drop the original table and add the new table in its place.

To **update a dataset**

1. Make required changes in the `thematic-data` worksheet. Append rows to end of a sheet to add new data or edit records directly if needed.
2. Proceed from step 3 above. The entire table will be dropped and replaced with the new or edited data.

To **add new data from the DDL**

1. Use the process for adding new data described above, adding the access link to the DDL in the `Data Inventory-internal` sheet.

> The `.sql` file should look like this, using `curl` to download the data. The data type (and any constraints or relationships) can be read programmatically from the DEFINITIONS tab of each spreadsheet. Additional relationships may need to be defined in another script with an ALTER TABLE command.
>
> ```sql
> DROP TABLE IF EXISTS tablename;
> 
> CREATE TABLE tablename (
> id PRIMARY KEY NOT NULL,
> header1 header1type,
> header2 header2type
> );
> 
> COPY tablename
> (header1, header2)
> FROM PROGRAM 'curl -L "download-link"'
> HEADERS CSV DELIMITER ',';
> ```

> The download link for google sheets takes the form 
>
> ````
> https://docs.google.com/spreadsheets/d/<spreadsheet_id>/export?format=csv&gid=<sheet_id>
> ````



> Writing to a text file in Google Drive
>
> https://stackoverflow.com/questions/35865273/how-to-update-google-drive-text-file-via-google-script
>
> Important components
>
> - Activity Location Data (internal)
> - Activity Location Data (public)
> - Thematic Data
> - activity-data
> - Data Steward Admin Dashboard
> - SQL folder (or just one file that is overwritten each time? maybe archive past versions?)
> - Folder for performance monitoring reports (as json?)

### Activity Location Data

1. Copy the Activity Location Data template to the Activity's Google Drive folder.
2. Register the download link for the template in a Google Sheet (don't publish the template to the web, just use the link described above, it should only be accessible to the Data Steward)
3. Create a scheduled Google Apps Script to compile all data from each Activity Location Data template (using the links registered in step 2) into a single Google Sheet. 
4. Create another scheduled Google Apps Script to create a `.sql` file to `COPY` new Activity Location data to the Mission Database. 
5. Use the Google Colab script to convert Activity Location Data to hex locations and transfer to Activity Location Data (Public).

### Activity-specific data

Activity-specific data refers to the raw performance monitoring data and other thematic datasets collected by an Implementing Partner. Not every dataset collected is worth including in the Mission Database. Many datasets will not be updated (they will only be produced once), but some may be updated quarterly (especially performance monitoring data). It is critical that the Data Steward meet with the Implementing Partner early in the award to inventory datasets, agree on data formats, and plan to ingest valuable data into the Mission Database. 

#### Periodically updated data

Activities commonly collect two core datasets:

* List of beneficiaries and their characteristics
* List of implementation activity locations and details

These are clearly related to Activity Location Data, but they are often not in the format of the Activity Location Data template, so they must be re-formatted for upload to the DIS. They often drive most if not all of the performance monitoring data (number of women trained, etc.). However they are not the rolled up performance monitoring data that is also reported to the DIS. Therefore they are both but neither. 

Datasets like these are of interest for quarterly updating into the Mission Database. Follow this process

1. Register the dataset in the Data Inventory sheet within the Activity Drive Folder. The Data Inventory sheet must include a DEFINITIONS tab that specifies
   1. short header
   2. data type
   3. constraints
2. Register the Data Inventory sheet in the Data Steward Admin Dashboard (or you could register the entire folder and programmatically access it)

3. Use a Google Apps Script to access each Data Inventory sheet and the datasets registered within to create a `.sql` file to update the Mission database. 

> Encourage the Implementing Partner to append new records to their dataset, rather than creating multiple datasets by reporting period. Not only will this make updating the Mission Database easier, it will also force them to de-dup data rather than require you to figure out how to do that.

#### From the DDL

Many datasets will be submitted to the DDL (or should be). After submission, they can be added to the Thematic Database and the process described for those datasets should be followed. The DDL has an API that could be used for this purpose.

### Performance Monitoring Reports

Performance Monitoring Reports contain the targets, baselines, and actuals for performance measures by Activity. Given the unstructured nature of these data, they may be best saved as `json` documents. PostgreSQL can handle `json` documents.

#### Spatial Data

Spatial data are stored in ArcGIS Online and the `Spatial/` directory of the Thematic Database. Spatial data can be uploaded to PostgreSQL with PostGIS and to ArcGIS Online. Given the sporadic nature of acquiring spatial data, this can be handled manually by the Data Steward and GIS Specialist. 
