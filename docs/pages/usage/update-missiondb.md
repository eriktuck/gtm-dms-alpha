# Update Mission Database

The Data Steward will update the Mission Database on a regular basis to ensure that data are up-to-date and available for query. The Data Steward Admin Tool produces `.sql` files in the Data Admin SQL folder in Atlas every 24 hours. Upload these file to the Mission Database each day. 

## Daily update

### Download SQL files

Navigate to the Data Admin SQL folder (`Atlas/admin/sql/`).

Download the files from the Data Admin SQL folder on Google Drive and save them to your local file system.

!!! note
    If you need to create these files outside of the scheduled update process, see the instructions for ad-hoc updates, below.

### Upload to Mission Database

Open pgAdmin and select the `missiondb` database.

Launch the PSQL editor. The prompt should reference `missiondb`:	

```
missiondb#=
```

Copy/paste the code below into a new `.txt` document. Next, update the paths to each file to the full paths for your local file system using forward slashes (e.g., `sql/load-activity_data` to `C:/Users/Your_Name/atlas/sql/dml/load_activity_data.sql` ). Save the `.txt` file with these commands for later use.

```
\encoding UTF8
\i full/path/to/load_activity_location_data.sql
\i full/path/to/load_thematic_data.sql
\i full/path/to/load_activity_data.sql
```

Copy/paste from the `.txt` file with the corrected paths into the PSQL editor prompt. Hit enter to run. If copying multiple lines at once, ensure the last line also runs by hitting enter again if needed.

!!! warning
    If you are working on the Windows Operating System, change all backslashes to forward slashes in the path.

!!! tip
    Google Sheets uses UTF8 encoding for CSV downloads. PostgreSQL defaults to the encoding of your system. If these two are not the same, you may experience errors on loading. Check the current encoding of the database with `\encoding`. You must set the database encoding for each session! Learn more about encoding [here](../knowledge/base/encoding.md).

## Ad-hoc update

To update the Mission Database when a data source is updated, re-create the `.sql` files corresponding to the data source that has been updated and then follow the steps defined above.

Open the Data Steward Admin Tool (located at [script.google.com](https://script.google.com/home)).

In the **Editor** window, locate the file corresponding to the data source that has been updated (i.e., `activity-data.gs` for the Activity Database) and select it.

In the script editor menu bar, select the function that begins with `generate_` and click **Run**.

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_BJVZTbKuOY.png)

Proceed with the daily update process, downloading and uploading the `.sql` file that corresponds to the data source that has been updated.

## Load spatial data

Spatial data include shapefiles and raster files. Augmenting tabular data with relevant spatial data will support geospatial analysis. The extensions installed previously including `postgis` and `postgis_raster` are needed to support spatial data in PostgreSQL. Spatial data may be read in using the command line or the application *PostGIS Bundle Shapefile and DBF Importer* which was installed with PostGIS. 

Spatial data must first be processed and stored in the Thematic Database before being read into the Mission Database. See the knowledge article [Processing Spatial Data](../knowledge/base/process-spatial-data.md) for details.

### Load shapefiles

Download the zipped shapefile(s) from the Spatial directory in the [Thematic Database](../components/thematic-database.md). Unzip the shapefile to your local file system. 

Open the *PostGIS Bundle Shapefile and DBF Importer* application.

Connect to the `missiondb` by clicking **View connection details** and entering your login information. Click **OK**.

![img](https://storage.googleapis.com/ei-dev-assets/assets/shp2pgsql-gui_5BP85424Xg.png)



Click **Add File** and navigate to the location of your shapefile on the local file system. Repeat for all shapefiles.

Set the SRID column for each file to `4326`. This corresponds with the WGS 84 coordinate reference system and should be set for the shapefile during the initial processing. The complete table should look like this:

| Shapefile | Schema | Table | Geo Column | SRID | Mode | Rm|
| ------------- | ---- | ---- | ---- | ---- | ---- | ---- |
|/path/to/file.shp| public | table_name | geom | 4326 | Create | [ ] |

Click **Options** and ensure all import options are correct. In particular, ensure the *DBF file character encoding* is the same as was used to save the spatial data after processing.

Click **Import**.

!!! tip
    If you cannot resolve encoding errors or any other issues when using *PostGIS Bundle Shapefile and DBF Importer*, try using the command line tool `shp2pgsql`. Find the instructions [here](../usage/update-thematicdb.md#add-spatial-data).

### Load raster data

Advanced users may wish to load raster data into the database. Find the instructions [here](../../knowledge/base/raster2pgsql).