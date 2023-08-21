# Copy Data Steward Admin Tool

!!! tip
    Atlas is currently growing and many new features are available. To ensure you get the latest version, contact erianderson@usaid.gov before setting up Atlas.

Before you begin, make sure you are logged into your work-issued Google Workspace account where the Atlas project will be stored.

1. Follow this [link](https://script.google.com/d/1WrrdjjEfdI3tT5QD1obSuMtiJRTbGZ_U3-RonWcfF4Ft_K6ZnYC0tozi/edit?usp=sharing) to access the Data Steward Admin Tool.

2. In the **Overview** window (see the left sidebar), click **Make a Copy**. 
   ![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_q0QiNe3nSW.png)

3. The script project will be copied to your repository on [script.google.com](https://script.google.com/home) as `Copy of Data Steward Admin`. 

4. Rename the project to `Data Steward Admin`.

5. Close the original Data Steward Admin project.

6. Open the **Triggers** window (see left sidebar).

7. Click **Add Trigger** to add a new trigger. Select the function `update_compiler` to run the `Head` deployment as a `Time-driven`, `Day timer` run overnight. Select `Notify me daily` in the event of a failure. Click **Save**.

   

![img](https://storage.googleapis.com/ei-dev-assets/assets/chrome_qkcp0qdnHN.png)
