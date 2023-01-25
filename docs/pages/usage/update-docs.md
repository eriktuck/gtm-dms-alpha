## Update Schema on dbdocs.io

### Create DDL files

Using the [Data Steward Admin Tool](https://script.google.com/home/projects/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit), create the SQL files to specify the DDL from each data source. The function is `write_ddl` for each `.gs` file.

Download the files from the **Data Admin SQL** folder on Google Drive and save them to the `sql/ddl` directory in the project repository.

### Upload to dbdocs

1. Go to dbdocs.io and load the create_<>.sql files for the schema you want to display. Make sure `append` is selected. ==use command line instead==
2. Copy the contents to the `dbdiagram.dbml` file in root directory.
3. Upload to dbdocs.

```bash
dbdocs build dbdiagram.dbml
```

The link to the documentation is included in the `mission-database.md` file in `docs/components`.