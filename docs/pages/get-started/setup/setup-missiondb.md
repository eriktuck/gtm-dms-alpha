# Set up Mission Database

The Mission Database is a PostgreSQL relational database that brings all your data together. To set it up, follow the instructions below.

## Load tabular data

Login to user `postgres`, create the database, and switch to the database. You'll know everything worked because the prompt will change to the name of the database.

```bash
psql -U postgres
>>>Password for user in postgres:
CREATE DATABASE missiondb;
\c missiondb
>>>missiondb =#
```

Add the necessary extensions. Run these commands after connecting to the database.

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
CREATE EXTENSION "uuid-ossp"
CREATE EXTENSION h3
```

Using the [Data Steward Admin Tool](../../components/data-steward-admin.md), create the SQL files to load data from each data source.

* `load_activity_sql`
* `load_thematic_sql`
* `load_activity_loc_sql`

Download the files from the **Data Admin SQL** folder on Google Drive and save them to the `sql/` directory in the project repository.

Connect to the database, set encoding to UTF8, and load each file. In pgAdmin, use the **PSQL Tool** to run the file. Advanced users may prefer the command line.

```bash
psql -U postgres
>>>Password for user in postgres:
\encoding UTF8
\i sql/load_activity_location_data.sql
\i sql/load_thematic_data.sql
\i sql/load_activity_data.sql
```

!!! tip
    Google Sheets uses UTF8 encoding for CSV downloads. PostgreSQL defaults to the encoding of your system. If these two are not the same, you may experience errors on loading. Check the current encoding of the database with `\encoding`. Set the encoding for each session.

## Load shapefiles

1. Download the zipped shapefile from the Spatial directory in the [Thematic Database](../../components/thematic-database.md).
2. Unzip the shapefile to the `data/spatial` directory of `gtm-dms`.
3. Use `shp2pgsql` (or the application **PostGIS Bundle Shapefile and DBF Importer**) to read in the shapefile.


        shp2pgsql -c -D -s 4326 -I -W LATIN1 data/spatial/departments.shp public.departments > sql/load_shp_departments.sql
    
        psql -U postgres -d missiondb -f sql/load_shp_departments.sql


4. Repeat this process for each shapefile to be read in.

## Load rasters

1. Download the `.tif` file from the Spatial directory in the [Thematic Database](../../components/thematic-database.md).

2. Use `raster2pgsql` (or the application **PostGIS Bundle Shapefile and DBF Importer**) to read in the TIFF.

       raster2pgsql -s 4326 -I -M -C data/spatial/population_2020.tif -F public.population_2020_grid > sql/load_population_2020_grid.sql
       
       psql -U postgres -d missiondb -f sql/load_population_2020_grid.sql

3. Repeat this process for each raster to be read in.

## Load constraints and relationships

Tables referenced by foreign key constraints cannot be dropped while foreign key constraints are present. The only tables that are referenced by foreign keys include

- municipalities
- departments
- activities

Data from the same data source include relationships on load. Data from different data sources are related once all data are loaded.

```dbml
Ref activities_depts.codigo > departments.codigo
Ref activities_munis.codigo > departments.codigo
Ref activities_munis.codigo1 > municipalities.codigo1
```

## 