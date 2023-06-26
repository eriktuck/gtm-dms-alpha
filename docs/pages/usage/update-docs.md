# Update Atlas Documentation

We encourage you to expand and customize this documentation for your own use. To suggest edits to this documentation, please open an issue on this repository in GitHub.  

## Fork this repo

The best way to update Atlas documentation is to fork this repository (requires a GitHub account). Once you  have forked the repository, follow the process below to serve this documentation in your own GitHub pages site.

1. In your repo on GitHub, open the **Settings** tab and select **Pages**. 
3. In the **Build and deployment** section, under **Source** select "Deploy from a branch". 
4. Under **Branch**, select the `gh-pages` branch. 
5. Click **Save**.

GitHub requires a few seconds to create the site, but soon you'll find the link to the site under **Settings > Pages**. This is also where you can unpublish a site.

You will now be able to edit the documentation directly by clicking the edit icon for each page.

## Download documentation

Alternatively, you may download the contents of this repository as a zip file. On the repository home page, click the green **Code** button and select **Download ZIP**. Documentation is stored in the `docs/pages` directory. We recommend editing documents in a Markdown editor, however documents may be edited as plain text.

## Update Mission Database Schema

The Mission Database schema is available through dbdocs.io. The link to the documentation is included in the `mission-database.md` file in `docs/components`.

### Create DDL files

Using the [Data Steward Admin Tool](https://script.google.com/home/projects/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit), create the SQL files to specify the DDL from each data source. The function is `write_ddl` for each `.gs` file.

Download the files from the **Data Admin SQL** folder on Google Drive and save them to the `sql/ddl` directory in the project repository.

### Upload to dbdocs

1. Go to dbdocs.io and load the create_<>.sql files for the schema you want to display. Make sure `append` is selected.
2. Copy the contents to the `dbdiagram.dbml` file in root directory.
3. Upload to dbdocs.

```bash
dbdocs build dbdiagram.dbml
```

