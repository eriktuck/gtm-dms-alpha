Activity Location Data are provided by Implementing Partners on a quarterly basis, stored in the Mission Database for aggregation and query, and served publicly through the Activity Location Data Portal once generalized to protect sensitive information.

## A
The Implementing Partner inputs activity location data into their Activity Location Tracker no less than quarterly according to the guidance provided in their Data Management Plan. The Activity Location Tracker is stored in the Activity Folder, which is accessible to the Data Steward.

## B
The Data Steward logs each new Activity Folder in the Activity Folder Inventory after setting up the folder. The Inventory is used by a Google Apps Script in the Data Steward Admin Tool to identify all Activity Location Trackers and aggregate the data into the Activity Location Compiler. 

## C
Using the Data Steward Admin Tool, the Data Steward runs a semi-automated data pipeline to [truncate and load](../../../knowledge/base/truncate-load.md) data from the Activity Location Compiler to the Mission Database on a regular basis.

This pipeline creates the `create_activity_location_data.sql` and `load_activity_location_data.sql` files stored in the [Data Admin SQL](https://drive.google.com/drive/folders/1wq14SGZLO6lrxefJ3ryR4TpJ5pErCpol?lfhs=2) folder. The `load_activity_location_data.sql` file contains the SQL commands to truncate and load data into the Mission Database. The Data Steward uses [psql](../../../knowledge/base/psql.md) to load data in [pgAdmin4](../../../knowledge/base/pgAdmin.md).

See [Usage](../../../usage/index.md) for detailed instructions on running semi-automated data pipelines.

## D
The Mission Database automatically creates a view of the activity location data that generalizes the exact site locations (i.e., latitude and longitude) to hexagonal bins. This protects implementing partners and beneficiaries. Atlas uses Uber's H3 package, which is available as a PostgreSQL extension. See more [here](../../../knowledge/base/h3.md).

## E
The Data Steward manually exports the generalized activity location data from the Mission Database and uploads it to the Generalized Activity Location Data Google Sheet. 

## F
The Activity Location Data Portal - Public reads data directly from the Generalized Activity Location Data Google Sheet.
