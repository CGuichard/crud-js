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
[Report Bug](https://github.com/CGuichard/crud-js/issues/new?template=bug_report.md) ·
[Request Feature](https://github.com/CGuichard/crud-js/issues/new?template=feature_request.md)

</div>



## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [For use](#for-use)
    - [Prerequisites](#prerequisites-for-use)
    - [Installation](#installation-for-use)
  * [Demo](#demo)
    - [Prerequisites](#prerequisites-demo)
    - [Installation](#installation-demo)
* [Usage](#usage)
* [Contributing](#contributing)
* [Workflows/CI](#workflows-ci)
* [Versioning](#versioning)
* [Authors](#authors)
* [License](#license)



## <a name="about-the-project"></a> About The Project

Data editing is a very common feature in current software. Nowadays software is designed and used to replace the data entry which was done previously by spreadsheets. CrudJS offers a front-end data editing table as a replacement for such tools. Then, you must write the back-end following the specifications given in the [Usage](#usage) section.

### <a name="built-with"></a> Built With

This point is **really important**, CrudJS is built to be used in web pages including the following front-end dependencies:
* [Font Awesome](https://fontawesome.com/)
* [Bootstrap Material Design](https://fezvrasta.github.io/bootstrap-material-design/)
* [Popper](https://popper.js.org/)
* [JQuery](https://jquery.com/)



## <a name="getting-started"></a> Getting Started

CrudJS is delivered as a minified javascript file. The only thing you need to use it is the file **crudjs.min.js** (or **crudjs.js** if you want the source file).

_Note: **crudjs.js** is neither minified nor babelified, browser compatibility is therefore not guaranteed._

You can check the [For use](#for-use) section to get CrudJS and use it in your web page. You can also clone this project locally to run the demo right after completing the steps aimed for [demo usage](#demo).

### <a name="for-use"></a> For use

#### <a name="prerequisites-for-use"></a> Prerequisites

The dependencies specified in [Built With](#built-with) are necessary for the web page where you will use CrudJS. You can refer to **static/package.json** to know more about their version used in the demo.

#### <a name="installation-for-use"></a> Installation

There are multiple ways to get CrudJS on your page.

###### <a name="installation-for-use-local-file"></a> Local file

- You can download it, by cloning the project:

  1. Clone the project, or get the [zip](https://github.com/CGuichard/crud-js/archive/master.zip).
  ```sh
  git clone https://github.com/CGuichard/crud-js.git
  ```

  2. Meet the [prerequisites](#prerequisites-demo) of the demo.

  3. Run:
  ```sh
  npm start && npm run build:dist
  ```

  4. Take **crudjs.min.js** (or **crudjs.js**) in **dist** folder.

  5. Include it in your page:
  ```html
  <script src="/path/to/the/file/crudjs.min.js"></script>
  ```

- Download a release.

  1. Download the [release](https://github.com/CGuichard/crud-js/releases) you want.

  2. Take **crudjs.min.js** (or **crudjs.js**) in **dist** folder of the release.

  3. Include it in your page:
  ```html
  <script src="/path/to/the/file/crudjs.min.js"></script>
  ```

###### <a name="installation-for-use-local-file"></a> CDN

- **[Release]** Add the following link and replace _:version_ with the version you want to use (example: 'v0', 'v0.0.1', etc... versions are [here](https://github.com/CGuichard/crud-js/tags)):
  ```html
  <script src="https://raw.githack.com/CGuichard/crud-js/:version/dist/crudjs.min.js"></script>
  ```

- **[Latest]** Add the following link to get the latest version built from master:
  ```html
  <script src="https://raw.githack.com/CGuichard/crud-js/latest/dist/crudjs.min.js"></script>
  ```

###### <a name="installation-for-use-local-file"></a> Experimental

Option for **contributor** use.
On the push for dev branch and issue-* branches an artifact is in the [actions](https://github.com/CGuichard/crud-js/actions) of the project with the action '**CrudJS Build Dist**'. You can retrieve the dist folder in the artifact section of the branch that you want.

### <a name="demo"></a> Demo

#### <a name="prerequisites-demo"></a> Prerequisites

You'll need two things:
* Node.js - Install in [command line](https://nodejs.org/en/download/package-manager/) or [download](https://nodejs.org/en/download/).

* npm - installed automatically with Node.js. Upgrade:
```sh
npm install npm@latest -g
```

Another article to install Node.js and npm [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

#### <a name="installation-demo"></a> Installation

1. Clone the repository, or get the [zip](https://github.com/CGuichard/crud-js/archive/master.zip).
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

If you did the complete installation process to run the demo you can check it at [/demo](/demo). To understand how to use CrudJS I highly recommend taking a look at the demo.

### Default configuration

The web component **crud-js** is simple to use on your page. You can use it in two ways:

* **Ready-only**: Display a simple table that you cannot edit. Only the GET method is necessary.
```html
<crud-js url="/data/url"></crud-js>
```

* **Editable**: Display an editable table. Need both GET and POST methods.
```html
<crud-js url="/data/url" save-button="my-save-btn"></crud-js>
```

The _url_ attribute defines the URL at which the data are retrieved and updated. For editable CRUD you need to create a save button with an id specified in the _save-button_ attribute of the **crud-js** component.

To get it work checkout the back-end communication.

### Languages

It is possible to use another language. Supported languages are:
- **en** - English
- **fr** - French

Add it with the attribute **lang**:
```html
<crud-js lang="fr" url="/data/url" save-button="my-save-btn"></crud-js>
```

### Back-end communication

To use CrudJS you will have to define a URL in your back-end server. The method HTTP GET on it will retrieve the data as a JSON in a specific format. All modifications saved in the CRUD will be sent to the same URL as HTTP POST request in another specific format.

The formats of the requests (GET and POST) is as follow:

* **(GET)** Data retrieving format example:
```JSON
{
    "columns": [
        {
            "name": "Name",
            "type": "text",
            "options": {}
        },
        {
            "name": "Age",
            "type": "int",
            "options": {}
        },
        {
            "name": "Gender",
            "type": "select",
            "options": {
                "values": ["Men", "Women", "Other"]
            }
        },
        {
            "name": "Busy day",
            "type": "select-chips",
            "options": {
                "values": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
        }
    ],
    "values": [
        ["Thăng Long", 21, "Men", ["Monday", "Tuesday", "Wednesday"]],
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
                ["Jeanne", 27, "Women", ["Thursday", "Friday"]],
                ["Thăng Long", 21, "Men", ["Monday", "Tuesday", "Wednesday"]]
            ]
        }
    ]
}
```
As you can see, the update request is in three-part. The _old\_values_ field always contains data at the state they were received by the CRUD or their state at the last successful save. Details:

  - **NEW**: New values are stored in the _new\_values_ field.

  - **MODIFIED**: Old values are in the _old\_values_ field and new values in the _new\_values_ one.

  - **DELETED**: Values deleted are in the _old\_values_ field.

The order of the array makes it so for the **MODIFIED** case an element of index _i_ in _old\_values_ is at the identical index in _new\_values_, such as _old\_values[i]_ is the former state of the data at _new\_values[i]_.

This operation expects a specific response, whose content is the one sent, but with an additional field:
```JSON
{
    "actions": [
        {
            "request": "NEW",
            "new_values": [
                ["Clément", 21, "Men", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]]
            ],
            "result": [
                ["OK"]
            ]
        },
        {
            "request": "MODIFIED",
            "old_values": [
                ["Super Cookie", 1, "Other", []]
            ],
            "new_values": [
                ["Super Cookie 2", 2, "Other", []]
            ],
            "result": [
                ["OK"]
            ]
        },
        {
            "request": "DELETED",
            "old_values": [
                ["Jeanne", 27, "Women", ["Thursday", "Friday"]],
                ["Thăng Long", 21, "Men", ["Monday", "Tuesday", "Wednesday"]]
            ],
            "result": [
                ["OK"],
                ["ERROR", "Could not delete Thăng Long. He's a good guy."]
            ]
        }
    ]
}
```

In each action, a field _result_ appeared just like previously, each item of the _result_ field described for each item in _old\_values_ (or/and _new\_values_) at the same index the response of the back-end. There are two possible values for the _result_ items:

- `["OK"]`: If the operation succeeded.
- `["ERROR", errorText]`: If the operation failed. The variable `errorText` is a string detailing the error.

### Add examples

// TODO

### Validators

// TODO

### Custom fields

// TODO

### CSRF token

// TODO


## <a name="contributing"></a> Contributing

If you want to contribute to this project or understand how it works, please check [CONTRIBUTING.md](CONTRIBUTING.md).

Any contributions you make are **greatly appreciated**.



## <a name="workflows-ci"></a> Workflows/CI

We're working to adopt continuous integration with [GitHub Actions](https://github.com/features/actions). We are currently using the following workflows:

- **Release CI**: Deploys the release on a specific branch (example: "release/v1") on tag push.

- **Issue CI**: Creates the corresponding branch on issue creation.

- **Build CI**:

  - master[on push]: build dist & push it on branch named "latest" ; build docs & push it on branch named "gh-pages".

  - dev[on push]: build dist & save as artifact named "dist".



## <a name="versioning"></a> Versioning

[Git]((https://git-scm.com/)) is the VCS (Version Control System) used for versioning this project. The project is hosted on [GitHub](https://github.com/).



## <a name="authors"></a> Authors

* **Clément GUICHARD** - *Maintainer* - clement.guichard0@gmail.com ([GitHub](https://github.com/CGuichard))

See also the list of contributors who participated in this project in [CONTRIBUTING.md](CONTRIBUTING.md).



## <a name="license"></a> License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
