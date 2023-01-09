Activity Data describe key characteristics of activities such as the activity name, start date, implementing partner, and total estimated ceiling. Activity Data provides a useful illustration of the general structure of the MDMS. 

Data are stored in a Google Sheet referred to as the **Activity DB Tracker**, a flat-file containing all activity data. Data are input and edited by A/CORs and other stakeholders in the **Activity DB Form**, a custom-built Google Apps Script application. Data are piped into the **Mission Database** through a data pipeline managed by the Data Steward for aggregation with other data assets. Read more about data pipelines [here](../../pipelines/pipelines.md).

A unique identifier is provided for each activity in the **Activity DB Tracker** to help maintain referential integrity across other data assets. Activities are always referred to by these unique identifiers across all data assets as required by the **Data Standards**. Other products (not pictured) reference data in the Activity DB Tracker, especially the unique identifiers for each Activity.

!!! note
    We humans are pretty good are figuring out what someone is referring to when we use a nickname or other shorthand. Computers prefer references that are more exact. Referential integrity requires always referring to an entity by the same unique identifier. That helps the system recognize an entity when it's referenced by multiple data sources.
