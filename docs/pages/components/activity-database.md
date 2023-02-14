# Activity Database

- The Activity DB table will serve as the primary source of truth for Activity IDs. It is critical that these IDs do not change once they are read in to the Mission Database. The form UI for the Activity DB and restricted control of the database table in Google Sheets should ensure this.
- Deletions from the ActivityDB will not be carried forward into the Mission Database automatically. We believe this behavior is the desired behavior. Records can be deleted manually from the Mission Database.



## Data Pipelines

Data from the Activity Database Google Sheet are queried in the `Query - for DB Web Frontend` tab to exclude Pre-Awards and Personal Services Contracts and limit data read by the front end to the highest-priority fields.

From the `Query - for DB Web Frontend` tab, data are imported to the TableGen Google Sheet `Data` tab.

## Assign domain owners

Assign domain owners to each section so that the Data Steward can track which team is the official source of each domain (e.g., funding is owned by OAA). Domain owners can help design each form section to meet their needs.

## Sub components

* **Activity DB data backups:** a script container-bound to the Activity Database Google Sheet runs daily and stores backups in this folder
* **Activity DB file uploads:** any file uploaded through the Activity Database Form is store here with the Activity ID prepended.
* **FormGen:** creates the form and adds fields to the Activity Database Google Sheet.
* **TableGen:** creates the table displayed in the application front end and serves the filtered data from the Activity Database Google Sheet.

## How to Update

### Add field

Do not add fields directly to the Activity Database Google Sheet. Add fields to the FormGen sheet. The new field will be appended to the Activity Database Google Sheet. Column order in this sheet does not matter.

1. Open FormGen
2. Add a row in the appropriate location
3. Update all field attributes
4. Insert a test record (or update an existing record) to see the new field in the Activity Database 
5. Create a named range for the new column
   1. Select the column in the Activity Database Google Sheet
   2. Type the name in the upper left box; replace spaces with underscores





