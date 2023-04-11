# Update the Thematic Database

Follow the guidance below to add new data to the thematic database or update existing data. The steps for each dataset will be unique; take care when processing data to ensure the accuracy of the processed data. Maintain a record of the processing steps. Ideally, create a repeatable workflow such that re-processing of the data can be accomplished quickly. For example, use a scripting language or create a Google Sheet that takes as input the data and uses formulas to output the processed data.

Workflows are provided to 

* [Add tabular data](#add-tabular-data)
* [Add spatial data](#process-spatial-data)
* [Add reports](#add-reports)
* [Add a calculated field](#add-a-calculated-field)
* [Add an external link](#add-an-external-link)

Before updating the Thematic Database, review the considerations below.

## Considerations

### Which data should be stored?

When you store data in the Thematic Database, you are signaling that the data are trustworthy and making a commitment to keeping the data up-to-date. If stakeholders do not trust the data in the Thematic Database, they will eventually stop referring to it. Therefore, consider the trustworthiness of the data source. Are the data trustworthy? Do the data represent the Mission's view of the subject of the data? Can you commit to updating the data source in a timely manner?

The power of the Thematic Database is the ability to bring contextual information to decision making and analysis. Consider the usefulness of the data for the Mission. Will the data be used by stakeholders? Are the data at the right level of geographic detail for making decision? Most often, Mission stakeholders require sub-national level data to inform the geographic targeting of interventions. 

For datasets collected by partners through Activities, consider the secondary analysis value[^1]. If the data will not have broad applicability outside of the Activity itself, it may be best to exclude it.

Importantly, consider the license and sensitivity of the data. Do not distribute a dataset outside of the terms of your license to use it. Ensure data are properly attributed when required. 

### Storage formats

Data should be stored in consistent formats with a preference toward open source formats whenever possible. (However, raw data should always be stored in the format it was accessed.)

Within the thematic database, files are stored in the following formats and locations.

| Data type            | Preferred Format | Extension | Location             |
| -------------------- | ---------------- | --------- | -------------------- |
| Tabular              | Google Sheet     | `.gsheet` | `tabular/`           |
| Point, line, polygon | zipped shapefile | `.zip`    | `spatial/shapefiles` |
| Gridded (raster)     | TIFF             | `.tif`    | `spatial/tif`        |

Shapefiles are stored as zipped files because zipped files display cleaning in Google Drive and zipped shapefiles can be read by many applications including Tableau. However, you may choose to also store the data in a repository of unzipped files or with specific software such as Esri ArcGIS Online, depending on how the data are used.

### Protecting sensitive data

The Thematic Database includes the `Internal/` directory to store any data that should not be shared publicly or should be shared with constraints. Files in this directory should only be shared within the Agency, never publicly. The `SENSITIVE/` folder should only be shared with specific individuals. Review the README in the folder for specific distribution limitations.

When adding data to the Data Catalog Google Sheet, do not check the box in the column 'Share Publicly?' if the data should not be made available publicly.

### Data Standards

Whenever possible, use the [Mission Data Standards](../components/data-standards.md) when coding data. The Agency has data standards for gender, age and other variables. Missions will have additional data standards, including standard administrative boundary names.

### Encoding

Save files with [encoding](../knowledge/base/encoding.md) UTF-8.

### Translation

If the data source is not in English, you may choose to translate the data to English depending on the audience and use cases (for example, any data submitted to the Development Data Library (DDL) for public sharing must be in English). Whenever data are translated, the translation should be stored with the data's metadata if not within the dataset itself.

## Workflows

### Data flow for Atlas

Atlas employs a specific process for storing and cataloging data to maintain data provenance and support updates to the datasets over time. Data should be kept up to date if included in Atlas to maintain data trustworthiness.

1. Once a dataset of interest has been identified, save the dataset in its unmanipulated form in the `raw/` data folder within the Thematic Database's `Internal/` directory. 
2. Log the dataset in the Thematic Database's **Internal Data Catalog** (`Internal/internal - Data Catalog`). Include all available information. You will update the access link after processing.

3. Process the data according to the process described in Processing steps (below).

4. Save the process data in the Thematic Database under the appropriate folder in the Thematic Database based on access constraints and data format.
5. Update the access link in the **Internal Data Catalog**.
6. Import the spatial file into the Mission Database (optional). See the [Update Mission Database](update-missiondb.md) workflow for instructions.

### Using the Data Catalog

Always log new datasets in the **Internal Data Catalog** (`Internal/internal - Data Catalog`). Datasets for public sharing will be imported automatically into the publicly available **Data Catalog**. 

Before adding a dataset, add the dataset's provider to the `providers` sheet. 

See the `DEFINITIONS` tab for guidance on the use of each field.

### Add tabular data

Tabular data refers to any data that can be stored in a table. Given the ease of access for most users, we recommend storing as much data in tabular format as possible. For example, tabular data associated with spatial data can be extracted from the spatial data and stored in tabular format.

Processing of tabular data may required specialized expertise and tools depending on the dataset size, source and format.

#### Tabular data processing

1. Access the raw file in your data cleaning tool of choice (e.g., Google Sheets, Google Colab).
2. Explore the dataset for data quality issues. Look for null values, values out of range, outliers, and other potential data quality issues. Use `#N/A` for null or missing values.
3. Ensure data comply with the Data Standards. In particular, if sub-national administrative regions are included in the dataset, ensure they reflect the standard names.
4. If necessary, normalize the data by splitting cells into multiple records or the table into multiple tables.
5. Once processed, store the data in the appropriate Google Sheet within the Thematic Database. Store the data in the `External/Tabular` directory unless the data should not be shared publicly. 
6. Update `DEFINITIONS` tab of the Google Sheet to describe the fields in the new dataset. The `DEFINTIONS` tab is used by multiple applications in Atlas.
7. Update the access link, worksheet ID and worksheet name in the **Internal Data Catalog**. 

It is highly recommended to save your processing steps for use later on to re-process the data if needed or update the dataset with more recent data once available.

!!! note
    To learn more about working with null values in Atlas, see [here](../knowledge/base/null-values.md).

!!! tip
    You may find data in the proprietary formats of the software SPSS (`.sav`) or Stata (`.dta`). See this Google Colab [notebook](https://colab.research.google.com/drive/1yDgLfxOliQdZB-82rT9erAYWWaP-yupP?usp=sharing) for guidance on reading data from these formats.

### Add spatial data

Processing spatial data requires the specialized expertise and tools of a GIS  Specialist. If you do not have access to the necessary tools or expertise, the GeoCenter can help you access Esri ArcGIS software and/or complete geospatial tasks. You may also be able to find these resources through a MEL Platform or a support services contract.

The specific process will differ based on the Geographic Information System (GIS) tool used. We recommend setting up a workflow in your GIS tool of choice when processing the data so that data can be reprocessed quickly if needed. For example, create a Google Colab notebook with all processing steps or use Esri ArcGIS Pro's Model Builder to create a reproducible workflow. An example for the Guatemala Mission using Python can be found in this Google Colab [notebook](https://colab.research.google.com/drive/1oGAbIclKlCai--BmMiz2AkV8CObncwbk?usp=sharing). 

Follow the [data flow for atlas](#data-flow-for-atlas) to download, log and upload the data. The processing steps below describe how to process raw spatial data files for use in Atlas.

#### Spatial data processing steps

1. Access the raw file in your GIS tool of choice.
2. Visualize or otherwise review the data to familiarize yourself with the data and its attributes.
3. If needed, construct a geometry for the file from spatial data in the file (most commonly from a latitude and longitude column).
4. Check the [coordinate reference system (CRS)](../knowledge/base/crs.md). If a CRS is not already associated with the data, review the data source's documentation and the data's metadata. See this Google Colab [notebook](https://colab.research.google.com/drive/1IKSLavz_wJrppbYl32kfZaZWo8f-ZAke?usp=sharing) for an example from Guatemala. 
5. Reproject to WGS 84 (EPSG code 4326). WGS 84 is the required CRS for geographic data submitted to the federal government (see [ADS 579saa](https://www.usaid.gov/about-us/agency-policy/series-500/references-chapter/579saa)). In addition, spatial data in this CRS can be visualized directly within PostgreSQL and is the expected CRS for web mapping applications.
6. Rename columns if needed to better communicate the contents of each field. Note that for shapefiles, column names greater than 10 characters will be truncated.
7. Remap column values and data types if needed. Whenever possible, encode as much information as possible within the data itself. We are far more interested with human readability than with storage efficiency.
8. Save the file in the appropriate file format and compress into a zipped file.
9. Upload the file to the destination.

### Add reports

Reports and analyses can be easily added to the Thematic Database, which will make them available through the Data Catalog web application.

1. Store the report in the `Reports/` folder.
2. Log the report in the Thematic Database's **Internal Data Catalog** (`Internal/internal - Data Catalog`).

### Add a calculated field

Adding a calculated field in the Thematic Database allows you to enrich the data and support users to visualize and make decisions from the calculated fields.

1. Insert a column in the desired sheet within the Thematic Database.
2. Use a descriptive column header that conforms to the Atlas [naming conventions](../knowledge/base/naming-conventions.md).
3. Write the formula for the calculated field. (Use `Ctrl + Enter` to save the formula to all rows).
4. Log the new column in the `DEFINITIONS` tab. In the `definition` field, describe how the calculation is completed. In the `dataset` field, append `[calcualted]` to the name of the data source to indicate that the data are derived from, not directly attributable to, that data source.

We recommend leaving the equation in the sheet (rather than converting to plain text) so that other users may review how the calculation was completed.

### Add an external link

In many cases, it is preferable to simply link to an external data source from the **Data Catalog** rather than read the data into the Thematic Database. Add an external link when the data source includes a useful dashboard or other data visualization platform or when you want to include the data but don't want to commit to keeping the data up-to-date. 

1. Log the data in the Thematic Database's **Internal Data Catalog** (`Internal/internal - Data Catalog`).
2. Set the Access Link to be the same as the External Link.

[^1]: **Secondary analysis value** indicates when a dataset might be used for purposes other than for which it was originally collected.
