* How to include an iframe in MyUSAID

```
<iframe src="https://script.google.com/macros/s/AKfycbzvFdhxVga418XnmqPbhwWtYBFzPzyUatDuJzjmr2SuzR-gIowI6ZyEMdYahwlAY4I/exec" style="width:100%; height:600px" title="Search"></iframe>
```

* Activities must be added to the Activity Database AND the DIS before their Activity Location Data can be added to the Mission Database. Typically, collection of Activity Location Data won't begin for 3 - 6 months after award so this shouldn't be an issue. To change this behavior, remove the foreign key constraint created by the Data Steward Admin tool from the `exact_site_locations` and `admin_unit_areas` tables to the DIS Activity ID. 
