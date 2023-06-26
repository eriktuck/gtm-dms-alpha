# Atlas Distribution Folder

The Atlas Distribution Folder allows new users of Atlas to quickly set up the components stored in Google Drive. A script in the Data Steward Admin Tool (`copy_folder.gs`) includes a function to copy all files and folders into the user's own directory (`copyAtlas`), see setup instructions [here](../get-started/setup/setup-drive.md). 

Scripts are copied into the user's root Google Drive folder and are most easily accessed at [https://script.google.com/home](https://script.google.com/home).

The directory has the following structure:

```bash
Atlas Distro/
+-- Modules/
    +-- Thematic Data/
        +-- Internal/
            +-- raw/
            +-- SENSITIVE/
            +-- Reports/
            +-- Spatial/
            +-- Tabular/
            +-- internal - Data Catalog.gsheet
            +-- README.gdoc
        +-- Shared Externally/
            +-- Reports/
            +-- Spatial/
            +-- Tabular/
            +-- Data Catalog.gsheet
    +-- Activity Database/
        +-- Activity Database.gsheet
        +-- FormGen.gsheet
        +-- TableGen.gsheet
        +-- adb_stage.gsheet
    +-- Activity Location Data/
        +-- Activity Location Data Compiler.gsheet
        +-- Activity Location Data (Public).gsheet
        +-- ALD Inventory.gsheet
        +-- ald_stage.gsheet
    +-- Performance Measures/ 
        +-- // Contents TBD
    +-- Activity Folder [Template]/
        +-- datasets/
        +-- Activity MECLA Plan DMP.gdoc
        +-- Activity Data Inventory.gsheet
        +-- Activity Location Data Tracker vX.x.gsheet
        +-- Activity PM Tracker.gsheet // TBD
+-- Admin/
    +-- SQL/
    +-- tmp/
+-- Atlas Data Inventory.gsheet
+-- README.gdoc
```

