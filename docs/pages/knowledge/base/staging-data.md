# Staging Data

Staging data in an intermediate Google Sheet is best practice when piping data from a source with sensitive data to a source that will have public view access. This prevents bad actors from accessing data by manipulating an [`IMPORTRANGE`](importrange.md) function should they get edit access to the sheet.

1. Create a new Google Sheet to stage the data
2. Use a combination of `QUERY` and `IMPORTRANGE` to import only non-sensitive data from the source sheet (see guidance [here](importrange.md#using-a-query)).
3. Use `IMPORTRANGE` from the new Google Sheet to the public destination sheet.

For added protection, remove all share permissions from the staged data except for the Data Steward.