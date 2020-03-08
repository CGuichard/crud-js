function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * @file This file contains some basic function used in the project.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Options JSHint
 * ------------------------------------------------------------------------
 */

/* jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------
 */
function createElement(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function resetElementHTML(htmlElement) {
  htmlElement.innerHTML = "";
}

function isHidden(element) {
  return element.style.display === "none";
}
/**
 * @file This file contains the CrudField object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */


var CrudField = /*#__PURE__*/function () {
  function CrudField(index, crudLine, columnDesc) {
    _classCallCheck(this, CrudField);

    this.edit = false;
    this.index = index;
    this.crudLine = crudLine;
    this.columnDesc = columnDesc;
    this.element = document.createElement("th");
    this.element.className = "align-middle";
    this.element.setAttribute("scope", "row");
  }

  _createClass(CrudField, [{
    key: "setValue",
    value: function setValue(val) {
      this.crudLine.getValues()[this.index] = val;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.crudLine.getValues()[this.index];
    }
  }, {
    key: "prepareDisplayView",
    value: function prepareDisplayView() {
      this.edit = false;
      resetElementHTML(this.element);
      var fieldValue = this.getValue();

      switch (this.columnDesc.type) {
        case "text":
          this.element.innerHTML = fieldValue;
          break;

        case "int":
          this.element.innerHTML = fieldValue;
          break;

        case "select":
          this.element.innerHTML = fieldValue;
          break;

        case "select-chips":
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = fieldValue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var val = _step.value;
              this.element.innerHTML = this.element.innerHTML.concat("<span style=\"font-size:0.9rem;\" class=\"badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">" + val + "</span>");
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          break;
      }
    }
  }, {
    key: "showDisplayView",
    value: function showDisplayView() {
      this.prepareDisplayView();
      this.crudLine.addColumn(this.element);
    }
  }, {
    key: "prepareEditView",
    value: function prepareEditView() {
      this.edit = true;
      resetElementHTML(this.element);
      var self = this;
      var fieldValue = this.getValue();

      switch (this.columnDesc.type) {
        case "text":
          if (!fieldValue) {
            fieldValue = "";
          }

          this.element.innerHTML = "<input type=\"text\" class=\"form-control m-0\" placeholder=\"" + this.columnDesc.name + "\" value=\"" + fieldValue + "\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !important;\">";
          break;

        case "int":
          if (!fieldValue) {
            fieldValue = "";
          }

          this.element.innerHTML = "<input type=\"number\" class=\"form-control m-0\" placeholder=\"" + this.columnDesc.name + "\" value=\"" + fieldValue + "\" style=\"background-image:linear-gradient(0deg,#1e99d6 2px,rgba(0,150,136,0) 0),linear-gradient(0deg,rgba(0,0,0,.26) 1px,transparent 0);width:auto !importan;\">";
          break;

        case "select":
          if (!fieldValue) {
            fieldValue = "";
          }

          var selectHTML = "<select class=\"custom-select\">";
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.columnDesc.options.values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var choice = _step2.value;
              selectHTML = selectHTML.concat("<option value=\"" + choice + "\" " + (choice === fieldValue ? "selected" : "") + ">" + choice + "</option>");
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          selectHTML = selectHTML.concat("</select>");
          this.element.innerHTML = selectHTML;
          break;

        case "select-chips":
          // Create select
          if (!fieldValue) {
            fieldValue = [];
          }

          var options = this.columnDesc.options.values.filter(function (x) {
            return !fieldValue.includes(x);
          });
          var selectChips = document.createElement("select");
          selectChips.setAttribute("style", "width:auto !important");
          selectChips.setAttribute("class", "custom-select mr-2");
          selectChips.appendChild(createElement("<option>Sélectionner...</option>"));
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _choice = _step3.value;
              selectChips.appendChild(createElement("<option value=\"" + _choice + "\">" + _choice + "</option>"));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          selectChips.onchange = function () {
            var chips = self.createSelectChips(this.value);
            this.parentNode.appendChild(chips);
            this.options[this.selectedIndex].remove();
            this.selectedIndex = 0;
          };

          this.element.appendChild(selectChips); // Create chips

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = fieldValue[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var value = _step4.value;
              this.element.appendChild(this.createSelectChips(value));
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          break;
      }
    }
  }, {
    key: "showEditView",
    value: function showEditView() {
      this.prepareEditView();
      this.crudLine.addColumn(this.element);
    }
  }, {
    key: "validateEdit",
    value: function validateEdit() {
      if (this.edit) {
        switch (this.columnDesc.type) {
          case "text":
            this.setValue(this.element.getElementsByTagName('input')[0].value);
            break;

          case "int":
            var value = parseInt(this.element.getElementsByTagName('input')[0].value);

            if (!isNaN(value)) {
              this.setValue(value);
            }

            break;

          case "select":
            this.setValue(this.element.getElementsByTagName('select')[0].value);
            break;

          case "select-chips":
            var valuesArray = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = this.element.getElementsByClassName("crudjs-chips")[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _value = _step5.value;
                valuesArray.push(_value.textContent);
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            this.setValue(valuesArray);
            break;
        }
      }
    }
  }, {
    key: "createSelectChips",
    value: function createSelectChips(value) {
      var chips = createElement("<span style=\"font-size:0.9rem;\" class=\"crudjs-chips badge badge-pill badge-secondary mt-1 mr-1 pb-2 pt-2\">" + value + "<span class=\"crudjs-remove-chips-btn bg-light rounded-circle pl-1 pr-1 text-secondary ml-1\" aria-hidden=\"true\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></span></span>");

      var removeChipsFunction = function removeChipsFunction() {
        var chips = this.parentNode;
        var newOption = document.createElement("option");
        newOption.value = chips.textContent;
        newOption.textContent = newOption.value;
        chips.parentNode.getElementsByTagName('select')[0].appendChild(newOption);
        chips.remove();
      };

      chips.getElementsByClassName('crudjs-remove-chips-btn')[0].onclick = removeChipsFunction;
      return chips;
    }
  }]);

  return CrudField;
}();
/**
 * @file This file contains the CrudEditLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */


var CrudEditLine = /*#__PURE__*/function () {
  function CrudEditLine(lineArray, crudTable) {
    _classCallCheck(this, CrudEditLine);

    this.values = lineArray;
    this.crudTable = crudTable;
    this.element = document.createElement("tr");
    this.element.className = "crudjs-edit-line";
    this.fields = [];

    for (var i = 0; i < this.values.length; i++) {
      this.fields.push(new CrudField(i, this, this.crudTable.getCrudComponent().getData().columns[i]));
    }

    this.showDisplayView();
  }

  _createClass(CrudEditLine, [{
    key: "showDisplayView",
    value: function showDisplayView() {
      resetElementHTML(this.element);
      this.addNumberColumn();
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.fields[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var field = _step6.value;
          field.showDisplayView();
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (this.crudTable.getCrudComponent().isEditable()) {
        this.addActionsColumn();
      }

      this.crudTable.enableButtons();
    }
  }, {
    key: "showEditView",
    value: function showEditView() {
      if (this.crudTable.getCrudComponent().isEditable()) {
        resetElementHTML(this.element);
        this.addNumberColumn();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.fields[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var field = _step7.value;
            field.showEditView();
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        this.addEditActionsColumn();
        this.crudTable.disableButtons();
      }
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.values.status;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.values.status = status;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.values;
    }
  }, {
    key: "addColumn",
    value: function addColumn(col) {
      this.element.appendChild(col);
    }
  }, {
    key: "addNumberColumn",
    value: function addNumberColumn() {
      var thNumber = document.createElement("th");
      thNumber.className = "crudjs-line-number align-middle";
      thNumber.setAttribute("scope", "row");
      this.element.appendChild(thNumber);
    }
  }, {
    key: "addActionsColumn",
    value: function addActionsColumn() {
      var self = this;
      var tdActions = document.createElement("td");
      tdActions.className = "text-right";
      tdActions.innerHTML = "\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-edit-btn btn btn-raised btn-info mb-1 rounded\" title=\"Editer\"><i class=\"fas fa-pencil-alt\"></i></button>\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-delete-btn btn btn-raised btn-danger mb-1 rounded\" data-toggle=\"modal\" data-target=\"#" + this.crudTable.modalDeleteId + "\" title=\"Supprimer\"><i class=\"fas fa-trash\"></i></button>\n        ";

      tdActions.getElementsByClassName('crudjs-edit-btn')[0].onclick = function () {
        self.showEditView();
        self.crudTable.updateLineNumbers();
      };

      tdActions.getElementsByClassName('crudjs-delete-btn')[0].onclick = function () {
        var btnValidDelete = self.crudTable.getModalDelete().getElementsByClassName('crudjs-modal-valid')[0];

        btnValidDelete.onclick = function () {
          if (self.getStatus() !== "N") {
            self.setStatus("D");
            self.element.style.display = "none";
          } else {
            self.element.remove();
            var lineArray = self.crudTable.getCrudComponent().getData().values;
            lineArray.splice(lineArray.indexOf(self.values), 1);
          }

          self.crudTable.updateLineNumbers();
        };
      };

      this.element.appendChild(tdActions);
    }
  }, {
    key: "addEditActionsColumn",
    value: function addEditActionsColumn() {
      var self = this;
      var tdActions = document.createElement("td");
      tdActions.className = "text-right";
      tdActions.innerHTML = "\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-valid-btn btn btn-raised btn-success mb-1 rounded\" title=\"Valider\"><i class=\"fas fa-sm fa-check\"></i></button>\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-cancel-btn btn btn-raised btn-danger mb-1 rounded\" title=\"Annuler\"><i class=\"fas fa-times\"></i></button>\n        ";

      tdActions.getElementsByClassName('crudjs-valid-btn')[0].onclick = function () {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = self.fields[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var field = _step8.value;
            field.validateEdit();
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        if (self.getStatus() === "S") {
          self.setStatus("M");
        }

        self.showDisplayView();
        self.crudTable.updateLineNumbers();
      };

      tdActions.getElementsByClassName('crudjs-cancel-btn')[0].onclick = function () {
        self.showDisplayView();
        self.crudTable.updateLineNumbers();
      };

      this.element.appendChild(tdActions);
    }
  }]);

  return CrudEditLine;
}();
/**
 * @file This file contains the CrudAddLine object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */


var CrudAddLine = /*#__PURE__*/function () {
  function CrudAddLine(crudTable) {
    _classCallCheck(this, CrudAddLine);

    this.crudTable = crudTable;
    this.element = document.createElement("tr");
    this.element.className = "crudjs-add-line";
    var columns = this.crudTable.getCrudComponent().getData().columns;
    this.initData(columns.length);
    this.fields = [];

    for (var i = 0; i < this.values.length; i++) {
      this.fields.push(new CrudField(i, this, columns[i]));
    }

    this.show();
  }

  _createClass(CrudAddLine, [{
    key: "initData",
    value: function initData(size) {
      this.values = new Array(size);
      this.values.status = "N";
      this.values.oldValue = _toConsumableArray(this.values);
    }
  }, {
    key: "show",
    value: function show() {
      resetElementHTML(this.element);
      this.addEmptyColumn();
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.fields[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var field = _step9.value;
          field.showEditView();
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      if (this.crudTable.getCrudComponent().isEditable()) {
        this.addActionsColumn();
      }

      this.crudTable.enableButtons();
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.values;
    }
  }, {
    key: "addColumn",
    value: function addColumn(col) {
      this.element.appendChild(col);
    }
  }, {
    key: "addEmptyColumn",
    value: function addEmptyColumn() {
      var thEmpty = document.createElement("th");
      thEmpty.setAttribute("scope", "row");
      this.element.appendChild(thEmpty);
    }
  }, {
    key: "addActionsColumn",
    value: function addActionsColumn() {
      var self = this;
      var tdActions = document.createElement("td");
      tdActions.className = "text-right";
      tdActions.innerHTML = "\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-add-btn btn btn-raised btn-secondary mb-1 rounded\" title=\"Ajouter\"><i class=\"fas fa-plus\"></i></button>\n            <button type=\"button\" style=\"width:45px;\" class=\"crudjs-add-cancel-btn btn btn-raised btn-danger mb-1 rounded\" title=\"R\xE9initialiser\"><i class=\"fas fa-times\"></i></button>\n        ";

      tdActions.getElementsByClassName('crudjs-add-btn')[0].onclick = function () {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = self.fields[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var field = _step10.value;
            field.validateEdit();
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        var values = self.values;
        self.crudTable.getCrudComponent().getData().values.push(values);
        self.crudTable.addCrudLine(new CrudEditLine(values, self.crudTable));
        self.initData(self.values.length);
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = self.fields[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _field = _step11.value;

            _field.prepareEditView();
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        self.crudTable.updateLineNumbers();
      };

      tdActions.getElementsByClassName('crudjs-add-cancel-btn')[0].onclick = function () {
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = self.fields[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var field = _step12.value;
            field.prepareEditView();
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
              _iterator12["return"]();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }

        self.crudTable.updateLineNumbers();
      };

      this.element.appendChild(tdActions);
    }
  }]);

  return CrudAddLine;
}();
/**
 * @file This file contains the CrudTable object.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */


var CrudTable = /*#__PURE__*/function () {
  function CrudTable(crudComponent) {
    _classCallCheck(this, CrudTable);

    this.crudComponent = crudComponent;
    this.element = createElement("<div class=\"table-responsive\"></div>");
    this.element.innerHTML = "\n        <table class=\"table\">\n          <thead class=\"thead-light\">\n          </thead>\n          <tbody>\n          </tbody>\n        </table>\n        ";
    this.thead = this.element.getElementsByTagName('thead')[0];
    this.tbody = this.element.getElementsByTagName('tbody')[0];
    this.modalDeleteId = "crudjs-modal-" + ++CrudTable.ID;
    this.modalDelete = this.createModal();
  } // Displays


  _createClass(CrudTable, [{
    key: "render",
    value: function render() {
      this.resetTable();
      this.renderHead();
      this.renderLines();
      this.updateLineNumbers();
    }
  }, {
    key: "resetTable",
    value: function resetTable() {
      resetElementHTML(this.thead);
      resetElementHTML(this.tbody);
    }
  }, {
    key: "renderHead",
    value: function renderHead() {
      this.thead.innerHTML = "<tr><th scope=\"col\"><strong>#</strong></th></tr>";
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = this.crudComponent.getData().columns[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var col = _step13.value;

          var _th = document.createElement("th");

          _th.setAttribute("scope", "col");

          _th.innerHTML = "<strong>" + col.name + "</strong>";
          this.thead.children[0].appendChild(_th);
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      if (this.crudComponent.isEditable()) {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.className = "text-right pr-3";
        th.innerHTML = "<strong>Action(s)</strong>";
        this.thead.children[0].appendChild(th);
      }
    }
  }, {
    key: "renderLines",
    value: function renderLines() {
      if (this.getCrudComponent().isEditable()) {
        this.addCrudLine(new CrudAddLine(this));
      }

      var values = this.crudComponent.getData().values;

      for (var i = 0; i < values.length; i++) {
        this.addCrudLine(new CrudEditLine(values[i], this));
      }
    }
  }, {
    key: "addCrudLine",
    value: function addCrudLine(line) {
      this.tbody.appendChild(line.getElement());
    }
  }, {
    key: "updateLineNumbers",
    value: function updateLineNumbers() {
      var i = 1;
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = this.element.getElementsByClassName('crudjs-line-number')[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var elem = _step14.value;

          if (!isHidden(elem.parentNode)) {
            elem.textContent = i++;
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }
    }
  }, {
    key: "disableButtons",
    value: function disableButtons() {
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = this.element.getElementsByClassName('crudjs-edit-btn')[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var elem = _step15.value;
          elem.disabled = true;
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = this.element.getElementsByClassName('crudjs-delete-btn')[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _elem = _step16.value;
          _elem.disabled = true;
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = this.element.getElementsByClassName('crudjs-add-btn')[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var _elem2 = _step17.value;
          _elem2.disabled = true;
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = this.element.getElementsByClassName('crudjs-add-cancel-btn')[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _elem3 = _step18.value;
          _elem3.disabled = true;
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }
    }
  }, {
    key: "enableButtons",
    value: function enableButtons() {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = this.element.getElementsByClassName('crudjs-edit-btn')[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var elem = _step19.value;
          elem.disabled = false;
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
            _iterator19["return"]();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }

      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = this.element.getElementsByClassName('crudjs-delete-btn')[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var _elem4 = _step20.value;
          _elem4.disabled = false;
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
            _iterator20["return"]();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }

      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = this.element.getElementsByClassName('crudjs-add-btn')[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var _elem5 = _step21.value;
          _elem5.disabled = false;
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }

      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = this.element.getElementsByClassName('crudjs-add-cancel-btn')[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var _elem6 = _step22.value;
          _elem6.disabled = false;
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var modalDelete = createElement("\n        <div class=\"modal fade\" id=\"" + this.modalDeleteId + "\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n          <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Attention !</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body\">\n                Voulez-vous vraiment supprimer cette ligne ?\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary mr-1\" data-dismiss=\"modal\">Non</button>\n                <button type=\"button\" class=\"btn btn-raised btn-info crudjs-modal-valid\" data-dismiss=\"modal\">Oui</button>\n              </div>\n            </div>\n          </div>\n        </div>\n        ");
      document.body.appendChild(modalDelete);
      return modalDelete;
    } // Getters and Setters

  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "getModalDelete",
    value: function getModalDelete() {
      return this.modalDelete;
    }
  }, {
    key: "getModalDeleteId",
    value: function getModalDeleteId() {
      return this.modalDeleteId;
    }
  }, {
    key: "getCrudComponent",
    value: function getCrudComponent() {
      return this.crudComponent;
    }
  }]);

  return CrudTable;
}();
/**
 * ------------------------------------------------------------------------
 * Code Run
 * ------------------------------------------------------------------------
 */


CrudTable.ID = 0;
/**
 * @file This file contains the CrudJS webcomponent.
 *
 * @author Clement GUICHARD <clement.guichard0@gmail.com>
 * @version 0.0.1
 *
 */

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var CrudComponent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CrudComponent, _HTMLElement);

  function CrudComponent() {
    var _this;

    _classCallCheck(this, CrudComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrudComponent).call(this));

    _this.init();

    return _this;
  }

  _createClass(CrudComponent, [{
    key: "init",
    value: function init() {
      this.attr = {};
      var settingsOk = true;
      var url = this.getAttribute("url");
      var editable = this.getAttribute("editable");
      var saveButtonId = this.getAttribute("save-button");
      this.resetDisplay();
      this.setAttr("loadElement", createElement("<h1 class=\"text-info\"><i class=\"fas fa-spinner fa-pulse\"></i></h1>"));
      this.setAttr("errorElement", createElement("\n            <div class=\"alert alert-warning\" role=\"alert\">\n                <strong><span class=\"crudjs-error-t\">ERROR</span>:</strong>\n                <span class=\"crudjs-error-m\">Unknown</span>\n            </div>\n            "));

      if (url === null && settingsOk) {
        settingsOk = false;
      } else {
        this.setAttr("url", url);
      }

      if (editable !== null && settingsOk) {
        if (saveButtonId !== null) {
          var saveButton = document.getElementById(saveButtonId);

          if (saveButton !== null) {
            this.setAttr("editable", true);
            this.setAttr("saveButton", saveButton);
          } else {
            settingsOk = false;
          }
        } else {
          settingsOk = false;
        }
      } else {
        this.setAttr("editable", false);
      }

      if (settingsOk) {
        this.setAttr("data", null);
        this.setAttr("table", new CrudTable(this));

        if (this.isEditable()) {
          var self = this;

          this.getAttr("saveButton").onclick = function () {
            self.save();
          };
        }

        this.load();
      } else {
        this.displayError("Error", "Incorrect configuration. If you want to have an editable crud don't forget to give it a save-button.");
      }
    }
  }, {
    key: "load",
    // Requests
    value: function load() {
      var _this2 = this;

      this.displayLoading();
      fetch(this.getUrl()).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this2.parseData(json);

        _this2.displayTable();
      })["catch"](function (err) {
        _this2.displayError("Error", "An error occured while trying to fetch resource. See : " + err);
      });
    }
  }, {
    key: "parseData",
    value: function parseData(data) {
      var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = data.values[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var line = _step23.value;
          line.status = "S";
        }
      } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
            _iterator23["return"]();
          }
        } finally {
          if (_didIteratorError23) {
            throw _iteratorError23;
          }
        }
      }

      this.setAttr("data", data);
    }
  }, {
    key: "save",
    value: function save() {
      if (this.getData()) {
        console.log("SAVE", this.getData());
      }
    } // Displays

  }, {
    key: "resetDisplay",
    value: function resetDisplay() {
      resetElementHTML(this);
    }
  }, {
    key: "displayLoading",
    value: function displayLoading() {
      this.setChild(this.getAttr("loadElement"));
    }
  }, {
    key: "displayError",
    value: function displayError(errorTitle, errorMessage) {
      var errorElement = this.getAttr("errorElement");
      var _iteratorNormalCompletion24 = true;
      var _didIteratorError24 = false;
      var _iteratorError24 = undefined;

      try {
        for (var _iterator24 = errorElement.getElementsByClassName('crudjs-error-t')[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
          var title = _step24.value;
          title.textContent = errorTitle;
        }
      } catch (err) {
        _didIteratorError24 = true;
        _iteratorError24 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
            _iterator24["return"]();
          }
        } finally {
          if (_didIteratorError24) {
            throw _iteratorError24;
          }
        }
      }

      var _iteratorNormalCompletion25 = true;
      var _didIteratorError25 = false;
      var _iteratorError25 = undefined;

      try {
        for (var _iterator25 = errorElement.getElementsByClassName('crudjs-error-m')[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
          var msg = _step25.value;
          msg.textContent = errorMessage;
        }
      } catch (err) {
        _didIteratorError25 = true;
        _iteratorError25 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
            _iterator25["return"]();
          }
        } finally {
          if (_didIteratorError25) {
            throw _iteratorError25;
          }
        }
      }

      this.setChild(errorElement);
    }
  }, {
    key: "displayTable",
    value: function displayTable() {
      var table = this.getAttr("table");
      table.render();
      this.setChild(table.getElement());
    } // Events

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {}
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (this.getData() && newValue) {
        this.init();
      }
    } // Getters and Setters

  }, {
    key: "setAttr",
    value: function setAttr(name, value) {
      this.attr[name] = value;
    }
  }, {
    key: "getAttr",
    value: function getAttr(name) {
      return this.attr[name];
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.getAttr("data");
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.getAttr("url");
    }
  }, {
    key: "isEditable",
    value: function isEditable() {
      return this.getAttr("editable");
    }
  }, {
    key: "setChild",
    value: function setChild(child) {
      this.resetDisplay();
      this.appendChild(child);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['url', 'save-button', 'editable'];
    }
  }]);

  return CrudComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
/**
 * ------------------------------------------------------------------------
 * Code Run
 * ------------------------------------------------------------------------
 */


customElements.define('crud-js', CrudComponent);
