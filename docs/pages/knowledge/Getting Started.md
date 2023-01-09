# Getting Started





1. Read in Performance Measure data
2. Create .bat file to ingest daily data (activity-data) and quarterly (activity-location-data, performance data)
   1. Use h3 extension to create VIEW of activity location data by hexagon
   2. Export VIEW to CSV (add to .bat for daily runs)
   3. Truncate and Load data in Activity Location Data (Public)



## Install PostgreSQL

1. Download PostgreSQL
2. Add psql to PATH
3. Register binaries for pgAdmin

## Set up database

### Create database

Login to user `postgres`, create the database, and switch to the database. You'll know everything worked because the prompt will change to the name of the database.

```sql
psql -U postgres
>>>Password for user in postgres:
CREATE DATABASE missiondb;
\c missiondb
>>>missiondb =#
```

### Add extensions

Add the necessary extensions. Run these commands after connecting to the database.

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
CREATE EXTENSION "uuid-ossp"
CREATE EXTENSION h3
```

## Load tabular data

### Create files to load data

Using the [Data Steward Admin Tool](https://script.google.com/home/projects/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit), create the SQL files to load data from each data source.

- `load_activity_sql`
- `load_thematic_sql`
- `load_activity_loc_sql`

Download the files from the **Data Admin SQL** folder on Google Drive and save them to the `sql/` directory in the project repository.

### Load data from files

Connect to the database, set encoding to UTF8, and load each file.

```sql
psql -U postgres
>>>Password for user in postgres:
\encoding UTF8
\i sql/load_activity_location_data.sql
\i sql/load_thematic_data.sql
\i sql/load_activity_data.sql
```

!!! tip
Google Sheets uses UTF8 encoding for CSV downloads. PostgreSQL defaults to the encoding of your system. If these two are not the same, you may experience errors on loading. Check the current encoding of the database with `\encoding`. Set the encoding for each session.

## Load Spatial Data

### Load Shapefiles

1. Download the zipped shapefile from the [Spatial directory](https://drive.google.com/drive/folders/1eYl-OVbS50JuNstrMVVgfxhN6iABrhDH?lfhs=2) in the Thematic Database.
2. Unzip the shapefile to the `data/spatial` directory of `gtm-dms`.
3. Use `shp2pgsql` (or the application **PostGIS Bundle Shapefile and DBF Importer**) to read in the shapefile.

```bash
shp2pgsql -c -D -s 4326 -I -W LATIN1 data/spatial/departments.shp public.departments > sql/load_shp_departments.sql

psql -U postgres -d missiondb -f sql/load_shp_departments.sql
```

4. Repeat this process for each shapefile to be read in.

### Load raster data

1. Download the `.tif` file from the [Spatial directory](https://drive.google.com/drive/folders/1IbBGsTxSu6fpQeSLbxVnPt-V_c_O3Uqw?lfhs=2) in the Thematic Database.
2. Use `raster2pgsql` (or the application **PostGIS Bundle Shapefile and DBF Importer**) to read in the TIFF.

```bash
raster2pgsql -s 4326 -I -M -C data/spatial/population_2020.tif -F public.population_2020_grid > sql/load_population_2020_grid.sql

psql -U postgres -d missiondb -f sql/load_population_2020_grid.sql
```

## Update Schema on dbdocs.io

### Create DDL files

Using the [Data Steward Admin Tool](https://script.google.com/home/projects/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit), create the SQL files to specify the DDL from each data source. The function is `write_ddl` for each `.gs` file.

Download the files from the **Data Admin SQL** folder on Google Drive and save them to the `sql/ddl` directory in the project repository.

### Upload to dbdocs

1. Go to dbdocs.io and load the create_<>.sql files for the schema you want to display. Make sure `append` is selected. ==use command line instead==

2. Copy the contents to the `dbdiagram.dbml` file in root directory. 

3. Upload to dbdocs.


```bash
dbdocs build dbdiagram.dbml
```

 The link to the documentation is included in the `mission-database.md` file in `docs/components`.

## Load constraints and relationships 

 ==Do we need to set relationships?==

Tables referenced by foreign key constraints cannot be dropped while foreign key constraints are present. The only tables that are referenced by foreign keys include

* municipalities
* departments
* activities

We do not expect the spatial data (municipalities and departments) to change in the near future, so for now those are loaded once and foreign keys are set.

The `activities` table will be updated frequently, so we use an `UPSERT` strategy to update records rather than truncate and load. Deletions from the ActivityDB will not be carried forward into the Mission Database automatically. We believe this behavior is the desired behavior. Records can be deleted manually from the Mission Database.

Data from the same data source include relationships on load. Data from different data sources are related once all data are loaded.

```dbml
Ref activities_depts.codigo > departments.codigo
Ref activities_munis.codigo > departments.codigo
Ref activities_munis.codigo1 > municipalities.codigo1
```

