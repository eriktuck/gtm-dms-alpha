# Thematic Database

Thematic data is a catch-all term to refer to all data assets not otherwise defined. Thematic data that have secondary analysis value[^1] for the Mission are stored in the Thematic Database. The Thematic Database serves data to Web Applications for consumption by stakeholders and with the Mission Database to enrich Mission-wide analyses.

## Public and Partner Datasets
The Thematic Database stores both public and partner datasets.

### Public Datasets

The Data Steward will acquire publicly available datasets from public institutions and other organizations that are relevant to the Mission. These datasets can be included in the Thematic Database. Any datasets included by the Data Steward should be updated regularly to ensure the Thematic Database is up-to-date and trustworthy.

### Partner Datasets

Thematic data are produced by partners during the course of their work. Any datasets used to support an Intellectual Work[^2], calculate Performance Measures, or not otherwise defined are considered thematic data. Not all thematic data produced by partners will have secondary analysis value. The Data Steward will determine which datasets to include in the Thematic Database and include them once cleared.

See [Usage: Update the Thematic Database](../usage/update-thematicdb.md) for detailed instructions on adding data to the Thematic Database.

## Internal & External Datasets

The Thematic Database includes both internal and external datasets. 

### External Datasets

External datasets are those that can be shared freely. These are served publicly through the Data Catalog and Map Viewer in the Data Hub. 

### Internal Datasets

Internal datasets are those that should not be shared publicly and/or should be shared on a "need to know" basis. These might include datasets that are governed by a data sharing agreement, data that include sensitive information such as identifying information, or those otherwise deemed to require protection. Data that fall under one of the [principled exceptions](http://www.whitehouse.gov/sites/default/files/omb/bulletins/fy2012/b12-01.pdf) should be considered internal.

## Organization

The Thematic Database is stored in a Google Drive Folder and organized in this way:

```
Thematic Data/
+-- Internal/
    +-- raw/
    +-- SENSITIVE/
    +-- Spatial/
    +-- Tabular/
    +-- internal - Data Catalog.gsheet
    +-- README.gdoc
+-- Shared Externally/
    +-- Reports/
    +-- Spatial/
    +-- Tabular/
    +-- Data Catalog.gsheet
```

The `Internal` folder stores all internal data, either in the `Spatial` folder or `Tabular` folder. Raw data should are stored in the `raw` folder (always store the raw files for reference if needed; data often requires processing before it is formatted appropriately for the Thematic Database).

The `internal - Data Catalog.gsheet` is an inventory of all data assets in the Thematic Database, both internal and external.

Public datasets are stored in the `Shared Externally` folder, either in the `Spatial` folder or `Tabular` folder. Reports and other non-tabular information are stored in the `Reports` folder. 

The `Data Catalog.gsheet` imports only the external datasets from the `internal - Data Catalog.gsheet`. This file is used by the Data Catalog of the Data Hub.

[^1]: **Secondary analysis value** indicates when a dataset might be used for purposes other than for which it was originally collected. 
[^2]: **Intellectual work** includes all works that document the implementation, monitoring, evaluation, and results of international development assistance activities developed or acquired under the award, which may include program and communications materials, evaluations and assessments, information products, research and technical reports, progress and performance reports required under this award (excluding administrative financial information), and other reports, articles and papers prepared by the contractor under the award, whether published or not.



