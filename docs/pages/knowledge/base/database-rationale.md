# Database Options

The Data Steward/GIS Specialist are facing increasing data storage requirements and increasingly complex analysis requests. 

Databases and similar concepts (e.g., data lakes and lake houses) offer a solution for both of these requirements. Data can be stored efficiently and more easily queried in a relational database or No-SQL database. A database or similar technology seems necessary to meet the long term needs of the Mission for Mission-wide analysis and maintenance of data over time.

## Relational or No-SQL?

The first question is whether to use a relational database, No-SQL database, or some combination of the two. Data lakes and other less-structured approaches are beyond the scope of the current program, but may be of interest to a more sophisticated implementing partner (through the MECLA Platform, for instance).

Relational databases are best for well-structured data and rapid analysis across tables. No-SQL databases are best for less-structured data. Combinations of the two are also possible.

For example, activity data could all be stored in a relational database. These data are well structured because all activities share attributes  (e.g., name, geographic focus, ceiling, PM alignments).

Performance monitoring data could be stored in a file-based No-SQL database. This would allow each activity to have different disaggregates for each PM (which represents less-structured data). 

Links between the two would be maintained in the relational database.

### Options for Relational Databases

#### SQLite

SQLite is a lightweight, file-based database solution that is distributed with Python. This means that anyone with ArcGIS Pro (which includes Python) has access. SQLite can also be downloaded as a standalone application (you may also want SQLite Studio as a database client), however it is not in the [Approved Product Catalog](https://usaiditsm.servicenowservices.com/sphome?id=product_list_new).

SQLite can be used from the command line with the `sqlite` command line tool. However, SQLite is best when coupled with Python using the library `sqlite3` and analysis library like `pandas` in a Jupyter Notebook or Python application.  

SQLite does not have a geospatial extension (like PostGIS for PostgreSQL). Instead, most analysis will be conducted in Python using `geopandas`. The Python interpreter of ArcGIS Pro can also provide access to the database for analysis with the `arcpy` library. 

This solution is best for an advanced Python user with access to ArcPro.

#### PostgreSQL

PostgreSQL is a robust, client/server style relational database management system. PostgreSQL has been approved by M/CIO for restricted use and must be requested for new uses. pgAdmin is the database client and psql is the command line tool. 

PostgreSQL includes PostGIS, an extension for geospatial data, bindings for Uber's H3, and JSON support, replicating some of the benefits of a file-based No-SQL database.

This solution is best for an a user with database management and SQL experience. It is more scalable and deployable than SQLite. Also, it does not require a unique M/CIO review. 
