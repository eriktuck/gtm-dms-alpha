# Naming Conventions



## Considerations for using Google Sheets with PostgreSQL

- Tab names in Google Sheets are best if formatted in a valid way to be a Postgres table. Any spaces or hyphens will be converted to an underscore. Any other punctuation will be removed (although rare characters can still result in an error).
- Column names in Google Sheets are best if formatted in a valid way to be a Postgres column. Any spaces, hyphens or forward and backward slashes will be converted to underscores. Parentheses will be removed.
- Column names longer than 63 characters will be truncated.
- Do not store units in column names, use the DEFINITIONS table.
- Do not start a column name with a number.
- Do not use a numeric format that includes a comma in the data.