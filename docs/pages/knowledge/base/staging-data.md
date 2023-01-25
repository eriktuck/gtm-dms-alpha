# Staging Data

Staging data in an intermediate Google Sheet is best practice when piping data from a source with sensitive data to a public source. This prevents bad actors from accessing data by manipulating an [`IMPORTRANGE`](importrange.md) function.

1. Create a new Google Sheet
2. Use a combination of `QUERY` and `IMPORTRANGE` to import only non-sensitive data (see guidance [here](importrange.md#using-a-query)).
3. Use `IMPORTRANGE` from the new Google Sheet to the public source.