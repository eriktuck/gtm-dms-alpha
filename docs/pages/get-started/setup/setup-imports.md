# Set up IMPORTRANGE

Atlas uses a number of `IMPORTRANGE` functions to pipe data between spreadsheets. In this step, you will update the spreadsheet IDs in each `IMPORTRANGE` function to the IDs of your copy of each file.

First, we'll update a single IMPORTRANGE function to demonstrate the workflow. Next, you'll repeat the process for all `IMPORTRANGE` functions shown in the table below.

1. Navigate to the Google Sheet `adb_stage` (*Atlas > Modules > Activity Database*). This is the source sheet.

2. Copy the spreadsheet ID of the source sheet. The folder ID is shown in the URL after `folders/` and before any question marks (`?`), like below.

   	https://drive.google.com/drive/folders/{folderID}?lfhs=2

3. Navigate to the Google Sheet `activity_data` (*Atlas > Modules > Thematic Data > Internal > Tabular*). This is the destination sheet.

4. Open the spreadsheet `activities_import`.

5. In cell `A1`, replace the current spreadsheet ID with the ID copied in step 2. The formula will take the general form:

   ```
   =IMPORTRANGE("{folderID}", "data!A:BI")
   ```

6. Hit **Enter** to commit the change.

7. A `#REF` error will show in cell A1. Select the cell to display a popup message requesting you to **Allow Access** to the source sheet. 

   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_iE5G2nHxWU.png)

8. Click **Allow Access**.



Repeat this process for all `IMPORTRANGE` functions in Atlas. The table below shows the source sheet, destination sheet, and cell reference for all `IMPORTRANGE` functions.

| Source                                                       | Destination                                                  | Cell Reference |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| **adb_stage**: data<br />*Atlas > Modules > Activity Database* | **activity_data**: _activities_import<br />*Atlas > Modules > Thematic Data > Internal > Tabular* | A1             |
| **Activity Database**: data<br />*Atlas > Modules > Activity Database* | **adb_stage**: data<br />*Atlas > Modules > Activity Database* | A1             |
| **Atlas Data Inventory:** _import<br />*Atlas (root)*        | **activity_data**: _activities_import<br />*Atlas > Modules > Thematic Data > Internal > Tabular* | A1             |
| **Data Catalog:** providers<br />Atlas > Modules > Thematic Data > Internal | **Data Catalog:** providers<br />Atlas > Modules > Thematic Data > Shared Externally | A1             |
| **Data Catalog:** directory<br />Atlas > Modules > Thematic Data > Internal | **Data Catalog:** directory<br />Atlas > Modules > Thematic Data > Shared Externally | A1             |
| **Activity Location Data Complier**: _export<br />*Atlas > Modules > Activity Location Data* | **adb_stage:** stage<br />*Atlas > Modules > Activity Location Data* | A1             |
| **adb_stage:** stage<br />*Atlas > Modules > Activity Location Data* | **Activity Location Data (Public):** data<br />*Atlas > Modules > Activity Location Data* | A1             |

