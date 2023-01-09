The Mission Data Management System (MDMS) serves as the single-source of truth for the Mission. 

The MDMS leverages Google Workplace tools like Google Sheets to create an integrated solution for data collection and management. Team Members and Implementing Partners continue to use the tools they know while the MDMS works in the background to bring everything together. All data continues to be stored on Google Drive.

Custom-built web applications like the Activity Database and Data Catalog make data discoverable to those who need it, when they need it. Web applications are built on Google's Apps Script platform, a cloud-based JavaScript platform that integrates with and automates tasks across Google products. Custom-built applications can be developed and deployed easily with all of your data in one place. Applications may also be built with Tableau, Esri products or any other platform (subject to license availability).

The Mission Database, built on the powerful and open source PostgreSQL, aggregates all data together for rapid query and analysis. Data are piped into the Mission Database using semi-automated data pipelines managed and maintained by the Data Steward. Basic geospatial analysis is supported and, optionally, the free and open source QGIS is available for more advanced geospatial visualization and analysis.


<!-- The **Data Steward** manages and maintains the MDMS. When needed, the **Data Steward** queries the MDMS to respond to data requests from **A/CORs** and other stakeholders. 

**Implementing Partners** submit data to the MDMS according to the requirements of their *Data Management Plan (DMP)*. The **A/COR** coordinates with the **Implementing Partner** during *Activity Start Up* to develop a suitable DMP. 

**Implementing Partners** also submit data to Agency Systems, including the Development Experience Clearinghouse (DEC), Development Data Library (DDL), and Development Information System (DIS). 

The MDMS prefers using Agency Systems whenever possible and especially if required. However, Agency Systems are not designed to meet all of the requirements of a Mission. Therefore, the **Data Steward** integrates data from Agency Systems. Whenever possible, **Implementing Partners** are not required to submit data to both systems. -->