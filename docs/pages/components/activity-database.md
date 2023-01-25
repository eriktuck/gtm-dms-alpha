# Activity Database

- The Activity DB table will serve as the primary source of truth for Activity IDs. It is critical that these IDs do not change once they are read in to the Mission Database. The form UI for the Activity DB and restricted control of the database table in Google Sheets should ensure this.
- Deletions from the ActivityDB will not be carried forward into the Mission Database automatically. We believe this behavior is the desired behavior. Records can be deleted manually from the Mission Database.
