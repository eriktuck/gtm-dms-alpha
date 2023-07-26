# Leaflet Tutorial

**Develop a geospatial web application using Google Apps Script and Leaflet.** After completing this tutorial, you will know how to set up a web application that creates map-based data visualization using the library [Leaflet](https://leafletjs.com/examples/quick-start/) and deployed with Google Apps Script. Consider completing the [Google Apps Script Tutorial](google-apps-script-tutorial.md) first to familiarize yourself with the Google Apps Script environment.

## 1. Leaflet project set up

### 1.1 Create the project

* Navigate to [Google Apps Script](https://script.google.com/).
* Click **New Project** to create a new project. This will create a stand-alone application.
* Name the project.

### 1.2 Set up Code.gs

* Replace all existing content in the `Code.gs` file with the code shown below:

```javascript title="code.gs"
function doGet(e) {
  return HtmlService.createTemplateFromFile('map').evaluate();
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
```

### 1.3 Set up map.html

* Create a new HTML file called `map.html`.
* Include imports for both Bootstrap and Leaflet.
* Create a `div` element with the `id` "map".

```html title="map.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Leaflet Demo</title>
    <!-- Import Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <!-- Import Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
    <!-- Include custom CSS -->
    <?!= include('css'); ?> 
  </head>

  <body>
      <div id="map"></div>
  
    <!-- Import Popper (for Bootstrap) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <!-- Import Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossorigin="anonymous"></script>
    <!-- Import Leaflet -->
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
   integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
   crossorigin=""></script>
    <!--Include custom JavaScript-->
    <?!= include('JavaScript') ?>   
  </body>

</html>
```

### 1.4 Set up CSS file

* Create a new HTML file called `css.html`.
* Style the map to display with 100% of the viewport height.

```html title="css.html"
<style>
  #map { height: 100vh; }
</style>
```

* Make sure that the CSS file is included in the file `map.html` (see code above).

### 1.5 Set up JavaScript file

* Create a new HTML file called `JavaScript.html`.
* Include the code to create a map with a basemap (tile layer).

```html title="JavaScript.html"
<script>
  // create map
  var map = L.map('map', {
    center: [16, -90.8],
    zoom: 7,
    maxZoom: 20,
  });
	
  // set base map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

</script>
```

* Make sure the JavaScript file is included in the file `map.html` (see code above).

### 1.6 Deploy the app

- Save your project by clicking the **Save Project** icon or `Ctrl+s`.
- At the top right of the script project, click **Deploy > New deployment**.
- Next to "Select type," click the Settings icon and select **Web app**.
- Input "Initial Deployment" in the **Description** field. 
- Select 'Me' in the **Execute as** field.
- Select 'Only myself' in the **Who has access** field.
- Click **Deploy**.
- Click the URL of the Web app shown in the dialog box that was created to visit the app. You should see a webpage with an interactive map.
- Close the web application and return to the script files; close the dialog box if necessary.

## 2. Add Leaflet Sidebar v2

!!! note
    Leaflet is very lightweight and relies on third party [plugins](https://leafletjs.com/plugins.html) for a lot of the functionality you might want. If you have an ESRI account, you can also access additional basemaps and plugins from esri-leaflet. Some packages can be added easily via CDN. Others (which you often find on GitHub) require copy/pasting code into files within the project. For those distributed via CDN, just use the `include` syntax to include the CSS and JavaScript files.  When copying code from Github, you can either use the minified (`.min.css`) files or the full css (`.css`). Minified css is not human readable but can be smaller file sizes. If you want to see (and potentially modify) how the package works, get the full code; otherwise the minified is better. Packages like Leaflet-Sidebar-v2 and Marker Cluster will be included by copy/pasting the code into your project.

### 2.1 Copy Leaflet Sidebar v2 code into your project

* Navigate to [Leaflet-Sidebar-v2 github page](https://github.com/noerw/leaflet-sidebar-v2).
* Copy the contents from `css/leaflet-sidebar.min.css` and paste into a new file within the GAS project named `leaflet-sidebar-v2.css.html`.
* Copy the contents from `js/leaflet-sidebar.js` and paste into a new file within the GAS project named `leaflet-sidebar-v2.js.html`.

### 2.2 Include in `map.html`

* Include the CSS within the `<head>` tag using the `<?!= include ?>` syntax.

```html title="map.html"
<!-- Include Sidebar v2 --> 
<?!= include('leaflet-sidebar-v2.css') ?>
```

Include the JavaScript within the `<body>` tag using the `<?!= include ?>` syntax.

```html title="map.html"
<!-- Load Sidebar v2 -->
<?!= include('leaflet-sidebar-v2.js') ?>
```

### 2.3 Define the sidebar in `map.html`

* Add the example sidebar html from the Github README in `map.html` below the line `<div id="map"></div>`. We'll edit this later (you'll need to load Font Awesome icons for this code to work, or switch the icons to Bootstrap icons).

```html title="map.html"
<div id="sidebar" class="leaflet-sidebar collapsed">
    <!-- Nav tabs -->
    <div class="leaflet-sidebar-tabs">
        <ul role="tablist"> <!-- top aligned tabs -->
            <li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>
            <li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>
            <li><a href="#profile" role="tab"><i class="fa fa-user"></i></a></li>
        </ul>

        <ul role="tablist"> <!-- bottom aligned tabs -->
            <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
        </ul>
    </div>

    <!-- Tab panes -->
    <div class="leaflet-sidebar-content">
        <div class="leaflet-sidebar-pane" id="home">
            <h1 class="leaflet-sidebar-header">
                sidebar-v2
                <div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div>
            </h1>
            <p>A responsive sidebar for mapping libraries</p>
        </div>

        <div class="leaflet-sidebar-pane" id="messages">
            <h1 class="leaflet-sidebar-header">Messages<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
        </div>

        <div class="leaflet-sidebar-pane" id="profile">
            <h1 class="leaflet-sidebar-header">Profile<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
        </div>
    </div>
</div>
```

### 2.4 Define the sidebar in `Javascript.html`

* Add the sidebar.

```javascript title="JavaScript.html"
// create sidebar
var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);
```

* Open the sidebar once the page loads

```javascript title="JavaScript.html"
document.addEventListener('DOMContentLoaded', function(){
  // open sidebar
  sidebar.open('home');
});
```

### 2.5 Customize the CSS

I want to change the color used in the leaflet sidebar from the bright blue it is to a navy blue and use a specific font (in my case, to use Agency colors). Do do that, I first looked in the original CSS file from Leaflet Sidebar v2 to see how they styled it, and then I copy/pasted the relevant code into my local CSS file. (If you were using the full CSS file, you could simply make the change there, but this way will also work for projects you load from CDN).

* Add the following to your file `css.html`:

```css title="css.html"
.leaflet-sidebar {
  font-family: Gill Sans MT, Verdana, sans-serif;
}

.leaflet-sidebar-tabs > li.active, .leaflet-sidebar-tabs > ul > li.active {
  color: #fff;
  background-color: #002F6C; 
}

.leaflet-sidebar-header { 
  background-color: #002F6C
}
```

Because the custom CSS file loads last, any changes to the `css.html` file will override the changes in the original CSS file. 

## 3. Add and Edit Map Controls

### 3.1 Update zoom control location

You'll notice that the map has a single control, the zoom control. We enabled the zoom control when we initialized the map by setting the option `zoomControl` to `true`. 

* Move the zoom control to the right by setting the option `zoomControl` to false and adding a zoom control to the top right.

```javascript title="JavasScript.html"
// create map
var map = L.map('map', {
    center: [16, -90.8],
    zoom: 7,
    maxZoom: 20,
    zoomControl: false,  // update this line
  });

// add zoom control
L.control.zoom({position: 'topright'}).addTo(map);
```

### 3.2 Create a default extent (or home) button

A home button for the map that returns the user to the default extent. 

* Navigate to the project [defaultextent](https://github.com/nguyenning/Leaflet.defaultextent). 
* Copy the contents from `dist/leaflet.defaultextetnt.js` into a file `default-extent.js.html` in the GAS project. 

This package uses a .png file as an icon, and we'd like to instead use a Bootstrap icon. To do this, we'll modify the file `default-extent.js.html` to load an icon. 

* Find the code near the top of the file that looks like this:

```javascript title="default-extent.js.html"
L.Control.DefaultExtent = L.Control.extend({
    options: {
      position: 'topleft',
      text: 'Default Extent',
      title: 'Zoom to default extent',
      className: 'leaflet-control-defaultextent'
    }, ...
```

* Change the `text` property to the html tag for a home icon using Bootstrap icons:

```javascript title="default-extent.js.html"
L.Control.DefaultExtent = L.Control.extend({
    options: {
      position: 'topleft',
      text: '<i class="bi bi-house-fill"></i>',  // update this line
      title: 'Zoom to default extent',
      className: 'leaflet-control-defaultextent'
    }, ...
```

* Add the widget either through specifying `defaultExtentControl: true` when initializing the map or adding it after the map is intialized (which provides access to the position options).

```javascript title="JavaScript.html"
// add default extent
L.control.defaultExtent({position: 'topright'}).addTo(map);
```

## 4. Plot GeoJSON data

[GeoJSON](../base/GeoJSON.md) is a convenient file type for geospatial data that can be read by Leaflet and many other geospatial packages. Here, we'll walk through the process to host GeoJSON online, read it into our project, and plot it on the map.

!!! tip
    For this tutorial, we will use the GeoJSON file `municipalities.json` stored in the [gtm-apps](https://github.com/eanderson-ei/gtm-apps) repository on GitHub under the `data/spatial` directory. To use your own file, you may either store the GeoJSON data in an HTML file in the project within a `<script>` tag or create your own repository on GitHub. There are of course other options, use whatever works best for you.

### 4.1 Fetch GeoJSON data

* Write a function to fetch GeoJSON data from the web using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

```javascript title="JavaScript.html"
// fetch GeoJson
function fetchGeoJson(src, func){
  fetch(src, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => {
    func(json);
  })
  .catch(error => console.log(error.message));  // END FETCH
};
```

### 4.2 Map GeoJSON data

Leaflet has a helpful `geoJSON` class available for interacting with GeoJSON data. See this [Leaflet guidance](https://leafletjs.com/examples/geojson/) for a helpful walk through. The following function will plot the GeoJSON in a transparent grey outline. There are many helpful options for styling GeoJSON described in the Leaflet guidance.

* Write a function to map the GeoJSON data.

```javascript title="JavaScript.html"
// map Municipalities
function mapGeoJSON(json){
  myGeoJson = L.geoJSON(json, {
    style: function(feature) {
      return {color: 'grey', weight: 0.5, fillOpacity: 0};
    }
  }).addTo(map)
};
```

### 4.3 Bring it together

Now we can combine the two functions to fetch the data and, after the data has been fetched, map the data. 

* Add a variable to store the URL to the GeoJSON data. 
* Call the `fetchGeoJson` function with `mapGeoJSON` as a callback function within the `DOMContentLoaded` event listener. 

```javascript title="JavaScript.html"
// store municipality layer
var muniGeoJsonURL = 'https://raw.githubusercontent.com/eanderson-ei/gtm-apps/main/data/spatial/municipalities.json'

// fetch GeoJson
function fetchGeoJson(src, func){
  fetch(src, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => {
    func(json);
  })
  .catch(error => console.log(error.message));  // END FETCH
};


// map Municipalities
function mapMunicipalities(json){
  muniGeoJson = L.geoJSON(json, {
    style: function(feature) {
      return {color: 'grey', weight: 0.5, fillOpacity: 0};
    },
  }).addTo(map)
};


// load DOM
document.addEventListener('DOMContentLoaded', function(){
  
  // map municipalities
  fetchGeoJson(muniGeoJsonURL, mapMunicipalities);
});
```

You should now have a map that displays the municipalities layer on load. The next challenge, to recreate the full Map Viewer application, would be to style the municipalities layer based on data that is joined from a Google Sheet. See the [Google Apps Script Tutorial](google-apps-script-tutorial.md) to learn how to read data from a Google Sheet. The Map Viewer application has a number of complex challenges that you'll need to overcome, including joining the spatial and tabular data, creating a choropleth map, and adding a legend. Those challenges are beyond the scope of this tutorial, but you can find the full code for the Map Viewer in the [gtm-apps](https://github.com/eanderson-ei/gtm-apps) repository.

Below is the full code for this tutorial, with the exception of the third-party libraries used.

```javascript title="code.gs"
function doGet(e) {
  return HtmlService.createTemplateFromFile('map').evaluate();
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
};
```

```html title="map.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Leaflet Demo</title>
    <!-- Import Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <!-- Import Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
    <!-- Include Sidebar v2 --> 
    <?!= include('leaflet-sidebar-v2.css') ?>

    <!-- Include custom CSS -->
    <?!= include('css'); ?>
  </head>

  <body>
    <div id="map"></div>

    <div id="sidebar" class="leaflet-sidebar collapsed">
      <!-- Nav tabs -->
      <div class="leaflet-sidebar-tabs">
          <ul role="tablist"> <!-- top aligned tabs -->
              <li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>
              <li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>
              <li><a href="#profile" role="tab"><i class="fa fa-user"></i></a></li>
          </ul>

          <ul role="tablist"> <!-- bottom aligned tabs -->
              <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
          </ul>
      </div>

      <!-- Tab panes -->
      <div class="leaflet-sidebar-content">
          <div class="leaflet-sidebar-pane" id="home">
              <h1 class="leaflet-sidebar-header">
                  sidebar-v2
                  <div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div>
              </h1>
              <p>A responsive sidebar for mapping libraries</p>
          </div>

          <div class="leaflet-sidebar-pane" id="messages">
              <h1 class="leaflet-sidebar-header">Messages<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
          </div>

          <div class="leaflet-sidebar-pane" id="profile">
              <h1 class="leaflet-sidebar-header">Profile<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
          </div>
      </div>
    </div>
  
    <!-- Import Popper (for Bootstrap) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <!-- Import Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossorigin="anonymous"></script>
    <!-- Import Leaflet -->
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
   integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
   crossorigin=""></script>
    <!-- Load Sidebar v2 -->
    <?!= include('leaflet-sidebar-v2.js') ?>

    <!-- Load Default Extent (home button) -->
    <?!= include('default-extent.js') ?>

    <!--Include custom JavaScript-->
    <?!= include('JavaScript') ?> 
  </body>

</html>
```

```html title="css.html"
<style>
  #map { height: 100vh; }

  .leaflet-sidebar {
    font-family: Gill Sans MT, Verdana, sans-serif;
  }

  .leaflet-sidebar-tabs > li.active, .leaflet-sidebar-tabs > ul > li.active {
    color: #fff;
    background-color: #002F6C; 
  }


  .leaflet-sidebar-header { 
      background-color: #002F6C
  }
</style>
```

```html title="JavaScript.html"
<script>
  // store municipality layer
  var muniGeoJsonURL = 'https://raw.githubusercontent.com/eanderson-ei/gtm-apps/main/data/spatial/municipalities.json';

  // create map
  var map = L.map('map', {
      center: [16, -90.8],
      zoom: 7,
      maxZoom: 20,
      zoomControl: false,
    });

  // set base map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // add zoom control
  L.control.zoom({position: 'topright'}).addTo(map);

  // add default extent
  L.control.defaultExtent({position: 'topright'}).addTo(map);

  // create sidebar
  var sidebar = L.control.sidebar({
      autopan: false,       // whether to maintain the centered map point when opening the sidebar
      closeButton: true,    // whether t add a close button to the panes
      container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
      position: 'left',     // left or right
  }).addTo(map);


  // fetch GeoJson
  function fetchGeoJson(src, func){
    fetch(src, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      func(json);
    })
    .catch(error => console.log(error.message));  // END FETCH
  };


  // map Municipalities
  function mapMunicipalities(json){
    muniGeoJson = L.geoJSON(json, {
      style: function(feature) {
        return {color: 'grey', weight: 0.5, fillOpacity: 0};
      },
    }).addTo(map)
  };


  // load DOM
  document.addEventListener('DOMContentLoaded', function(){
    // open sidebar
    sidebar.open('home');
    // map municipalities
    fetchGeoJson(muniGeoJsonURL, mapMunicipalities);
  });

</script>
```





??? example "Additional Resources"
    - [Mapster GeoJSON | Mapping in LeafletJS YT Video](https://www.youtube.com/watch?v=dcJg24h2FdI)







