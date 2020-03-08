<div align="center">

<h1 style="margin-bottom:30px;">
    <a href="https://github.com/CGuichard/crud-js">
        <img src="/static/images/crud-js-icon.png" alt="CrudJS logo" width="250"/>
    </a>
</h1>

**A simple Javascript CRUD Web Component for editing data**

![Version](https://img.shields.io/github/package-json/v/CGuichard/crud-js?color=blueviolet&style=flat-square)
![Stargazers](https://img.shields.io/github/stars/CGuichard/crud-js?color=informational&style=flat-square)
[![Contributors](https://img.shields.io/github/contributors/CGuichard/crud-js?color=informational&style=flat-square)](https://github.com/CGuichard/crud-js/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/CGuichard/crud-js?color=informational&style=flat-square)](https://github.com/CGuichard/crud-js/issues)
![Stability](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square)
[![Last commit](https://img.shields.io/github/last-commit/CGuichard/crud-js?color=success&style=flat-square)](https://github.com/CGuichard/crud-js/commits/master)
[![MIT License](https://img.shields.io/github/license/CGuichard/crud-js?color=success&style=flat-square)](https://github.com/CGuichard/crud-js/blob/master/LICENSE)

[Pull Request](https://github.com/CGuichard/crud-js/pulls) ·
[Report Bug](https://github.com/CGuichard/crud-js/issues) ·
[Request Feature](https://github.com/CGuichard/crud-js/issues)

</div>



## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
    - [Usage](#prerequisites-usage)
    - [Demo](#prerequisites-demo)
  * [Installation](#installation)
    - [Usage](#installation-usage)
    - [Demo](#installation-demo)
* [Usage](#usage)
* [Contributing](#contributing)
* [Versioning](#versioning)
* [Authors](#authors)
* [License](#license)



## <a name="about-the-project"></a> About The Project

Data editing is a very common feature in current software. Nowadays software is designed and used to replace the data entry which was done previously by spreadsheets.

CrudJS offers a front-end data editing table as a replacement for such tools. Then, you must write the back-end following the specifications given in the [Usage](#usage) section.

### <a name="built-with"></a> Built With

This point is **really important**, CrudJS is built to be used in web pages including the following front-end dependencies:
* [Font Awesome](https://fontawesome.com/)
* [Bootstrap Material Design](https://fezvrasta.github.io/bootstrap-material-design/)
* [Popper](https://popper.js.org/)
* [JQuery](https://jquery.com/)



## <a name="getting-started"></a> Getting Started

CrudJS is delivered as a minified javascript file. The only thing you need to use it is the file **crudjs.min.js** which you can find in the **dist** folder.

You can clone this project locally to run index.js and check the demo. The following steps are there to show you how to do it.

### <a name="prerequisites"></a> Prerequisites

#### <a name="prerequisites-usage"></a> Usage

The dependencies specified in [Built With](#built-with) are necessary for the web page where you will use CrudJS. You can refer to **static/package.json** to know more about their version used in the demo.

#### <a name="prerequisites-demo"></a> Demo

You'll need two things:
* Node.js - Check [here](https://nodejs.org/en/download/package-manager/) how to install in command line. Download [here](https://nodejs.org/en/download/).

* npm - installed automatically with Node.js. Upgrade:
```sh
npm install npm@latest -g
```

Another article to install Node.js and npm [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### <a name="installation"></a> Installation

#### <a name="installation-usage"></a> Usage

1. Get **crudjs.min.js** in the clone of the project, or the [zip](https://github.com/CGuichard/crud-js/archive/master.zip).
```sh
git clone https://github.com/CGuichard/crud-js.git
```

2. Put it in your page as src of script tag.
```html
<script src="/path/to/the/file/crudjs.min.js"></script>
```

3. Done. You can now use CrudJS on your page.

#### <a name="installation-demo"></a> Demo

1. Clone the repository.
```sh
git clone https://github.com/CGuichard/crud-js.git
```

2. Install dependencies.
```sh
npm start
```

3. Run **index.js**.
```sh
node index.js
```



## <a name="usage"></a> Usage

If you did the complete installation process to run the demo you can check it at http://localhost:5000/demo. To understand how to use CrudJS I highly recommend taking a look at the demo.

To use CrudJS you will have to define a URL in your back-end server. The method HTTP GET on it will retrieve the data as a JSON in a specific format. All modifications saved in the CRUD will be sent to the same URL as HTTP POST request in another specific format.

The web component **crud-js** is simple to use on your page. You can use it in two ways:

* **Ready-only**: Display a simple table that you cannot edit. Only the GET method is necessary.
```html
<crud-js url="/data/url"></crud-js>
```

* **Editable**: Display an editable table. Need both GET and POST methods.
```html
<crud-js url="/data/url" save-button="my-save-btn" editable></crud-js>
```

The _url_ attribute defines the URL at which the data are retrieved and updated. For editable CRUD you need to precise _editable_ and create a save button with an id specified in the _save-button_ attribute of the **crud-js** component.

The formats of the requests (GET and POST) is as follow:

* **(GET)** Data retrieving format example:
```JSON
{
    "columns": [
        {
            "name":"Name",
            "type":"text",
            "options": {}
        },
        {
            "name":"Age",
            "type":"int",
            "options": {}
        },
        {
            "name":"Gender",
            "type":"select",
            "options": {
                "values": ["Men", "Women", "Other"]
            }
        },
        {
            "name":"Busy day",
            "type":"select-chips",
            "options": {
                "values": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
        }
    ],
    "values": [
        ["Giovanni", 41, "Men", ["Monday", "Tuesday", "Wednesday"]],
        ["Jeanne", 27, "Women", ["Thursday", "Friday"]],
        ["Super Cookie", 1, "Other", []]
    ]
}
```
As you can see, the json is in two part. First it describ the columns of the resulting table, and after that the values for each line of data. Available field types now are: text, int, select, select-chips.

* **(POST)** Data update format example:
```JSON
{
    "actions": [
        {
          "request": "NEW",
          "new_values": [
              ["Clément", 21, "Men", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]]
          ]
        },
        {
          "request": "MODIFIED",
          "old_values": [
              ["Super Cookie", 1, "Other", []]
          ],
          "new_values": [
              ["Super Cookie 2", 2, "Other", []]
          ]
        },
        {
          "request": "DELETED",
          "old_values": [
              ["Jeanne", 27, "Women", ["Thursday", "Friday"]]
          ]
        }
    ]
}
```
As you can see, the update request is in three-part. The old_values field always contains data at the state they were received by the CRUD or their state at the last successful save. Details:

  - **NEW**: New values are stored in the new_values field.

  - **MODIFIED**: Old values are in the old_values field and new values in the new_values one.

  - **DELETED**: Values deleted are in the old_values field.



## <a name="contributing"></a> Contributing

If you want to contribute to this project or understand how it works, please check [CONTRIBUTING.md](CONTRIBUTING.md).

Any contributions you make are **greatly appreciated**.



## <a name="versioning"></a> Versioning

[Git]((https://git-scm.com/)) is the VCS (Version Control System) used for versioning this project. The project is hosted on [GitHub](https://github.com/).



## <a name="authors"></a> Authors

* **Clément GUICHARD** - *Maintainer* - clement.guichard0@gmail.com ([GitHub](https://github.com/CGuichard))

See also the list of contributors who participated in this project in [CONTRIBUTING.md](CONTRIBUTING.md).



## <a name="license"></a> License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
