Activity Location Data are provided by Implementing Partners on a quarterly basis, stored in the Mission Database for aggregation and query, and served publicly through the **Activity Location Data Portal** once generalized to protect sensitive information.

## A
The Implementing Partner inputs activity location data into their **Activity Location Tracker** no less than quarterly according to the guidance provided in their **Data Management Plan**. The **Activity Location Tracker** is stored in the **Activity Folder**, which is accessible to the Data Steward.

## B
The Data Steward logs each new **Activity Folder** in the **Atlas Data Inventory** after setting up the folder. The Inventory is used by a Google Apps Script in the **Data Steward Admin Tool** to identify all **Activity Location Trackers** and aggregate the data into the **Activity Location Data Compiler**. This script is on a time-based trigger set to run each day.

The script also generalizes the exact site locations (i.e., latitude and longitude) to hexagonal bins. This protects implementing partners and beneficiaries. See more [here](../../../knowledge/base/h3.md).

## C
Using the **Data Steward Admin Tool**, the Data Steward runs a semi-automated data pipeline to truncate and load data from the **Activity Location Compiler** to the **Mission Database** on a regular basis.

The **Data Steward Admin Tool** runs a script on a time-based trigger each day that creates the `create_activity_location_data.sql` and `load_activity_location_data.sql` files stored in the `Admin/SQL/` directory in Atlas. The `load_activity_location_data.sql` file contains the SQL commands to truncate and load data into the Mission Database. The Data Steward uses [psql](../../../knowledge/base/psql.md) to load data in [pgAdmin4](../../../knowledge/base/pgAdmin.md).

See [Usage](../../../usage/overview.md) for detailed instructions on running semi-automated data pipelines.

## D
Generalized Activity Location Data are imported by the **Activity Location Data (Public)** Google Sheet using [IMPORTRANGE](../../../knowledge/base/importrange.md). Data are [staged](../../../knowledge/base/staging-data.md) in an intermediate Google Sheet, `ald_stage.gsheet`, before import to protect sensitive data from accidental leaks.

## E
The Activity Location Data Portal - Public reads data directly from the Activity Location Data (Public) Google Sheet.
