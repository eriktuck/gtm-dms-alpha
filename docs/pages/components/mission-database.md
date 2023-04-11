# Mission Database

The Mission Database is a PostgreSQL database designed to provide quick access for the Data Steward to core Mission data. This component is optional. 

See the database schema on [dbdocs.io](https://dbdocs.io/eanderson-ei/missiondbalpha?view=relationships).

PostgreSQL was chosen as the relational database management system for Atlas for multiple reasons:

* **Extensions**: PostgreSQL includes extensions for **PostGIS**, a geospatial data management solution, **H3**, which is used to generalize activity location data, and **UUID** for universally unique identifiers. 
* **Scalable**: PostgreSQL is a robust, scalable solution that can grow with the Mission's needs and can be easily deployed on the cloud should that option become important.

Additional detail on the rationale for selecting PostgreSQL can be found [here](../knowledge/base/database-rationale.md).

For detailed guidance on setting up the Mission Database, see [Setup](../get-started/setup-optional/setup-missiondb.md).
