## Coordinate Reference Systems

The Coordinate Reference System (CRS) tells the software reading the spatial data where the data are located on the globe. For an introduction to this topic, see this [article](https://www.earthdatascience.org/courses/earth-analytics/spatial-data-r/intro-to-coordinate-reference-systems/).

For most web applications use WGS 84 (EPSG code 4326), a geographic coordinate system.

Guatemala has an [official projection](https://spatialreference.org/ref/sr-org/guatemala-gtm-42500/) that is used by IDEG and other government data sources in some instances. It is not registered with an EPSG code, so you must use the proj4 string to set the CRS when reading or immediately thereafter. Then you can convert to WGS84.

The proj4 string is 

````proj4
"+proj=tmerc +lat_0=0 +lon_0=-90.5 +k=0.9998 +x_0=500000 +y_0=0 +ellps=WGS84 +units=m +no_defs"
````

To set projection using GeoPandas, a Python library, use 

```python
import geopandas as gpd
gdf = gpd.read_file('/path/to/file/filename.ext')
gdf.crs = "+proj=tmerc +lat_0=0 +lon_0=-90.5 +k=0.9998 +x_0=500000 +y_0=0 +ellps=WGS84 +units=m +no_defs"
```

For any spatial calculations, you will instead want a projected coordinate system. See [here](https://www.earthdatascience.org/courses/use-data-open-source-python/intro-vector-data-python/spatial-data-vector-shapefiles/geographic-vs-projected-coordinate-reference-systems-python/) for more on the difference between geographic and projected coordinate systems.

The Universal Transverse Mercator (UTM) CRS is a common a projected coordinate system. It's units are meters, so any area calculations are in square meters, distance is in meters, etc. To find the UTM zone of your geography, use this [application](https://mangomap.com/robertyoung/maps/69585/what-utm-zone-am-i-in-#). When a geography spans more than one zone, this CRS will still work but it will be skewed as you get further outside the selected zone. There are also a number of projected coordinate systems devised for different geographies, so you can generally find one that is tailored to the bounds of your geography.

To find the EPSG code of the UTM Zone, search [this database](https://spatialreference.org/).

Alternatively, use World Equidistant Cylindrical (EPSG code 4087) for imprecise calculations without worrying about which UTM zone to use.

