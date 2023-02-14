# Update Mission Database

The Data Steward will update the Mission Database on a regular basis to ensure that data are up-to-date and available for query. The Data Steward Admin Tool produces `.sql` files in the Data Admin SQL folder in Atlas every 24 hours. Upload these file to the Mission Database each day. 

1. Navigate to the `admin/sql/` folder in the `Atlas/` Google Drive folder.

2. Download each `.sql` file.

3. Open pgAdmin and select the `missiondb` database.

4. Launch the PSQL editor. The prompt should reference `missiondb`:	

        missiondb#=

5. Set the encoding to `UTF8` and load each file into the database. Copy/paste the following code block into the PSQL editor and update the paths to each file. 

        \encoding UTF8
        \i full/path/to/load_activity_location_data.sql
        \i full/path/to/load_thematic_data.sql
        \i full/path/to/load_activity_data.sql

!!! warning
    If you are working on the Windows Operating System, change all backslashes to forward slashes in the path.

## Ad-hoc update

To update the Mission Database when a data source is updated, re-create the `.sql` files corresponding to the data source that has been updated and then follow the steps defined above.

1. Open the Data Steward Admin Tool (located at [script.google.com](https://script.google.com/home)).

2. In the **Editor** window, locate the file corresponding to the data source that has been updated (i.e., `activity-data.gs` for the Activity Database) and select it.

3. In the script editor menu bar, select the function that begins with `generate_` and click **Run**.
   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_BJVZTbKuOY.png)


4. Proceed with Step 1 of the Daily Update process, downloading and uploading the `.sql` file that corresponds to the data source that has been updated.