# Data Steward Admin Tool

The Data Steward Admin Tool supports the Data Steward to manage and maintain the semi-automated data pipelines. 

The tool contains multiple script files:

* `utils.gs`: utilities functions for each script
* `activity-data.gs`: creates the file `load_activity_data.sql` in the Data Admin SQL folder.
* `activity-location-data.gs`: creates the file `load_activity_location_data.sql` in the Data Admin SQL folder.
* `thematic-data.gs`: creates the file `load_thematic_data.sql` in the Data Admin SQL folder.
* `copy-folder.gs`: copies a folder and subfolder to another location. Used to copy Atlas during initial installation and to copy Activity Folders during activity start up.
* `compile-ald.gs`: aggregates Activity Location Data from all Activity Location Data Trackers and retrieves hexagonal index for each exact site location.

Each `load*.sql` file can be read by [pgAdmin](../knowledge/base/pgAdmin.md) using [psql](../knowledge/base/psql.md) to update records in the Mission Database.
