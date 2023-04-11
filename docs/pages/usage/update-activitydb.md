# Update Activity Database

## How to Update

### Add field

Do not add fields directly to the Activity Database Google Sheet. Add fields to the FormGen sheet. The new field will be appended to the Activity Database Google Sheet. Column order in this sheet does not matter.

1. Open FormGen
2. Add a row in the appropriate location
3. Update all field attributes
4. Insert a test record (DO NOT edit an existing record) to see the new field in the Activity Database 
5. Delete the inserted empty record
6. Create a named range for the new column
   1. Select the column in the Activity Database Google Sheet
   2. Type the name in the upper left box; replace spaces with underscores
7. Update the `Push Query - All` tab in the Activity Database with the new field
8. Add the field to the Queries for any applications you need it in
   * For the Thematic Database:
     * Add the field to the `Query - Thematic Database Query` function range
     * Add the field to the activity data `_import_activities` query
     * If needed, create a new tab to normalize any comma or pipe separated field
     * Log the field in the `DEFINITIONS` tab
     * Run the `generate_activity_sql` function in the Data Steward Admin Tool
     * Open PgAdmin
     * Create a new column to store the data (or simply drop the affected tables to reload with the new schema for tables using truncate and load)
     * Reload all tabular data