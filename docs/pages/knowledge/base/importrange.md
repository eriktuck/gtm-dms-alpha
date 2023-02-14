# IMPORTRANGE

Google Sheet's [`IMPORTRANGE`](https://support.google.com/docs/answer/3093340?hl=en) function allows for easy transfer of data between Google Sheets.

!!! warning
    Anyone with edit access to a Google Sheet with an `IMPORTRANGE` function can view the Google Sheet from which it is importing data. To avoid accidental leaks of sensitive data, best practice is to [stage data](staging-data.md) in an intermediate spreadsheet.

!!! tip
    You cannot use `IMPORTRANGE` on an Excel (`.xlsx`) file stored in Google Drive.  

## Set up the export

Before you import data, it is best practice to set up the export. This will protect the import from breaking due to changes in the source Sheet.

1. Create a new sheet in the Google Sheet named `export` (or similar).
2. For each column you want to export, use an array formula to copy the column to the `export` sheet. For example, in cell A1 copy/paste the below formula to copy column `A` from `data` to column `A` in the `export` sheet. 

         ={data!A:A}

3. Repeat for all columns from the source data sheet that you want to export.

## Import data

In the new sheet, use the `IMPORTRANGE` function to import the data.

1. Copy the sheet ID from the source data sheet. You can find the sheet ID in the url between `/d/` and `/edit` :

        https://docs.google.com/spreadsheets/d/{spreadsheet_ID}/edit

2. In cell A1 of the sheet you want to import data into, use the `IMPORTRANGE` function, updating the spreadsheet ID, sheet name and range.

        =IMPORTRANGE("spreadsheet ID", "export!A:A")

3. Authorize access to the data source. You only need to do this on the first time. Click the cell A1 and select "Allow Access".

<figure markdown>   ![click allow access](https://storage.googleapis.com/ei-dev-assets/assets/chrome_hK6Qt3d4JT.png)   
</figure>


## Using a Query

You can combine `IMPORTRANGE` with [`QUERY`](https://support.google.com/docs/answer/3093343?hl=en) to filter the imported data upon import. This can be useful for filtering out sensitive or irrelevant data.

```
=QUERY(IMPORTRANGE("sheet ID", "export!A:A"), "SELECT * WHERE Col1 = 'foobar'")
```

Note that you reference columns by their number (starting with 1) and that strings should be enclosed in single quotes `''`. See [here](https://developers.google.com/chart/interactive/docs/querylanguage) for further details on the query language.
