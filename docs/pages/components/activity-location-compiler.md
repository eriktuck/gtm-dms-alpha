# Activity Location Data Compiler

The Activity Location Data Compiler aggregates Activity Location Data from all Activity Location Data Trackers. A script in the Data Steward Admin Tool, `compile-ald.gs`, reads data from each Activity's Tracker and saves it to the Compiler (see [here](../design/Pipelines/Activity Location Data/README.md) for full details). 

The Activity Location Data Compiler converts exact site locations (latitude and longitude) to hexagon indices using the library [H3](../knowledge/base/h3.md). These generalized locations protect stakeholders from identification while still allowing stakeholders to collaborate when working in similar geographic areas. 

The Activity Location Data Compiler also identifies the Municipality and Department in which each coordinate is located.