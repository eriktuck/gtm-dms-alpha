Data pipelines transfer data between components. Data pipelines create a web across all components so that data can be entered once and used across multiple components.

The Data Steward is responsible for running data pipelines on a regular basis and developing new pipelines as needed. 

## Pipelines between Google Sheets

Google Sheets supports data transfer between Sheets using the `IMPORTRANGE` function. This is the simplest option for transferring data between Sheets. `IMPORTRANGE` is used to move data between Sheets in the Thematic Database, to stage data for Web Applications, and to pull data from the Activity Database into trackers. In some cases, the `IMPORTRANGE` function is combined with the `QUERY` function to import a subset of data.

In some cases, it is better to use a Google Apps Script project to aggregate data instead of writing one long `IMPORTRANGE` function. Google Apps Script is used to aggregate data from many activity-level templates, such as the Activity Location Data Template.

!!! Warning
    The `IMPORTRANGE` function can lead to leaks of sensitive data if not used with caution. When a public user has edit access to a spreadsheet that imports data from another spreadsheet, they can change the `IMPORTRANGE` function to access any other data from that spreadsheet. It is best practice to pass data through an intermediate spreadsheet when sharing data from an internal source to a public source. See more [here](../../knowledge/base/importrange.md).

## Pipelines to the Mission Database

All data stored in Atlas is piped into the Mission Database for aggregation and querying. Data pipelines to the Mission Database are managed through the Data Steward Admin Tool. 

Atlas employs two common data pipeline strategies to load data into the Mission Database: truncate and load and upsert.

### Truncate & Load

Truncate and load simply means deleting one (or more) existing tables in the Mission Database and loading all of the data fresh from the data source. This strategy is typically used for data that can be accessed programmatically by PostgreSQL. See [here](../../knowledge/base/truncate-load.md) for more.

### Upsert

Upsert (a portmanteau of update and insert) will update existing records and insert new records. Upsert is used by Atlas when necessary to maintain referential integrity with foreign key constraints. For example, activity data from the Activity Database is upserted into the Mission Database so that other tables that reference the Activity ID field are not affected. When using upsert, it's essential that the record identifier in the data source is never changed. See [here](../../knowledge/base/upsert.md) for more.

## Pipelines to Web Applications

Most Atlas web apps are built in Google Apps Script, which enables them to easily read data from their respective data sources in Google Drive. In some cases, data are served to web apps in intermediate layers using the strategies discussed in Pipelines between Google Sheets.

To understand the rationale for data pipelines, see [here](../../knowledge/base/data-pipeline-rationale.md). Continue reading for detailed descriptions of each data pipeline.