# Copy Atlas Directory

Next you will create a copy of the Atlas directory on your Google Drive. This will copy all folders, files and templates needed to get started.

1. Create a new folder on your work-issued Google Drive or Shared Drive called `Atlas`.

2. Copy the folder ID to your clipboard. The folder ID is shown in the URL after `folders/` and before any question marks (`?`), like below.

   	https://drive.google.com/drive/folders/{folderID}?lfhs=2

3. Open your copy of the [Data Steward Admin Tool](../../components/data-steward-admin.md) (located at [script.google.com](https://script.google.com/home)).

4. In the **Editor** window, locate the file `copy-folder.gs` and select it.

5. Update the variable `destination` with the folder id you copied to the clipboard.

   	let destination = "{folderID}";

6. Save the script project (`Ctrl + S`)

7. In the script editor menu bar, select the `copyAtlas` function.
   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_t4vssSBB3Q.png)

8. Click **Run**.

9. You will need to authorize the script to access Google Drive. For step-by-step instructions, see [here](authorize-apps-script.md).
