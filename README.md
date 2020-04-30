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
  <script src="https://raw.githack.com/cguichard/crud-js/:version/dist/crudjs.min.js"></script>
  ```

- **[Latest]** Add the following link to get the latest version built from master:
  ```html
  <script src="https://raw.githack.com/cguichard/crud-js/latest/dist/crudjs.min.js"></script>
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
As you can see, the json is in two part. First it describ the columns of the resulting table, and after that the values for each line of data. Available field types are described in another section below.

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

### General options

#### Languages

It is possible to use another language than english. Supported languages are:
- **en** - English
- **fr** - French

Add it with the attribute **lang**:
```html
<crud-js lang="fr" url="/data/url" save-button="my-save-btn"></crud-js>
```
If there's no **lang** attribute, then CrudJS will take the lang of the document specified in the **html** tag.

#### Filters

You can use a text input to filter your CRUD with the **filter** attribute pointing to the input id:
```html
<input id="my-filter" type="text" placeholder="Filter">
<crud-js lang="fr" url="/data/url" save-button="my-save-btn" filter="my-filter"></crud-js>
```
If you want to connect multiple filters you can use **filters** attribute and html class:
```html
<input class="my-filters" type="text" placeholder="Filter 1">
<input class="my-filters" type="text" placeholder="Filter 2">
<crud-js lang="fr" url="/data/url" save-button="my-save-btn" filters="my-filters"></crud-js>
```
All columns are filtered, and the ones that don't match are hidden.

#### Custom delete message

You can add a custom delete message for your CRUD. Add it in options of the **GET** JSON:
```JSON
{
    "columns": [  ],
    "values": [  ],
    "options": {
        "deleteMessage": "Your custom delete message that will appear in the delete modal."
    }
}
```

#### Examples

Sometimes examples are great to explain what is possible. You can add examples by modifying the options of the **GET** JSON:
```JSON
{
    "columns": [  ],
    "values": [  ],
    "options": {
        "examples": [
            ["Example", "example@example.com", 1, "Other", ["Tuesday"]],
            ["AnotherExample", "another-example@example.com", 2, "Other", ["Monday", "Tuesday"]]
        ]
    }
}
```
The examples must follow the same structure than the values (which format correspond to the columns given).

### Fields

#### Default fields

Available fields:
- int:
```JSON
{
    "columns": [
        {
            "name": "Integer field",
            "type": "int",
            "options": {}
        }
    ],
    "values": [
        [ 1 ]
    ]
}
```
This field represent an integer.

- text:
```JSON
{
    "columns": [
        {
            "name": "Text field",
            "type": "text",
            "options": {}
        }
    ],
    "values": [
        [ "example" ]
    ]
}
```
This field represent a text, a string.

- select:
```JSON
{
    "columns": [
        {
            "name": "Select field",
            "type": "select",
            "options": {
                "values": ["example-1", "example-2", "example-3"]
            }
        }
    ],
    "values": [
        [ "example-1" ]
    ]
}
```
This field represent a select. You need to give it the possible values. Its value and values are only text for now.

- select-chips:
```JSON
{
    "columns": [
        {
            "name": "Select chips field",
            "type": "select-chips",
            "options": {
                "values": ["example-1", "example-2", "example-3"]
            }
        }
    ],
    "values": [
        [ ["example-1", "example-2"] ]
    ]
}
```
This field represent a multiple select with chips. You give it the possible values, and its value will be a list. Value and values must be text for the moment.

#### Custom fields

It is possible to add custom fields, one is present in the demo. In order to add a custom field you will need to declare it before adding CrudJS to your page. You can add it in a script or a file:
```html
<script src="myCustomField.js"></script> <!-- Add your custom field -->
<script src="<crud-js>"></script> <!-- Add CrudJS -->
```
Here _myCustomField.js_ content:
```javascript
/*
 * Your element constructor
 *
 * @param   {*}             value      - The value of the field.
 * @param   {object}        columnDesc - The back-end description of the field column.
 * @param   {CrudComponent} crud       - The crud component.
 */
function CustomField(value, columnDesc, crud) {
    this.value = value;
    this.columnDesc = columnDesc;
    this.crud = crud;
    this.element = document.createElement("td");
}

/*
 * Function of the custom field object that gives its default value.
 *
 * @returns {*} Default value.
 */
CustomField.prototype.getDefaultValue = function() {}

/*
 * Gets the new value of the field after editing. Called by edit view.
 *
 * @returns {*} New value.
 */
CustomField.prototype.getNewValue = function() {}

/*
 * Function of the custom field object that build its display view.
 */
CustomField.prototype.buildDisplayView = function() {
    this.element.innerHTML = `you element html in display view`;
}

/*
 * Function of the custom field object that build its edit view.
 */
CustomField.prototype.buildEditView = function() {
    var value = this.value;
    if(!value) {
        value = this.getDefaultValue();
    }
    this.element.innerHTML = `your element html in edit view`;
}

/*
 * Function of the custom field object that check if its validators are valid.
 * This function is called only when validators are given in the column validators.
 * Please check the section dedicated to validators to know more about it.
 *
 * @returns {boolean} True if validators pass, else false.
 */
CustomField.prototype.checkValidators = function(newValue, validators) {}

/*
 * Function of the custom field object that check if its value is valid.
 *
 * @returns {boolean} True if field new value is correct pass, else false.
 */
CustomField.prototype.checkField = function(newValue) {}

// Register your field for CrudJS as 'custom-field'. You can add multiple custom fields.
var CUSTOM_FIELDS = {
    'custom-field': CustomField
};
```

Complete example for 'email' field in [/static/js/demo.js](./static/js/demo.js).

### Column options

#### Validators

Validators allow you to add some verifications to validate data on client side. You can specify for each column validators like that:
```JSON
{
    "name": "Name",
    "type": "text",
    "options": {
        "validators": {  }
    }
}
```
Now the possible **"validators"** values per field (Each is optional):
- int:
```JSON
{
    "min": "<minimum-integer-value>",
    "max": "<maximum-integer-value>"
}
```
An integer value is needed for both **"min"** and **"max"**.

- text:
```JSON
{
    "minLength": "<minimum-length-of-the-text>",
    "maxLength": "<maximum-length-of-the-text>",
    "regex": "<regex-for-the-text>"
}
```
The **"minLength"** and the **"maxLength"** need an integer value, and **"regex"** need a string representing a Regex.

- select: No validators.

- select-chips:
```JSON
{
    "minSelect": "<minimum-number-chips>",
    "maxSelect": "<maximum-number-chips>"
}
```
An integer value is expected for both **"minSelect"** and **"maxSelect"**.

#### Help text

You can add add some text to help people understand the data you expected. The help text is used in error messages, and on hover of columns of the add line and lines when they are edited.
To specify a column help text add in the column description of the **GET** JSON:
```JSON
{
    "name": "<column-name>",
    "type": "<column-type>",
    "options": {
        "helpText": "I'm a text here to help you!",
    }
}
```

### CSRF token

Sometimes your back-end will ask for a CSRF token. You can give one to CrudJS like that:
```html
<script>
    var CSRF = "<your-CSRF-token>"; // Important! Your variable need to be global.
</script>
<script src="<crud-js>"></script> <!-- Add CrudJS -->
```

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
