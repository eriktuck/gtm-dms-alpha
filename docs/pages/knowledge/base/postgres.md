# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an open source relational database management system (RDBMS), often referred to as Postgres.

See [Installation](../../get-started/installation.md) for guidance on installing PostgreSQL.

## Extensions

PostgreSQL's extensions are one of the reasons for selecting PostgreSQL as a RDBMS for Atlas.

To list all available extensions with [psql](psql.md):

```sql
SELECT * FROM pg_available_extensions;
```

The extensions used by Atlas include

- uuid-ossp: Universally unique identifiers
- h3: h3 bindings for generalizing spatial data
- PostGIS: managing geospatial data



??? example "Additional Resources"
    - [Amigoscode YT series on PostgreSQL](https://www.youtube.com/playlist?list=PLwvrYc43l1MxAEOI_KwGe8l42uJxMoKeS)
    - [PostgresSQL Tutorials](https://www.postgresqltutorial.com/)