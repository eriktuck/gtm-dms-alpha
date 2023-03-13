# Null Values

When data are missing or invalid, a null value is used to represent the data. This is preferable to a blank cell, which is ambiguous. 

To read data from Google Sheets into the Mission Database, all null values should be represented by the signifier `#N/A`. Blank cells in non-text columns will result in a failure to load the data into the table. For text cells, blanks are allowed but not preferred.

## How to convert blanks in Google Sheets to null values

To convert all blank cells in a range within a Google Sheet:

1. Select the range and then use `Ctrl + F` to open the Find box.
2. Click the three dot menu to open the Find/Replace dialog box,
3. Use `^\s*$` to represent blank values in the Find box and check **Search using regular expressions**.
4. Input `#N/A` in the Replace with box.
5. Click **Replace all**.

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_SkvCGKUulA.png)

## How null values are read into the Mission Database

The Mission Database uses [`psql`](psql.md) to upload data from Google Sheets using the [`COPY FROM PROGRAM`](https://www.postgresql.org/docs/current/sql-copy.html) command. In the Data Steward Admin Tool, the null values are specified in `utils.gs`: `write_sql_copy_table` function.  `COPY FROM PROGRAM` can only accept a single null value. Advanced users may alter the data pipelines if requiring more than one null value.