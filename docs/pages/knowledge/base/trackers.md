# Trackers

Trackers are a necessary part of how we work. When a new information need arises, we often develop a new tracker to meet this need. This guidance will help you develop a tracker that meets your information needs using best practices that will save time and create a trustworthy data source.

Not all trackers require the same level of complexity. This guide provides best practices for basic, intermediate and advanced trackers.

- **[Basic](#basic):** if you are developing a simple tracker for short-term use within a small team, use best practices for basic trackers.
- **[Intermediate](#intermediate):** intermediate level trackers are intended for long-term use and/or to request data from other teams.
- **[Advanced](#advanced):** an advanced tracker will be used by many users for many years because it fulfills a central information need for the Mission. 

## Basic

Basic trackers are intended for short-term use and rarely for external data collection. These should be quick to build once you know your information needs. A few best practices include:

**Use one data type per column:** each column should contain only one data type. For example, if you are collecting a date, only allow dates in this column. Don’t allow a date range or a note about how dates don’t make sense for this record. Use data validation rules to reject incorrect data types.

!!! tip
    Use dropdown validation whenever possible.

**Use separators that can be split:** In some cases, you may need to put multiple values in a single cell (e.g., a list of relevant geographies). You should be able to use a [`SPLIT`](https://support.google.com/docs/answer/3094136?hl=en) function to split the cell into multiple cells, each with one entry, by using a separator such as a pipe (“|”). 

**Use existing standards for common data types:** if you’re collecting data on a common data type, use appropriate [Mission Data Standards](../../components/data-standards.md) for that field. 

**Use consistent #N/A values:** use a consistent #N/A value. The default choice for Google Sheets is “#N/A”. It’s best practice to not leave any fields blank.

**Name all tabs:** provide a clear concise name for each tab. Never leave a tab with the default tab names. Follow the Atlas [naming conventions](naming-conventions.md).

**Delete unused tabs:** delete any tabs that are not used.

**Delete unused columns:** delete any blank columns to the right of your dataset.

## Intermediate

Intermediate trackers should follow all of the best practices for Basic trackers and these additional best practices which will promote interoperability with other Mission systems and reduce human automation.

**Import from related systems:** instead of manually copying and pasting a column from another tracker, use the [`IMPORTRANGE`](https://support.google.com/docs/answer/3093340?hl=en) function to automatically pull data. This will ensure that your data does not become stale. Be careful, the imported data will change when it changes in the data source, and your tracker must be able to adjust. Use a dropdown field to select from the imported data.

**Create a push query:** to share data with other trackers, create one or more `export` sheets that others can use to import data from your tracker. Data should meet the criteria for Tidy data at least, and ideally for Normal data as well.

**Use Google Sheet naming conventions:** use these [naming conventions](naming-conventions.md) for sheet names and column names so that the tracker can be read into the Mission Database.

!!! note
    **Human automation** is when humans spend time doing work that a computer could do, such as manually transferring data from one source to the next. We’re busy enough already! Let’s let computers do the boring stuff. Did you know that the cost of human automation increases exponentially with each new tracker that stores the same information as another tracker?

## Advanced

Trackers intended for long-term use or use by many stakeholders should be well designed, have user friendly interfaces, and be integrated in well-defined business processes. 

**Split entry, storage and visualization:** advanced trackers often need to support easy data entry, efficient storage, and provide tables and charts to visualize data in different ways. It’s very difficult to do all of these things well in one place. For advanced trackers, consider using a Google form for data input or developing custom user interfaces using Google Apps Script.

**Keep it focused:** advanced trackers can grow quickly. Do your best to keep the number of tabs limited and keep the tracker focused on its intended purpose and audience.

**Back it up:** regularly back up the data by downloading a copy of the file or using a scheduled Google Apps Script. Don’t back the data up into separate tabs in the same Worksheet.

**Support users:** with many users, you should provide regular training, listen for feedback, and continuously improve the tracker.
