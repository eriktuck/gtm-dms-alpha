# Mission Database

The Mission Database is a PostgreSQL database designed to provide quick access for the Data Steward to core Mission data.

See the database schema on [dbdocs.io](https://dbdocs.io/eanderson-ei/missiondbalpha?view=relationships).

PostgreSQL was chosen as the relational database management system for Atlas for multiple reasons:

* **Extensions**: PostgreSQL includes extensions for **PostGIS**, a geospatial data management solution, **H3**, which is used to generalize activity location data, and **UUID** for universally unique identifiers. 
* **Scalable**: PostgreSQL is a robust, scalable solution that can grow with the Mission's needs and can be easily deployed on the cloud should that option become important.
* **Conditionally Approved**: PostgreSQL has already been reviewed for security concerns and conditionally approved. Mission-specific approval should be straightforward.

Additional detail on the rationale for selecting PostgreSQL can be found [here](../knowledge/base/database-rationale.md).

For detailed guidance on setting up the Mission Database, see [Setup](../get-started/setup/index.md).

## Considerations for using Google Sheets with PostgreSQL

- Tab names in Google Sheets are best if formatted in a valid way to be a Postgres table. Any spaces or hyphens will be converted to an underscore. Any other punctuation will be removed (although rare characters can still result in an error).
- Column names in Google Sheets are best if formatted in a valid way to be a Postgres column. Any spaces, hyphens or forward and backward slashes will be converted to underscores. Parentheses will be removed.
- Column names longer than 63 characters will be truncated.
- Do not store units in column names, use the DEFINITIONS table.
- Do not start a column name with a number.
- Do not use a numeric format that includes a comma in the data.