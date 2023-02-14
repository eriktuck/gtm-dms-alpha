# Set up Atlas Directory

Next you will create a copy of the Atlas directory on your Google Drive. This will copy all folders, files and templates needed to get started.

1. Create a new folder on your professional Google Drive called `Atlas`.

2. Copy the folder ID to your clipboard. The folder ID is shown in the url after `folders/` and before any question marks (`?`), like below.

		https://drive.google.com/drive/folders/{folderID}?lfhs=2

3. Open the Data Steward Admin script project (located at [script.google.com](https://script.google.com/home)).

4. In the **Editor** window, locate the file `copy-atlas.gs` and select it.

5. Update the variable `destination` with the folder id you copied to the clipboard.

		var destination = "folderID"

6. In the script editor menu bar, select the `copyAtlas` function and click **Run**.
   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_t4vssSBB3Q.png)

7. You will need to authorize the script to access Google Drive. For step-by-step instructions, see below.

??? note "Authorization Instructions"
    1. When prompted, click **Review permissions**.
       ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_miKvXsrcja.png)
    2. Choose your Google Workspace account.
    3. Google will warn that "Google hasn't verified this app". Click **Advanced** and select **Go to Data Steward Admin Tool (unsafe)**.
       ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_oEt7G5UZ7Z.png)
    4. Select **Allow**.
    ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_sVx5w2jDiG.png)
