Thematic data are collected by the Data Steward and uploaded to the **Thematic Database** for use by **Web Applications** and the **Mission Database**.

## A
The Data Steward identifies useful public datasets and thematic data collected by Implementing Partners and manually uploads data to the **Thematic Database**.

See [How to Update the Thematic Database](../../../usage/update-thematicdb.md) for detailed instructions.

## B
Using the **Data Steward Admin Tool**, the Data Steward runs a semi-automated data pipeline to truncate and load **Data Assets** from the **Thematic Database** to the **Mission Database** when new data are added.

This pipeline creates the `create_thematic_data.sql` and `load_thematic_data.sql` files stored in the Data Admin SQL folder. The `load_thematic_data.sql` file contains the SQL commands to truncate and load data into the Mission Database. The Data Steward uses [psql](../../../knowledge/base/psql.md) to load data in [pgAdmin4](../../../knowledge/base/pgAdmin.md).

See [Usage](../../../usage/overview.md) for detailed instructions on running semi-automated data pipelines. 

## C
Web applications read data directly from the **Thematic Database**. For example, the **Data Catalog** provides a searchable user interface for the Data Inventory. The **Map Viewer** maps **Data Assets** when the data include geographical data.
