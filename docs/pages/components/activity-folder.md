# Activity Folder

A well-organized Activity Folder supports reporting of data by Implementing Partners and aggregation of data across activities by the Data Steward. Atlas requires the standard Activity Folder template is adopted by all activities. The Activity Folder is designed to be flexible in light of the unique nature of each activity while also including standard components that support the Data Steward to access and aggregate data.

Detailed instructions for working with A/CORs and Implementing Partners are provided [here](../usage/activity-start-up.md).

!!! note
    Some Implementing Partners may not be able to create Google accounts, which are required to access restricted-access Google Folders. In these cases, the Data Steward should work with the A/COR to develop an alternative solution.

## Folder Structure

The structure outlined below is the recommended Activity Folder structure. Additional folders may be included to meet the specific needs of the activity.

```bash
*
+-- datasets/
    +-- implementation-activities.gsheet
    +-- beneficiaries.gsheet
+-- Data-Inventory.gsheet
+-- Activity-MECLA-Plan-DMP.gdoc
+-- Activity-Location-Data-Template.gsheet
+-- Activity-PM-Tracker.gsheet // optional
```

### Components

* **Datasets Folder:** the datasets folder stores all data assets collected or utilized by the Implementing Partner. Here we illustrate two very common data assets collected by Implementing Partners: a list of the implementation activities and a list of beneficiaries. These datasets support both activity location data and performance monitoring.
* **Data Inventory:** this Google Sheet lists and provides metadata for each data asset. The Data Inventory is created during development of the Data Management Plan.
* **Activity MECLA & Data Management Plan:** this document helps Implementing Partners plan for MECLA activities and data management.
* **Activity Location Data Template:** this Google Sheet is the standard template for collecting Activity Location Data.
* **Activity PM Tracker:** this Google Sheet provides a standard template for reporting performance monitoring data, however its use is optional.

## Data Steward Access

The Data Steward accesses the Activity Folders programmatically to aggregate data including activity location data, thematic data, and performance monitoring data. The Data Steward logs each Activity Folder as it is created in the Activity Folder Inventory. The Data Steward Admin Tool uses this inventory to   access the data sources in each Activity Folder for various use cases, such as compiling all activity location data in the Activity Location Data Compiler.

