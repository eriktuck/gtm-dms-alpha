# Onboard an Activity

!!! tip
    Before onboarding an Activity to Atlas, ensure that the Activity contract includes the required provisions. If the Mission does not yet have standard Solicitation and Award Language that meets the requirements of Atlas, see the Playbook for guidance on [creating the enabling conditions](../knowledge/playbook/enabling-conditions.md) for successful roll out of Atlas with partners. Avoid "voluntary" data requests, as even voluntary requests can create undue burden on partners.  **Always include the A/COR in communications with partners.**

Each Activity should be onboarded to Atlas during initial start up. Ideally, the Data Steward will coordinate with the Technical Team as early as Activity Design.

Onboarding an Activity to Atlas will simplify the reporting process and ensure Activity documentation, Intellectual Works and the data behind them are accessible to the Data Steward and thus the Mission. More importantly, onboarding an Activity is an opportunity to engage with Technical Team and partners to help them manage data as an asset and use data responsibly.

### Set up the Activity Folder

After [inputting the Activity in the **Activity Database**](update-activitydb.md), create the Activity Folder using the **Activity Folder Template** in Atlas.

1. Create a new folder the Atlas `Activity Folders/` directory. Use the naming convention `1234 - Activity Name`, replacing `1234` with the Activity ID from the **Activity Database** and the `Activity Name` with the Activity's short name.
2. Using the `copy-folder` script in the [Data Steward Admin Tool](../components/data-steward-admin.md) (located at [script.google.com](https://script.google.com/home)), run the `runCopyFolderFunction` to copy the contents of the Activity Folder Template to the newly created Activity folder. Update the `source` variable within the function to the folder ID of the Activity Folder template (*Admin > Modules > Activity Folder [template]*). Update the `destination` variable to the folder ID of the newly created Activity folder in the `Activity Folders/` directory.
3. Update the Activity Database with the link to the Activity Folder.
4. Log the links to the Activity Folder and Activity Location Data Tracker in the Atlas **Data Inventory.**

### Activity Post-Award Conference

The Activity Post-Award Conference is an important opportunity to introduce the partner to the data collection templates and reporting process of Atlas. We recommend including a representative of the MEL team to discuss all aspects of data collection, management and reporting. 

During this conference, the Data Steward will

* Review the components of the Data Management Plan and its role in relation to the Activity Monitoring, Evaluation and Learning Plan (AMELP)
* Review the Mission's Data Standards
* Introduce the partner to the Activity Folder and its contents
* Workshop with the partner to develop a rough Data Inventory
* Determine the appropriate level of geographic detail for Activity Location Data

### Ongoing Support

The Data Steward will provide ad-hoc support to partners during the lifetime of the Activity as needed. Additionally, the Data Steward will cultivate opportunities for partners to learn best practices and collaborate with other partners.
