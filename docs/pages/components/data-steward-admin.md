# Data Steward Admin Tool

The Data Steward Admin Tool supports the Data Steward to manage and maintain the semi-automated data pipelines. 

The tool contains four script files: a utility and one script each to update activity data, activity location data, and thematic data in the Mission Database.

* `utils.gs`: utilities functions for each script
* `activity-data.gs`: creates the file `load_activity_data.sql` in the Data Admin SQL folder.
* `activity-location-data.gs`: creates the file `load_activity_location_data.sql` in the Data Admin SQL folder.
* `thematic-data.gs`: creates the file `load_thematic_data.sql` in the Data Admin SQL folder.

Each `load*.sql` file can be read by [pgAdmin](../knowledge/base/pgAdmin.md) using [psql](../knowledge/base/psql.md) to update records in the Mission Database.

## Future Directions

The Data Steward Admin Tool can be customized with new features to support other Data Steward workflows and monitor the data management system. The following features are in the near-term roadmap for the Data Steward Admin Tool.

- Register the Activity Location Data template for each Activity
- Pull data from each Activity Location Data template, collate into a single Google Sheet (which will be served to the Activity Location Data Portal). This should be scheduled daily.
- Register the Data Inventory sheet for each Activity