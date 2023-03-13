# raster2pgsql

Advanced users may choose to load rasters using the [`raster2pgsql`](https://postgis.net/docs/using_raster_dataman.html) command line tool. 

As with shapefiles, raster files should be processed and stored in the Thematic Database before being read into the Mission Database (see [here](../../usage/update-thematicdb.md#add-spatial-data) for details). Download the `.tif` file(s) from the Spatial directory in the [Thematic Database](../../components/thematic-database.md). 

## Usage

In this example, a raster located at `data/spatial/population.tif` is saved to a new `population_grid` table in the database.

```bash
raster2pgsql -s 4326 -I -M -C data/spatial/population.tif -F public.population_grid > sql/load_population_grid.sql
```

Load the file into the Postgres database with [psql](psql.md).

```bash
psql -U postgres -d missiondb -f sql/load_population_grid.sql
```

