# Digital Data Collection Options

This review of digital data collection options describes a subset of available digital data collection options potentially available to the Mission. There are many options for digital data collection and options are changing all the time.  

See also the report [Technologies for Data Collection, Processing and Communication in Education in Emergencies](https://dec.usaid.gov/dec/content/Detail_Presto.aspx?ctID=ODVhZjk4NWQtM2YyMi00YjRmLTkxNjktZTcxMjM2NDBmY2Uy&rID=NTk0NDY5&utm_medium=email&utm_source=govdelivery&vID=47).

## Digital Data Collection Tools

| Tool                                                         | Description                                                  | Pros & Cons                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Google Docs](https://www.google.com/docs/about/)            | Easy to collect narrative information. Use tables, dropdowns and checkboxes to create limited structure. Combine with Google Apps Script to automate extraction and transfer of data. | + Easy-to-use and quick to set up; best for longer narratives.<br />- Best for use informally or with trusted partners; not suitable for lots of quantitative data. |
| [Google Sheets](https://www.google.com/sheets/about/)        | Familiar tool for structured data collection. Best for quantitative and brief narrative data. Extend with Google Apps Script for custom UI elements. | + Familiar tool for quantitative data; supports batch upload via template.<br />- Can quickly become difficult to navigate; bad for qualitative data. |
| [Google Forms](https://www.google.com/forms/about/)          | A simple and intuitive survey tool integrated within Google Workspace. | + Easy-to-use and quick to set up; data connects directly to Google Sheets.<br />- Features are limited for all but the most basic surveys and data collection tasks. |
| [Kobo Toolbox](https://www.kobotoolbox.org/)                 | A full-feature survey tool built specifically for humanitarian organizations. [Now includes native support](https://nafundi.com/blog/posts/serverless-odk-deployments-with-google-apps/) for Google Drive and Google Sheets. | + Lots of question types; supports more complex surveys.<br />- Data must be manually downloaded or connected to a Google Sheet via the API. Cloud storage not permitted by Agency. |
| [Survey123](https://survey123.arcgis.com/)                   | A full-feature survey tool with geospatial data capture support integrated with ArcGIS software. | + Designed for mobile collection of geospatial data; integrates well with other ArcGIS applications like Dashboards.<br />- Less easy to integrate with Google Sheets. |
| [Fillable PDF](https://www.adobe.com/acrobat/how-to/create-fillable-pdf-forms-creator.html) | The Agency's preferred form option.                          | + Preferred by the Agency; good for record-keeping.<br />- Limited functionality; requires duplication of form for each data provider. |
| [Google Apps Script](https://developers.google.com/apps-script) | Allows for extension of Google Sheets (e.g., custom UI) and deployment of stand-alone web applications. | + Very customizable; full-featured; powerful.<br />- Requires specialized expertise to set up and manage. Does not support offline data collection. |
| [Google AppSheet](https://about.appsheet.com/home/)          | No-code app builder from Google.                             | + Easier to learn than code-based solutions. Highly flexible.<br />- Requires training to set up and maintain. |
| [Esri Web Application](https://www.esri.com/en-us/arcgis/products/arcgis-web-appbuilder/overview) | No-code app builder from Esri. See this [example](https://drive.google.com/file/d/1PFEyBju_mJD8OkDSqHGxxN-sQAsqofQi/view). | + Customizable no-code framework for web app development.<br />- Requires specialized expertise to set up and manage. |
| [MAX Survey](https://portal.max.gov/home/sa/userHome)        | Powerful survey platform that allows token-based access control (enables tracking of responses and personalized follow up emails). | + Full-featured and themable.<br />- Requires manual download of data; poor survey development experience. |
| [MAGE](https://github.com/ngageoint/mage-server)             | The Mobile Awareness GEOINT Environment is a platform for collecting mobile geospatial data in which custom forms can be created. | + Easy to add new forms, good for geospatial data.<br />- Requires support from the MAGE team for most customization or data export. |

## Evaluating options

The right solution may in fact be a combination of multiple softwares–-when considered together, the suite of software representing the right solution must include these components:

1. **Development Environment:** how will you build the data collection templates or forms? Is it easy to use and commonly understood or does it require special expertise?
2. **User Interface:** how will the intended users interact with the form or template? Does it require a license or is it freely available? How user-friendly is the interface?
3. **Data Store:** where will data be stored? Is the data store reliable, internally consistent, and accessible to those who need it?
4. **Dashboard/Visualization:** how will data be aggregated, visualized, and otherwise made useful to those who need it?

### Evaluation Criteria

What constitutes a good software solution? We suggest the following are the most important criteria for evaluating potential solutions:

- **Is it accessible to the Mission?** The solution should be accessible to the Mission based on cost relative to funding available and considering Agency software approval requirements. 
- **Does it support the necessary features?** The right solution will have all of the features required while limiting unnecessary bloat. See *Recommended Features* below. 
- **Is it easy to set up and adapt?** Frequent changes to reporting requirements necessitate a solution that can be set up and adapted easily.
- **How well does it integrate with existing workflows?** The solution should integrate with existing workflows, including data collection, quality assurance and clearance, rather than require new workflows to the extent possible.
- **Is it compatible with existing partner data collection methods?** Ideally, the selected data collection method would work well with existing systems and avoid any duplication of efforts for partners. (see Box 1 below). Further, it must be within the bounds of what can be reasonably required of partners. 
- **Consistent with the long-term vision for Atlas?** Will this solution be “one more tool” for staff and partners to learn or is it worth investing in because it can be reused for multiple purposes?

!!! note - Digital Data Collection by Partners
    A [draft report](https://docs.google.com/document/d/1RFqepfVb5O-22gNa-HMDkbh7IivsvTD1/edit) by DDI/ITR reviewed the use of Digital Data Collection tools by partners and found "the prevalence of organizational use of digital tools for M&E data collection on projects varies significantly among partners: several report that all or "close to all" projects use digital data collection, while others note that less than half do." Further, the education and health sectors were found to commonly use the Digital Data Collection tools [Tangerine](https://www.rti.org/impact/tangerine-mobile-learning-assessments-made-easy) and [DHIS2](https://dhis2.org/). Others, including Feed the Future (FTF), are already utilizing DIS.

### Recommended Features

Software with these recommended features will provide a better user experience, increase flexibility, ensure data quality, and reduce data risk. While the preferred solution may not include all of these features, the more features available–all other things being equal–the better.

#### Usability

* **Conditional flow:** can questions be skipped (or added) based on previous responses?
* **Cascading dropdowns:** can options within one select dropdown be informed by the selection from another (e.g., only show municipalities within the department selected)?
* **Repeatable question groups:** can respondents repeat a section multiple times?
* **Editing**: can the user edit (update/delete) previous entries?
* **In-form validation (client-side):** does the form validate user responses before submission?
* **Post-submission validation (server-side):** does the form validate user responses after submission (allows for more complex validation logic)?
* **Maps**: while not necessary for all applications, a tool with geographic data support might be preferred to one without.

#### Data formats accepted

* **Supports unstructured data:** can both qualitative and quantitative data be entered?
* **File upload**: allows users to upload files (e.g., supporting documentation)?
* **Batch upload**: allows users to batch upload data rather than input one-by-one?

#### Data risk

* **Access control**: can restrict access or require login?
* **Partitioning**: data are only available to stakeholders who should see it?
* **Secure storage:** data are stored securely with no risk of disclosing PII or SBU?

#### Accessibility

* **Language support**: questions can be asked in English and local languages?
* **ADA**: Application is accessible to all in accordance with accessibility policy?

A review of each digital data collection option relative to these features is available [here](https://docs.google.com/spreadsheets/d/1rKYg5O653ntaLKT6eXrpN2j8Bcwh5toBN4PSns3NqKg/edit#gid=0).

