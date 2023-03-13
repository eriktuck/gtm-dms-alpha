# shp2pgsql

`shp2pgsql` is a command line tool for importing shapefiles into a PostgreSQL database. See the cheatsheet [here](http://www.bostongis.com/pgsql2shp_shp2pgsql_quickguide_20.bqg).

Shapefiles should be processed and stored in the Thematic Database before being read into the Mission Database (see [here](../../usage/update-thematicdb.md#add-spatial-data) for details).

## Usage

In this example, a shapefile located at `data/spatial/departments.shp` is saved to a new `departments` table in the database.

```bash
shp2pgsql -c -D -s 4326 -I -W UTF-8 data/spatial/departments.shp public.departments > sql/load_shp_departments.sql
```

Load the file into the Postgres database with [psql](psql.md).

```bash
psql -U postgres -d missiondb -f sql/load_shp_departments.sql
```
