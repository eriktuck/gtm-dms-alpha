# psql

[psql](https://www.postgresql.org/docs/current/app-psql.html) is a command line tool for Postgres databases. `psql` is installed by default with PostgreSQL (unless specifically excluded during the installation process). `psql` can also be accessed from [pgAdmin](pgAdmin.md) using the **PSQL Tool**.

## Getting Started

These instructions describe how to use `psql` from the command line for advanced users. You can also access `psql` using the **PSQL Tool** in pgAdmin, however instructions will differ.

1. Add psql to your PATH variable, follow the instructions [here](add-psql-to-path.md).
2. Open Bash from the project directory or the SQL Shell (psql), installed with Postgres.
3. Log in to the `postgres` account. 
   
        psql -U postgres

4. You will be prompted for the password. Note that when typing in the password you may not see any characters appear. Input the password you set when installing Postgres.

        >>>Password for user postgres:

5. Create a new database. If successful, the prompt will print `CREATE DATABASE`. You can also use pgAdmin to view the database.

        CREATE DATABASE <databasename>;

6. Connect to the new database ( `\c <databasename>` is also valid).  

        \connect <databasename>

See [SQL](SQL.md) for details on how to use `psql` to add tables, insert data, create views, and read from and write to CSV. 

Quit the interactive SQL session. (This is not required if using the **PSQL Tool** in pgAdmin).

```psql
\q
```

## Common workflows

### Connect to a database
When coming back to a database project, login and specify the database at the same time. You will be prompted for the password each time.

``` bash
psql -U postgres -d <databasename>
```

### Read from CSV
Often, your data will initially be stored in a CSV. Before reading from a CSV, you must [create a table](SQL.md#create a table] with the corresponding rows. PostgreSQL provides a helper [COPY](https://www.postgresql.org/docs/15/sql-copy.html) command for reading from  `.csv` files.  The  will append the data to whatever is in the table already.  

Specify the fields if your CSV does not contain every column in your database table; those fields not specified will receive their default value. Most commonly, specify fields when  your database has an auto-incrementing `id` field and your CSV does not have a unique identifier. 

```sql
COPY <tablename>
(<field_1>, <field_2>)
FROM <full/path/to/file> 
DELIMITER ‘,’
CSV Header;
```

Alternatively, use a scripting language to create a `.sql` file that creates the table and inserts each record one at a time. The file should look like this:

```sql
CREATE TABLE <tablename> (
    <field_1> <field_1_type>,
    <field_2> <field_2_type>
);

INSERT INTO <tablename> (<field_1>, <field_2>) VALUES (<field_1_val>, <field_2_val>);
INSERT INTO <tablename> (<field_1>, <field_2>) VALUES (<field_1_val>, <field_2_val>);
INSERT INTO <tablename> (<field_1>, <field_2>) VALUES (<field_1_val>, <field_2_val>);
...
```

Save the file and copy the full path to the file. Open a `psql` session and use `\i` which executes commands from a file. `\ir` allows you to use the relative path.

```sql
\i <full/path/to/file>
```

### Import CSV from web
You can read a file directly from the web using `curl`, avoiding the need to download the file locally. Use quotes around the URL. 

```sql
COPY <tablename>
FROM PROGRAM 'curl -L "<url>"'
HEADER CSV DELIMITER ',';
```

To test the download link, open Bash and use the same command `curl -L "<url>"`, replacing `<url>` with the URL to your data; you should see the contents printed in the terminal in comma-separated rows. 

You can use Google Sheets to serve data in this way. In fact, you can read any data that can be accessed programmatically from standard output of your terminal. See this [blog post](https://www.depesz.com/2013/02/28/waiting-for-9-3-add-support-for-piping-copy-tofrom-an-external-program/) for more detail.

### Export to CSV
To export to query, you can provide a table, view, or query to the COPY command.

```sql
COPY (<tablename/view/query>) 
TO 'path/to/file.csv' 
DELIMTER ',' 
CSV HEADER;
```

## Tips

Use `\x` to toggle expand display and make results easier to read.

## Common psql commands

| **psql command**     | **result**                                |
| -------------------- | ----------------------------------------- |
| `\?`                 | get help                                  |
| `\q`                 | quit                                      |
| `\l`                 | list databases                            |
| `\d`                 | list tables                               |
| `\d <table>`         | list fields in table                      |
| `\i`                 | execute commands from a file              |
| `\ir`                | execute commands from file, relative path |
| `\x`                 | toggle expand display                     |
| `\copy`, `COPY`      | copy from/to CSV                          |
| `\! clear`           | clear prompt                              |
| `DROP TABLE <table>` | drop a table                              |

