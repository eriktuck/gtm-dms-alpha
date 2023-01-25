# SQL

Structured Query Language (SQL) is the language used by relational databases to define and manipulate data. Each relational database management system has it's own unique flavor of SQL. This article discusses the PostgreSQL flavor of SQL.

## Common SQL commands

### Create a table

Use the CREATE TABLE command to create a table.

```sql
CREATE TABLE persons (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
```

### Create a view

Views are calculated tables. Create a view by simply adding the following line to the top of your SQL query.

```sql
CREATE VIEW IF NOT EXISTS view_name AS
```

### Update a record

Use the primary key to access the record. You can update multiple fields for any record by comma separating each `field = value` pair. You can also update multiple records at the same time, depending on the `WHERE` query. Always use the `WHERE` clause!

```sql
UPDATE <tablename> SET <field> = <value>, <field_2> = <value_2> WHERE id = <id>;
```

!!! Tip
    Be sure to not edit records that will be overwritten on the next import. Instead, edit the data source, drop the existing table, and read in the new one. Because Atlas is primarily a data aggregator, not a data source, updates to most records should be done in the data source on Google Drive.

### Delete a record

As with updating a record, always use the `WHERE` clause when deleting records. 

```sql
DELETE FROM <tablename> WHERE id = <id>;
```

### Drop tables or views

Sometimes you'll want to drop many tables or all tables in a database and start fresh with the same schema. Use `CASCADE` to remove foreign keys from related tables.

```sql
-- DROP TABLE 
DROP TABLE IF EXISTS table_name CASCADE;

-- DROP VIEW
DROP VIEW IF EXISTS view_name;
```

!!! warning
    Using the `CASCADE` command to overcome the foreign key constraint when deleting records is not best practice. `CASCADE` will delete any record in your database that includes that foreign key. Instead, you should manually delete or update related records to have full control over what is deleted.

## Primary keys

Primary keys are unique identifiers for each record. Include the key word `PRIMARY KEY NOT NULL` when defining the column to specify it as a primary key. 

#### Sequence as primary key

Use the data type BIGSERIAL or SERIAL when specifying integer type primary keys so that they will auto increment.

#### Compound primary key

You can also set a compound primary key (e.g., two or more fields together). Be careful to specify fields that will never contain duplicates!

```sql
-- SPECIFY IN CREATE TABLE
CREATE TABLE persons (
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (first_name, last_name)
);

-- OR USE ALTER TABLE
ALTER TABLE persons PRIMARY KEY (first_name, last_name);
```

#### UUID primary key

A universally unique identifier (UUID) is a unique identifier that can be used as a primary key. The benefit of a UUID, as opposed to a sequence, is that it is unique across all tables (and even other databases). It also prevents hackers from mining a database by guessing primary keys. 

To use in Postgres, you must first install the extension.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
```

Use `\df` to list the UUID generation algorithms available. You'll need to select one of these to generate a UUID when inserting a record. I recommend `uuid_generat_v4()`.

To create a primary key using UUID simply list `UUID` as the data type when creating the table. Foreign key references to a `UUID` should also use the data type `UUID`. When inserting a record, call the UUID function to create a unique identifier. You do not need to check for duplicates since these are guaranteed to be universally unique.

```sql
CREATE TABLE cars (
    car_uid UUID NOT NULL PRIMARY KEY 
);

-- foreign key references should also be UUID
CREATE TABLE persons (
    person_uid UUID
    car_uid UUID references car(car_uid)
);

-- use a function to generate a uuid for each record
INSERT INTO persons (person_uid)
VALUES (uuid_generate_v4());
```

## Transactions

It is best practice to wrap commands in a transaction. [Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) will preserve database integrity by rolling back all commands executed if one fails. To create a transaction, simply begin and end the series of commands with `BEGIN` and `COMMIT`.

```sql
BEGIN;
-- SQL Commands
COMMIT;
```

## Constraints

Constraints prevent database operations that detoriate the integrity of the data.

### Unique constraint

Unique contraints enforce uniqueness for any column, and are enforced by default with primary keys.

```sql
-- SPECIFY IN CREATE TABLE
CREATE TABLE <tablenamd> (
    col1 TEXT,
    col2 TEXT,
    CONSTRAINT <constraint_name> UNIQUE (col1)
);

-- OR USE ALTER TABLE
ALTER TABLE <tablename> ADD CONSTRAINT <contraint_name> UNIQUE (<col>);
```

### Check constraint

Use check for validation of database inputs. See also [enumerators](#enumerators). 

```sql
-- SPECIFY IN CREATE TABLE
CREATE TABLE <tablename> (
    gender TEXT CHECK (gender IN ('Female', 'Male'))
);

-- OR USE ALTER TABLE
ALTER TABLE <tablename> ADD CONSTRAINT <contraint_name> CHECK (gender IN ('Female', 'Male'));
```

### On conflict do nothing

Use the `ON CONFLICT` command combined with `DO NOTHING` to skip records that violate constraints. For example, inserting a record with an existing primary key violates the `NOT NULL` constraint and will fail. 

```sql
INSERT INTO <tablename> (first_name, last_name)
VALUES ('John', 'Doe')
ON CONFLICT (id) DO NOTHING;
```

This is useful when updating a table where some of the records in the data source are already in the table.

## Upsert

Use `ON CONFLICT` command combined with `DO UPDATE` to update a record when a constraint is violated. This is commonly referred to as an "upsert".

```sql
INSERT INTO <tablename> (first_name, last_name)
VALUES ('John', 'Doe')
ON CONFLICT (id) DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name;
```

This is useful when a user is editing a record in your application or when you have edited many records in the data source.

Some caveats

- If using a partial index, you must constrain to only the indexed part of the table using a `WHERE` statement (see [here](https://stackoverflow.com/questions/42022362/no-unique-or-exclusion-constraint-matching-the-on-conflict)). 

## Enumerators

[Enumerated (enum) data types](https://www.postgresql.org/docs/current/datatype-enum.html) are lists of valid options for a field, for example the days of the week or responses on a Likert scale.

To create an enumerator use the `CREATE TYPE` command. Once created, you can use the enumerator just like any other data type when creating a table.

```sql
CREATE TYPE likert AS ENUM ('strongly agree', 'agree', 'neutral', 'disagree', 'strongly disagree');

CREATE TABLE survey_results (
    question INT
    result likert
);
```

Enumerators are ordered sets, and so comparison operators are valid. For example, you could create an enumerator for the list of valid [[ordinal]] (i.e., ordered categorical) values and use a comparison operator to query records.

```sql
SELECT * FROM survey_results WHERE result >= 'agree' ORDER BY likert;
```

Each enumerated type is separate. The same value in two enumerators are not equivalent. Enumerators are unlike numeric and text data types, so regular numeric string operators and function won't work.

Alternatives to enumerators include using a [[#check]] constraint or creating a full table for the enumerated options and relating the field through a foreign key. For this second case, consider using the value itself as the primary key, as shown below. The downside of these options is that they are not ordered in the same way an enumerator is, and so comparison operators will not work.

```sql
CREATE TABLE likert (
    response TEXT PRIMARY KEY
);

INSERT INTO likert (response) 
VALUES ('strongly agree', 'agree', 'neutral', 'disagree', 'strongly disagree');

CREATE TABLE survey_results (
    question INT
    result TEXT REFERENCES likert (response) ON UPDATE CASCADE
);
```

## Relationships

If your primary key uses BIGSERIAL, use BIGINT as the type for the foreign key (field that defines the relationship). If using SERIAL, use INT as the type for the field with the relationship.

There are two patterns for specifying relationships. First, you can write the reference inline when specifying the table. Alternatively, you can use an ALTER TABLE command to add the relationship. When using the first strategy, the table to which you are making the relationship must already exist (or be specified first in the `.sql` file).

## Joins

Joins allow you to combine data from multiple tables.

```sql
SELECT * FROM <table1> 
JOIN <table2> ON <table1.field> = <table2.field>;
```

## Working with dates

Dates and times can be complicated. PostreSQL has a number of utilities that help store dates and times correctly and calculate time intervals or age.

```sql
CREATE TABLE dates (
    date DATE,
    time TIMESTAMP
);

INSERT INTO dates (
    date,
    time
) VALUES (DATE '2022-11-02', 1999-01-08 04:05:06 );
```

### Time intervals

```sql
NOW() + INTERVAL '1 YEAR';
```

See the [docs](https://www.postgresql.org/docs/current/datatype-datetime.html) for more detail.

### Age

```sql
AGE(<birthday>)
```

## Extract

Use `EXTRACT` to get a day, week, month, year, decade or century from a date.

```sql
EXTRACT(DAY FROM NOW());
```

## Casting

Casting converts a value to another format, often used for datetimes. Use `::` (double colon) to cast.

```sql
NOW()::DATE;
```

## Data Types

| Name               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `integer`          | typical choice for integer                                   |
| `real`             | inexact floating point up to 6 decimal places (see also `double precision` and `numeric`) |
| `text`             | variable length character string (see also `varchar(n)`)     |
| `boolean`          | true/false                                                   |
| `date`             | date                                                         |
| `timestamp`        | date and time (see options for time zones)                   |
| `bigserial`        | auto-incrementing integer up to 9,223,372,036,854,775,807    |
| `uuid`             | universally unique identifier                                |
| `money`            | currency amount                                              |
| `point`            | geometric point                                              |
| `polygon`          | geometric polygon                                            |
| `jsonb`            | textual json data (see also `json`)                          |
| `varchar(n)`       | string not to exceed length n                                |
| `serial`           | auto-incrementing integer up to 2,147,483,647                |
| `double precision` | inexact floating point up to 15 decimal places               |
| `numeric`          | high precision floats (slow calculations)                    |
| `time`             | time only                                                    |
| `time interval`    | interval of time                                             |

All available data types are described [here](https://www.postgresql.org/docs/current/datatype.html#DATATYPE-TABLE).

## PostgreSQL JSON data type

JSON and JSONB both store JSON data. JSONB is generally preferred because, while it is slower to load, it is faster to query. The "B" in JSONB stands for binary and is sometimes referred to as "BSON". JSONB will remove trailing white spaces and any duplicate keys. This shouldn't be a problem for well-constructed JSON, but it's important to know. Read the [docs](https://www.postgresql.org/docs/current/datatype-json.html) before using this data type to understand it's limitations.

To insert JSON data, wrap the dictionary in single quotes and use double quotes for any string-like keys or values.

```sql
CREATE TABLE my_json(
  id SERIAL PRIMARY KEY,
  data JSONB
);

INSERT INTO my_json (data)
VALUES ('{"name": "Coffee Value Chains", "year": 2022, "results": {"indicator1": 100, "indicator2": 150}, "contacts":["Sergio", "Monica"]}'});
```

### Basic queries

Use the `->` operator to query within a JSON object. 

```sql
-- Select a property
SELECT data -> 'name' as name FROM my_json;

-- Select a property based on a condition
SELECT data -> 'results' FROM my_json WHERE data -> 'name' = '"Coffee Value Chains"';
```

You can chain multiple dash-arrow ( `->` ) operators to query within nested JSON.  Alternatively, use the hash-arrow ( `#>` ) operator to query by passing a path of properties (wrapped in curly braces `{}` ). Queries for JSON and JSONB are the same.

```sql
-- Select nested JSON object field by property
SELECT data -> 'results' -> 'indicator1' as indicator1 FROM my_json;

-- Alternative to select nested JSON object field by property
SELECT data #> '{results, indicator1}' as indicator1 FROM my_json;
```

The previous queries all return JSON objects so that you can continue to query them. The dash-double-arrow ( `->>` ) operator will return text from the query instead of JSON.

```sql
-- Select a JSON object field as text
SELECT data->>'name' as name FROM users; -- you cannot chain after returning text
```

If your JSON contains arrays, you can index into the array using the query techniques described above combined with the element's index to get a specific element from an array.

```sql
-- Select a JSON array element
SELECT data -> 'contacts'-> 0 as first_contact FROM my_json;

-- Alternative to select a JSON array element
SELECT data #> '{contacts, 0}' FROM my_json;
```

You can also unpack an array using the `jsonb_array_elements_text()` function.

```sql
SELECT id, jsonb_array_elements_text(data -> 'contacts') FROM my_json;
```

### Contains queries

Use the contains operator ( `@>` ) to return records that include a specific property or property value.

```sql
-- Select all records that contain a specific property
SELECT * FROM my_json WHERE data @> '{"results": "indicator1"}';

-- Select all records that contain a specific property value
SELECT * FROM my_json WHERE data @> '{"results": "indicator1: 100"}';

-- Select all records that contain a specific value(s) in an array
SELECT * FROM my_json WHERE data -> 'contacts' @> '["Monica"]';
```

Use the property-test ( `?` ) operator to query records based on the presence of one or more top-level properties.

```sql
-- Select all records that contain a specific key
SELECT * FROM my_json WHERE data ? 'results';

-- Select all records that contain any of these keys
SELECT * FROM my_json WHERE data ?| ['results', 'contacts'];

-- Select all records that contain all of these keys
SELECT * FROM my_json WHERE data ?& ['results', 'contacts']; 
```

### Updating JSON objects

Use the `jsonb_set()` function to update JSONB objects.

```sql
UPDATE my_json SET data = jsonb_set(data, '{year}', 2023);
```

If any records do not have the property you want to update, you must first create it. To avoid overwriting those records that do have the property, use the `COALESCE` command with an empty object ( `'{}'` ).

```sql
UPDATE my_json SET data = jsonb_set(data, '{"targets"}', COALESCE(data->'targets', '{}'));
SELECT jsonb_set(data, '{targets, indictaor1}', (SELECT data->'indicator1' FROM my_json j1 WHERE j1.id=j2.id)) FROM my_json j2;
```

### Indexing JSON objects

JSONB supports GIN indexes by means of `json_ops` and `jsonb_path_ops`. `json_ops` creates an index item for every property and value in the JSON whereas `json_path_ops` is more compact and faster to process but supports fewer operations.

??? example "Additional Resources"
    - [DevHints.io/postgresql-json](https://devhints.io/postgresql-json)
    - [PostgreSQL JSON Functions & Operators](https://www.postgresql.org/docs/current/functions-json.html)
    - [PostgreSQL Tutorial JSON](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-json/)
