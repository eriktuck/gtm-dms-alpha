Activity Data is a core component of the Mission data model and must be shared across many sources, including the Mission Database, Web Applications, and any team-owned trackers.

## A
The record owner inputs new activities and updates existing activities through the Activity DB Form. Updates are made as needed but no less than quarterly. The record owner is often the Agreement Officers Representative or Contracting Officers Representative (A/COR); however, each Technical Office may designate an alternative for this role. The designated point of contact is stored in the "Record Owner" field.

## B
Domain experts are individuals with knowledge of or areas of responsibility towards sections of the Activity DB. For example, a digital development advisor is the domain expert for questions related to digital components for an activity. The Domain expert will review and if necessary update records for the fields in their domain at least quarterly.

## C
The Activity Form upserts directly to the Activity Tracker; the Activity Form is a containerized Google Apps Script within the Activity DB Tracker.

## D
The Activity DB Tracker is automatically backed up to another Google Sheet by a scheduled Google Apps Script task.

## E
Activity data are staged in a Google Sheet in the Thematic Database, `activity-data.ghseet`, for downstream applications including the Mission Database and Web Applications. 

Data are staged in the Activity DB Tracker `export2GDB` sheet to limit disruptions arising from changes in the Activity DB Tracker and to protect the data in the Activity DB Tracker from accidental leaks, as some data are procurement-sensitive. These best practices are described [here](../../../knowledge/base/staging-data.md).

## F
Using the Data Steward Admin tool, the Data Steward runs a semi-automated data pipeline to [upsert](../../../knowledge/base/upsert.md) data from `activity-data.ghseet` to the Mission Database on a regular basis.

This pipeline creates the `create_activity_data.sql` and `load_activity_data.sql` files stored in the [Data Admin SQL](https://drive.google.com/drive/folders/1wq14SGZLO6lrxefJ3ryR4TpJ5pErCpol?lfhs=2) folder. The `load_activity_data.sql` file contains the SQL commands to upsert data into the Mission Database. The Data Steward uses [psql](../../../knowledge/base/psql.md) to load data in [pgAdmin4](../../../knowledge/base/pgAdmin.md).

(The `create_activity_data.sql` file can be used for data definition (e.g., developing the entity-relationship diagram) but is not required.)

See [Usage](../../../usage/index.md) for detailed instructions on running semi-automated data pipelines.

## G
Web applications read data from from `activity-data.ghseet` as needed. 

!!! tip
    Many teams use activity data. It is common for teams to duplicate these data across multiple trackers, which can lead to data becoming out of sync and requires significant "human automation" to keep up to date. However, teams should be empowered to continue to build custom tools that meet their needs. The Data Steward should work with these teams to integrate the Activity DB into their trackers using the guidance provided [here](../../../knowledge/base/trackers.md).
