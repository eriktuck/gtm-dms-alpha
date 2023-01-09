# Database Options

The Data Steward/GIS Specialist are facing increasing data storage requirements and increasingly complex analysis requests. 

Databases and similar concepts (e.g., data lakes and lake houses) offer a solution for both of these requirements. Data can be stored efficiently and more easily queried in a relational database or No-SQL database. A database or similar technology seems necessary to meet the long term needs of the Mission for Mission-wide analysis and maintenance of data over time.

## Relational or No-SQL?

The first question is whether to use a relational database, No-SQL database, or some combination of the two. Data lakes and other less-structured approaches are beyond the scope of the current program, but may be of interest to a more sophisticated implementing partner (through the MECLA Platform, for instance).

Relational databases are best for well-structured data and rapid analysis across tables. No-SQL databases are best for less-structured data. Combinations of the two are also possible.

For example, activity data could all be stored in a relational database. These data are well structured because all activities share attributes  (e.g., name, geographic focus, ceiling, PM alignments).

Performance monitoring data could be stored in a file-based No-SQL database. This would allow each activity to have different disaggregates for each PM (which represents less-structured data). 

Links between the two would be maintained in the relational database.

### Options for Relational Databases

#### SQLite

SQLite is a lightweight, file-based database solution that is distributed with Python. This means that anyone with ArcGIS Pro (which includes Python) has access. SQLite can also be downloaded as a standalone application (you may also want SQLite Studio as a database client), however it is not in the [Approved Product Catalog](https://usaiditsm.servicenowservices.com/sphome?id=product_list_new).

SQLite can be used from the command line with the `sqlite` command line tool. However, SQLite is best when coupled with Python using the library `sqlite3` and analysis library like `pandas` in a Jupyter Notebook or Python application.  

SQLite does not have a geospatial extension (like PostGIS for PostgreSQL). Instead, most analysis will be conducted in Python using `geopandas`. The Python interpreter of ArcGIS Pro can also provide access to the database for analysis with the `arcpy` library. 

This solution is best for an advanced Python user with access to ArcPro.

#### PostgreSQL

PostgreSQL is a robust, client/server style relational database management system. PostgreSQL has been approved by M/CIO and so should be available but must be requested. pgAdmin is the database client and psql is the command line tool. 

PostgreSQL includes PostGIS, an extension for geospatial data, bindings for Uber's H3, and JSON support, replicating some of the benefits of a file-based No-SQL database.

This solution is best for an a user with database management and SQL experience. It is more scalable and deployable than SQLite. Also, it does not require a unique M/CIO review. 

# Piping data to the database

The Activity Database, Thematic Database, and most Activity data will be stored in Google Drive. Each needs to be on Google Drive to either allow users to interact with it (Activity DB, Activity data) or serve to the Data Hub (Thematic Database). 

For the Activity Database especially, the data most be converted from a flat file to a set of related tables that can be stored in a relational database. In addition, the Activity Database includes some procurement sensitive information that we may want to exclude from the Mission Database or partition to a sensitive layer.

ETL of these data into the Mission Database therefore requires a strategy for (1) reading data from Google Drive, (2) manipulating data into desired formats, and (3) reading the data in to the Mission Database. A layer of data validation may also be useful. 

USAID has immediate access to tools such as Python (Google Collab) and JavaScript (Google Apps Script) for these tasks, or the Data Steward could request access to additional technology like a cloud database. Below we discuss each option for ETL of Mission data into the Mission Database.

1. **Get permission to use a cloud database.** If approved, a cloud database would  be able to serve data for applications that require it (e.g, Data Hub) and allow programmatic access to use a scripting language like Python for ETL tasks. This is likely the best option for functionality but the least likely option given M/CIO attitudes towards cloud databases.
2. **Use Python (Google Collab):** the fatal flaw of this option is M/CIO's restriction on programmatic access to Google Drive by Google Collab. Without this access, you must download data to csv and upload each to Google Collab before processing and passing to the database. Python libraries like SQLAlchemy can support loading data into the Mission Database.
3. **Use JavaScript (Google Apps Script):** Google Apps Script allows easy access to data/docs on Google Drive. However, Apps Script does not have a clean interface to download data locally (it stores it back in Google Drive instead). As with Python, JavaScript could be used to create `.sql` files for defining and manipulating the database based on Google Sheets.
4. **Use SQL (PL/pgSQL)**: Apparently [PostgreSQL can interact with JavaScript](https://chiubaca.com/using-javascript-to-write-postgresql-functions-1ac/) through it's PL/pgSQL language. I don't have experience with this but it could be combined with Google Apps Script to avoid an interim step of storing data locally.
5. **Use Google Sheets**: one or more tabs could be added to the sheet or IMPORTRANGE could be used to import data that is further manipulated in that sheet. A download link can be created to give access to any program that can read from the web (including PostgreSQL).

### Recommendation

Of the options explored above, the best option in my opinion is to use Google Apps Script given the ease with which it interacts with Google Drive. Google Sheets can also be used for some intermediate processing, especially when intermediate processing is necessary for other downstream applications (e.g. Tableau needs well-formatted data from the Activity Database). Google Apps Script provides a few options for implementation.

1. **Custom menu:** A custom menu allows the Data Steward to very easily run the script, but slows loading time for the sheet considerably and exposes the menu to external users, which may not be desired. When those drawbacks are acceptable, this is a good choice.
2. **Containerized non-menu script:** A script can be containerized within a Google Sheet but not exposed through a custom menu. Instead, the Data Steward would open the Apps Script editor and run the script manually. One advantage is that the script is copied anytime the Sheet is copied, which could be useful for often-replicated sheets like the Activity Data Tracker.
3. **Non-containerized:** A non-containerized script would only be accessible to the Data Steward. It could be deployed as a web app with additional administrative functionality. This option requires that each sheet is registered individually (which could be done in a Sheet like the Data Inventory) so the script knows where data resides. Long term, a web app could provide really useful functionality for the Data Steward.
4. **Scheduled:** A trigger can be set to run the script (or a function) at some regular interval. This can save the Data Steward from needing to interact with the script file to update the Mission Database, however if the solution cannot both interact with Google Drive and the database, the Data Steward will need to manually close the loop. 

### Converting tables to SQL

1. Google Apps Script [Content Service](https://developers.google.com/apps-script/reference/content/text-output) can serve the .sql to the web, which can be accessed with curl to programmatically read the .sql to a local file before uploading, rather than requiring the data steward to do this manually, however, each sql file would require it's own project.)

2. Would an API service on Google Apps Script work here?

3. Could the Data Steward Admin dashboard have a download button rather than save the file to Google Drive?

4. Use prepared PostgreSQL statements to sanitize inputs (see example in Activity Database below)

## Specific Designs

### Activity Database

This process automates the update of the Mission Database with changes to the Activity Database on a daily basis. 

1. In the Activity Database sheet, add a tab to format data for export to another Google Sheet (`export2gdb`). Copy each column individually (using named ranges when available) to avoid changing data ranges when columns are added. 

2. In a new Google Sheet within the MECLA Toolkit (`GIS/Thematic Data/internal/activity-data.ghseet`) use IMPORTRANGE to import the `export2gdb` sheet, wrapping with a QUERY to exclude procurement-sensitive data. Because this sheet has read permissions on the Activity Database, you must NEVER SHARE edit access outside of USAID.

3. In the `activity-data` sheet, process data from the flat file to multiple tabs to third-normal form

4. Use a Google Apps Script to create a `.sql` script to `INSERT` the tabs in the `activity-data.gsheet` as a `.sql` file on Google Drive. Because we will be at risk of a SQL injections, we must used `PREPARE` and `EXECUTE` to sanitize inputs. Note that prepared statement names (`fooplan`) below, must be unique across the session. ([docs](https://www.postgresql.org/docs/current/sql-prepare.html#SQL-PREPARE-EXAMPLES)). Escape 

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
>  header2 header2type
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
5. Use the Google Colab script (==or write in JavaScript==) to convert Activity Location Data to hex locations and transfer to Activity Location Data (public).

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

==should we read into an interim sheet or read directly to the database?==

3. Use a Google Apps Script to access each Data Inventory sheet and the datasets registered within to create a `.sql` file to update the Mission database. 

> Encourage the Implementing Partner to append new records to their dataset, rather than creating multiple datasets by reporting period. Not only will this make updating the Mission Database easier, it will also force them to de-dup data rather than require you to figure out how to do that.

#### From the DDL

Many datasets will be submitted to the DDL (or should be). After submission, they can be added to the Thematic Database and the process described for those datasets should be followed. 

### Performance Monitoring Reports

Performance Monitoring Reports contain the targets, baselines, and actuals for performance measures by Activity. 

==These are best stored as documents?==

#### Spatial Data

Spatial data are stored in ArcGIS Online and the `Spatial/` directory of the Thematic Database. Spatial data can be uploaded to PostgreSQL with PostGIS. Given the sporadic nature of acquiring spatial data, this can be handled manually by the Data Steward and GIS Specialist. 

1. Upload to ArcGIS Online
2. Upload to PostgreSQL

==add step by step instructions== 

## The Data Steward Admin Dashboard

A single Google Apps Script project will be created to handle all data collation and writing of `.sql` files for ETL to the Mission database. The script needs to

- Create a `.sql` file to `COPY` the `activity-data` sheet to the Mission Database
- Create `.sql` file(s) to `COPY` new thematic datasets and `DEFINITIONS`, `CODES`, and `TRANSLATIONS` tables. An interface should be provided for the Data Steward to select the dataset to upload. 
- Register the Activity Location Data template for each Activity
- Pull data from each Activity Location Data template, collate into a single Google Sheet (which will be served to the Activity Location Data Portal). This should be scheduled daily.
- Create a `.sql` file to `COPY` new Activity Location data to the Mission Database. 
- Register the Data Inventory sheet for each Activity

==How do I set the constraints such that duplicates are skipped rather than fail the entire upload?==

## How to read data into Postgres

The instructions for each product above will create a `.sql` file that can be run in pgAdmin or using `psql` to update the database. Download the `.sql` file so it is accessible locally.

In pgAdmin, use the **Query Tool** to load the file and click run.

In `psql`, use the command `\i <path to file>` to run the file.

## Create views

Views are calculated tables

```sql
CREATE VIEW IF NOT EXISTS view_name AS
...

```

With statements allow you to create interim tables that simply your sql statement. Here's an example

```sql
REATE VIEW IF NOT EXISTS view_baseline AS
WITH weighted_baseline AS (
        SELECT d.map_unit_id,
               d.indirect_benefits_area,
               d.mz3,
               d.mz4,
               d.mz5,
               b.season,
               SUM(CASE WHEN b.mgmt_zone = 'MZ III' THEN d.mz3 * b.baseline END) AS mz3_weighted,
               SUM(CASE WHEN b.mgmt_zone = 'MZ IV' THEN d.mz4 * b.baseline END) AS mz4_weighted,
               SUM(CASE WHEN b.mgmt_zone = 'MZ V' THEN d.mz5 * b.baseline END) AS mz5_weighted
          FROM view_desktop_results AS d
               LEFT JOIN
               standard_baseline AS b
         GROUP BY d.map_unit_id,
                  b.season
    )
    SELECT map_unit_id,
           season,
           (mz3_weighted + mz4_weighted + mz5_weighted) AS baseline
      FROM weighted_baseline;
```

### Edit records

Be sure to not edit records that will be overwritten on the next import. Instead, edit the data source, drop the existing table, and read in the new one. 

```sql
UPDATE <tablename> SET <field> = <value>, <field_2> = <value_2> WHERE id = <id>;
```

### Drop tables or views

Sometimes you'll want to drop many tables or all tables in a database and start fresh with the same schema. Use `CASCADE` to remove foreign keys from related tables.

```sql
DROP TABLE IF EXISTS table_name CASCADE;
DROP VIEW IF EXISTS view_name;
```



## Map Viewer supported data types

* Numeric

## Tables overwritten on import

* DEFINITIONS
* CODES
* TRANSLATIONS
* All tables associated with the thematic database
* All tables associated with Activity DB

## Considerations

* The Activity DB table will serve as the primary source of truth for Activity IDs. It is critical that these IDs do not change once they are read in to the Mission Database. The form UI for the Activity DB and restricted control of the database table in Google Sheets should ensure this.
* The DEFINITIONS table can store the SQL data type for each field and the relationships so the Data Steward Admin tool can efficiently create .sql files.

# USAID/Guatemala Data Roadmap

## Four Pillars

1. Data Infrastructure, Access, Use (Data)
2. Technology & Human Resources (People & Tools)
3. Institutional Support (Processes)
4. Demand from Stakeholders (Culture)

Similar to [this framework](https://towardsdatascience.com/how-to-deliver-real-data-driven-insights-e94f2b386c18) with more emphasis on the actual data (Pillar 1).



## Rules

Tab names in Google Sheets are best if formatted in a valid way to be a Postgres table.  Any spaces or hyphens will be converted to an underscore. Any other punctuation will be removed (although rare characters can still result in an error).



Column names in Google Sheets are best if formatted in a valid way to be a Postgres column. Any spaces, hyphens or forward and backward slashes will be converted to underscores. Parentheses will be removed.



Column names longer than 63 characters will be truncated.



Do not store units in column names, use the DEFINITIONS table.



Do not start a column name with a number.



Do not use a numeric format that includes a comma in the data.



