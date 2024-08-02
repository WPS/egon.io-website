"use strict";
(self["webpackChunkegon"] = self["webpackChunkegon"] || []).push([["main"],{

/***/ 64225:
/*!**********************************!*\
  !*** ./src/app/BPMN-JS/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryModeler)
/* harmony export */ });
/* harmony import */ var bpmn_js_lib_Modeler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bpmn-js/lib/Modeler */ 47377);
/* harmony import */ var diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! diagram-js/lib/features/resize */ 40844);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modeler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modeler */ 9212);
/* harmony import */ var _modeler_labeling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modeler/labeling */ 45291);
/* harmony import */ var _modeler_modeling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modeler/modeling */ 99222);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Domain/Common/elementTypes */ 30236);








function DomainStoryModeler(options) {
  bpmn_js_lib_Modeler__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, options);
  this._customElements = [];
  this._groupElements = [];
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryModeler, bpmn_js_lib_Modeler__WEBPACK_IMPORTED_MODULE_5__["default"]);
DomainStoryModeler.prototype._modules = [].concat(DomainStoryModeler.prototype._modules, [_modeler__WEBPACK_IMPORTED_MODULE_1__["default"], _modeler_labeling__WEBPACK_IMPORTED_MODULE_2__["default"], _modeler_modeling__WEBPACK_IMPORTED_MODULE_3__["default"]], [diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_6__["default"]]);
/**
 * add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
DomainStoryModeler.prototype._addCustomShape = function (customElement) {
  let parentId = customElement.parent;
  delete customElement.children;
  delete customElement.parent;
  this._customElements.push(customElement);
  let canvas = this.get("canvas"),
    elementFactory = this.get("elementFactory");
  let customAttrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_7__.assign)({
    businessObject: customElement
  }, customElement);
  let customShape = elementFactory.create("shape", customAttrs);
  if (isGroup(customElement)) {
    this._groupElements[customElement.id] = customShape;
  }
  if (parentId) {
    let parentShape = this._groupElements[parentId];
    if (isGroup(parentShape)) {
      return canvas.addShape(customShape, parentShape, parentShape.id);
    }
  }
  return canvas.addShape(customShape);
};
DomainStoryModeler.prototype._addCustomConnection = function (customElement) {
  this._customElements.push(customElement);
  let canvas = this.get("canvas"),
    elementFactory = this.get("elementFactory"),
    elementRegistry = this.get("elementRegistry");
  let customAttrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_7__.assign)({
    businessObject: customElement
  }, customElement);
  let connection = elementFactory.create("connection", (0,min_dash__WEBPACK_IMPORTED_MODULE_7__.assign)(customAttrs, {
    source: elementRegistry.get(customElement.source),
    target: elementRegistry.get(customElement.target)
  }), elementRegistry.get(customElement.source).parent);
  return canvas.addConnection(connection);
};
//** We import BusinessObjects, not the whole Canvas Object!!!!!!!!
DomainStoryModeler.prototype.importCustomElements = function (elements) {
  this.get("eventBus").fire("diagram.clear", {});
  this._customElements = [];
  this._groupElements = [];
  this.addCustomElements(elements);
};
/**
 * add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
DomainStoryModeler.prototype.addCustomElements = function (customElements) {
  if (!(0,min_dash__WEBPACK_IMPORTED_MODULE_7__.isArray)(customElements)) {
    throw new Error("argument must be an array");
  }
  let shapes = [],
    connections = [],
    groups = [];
  customElements.forEach(function (customElement) {
    if (isConnection(customElement)) {
      connections.push(customElement);
    } else if (isGroup(customElement)) {
      groups.push(customElement);
    } else {
      shapes.push(customElement);
    }
  });
  // add groups before shapes and shapes before connections so that connections
  // can already rely on the shapes being part of the diagram
  groups.forEach(this._addCustomShape, this);
  shapes.forEach(this._addCustomShape, this);
  connections.forEach(this._addCustomConnection, this);
};
/**
 * get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
DomainStoryModeler.prototype.getCustomElements = function () {
  return this._customElements;
};
// override standard function to prevent default elements on canvas
DomainStoryModeler.prototype.createDiagram = function (done) {};
function isConnection(element) {
  return element.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.ACTIVITY || element.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.CONNECTION;
}
function isGroup(element) {
  return element && element.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.GROUP;
}

/***/ }),

/***/ 46269:
/*!********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/change-icon/replace.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Replace)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);



/**
 * service that allow replacing of elements.
 */
function Replace(modeling) {
  this._modeling = modeling;
}
/**
 * @param {Element} oldElement - element to be replaced
 * @param {Object}  newElementData - containing information about the new Element, for example height, width, type.
 * @param modeling
 */
function replaceElement(oldElement, newElementData, modeling) {
  // let modeling = this._modeling;
  let newElement = setCenterOfElement(newElementData, oldElement, modeling);
  let outgoingActivities = newElement.outgoing;
  let incomingActivities = newElement.incoming;
  outgoingActivities.forEach(element => {
    element.businessObject.source = newElement.id;
  });
  incomingActivities.forEach(element => {
    element.businessObject.target = newElement.id;
  });
  return newElement;
}
function setCenterOfElement(newElementData, oldElement, modeling) {
  newElementData.x = Math.ceil(oldElement.x + (newElementData.width || oldElement.width) / 2);
  newElementData.y = Math.ceil(oldElement.y + (newElementData.height || oldElement.height) / 2);
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newElementData, {
    name: oldElement.businessObject.name
  });
  return modeling.replaceShape(oldElement, newElementData, {});
}
Replace.prototype.replaceElement = replaceElement;

/***/ }),

/***/ 2843:
/*!********************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/change-icon/replaceMenuProvider.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReplaceMenuProvider)
/* harmony export */ });
/* harmony import */ var _replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replace */ 46269);
/* harmony import */ var _replaceOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replaceOptions */ 82243);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! min-dash */ 81410);





/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
function ReplaceMenuProvider(modeling) {
  this._dsReplace = new _replace__WEBPACK_IMPORTED_MODULE_0__["default"](modeling);
  this._modeling = modeling;
}
ReplaceMenuProvider.$inject = ["modeling"];
/**
 * Get all entries from replaceOptions for the given element and apply filters
 * on them. Get for example only elements, which are different from the current one.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of menu entry items
 */
ReplaceMenuProvider.prototype.getEntries = function (element) {
  let entries;
  if (element.type.includes("actor")) {
    entries = _replaceOptions__WEBPACK_IMPORTED_MODULE_1__.actorReplaceOptions(element.type);
  } else if (element.type.includes("workObject")) {
    entries = _replaceOptions__WEBPACK_IMPORTED_MODULE_1__.workObjectReplaceOptions(element.type);
  }
  return this._createEntries(element, entries);
};
/**
 * Creates an array of menu entry objects for a given element and filters the replaceOptions
 * according to a filter function.
 *
 * @param  {djs.model.Base} element
 * @param  {Object} replaceOptions
 *
 * @return {Array<Object>} a list of menu items
 */
ReplaceMenuProvider.prototype._createEntries = function (element, replaceOptions) {
  let menuEntries = [];
  let self = this;
  (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.forEach)(replaceOptions, function (definition) {
    let entry = self._createMenuEntry(definition, element);
    menuEntries.push(entry);
  });
  return menuEntries;
};
/**
 * Creates and returns a single menu entry item.
 *
 * @param  {Object} definition a single replace options definition object
 * @param  {djs.model.Base} element
 * @param  {Function} [action] an action callback function which gets called when
 *                             the menu entry is being triggered.
 *
 * @return {Object} menu entry item
 */
ReplaceMenuProvider.prototype._createMenuEntry = function (definition, element, action) {
  let replaceElement = this._dsReplace.replaceElement;
  let modeling = this._modeling;
  let replaceAction = function () {
    return replaceElement(element, definition.target, modeling);
  };
  action = action || replaceAction;
  return {
    label: definition.label,
    className: definition.className,
    id: definition.actionName,
    action: action
  };
};

/***/ }),

/***/ 82243:
/*!***************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/change-icon/replaceOptions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actorReplaceOptions: () => (/* binding */ actorReplaceOptions),
/* harmony export */   initializeReplaceOptions: () => (/* binding */ initializeReplaceOptions),
/* harmony export */   workObjectReplaceOptions: () => (/* binding */ workObjectReplaceOptions)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);

let iconDictionaryService;
function initializeReplaceOptions(iconDictionary) {
  iconDictionaryService = iconDictionary;
}
function actorReplaceOptions(name) {
  const actorTypes = iconDictionaryService.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
  let replaceOption = {};
  let i = 0;
  actorTypes.keysArray().forEach(actorType => {
    if (!name.includes(actorType)) {
      const typeName = actorType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName.toLowerCase(),
        className: iconDictionaryService.getIconForBPMN(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR, actorType),
        target: {
          type: `${src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR}${actorType}`
        }
      };
      i++;
    }
  });
  return replaceOption;
}
function workObjectReplaceOptions(name) {
  const workObjectTypes = iconDictionaryService.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
  let replaceOption = {};
  let i = 0;
  workObjectTypes.keysArray().forEach(workObjectType => {
    if (!name.includes(workObjectType)) {
      const typeName = workObjectType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName,
        className: iconDictionaryService.getIconForBPMN(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, workObjectType),
        target: {
          type: `${src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT}${workObjectType}`
        }
      };
    }
    i++;
  });
  return replaceOption;
}

/***/ }),

/***/ 48640:
/*!******************************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/context-pad/domainStoryContextPadProvider.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryContextPadProvider),
/* harmony export */   initializeContextPadProvider: () => (/* binding */ initializeContextPadProvider)
/* harmony export */ });
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bpmn_js_lib_features_context_pad_ContextPadProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bpmn-js/lib/features/context-pad/ContextPadProvider */ 30862);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbering/numbering */ 93043);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/allIcons */ 57488);








let dirtyFlagService;
let iconDictionaryService;
function initializeContextPadProvider(dirtyFlag, iconDictionary) {
  dirtyFlagService = dirtyFlag;
  iconDictionaryService = iconDictionary;
}
function DomainStoryContextPadProvider(injector, connect, translate, elementFactory, create, canvas, contextPad, popupMenu, replaceMenuProvider, commandStack, eventBus, modeling) {
  let startConnect;
  let selectedElement;
  injector.invoke(bpmn_js_lib_features_context_pad_ContextPadProvider__WEBPACK_IMPORTED_MODULE_4__["default"], this);
  let autoPlace = injector.get("autoPlace", false);
  let cached = (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.bind)(this.getContextPadEntries, this);
  document.addEventListener("pickedColor", event => {
    if (selectedElement) {
      executeCommandStack(event);
    }
  });
  popupMenu.registerProvider("ds-replace", replaceMenuProvider);
  popupMenu.registerProvider("bpmn-replace", replaceMenuProvider);
  this.getContextPadEntries = function (element) {
    selectedElement = element;
    document.dispatchEvent(new CustomEvent("defaultColor", {
      detail: {
        color: selectedElement.businessObject.pickedColor ?? "#000000"
      }
    }));
    const allStandardIconKeys = (0,src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.getAllStandardIconKeys)();
    let actions = cached(element);
    startConnect = function (event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    };
    if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT)) {
      if (!src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.isCustomType(element.type) || src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.isCustomSvgType(element.type)) {
        addColorChange(actions);
      }
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addActors(appendAction, actions);
      addWorkObjects(appendAction, actions);
      addChangeWorkObjectTypeMenu(actions);
    } else if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR)) {
      if (!src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.isCustomType(element.type) || src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.isCustomSvgType(element.type)) {
        addColorChange(actions);
      }
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addWorkObjects(appendAction, actions);
      addChangeActorTypeMenu(actions);
    } else if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP)) {
      delete actions.delete;
      addTextAnnotation(actions);
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
        deleteGroup: {
          group: "edit",
          className: "bpmn-icon-trash",
          title: "Remove Group without Child-Elements",
          action: {
            click: function (event, element) {
              modeling.removeGroup(element);
              dirtyFlagService.makeDirty();
            }
          }
        }
      });
      addColorChange(actions);
    } else if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY)) {
      moveDeleteActionToEndOfArray(actions);
      addColorChange(actions);
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
        delete: {
          group: "edit",
          className: "bpmn-icon-trash",
          title: "Remove",
          action: {
            click: function (event, element) {
              modeling.removeElements({
                element
              });
              dirtyFlagService.makeDirty();
            }
          }
        }
      });
    }
    return actions;
  };
  function moveDeleteActionToEndOfArray(actions) {
    delete actions.delete;
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      changeDirection: {
        group: "edit",
        className: "icon-domain-story-changeDirection",
        title: translate("Change direction"),
        action: {
          // event needs to be addressed
          click: function (event, element) {
            changeDirection(element);
          }
        }
      }
    });
  }
  function addChangeActorTypeMenu(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      replace: {
        group: "edit",
        className: "bpmn-icon-screw-wrench",
        title: translate("Change type"),
        action: {
          click: function (event, element) {
            let position = (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(getReplaceMenuPosition(element), {
              cursor: {
                x: event.x,
                y: event.y
              }
            });
            popupMenu.open(element, "ds-replace", position);
          }
        }
      }
    });
  }
  function addColorChange(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      colorChange: {
        group: "edit",
        className: "icon-domain-story-color-picker",
        title: translate("Change color"),
        action: {
          click: function (event, element) {
            document.dispatchEvent(new CustomEvent("openColorPicker"));
          }
        }
      }
    });
  }
  function addTextAnnotation(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      "append.text-annotation": appendAction(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION, "bpmn-icon-text-annotation", "textannotation", "connect")
    });
  }
  function addConnectWithActivity(actions, startConnect) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      connect: {
        group: "connect",
        className: "bpmn-icon-connection",
        title: translate("Connect with activity"),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      }
    });
  }
  function addWorkObjects(appendAction, actions) {
    let workObjectTypes = iconDictionaryService.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
    workObjectTypes.keysArray().forEach(workObjectType => {
      let name = workObjectType;
      let icon = iconDictionaryService.getIconForBPMN(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, workObjectType);
      let action = [];
      action["append.workObject" + name] = appendAction(`${src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT}${workObjectType}`, icon, name, "workObjects");
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, action);
    });
  }
  function addActors(appendAction, actions) {
    let actorTypes = iconDictionaryService.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
    actorTypes.keysArray().forEach(actorType => {
      let name = actorType;
      let icon = iconDictionaryService.getIconForBPMN(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, actorType);
      let action = [];
      action["append.actor" + name] = appendAction(`${src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR}${actorType}`, icon, name, "actors");
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, action);
    });
  }
  function addChangeWorkObjectTypeMenu(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, {
      replace: {
        group: "edit",
        className: "bpmn-icon-screw-wrench",
        title: translate("Change type"),
        action: {
          click: function (event, element) {
            let position = (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(getReplaceMenuPosition(element), {
              cursor: {
                x: event.x,
                y: event.y
              }
            });
            popupMenu.open(element, "ds-replace", position);
          }
        }
      }
    });
  }
  function changeDirection(element) {
    let context;
    let businessObject = element.businessObject;
    let newNumber;
    if (element.source.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR)) {
      newNumber = 0;
    } else {
      newNumber = (0,_numbering_numbering__WEBPACK_IMPORTED_MODULE_1__.generateAutomaticNumber)(element, commandStack);
    }
    context = {
      businessObject: businessObject,
      newNumber: newNumber,
      element: element
    };
    commandStack.execute("activity.directionChange", context);
  }
  function getReplaceMenuPosition(element) {
    let Y_OFFSET = 5;
    let diagramContainer = canvas.getContainer(),
      pad = contextPad.getPad(element).html;
    let diagramRect = diagramContainer.getBoundingClientRect(),
      padRect = pad.getBoundingClientRect();
    let top = padRect.top - diagramRect.top;
    let left = padRect.left - diagramRect.left;
    return {
      x: left,
      y: top + padRect.height + Y_OFFSET
    };
  }
  /**
   * create an append action
   *
   * @param {String} type
   * @param {String} className
   * @param {String} [title]
   * @param {String} group
   * @param {Object} [options]
   *
   * @return {Object} descriptor
   */
  function appendAction(type, className, title, group, options) {
    if (typeof title !== "string") {
      options = title;
      title = translate("{type}", {
        type: type.replace(/^domainStory:/, "")
      });
    }
    function appendStart(event, element) {
      let shape = elementFactory.createShape((0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)({
        type: type
      }, options));
      let context = {
        elements: [shape],
        hints: {},
        source: element
      };
      create.start(event, shape, context);
    }
    return {
      group: group,
      className: className,
      title: "Append " + title,
      action: {
        dragstart: startConnect,
        click: appendStart
      }
    };
  }
  function getSelectedBusinessObject(event) {
    return {
      businessObject: selectedElement.businessObject,
      newColor: event.detail.color,
      element: selectedElement
    };
  }
  function executeCommandStack(event) {
    const selectedBusinessObject = getSelectedBusinessObject(event);
    commandStack.execute("element.colorChange", selectedBusinessObject);
    dirtyFlagService.makeDirty();
  }
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryContextPadProvider, bpmn_js_lib_features_context_pad_ContextPadProvider__WEBPACK_IMPORTED_MODULE_4__["default"]);
DomainStoryContextPadProvider.$inject = ["injector", "connect", "translate", "elementFactory", "create", "canvas", "contextPad", "popupMenu", "replaceMenuProvider", "commandStack", "eventBus", "modeling"];

/***/ }),

/***/ 89467:
/*!**************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/domainStoryElementFactory.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryElementFactory)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bpmn-js/lib/util/LabelUtil */ 81454);
/* harmony import */ var _domainStoryIdFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domainStoryIdFactory */ 69664);







/**
 * A custom factory that knows how to create BPMN _and_ custom elements.
 */
function DomainStoryElementFactory(bpmnFactory, moddle) {
  bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, bpmnFactory, moddle);
  let self = this;
  let domainStoryIdFactory = new _domainStoryIdFactory__WEBPACK_IMPORTED_MODULE_1__["default"]();
  /**
   * create a diagram-js element with the given type (any of shape, connection, label).
   *
   * @param  {String} elementType
   * @param  {Object} attrs
   *
   * @return {djs.model.Base}
   */
  this.create = function (elementType, attrs) {
    let type = attrs.type;
    if (elementType === "label") {
      return self.baseCreate(elementType, (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)({
        type: "label"
      }, bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_LABEL_SIZE, attrs));
    }
    // add type to businessObject if custom
    if (/^domainStory:/.test(type)) {
      if (!attrs.businessObject) {
        attrs.businessObject = {
          type: type,
          name: attrs.name ? attrs.name : ""
        };
      }
      if (attrs.id) {
        domainStoryIdFactory.registerId(attrs.id);
      } else {
        attrs.id = domainStoryIdFactory.getId(elementType);
      }
      (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs.businessObject, {
        id: attrs.id
      });
      let id = attrs.id;
      attrs.businessObject.get = function (key) {
        if (key === "id") {
          return id;
        }
      };
      attrs.businessObject.set = function (key, value) {
        if (key === "id") {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs.businessObject, {
            id: value
          });
        }
      };
      if (!attrs.businessObject.$type) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs.businessObject, {
          $type: "Element"
        });
      }
      (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs.businessObject, {
        di: {}
      });
      if (!attrs.businessObject.$descriptor) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs.businessObject, {
          $descriptor: {}
        });
      }
      // add width and height if shape
      if ((!/:activity$/.test(type) || !/:connection$/.test(type)) && !(/:group$/.test(type) && attrs.height || attrs.width)) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(attrs, self._getCustomElementSize(type));
      }
      if (!("$instanceOf" in attrs.businessObject)) {
        // ensure we can use ModelUtil#is for type checks
        Object.defineProperty(attrs.businessObject, "$instanceOf", {
          value: function (type) {
            return this.type === type;
          }
        });
      }
      return self.baseCreate(elementType, attrs);
    }
    return self.createBpmnElement(elementType, attrs);
  };
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryElementFactory, bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_2__["default"]);
DomainStoryElementFactory.$inject = ["bpmnFactory", "moddle"];
/**
 * returns the default size of custom shapes.
 *
 * the following example shows an interface on how
 * to setup the custom shape's dimensions.
 * *
 * @param {String} type
 *
 * @return {Dimensions} a {width, height} object representing the size of the element
 */
DomainStoryElementFactory.prototype._getCustomElementSize = function (type) {
  let shapes = {
    __default: {
      width: 75,
      height: 75
    },
    "domainStory:textAnnotation": {
      width: 100,
      height: 30
    },
    "domainStory:group": {
      width: 525,
      height: 275
    }
  };
  return shapes[type] || shapes.__default;
};
class Dimensions {}

/***/ }),

/***/ 69664:
/*!*********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/domainStoryIdFactory.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsId: () => (/* binding */ containsId),
/* harmony export */   "default": () => (/* binding */ DomainStoryIdFactory)
/* harmony export */ });


let idList = [];
function DomainStoryIdFactory() {}
DomainStoryIdFactory.prototype.getId = function (type) {
  return generateId(type);
};
DomainStoryIdFactory.prototype.registerId = function (id) {
  idList.push(id);
};
function generateId(type) {
  let idNumber = fourDigitsId();
  let id = type + "_" + idSuffix(idNumber);
  while (containsId(id)) {
    idNumber++;
    id = type + "_" + idSuffix(idNumber);
  }
  idList.push(id);
  return id;
}
function idSuffix(idNumber) {
  let id;
  if (idNumber > 9999) {
    id = 0;
  } else if (idNumber < 10) {
    id = "000" + idNumber;
  } else if (idNumber < 100) {
    id = "00" + idNumber;
  } else if (idNumber < 1000) {
    id = "0" + idNumber;
  } else {
    id = "" + idNumber;
  }
  return id;
}
function fourDigitsId() {
  return Math.floor(Math.random() * 10000);
}
function containsId(id) {
  let same = false;
  idList.forEach(element => {
    if (id === element) {
      same = true;
    }
  });
  return same;
}

/***/ }),

/***/ 10282:
/*!********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/domainStoryRenderer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRenderer),
/* harmony export */   initializeRenderer: () => (/* binding */ initializeRenderer)
/* harmony export */ });
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! diagram-js/lib/draw/BaseRenderer */ 14694);
/* harmony import */ var ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ids */ 70678);
/* harmony import */ var _labeling_dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./labeling/dsLabelEditingPreview */ 34970);
/* harmony import */ var diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! diagram-js/lib/util/RenderUtil */ 96546);
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tiny-svg */ 57491);
/* harmony import */ var min_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! min-dom */ 73599);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./labeling/dsLabelEditingProvider */ 48153);
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./numbering/numbering */ 93043);
/* harmony import */ var _labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./labeling/dsLabelUtil */ 2970);
/* harmony import */ var _labeling_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./labeling/position */ 7248);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Utils/mathExtensions */ 114);
















let RENDERER_IDS = new ids__WEBPACK_IMPORTED_MODULE_1__["default"]();
let numbers = [];
const DEFAULT_COLOR = "black";
/**
 * a renderer that knows how to render custom elements.
 */
let _iconDictionaryService;
let _elementRegistryService;
let _dirtyFlagService;
function initializeRenderer(iconDictionaryService, elementRegistryService, dirtyFlagService) {
  _iconDictionaryService = iconDictionaryService;
  _elementRegistryService = elementRegistryService;
  _dirtyFlagService = dirtyFlagService;
}
function DomainStoryRenderer(eventBus, styles, canvas, textRenderer, pathMap, commandStack) {
  diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_9__["default"].call(this, eventBus, 2000);
  let rendererId = RENDERER_IDS.next();
  let markers = {};
  let computeStyle = styles.computeStyle;
  // generate the automatic Number for an activity originating from an actor
  function generateActivityNumber(parentGfx, element, box) {
    // whenever we want to edit an activity, it gets redrawn as a new object
    // and the custom information is lost,
    // so we stash it before the editing occurs and set the value here
    let numberStash = (0,_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__.getNumberStash)();
    let semantic = element.businessObject;
    if (numberStash.use) {
      semantic.number = numberStash.number;
    }
    numbers[semantic.number] = true;
    box.x -= 26;
    box.y -= 16;
    if (semantic.number < 10) {
      box.x += 3;
    }
    let newRenderedNumber = renderNumber(parentGfx, semantic.number, numberStyle(box), element.type);
    (0,_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.addNumberToRegistry)(newRenderedNumber, semantic.number);
  }
  // style functions
  function numberStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({}, textRenderer.getExternalStyle(), {
        fill: "black",
        position: "absolute"
      })
    };
  }
  function backgroundBoxStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({}, textRenderer.getExternalStyle(), {
        fill: "black",
        fontSize: 50,
        position: "absolute",
        fontFamily: "Courier New"
      })
    };
  }
  function backgroundDotStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({}, textRenderer.getExternalStyle(), {
        fill: "white",
        fontSize: 150,
        position: "absolute",
        fontFamily: "Courier"
      })
    };
  }
  // render functions
  // render label associated with actors and workobjects
  function renderEmbeddedLabel(parentGfx, element, align, padding) {
    let businessObject = element.businessObject;
    return renderLabel(parentGfx, businessObject.name, {
      box: element,
      align: align,
      padding: padding ? padding : 0,
      style: {
        fill: "#000000"
      }
    }, element.type);
  }
  // render label associated with activities
  function renderExternalLabel(parentGfx, element) {
    let semantic = element.businessObject;
    let waypoints = element.waypoints;
    let lines = (0,_labeling_position__WEBPACK_IMPORTED_MODULE_6__.countLines)(semantic.name);
    if (element.waypoints != null) {
      let position = (0,_labeling_position__WEBPACK_IMPORTED_MODULE_6__.labelPosition)(waypoints, lines);
      let startPoint = element.waypoints[position.selected];
      let endPoint = element.waypoints[position.selected + 1];
      let angle = (0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_8__.angleBetween)(startPoint, endPoint);
      let alignment = "left";
      let boxWidth = 500;
      let xStart = position.x;
      // if the activity is horizontal, we want to center the label
      if (angle === 0 || angle === 180) {
        boxWidth = Math.abs(startPoint.x - endPoint.x);
        alignment = "center";
        xStart = (startPoint.x + endPoint.x) / 2 - (0,_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_5__.calculateTextWidth)(semantic.name);
      }
      let box = {
        textAlign: alignment,
        width: boxWidth,
        height: 30,
        x: xStart,
        y: position.y
      };
      if (semantic.name && semantic.name.length) {
        return renderLabel(parentGfx, semantic.name, {
          box: box,
          fitBox: true,
          style: (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({}, textRenderer.getExternalStyle(), {
            fill: "black",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            hyphens: "auto"
          })
        }, element.type);
      }
    }
  }
  // render the number associated with an activity
  function renderExternalNumber(parentGfx, element) {
    if (element && element.source) {
      let semantic = element.businessObject;
      let box = (0,_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.numberBoxDefinitions)(element);
      if (semantic.number == null && element.source.type && element.source.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
        (0,_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.generateAutomaticNumber)(element, commandStack);
      }
      // render the background for the number
      if (semantic.number && element.source.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
        generateActivityNumber(parentGfx, element, box);
      } else {
        semantic.number = null;
      }
    }
  }
  // render a number on the canvas
  function renderNumber(parentGfx, number, options, type) {
    if (number < 10) {
      number = String(number);
    }
    number = String(number);
    let text = textRenderer.createText(number || "", options);
    let height = 0;
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.classes)(text).add("djs-labelNumber");
    setCoordinates(type, text, options, height, parentGfx);
    // !IMPORTANT!
    // When converting svg-files via Inkscape or Photoshop the svg-circle is converted to a black dot that obscures the number.
    // To circumvent this, we draw an arc.
    let circle = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("path");
    let radius = 11;
    let x = options.box.x + 18 + (number > 9 ? 3 : 0);
    let y = options.box.y - radius + 7;
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(circle, {
      d: `
      M ${x} ${y}
      m ${radius},0
      a ${radius},${radius} 0 1,0 ${-radius * 2},0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      `,
      fill: "white",
      stroke: "black"
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parentGfx, circle);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parentGfx, text);
    return text;
  }
  // the coordinates of the activity label must be set directly and will not be taken from the box
  function setCoordinates(type, text, options, height, parentGfx) {
    if (/:activity$/.test(type)) {
      text.innerHTML = manipulateInnerHTMLXLabel(text.children, options.box.x, 0);
      text.innerHTML = manipulateInnerHTMLYLabel(text.children, options.box.y, 0);
    } else if (/:actor/.test(type)) {
      height = parentGfx.firstChild.attributes.height.nodeValue;
      text.innerHTML = manipulateInnerHTMLYLabel(text.children, height, 0);
    } else if (/:workObject/.test(type)) {
      height = parentGfx.firstChild.attributes.height.nodeValue;
      text.innerHTML = manipulateInnerHTMLYLabel(text.children, height, 26);
    }
  }
  // render a label on the canvas
  function renderLabel(parentGfx, label, options, type) {
    let text = textRenderer.createText(label || "", options);
    let height = 0;
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.classes)(text).add("djs-label");
    setCoordinates(type, text, options, height, parentGfx);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parentGfx, text);
    return text;
  }
  // determine the Y-coordinate of the label / number to be rendered
  function manipulateInnerHTMLYLabel(children, y, offset) {
    if (children) {
      let result = "";
      for (let i = 0; i < children.length; i++) {
        result += children[i].outerHTML.replace(/y="-?\d*.\d*"/, 'y="' + (Number(y) + offset + 14 * i) + '"');
      }
      return result;
    }
  }
  // determine the X-coordinate of the label / number to be rendered
  function manipulateInnerHTMLXLabel(children, x, offset) {
    if (children) {
      let result = "";
      for (let i = 0; i < children.length; i++) {
        result += children[i].outerHTML.replace(/x="-?\d*.\d*"/, 'x="' + (Number(x) + offset + 14) + '"');
      }
      return result;
    }
  }
  // draw functions
  this.drawGroup = function (parentGfx, element) {
    if (!element.businessObject.pickedColor) {
      element.businessObject.pickedColor = DEFAULT_COLOR;
    }
    let rect = drawRect(parentGfx, element.width, element.height, 0, (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({
      fill: "none",
      stroke: element.businessObject.pickedColor
    }, element.attrs));
    renderEmbeddedLabel(parentGfx, element, "left-top", 8);
    return rect;
  };
  function applyColorToCustomSvgIcon(pickedColor, iconSvg) {
    if (!pickedColor) {
      return iconSvg;
    }
    const [rest, base64Svg] = iconSvg.split("base64,");
    const svg = atob(base64Svg);
    const coloredSvg = applyColorToIcon(pickedColor, svg);
    const encodedColoredSvg = btoa(coloredSvg);
    return rest + "base64," + encodedColoredSvg;
  }
  function applyColorToIcon(pickedColor = DEFAULT_COLOR, iconSvg) {
    const match = iconSvg.match(/fill="(?!none).*?"/);
    if (match && match.length > 0) {
      return iconSvg.replaceAll(/fill="(?!none).*?"/g, 'fill="' + pickedColor + '"');
    } else {
      const index = iconSvg.indexOf("<svg ") + 5;
      return iconSvg.substring(0, index) + ' fill=" ' + pickedColor + '" ' + iconSvg.substring(index);
    }
  }
  function getIconSvg(iconSvg, element) {
    const pickedColor = element.businessObject.pickedColor;
    let isCustomIcon = iconSvg.startsWith("data") && src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.isCustomType(element.type);
    if (isCustomIcon) {
      const svg = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.isCustomSvgType(element.type) ? applyColorToCustomSvgIcon(pickedColor, iconSvg) : iconSvg;
      return '<svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<image width="24" height="24" xlink:href="' + svg + '"/></svg>';
    } else {
      return applyColorToIcon(pickedColor, iconSvg);
    }
  }
  this.drawActor = function (parent, element) {
    let svgDynamicSizeAttributes = {
      width: element.width,
      height: element.height
    };
    let iconSRC = _iconDictionaryService.getTypeIconSRC(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    let actor = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(actor, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parent, actor);
    renderEmbeddedLabel(parent, element, "center", -5);
    return actor;
  };
  this.drawWorkObject = function (parent, element) {
    let svgDynamicSizeAttributes = {
        width: element.width * 0.65,
        height: element.height * 0.65,
        x: element.width / 2 - 25,
        y: element.height / 2 - 25
      },
      workObject;
    let iconSRC = _iconDictionaryService.getTypeIconSRC(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    workObject = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(workObject, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parent, workObject);
    renderEmbeddedLabel(parent, element, "center", -5);
    return workObject;
  };
  function useColorForActivity(element) {
    if (!element.businessObject.pickedColor) {
      element.businessObject.pickedColor = "black";
    }
    let attrs = "";
    return computeStyle(attrs, {
      stroke: element.businessObject.pickedColor,
      fill: "none",
      strokeWidth: 1.5,
      strokeLinejoin: "round",
      markerEnd: marker("activity", "black", element.businessObject.pickedColor)
    });
  }
  this.drawActivity = function (p, element) {
    adjustForTextOverlap(element);
    if (element) {
      let attrs = useColorForActivity(element);
      let x = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.createLine)(element.waypoints, attrs));
      renderExternalLabel(p, element);
      renderExternalNumber(p, element);
      // just adjusting the start- and endpoint of the connection-element moves only the drawn connection,
      // not the interactive line. This can be fixed by manually overriding the points of the interactive polyline
      // in the HTMl with the points of the drawn one.
      // this however does not adjust the surrounding box of the connection.
      fixConnectionInHTML(p.parentElement);
      return x;
    }
  };
  function checkIfPointOverlapsText(point, source) {
    if (point.y > source.y + 60) {
      if (point.x > source.x + 3 && point.x < source.x + 72) {
        let lineOffset = getLineOffset(source);
        if (source.y + 75 + lineOffset > point.y) {
          point.y += lineOffset;
        }
      }
    }
  }
  function adjustForTextOverlap(element) {
    let source = element.source;
    let target = element.target;
    let waypoints = element.waypoints;
    let startPoint = waypoints[0];
    let endPoint = waypoints[waypoints.length - 1];
    if (startPoint && endPoint && source && target) {
      checkIfPointOverlapsText(startPoint, source);
      checkIfPointOverlapsText(endPoint, source);
    }
  }
  function getLineOffset(element) {
    let id = element.id;
    let offset = 0;
    let objects = document.getElementsByClassName("djs-element djs-shape");
    for (let i = 0; i < objects.length; i++) {
      let data_id = objects.item(i).getAttribute("data-element-id");
      if (data_id === id) {
        let object = objects.item(i);
        let text = object.getElementsByTagName("text")[0];
        let tspans = text.getElementsByTagName("tspan");
        let tspan = tspans[tspans.length - 1];
        offset = tspan.getAttribute("y");
      }
    }
    return offset - 70;
  }
  function fixConnectionInHTML(wantedConnection) {
    if (wantedConnection) {
      let polylines = wantedConnection.getElementsByTagName("polyline");
      if (polylines.length > 1) {
        polylines[1].setAttribute("points", polylines[0].getAttribute("points"));
      }
    }
  }
  this.drawDSConnection = function (p, element) {
    let attrs = "";
    attrs = computeStyle(attrs, {
      stroke: "#000000",
      strokeWidth: 1.5,
      strokeLinejoin: "round",
      strokeDasharray: "5, 5"
    });
    return (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.createLine)(element.waypoints, attrs));
  };
  this.drawAnnotation = function (parentGfx, element) {
    let style = {
      fill: "none",
      stroke: "none"
    };
    let text = element.businessObject.text || "";
    if (element.businessObject.text) {
      let height = (0,_labeling_dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__.getAnnotationBoxHeight)();
      if (height === 0 && element.businessObject.number) {
        height = element.businessObject.number;
      }
      (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)(element, {
        height: height
      });
      // for some reason the keyword height is not exported, so we use another, which we know will be exported,
      // to ensure persistent annotation heights between sessions
      (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)(element.businessObject, {
        number: height
      });
    }
    let textElement = drawRect(parentGfx, element.width, element.height, 0, 0, style);
    let textPathData = pathMap.getScaledPath("TEXT_ANNOTATION", {
      xScaleFactor: 1,
      yScaleFactor: 1,
      containerWidth: element.width,
      containerHeight: element.height,
      position: {
        mx: 0.0,
        my: 0.0
      }
    });
    drawPath(parentGfx, textPathData, {
      stroke: "black"
    });
    renderLabel(parentGfx, text, {
      box: element,
      align: "left-top",
      padding: 5,
      style: {
        fill: "black"
      }
    });
    return textElement;
  };
  // draw helper functions
  function drawPath(parentGfx, d, attrs) {
    attrs = computeStyle(attrs, ["no-fill"], {
      strokeWidth: 2,
      stroke: "black"
    });
    let path = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("path");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(path, {
      d: d
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(path, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parentGfx, path);
    return path;
  }
  function drawRect(parentGfx, width, height, r, offset, attrs) {
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_10__.isObject)(offset)) {
      attrs = offset;
      offset = 0;
    }
    offset = offset || 0;
    attrs = computeStyle(attrs, {
      stroke: "black",
      strokeWidth: 2,
      fill: "white"
    });
    let rect = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("rect");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(rect, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(parentGfx, rect);
    return rect;
  }
  // marker functions
  function marker(type, fill, stroke) {
    let id = type + "-" + fill + "-" + stroke + "-" + rendererId;
    if (!markers[id]) {
      createMarker(type, fill, stroke);
    }
    return "url(#" + id + ")";
  }
  function createMarker(type, fill, stroke) {
    let id = type + "-" + fill + "-" + stroke + "-" + rendererId;
    if (type === "activity") {
      let sequenceflowEnd = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("path");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(sequenceflowEnd, {
        d: "M 1 5 L 11 10 L 1 15 Z"
      });
      addMarker(id, {
        element: sequenceflowEnd,
        ref: {
          x: 11,
          y: 10
        },
        scale: 0.5,
        attrs: {
          fill: stroke,
          stroke: stroke
        }
      });
    }
  }
  function addMarker(id, options) {
    let attrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)({
      fill: "black",
      strokeWidth: 1,
      strokeLinecap: "round",
      strokeDasharray: "none"
    }, options.attrs);
    let ref = options.ref || {
      x: 0,
      y: 0
    };
    let scale = options.scale || 1;
    // resetting stroke dash array
    if (attrs.strokeDasharray === "none") {
      attrs.strokeDasharray = [10000, 1];
    }
    let marker = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("marker");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(options.element, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(marker, options.element);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.attr)(marker, {
      id: id,
      viewBox: "0 0 20 20",
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: "auto"
    });
    let defs = (0,min_dom__WEBPACK_IMPORTED_MODULE_13__.query)("defs", canvas._svg);
    if (!defs) {
      defs = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.create)("defs");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(canvas._svg, defs);
    }
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_11__.append)(defs, marker);
    markers[id] = marker;
  }
  // path functions
  this.getWorkObjectPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.componentsToPath)(rectangle);
  };
  this.getGroupPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.componentsToPath)(rectangle);
  };
  this.getActivityPath = function (connection) {
    let waypoints = connection.waypoints.map(function (p) {
      return p.original || p;
    });
    let activityPath = [["M", waypoints[0].x, waypoints[0].y]];
    waypoints.forEach(function (waypoint, index) {
      if (index !== 0) {
        activityPath.push(["L", waypoint.x, waypoint.y]);
      }
    });
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.componentsToPath)(activityPath);
  };
  this.getActorPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_12__.componentsToPath)(rectangle);
  };
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryRenderer, diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_9__["default"]);
DomainStoryRenderer.$inject = ["eventBus", "styles", "canvas", "textRenderer", "pathMap", "commandStack"];
DomainStoryRenderer.prototype.canRender = function (element) {
  return /^domainStory:/.test(element.type);
};
DomainStoryRenderer.prototype.drawShape = function (p, element) {
  // polyfill for tests
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
      value: function (search, pos) {
        pos = !pos || pos < 0 ? 0 : +pos;
        return this.substring(pos, pos + search.length) === search;
      }
    });
  }
  let type = element.type;
  element.businessObject.type = type;
  _elementRegistryService.correctInitialize();
  _dirtyFlagService.makeDirty();
  if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
    return this.drawActor(p, element);
  } else if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT)) {
    return this.drawWorkObject(p, element);
  } else if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.TEXTANNOTATION)) {
    return this.drawAnnotation(p, element);
  } else if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.GROUP)) {
    return this.drawGroup(p, element);
  }
};
DomainStoryRenderer.prototype.getShapePath = function (shape) {
  let type = shape.type;
  if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
    return this.getActorPath(shape);
  } else if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT)) {
    return this.getWorkObjectPath(shape);
  } else if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.GROUP)) {
    return this.getGroupPath(shape);
  }
};
DomainStoryRenderer.prototype.drawConnection = function (p, element) {
  let type = element.type;
  _dirtyFlagService.makeDirty();
  // fixes activities that were copy-pasted
  if (!element.businessObject.type) {
    element.businessObject.type = type;
  }
  if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTIVITY) {
    return this.drawActivity(p, element);
  } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.CONNECTION) {
    return this.drawDSConnection(p, element);
  }
};
// creates a SVG path that describes a rectangle which encloses the given shape.
function getRectPath(shape) {
  let offset = 5;
  let x = shape.x,
    y = shape.y,
    width = shape.width / 2 + offset,
    height = shape.height / 2 + offset;
  return [["M", x, y], ["l", width, 0], ["l", width, height], ["l", -width, height], ["l", -width, 0], ["z"]];
}

/***/ }),

/***/ 10798:
/*!*****************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/domainStoryRules.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRules)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! diagram-js/lib/features/rules/RuleProvider */ 19812);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ 19102);







const HIGH_PRIORITY = 1500;
const MIN_SIZE = 125;
function isDomainStory(element) {
  return element && /^domainStory:/.test(element.type);
}
function isDomainStoryGroup(element) {
  return element && /^domainStory:group/.test(element.type);
}
function isActor(element) {
  return element && /^domainStory:actor\w*/.test(element.type);
}
function isWorkObject(element) {
  return element && /^domainStory:workObject/.test(element.type);
}
function isActivity(element) {
  return element && /^domainStory:activity/.test(element.type);
}
function isConnection(element) {
  return element && /^domainStory:connection/.test(element.type);
}
function isAnnotation(element) {
  return element && /^domainStory:textAnnotation/.test(element.type);
}
/**
 * can source and target be connected?
 */
function canConnect(source, target) {
  // only judge about two custom elements
  if (isDomainStoryGroup(target) || !isDomainStory(source) || !isDomainStory(target)) {
    return;
  }
  // do not allow a connection from one element to itself
  if (source === target) {
    return;
  }
  // do not allow a connection between two actors
  if (isActor(source) && isActor(target)) {
    return;
  }
  // do not allow a connection, where the source or target is an activity
  if (isActivity(source) || isActivity(target)) {
    return;
  }
  // do not allow a connection, where the source or target is an annotation connection
  if (isConnection(source) || isConnection(target)) {
    return;
  }
  // do not allow a connection to a connection(the special type of connection between an element and a comment box)
  // when the target is an annotation, the connection type is an annotation connection instead of an activity
  if (isAnnotation(target)) {
    return {
      type: src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.CONNECTION
    };
  }
  return {
    type: src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY
  };
}
function canResize(shape, newBounds) {
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(shape, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.GROUP)) {
    if (newBounds) {
      let lowerLeft = {
        x: shape.x,
        y: shape.y + shape.height
      };
      let lowerRight = {
        x: shape.x + shape.width,
        y: shape.y + shape.height
      };
      let upperRight = {
        x: shape.x + shape.width,
        y: shape.y
      };
      if (newBounds.x !== shape.x && newBounds.y !== shape.y) {
        // upper left
        if (newBounds.x > lowerRight.x - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
            x: lowerRight.x - MIN_SIZE
          });
        }
        if (newBounds.y > lowerRight.y - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
            y: lowerRight.y - MIN_SIZE
          });
        }
      }
      if (newBounds.x !== shape.x && newBounds.y === shape.y) {
        // lower left
        if (newBounds.x > upperRight.x - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
            x: upperRight.x - MIN_SIZE
          });
        }
      }
      if (newBounds.x === shape.x && newBounds.y !== shape.y) {
        // upper right
        if (newBounds.y > lowerLeft.y - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
            y: lowerLeft.y - MIN_SIZE
          });
        }
      }
      if (newBounds.height < MIN_SIZE) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
          height: MIN_SIZE
        });
      }
      if (newBounds.width < MIN_SIZE) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(newBounds, {
          width: MIN_SIZE
        });
      }
    }
    return true;
  }
  return false;
}
function canAttach(elements, target, source) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  // disallow appending as boundary event
  if (source) {
    return false;
  }
  // only (re-)attach one element at a time
  if (elements.length !== 1) {
    return false;
  }
  // allow default move operation
  if (!target) {
    return true;
  }
  // only allow drop on DomainStory Elements
  if (!isDomainStory(target)) {
    return false;
  }
  return "attach";
}
function canConnectToAnnotation(source, target, connection) {
  // do not allow an activity connect to an annotation
  if (isActivity(connection) && isAnnotation(target)) {
    return false;
  }
  // do not allow an annotation connection between two annotations
  if (isConnection(connection) && isAnnotation(source) && isAnnotation(target)) {
    return false;
  }
  // do not allow an annotation connection between an actor or workObject and anything except an annotation
  return !(isConnection(connection) && !isAnnotation(target) && (isActor(source) || isWorkObject(source)));
}
/**
 * specific rules for custom elements
 */
function DomainStoryRules(eventBus) {
  diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_4__["default"].call(this, eventBus);
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryRules, diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_4__["default"]);
DomainStoryRules.$inject = ["eventBus"];
DomainStoryRules.prototype.init = function () {
  /**
   * can shape be created on target container?
   */
  function canCreate(shape, target) {
    // only judge about custom elements
    if (!isDomainStory(shape)) {
      return;
    }
    // allow creation just on groups
    return !isDomainStory(target) || isDomainStoryGroup(target);
  }
  this.addRule("elements.create", function (context) {
    const elements = context.elements,
      position = context.position,
      target = context.target;
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.every)(elements, function (element) {
      if (isConnection(element)) {
        return canConnect(element.source, element.target, element);
      }
      if (element.host) {
        return canAttach(element, element.host, null, position);
      }
      return canCreate(element, target, null, position);
    });
  });
  this.addRule("elements.move", HIGH_PRIORITY, function (context) {
    let target = context.target,
      shapes = context.shapes;
    let type;
    // do not allow mixed movements of custom / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    // reject, if we have at least one
    // custom element that cannot be moved
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.reduce)(shapes, function (result, s) {
      if (type === undefined) {
        type = isDomainStory(s);
      }
      if (type !== isDomainStory(s) || result === false) {
        return false;
      }
      return canCreate(s, target);
    }, undefined);
  });
  this.addRule("shape.create", HIGH_PRIORITY, function (context) {
    let target = context.target,
      shape = context.shape;
    return canCreate(shape, target);
  });
  this.addRule("connection.create", HIGH_PRIORITY, function (context) {
    let source = context.source,
      target = context.target;
    return canConnect(source, target);
  });
  this.addRule("connection.reconnect", HIGH_PRIORITY, function (context) {
    let connection = context.connection,
      source = context.hover || context.source,
      target = context.target;
    // --------------------------------------------------------------
    let result = canConnectToAnnotation(source, target, connection);
    if (!result) {
      return;
    }
    // --------------------------------------------------------------
    return canConnect(source, target, connection);
  });
  this.addRule("shape.resize", function (context) {
    let shape = context.shape,
      newBounds = context.newBounds;
    return canResize(shape, newBounds);
  });
};
DomainStoryRules.prototype.canConnect = canConnect;
DomainStoryRules.prototype.canAttach = canAttach;
DomainStoryRules.prototype.isDomainStory = isDomainStory;
DomainStoryRules.prototype.canResize = canResize;

/***/ }),

/***/ 41360:
/*!*******************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/domainStoryUpdater.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryUpdater)
/* harmony export */ });
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/command/CommandInterceptor */ 35353);
/* harmony import */ var diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! diagram-js/lib/util/Collections */ 39233);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ 19102);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Domain/Common/elementTypes */ 30236);








/**
 * a handler responsible for updating the custom element's businessObject
 * once changes on the diagram happen.
 */
function DomainStoryUpdater(eventBus, bpmnjs) {
  diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, eventBus);
  function updateCustomElement(e) {
    let context = e.context,
      shape = context.shape,
      businessObject = shape.businessObject;
    if (!shape || !shape.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.DOMAINSTORY)) {
      return;
    }
    let parent = shape.parent;
    let customElements = bpmnjs._customElements;
    // make sure element is added / removed from bpmnjs.customElements
    if (!parent) {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_4__.remove)(customElements, businessObject);
    } else {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_4__.add)(customElements, businessObject);
    }
    // save custom element position
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.pick)(shape, ["x", "y"]));
    // save custom element size if resizable
    if (shape.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP) {
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.pick)(shape, ["height", "width"]));
      // rework the child-parent relations if a group was moved, such that all Objects that are visually in the group are also associated with it
      // since we do not have access to the standard-canvas object here, we cannot use the function correctGroupChildren() from DSLabelUtil
      if (parent != null) {
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.reworkGroupElements)(parent, shape);
      }
    }
    if (shape && shape.parent && "type" in shape.parent && shape.parent.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP) {
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, {
        parent: shape.parent.id
      });
    }
  }
  function updateCustomConnection(e) {
    let context = e.context,
      connection = context.connection,
      source = connection.source,
      target = connection.target,
      businessObject = connection.businessObject;
    if (e.newTarget) {
      target = e.newTarget;
    }
    if (e.newSource) {
      source = e.newSource;
    }
    let parent = connection.parent;
    let customElements = bpmnjs._customElements;
    // make sure element is added / removed from bpmnjs.customElements
    if (!parent) {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_4__.remove)(customElements, businessObject);
    } else {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_4__.add)(customElements, businessObject);
    }
    // update waypoints
    (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, {
      waypoints: copyWaypoints(connection)
    });
    if (source) {
      if (!businessObject.source) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, {
          source: source.id
        });
      } else {
        businessObject.source = source.id;
      }
    }
    if (target) {
      if (!businessObject.target) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, {
          target: target.id
        });
      } else {
        businessObject.target = target.id;
      }
    }
  }
  function copyWaypoints(connection) {
    return connection.waypoints.map(function (p) {
      if (p.original) {
        return {
          original: {
            x: p.original.x,
            y: p.original.y
          },
          x: p.x,
          y: p.y
        };
      } else {
        return {
          x: p.x,
          y: p.y
        };
      }
    });
  }
  this.executed(["shape.create", "shape.move", "shape.delete", "shape.resize", "shape.removeGroupWithChildren"], ifDomainStoryElement(updateCustomElement));
  this.reverted(["shape.create", "shape.move", "shape.delete", "shape.resize", "shape.removeGroupWithChildren"], ifDomainStoryElement(updateCustomElement));
  this.executed(["connection.create", "connection.reconnect", "connection.updateWaypoints", "connection.delete", "connection.layout", "connection.move"], ifDomainStoryElement(updateCustomConnection));
  this.reverted(["connection.create", "connection.reconnect", "connection.updateWaypoints", "connection.delete", "connection.layout", "connection.move"], ifDomainStoryElement(updateCustomConnection));
}
// check if element in the context of an event is a domainStory element
function ifDomainStoryElement(fn) {
  return event => {
    const context = event.context;
    const element = context.shape || context.connection;
    if (isDomainStory(element)) {
      fn(event);
    }
  };
}
function isDomainStory(element) {
  return element && /domainStory:/.test(element.type);
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryUpdater, diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_3__["default"]);
DomainStoryUpdater.$inject = ["eventBus", "bpmnjs"];

/***/ }),

/***/ 9212:
/*!******************************************!*\
  !*** ./src/app/BPMN-JS/modeler/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domainStoryElementFactory */ 89467);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domainStoryRenderer */ 10282);
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./palette/domainStoryPalette */ 97774);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domainStoryRules */ 10798);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domainStoryUpdater */ 41360);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bpmn-js/lib/draw/PathMap */ 56089);
/* harmony import */ var bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bpmn-js/lib/features/popup-menu */ 30918);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateHandler/updateLabelHandler */ 31401);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateHandler/headlineAndDescriptionUpdateHandler */ 33524);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context-pad/domainStoryContextPadProvider */ 48640);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./change-icon/replaceMenuProvider */ 2843);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modeling/dSModeling */ 8070);


















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__["default"], diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__["default"], bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__["default"]],
  __init__: ["domainStoryRenderer", "paletteProvider", "domainStoryRules", "domainStoryUpdater", "contextPadProvider", "replaceMenuProvider"],
  elementFactory: ["type", _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_0__["default"]],
  domainStoryRenderer: ["type", _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]],
  paletteProvider: ["type", _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_2__["default"]],
  domainStoryRules: ["type", _domainStoryRules__WEBPACK_IMPORTED_MODULE_3__["default"]],
  domainStoryUpdater: ["type", _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_4__["default"]],
  contextPadProvider: ["type", _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_7__["default"]],
  elementFactoryBpmn: ["type", bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__["default"]],
  pathMap: ["type", bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__["default"]],
  replaceMenuProvider: ["type", _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_5__["default"]],
  headlineAndDescriptionUpdateHandler: ["type", _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_6__["default"]],
  modeling: ["type", _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_9__["default"]]
});

/***/ }),

/***/ 34970:
/*!*******************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/labeling/dsLabelEditingPreview.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingPreview),
/* harmony export */   getAnnotationBoxHeight: () => (/* binding */ getAnnotationBoxHeight)
/* harmony export */ });
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-svg */ 57491);
/* harmony import */ var diagram_js_lib_util_SvgTransformUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/util/SvgTransformUtil */ 81384);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ 19102);






const MARKER_HIDDEN = "djs-element-hidden",
  MARKER_LABEL_HIDDEN = "djs-label-hidden";
let annotationBoxHeight = 0;
function getAnnotationBoxHeight() {
  return annotationBoxHeight;
}
function DSLabelEditingPreview(eventBus, canvas, pathMap) {
  let self = this;
  let defaultLayer = canvas.getDefaultLayer();
  let element, absoluteElementBBox, gfx;
  eventBus.on("directEditing.activate", function (context) {
    let activeProvider = context.active;
    element = activeProvider.element.label || activeProvider.element;
    // text annotation
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
      absoluteElementBBox = canvas.getAbsoluteBBox(element);
      gfx = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("g");
      annotationBoxHeight = element.height;
      let textPathData = pathMap.getScaledPath("TEXT_ANNOTATION", {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: element.height,
        position: {
          mx: 0.0,
          my: 0.0
        }
      });
      let path = self.path = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("path");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.attr)(path, {
        d: textPathData,
        strokeWidth: 2,
        stroke: getStrokeColor(element)
      });
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(gfx, path);
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(defaultLayer, gfx);
      (0,diagram_js_lib_util_SvgTransformUtil__WEBPACK_IMPORTED_MODULE_3__.translate)(gfx, element.x, element.y);
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION) || element.labelTarget) {
      canvas.addMarker(element, MARKER_HIDDEN);
    } else if (element.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR) || element.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) || element.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) || element.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
      canvas.addMarker(element, MARKER_LABEL_HIDDEN);
    }
  });
  eventBus.on("directEditing.resize", function (context) {
    // text annotation
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
      let height = context.height,
        dy = context.dy;
      let newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);
      annotationBoxHeight = newElementHeight;
      let textPathData = pathMap.getScaledPath("TEXT_ANNOTATION", {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: newElementHeight,
        position: {
          mx: 0.0,
          my: 0.0
        }
      });
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.attr)(self.path, {
        d: textPathData
      });
    }
  });
  eventBus.on(["directEditing.complete", "directEditing.cancel"], function (context) {
    let activeProvider = context.active;
    if (activeProvider) {
      canvas.removeMarker(activeProvider.element.label || activeProvider.element, MARKER_HIDDEN);
      canvas.removeMarker(element, MARKER_LABEL_HIDDEN);
    }
    element = undefined;
    absoluteElementBBox = undefined;
    if (gfx) {
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.remove)(gfx);
      gfx = undefined;
    }
  });
}
DSLabelEditingPreview.$inject = ["eventBus", "canvas", "pathMap"];
// helpers ///////////////////
function getStrokeColor() {
  return "black";
}

/***/ }),

/***/ 48153:
/*!********************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/labeling/dsLabelEditingProvider.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingProvider),
/* harmony export */   focusElement: () => (/* binding */ focusElement),
/* harmony export */   getNumberStash: () => (/* binding */ getNumberStash),
/* harmony export */   initializeLabelEditingProvider: () => (/* binding */ initializeLabelEditingProvider),
/* harmony export */   toggleStashUse: () => (/* binding */ toggleStashUse)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsLabelUtil */ 2970);
/* harmony import */ var bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/util/ModelingUtil */ 4525);
/* harmony import */ var bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bpmn-js/lib/util/LabelUtil */ 81454);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ 19102);








let dictionaryService;
let numberStash = 0;
let stashUse = false;
function initializeLabelEditingProvider(labelingDictionary) {
  dictionaryService = labelingDictionary;
}
function getNumberStash() {
  let number = {
    use: stashUse,
    number: numberStash
  };
  stashUse = false;
  return number;
}
function toggleStashUse(use) {
  stashUse = use;
}
function focusElement(element) {
  // Opening a Angular Dialog seems to mess with the focus logic somehow.
  // My guess is that is makes the mousedown event passive, which prevents "preventDefault" from intercepting.
  // I am not sure how to fix it, but this seems to be a workaround.
  setTimeout(() => element.focus(), 0);
}
function DSLabelEditingProvider(eventBus, canvas, directEditing, modeling, resizeHandles, textRenderer, updateLabelHandler) {
  this._canvas = canvas;
  this._modeling = modeling;
  this._textRenderer = textRenderer;
  this._updateLabelHandler = updateLabelHandler;
  directEditing.registerProvider(this);
  // listen to dblclick on non-root elements
  eventBus.on("element.dblclick", function (event) {
    activateDirectEdit(event.element, true);
    if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(event.element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY)) {
      // if we edit an activity, we do not want the standard editing box
      numberStash = event.element.businessObject.number;
      stashUse = true;
      directEditing.complete();
    }
  });
  // complete on followup canvas operation
  eventBus.on(["element.mousedown", "drag.init", "canvas.viewbox.changing", "autoPlace", "popupMenu.open"], function () {
    if (directEditing.isActive()) {
      directEditing.complete();
    }
  });
  // cancel on command stack changes
  eventBus.on(["commandStack.changed"], function () {
    if (directEditing.isActive()) {
      directEditing.cancel();
    }
  });
  eventBus.on("directEditing.activate", function (event) {
    resizeHandles.removeResizers();
    let element = event.active.element;
    createAutocomplete(element);
  });
  eventBus.on("create.end", 500, function (event) {
    let element = event.shape,
      canExecute = event.context.canExecute,
      isTouch = event.isTouch;
    if (isTouch) {
      return;
    }
    if (!canExecute) {
      return;
    }
    if (!(0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY)) {
      activateDirectEdit(element);
    }
    let editingBox = document.getElementsByClassName("djs-direct-editing-content");
    focusElement(editingBox.item(0));
  });
  eventBus.on("autoPlace.end", 500, function (event) {
    activateDirectEdit(event.shape);
  });
  function activateDirectEdit(element, force) {
    if (force || (0,bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_3__.isAny)(element, [_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION]) || element.businessObject.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.DOMAINSTORY)) {
      directEditing.activate(element);
    }
  }
  function createAutocomplete(element) {
    let editingBox = document.getElementsByClassName("djs-direct-editing-content");
    focusElement(editingBox.item(0));
    (0,_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.autocomplete)(editingBox[0], dictionaryService.getUniqueWorkObjectNames(), element, eventBus);
  }
}
DSLabelEditingProvider.$inject = ["eventBus", "canvas", "directEditing", "modeling", "resizeHandles", "textRenderer", "updateLabelHandler"];
/**
 * activate direct editing for activities and text annotations.
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object with properties bounds (position and size), text and options
 */
DSLabelEditingProvider.prototype.activate = function (element) {
  // text
  if (element.id === "__implicitrootbase") {
    return;
  }
  let text = (0,_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.getLabel)(element);
  if (text === undefined) {
    return;
  }
  let context = {
    text: text
  };
  // bounds
  let bounds = this.getEditingBBox(element);
  (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(context, bounds);
  let options = {};
  // external labels
  if ((0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.isLabelExternal)(element)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(options, {
      autoResize: true
    });
  }
  // text annotations
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(options, {
      resizable: true,
      autoResize: true
    });
  }
  (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(context, {
    options: options
  });
  return context;
};
/**
 * get the editing bounding box based on the element's size and position
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object containing information about position
 *                  and size (fixed or minimum and/or maximum)
 */
DSLabelEditingProvider.prototype.getEditingBBox = function (element) {
  let canvas = this._canvas;
  let target = element.label || element;
  let bbox = canvas.getAbsoluteBBox(target);
  let mid = {
    x: bbox.x + bbox.width / 2,
    y: bbox.y + bbox.height / 2
  };
  // default position
  let bounds = {
    x: bbox.x,
    y: bbox.y
  };
  /** The cavnas is an Object from BPMN, the IDE might say, that zoom is deprecated,
   * because it thinks canvas is the standard HTMLElement. -> Needs to stay toom **/
  let zoom = canvas.zoom();
  let defaultStyle = this._textRenderer.getDefaultStyle(),
    externalStyle = this._textRenderer.getExternalStyle();
  // take zoom into account
  let externalFontSize = externalStyle.fontSize * zoom,
    externalLineHeight = externalStyle.lineHeight,
    defaultFontSize = defaultStyle.fontSize * zoom,
    defaultLineHeight = defaultStyle.lineHeight;
  let style = {
    fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
    fontWeight: this._textRenderer.getDefaultStyle().fontWeight
  };
  // adjust for groups
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.GROUP)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(bounds, {
      minWidth: bbox.width / 2.5 > 125 ? bbox.width / 2.5 : 125,
      maxWidth: bbox.width,
      minHeight: 30 * zoom,
      x: bbox.x,
      y: bbox.y
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(style, {
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight,
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px",
      textAlign: "left"
    });
  }
  // internal labels for tasks and collapsed call activities,
  // sub processes and participants
  if (/^domainStory:actor\w*/.test(element.type) || /^domainStory:workObject\w*/.test(element.type)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(bounds, {
      width: bbox.width,
      minHeight: 30,
      y: bbox.y + bbox.height - 20,
      x: bbox.x
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(style, {
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight,
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px"
    });
  }
  let width = 90 * zoom,
    paddingTop = 7 * zoom,
    paddingBottom = 4 * zoom;
  // external labels for events, data elements, gateways and connections
  if (target.labelTarget) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(bounds, {
      width: width,
      height: bbox.height + paddingTop + paddingBottom,
      x: mid.x - width / 2,
      y: bbox.y - paddingTop
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(style, {
      fontSize: externalFontSize + "px",
      lineHeight: externalLineHeight,
      paddingTop: paddingTop + "px",
      paddingBottom: paddingBottom + "px"
    });
  }
  // external label not yet created
  if ((0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.isLabelExternal)(target) && !(0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.hasExternalLabel)(target) && !(0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.isLabel)(target)) {
    let externalLabelMid = (0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.getExternalLabelMid)(element);
    let absoluteBBox = canvas.getAbsoluteBBox({
      x: externalLabelMid.x,
      y: externalLabelMid.y,
      width: 0,
      height: 0
    });
    let height = externalFontSize + paddingTop + paddingBottom;
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(bounds, {
      width: width,
      height: height,
      x: absoluteBBox.x - width / 2,
      y: absoluteBBox.y - height / 2
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(style, {
      fontSize: externalFontSize + "px",
      lineHeight: externalLineHeight,
      paddingTop: paddingTop + "px",
      paddingBottom: paddingBottom + "px"
    });
  }
  // text annotations
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(bounds, {
      width: bbox.width,
      height: bbox.height,
      minWidth: 30 * zoom,
      minHeight: 10 * zoom
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(style, {
      textAlign: "left",
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px",
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight
    });
  }
  return {
    bounds: bounds,
    style: style
  };
};
DSLabelEditingProvider.prototype.update = function (element, newLabel, activeContextText, bounds) {
  let newBounds, bbox;
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
    bbox = this._canvas.getAbsoluteBBox(element);
    newBounds = {
      x: element.x,
      y: element.y,
      width: element.width / bbox.width * bounds.width,
      height: element.height / bbox.height * bounds.height
    };
  }
  this._modeling.updateLabel(element, newLabel, newBounds);
};

/***/ }),

/***/ 2970:
/*!*********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/labeling/dsLabelUtil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autocomplete: () => (/* binding */ autocomplete),
/* harmony export */   calculateTextWidth: () => (/* binding */ calculateTextWidth),
/* harmony export */   getLabel: () => (/* binding */ getLabel),
/* harmony export */   getNumber: () => (/* binding */ getNumber),
/* harmony export */   selectPartOfActivity: () => (/* binding */ selectPartOfActivity),
/* harmony export */   setLabel: () => (/* binding */ setLabel),
/* harmony export */   setNumber: () => (/* binding */ setNumber)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ 19102);




function getLabelAttr(semantic) {
  if (semantic.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR) || semantic.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) || semantic.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) || semantic.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
    return "name";
  }
  if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(semantic, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
    return "text";
  }
}
function getNumberAttr(semantic) {
  if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(semantic, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY)) {
    return "number";
  }
}
function getLabel(element) {
  let semantic;
  if (element.businessObject) {
    semantic = element.businessObject;
  } else {
    semantic = element;
  }
  let attr = getLabelAttr(semantic);
  if (attr && semantic) {
    return semantic[attr] || "";
  }
}
function getNumber(element) {
  let semantic = element.businessObject,
    attr = getNumberAttr(semantic);
  if (attr) {
    return semantic[attr] || "";
  }
}
function setLabel(element, text) {
  let semantic;
  if (element.businessObject) {
    semantic = element.businessObject;
  } else {
    semantic = element;
  }
  let attr = getLabelAttr(semantic);
  if (attr) {
    semantic[attr] = text;
  }
  return element;
}
function setNumber(element, textNumber) {
  let semantic = element.businessObject,
    attr = getNumberAttr(semantic);
  if (attr) {
    semantic[attr] = textNumber;
  }
  return element;
}
// select at which part of the activity the label should be attached to
function selectPartOfActivity(waypoints, angleActivity) {
  let selectedActivity = 0;
  let linelength = 49;
  for (let i = 0; i < waypoints.length; i++) {
    if (angleActivity[i] === 0 || angleActivity[i] === 180) {
      let length = Math.abs(waypoints[i].x - waypoints[i + 1].x);
      if (length > linelength) {
        selectedActivity = i;
      }
    }
  }
  return selectedActivity;
}
// approximate the width of the label text, standard fontsize: 11
function calculateTextWidth(text) {
  if (!text) {
    return 0;
  }
  let fontsize = text.length * 5.1;
  fontsize = fontsize / 2;
  // add an initial offset to the absolute middle of the activity
  fontsize += 20;
  return fontsize;
}
/**
 * copied from https://www.w3schools.com/howto/howto_js_autocomplete.asp on 18.09.2018
 */
function autocomplete(input, workObjectNames, element, eventBus) {
  closeAllLists();
  /* the autocomplete function takes three arguments,
  the text field element and an array of possible autocompleted values and an optional element to which it is appended:*/
  let currentFocus, filteredWorkObjectNames;
  /* execute a function when someone writes in the text field:*/
  input.addEventListener("input", function () {
    if (workObjectNames.length === 0) {
      return;
    }
    /* the direct editing field of actors and workobjects is a recycled html-element and has old values that need to be overridden*/
    if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      this.value = this.innerHTML;
    }
    let autocompleteList,
      autocompleteItem,
      val = this.value;
    /* close any already open lists of autocompleted values*/
    closeAllLists();
    currentFocus = -1;
    /* create a DIV element that will contain the items (values):*/
    autocompleteList = document.createElement("DIV");
    autocompleteList.setAttribute("id", "autocomplete-list");
    autocompleteList.setAttribute("class", "autocomplete-items");
    /* append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteList);
    /* for each item in the array...*/
    filteredWorkObjectNames = [];
    for (const name of workObjectNames) {
      /* check if the item starts with the same letters as the text field value:*/
      if (val) {
        if (name.substring(0, val.length).toUpperCase() === val.toUpperCase()) {
          /* create a DIV element for each matching element:*/
          autocompleteItem = document.createElement("DIV");
          /* make the matching letters bold:*/
          autocompleteItem.innerHTML = "<strong>" + name.substring(0, val.length) + "</strong>" + name.substring(val.length);
          /* insert an input field that will hold the current name:*/
          autocompleteItem.innerHTML += "<input type='hidden' value='" + name + "'>";
          autocompleteList.appendChild(autocompleteItem);
          filteredWorkObjectNames.push(name);
        }
      }
    }
    // if we edit an actor, we do not want auto-complete, since actors generally are unique
    if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
      autocompleteList.style.visibility = "hidden";
    }
  });
  /* execute a function presses a key on the keyboard:*/
  input.onkeydown = function (e) {
    let autocompleteList = document.getElementById("autocomplete-list");
    if (autocompleteList) {
      autocompleteList = autocompleteList.getElementsByTagName("div");
    }
    if (e.keyCode === 40) {
      /* If the arrow DOWN key is pressed,
        increase the currentFocus letiable:*/
      currentFocus++;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode === 38) {
      // up
      /* If the arrow UP key is pressed,
        decrease the currentFocus letiable:*/
      currentFocus--;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      /* If the ENTER key is pressed, prevent the form from being submitted,*/
      if (currentFocus > -1) {
        element.businessObject.name = filteredWorkObjectNames[currentFocus];
        eventBus.fire("element.changed", {
          element
        });
      }
    }
  };
  function addActive(autocompleteList) {
    /* a function to classify an item as "active":*/
    if (!autocompleteList || autocompleteList.length < 1) return false;
    /* start by removing the "active" class on all items:*/
    removeActive(autocompleteList);
    if (currentFocus >= autocompleteList.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = autocompleteList.length - 1;
    /* add class "autocomplete-active":*/
    autocompleteList[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(autocompleteList) {
    /* a function to remove the "active" class from all autocomplete items:*/
    if (autocompleteList.length > 1) {
      for (const item of autocompleteList) {
        item.classList.remove("autocomplete-active");
      }
    }
  }
  function closeAllLists(survivor) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let autocompleteList = document.getElementsByClassName("autocomplete-items");
    for (const item of autocompleteList) {
      if (survivor != item && survivor != input) {
        item.parentNode.removeChild(item);
      }
    }
  }
  /* execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/***/ }),

/***/ 45291:
/*!***************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/labeling/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_change_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! diagram-js/lib/features/change-support */ 46242);
/* harmony import */ var diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! diagram-js/lib/features/resize */ 40844);
/* harmony import */ var diagram_js_direct_editing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js-direct-editing */ 32110);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 31401);
/* harmony import */ var _dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dsLabelEditingPreview */ 34970);
/* harmony import */ var _dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dsLabelEditingProvider */ 48153);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modeling/dSModeling */ 8070);










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_change_support__WEBPACK_IMPORTED_MODULE_5__["default"], diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_6__["default"], diagram_js_direct_editing__WEBPACK_IMPORTED_MODULE_0__["default"]],
  __init__: ["dSlabelEditingProvider", "dSlabelEditingPreview"],
  dSlabelEditingProvider: ["type", _dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__["default"]],
  dSlabelEditingPreview: ["type", _dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_7__["default"]],
  modeling: ["type ", _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_4__["default"]]
});

/***/ }),

/***/ 7248:
/*!******************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/labeling/position.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countLines: () => (/* binding */ countLines),
/* harmony export */   labelPosition: () => (/* binding */ labelPosition),
/* harmony export */   labelPositionX: () => (/* binding */ labelPositionX),
/* harmony export */   labelPositionY: () => (/* binding */ labelPositionY)
/* harmony export */ });
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsLabelUtil */ 2970);
/* harmony import */ var _Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/mathExtensions */ 114);




function countLines(str) {
  return str.split(/\r\n|\r|\n/).length;
}
// determine the position of the label at the activity
function labelPosition(waypoints, lines = 1) {
  let amountWaypoints = waypoints.length;
  let determinedPosition;
  let xPos;
  let yPos;
  if (amountWaypoints > 2) {
    let angleActivity = new Array(amountWaypoints - 1);
    for (let i = 0; i < amountWaypoints - 1; i++) {
      // calculate the angles of the activities
      angleActivity[i] = (0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(waypoints[i], waypoints[i + 1]);
    }
    let selectedActivity = (0,_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.selectPartOfActivity)(waypoints, angleActivity);
    xPos = labelPositionX(waypoints[selectedActivity], waypoints[selectedActivity + 1]);
    yPos = labelPositionY(waypoints[selectedActivity], waypoints[selectedActivity + 1], lines);
    determinedPosition = {
      x: xPos,
      y: yPos,
      selected: selectedActivity
    };
    return determinedPosition;
  } else {
    xPos = labelPositionX(waypoints[0], waypoints[1]);
    yPos = labelPositionY(waypoints[0], waypoints[1], lines);
    determinedPosition = {
      x: xPos,
      y: yPos,
      selected: 0
    };
    return determinedPosition;
  }
}
// calculate the X position of the label
function labelPositionX(startPoint, endPoint) {
  let angle = (0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(startPoint, endPoint);
  let offsetX = 0;
  let scaledAngle = 0;
  if (angle === 0 || angle === 180 || angle === 90 || angle === 270) {
    offsetX = 0;
  } else if (angle > 0 && angle < 90) {
    // endpoint in upper right quadrant
    offsetX = 5 - angle / 6;
  } else if (angle > 90 && angle < 180) {
    // endpoint in upper left quadrant
    scaledAngle = angle - 90;
    offsetX = 5 - scaledAngle / 18;
  } else if (angle > 180 && angle < 270) {
    // endpoint in lower left quadrant
    scaledAngle = angle - 180;
    offsetX = scaledAngle / 18;
  } else if (angle > 270) {
    // endpoint in lower right quadrant
    scaledAngle = angle - 270;
    offsetX = 5 - scaledAngle / 6;
  }
  return offsetX + (startPoint.x + endPoint.x) / 2;
}
// calculate the Y position of the label
function labelPositionY(startPoint, endPoint, lines = 1) {
  let angle = (0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(startPoint, endPoint);
  let offsetY = 0;
  let scaledAngle = 0;
  if (angle === 0 || angle === 180) {
    offsetY = 15;
  } else if (angle === 90 || angle === 270) {
    offsetY = 0;
  } else if (angle > 0 && angle < 90) {
    // endpoint in upper right quadrant
    offsetY = 15 - angle / 6;
  } else if (angle > 90 && angle < 180) {
    // endpoint in upper left quadrant
    scaledAngle = angle - 90;
    offsetY = -scaledAngle / 9 * lines;
  } else if (angle > 180 && angle < 270) {
    // endpoint in lower left quadrant
    scaledAngle = angle - 180;
    offsetY = 15 - scaledAngle / 3;
  } else if (angle > 270) {
    // endpoint in lower right quadrant
    scaledAngle = angle - 270;
    offsetY = -scaledAngle / 9 * lines;
  }
  return offsetY + (startPoint.y + endPoint.y) / 2;
}

/***/ }),

/***/ 8070:
/*!********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/modeling/dSModeling.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSModeling)
/* harmony export */ });
/* harmony import */ var bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/Modeling */ 53548);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ 22122);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);




function DSModeling(eventBus, elementFactory, commandStack, domainStoryRules) {
  bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, eventBus, elementFactory, commandStack, domainStoryRules);
}
bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.updateLabel = function (element, newLabel, newBounds) {
  if (element.businessObject ? newLabel !== element.businessObject.name : newLabel !== element.name) {
    if (/^domainStory:/.test(element.type)) {
      this._commandStack.execute("element.updateCustomLabel", {
        element: element,
        newLabel: newLabel,
        newBounds: newBounds
      });
    } else {
      this._commandStack.execute("element.updateLabel", {
        element: element,
        newLabel: newLabel,
        newBounds: newBounds
      });
    }
  }
};
bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.updateNumber = function (element, newNumber, newBounds) {
  if (element.businessObject ? newNumber !== element.businessObject.number : newNumber !== element.number) {
    if (/^domainStory:/.test(element.type)) {
      this._commandStack.execute("element.updateCustomLabel", {
        element: element,
        newNumber: newNumber,
        newBounds: newBounds
      });
    } else {
      this._commandStack.execute("element.updateLabel", {
        element: element,
        newNumber: newNumber,
        newBounds: newBounds
      });
    }
  }
};
bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.replaceShape = function (oldShape, newShape, hints) {
  let context = {
    oldShape: oldShape,
    newData: newShape,
    hints: hints || {}
  };
  this._commandStack.execute("shape.replace", context);
  return context.newShape;
};
bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.removeGroup = function (element) {
  this._commandStack.execute("shape.removeGroupWithoutChildren", {
    element: element
  });
  this.removeElements({
    element
  });
};
(0,util__WEBPACK_IMPORTED_MODULE_0__.inherits)(DSModeling, bpmn_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_1__["default"]);
DSModeling.$inject = ["eventBus", "elementFactory", "commandStack", "domainStoryRules"];

/***/ }),

/***/ 99222:
/*!***************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/modeling/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../palette/domainStoryPalette */ 97774);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bpmn-js/lib/draw/PathMap */ 56089);
/* harmony import */ var bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bpmn-js/lib/features/popup-menu */ 30918);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 31401);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domainStoryUpdater */ 41360);
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domainStoryElementFactory */ 89467);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../updateHandler/headlineAndDescriptionUpdateHandler */ 33524);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domainStoryRenderer */ 10282);
/* harmony import */ var _dSModeling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dSModeling */ 8070);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../domainStoryRules */ 10798);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../change-icon/replaceMenuProvider */ 2843);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../context-pad/domainStoryContextPadProvider */ 48640);


















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__["default"], diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__["default"], bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__["default"]],
  __init__: ["domainStoryRenderer", "paletteProvider", "domainStoryRules", "domainStoryUpdater", "contextPadProvider", "replaceMenuProvider"],
  elementFactory: ["type", _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_3__["default"]],
  domainStoryRenderer: ["type", _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_5__["default"]],
  paletteProvider: ["type", _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_0__["default"]],
  domainStoryRules: ["type", _domainStoryRules__WEBPACK_IMPORTED_MODULE_7__["default"]],
  domainStoryUpdater: ["type", _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_2__["default"]],
  contextPadProvider: ["type", _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_9__["default"]],
  elementFactoryBpmn: ["type", bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__["default"]],
  pathMap: ["type", bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__["default"]],
  replaceMenuProvider: ["type", _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__["default"]],
  headlineAndDescriptionUpdateHandler: ["type", _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_4__["default"]],
  modeling: ["type", _dSModeling__WEBPACK_IMPORTED_MODULE_6__["default"]]
});

/***/ }),

/***/ 93043:
/*!********************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/numbering/numbering.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNumberToRegistry: () => (/* binding */ addNumberToRegistry),
/* harmony export */   generateAutomaticNumber: () => (/* binding */ generateAutomaticNumber),
/* harmony export */   getMultipleNumberRegistry: () => (/* binding */ getMultipleNumberRegistry),
/* harmony export */   getNumberRegistry: () => (/* binding */ getNumberRegistry),
/* harmony export */   getNumbersAndIDs: () => (/* binding */ getNumbersAndIDs),
/* harmony export */   initializeNumbering: () => (/* binding */ initializeNumbering),
/* harmony export */   numberBoxDefinitions: () => (/* binding */ numberBoxDefinitions),
/* harmony export */   setNumberIsMultiple: () => (/* binding */ setNumberIsMultiple),
/* harmony export */   updateExistingNumbersAtEditing: () => (/* binding */ updateExistingNumbersAtEditing),
/* harmony export */   updateExistingNumbersAtGeneration: () => (/* binding */ updateExistingNumbersAtGeneration),
/* harmony export */   updateMultipleNumberRegistry: () => (/* binding */ updateMultipleNumberRegistry)
/* harmony export */ });
/* harmony import */ var _Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/mathExtensions */ 114);



let numberRegistry = [];
let multipleNumberRegistry = [false];
let canvasElementRegistry;
function initializeNumbering(canvasElementRegistryService) {
  canvasElementRegistry = canvasElementRegistryService;
}
function updateMultipleNumberRegistry(activityBusinessObjects) {
  activityBusinessObjects.forEach(activity => multipleNumberRegistry[activity.number] = activity.multipleNumberAllowed);
}
// defines the box for activity numbers
function numberBoxDefinitions(element) {
  let alignment = "center";
  let boxWidth = 30;
  let boxHeight = 30;
  let angle = 0;
  if (element.waypoints.length > 1) {
    angle = (0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_0__.angleBetween)(
    // Start of first arrow segment
    element.waypoints[0],
    // End of first arrow segment
    element.waypoints[1]);
  }
  let x = element.waypoints[0].x;
  let y = element.waypoints[0].y;
  let fixedOffsetX = 0;
  let fixedOffsetY = 0;
  let angleDependantOffsetX = 0;
  let angleDependantOffsetY = 0;
  // Fine tune positioning of sequence number above beginning of first arrow segment
  if (angle >= 0 && angle <= 45) {
    fixedOffsetX = 25;
    angleDependantOffsetY = 20 * (1 - angle / 45);
  } else if (angle <= 90) {
    fixedOffsetX = 5;
    angleDependantOffsetX = 15 * (1 - (angle - 45) / 45);
  } else if (angle <= 135) {
    fixedOffsetX = 5;
    angleDependantOffsetX = -20 * ((angle - 90) / 45);
  } else if (angle <= 180) {
    fixedOffsetX = -15;
    angleDependantOffsetY = 20 * ((angle - 135) / 45);
  } else if (angle <= 225) {
    fixedOffsetX = -15;
    fixedOffsetY = 15;
    angleDependantOffsetY = 25 * ((angle - 180) / 45);
  } else if (angle <= 270) {
    fixedOffsetX = 5;
    angleDependantOffsetX = -20 * (1 - (angle - 225) / 45);
    fixedOffsetY = 40;
  } else if (angle <= 315) {
    fixedOffsetX = 5;
    angleDependantOffsetX = 25 * ((angle - 270) / 45);
    fixedOffsetY = 40;
  } else {
    fixedOffsetX = 25;
    fixedOffsetY = 20;
    angleDependantOffsetY = 15 * (1 - (angle - 315) / 45);
  }
  x = x + fixedOffsetX + angleDependantOffsetX;
  y = y + fixedOffsetY + angleDependantOffsetY;
  return {
    textAlign: alignment,
    width: boxWidth,
    height: boxHeight,
    x: x,
    y: y
  };
}
// determine the next available number that is not yet used
function generateAutomaticNumber(elementActivity, commandStack) {
  const semantic = elementActivity.businessObject;
  const usedNumbers = [0];
  let wantedNumber = -1;
  const activitiesFromActors = canvasElementRegistry.getActivitiesFromActors();
  activitiesFromActors.forEach(element => {
    if (element.businessObject.number) {
      usedNumbers.push(+element.businessObject.number);
    }
  });
  for (let i = 0; i < usedNumbers.length; i++) {
    if (!usedNumbers.includes(i)) {
      if (!usedNumbers.includes(i)) {
        wantedNumber = i;
        i = usedNumbers.length;
      }
    }
  }
  if (wantedNumber === -1) {
    wantedNumber = usedNumbers.length;
  }
  updateExistingNumbersAtGeneration(activitiesFromActors, wantedNumber, commandStack);
  semantic.number = wantedNumber;
  return wantedNumber;
}
// update the numbers at the activities when generating a new activity
function updateExistingNumbersAtGeneration(activitiesFromActors, wantedNumber, commandStack) {
  activitiesFromActors.forEach(element => {
    let number = +element.businessObject.number;
    if (number >= wantedNumber) {
      wantedNumber++;
      setTimeout(function () {
        commandStack.execute("activity.changed", {
          businessObject: element.businessObject,
          newLabel: element.businessObject.name,
          newNumber: number,
          element: element
        });
      }, 10);
    }
  });
}
// update the numbers at the activities when editing an activity
function updateExistingNumbersAtEditing(activitiesFromActors, wantedNumber, eventBus) {
  // get a sorted list of all activities that could need changing
  let sortedActivities = [[]];
  activitiesFromActors.forEach(activity => {
    if (!sortedActivities[activity.businessObject.number]) {
      sortedActivities[activity.businessObject.number] = [];
    }
    sortedActivities[activity.businessObject.number].push(activity);
  });
  // set the number of each activity to the next highest number, starting from the number, we overrode
  let oldMultipleNumberRegistry = [...multipleNumberRegistry];
  let currentNumber = wantedNumber;
  for (currentNumber; currentNumber < sortedActivities.length; currentNumber++) {
    if (sortedActivities[currentNumber]) {
      wantedNumber++;
      multipleNumberRegistry[wantedNumber] = oldMultipleNumberRegistry[currentNumber];
      setNumberOfActivity(sortedActivities[currentNumber], wantedNumber, eventBus);
    }
  }
}
// get the IDs of activities with their associated number, only returns activities that are originating from an actor
function getNumbersAndIDs() {
  let iDWithNumber = [];
  let activities = canvasElementRegistry.getActivitiesFromActors();
  for (let i = activities.length - 1; i >= 0; i--) {
    let id = activities[i].businessObject.id;
    let number = activities[i].businessObject.number;
    iDWithNumber.push({
      id: id,
      number: number
    });
  }
  return iDWithNumber;
}
function addNumberToRegistry(renderedNumber, number) {
  numberRegistry[number] = renderedNumber;
}
function setNumberIsMultiple(number, multi) {
  multipleNumberRegistry[number] = multi;
}
/**
 * @returns copy of registry
 */
function getNumberRegistry() {
  return numberRegistry.slice(0);
}
function getMultipleNumberRegistry() {
  return multipleNumberRegistry.slice(0);
}
function setNumberOfActivity(elementArray, wantedNumber, eventBus) {
  if (elementArray) {
    elementArray.forEach(element => {
      if (element) {
        let businessObject = element.businessObject;
        if (businessObject) {
          businessObject.number = wantedNumber;
        }
        eventBus.fire("element.changed", {
          element
        });
      }
    });
  }
}

/***/ }),

/***/ 97774:
/*!***************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/palette/domainStoryPalette.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PaletteProvider),
/* harmony export */   initializePalette: () => (/* binding */ initializePalette)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/allIcons */ 57488);
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Domain/Common/constants */ 90816);







/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
let iconDictionary;
let configuration;
function initializePalette(iconDictionaryService, configurationService) {
  iconDictionary = iconDictionaryService;
  configuration = configurationService;
}
function PaletteProvider(palette, create, elementFactory, spaceTool, lassoTool) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  palette.registerProvider(this);
}
PaletteProvider.$inject = ["palette", "create", "elementFactory", "spaceTool", "lassoTool", "modeling"];
PaletteProvider.prototype.getPaletteEntries = function () {
  let actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    spaceTool = this._spaceTool,
    lassoTool = this._lassoTool;
  function createAction(type, group, className, title, options) {
    function createListener(event) {
      let shape = elementFactory.createShape((0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)({
        type: type
      }, options));
      (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(shape.businessObject, {
        id: shape.id
      });
      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }
      create.start(event, shape);
    }
    let shortType = type.replace(/^domainStory:/, "");
    return {
      group: group,
      className: className,
      title: "Create " + title || 0,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }
  return initPalette(actions, spaceTool, lassoTool, createAction);
};
function appendCSSStyleCheat(customIcons) {
  const sheetEl = document.createElement("style");
  document.head.appendChild(sheetEl);
  let customIconDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
  customIconDict.appendDict(customIcons);
  let customIconDictKeys = customIconDict.keysArray();
  customIconDictKeys.forEach(name => {
    if (iconDictionary.getAppendedIconDictionary().has(name)) {
      let src = customIconDict.get(name);
      const iconStyle = ".icon-domain-story-" + name.toLowerCase() + "::before{" + " display: block;" + ' content: url("data:image/svg+xml;utf8,' + wrapSRCInSVG(src) + '");' + " margin: 3px;}";
      sheetEl.sheet.insertRule(iconStyle, sheetEl.sheet.cssRules.length);
    }
  });
}
function initPalette(actions, spaceTool, lassoTool, createAction) {
  let config = iconDictionary?.getCurrentIconConfigurationForBPMN();
  let customIcons = localStorage.getItem(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__.APPENDED_ICONS_TAG);
  if (customIcons) {
    customIcons = JSON.parse(customIcons);
    if (customIconsLegacy(customIcons)) {
      customIcons = convertLegacyAppendedIconsToDict(customIcons);
    }
    if (customIcons.entries && customIcons.entries.forEach) {
      const customIconsDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
      customIcons.entries.forEach(entry => {
        customIconsDict.putEntry(entry);
      });
      (0,src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_0__.overrideAppendedIcons)(customIconsDict);
      appendCSSStyleCheat(customIcons);
    }
  }
  iconDictionary?.initTypeDictionaries(config.actors, config.workObjects);
  let actorTypes = iconDictionary?.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
  actorTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(actions, {
    "actor-separator": {
      group: "actor",
      separator: true
    }
  });
  let workObjectTypes = iconDictionary?.getTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
  workObjectTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(actions, {
    "workObject-separator": {
      group: "workObject",
      separator: true
    },
    "domainStory-group": createAction(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP, "group", "icon-domain-story-tool-group", "group"),
    "group-separator": {
      group: "group",
      separator: true
    },
    "lasso-tool": {
      group: "tools",
      className: "bpmn-icon-lasso-tool",
      title: "Activate the lasso tool",
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    "space-tool": {
      group: "tools",
      className: "bpmn-icon-space-tool",
      title: "Activate the create/remove space tool",
      action: {
        click: function (event) {
          spaceTool.activateSelection(event);
        }
      }
    }
  });
  return actions;
}
function addCanvasObjectTypes(name, createAction, actions, className, elementType) {
  let icon = iconDictionary.getIconForBPMN(elementType, name);
  let action = [];
  action["domainStory-" + className + name] = createAction(`${elementType}${name}`, className, icon, name);
  (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(actions, action);
}
function customIconsLegacy(customIcons) {
  return !(Object.keys(customIcons).length === 1 && Object.keys(customIcons)[0] === "entries");
}
function convertLegacyAppendedIconsToDict(customIcons) {
  let dict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
  Object.keys(customIcons).forEach(key => {
    dict.set(key, customIcons[key]);
  });
  return dict;
}
// For some reason its important to use ' in the content for the Palette and ContextPad
// Do not change!
function wrapSRCInSVG(src) {
  return "<svg viewBox='0 0 22 22' width='22' height='22' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" + "<image width='22' height='22' xlink:href='" + src + "'/></svg>";
}

/***/ }),

/***/ 47379:
/*!*************************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/updateHandler/activityUpdateHandlers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ activityUpdateHandler),
/* harmony export */   initializeActivityUpdateHandler: () => (/* binding */ initializeActivityUpdateHandler)
/* harmony export */ });
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../numbering/numbering */ 93043);



/**
 * commandStack Handler for changes at activities
 */
let canvasElementRegistry;
function initializeActivityUpdateHandler(canvasElementRegistryService) {
  canvasElementRegistry = canvasElementRegistryService;
}
function activityUpdateHandler(commandStack, eventBus) {
  commandStack.registerHandler("activity.directionChange", activity_directionChange);
  commandStack.registerHandler("activity.changed", activity_changed);
  // update the activity from the activity-dialog, either with or without number
  // and change other activities too, to keep the numbers consistent
  function activity_changed(modeling) {
    this.preExecute = function (context) {
      context.oldLabel = context.businessObject.name || " ";
      let oldNumbersWithIDs = (0,_numbering_numbering__WEBPACK_IMPORTED_MODULE_0__.getNumbersAndIDs)();
      modeling.updateLabel(context.businessObject, context.newLabel);
      modeling.updateNumber(context.businessObject, context.newNumber);
      context.oldNumber = context.businessObject.number;
      context.oldNumbersWithIDs = oldNumbersWithIDs;
    };
    this.execute = function (context) {
      let businessObject = context.businessObject;
      let element = context.element;
      if (context.newLabel && context.newLabel.length < 1) {
        context.newLabel = " ";
      }
      businessObject.name = context.newLabel;
      businessObject.number = context.newNumber;
      eventBus.fire("element.changed", {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      semantic.name = context.oldLabel;
      semantic.number = context.oldNumber;
      revertAutomaticNumberGenerationChange(context.oldNumbersWithIDs, eventBus);
      eventBus.fire("element.changed", {
        element
      });
    };
  }
  // change the direction of a single activity without affecting other activities
  function activity_directionChange(modeling) {
    this.preExecute = function (context) {
      context.oldNumber = context.businessObject.number;
      context.oldWaypoints = context.element.waypoints;
      context.name = context.businessObject.name;
      if (!context.oldNumber) {
        context.oldNumber = 0;
      }
      modeling.updateNumber(context.businessObject, context.newNumber);
    };
    this.execute = function (context) {
      let businessObject = context.businessObject;
      let element = context.element;
      let swapSource = element.source;
      let newWaypoints = [];
      let waypoints = element.waypoints;
      for (let i = waypoints.length - 1; i >= 0; i--) {
        newWaypoints.push(waypoints[i]);
      }
      element.source = element.target;
      businessObject.source = businessObject.target;
      element.target = swapSource;
      businessObject.target = swapSource.id;
      businessObject.name = context.name;
      businessObject.number = context.newNumber;
      element.waypoints = newWaypoints;
      eventBus.fire("element.changed", {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      let swapSource = element.source;
      element.source = element.target;
      semantic.source = semantic.target;
      element.target = swapSource;
      semantic.target = swapSource.id;
      semantic.name = context.name;
      semantic.number = context.oldNumber;
      element.waypoints = context.oldWaypoints;
      eventBus.fire("element.changed", {
        element
      });
    };
  }
}
// reverts the automatic changed done by the automatic number-generation at editing
function revertAutomaticNumberGenerationChange(iDWithNumber, eventBus) {
  let activities = canvasElementRegistry?.getActivitesFromActors();
  for (let i = activities.length - 1; i >= 0; i--) {
    for (let j = iDWithNumber.length - 1; j >= 0; j--) {
      if (iDWithNumber[j].id.includes(activities[i].businessObject.id)) {
        let element = activities[i];
        element.businessObject.number = iDWithNumber[j].number;
        j = -5;
        eventBus.fire("element.changed", {
          element
        });
        iDWithNumber.splice(j, 1);
      }
    }
  }
}

/***/ }),

/***/ 82189:
/*!***********************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/updateHandler/elementUpdateHandler.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ elementUpdateHandler)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ 19102);



function elementUpdateHandler(commandStack, eventBus) {
  commandStack.registerHandler("element.colorChange", element_colorChange);
  commandStack.registerHandler("shape.removeGroupWithoutChildren", removeGroupWithoutChildren);
  function element_colorChange() {
    this.preExecute = function (context) {
      context.oldColor = context.businessObject.pickedColor;
    };
    this.execute = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      semantic.pickedColor = context.newColor;
      eventBus.fire("element.changed", {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      semantic.pickedColor = context.oldColor;
      eventBus.fire("element.changed", {
        element
      });
    };
  }
  function removeGroupWithoutChildren() {
    this.preExecute = function (ctx) {
      ctx.parent = ctx.element.parent;
      ctx.children = ctx.element.children.slice();
    };
    this.execute = function (ctx) {
      let element = ctx.element;
      ctx.children.forEach(child => {
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.undoGroupRework)(element, child);
        eventBus.fire("element.changed", {
          element: child
        });
      });
      eventBus.fire("shape.remove", {
        element
      });
    };
    this.revert = function (ctx) {
      let element = ctx.element;
      eventBus.fire("shape.added", {
        element
      });
      ctx.element.children.forEach(child => {
        reworkGroupElements(element, child);
      });
    };
  }
}

/***/ }),

/***/ 33524:
/*!**************************************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/updateHandler/headlineAndDescriptionUpdateHandler.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ headlineAndDescriptionUpdateHandler)
/* harmony export */ });
/**
 * a handler that updates the text of a BPMN element.
 */
function headlineAndDescriptionUpdateHandler(commandStack, titleService) {
  commandStack.registerHandler("story.updateHeadlineAndDescription", handlerFunction);
  function handlerFunction() {
    this.execute = function (ctx) {
      ctx.oldTitle = titleService.getTitle();
      ctx.oldDescription = titleService.getDescription();
      titleService.updateTitleAndDescription(ctx.newTitle, ctx.newDescription, false);
    };
    this.revert = function (ctx) {
      titleService.updateTitleAndDescription(ctx.oldTitle, ctx.oldDescription, false);
    };
  }
}

/***/ }),

/***/ 68558:
/*!********************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/updateHandler/massRenameHandler.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSMassRenameHandler)
/* harmony export */ });


function DSMassRenameHandler(commandStack, eventBus) {
  commandStack.registerHandler("domainStoryObjects.massRename", massRename);
  function massRename(modeling) {
    this.preExecute = function (context) {
      let relevantElements = context.elements;
      context.oldLabel = relevantElements[0].businessObject.name;
      relevantElements.forEach(element => {
        modeling.updateLabel(element.businessObject, confirm.newValue);
      });
    };
    this.execute = function (context) {
      let relevantElements = context.elements;
      relevantElements.forEach(element => {
        let semantic = element.businessObject;
        semantic.name = context.newValue;
        eventBus.fire("element.changed", {
          element
        });
      });
    };
    this.revert = function (context) {
      let relevantElements = context.elements;
      relevantElements.forEach(element => {
        let semantic = element.businessObject;
        semantic.name = context.oldLabel;
        eventBus.fire("element.changed", {
          element
        });
      });
    };
  }
}

/***/ }),

/***/ 31401:
/*!*********************************************************************!*\
  !*** ./src/app/BPMN-JS/modeler/updateHandler/updateLabelHandler.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateLabelHandler)
/* harmony export */ });
/* harmony import */ var _labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../labeling/dsLabelUtil */ 2970);
/* harmony import */ var bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bpmn-js/lib/util/LabelUtil */ 81454);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ 19102);






const NULL_DIMENSIONS = {
  width: 0,
  height: 0
};
/**
 * a handler that updates the text of a BPMN element.
 */
function UpdateLabelHandler(modeling, textRenderer, commandStack) {
  commandStack.registerHandler("element.updateCustomLabel", handlerFunction);
  function handlerFunction() {
    /**
     * Set the label and return the changed elements.
     *
     * Element parameter can be label itself or connection (i.e. sequence flow).
     *
     * @param {djs.model.Base} element
     * @param {String} text
     */
    this.preExecute = function (ctx) {
      let element = ctx.element,
        businessObject = element.businessObject,
        newLabel = ctx.newLabel,
        newNumber = ctx.newNumber;
      if (!(0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.isLabel)(element) && (0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.isLabelExternal)(element) && !(0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.hasExternalLabel)(element) && (newLabel !== "" || newNumber !== "")) {
        // create label
        let paddingTop = 7;
        let labelCenter = (0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.getExternalLabelMid)(element);
        labelCenter = {
          x: labelCenter.x,
          y: labelCenter.y + paddingTop
        };
        modeling.createLabel(element, labelCenter, {
          id: businessObject.id + "_label",
          businessObject: businessObject
        });
      }
    };
    this.execute = function (ctx) {
      ctx.oldLabel = (0,_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.getLabel)(ctx.element);
      ctx.oldNumber = (0,_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.getNumber)(ctx.element);
      return setText(ctx.element, ctx.newLabel, ctx.newNumber);
    };
    this.revert = function (ctx) {
      return setText(ctx.element, ctx.oldLabel, ctx.oldNumber);
    };
    this.postExecute = function (ctx) {
      let element = ctx.element,
        label = element.label || element,
        newLabel = ctx.newLabel,
        newBounds = ctx.newBounds;
      if ((0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.isLabel)(label) && newLabel.trim() === "") {
        modeling.removeShape(label);
        return;
      }
      // ignore internal labels for elements except text annotations
      if (!(0,bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_3__.isLabelExternal)(element) && !(0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
        return;
      }
      let bo = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getBusinessObject)(label);
      let text = bo.name || bo.text;
      // don't resize without text
      if (!text) {
        return;
      }
      // resize element based on label _or_ pre-defined bounds
      if (typeof newBounds === "undefined") {
        newBounds = textRenderer.getLayoutedBounds(label, text);
      }
      // setting newBounds to false or _null_ will
      // disable the postExecute resize operation
      if (newBounds) {
        modeling.resizeShape(label, newBounds, NULL_DIMENSIONS);
      }
    };
  }
}
function setText(element, text, textNumber) {
  // external label if present
  let label = element.label || element;
  let number = element.number || element;
  let labelTarget = element.labelTarget || element;
  let numberTarget = element.numberTarget || element;
  (0,_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.setLabel)(label, text);
  (0,_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__.setNumber)(number, textNumber);
  return [label, labelTarget, number, numberTarget];
}
UpdateLabelHandler.$inject = ["modeling", "textRenderer", "commandStack"];

/***/ }),

/***/ 19102:
/*!*****************************************!*\
  !*** ./src/app/BPMN-JS/modeler/util.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBusinessObject: () => (/* binding */ getBusinessObject),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isAny: () => (/* binding */ isAny),
/* harmony export */   reworkGroupElements: () => (/* binding */ reworkGroupElements),
/* harmony export */   undoGroupRework: () => (/* binding */ undoGroupRework)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);

function is(element, type) {
  const bo = getBusinessObject(element);
  return bo && typeof bo.$instanceOf == "function" && bo.$instanceOf(type);
}
function getBusinessObject(element) {
  return element && element.businessObject || element;
}
function isAny(element, types) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.some)(types, function (t) {
    return is(element, t);
  });
}
function reworkGroupElements(parent, shape) {
  parent.children.slice().forEach(innerShape => {
    if (innerShape.id !== shape.id) {
      if (innerShape.x >= shape.x && innerShape.x <= shape.x + shape.width) {
        if (innerShape.y >= shape.y && innerShape.y <= shape.y + shape.height) {
          innerShape.parent = shape;
          if (!shape.children.includes(innerShape)) {
            shape.children.push(innerShape);
          }
        }
      }
    }
  });
}
function undoGroupRework(parent, shape) {
  const superParent = parent.parent;
  parent.children.remove(shape);
  superParent.children.add(shape);
  shape.parent = superParent;
  const svgShape = document.querySelector("[data-element-id=" + shape.id + "]").parentElement;
  const svgGroup = svgShape.parentElement;
  const svgGroupParent = svgGroup.parentElement.parentElement;
  svgGroup.removeChild(svgShape);
  svgGroupParent.appendChild(svgShape);
}

/***/ }),

/***/ 70908:
/*!**********************************************!*\
  !*** ./src/app/Service/Export/exportUtil.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTitleAndDescriptionSVGElement: () => (/* binding */ createTitleAndDescriptionSVGElement)
/* harmony export */ });
/* harmony import */ var _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Export/exportConstants */ 27901);

let dynamicHeightOffset = 0;
// Has to be js File so we can access te correct non-standard HTML-Properties without excessive usage of ts-ignore
function createTitleAndDescriptionSVGElement(initDynamicHeightOffset, title, description, min_x, min_y, width) {
  dynamicHeightOffset = initDynamicHeightOffset;
  title = title.replace("&lt;", "").replace("&gt;", "");
  let titleElement = createTitle(title, width);
  let descriptionElement = createDescription(description, width);
  // to display the title and description in the SVG-file, we need to add a container for our text-elements
  let insertText = '<g class="djs-group"><g class="djs-element djs-shape" style = "display:block" transform="translate(' + (min_x - 10) + " " + (min_y - dynamicHeightOffset) + ')"><g class="djs-visual">' + titleElement + descriptionElement + "</g></g></g>";
  return {
    insertText,
    dynamicHeightOffset: dynamicHeightOffset
  };
}
function createTitle(text, width) {
  let tempCanvas = document.createElement("canvas");
  let ctx = tempCanvas.getContext("2d");
  ctx.font = "30px Arial";
  return createTextSpans(text, width, ctx, 10, _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.TEXTSPAN_TITLE_HEIGHT, 30);
}
function createDescription(text, width) {
  let description = "";
  let descriptionParts = text.split("<br>");
  let tempCanvas = document.createElement("canvas");
  let ctx = tempCanvas.getContext("2d");
  ctx.font = "12px Arial";
  for (let i = 0; i < descriptionParts.length; i++) {
    description += createTextSpans(descriptionParts[i], width, ctx, 0, _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.TEXTSPAN_DESCRIPTION_HEIGHT, 12);
  }
  return description;
}
function createTextSpans(text, width, ctx, yOffset, heightOffset, fontSize) {
  let textSpans = "";
  let words = text.split(" ");
  // every leading empty strings in the array must be removed, otherwise the text elements
  // will not be filled with text
  words = removeLeadingEmptyStrings(words);
  let textTag = '<text lineHeight="1.2" class="djs-label" style="font-family: Arial, sans-serif; font-size: ' + fontSize + '; font-weight: normal; fill: rgb(0, 0, 0);">';
  let textSpan = document.createElementNS(_Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.SVG_LINK, "tspan");
  let textNode = document.createTextNode(words[0]);
  textSpan.setAttribute("x", _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.X_OFFSET_UTIL);
  textSpan.setAttribute("y", yOffset + dynamicHeightOffset);
  textSpan.setAttribute("font-size", fontSize);
  textSpan.appendChild(textNode);
  for (let j = 1; j < words.length; j++) {
    if (textSpan.firstChild && textSpan.firstChild.data) {
      let len = textSpan.firstChild.data.length;
      textNode.data += " " + words[j];
      if (ctx.measureText(textNode.data).width > width - 16) {
        dynamicHeightOffset += heightOffset;
        textSpan.firstChild.data = textSpan.firstChild.data.slice(0, len); // remove overflow word
        textSpans += textTag + textSpan.outerHTML + "</text>"; // append line
        // create new textspan for line break
        textSpan = document.createElementNS(_Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.SVG_LINK, "tspan");
        textNode = document.createTextNode(words[j]);
        textSpan.setAttribute("x", _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.X_OFFSET_UTIL);
        textSpan.setAttribute("y", yOffset + dynamicHeightOffset);
        textSpan.appendChild(textNode);
      }
    }
  }
  dynamicHeightOffset += heightOffset;
  textSpans += textTag + textSpan.outerHTML + "</text>";
  return textSpans;
}
function removeLeadingEmptyStrings(stringArray) {
  const firstNonEmptyIndex = stringArray.findIndex(string => string !== "");
  return stringArray.slice(firstNonEmptyIndex === -1 ? stringArray.length : firstNonEmptyIndex);
}

/***/ }),

/***/ 78828:
/*!*************************************************!*\
  !*** ./src/app/Domain/Common/businessObject.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   testBusinessObject: () => (/* binding */ testBusinessObject)
/* harmony export */ });
/* harmony import */ var _elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementTypes */ 30236);

const testBusinessObject = {
  $descriptor: undefined,
  $type: undefined,
  di: undefined,
  get: undefined,
  set: undefined,
  id: 'test',
  name: 'test',
  type: _elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT,
  x: 0,
  y: 0,
  height: 38,
  width: 38,
  pickedColor: undefined
};

/***/ }),

/***/ 80775:
/*!************************************************!*\
  !*** ./src/app/Domain/Common/configuration.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Configuration: () => (/* binding */ Configuration)
/* harmony export */ });
class Configuration {
  constructor(actors, workObjects) {
    this.actors = actors;
    this.workObjects = workObjects;
  }
}

/***/ }),

/***/ 90816:
/*!********************************************!*\
  !*** ./src/app/Domain/Common/constants.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APPENDED_ICONS_TAG: () => (/* binding */ APPENDED_ICONS_TAG),
/* harmony export */   DEFAULT_AUTOSAVES_ENABLED: () => (/* binding */ DEFAULT_AUTOSAVES_ENABLED),
/* harmony export */   DEFAULT_AUTOSAVES_INTERVAL: () => (/* binding */ DEFAULT_AUTOSAVES_INTERVAL),
/* harmony export */   DEFAULT_AUTOSAVES_MAX_DRAFTS: () => (/* binding */ DEFAULT_AUTOSAVES_MAX_DRAFTS),
/* harmony export */   ICON_SET_CONFIGURATION_TAG: () => (/* binding */ ICON_SET_CONFIGURATION_TAG),
/* harmony export */   IMPLICIT_ROOT_ID: () => (/* binding */ IMPLICIT_ROOT_ID),
/* harmony export */   INITIAL_DESCRIPTION: () => (/* binding */ INITIAL_DESCRIPTION),
/* harmony export */   INITIAL_ICON_SET_NAME: () => (/* binding */ INITIAL_ICON_SET_NAME),
/* harmony export */   INITIAL_TITLE: () => (/* binding */ INITIAL_TITLE),
/* harmony export */   SNACKBAR_DURATION: () => (/* binding */ SNACKBAR_DURATION),
/* harmony export */   SNACKBAR_ERROR: () => (/* binding */ SNACKBAR_ERROR),
/* harmony export */   SNACKBAR_INFO: () => (/* binding */ SNACKBAR_INFO),
/* harmony export */   SNACKBAR_SUCCESS: () => (/* binding */ SNACKBAR_SUCCESS)
/* harmony export */ });
/** DEFAULT VALUES **/
const INITIAL_TITLE = '< title >';
const INITIAL_DESCRIPTION = '';
const INITIAL_ICON_SET_NAME = 'default';
/** LocalStorageTags **/
const APPENDED_ICONS_TAG = 'appendedIcons';
// String value of tag should not be renamed, because existing configurations would not load
const ICON_SET_CONFIGURATION_TAG = 'domainConfigurationTag';
/** AUTOSAVE DEFAULTS **/
const DEFAULT_AUTOSAVES_ENABLED = true;
const DEFAULT_AUTOSAVES_MAX_DRAFTS = 5;
const DEFAULT_AUTOSAVES_INTERVAL = 30;
/** SNACKBAR **/
const SNACKBAR_DURATION = 2000;
const SNACKBAR_SUCCESS = 'snackbar_success';
const SNACKBAR_ERROR = 'snackbar_error';
const SNACKBAR_INFO = 'snackbar_info';
/** BPMN_RELEVANT_CONSTANTS **/
const IMPLICIT_ROOT_ID = '__implicitroot';

/***/ }),

/***/ 54972:
/*!********************************************************!*\
  !*** ./src/app/Domain/Common/dictionary/dictionary.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dictionary: () => (/* binding */ Dictionary),
/* harmony export */   Entry: () => (/* binding */ Entry)
/* harmony export */ });
class Dictionary {
  constructor() {
    this.entries = [];
  }
  get length() {
    return this.entries.length;
  }
  all() {
    return this.entries;
  }
  size() {
    return this.entries.length;
  }
  isEmpty() {
    return this.entries.length <= 0;
  }
  has(key) {
    return this.entries.some(entry => entry.key === key);
  }
  set(key, value) {
    if (!this.has(key)) {
      this.entries.push(new Entry(value, key));
    }
  }
  add(value, key) {
    this.set(key, value);
  }
  putEntry(entry) {
    if (!this.has(entry.key)) {
      this.entries.push(new Entry(entry.value, entry.key));
    }
  }
  keysArray() {
    return this.entries.map(entry => entry.key);
  }
  addEach(object) {
    Object.keys(object).forEach(key => {
      this.set(key, object[key]);
    });
  }
  appendDict(dict) {
    dict.entries.forEach(entry => this.putEntry(entry));
  }
  clear() {
    this.entries = [];
  }
  delete(key) {
    this.entries = this.entries.filter(entry => entry.key !== key);
  }
  get(key) {
    const found = this.entries.filter(entry => entry.key === key);
    return found[0] ? found[0].value : null;
  }
  sort(fn) {
    this.entries.sort(fn);
  }
  sortByName() {
    this.entries.sort((a, b) => {
      if (a.key.includes('_custom') == b.key.includes('_custom')) {
        if (a.key < b.key) return -1;else {
          return 1;
        }
      } else {
        if (a.key.includes('_custom')) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }
}
class Entry {
  constructor(value, key) {
    this.value = value;
    this.key = key;
  }
}

/***/ }),

/***/ 30236:
/*!***********************************************!*\
  !*** ./src/app/Domain/Common/elementTypes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementTypes: () => (/* binding */ ElementTypes)
/* harmony export */ });
var ElementTypes;
(function (ElementTypes) {
  ElementTypes["ACTIVITY"] = "domainStory:activity";
  ElementTypes["CONNECTION"] = "domainStory:connection";
  ElementTypes["ACTOR"] = "domainStory:actor";
  ElementTypes["WORKOBJECT"] = "domainStory:workObject";
  ElementTypes["GROUP"] = "domainStory:group";
  ElementTypes["TEXTANNOTATION"] = "domainStory:textAnnotation";
  ElementTypes["DOMAINSTORY"] = "domainStory:";
  ElementTypes["CUSTOM"] = "-custom";
})(ElementTypes || (ElementTypes = {}));
(function (ElementTypes) {
  function getIconId(type) {
    if (type.startsWith(ElementTypes.ACTOR)) {
      return type.replace(ElementTypes.ACTOR, '');
    } else if (type.startsWith(ElementTypes.WORKOBJECT)) {
      return type.replace(ElementTypes.WORKOBJECT, '');
    }
    return '';
  }
  ElementTypes.getIconId = getIconId;
  function isCustomType(type) {
    return type.endsWith(ElementTypes.CUSTOM);
  }
  ElementTypes.isCustomType = isCustomType;
  function isCustomSvgType(type) {
    return type.endsWith('_svg' + ElementTypes.CUSTOM);
  }
  ElementTypes.isCustomSvgType = isCustomSvgType;
})(ElementTypes || (ElementTypes = {}));

/***/ }),

/***/ 93703:
/*!*****************************************************!*\
  !*** ./src/app/Domain/Dialog/activityDialogData.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityDialogData: () => (/* binding */ ActivityDialogData)
/* harmony export */ });
class ActivityDialogData {
  constructor(activity, numberIsAllowedMultipleTimes, showNumberFields, saveFN) {
    this.activity = activity;
    this.numberIsAllowedMultipleTimes = numberIsAllowedMultipleTimes;
    this.showNumberFields = showNumberFields;
    this.saveFN = saveFN;
  }
}

/***/ }),

/***/ 83064:
/*!***************************************************!*\
  !*** ./src/app/Domain/Dialog/exportDialogData.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportDialogData: () => (/* binding */ ExportDialogData),
/* harmony export */   ExportOption: () => (/* binding */ ExportOption)
/* harmony export */ });
class ExportDialogData {
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
}
class ExportOption {
  constructor(text, tooltip, fn) {
    this.text = text;
    this.tooltip = tooltip;
    this.fn = fn;
  }
}

/***/ }),

/***/ 45574:
/*!*************************************************!*\
  !*** ./src/app/Domain/Dialog/infoDialogData.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfoDialogData: () => (/* binding */ InfoDialogData)
/* harmony export */ });
class InfoDialogData {
  constructor(title, infoText, isInfo, isLink = false, linkText) {
    this.title = title;
    this.infoText = infoText;
    this.isInfo = isInfo;
    this.isLink = isLink;
    this.linkText = linkText;
  }
}

/***/ }),

/***/ 90173:
/*!***********************************************************!*\
  !*** ./src/app/Domain/DomManipulation/replayConstants.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIGHLIGHT_NUMBER_BACKGROUNG_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_BACKGROUNG_COLOR),
/* harmony export */   HIGHLIGHT_NUMBER_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_COLOR),
/* harmony export */   HIGHLIGHT_STROKE_WIDTH: () => (/* binding */ HIGHLIGHT_STROKE_WIDTH),
/* harmony export */   NUMBER_BACKGROUND_COLOR: () => (/* binding */ NUMBER_BACKGROUND_COLOR),
/* harmony export */   NUMBER_COLOR: () => (/* binding */ NUMBER_COLOR),
/* harmony export */   STROKE_WIDTH: () => (/* binding */ STROKE_WIDTH)
/* harmony export */ });
const NUMBER_BACKGROUND_COLOR = 'white';
const NUMBER_COLOR = 'black';
const STROKE_WIDTH = '1.5';
const HIGHLIGHT_NUMBER_BACKGROUNG_COLOR = '#43acbf';
const HIGHLIGHT_NUMBER_COLOR = 'black';
const HIGHLIGHT_STROKE_WIDTH = '4';

/***/ }),

/***/ 74306:
/*!***********************************************!*\
  !*** ./src/app/Domain/Export/configAndDst.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigAndDST: () => (/* binding */ ConfigAndDST),
/* harmony export */   testConfigAndDst: () => (/* binding */ testConfigAndDst)
/* harmony export */ });
class ConfigAndDST {
  constructor(domain, dst) {
    this.domain = domain;
    this.dst = dst;
  }
}
const testConfigAndDst = {
  domain: JSON.parse('{"name":"",' + '"actors":{"Person":"<svg viewBox=\\"0 0 24 26\\" xmlns=\\"http://www.w3.org/2000/svg\\">' + '<path d=\\"M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z\\"/>' + '<path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"/></svg>",' + '"Group":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"48\\" height=\\"48\\" viewBox=\\"0 0 24 26\\">' + '<path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"/>' + '<path d=\\"M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z\\"/></svg>",' + '"System":"<svg viewBox=\\"0 0 24 26\\" xmlns=\\"http://www.w3.org/2000/svg\\">' + '<path d=\\"M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z\\"/></svg>"},' + '"workObjects":{"Document":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 26\\">' + '<path fill=\\"none\\" d=\\"M0 0h24v24H0V0z\\"/><path d=\\"M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z\\"/></svg>",' + '"Folder":"<svg viewBox=\\"0 0 24 26\\" xmlns=\\"http://www.w3.org/2000/svg\\">' + '<path fill=\\"none\\" d=\\"M0,0h24v24H0V0z\\"/>' + '<path d=\\"M9.17,6l2,2H20v10L4,18V6H9.17 M10,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2 h-8L10,4L10,4z\\"/></svg>",' + '"Call":"<svg viewBox=\\"0 0 24 26\\" xmlns=\\"http://www.w3.org/2000/svg\\">' + '<path fill=\\"none\\" d=\\"M0,0h24v24H0V0z\\"/><path d=\\"M6.54,5C6.6,5.89,6.75,6.76,6.99,7.59l-1.2,1.2C5.38,7.59,5.12,6.32,5.03,5H6.54 M16.4,17.02c0.85,0.24,1.72,0.39,2.6,0.45 v1.49c-1.32-0.09-2.59-0.35-3.8-0.75L16.4,17.02 M7.5,3H4C3.45,3,3,3.45,3,4c0,9.39,7.61,17,17,17c0.55,0,1-0.45,1-1v-3.49\\tc0-0.55-0.45-1-1-1c-1.24,0-2.45-0.2-3.57-0.57c-0.1-0.04-0.21-0.05-0.31-0.05c-0.26,0-0.51,0.1-0.71,0.29l-2.2,2.2 c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2C9.1,8.31,9.18,7.92,9.07,7.57C8.7,6.45,8.5,5.25,8.5,4C8.5,3.45,8.05,3,7.5,3L7.5,3z\\"/></svg>",' + '"Email":"<svg viewBox=\\"0 0 24 26\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill=\\"none\\" d=\\"M0,0h24v24H0V0z\\"/>' + '<path fill-opacity=\\"0.9\\" d=\\"M12,1.95c-5.52,0-10,4.48-10,10s4.48,10,10,10h5v-2h-5c-4.34,0-8-3.66-8-8s3.66-8,8-8s8,3.66,8,8v1.43 c0,0.79-0.71,1.57-1.5,1.57S17,14.17,17,13.38v-1.43c0-2.76-2.24-5-5-5s-5,2.24-5,5s2.24,5,5,5c1.38,0,2.64-0.56,3.54-1.47 c0.65,0.89,1.77,1.47,2.96,1.47c1.97,0,3.5-1.6,3.5-3.57v-1.43C22,6.43,17.52,1.95,12,1.95z M12,14.95c-1.66,0-3-1.34-3-3 s1.34-3,3-3s3,1.34,3,3S13.66,14.95,12,14.95z\\"/></svg>",' + '"Conversation":"<svg height=\\"48\\" viewBox=\\"0 0 24 26\\" width=\\"48\\" xmlns=\\"http://www.w3.org/2000/svg\\">' + '<path d=\\"M0 0h24v24H0V0z\\" fill=\\"none\\"/><path d=\\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z\\"/></svg>",' + '"Info":"<svg height=\\"48\\" viewBox=\\"0 0 24 26\\" width=\\"48\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"/>' + '<path d=\\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\\"/>' + '</svg>"}}'),
  dst: '[' + '{"type":"domainStory:workObjectDocument","name":"","id":"shape_3792","$type":"Element","di":{},"$descriptor":{},"pickedColor":"black","x":302,"y":102},' + '{"type":"domainStory:actorPerson","name":"","id":"shape_4666","$type":"Element","di":{},"$descriptor":{},"pickedColor":"black","x":103,"y":93},' + '{"type":"domainStory:activity","name":"","id":"connection_4884","$type":"Element","di":{},"$descriptor":{},"pickedColor":"black","number":1,' + '"waypoints":[{"original":{"x":141,"y":131},"x":186,"y":133},{"original":{"x":340,"y":140},"x":302,"y":138}],' + '"source":"shape_4666","target":"shape_3792"}]'
};

/***/ }),

/***/ 27901:
/*!**************************************************!*\
  !*** ./src/app/Domain/Export/exportConstants.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_PADDING: () => (/* binding */ DEFAULT_PADDING),
/* harmony export */   SVG_LINK: () => (/* binding */ SVG_LINK),
/* harmony export */   TEXTSPAN_DESCRIPTION_HEIGHT: () => (/* binding */ TEXTSPAN_DESCRIPTION_HEIGHT),
/* harmony export */   TEXTSPAN_TITLE_HEIGHT: () => (/* binding */ TEXTSPAN_TITLE_HEIGHT),
/* harmony export */   X_OFFSET_UTIL: () => (/* binding */ X_OFFSET_UTIL)
/* harmony export */ });
const SVG_LINK = 'http://www.w3.org/2000/svg';
const X_OFFSET_UTIL = '8';
const TEXTSPAN_TITLE_HEIGHT = 30;
const TEXTSPAN_DESCRIPTION_HEIGHT = 15;
const DEFAULT_PADDING = 15;

/***/ }),

/***/ 57488:
/*!***********************************************************!*\
  !*** ./src/app/Domain/Icon-Set-Configuration/allIcons.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allIcons: () => (/* binding */ allIcons),
/* harmony export */   appendedIcons: () => (/* binding */ appendedIcons),
/* harmony export */   getAllStandardIconKeys: () => (/* binding */ getAllStandardIconKeys),
/* harmony export */   overrideAppendedIcons: () => (/* binding */ overrideAppendedIcons)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);

let appendedIcons = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
const allIcons = {
  Person: '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
  Group: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" viewBox="0 0 24 26"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>',
  Pet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"/></svg>',
  Conversation: '<svg height="48" viewBox="0 0 24 26" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
  World: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/></svg>',
  Store: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/></svg>',
  Theater: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm4-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>',
  Business: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
  Water: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 16.99c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-4.45c-1.35 0-2.2.43-2.95.8-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-8.08c-.75-.38-1.58-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.37-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.93c1.35 0 2.2-.43 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V5.04c-.9 0-1.4-.25-2.05-.58zM17 8.09c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V9.49c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z"/></svg>',
  Hotel: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/></svg>',
  Dining: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>',
  'Gas-station': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 13.5V19H6v-7h6v1.5zm0-3.5H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
  'Meeting-room': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 19V4h-4V3H5v16H3v2h12V6h2v15h4v-2h-2zm-6 0H7V5h6v14zm-3-8h2v2h-2z"/></svg>',
  Courthouse: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>',
  Flag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6L14 4z"/></svg>',
  Place: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  Car: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
  Bus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm5.66 2.99H6.34C6.89 4.46 8.31 4 12 4s5.11.46 5.66.99zm.34 2V10H6V6.99h12zm-.34 9.74l-.29.27H6.63l-.29-.27C6.21 16.62 6 16.37 6 16v-4h12v4c0 .37-.21.62-.34.73z"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>',
  Train: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.51 0 4.96.48 5.57 1H6.43c.61-.52 2.06-1 5.57-1zM6 7h5v3H6V7zm12 8.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5zm0-5.5h-5V7h5v3z"/></svg>',
  Truck: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
  Taxi: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
  Bike: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>',
  Boat: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13 3v1h-2V3h2m-1 7.11l5.38 1.77 2.39.78-1.12 3.97c-.54-.3-.94-.71-1.14-.94L16 13.96l-1.51 1.72c-.34.4-1.28 1.32-2.49 1.32s-2.15-.92-2.49-1.32L8 13.96l-1.51 1.72c-.2.23-.6.63-1.14.93l-1.13-3.96 2.4-.79L12 10.11M15 1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1zM6 9.97V6h12v3.97L12 8 6 9.97zm10 9.71c-1.22.85-2.61 1.28-4 1.28s-2.78-.43-4-1.28C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 1.26.64 2.63.97 4 .97s2.74-.32 4-.97c1.26.65 2.62.99 4 .99h2v-2h-2c-1.39 0-2.78-.47-4-1.32z"/></svg>',
  Motorcycle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.72 11l-2 2h-.77l-.25-.69c-.18-.48-.42-.92-.72-1.31h3.74m2.69-6H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97L15.41 5zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82C7.4 16.15 6.28 17 5 17z"/></svg>',
  Plane: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
  'Flight-takeoff': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"/></svg>',
  'Flight-landing': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/></svg>',
  Shuttle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 5H3c-1.1 0-2 .89-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-6-6zm-2 2h1l3 3h-4V7zM9 7h4v3H9V7zM3 7h4v3H3V7zm3 10.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm12 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM21 14h-.78c-.55-.61-1.34-1-2.22-1s-1.67.39-2.22 1H8.22c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3v-2h18v2z"/></svg>',
  Walking: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7"/></svg>',
  Traffic: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 10h-3V8.86c1.72-.45 3-2 3-3.86h-3V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v1H4c0 1.86 1.28 3.41 3 3.86V10H4c0 1.86 1.28 3.41 3 3.86V15H4c0 1.86 1.28 3.41 3 3.86V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.14c1.72-.45 3-2 3-3.86h-3v-1.14c1.72-.45 3-2 3-3.86zm-5 9H9V5h6v14zm-3-1c.83 0 1.5-.67 1.5-1.5S12.83 15 12 15s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm0-4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 9c.83 0 1.5-.67 1.5-1.5S12.83 6 12 6s-1.5.67-1.5 1.5S11.17 9 12 9z"/></svg>',
  Commute: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 4H5C3.34 4 2 5.34 2 7v8c0 1.66 1.34 3 3 3l-1 1v1h1l2-2h2v-5H4V6h9v2h2V7c0-1.66-1.34-3-3-3zM5 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66l-1.42 4.11v5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11zm-8.16.34h7.19l1.03 3h-9.25l1.03-3zM12 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
  System: '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path d="M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z"/></svg>',
  Printer: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/></svg>',
  Document: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>',
  Folder: '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path d="M9.17,6l2,2H20v10L4,18V6H9.17 M10,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2 h-8L10,4L10,4z"/></svg>',
  Call: '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path d="M6.54,5C6.6,5.89,6.75,6.76,6.99,7.59l-1.2,1.2C5.38,7.59,5.12,6.32,5.03,5H6.54 M16.4,17.02c0.85,0.24,1.72,0.39,2.6,0.45 v1.49c-1.32-0.09-2.59-0.35-3.8-0.75L16.4,17.02 M7.5,3H4C3.45,3,3,3.45,3,4c0,9.39,7.61,17,17,17c0.55,0,1-0.45,1-1v-3.49\tc0-0.55-0.45-1-1-1c-1.24,0-2.45-0.2-3.57-0.57c-0.1-0.04-0.21-0.05-0.31-0.05c-0.26,0-0.51,0.1-0.71,0.29l-2.2,2.2 c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2C9.1,8.31,9.18,7.92,9.07,7.57C8.7,6.45,8.5,5.25,8.5,4C8.5,3.45,8.05,3,7.5,3L7.5,3z"/></svg>',
  Email: '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path fill-opacity="0.9" d="M12,1.95c-5.52,0-10,4.48-10,10s4.48,10,10,10h5v-2h-5c-4.34,0-8-3.66-8-8s3.66-8,8-8s8,3.66,8,8v1.43 c0,0.79-0.71,1.57-1.5,1.57S17,14.17,17,13.38v-1.43c0-2.76-2.24-5-5-5s-5,2.24-5,5s2.24,5,5,5c1.38,0,2.64-0.56,3.54-1.47 c0.65,0.89,1.77,1.47,2.96,1.47c1.97,0,3.5-1.6,3.5-3.57v-1.43C22,6.43,17.52,1.95,12,1.95z M12,14.95c-1.66,0-3-1.34-3-3 s1.34-3,3-3s3,1.34,3,3S13.66,14.95,12,14.95z"/></svg>',
  Copyright: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
  DNS: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>',
  Settings: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
  Cellphone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 22h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 18H8v-1h8v1zm0-3H8V5h8v10zm0-12H8V2h8v1z"/></svg>',
  Update: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 8v5l4.25 2.52.77-1.28-3.52-2.09V8zm10 2V3l-2.64 2.64C16.74 4.01 14.49 3 12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c1.93 0 3.68.79 4.95 2.05L14 10h7z"/></svg>',
  Briefcase: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/></svg>',
  Microphone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>',
  Signal: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>',
  Key: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M22 19h-6v-4h-2.68c-1.14 2.42-3.6 4-6.32 4-3.86 0-7-3.14-7-7s3.14-7 7-7c2.72 0 5.17 1.58 6.32 4H24v6h-2v4zm-4-2h2v-4h2v-2H11.94l-.23-.67C11.01 8.34 9.11 7 7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.11 0 4.01-1.34 4.71-3.33l.23-.67H18v4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>',
  Pencil: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/></svg>',
  Sum: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z"/></svg>',
  Headset: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 14v4h-2v-4h2M7 14v4H6c-.55 0-1-.45-1-1v-3h2m5-13c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4v1h-7v2h6c1.66 0 3-1.34 3-3V10c0-4.97-4.03-9-9-9z"/></svg>',
  Keyboard: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-3 0h2v2H5zm0-3h2v2H5zm3 6h8v2H8zm6-3h2v2h-2zm0-3h2v2h-2zm3 3h2v2h-2zm0-3h2v2h-2z"/></svg>',
  Mouse: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 9c-.04-4.39-3.6-7.93-8-7.93S4.04 4.61 4 9v6c0 4.42 3.58 8 8 8s8-3.58 8-8V9zm-2 0h-5V3.16c2.81.47 4.96 2.9 5 5.84zm-7-5.84V9H6c.04-2.94 2.19-5.37 5-5.84zM18 15c0 3.31-2.69 6-6 6s-6-2.69-6-6v-4h12v4z"/></svg>',
  Router: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16 4.2c1.5 0 3 .6 4.2 1.7l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2zm-3.3 2.5l.8.8c.7-.7 1.6-1 2.5-1s1.8.3 2.5 1l.8-.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 6H5v-4h14v4zM6 16h2v2H6zm3.5 0h2v2h-2zm3.5 0h2v2h-2z"/></svg>',
  Scanner: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.8 10.7L4.2 5l-.7 1.9L17.6 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5.5c0-.8-.5-1.6-1.2-1.8zM19 18H5v-4h14v4zM6 15h2v2H6zm4 0h8v2h-8z"/></svg>',
  Security: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
  Desktop: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>',
  'Speaker-phone': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 7.07L8.43 8.5c.91-.91 2.18-1.48 3.57-1.48s2.66.57 3.57 1.48L17 7.07C15.72 5.79 13.95 5 12 5s-3.72.79-5 2.07zM12 1C8.98 1 6.24 2.23 4.25 4.21l1.41 1.41C7.28 4 9.53 3 12 3s4.72 1 6.34 2.62l1.41-1.41C17.76 2.23 15.02 1 12 1zm2.86 9.01L9.14 10C8.51 10 8 10.51 8 11.14v9.71c0 .63.51 1.14 1.14 1.14h5.71c.63 0 1.14-.51 1.14-1.14v-9.71c.01-.63-.5-1.13-1.13-1.13zM15 20H9v-8h6v8z"/></svg>',
  Tablet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"/></svg>',
  Label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/></svg>',
  Receipt: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/></svg>',
  Calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z" /></svg>',
  Cloud: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>',
  Assessment: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>',
  Dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"/></svg>',
  'Pie-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.93 9H13V4.07c3.61.45 6.48 3.32 6.93 6.93zM4 12c0-4.07 3.06-7.44 7-7.93v15.86c-3.94-.49-7-3.86-7-7.93zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"/></svg>',
  Problem: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>',
  'Picture-as-PDF': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9zm4 2h1v-1h-1V9h1V8h-2v5h1zm-8 0h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H9v5h1v-2zm0-2h1v1h-1V9z"/></svg>',
  Grid: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>',
  Watch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14.31 2l.41 2.48C13.87 4.17 12.96 4 12 4c-.95 0-1.87.17-2.71.47L9.7 2h4.61m.41 17.52L14.31 22H9.7l-.41-2.47c.84.3 1.76.47 2.71.47.96 0 1.87-.17 2.72-.48M16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12s-1.19-4.81-3.04-6.27L16 0zm-4 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>',
  Euro: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1s.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/></svg>',
  Dollar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
  Info: '<svg height="48" viewBox="0 0 24 26" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>',
  Alarm: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zm4.837-6.19l4.607 3.845-1.28 1.535-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>',
  Wrench: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M22.61 18.99l-9.08-9.08c.93-2.34.45-5.1-1.44-7C9.79.61 6.21.4 3.66 2.26L7.5 6.11 6.08 7.52 2.25 3.69C.39 6.23.6 9.82 2.9 12.11c1.86 1.86 4.57 2.35 6.89 1.48l9.11 9.11c.39.39 1.02.39 1.41 0l2.3-2.3c.4-.38.4-1.01 0-1.41zm-3 1.6l-9.46-9.46c-.61.45-1.29.72-2 .82-1.36.2-2.79-.21-3.83-1.25C3.37 9.76 2.93 8.5 3 7.26l3.09 3.09 4.24-4.24-3.09-3.09c1.24-.07 2.49.37 3.44 1.31 1.08 1.08 1.49 2.57 1.24 3.96-.12.71-.42 1.37-.88 1.96l9.45 9.45-.88.89z"/></svg>',
  'Circle-Arrows': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>',
  'Credit-Card': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
  Favorite: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>',
  Gavel: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M1 21h12v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66 5.66-2.83 2.83L1 12.31l2.83-2.83z"/></svg>',
  Blind: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="8" cy="14" r="2"/><circle cx="12" cy="8" r="2"/><circle cx="16" cy="14" r="2"/></svg>',
  Hourglass: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>',
  Time: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
  Search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
  Shopping: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  'Thumb-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/></svg>',
  'Thumb-down': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z"/></svg>',
  'Thumb-up-down': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm-2 1.13L7.92 12H2V6.21l1.93-1.93L3.36 7H10v.13zM22.5 10h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5zm-.5 7.79l-1.93 1.93.57-2.72H14v-.13L16.08 12H22v5.79z"/></svg>',
  Couch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 9V7c0-1.65-1.35-3-3-3H6C4.35 4 3 5.35 3 7v2c-1.65 0-3 1.35-3 3v5c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3v-5c0-1.65-1.35-3-3-3zM5 7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v2.78c-.61.55-1 1.34-1 2.22v2H6v-2c0-.88-.39-1.67-1-2.22V7zm17 10c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v4h16v-4c0-.55.45-1 1-1s1 .45 1 1v5z"/></svg>',
  Attach: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>',
  Ruler: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>',
  Education: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>',
  'How-To-Reg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill-rule="evenodd" clip-rule="evenodd" fill="none" d="M0 0h24v24H0z"/><g fill-rule="evenodd" clip-rule="evenodd"><path d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"/><path d="M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z"/></g></svg>',
  'View-List': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M3 5v14h17V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm13 2H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z"/></svg>'
};
function getAllStandardIconKeys() {
  const allIconsDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
  allIconsDict.addEach(allIcons);
  return allIconsDict.keysArray();
}
function overrideAppendedIcons(newIcons) {
  appendedIcons = newIcons;
}

/***/ }),

/***/ 69186:
/*!********************************************************************!*\
  !*** ./src/app/Domain/Icon-Set-Configuration/iconConfiguration.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconConfiguration: () => (/* binding */ IconConfiguration),
/* harmony export */   defaultConf: () => (/* binding */ defaultConf)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/allIcons */ 57488);
/* harmony import */ var src_app_Domain_Common_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Domain/Common/configuration */ 80775);
/* harmony import */ var _Common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/constants */ 90816);




class IconConfiguration {
  constructor(allIconDictionary) {
    this.domainName = _Common_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME;
    this.allIconDictionary = allIconDictionary;
  }
  /**
   * Select the Iconset which you want to use
   */
  getDefaultConf() {
    return defaultConf;
  }
  updateAllIconRegistry(allIconDictionary) {
    this.allIconDictionary = allIconDictionary;
  }
  appendSRCFile(actors, actorsDict, workObjects, workObjectsDict) {
    const newAppendedIcons = {};
    actors.forEach(name => {
      if (!this.allIconDictionary.has(name)) {
        newAppendedIcons[name] = actorsDict.get(name);
      }
    });
    workObjects.forEach(name => {
      if (!this.allIconDictionary.has(name)) {
        newAppendedIcons[name] = workObjectsDict.get(name);
      }
    });
    const appen = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    Object.keys(newAppendedIcons).forEach(key => {
      appen.set(key, newAppendedIcons[key]);
    });
    (0,src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_1__.overrideAppendedIcons)(appen);
  }
  createCustomConf(iconSetConfiguration) {
    this.domainName = iconSetConfiguration.name;
    let actors = iconSetConfiguration.actors;
    let workObjects = iconSetConfiguration.workObjects;
    this.appendSRCFile(actors.keysArray(), actors, workObjects.keysArray(), workObjects);
    return new src_app_Domain_Common_configuration__WEBPACK_IMPORTED_MODULE_2__.Configuration(actors.keysArray(), workObjects.keysArray());
  }
}
/* eslint no-unused-vars: 0*/
/**
 * All Icons as one Set
 * There are more Icons than fit in the palette.
 * This is just for reference
 */
const allIconsConf = {
  actors: ['Person', 'Group', 'System', 'Pet'],
  workObjects: ['Place', 'Flag', 'World', 'Water', 'Store', 'Theater', 'Business', 'Meeting-room', 'Hotel', 'Dining', 'Courthouse', 'Gas-station', 'Car', 'Bus', 'Train', 'Truck', 'Taxi', 'Bike', 'Boat', 'Motorcycle', 'Plane', 'Flight-takeoff', 'Flight-landing', 'Shuttle', 'Walking', 'Traffic', 'Commute', 'Document', 'Folder', 'Call', 'Email', 'Copyright', 'Briefcase', 'Attach', 'Ruler', 'Sum', 'Conversation', 'Update', 'Cellphone', 'Speaker-phone', 'Signal', 'Key', 'Pencil', 'How-To-Reg', 'Settings', 'Grid', 'Label', 'Receipt', 'Calendar', 'Wrench', 'Headset', 'Keyboard', 'Mouse', 'Microphone', 'Router', 'Scanner', 'Printer', 'DNS', 'Security', 'Cloud', 'Desktop', 'Tablet', 'Assessment', 'Dashboard', 'Pie-chart', 'View-List', 'Euro', 'Dollar', 'Info', 'Alarm', 'Problem', 'Circle-Arrows', 'Picture-as-PDF', 'Credit-Card', 'Shopping', 'Favorite', 'Gavel', 'Blind', 'Hourglass', 'Time', 'Search', 'Thumb-up', 'Thumb-down', 'Thumb-up-down', 'Couch', 'Education', 'Watch']
};
/**
 * Default Iconset
 */
const defaultConf = {
  actors: ['Person', 'Group', 'System'],
  workObjects: ['Document', 'Folder', 'Call', 'Email', 'Conversation', 'Info']
};

/***/ }),

/***/ 36105:
/*!*****************************************************************!*\
  !*** ./src/app/Domain/Icon-Set-Configuration/iconFilterEnum.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconFilterEnum: () => (/* binding */ IconFilterEnum)
/* harmony export */ });
var IconFilterEnum;
(function (IconFilterEnum) {
  IconFilterEnum["ICON_FILTER_ACTOR"] = "ICON_FILTER_ACTOR";
  IconFilterEnum["ICON_FILTER_WORKOBJECT"] = "ICON_FILTER_WORKOBJECT";
  IconFilterEnum["ICON_FILTER_UNASSIGNED"] = "ICON_FILTER_UNASSIGNED";
  IconFilterEnum["ICON_FILTER_NONE"] = "ICON_FILTER_NONE";
})(IconFilterEnum || (IconFilterEnum = {}));

/***/ }),

/***/ 77044:
/*!***********************************************************************!*\
  !*** ./src/app/Domain/Icon-Set-Configuration/iconSetConfiguration.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromConfigurationFromFile: () => (/* binding */ fromConfigurationFromFile),
/* harmony export */   testCustomIconSetConfiguration: () => (/* binding */ testCustomIconSetConfiguration)
/* harmony export */ });
/* harmony import */ var _Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/constants */ 90816);
/* harmony import */ var _Common_businessObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/businessObject */ 78828);
/* harmony import */ var _Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/elementTypes */ 30236);
/* harmony import */ var _Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/dictionary/dictionary */ 54972);




const actor = structuredClone(_Common_businessObject__WEBPACK_IMPORTED_MODULE_1__.testBusinessObject);
actor.type = _Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR;
const testCustomIconSetConfiguration = {
  name: _Common_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_ICON_SET_NAME,
  actors: ['Person'],
  workObjects: ['Document']
};
function fromConfigurationFromFile(configFromFile) {
  const actorsDict = new _Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_3__.Dictionary();
  const workObjectsDict = new _Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_3__.Dictionary();
  Object.keys(configFromFile.actors).forEach(key => {
    let icon = configFromFile.actors[key];
    if (icon) {
      // make sure the actor has an icon
      actorsDict.add(icon, key);
    }
  });
  Object.keys(configFromFile.workObjects).forEach(key => {
    let icon = configFromFile.workObjects[key];
    if (icon) {
      // make sure the work object has an icon
      workObjectsDict.add(icon, key);
    }
  });
  return {
    name: configFromFile.name,
    actors: actorsDict,
    workObjects: workObjectsDict
  };
}

/***/ }),

/***/ 90684:
/*!*****************************************************!*\
  !*** ./src/app/Modules/autosave-settings.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveSettingsModule: () => (/* binding */ AutosaveSettingsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _Presentation_Autosave_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Presentation/Autosave/AutosaveSettings/autosave-settings.component */ 94709);
/* harmony import */ var _Presentation_Autosave_AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Presentation/Autosave/AutosaveOptions/autosave-options.component */ 47893);
/* harmony import */ var _Presentation_Autosave_AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Presentation/Autosave/AutosavedDrafts/autosaved-drafts.component */ 39083);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material.module */ 89439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);







class AutosaveSettingsModule {
  static #_ = this.ɵfac = function AutosaveSettingsModule_Factory(t) {
    return new (t || AutosaveSettingsModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: AutosaveSettingsModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AutosaveSettingsModule, {
    declarations: [_Presentation_Autosave_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveSettingsComponent, _Presentation_Autosave_AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_1__.AutosaveOptionsComponent, _Presentation_Autosave_AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_2__.AutosavedDraftsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule],
    exports: [_Presentation_Autosave_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveSettingsComponent]
  });
})();

/***/ }),

/***/ 76330:
/*!***************************************************************!*\
  !*** ./src/app/Modules/domain-story-modeler-module.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomainStoryModelerModuleModule: () => (/* binding */ DomainStoryModelerModuleModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _Presentation_Header_components_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Presentation/Header/components/header-buttons/header-buttons.component */ 9432);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);



class DomainStoryModelerModuleModule {
  static #_ = this.ɵfac = function DomainStoryModelerModuleModule_Factory(t) {
    return new (t || DomainStoryModelerModuleModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: DomainStoryModelerModuleModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DomainStoryModelerModuleModule, {
    declarations: [_Presentation_Header_components_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_0__.HeaderButtonsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    exports: [_Presentation_Header_components_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_0__.HeaderButtonsComponent]
  });
})();

/***/ }),

/***/ 47261:
/*!********************************************!*\
  !*** ./src/app/Modules/settings.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsModule: () => (/* binding */ SettingsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var src_app_Presentation_DomainConfiguration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Presentation/DomainConfiguration/icon-set-configuration.component */ 38574);
/* harmony import */ var _Presentation_DomainConfiguration_icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Presentation/DomainConfiguration/icon-list-item/icon-list-item.component */ 58414);
/* harmony import */ var _Presentation_DomainConfiguration_details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Presentation/DomainConfiguration/details-list-item/details-list-item.component */ 62748);
/* harmony import */ var _Presentation_DomainConfiguration_icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Presentation/DomainConfiguration/icon-set-details/icon-set-details.component */ 79052);
/* harmony import */ var _Presentation_Settings_General_general_settings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Presentation/Settings/General/general-settings.component */ 423);
/* harmony import */ var _Presentation_LabelDictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Presentation/LabelDictionary/label-dictionary.component */ 86328);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../material.module */ 89439);
/* harmony import */ var _autosave_settings_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./autosave-settings.module */ 90684);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 96623);











class SettingsModule {
  static #_ = this.ɵfac = function SettingsModule_Factory(t) {
    return new (t || SettingsModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: SettingsModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_autosave_settings_module__WEBPACK_IMPORTED_MODULE_7__.AutosaveSettingsModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_6__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](SettingsModule, {
    declarations: [src_app_Presentation_DomainConfiguration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_0__.IconSetConfigurationComponent, _Presentation_Settings_General_general_settings_component__WEBPACK_IMPORTED_MODULE_4__.GeneralSettingsComponent, _Presentation_LabelDictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_5__.LabelDictionaryComponent, _Presentation_DomainConfiguration_icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_1__.IconListItemComponent, _Presentation_DomainConfiguration_details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__.DetailsListItemComponent, _Presentation_DomainConfiguration_icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_3__.IconSetDetailsComponent],
    imports: [_autosave_settings_module__WEBPACK_IMPORTED_MODULE_7__.AutosaveSettingsModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_6__.MaterialModule],
    exports: [_Presentation_Settings_General_general_settings_component__WEBPACK_IMPORTED_MODULE_4__.GeneralSettingsComponent, src_app_Presentation_DomainConfiguration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_0__.IconSetConfigurationComponent, _Presentation_LabelDictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_5__.LabelDictionaryComponent]
  });
})();

/***/ }),

/***/ 47893:
/*!*************************************************************************************!*\
  !*** ./src/app/Presentation/Autosave/AutosaveOptions/autosave-options.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveOptionsComponent: () => (/* binding */ AutosaveOptionsComponent)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_Autosave_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Service/Autosave/autosave-configuration.service */ 97237);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 34294);








function AutosaveOptionsComponent_mat_card_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Autosave Options");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-card-content", 4)(5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 6, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Enabled");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 7)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Interval [sec]");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "input", 8, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 7)(16, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Max. Drafts");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input", 8, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosaveOptionsComponent_mat_card_0_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const activated_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
      const interval_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](14);
      const drafts_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](19);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r4.save(activated_r2.checked, +drafts_r4.value, +interval_r3.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, " Apply ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const configuration_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", configuration_r6.activated);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", configuration_r6.interval);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", configuration_r6.maxDrafts);
  }
}
class AutosaveOptionsComponent {
  constructor(autosaveConfiguration, snackbar) {
    this.autosaveConfiguration = autosaveConfiguration;
    this.snackbar = snackbar;
  }
  save(activated, maxDrafts, interval) {
    if (this.autosaveConfiguration.setConfiguration({
      activated,
      maxDrafts,
      interval
    })) {
      this.snackbar.open('Settings for Autosave saved', undefined, {
        duration: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
      });
    } else {
      this.snackbar.open('Unable to save settings for Autosave - please try again', undefined, {
        duration: 2 * src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_ERROR
      });
    }
  }
  static #_ = this.ɵfac = function AutosaveOptionsComponent_Factory(t) {
    return new (t || AutosaveOptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_Service_Autosave_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosaveOptionsComponent,
    selectors: [["app-autosave-options"]],
    decls: 2,
    vars: 3,
    consts: [["activated", ""], ["interval", ""], ["drafts", ""], [4, "ngIf"], [1, "cardContent"], [1, "alignSelfCenter"], ["type", "checkbox", 3, "checked"], [1, "inputContainer"], ["min", "1", "type", "number", 1, "numberInput", 3, "value"], ["mat-raised-button", "", "color", "primary", 1, "saveButton", 3, "click"]],
    template: function AutosaveOptionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AutosaveOptionsComponent_mat_card_0_Template, 22, 3, "mat-card", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx.autosaveConfiguration.configuration$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardTitle, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
    styles: [".autosaveEnabled[_ngcontent-%COMP%], .autosaveInterval[_ngcontent-%COMP%] {\n  display: inline-grid;\n  grid-template-columns: 120px auto;\n  width: 300px;\n  grid-row-gap: 5px;\n  height: 20px;\n}\n\n.enableButton[_ngcontent-%COMP%] {\n  justify-self: start;\n}\n\n.autosaveEnabled[_ngcontent-%COMP%] {\n  padding-bottom: 2px;\n}\n\n.autosaveInterval[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n\n.autosaveIntervalSpan[_ngcontent-%COMP%] {\n  padding-top: 2px;\n  justify-self: start;\n}\n\n.saveButton[_ngcontent-%COMP%] {\n  align-self: end;\n  right: 0;\n  margin-left: -5px;\n}\n\n.cardContent[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\n.inputContainer[_ngcontent-%COMP%] {\n  display: inline-grid;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.numberInput[_ngcontent-%COMP%] {\n  justify-self: end;\n  width: 64px;\n}\n\n.alignSelfCenter[_ngcontent-%COMP%] {\n  align-self: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9zYXZlLW9wdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsb0JBQUE7RUFDQSxpQ0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSx1QkFBQTtFQUFBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0FBQ0YiLCJmaWxlIjoiYXV0b3NhdmUtb3B0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRvc2F2ZUVuYWJsZWQsXG4uYXV0b3NhdmVJbnRlcnZhbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEyMHB4IGF1dG87XG4gIHdpZHRoOiAzMDBweDtcbiAgZ3JpZC1yb3ctZ2FwOiA1cHg7XG4gIGhlaWdodDogMjBweDtcbn1cblxuLmVuYWJsZUJ1dHRvbiB7XG4gIGp1c3RpZnktc2VsZjogc3RhcnQ7XG59XG5cbi5hdXRvc2F2ZUVuYWJsZWQge1xuICBwYWRkaW5nLWJvdHRvbTogMnB4O1xufVxuXG4uYXV0b3NhdmVJbnRlcnZhbCB7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uYXV0b3NhdmVJbnRlcnZhbFNwYW4ge1xuICBwYWRkaW5nLXRvcDogMnB4O1xuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xufVxuXG4uc2F2ZUJ1dHRvbiB7XG4gIGFsaWduLXNlbGY6IGVuZDtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiAtNXB4O1xufVxuXG4uY2FyZENvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5pbnB1dENvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG59XG5cbi5udW1iZXJJbnB1dCB7XG4gIGp1c3RpZnktc2VsZjogZW5kO1xuICB3aWR0aDogNjRweDtcbn1cblxuLmFsaWduU2VsZkNlbnRlciB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0F1dG9zYXZlL0F1dG9zYXZlT3B0aW9ucy9hdXRvc2F2ZS1vcHRpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0EsdUJBQUE7RUFBQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGO0FBRUEsNG1EQUE0bUQiLCJzb3VyY2VzQ29udGVudCI6WyIuYXV0b3NhdmVFbmFibGVkLFxuLmF1dG9zYXZlSW50ZXJ2YWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMjBweCBhdXRvO1xuICB3aWR0aDogMzAwcHg7XG4gIGdyaWQtcm93LWdhcDogNXB4O1xuICBoZWlnaHQ6IDIwcHg7XG59XG5cbi5lbmFibGVCdXR0b24ge1xuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xufVxuXG4uYXV0b3NhdmVFbmFibGVkIHtcbiAgcGFkZGluZy1ib3R0b206IDJweDtcbn1cblxuLmF1dG9zYXZlSW50ZXJ2YWwge1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuLmF1dG9zYXZlSW50ZXJ2YWxTcGFuIHtcbiAgcGFkZGluZy10b3A6IDJweDtcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcbn1cblxuLnNhdmVCdXR0b24ge1xuICBhbGlnbi1zZWxmOiBlbmQ7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW4tbGVmdDogLTVweDtcbn1cblxuLmNhcmRDb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uaW5wdXRDb250YWluZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4ubnVtYmVySW5wdXQge1xuICBqdXN0aWZ5LXNlbGY6IGVuZDtcbiAgd2lkdGg6IDY0cHg7XG59XG5cbi5hbGlnblNlbGZDZW50ZXIge1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 94709:
/*!***************************************************************************************!*\
  !*** ./src/app/Presentation/Autosave/AutosaveSettings/autosave-settings.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveSettingsComponent: () => (/* binding */ AutosaveSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutosaveOptions/autosave-options.component */ 47893);
/* harmony import */ var _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AutosavedDrafts/autosaved-drafts.component */ 39083);



class AutosaveSettingsComponent {
  static #_ = this.ɵfac = function AutosaveSettingsComponent_Factory(t) {
    return new (t || AutosaveSettingsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosaveSettingsComponent,
    selectors: [["app-autosave-settings"]],
    decls: 2,
    vars: 0,
    template: function AutosaveSettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-autosave-options")(1, "app-autosaved-drafts");
      }
    },
    dependencies: [_AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveOptionsComponent, _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_1__.AutosavedDraftsComponent],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRvc2F2ZS1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0F1dG9zYXZlL0F1dG9zYXZlU2V0dGluZ3MvYXV0b3NhdmUtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdMQUFnTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 39083:
/*!*************************************************************************************!*\
  !*** ./src/app/Presentation/Autosave/AutosavedDrafts/autosaved-drafts.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosavedDraftsComponent: () => (/* binding */ AutosavedDraftsComponent)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Service/Autosave/autosave.service */ 30534);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ 3695);







function AutosavedDraftsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6)(1, "div")(2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosavedDraftsComponent_div_7_div_1_Template_button_click_6_listener() {
      const draft_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.loadDraft(draft_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Load Draft ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const draft_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](draft_r3.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](draft_r3.date);
  }
}
function AutosavedDraftsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AutosavedDraftsComponent_div_7_div_1_Template, 8, 2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosavedDraftsComponent_div_7_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.removeAllDrafts());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Remove All Drafts ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.drafts);
  }
}
function AutosavedDraftsComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, "No drafts found.");
  }
}
class AutosavedDraftsComponent {
  constructor(autosaveService, snackbar) {
    this.autosaveService = autosaveService;
    this.snackbar = snackbar;
    this.drafts = [];
    this.subscription = this.autosaveService.autosavedDraftsChanged$.subscribe(() => this.initDrafts());
  }
  ngOnInit() {
    this.initDrafts();
  }
  initDrafts() {
    this.drafts = this.autosaveService.loadCurrentDrafts();
  }
  loadDraft(draft) {
    this.autosaveService.loadDraft(draft);
    this.snackbar.open('Draft loaded', undefined, {
      duration: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
      panelClass: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
    });
  }
  removeAllDrafts() {
    this.autosaveService.removeAllDrafts();
  }
  static #_ = this.ɵfac = function AutosavedDraftsComponent_Factory(t) {
    return new (t || AutosavedDraftsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosavedDraftsComponent,
    selectors: [["app-autosaved-drafts"]],
    decls: 10,
    vars: 4,
    consts: [["noDrafts", ""], ["class", "items", 4, "ngIf", "ngIfElse"], [1, "items"], ["class", "item border-bottom", 4, "ngFor", "ngForOf"], [1, "item"], ["mat-raised-button", "", "color", "primary", 1, "item-button", 3, "click"], [1, "item", "border-bottom"], [1, "item-title"], [1, "item-date"]],
    template: function AutosavedDraftsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-accordion")(1, "mat-expansion-panel")(2, "mat-expansion-panel-header")(3, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "History");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, AutosavedDraftsComponent_div_7_Template, 6, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, AutosavedDraftsComponent_ng_template_8_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const noDrafts_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx.drafts.length ? ctx.drafts.length : "no", " ", ctx.drafts.length > 1 ? "drafts" : "draft", " available ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.drafts.length)("ngIfElse", noDrafts_r5);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanelTitle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanelDescription],
    styles: [".items[_ngcontent-%COMP%] {\n  padding-top: 0 !important;\n}\n.items[_ngcontent-%COMP%]    .mat-list-item-content {\n  padding: 0;\n}\n\n.item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 8px 0;\n  width: 400px;\n}\n\n.border-bottom[_ngcontent-%COMP%] {\n  border-bottom: 1px solid darkgray;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  font-weight: bold;\n  width: 270px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.item-date[_ngcontent-%COMP%] {\n  font-weight: normal;\n}\n\n.item-button[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n\nmat-list-item[_ngcontent-%COMP%] {\n  border-bottom: 1px solid darkgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9zYXZlZC1kcmFmdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFJRSx5QkFBQTtBQUZGO0FBREU7RUFDRSxVQUFBO0FBR0o7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlDQUFBO0FBQ0YiLCJmaWxlIjoiYXV0b3NhdmVkLWRyYWZ0cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtcyB7XG4gIDo6bmctZGVlcC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgcGFkZGluZy10b3A6IDAgIWltcG9ydGFudDtcbn1cblxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDhweCAwO1xuICB3aWR0aDogNDAwcHg7XG59XG5cbi5ib3JkZXItYm90dG9tIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGRhcmtncmF5O1xufVxuXG4uaXRlbS10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB3aWR0aDogMjcwcHg7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaXRlbS1kYXRlIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLml0ZW0tYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG59XG5cbm1hdC1saXN0LWl0ZW0ge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgZGFya2dyYXk7XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0F1dG9zYXZlL0F1dG9zYXZlZERyYWZ0cy9hdXRvc2F2ZWQtZHJhZnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBSUUseUJBQUE7QUFGRjtBQURFO0VBQ0UsVUFBQTtBQUdKOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsaUNBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQ0FBQTtBQUNGO0FBQ0EsbzBDQUFvMEMiLCJzb3VyY2VzQ29udGVudCI6WyIuaXRlbXMge1xuICA6Om5nLWRlZXAubWF0LWxpc3QtaXRlbS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIHBhZGRpbmctdG9wOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgd2lkdGg6IDQwMHB4O1xufVxuXG4uYm9yZGVyLWJvdHRvbSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBkYXJrZ3JheTtcbn1cblxuLml0ZW0tdGl0bGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgd2lkdGg6IDI3MHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLml0ZW0tZGF0ZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi5pdGVtLWJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xufVxuXG5tYXQtbGlzdC1pdGVtIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGRhcmtncmF5O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 29383:
/*!**********************************************************!*\
  !*** ./src/app/Presentation/Canvas/modeler.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelerComponent: () => (/* binding */ ModelerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Service/Modeler/modeler.service */ 74676);
/* harmony import */ var _Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Service/Autosave/autosave.service */ 30534);



class ModelerComponent {
  constructor(modelerService, autosaveService) {
    this.modelerService = modelerService;
    this.autosaveService = autosaveService;
  }
  ngOnInit() {
    this.modelerService.postInit();
    this.autosaveService.loadLatestDraft();
  }
  static #_ = this.ɵfac = function ModelerComponent_Factory(t) {
    return new (t || ModelerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_0__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ModelerComponent,
    selectors: [["app-modeler"]],
    decls: 1,
    vars: 0,
    consts: [["id", "canvas"]],
    template: function ModelerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0);
      }
    },
    styles: ["#canvas[_ngcontent-%COMP%], #canvas[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  top: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  bottom: 0;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsTUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFDRiIsImZpbGUiOiJtb2RlbGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NhbnZhcyxcbiNjYW52YXMgPiBkaXYge1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0NhbnZhcy9tb2RlbGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLE1BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFDQSxnZkFBZ2YiLCJzb3VyY2VzQ29udGVudCI6WyIjY2FudmFzLFxuI2NhbnZhcyA+IGRpdiB7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 63954:
/*!**********************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/activity-dialog/activity-dialog.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityDialogComponent: () => (/* binding */ ActivityDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _dialog_forms_activity_dialog_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dialog-forms/activity-dialog-form */ 1974);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var src_app_Domain_Dialog_activityDialogData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Dialog/activityDialogData */ 93703);









class ActivityDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.activity = data.activity;
    this.activityLabel = data.activity.businessObject.name;
    this.numberIsAllowedMultipleTimes = data.numberIsAllowedMultipleTimes;
    this.activityNumber = data.activity.businessObject.number ?? null;
    this.showNumberFields = data.showNumberFields;
    this.saveFN = data.saveFN;
    this.form = _dialog_forms_activity_dialog_form__WEBPACK_IMPORTED_MODULE_0__.ActivityDialogForm.create(this.activityLabel, this.activityNumber, this.numberIsAllowedMultipleTimes);
    this.form.controls.activityNumber.valueChanges.subscribe(activityNumber => {
      if (activityNumber !== null) {
        if (activityNumber < 1) {
          this.form.controls.activityNumber.setValue(1);
        }
      }
    });
  }
  onSubmit() {
    this.numberIsAllowedMultipleTimes = !this.numberIsAllowedMultipleTimes;
    this.form.patchValue({
      multipleNumbers: this.numberIsAllowedMultipleTimes
    });
  }
  save() {
    this.saveFN({
      activity: this.activity,
      ...this.form.value
    });
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  preventDefault(event) {
    event.preventDefault();
  }
  static #_ = this.ɵfac = function ActivityDialogComponent_Factory(t) {
    return new (t || ActivityDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ActivityDialogComponent,
    selectors: [["app-activity-dialog"]],
    decls: 20,
    vars: 2,
    consts: [[3, "formGroup"], [3, "hidden"], [1, "shortWidth"], ["matInput", "", "type", "number", "formControlName", "activityNumber"], ["type", "checkbox", "formControlName", "multipleNumbers", 3, "change"], [1, "fullWidth"], ["matInput", "", "type", "text", "formControlName", "activityLabel", "autofocus", "", "cdkFocusInitial", "", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"]],
    template: function ActivityDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Edit Activity");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 0)(4, "div", 1)(5, "mat-form-field", 2)(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ActivityDialogComponent_Template_input_change_9_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " multiple ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-form-field", 5)(12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "textarea", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function ActivityDialogComponent_Template_textarea_keydown_enter_14_listener($event) {
          return ctx.preventDefault($event);
        })("keyup.enter", function ActivityDialogComponent_Template_textarea_keyup_enter_14_listener() {
          return ctx.save();
        })("keyup.escape", function ActivityDialogComponent_Template_textarea_keyup_escape_14_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "mat-dialog-actions")(16, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ActivityDialogComponent_Template_button_click_16_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ActivityDialogComponent_Template_button_click_18_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", !ctx.showNumberFields);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput],
    styles: [".shortWidth[_ngcontent-%COMP%] {\n  width: 200px;\n}\n\n.fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n .mat-form-field-label {\n  font-size: 12pt !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGl2aXR5LWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFDQTtFQUNFLDBCQUFBO0FBRUYiLCJmaWxlIjoiYWN0aXZpdHktZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNob3J0V2lkdGgge1xuICB3aWR0aDogMjAwcHg7XG59XG5cbi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cbjo6bmctZGVlcC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJwdCAhaW1wb3J0YW50O1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RpYWxvZy9hY3Rpdml0eS1kaWFsb2cvYWN0aXZpdHktZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtBQUNGOztBQUNBO0VBQ0UsMEJBQUE7QUFFRjtBQUNBLGdnQkFBZ2dCIiwic291cmNlc0NvbnRlbnQiOlsiLnNob3J0V2lkdGgge1xuICB3aWR0aDogMjAwcHg7XG59XG5cbi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cbjo6bmctZGVlcC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJwdCAhaW1wb3J0YW50O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1974:
/*!**************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/dialog-forms/activity-dialog-form.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityDialogForm: () => (/* binding */ ActivityDialogForm)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 48015);

var ActivityDialogForm;
(function (ActivityDialogForm) {
  function create(activityLabel, activityNumber, numberIsAllowedMultipleTimes) {
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormGroup({
      activityLabel: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(activityLabel, {
        nonNullable: true
      }),
      activityNumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(activityNumber, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
      multipleNumbers: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(numberIsAllowedMultipleTimes, {
        nonNullable: true
      })
    });
  }
  ActivityDialogForm.create = create;
})(ActivityDialogForm || (ActivityDialogForm = {}));

/***/ }),

/***/ 94810:
/*!************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/dialog-forms/header-dialog-form.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderDialogForm: () => (/* binding */ HeaderDialogForm)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 48015);

var HeaderDialogForm;
(function (HeaderDialogForm) {
  function create(titel, description) {
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormGroup({
      title: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(titel),
      description: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(description)
    });
  }
  HeaderDialogForm.create = create;
})(HeaderDialogForm || (HeaderDialogForm = {}));

/***/ }),

/***/ 97218:
/*!******************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/export-dialog/export-dialog.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportDialogComponent: () => (/* binding */ ExportDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/BehaviorSubject */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var src_app_Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Dialog/exportDialogData */ 83064);







function ExportDialogComponent_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_button_17_Template_button_click_0_listener() {
      const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).index;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.doOption(i_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("title", option_r4.tooltip);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", option_r4.text, " ");
  }
}
class ExportDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.withTitle = new rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this.useWhiteBackground = new rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this.title = data.title;
    this.options = data.options;
  }
  ngOnInit() {}
  doOption(i) {
    this.options[i].fn(this.withTitle.value, this.useWhiteBackground.value);
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  updateWithTitle($event) {
    // @ts-ignore
    this.withTitle.next($event.target.checked);
  }
  updateUseWhiteBackground($event) {
    // @ts-ignore
    this.useWhiteBackground.next($event.target.checked);
  }
  static #_ = this.ɵfac = function ExportDialogComponent_Factory(t) {
    return new (t || ExportDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ExportDialogComponent,
    selectors: [["app-export-dialog"]],
    decls: 18,
    vars: 8,
    consts: [["type", "checkbox", 3, "change", "checked"], ["mat-flat-button", "", 3, "click"], ["mat-stroked-button", "", "class", "mr-1", 3, "title", "click", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", 1, "mr-1", 3, "click", "title"]],
    template: function ExportDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "label")(4, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ExportDialogComponent_Template_input_change_4_listener($event) {
          return ctx.updateWithTitle($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Add title and description to image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label")(9, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ExportDialogComponent_Template_input_change_9_listener($event) {
          return ctx.updateUseWhiteBackground($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " Add white background to SVG (default: transparent) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-dialog-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div")(15, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_Template_button_click_15_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, ExportDialogComponent_button_17_Template, 2, 2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 4, ctx.withTitle));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 6, ctx.useWhiteBackground));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.options);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJleHBvcnQtZGlhbG9nLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RpYWxvZy9leHBvcnQtZGlhbG9nL2V4cG9ydC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 21270:
/*!******************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/header-dialog/header-dialog.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderDialogComponent: () => (/* binding */ HeaderDialogComponent)
/* harmony export */ });
/* harmony import */ var _dialog_forms_header_dialog_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dialog-forms/header-dialog-form */ 94810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/Title/title.service */ 69672);
/* harmony import */ var _Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Service/DirtyFlag/dirty-flag.service */ 89791);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 29836);









class HeaderDialogComponent {
  constructor(dialogRef, titleService, dirtyFlagService) {
    this.dialogRef = dialogRef;
    this.titleService = titleService;
    this.dirtyFlagService = dirtyFlagService;
  }
  ngOnInit() {
    const title = this.titleService.getTitle();
    const description = this.titleService.getDescription();
    this.form = _dialog_forms_header_dialog_form__WEBPACK_IMPORTED_MODULE_0__.HeaderDialogForm.create(title, description);
  }
  save() {
    if (this.form.dirty) {
      this.dirtyFlagService.makeDirty();
      this.titleService.updateTitleAndDescription(this.form.getRawValue().title, this.form.getRawValue().description, true);
    }
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  preventDefault(event) {
    event.preventDefault();
  }
  static #_ = this.ɵfac = function HeaderDialogComponent_Factory(t) {
    return new (t || HeaderDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__.DirtyFlagService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: HeaderDialogComponent,
    selectors: [["app-header-dialog"]],
    decls: 16,
    vars: 1,
    consts: [[3, "formGroup"], [1, "dialogWidth"], ["matInput", "", "type", "text", "formControlName", "title"], ["maxlength", "2000", "matInput", "", "formControlName", "description", 1, "descriptionInput", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"]],
    template: function HeaderDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-dialog-content")(1, "form", 0)(2, "mat-form-field", 1)(3, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-form-field", 1)(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown.enter", function HeaderDialogComponent_Template_textarea_keydown_enter_10_listener($event) {
          return ctx.preventDefault($event);
        })("keyup.enter", function HeaderDialogComponent_Template_textarea_keyup_enter_10_listener() {
          return ctx.save();
        })("keyup.escape", function HeaderDialogComponent_Template_textarea_keyup_escape_10_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "mat-dialog-actions")(12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderDialogComponent_Template_button_click_12_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderDialogComponent_Template_button_click_14_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput],
    styles: [".dialogWidth[_ngcontent-%COMP%] {\n  width: 50vw;\n}\n.dialogWidth[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  font-size: 12pt;\n}\n\n.descriptionInput[_ngcontent-%COMP%] {\n  min-height: 75px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7QUFFSjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kaWFsb2dXaWR0aCB7XG4gIHdpZHRoOiA1MHZ3O1xuICBtYXQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTJwdDtcbiAgfVxufVxuXG4uZGVzY3JpcHRpb25JbnB1dCB7XG4gIG1pbi1oZWlnaHQ6IDc1cHg7XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RpYWxvZy9oZWFkZXItZGlhbG9nL2hlYWRlci1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7QUFFSjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7QUFDQSx3ZUFBd2UiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlhbG9nV2lkdGgge1xuICB3aWR0aDogNTB2dztcbiAgbWF0LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEycHQ7XG4gIH1cbn1cblxuLmRlc2NyaXB0aW9uSW5wdXQge1xuICBtaW4taGVpZ2h0OiA3NXB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 16266:
/*!**************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/info-dialog/info-dialog.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfoDialogComponent: () => (/* binding */ InfoDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var src_app_Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Dialog/infoDialogData */ 45574);





function InfoDialogComponent_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r0.infoText, " ");
  }
}
function InfoDialogComponent_a_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.linkText, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.linkText);
  }
}
function InfoDialogComponent_mat_dialog_actions_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-actions")(1, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InfoDialogComponent_mat_dialog_actions_5_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class InfoDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.title = data.title;
    this.infoText = data.infoText;
    this.showConfirmButton = !data.isInfo;
    this.hasLink = data.isLink;
    this.linkText = data.linkText || '';
  }
  ngAfterViewInit() {
    const span = document.getElementsByClassName('readOnlyText')[0];
    span.style.height = span.scrollHeight + 'px';
  }
  close() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function InfoDialogComponent_Factory(t) {
    return new (t || InfoDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: InfoDialogComponent,
    selectors: [["app-info-dialog"]],
    decls: 6,
    vars: 4,
    consts: [[1, "content"], ["id", "info-dialog-title"], ["class", "readOnlyText", 4, "ngIf"], [3, "href", 4, "ngIf"], [4, "ngIf"], [1, "readOnlyText"], [3, "href"], [1, "mat-raised-button", 3, "click"]],
    template: function InfoDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, InfoDialogComponent_span_3_Template, 2, 1, "span", 2)(4, InfoDialogComponent_a_4_Template, 2, 2, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, InfoDialogComponent_mat_dialog_actions_5_Template, 3, 0, "mat-dialog-actions", 4);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.infoText != "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasLink);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showConfirmButton);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent],
    styles: [".readOnlyText[_ngcontent-%COMP%] {\n  display: block;\n  border: none;\n  resize: none;\n  width: 100%;\n  overflow: hidden;\n  white-space: pre-wrap;\n}\n\n.content[_ngcontent-%COMP%] {\n  height: -moz-fit-content;\n  height: fit-content;\n  width: 30vw;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZm8tZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFFQTtFQUNFLHdCQUFBO0VBQUEsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRiIsImZpbGUiOiJpbmZvLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZWFkT25seVRleHQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyOiBub25lO1xuICByZXNpemU6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi5jb250ZW50IHtcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgd2lkdGg6IDMwdnc7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RpYWxvZy9pbmZvLWRpYWxvZy9pbmZvLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx3QkFBQTtFQUFBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFFQSxnckJBQWdyQiIsInNvdXJjZXNDb250ZW50IjpbIi5yZWFkT25seVRleHQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyOiBub25lO1xuICByZXNpemU6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi5jb250ZW50IHtcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgd2lkdGg6IDMwdnc7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 23958:
/*!**************************************************************************************************!*\
  !*** ./src/app/Presentation/Dialog/label-dictionary-dialog/label-dictionary-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryDialogComponent: () => (/* binding */ LabelDictionaryDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _LabelDictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../LabelDictionary/label-dictionary.component */ 86328);



class LabelDictionaryDialogComponent {
  constructor(dialogRef) {
    this.dialogRef = dialogRef;
  }
  close() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function LabelDictionaryDialogComponent_Factory(t) {
    return new (t || LabelDictionaryDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LabelDictionaryDialogComponent,
    selectors: [["app-label-dictionary-dialog"]],
    decls: 4,
    vars: 0,
    consts: [[3, "closeEmitter"]],
    template: function LabelDictionaryDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Label Dictionary");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "app-label-dictionary", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("closeEmitter", function LabelDictionaryDialogComponent_Template_app_label_dictionary_closeEmitter_3_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_LabelDictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryComponent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYWJlbC1kaWN0aW9uYXJ5LWRpYWxvZy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RpYWxvZy9sYWJlbC1kaWN0aW9uYXJ5LWRpYWxvZy9sYWJlbC1kaWN0aW9uYXJ5LWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0xBQXdMIiwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 62748:
/*!***************************************************************************************************!*\
  !*** ./src/app/Presentation/DomainConfiguration/details-list-item/details-list-item.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetailsListItemComponent: () => (/* binding */ DetailsListItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/form-field */ 48913);


class DetailsListItemComponent {
  constructor() {
    this.iconInitiated = false;
  }
  get id() {
    return 'domain-configuration-details-icon-' + this.icon.name.toLowerCase() + '-' + (this.icon.isWorkObject ? 'workobject' : 'actor');
  }
  get name() {
    return this.icon.name;
  }
  ngAfterViewChecked() {
    this.createIcon();
  }
  createIcon() {
    const img = document.getElementById(this.id);
    if (img && !this.iconInitiated) {
      img.src = '' + this.icon.svg;
      this.iconInitiated = true;
    }
  }
  static #_ = this.ɵfac = function DetailsListItemComponent_Factory(t) {
    return new (t || DetailsListItemComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: DetailsListItemComponent,
    selectors: [["app-details-list-item"]],
    inputs: {
      icon: "icon"
    },
    decls: 4,
    vars: 4,
    consts: [[1, "detailsListItem"], [1, "icon", 3, "id", "alt", "src"], [1, "iconName"]],
    template: function DetailsListItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.icon.svg, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.icon.name);
      }
    },
    dependencies: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__.MatLabel],
    styles: [".icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  padding-right: 3px;\n}\n\n.detailsListItem[_ngcontent-%COMP%] {\n  display: flex;\n  justify-items: center;\n  align-items: center;\n  width: 250px;\n}\n\n.iconName[_ngcontent-%COMP%] {\n  max-width: 225px;\n  word-wrap: anywhere;\n  white-space: pre-wrap !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbHMtbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7QUFDRiIsImZpbGUiOiJkZXRhaWxzLWxpc3QtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pY29uIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogM3B4O1xufVxuXG4uZGV0YWlsc0xpc3RJdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMjUwcHg7XG59XG5cbi5pY29uTmFtZSB7XG4gIG1heC13aWR0aDogMjI1cHg7XG4gIHdvcmQtd3JhcDogYW55d2hlcmU7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcCAhaW1wb3J0YW50O1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RvbWFpbkNvbmZpZ3VyYXRpb24vZGV0YWlscy1saXN0LWl0ZW0vZGV0YWlscy1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBQ0Esb3lCQUFveUIiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvbiB7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDNweDtcbn1cblxuLmRldGFpbHNMaXN0SXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDI1MHB4O1xufVxuXG4uaWNvbk5hbWUge1xuICBtYXgtd2lkdGg6IDIyNXB4O1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXAgIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 58414:
/*!*********************************************************************************************!*\
  !*** ./src/app/Presentation/DomainConfiguration/icon-list-item/icon-list-item.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconListItemComponent: () => (/* binding */ IconListItemComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Service/IconSetConfiguration/icon-set-customization.service */ 87007);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ 68529);




class IconListItemComponent {
  get name() {
    return this.iconName;
  }
  get id() {
    return 'domain-configuration-icon-' + this.iconName;
  }
  constructor(iconSetCustomizationService) {
    this.iconSetCustomizationService = iconSetCustomizationService;
    this.iconName = '';
    this.iconInitiated = false;
    // @ts-ignore
    this.icon = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject({});
    this.isActor = false;
    this.isWorkobject = false;
    this.isNone = true;
  }
  ngOnInit() {
    this.icon = this.iconSetCustomizationService.getIconForName(this.iconName);
    if (!this.icon) {
      return;
    }
    this.icon.subscribe(value => {
      this.isActor = value.isActor;
      this.isWorkobject = value.isWorkObject;
      this.isNone = !(value.isActor || value.isWorkObject);
    });
    this.isActor = this.icon.value.isActor;
    this.isWorkobject = this.icon.value.isWorkObject;
    this.isNone = !(this.icon.value.isActor || this.icon.value.isWorkObject);
  }
  ngAfterViewChecked() {
    this.createIcon();
  }
  createIcon() {
    const img = document.getElementById(this.id);
    if (img && !this.iconInitiated) {
      img.src = '' + this.icon.value?.svg;
      this.iconInitiated = true;
    }
  }
  toggleNone() {
    this.iconSetCustomizationService.setAsUnassigned(this.iconName, this.icon.value.isActor);
  }
  toggleActor() {
    this.iconSetCustomizationService.setAsActor(true, this.iconName);
  }
  toggleWorkobject() {
    this.iconSetCustomizationService.setAsWorkobject(true, this.iconName);
  }
  static #_ = this.ɵfac = function IconListItemComponent_Factory(t) {
    return new (t || IconListItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__.IconSetCustomizationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: IconListItemComponent,
    selectors: [["app-icon-list-item"]],
    inputs: {
      iconName: "iconName"
    },
    decls: 16,
    vars: 13,
    consts: [[1, "content"], ["src", "", 1, "icon", 3, "id", "alt"], [1, "name"], [1, "footer"], [3, "change", "value", "checked"], [1, "toggleButtonTitle"]],
    template: function IconListItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3)(6, "mat-button-toggle-group")(7, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_7_listener() {
          return ctx.toggleNone();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "None");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_10_listener() {
          return ctx.toggleActor();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Actor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_13_listener() {
          return ctx.toggleWorkobject();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Workobject");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.isNone)("checked", ctx.isNone);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("activeMatButtonActor", ctx.isActor);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.isActor)("checked", ctx.isActor);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("activeMatButtonWorkObject", ctx.isWorkobject);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.isWorkobject)("checked", ctx.isWorkobject);
      }
    },
    dependencies: [_angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__.MatButtonToggle],
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto;\n  justify-items: center;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n}\n\n.name[_ngcontent-%COMP%] {\n  word-wrap: anywhere;\n  max-height: 75px;\n  overflow: hidden;\n  padding-bottom: 2px;\n}\n\n.footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.footer[_ngcontent-%COMP%]    .mat-button-toggle-label-content {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonActor button {\n  background-color: #43acbf;\n  color: #ffffff;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonWorkObject button {\n  background-color: #0168b7;\n  color: #ffffff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImljb24tbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFDRTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSwrQkFBQTtBQUNKO0FBRUU7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFBSjtBQUdFO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBREoiLCJmaWxlIjoiaWNvbi1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pY29uIHtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbn1cblxuLm5hbWUge1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICBtYXgtaGVpZ2h0OiA3NXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogMnB4O1xufVxuXG4uZm9vdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgOjpuZy1kZWVwLm1hdC1idXR0b24tdG9nZ2xlLWxhYmVsLWNvbnRlbnQge1xuICAgIGZvbnQtc2l6ZTogMTBwdCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDAgNXB4ICFpbXBvcnRhbnQ7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQgIWltcG9ydGFudDtcbiAgfVxuXG4gIDo6bmctZGVlcC5hY3RpdmVNYXRCdXR0b25BY3RvciBidXR0b24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM0M2FjYmY7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gIH1cblxuICA6Om5nLWRlZXAuYWN0aXZlTWF0QnV0dG9uV29ya09iamVjdCBidXR0b24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMTY4Yjc7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gIH1cbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RvbWFpbkNvbmZpZ3VyYXRpb24vaWNvbi1saXN0LWl0ZW0vaWNvbi1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFDRjtBQUNFO0VBQ0UsMEJBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0FBQ0o7QUFFRTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUFKO0FBR0U7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFESjtBQUNBLHc5Q0FBdzlDIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xufVxuXG4uaWNvbiB7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG59XG5cbi5uYW1lIHtcbiAgd29yZC13cmFwOiBhbnl3aGVyZTtcbiAgbWF4LWhlaWdodDogNzVweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZy1ib3R0b206IDJweDtcbn1cblxuLmZvb3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIDo6bmctZGVlcC5tYXQtYnV0dG9uLXRvZ2dsZS1sYWJlbC1jb250ZW50IHtcbiAgICBmb250LXNpemU6IDEwcHQgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gIH1cblxuICA6Om5nLWRlZXAuYWN0aXZlTWF0QnV0dG9uQWN0b3IgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDNhY2JmO1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICB9XG5cbiAgOjpuZy1kZWVwLmFjdGl2ZU1hdEJ1dHRvbldvcmtPYmplY3QgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDE2OGI3O1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 38574:
/*!**************************************************************************************!*\
  !*** ./src/app/Presentation/DomainConfiguration/icon-set-configuration.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigurationComponent: () => (/* binding */ IconSetConfigurationComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/iconSetConfiguration */ 77044);
/* harmony import */ var src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Utils/sanitizer */ 66107);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Domain/Icon-Set-Configuration/iconFilterEnum */ 36105);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var _Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Service/IconSetConfiguration/icon-set-customization.service */ 87007);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icon-list-item/icon-list-item.component */ 58414);
/* harmony import */ var _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icon-set-details/icon-set-details.component */ 79052);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 39191);















function IconSetConfigurationComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-icon-list-item", 19);
  }
  if (rf & 2) {
    const iconName_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("iconName", iconName_r1);
  }
}
class IconSetConfigurationComponent {
  constructor(configurationService, iconDictionaryService, iconSetCustomizationService, elementRegistryService) {
    this.configurationService = configurationService;
    this.iconDictionaryService = iconDictionaryService;
    this.iconSetCustomizationService = iconSetCustomizationService;
    this.elementRegistryService = elementRegistryService;
    this.filter = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_NONE);
    this.selectedActors = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject([]);
    this.selectedWorkobjects = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject([]);
    this.allIconNames = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject([]);
    this.allFilteredIconNames = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject([]);
    this.iconSetConfigurationTypes = this.iconSetCustomizationService.getIconSetConfiguration().value;
    this.allIcons = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject(this.iconDictionaryService.getFullDictionary());
    this.allIcons.subscribe(allIcons => {
      this.allIconNames.next(allIcons.keysArray().sort(this.sortByName));
    });
    this.selectedActors = this.iconSetCustomizationService.selectedActors$;
    this.selectedWorkobjects = this.iconSetCustomizationService.selectedWorkobjects$;
  }
  ngOnInit() {
    this.filter.subscribe(type => {
      let allFiltered = this.getFilteredNamesForType(type);
      this.allFilteredIconNames.next(allFiltered.sort(this.sortByName));
    });
  }
  sortByName(a, b) {
    if (a.includes('_custom') == b.includes('_custom')) {
      if (a < b) return -1;else {
        return 1;
      }
    } else {
      if (a.includes('_custom')) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  /** Default Icon Set **/
  loadMinimalIconConfigurationWithDefaultIcons() {
    this.iconSetCustomizationService.resetIconSet();
  }
  loadInitialConfiguration() {
    this.iconSetCustomizationService.cancel();
  }
  /** Persist Icon Set **/
  saveIconSet() {
    this.iconSetCustomizationService.saveIconSet(this.elementRegistryService.getUsedIcons());
  }
  exportIconSet() {
    this.iconSetCustomizationService.exportIconSet();
  }
  /** Add Custom Icon **/
  startIconUpload() {
    document.getElementById('importIcon')?.click();
  }
  importIcon() {
    // @ts-ignore
    const files = document.getElementById('importIcon').files;
    for (let iconInputFile of files) {
      const reader = new FileReader();
      const name = (0,src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__.sanitizeIconName)(iconInputFile.name);
      const iconName = name + _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.CUSTOM;
      reader.onloadend = e => {
        if (e.target) {
          const src = e.target.result;
          this.iconDictionaryService.addIMGToIconDictionary(src, iconName);
          // TODO: td: What kind of type is it here?
          this.iconDictionaryService.registerIconForBPMN(iconName, src, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
          this.allIcons.next(this.iconDictionaryService.getFullDictionary());
          this.filter.next(this.filter.value);
          this.iconSetCustomizationService.addNewIcon(iconName);
        }
      };
      reader.readAsDataURL(iconInputFile);
    }
  }
  /** Import Icon Set **/
  startIconSetImport() {
    document.getElementById('importDomain')?.click();
  }
  importIconSet() {
    // @ts-ignore
    const iconSetInputFile = document.getElementById('importDomain').files[0];
    const reader = new FileReader();
    reader.onloadend = e => {
      const configFromFile = JSON.parse(e.target?.result);
      const config = (0,src_app_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_0__.fromConfigurationFromFile)(configFromFile);
      this.configurationService.loadConfiguration(config, false);
      this.iconSetCustomizationService.importConfiguration(config);
    };
    reader.readAsText(iconSetInputFile);
  }
  /** Filter **/
  filterForActors() {
    if (this.filter.value !== _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_ACTOR) {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_ACTOR);
    } else {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_NONE);
    }
  }
  filterForWorkobjects() {
    if (this.filter.value !== _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_WORKOBJECT) {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_WORKOBJECT);
    } else {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_NONE);
    }
  }
  filterForUnassigned() {
    if (this.filter.value !== _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_UNASSIGNED) {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_UNASSIGNED);
    } else {
      this.filter.next(_Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_NONE);
    }
  }
  filterByNameAndType($event) {
    const filteredByNameAndType = this.getFilteredNamesForType(this.filter.value).filter(name => name.toLowerCase().includes($event.target.value.toLowerCase()));
    this.allFilteredIconNames.next(filteredByNameAndType.sort(this.sortByName));
  }
  getFilteredNamesForType(type) {
    let allFiltered = [];
    switch (type) {
      case _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_NONE:
        allFiltered = this.allIconNames.value;
        break;
      case _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_ACTOR:
        allFiltered = this.allIconNames.value.filter(name => this.iconSetCustomizationService.isIconActor(name));
        break;
      case _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_WORKOBJECT:
        allFiltered = this.allIconNames.value.filter(name => this.iconSetCustomizationService.isIconWorkObject(name));
        break;
      case _Domain_Icon_Set_Configuration_iconFilterEnum__WEBPACK_IMPORTED_MODULE_3__.IconFilterEnum.ICON_FILTER_UNASSIGNED:
        allFiltered = this.allIconNames.value.filter(name => !this.iconSetCustomizationService.isIconActor(name) && !this.iconSetCustomizationService.isIconWorkObject(name));
        break;
    }
    return allFiltered;
  }
  static #_ = this.ɵfac = function IconSetConfigurationComponent_Factory(t) {
    return new (t || IconSetConfigurationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_6__.IconSetCustomizationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_7__.ElementRegistryService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: IconSetConfigurationComponent,
    selectors: [["app-icon-set-configuration"]],
    decls: 47,
    vars: 14,
    consts: [[1, "content"], [1, "header"], [1, "searchbar"], ["mat-button", "", "title", "Unassigned Icons", 3, "click"], ["mat-button", "", "title", "Actors", 3, "click"], ["mat-button", "", "title", "Workobjects", 3, "click"], ["matInput", "", "type", "text", "placeholder", "Filter by name", 1, "textInput", 3, "input"], [1, "buttons"], ["mat-button", "", "title", "Upload Icon", 3, "click"], [1, "material-icons-outlined", "materialIconButton"], ["type", "file", "multiple", "", "accept", ".svg, image/png, image/jpeg, image/gif, image/bpmn", "id", "importIcon", "name", "file", "onclick", "this.value=null", 2, "display", "none", 3, "change"], ["mat-button", "", "title", "Reset to default icon set", 1, "button", 3, "click"], ["mat-button", "", "title", "Cancel changes", 3, "click"], [1, "divider"], ["mat-button", "", "title", "Save icon set", 3, "click"], ["mat-button", "", "title", "Import icon set", 3, "click"], ["type", "file", "accept", ".domain, .iconset", "id", "importDomain", "name", "file", "onclick", "this.value=null", 2, "display", "none", 3, "change"], ["mat-button", "", "title", "Export icon set", 3, "click"], [1, "iconList", "smallScrollbar"], [3, "iconName"], [1, "iconSetDetails"]],
    template: function IconSetConfigurationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "div", 1)(3, "div", 2)(4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Filter by assignment:");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_6_listener() {
          return ctx.filterForUnassigned();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9, "None");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](11, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_10_listener() {
          return ctx.filterForActors();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13, "Actors");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_14_listener() {
          return ctx.filterForWorkobjects();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17, "Workobjects");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function IconSetConfigurationComponent_Template_input_input_18_listener($event) {
          return ctx.filterByNameAndType($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 7)(20, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_20_listener() {
          return ctx.startIconUpload();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22, "upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_23_listener() {
          return ctx.importIcon();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_24_listener() {
          return ctx.loadMinimalIconConfigurationWithDefaultIcons();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26, " home ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_27_listener() {
          return ctx.loadInitialConfiguration();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](29, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](30, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_31_listener() {
          return ctx.saveIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](33, "save");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_35_listener() {
          return ctx.startIconSetImport();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](36, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](37, "unarchive");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_38_listener() {
          return ctx.importIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_39_listener() {
          return ctx.exportIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](41, "archive");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrepeaterCreate"](43, IconSetConfigurationComponent_For_44_Template, 1, 1, "app-icon-list-item", 19, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](45, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](46, "app-icon-set-details", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("activeNone", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](7, 6, ctx.filter) === "ICON_FILTER_UNASSIGNED");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("activeActor", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](11, 8, ctx.filter) === "ICON_FILTER_ACTOR");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("activeWorkObject", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](15, 10, ctx.filter) === "ICON_FILTER_WORKOBJECT");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](45, 12, ctx.allFilteredIconNames));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_8__.IconListItemComponent, _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_9__.IconSetDetailsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 250px;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: max-content auto;\n  height: 46px;\n  border-bottom: #ccc 2px solid;\n}\n\n.searchbar[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-left: 15px;\n  margin-right: 15px;\n  align-self: center;\n  align-items: center;\n  justify-self: left;\n  height: inherit;\n  border-right: #ccc 2px solid;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-self: center;\n  align-items: center;\n  justify-self: right;\n  height: inherit;\n}\n.buttons[_ngcontent-%COMP%]    .mat-button {\n  min-width: 36px;\n}\n\n.divider[_ngcontent-%COMP%] {\n  border-left: #ccc 2px solid;\n  height: inherit;\n}\n\n.button[_ngcontent-%COMP%] {\n  width: 36px;\n}\n\n.mat-button[_ngcontent-%COMP%] {\n  color: #666666;\n}\n\n.activeActor[_ngcontent-%COMP%] {\n  background-color: #42aebb;\n  color: white;\n}\n\n.activeNone[_ngcontent-%COMP%] {\n  background-color: #e0e0e0;\n  color: black;\n}\n\n.activeWorkObject[_ngcontent-%COMP%] {\n  background-color: #42aebb;\n  color: white;\n}\n\n.textInput[_ngcontent-%COMP%] {\n  width: 300px;\n  margin-left: 15px;\n  margin-right: 5px;\n  border: #666666 1px solid;\n}\n\n.iconList[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-y: scroll;\n  height: calc(100vh - 130px);\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: baseline;\n  margin-top: 1rem;\n  margin-left: 1rem;\n  gap: 1rem;\n}\n.iconList[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-last-child(1) {\n  margin-bottom: 1rem;\n}\n\n.iconSetDetails[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n .mat-grid-tile .mat-grid-tile-content {\n  justify-content: inherit;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImljb24tc2V0LWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsaUNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSx1Q0FBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDRjtBQUNFO0VBQ0UsZUFBQTtBQUNKOztBQUdBO0VBQ0UsMkJBQUE7RUFDQSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0FBQUY7O0FBR0E7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUFBRjs7QUFHQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUFGOztBQUdBO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7QUFBRjtBQUVFO0VBQ0UsbUJBQUE7QUFBSjs7QUFJQTtFQUNFLFlBQUE7QUFERjs7QUFLRTtFQUNFLHdCQUFBO0FBRkoiLCJmaWxlIjoiaWNvbi1zZXQtY29uZmlndXJhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDI1MHB4O1xufVxuXG4uaGVhZGVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBhdXRvO1xuICBoZWlnaHQ6IDQ2cHg7XG4gIGJvcmRlci1ib3R0b206ICNjY2MgMnB4IHNvbGlkO1xufVxuXG4uc2VhcmNoYmFyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlci1yaWdodDogI2NjYyAycHggc29saWQ7XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiByaWdodDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xuXG4gIDo6bmctZGVlcC5tYXQtYnV0dG9uIHtcbiAgICBtaW4td2lkdGg6IDM2cHg7XG4gIH1cbn1cblxuLmRpdmlkZXIge1xuICBib3JkZXItbGVmdDogI2NjYyAycHggc29saWQ7XG4gIGhlaWdodDogaW5oZXJpdDtcbn1cblxuLmJ1dHRvbiB7XG4gIHdpZHRoOiAzNnB4O1xufVxuXG4ubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4uYWN0aXZlQWN0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDJhZWJiO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5hY3RpdmVOb25lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWN0aXZlV29ya09iamVjdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmFlYmI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnRleHRJbnB1dCB7XG4gIHdpZHRoOiAzMDBweDtcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBib3JkZXI6ICM2NjY2NjYgMXB4IHNvbGlkO1xufVxuXG4uaWNvbkxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDEzMHB4KTtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1jb250ZW50OiBiYXNlbGluZTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIGdhcDogMXJlbTtcblxuICA6bnRoLWxhc3QtY2hpbGQoMSkge1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIH1cbn1cblxuLmljb25TZXREZXRhaWxzIHtcbiAgd2lkdGg6IDI1MHB4O1xufVxuXG46Om5nLWRlZXAubWF0LWdyaWQtdGlsZSB7XG4gIC5tYXQtZ3JpZC10aWxlLWNvbnRlbnQge1xuICAgIGp1c3RpZnktY29udGVudDogaW5oZXJpdDtcbiAgfVxufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RvbWFpbkNvbmZpZ3VyYXRpb24vaWNvbi1zZXQtY29uZmlndXJhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVDQUFBO0VBQ0EsWUFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUNGO0FBQ0U7RUFDRSxlQUFBO0FBQ0o7O0FBR0E7RUFDRSwyQkFBQTtFQUNBLGVBQUE7QUFBRjs7QUFHQTtFQUNFLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUFGOztBQUdBO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBQUY7O0FBR0E7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsU0FBQTtBQUFGO0FBRUU7RUFDRSxtQkFBQTtBQUFKOztBQUlBO0VBQ0UsWUFBQTtBQURGOztBQUtFO0VBQ0Usd0JBQUE7QUFGSjtBQUNBLG9pR0FBb2lHIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMjUwcHg7XG59XG5cbi5oZWFkZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IGF1dG87XG4gIGhlaWdodDogNDZweDtcbiAgYm9yZGVyLWJvdHRvbTogI2NjYyAycHggc29saWQ7XG59XG5cbi5zZWFyY2hiYXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LXNlbGY6IGxlZnQ7XG4gIGhlaWdodDogaW5oZXJpdDtcbiAgYm9yZGVyLXJpZ2h0OiAjY2NjIDJweCBzb2xpZDtcbn1cblxuLmJ1dHRvbnMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LXNlbGY6IHJpZ2h0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG5cbiAgOjpuZy1kZWVwLm1hdC1idXR0b24ge1xuICAgIG1pbi13aWR0aDogMzZweDtcbiAgfVxufVxuXG4uZGl2aWRlciB7XG4gIGJvcmRlci1sZWZ0OiAjY2NjIDJweCBzb2xpZDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4uYnV0dG9uIHtcbiAgd2lkdGg6IDM2cHg7XG59XG5cbi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbi5hY3RpdmVBY3RvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmFlYmI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFjdGl2ZU5vbmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY3RpdmVXb3JrT2JqZWN0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyYWViYjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4udGV4dElucHV0IHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXJnaW4tbGVmdDogMTVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGJvcmRlcjogIzY2NjY2NiAxcHggc29saWQ7XG59XG5cbi5pY29uTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTMwcHgpO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWNvbnRlbnQ6IGJhc2VsaW5lO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgZ2FwOiAxcmVtO1xuXG4gIDpudGgtbGFzdC1jaGlsZCgxKSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgfVxufVxuXG4uaWNvblNldERldGFpbHMge1xuICB3aWR0aDogMjUwcHg7XG59XG5cbjo6bmctZGVlcC5tYXQtZ3JpZC10aWxlIHtcbiAgLm1hdC1ncmlkLXRpbGUtY29udGVudCB7XG4gICAganVzdGlmeS1jb250ZW50OiBpbmhlcml0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 79052:
/*!*************************************************************************************************!*\
  !*** ./src/app/Presentation/DomainConfiguration/icon-set-details/icon-set-details.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetDetailsComponent: () => (/* binding */ IconSetDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-set-customization.service */ 87007);
/* harmony import */ var src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/Title/title.service */ 69672);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../details-list-item/details-list-item.component */ 62748);









function IconSetDetailsComponent_mat_list_item_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dragover", function IconSetDetailsComponent_mat_list_item_11_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.allowDrop($event, "actorList"));
    })("dragstart", function IconSetDetailsComponent_mat_list_item_11_Template_mat_list_item_dragstart_0_listener() {
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDragStart(i_r3, "actorList"));
    })("drop", function IconSetDetailsComponent_mat_list_item_11_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const iconName_r5 = ctx_r3.$implicit;
      const i_r3 = ctx_r3.index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r5, true, i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-details-list-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const iconName_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r1.getIconForName(iconName_r5));
  }
}
function IconSetDetailsComponent_mat_list_item_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dragover", function IconSetDetailsComponent_mat_list_item_17_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.allowDrop($event, "workobjectList"));
    })("dragstart", function IconSetDetailsComponent_mat_list_item_17_Template_mat_list_item_dragstart_0_listener() {
      const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDragStart(i_r7, "workobjectList"));
    })("drop", function IconSetDetailsComponent_mat_list_item_17_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const iconName_r9 = ctx_r7.$implicit;
      const i_r7 = ctx_r7.index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r9, false, i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-details-list-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const iconName_r9 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r1.getIconForName(iconName_r9));
  }
}
class IconSetDetailsComponent {
  constructor(customizationService, titleService) {
    this.customizationService = customizationService;
    this.draggedList = '';
    this.draggedIndex = 0;
    this.selectedActors$ = this.customizationService.selectedActors$;
    this.selectedWorkobjects$ = this.customizationService.selectedWorkobjects$;
    this.iconSetName = titleService.iconSetName$;
  }
  ngOnInit() {}
  changeName(event) {
    // @ts-ignore
    this.customizationService.changeName(event.target.value);
  }
  getIconForName(iconName) {
    return this.customizationService.getIconForName(iconName).value;
  }
  allowDrop($event, listName) {
    if (this.draggedList === listName) {
      $event.preventDefault();
    }
  }
  onDrop($event, iconName, actors, index) {
    let list;
    if (actors) {
      list = this.selectedActors$;
    } else {
      list = this.selectedWorkobjects$;
    }
    const sortedList = list.value;
    const item = sortedList[this.draggedIndex];
    sortedList.splice(this.draggedIndex, 1);
    sortedList.splice(index, 0, item);
    list.next(sortedList);
    if (actors) {
      this.customizationService.setSelectedActors(sortedList);
    } else {
      this.customizationService.setSelectedWorkObject(sortedList);
    }
  }
  onDragStart(index, draggedList) {
    this.draggedList = draggedList;
    this.draggedIndex = index;
  }
  static #_ = this.ɵfac = function IconSetDetailsComponent_Factory(t) {
    return new (t || IconSetDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__.IconSetCustomizationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__.TitleService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: IconSetDetailsComponent,
    selectors: [["app-icon-set-details"]],
    decls: 19,
    vars: 9,
    consts: [[1, "details", "smallScrollbar"], [1, "iconSetDetails", "bottom-border"], [1, "inputWidth", "inputHeight"], [1, "alignment"], [1, "inputHeight"], ["matInput", "", "type", "text", "placeholder", "Icon Set Name", 3, "input", "value"], [1, "actorList", "bottom-border"], ["class", "compactItem", "draggable", "true", 3, "dragover", "dragstart", "drop", 4, "ngFor", "ngForOf"], [1, "workobjectList"], ["draggable", "true", 1, "compactItem", 3, "dragover", "dragstart", "drop"], [3, "icon"]],
    template: function IconSetDetailsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-form-field", 4)(5, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function IconSetDetailsComponent_Template_input_input_5_listener($event) {
          return ctx.changeName($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6)(8, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Order of Actors");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, IconSetDetailsComponent_mat_list_item_11_Template, 2, 1, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 8)(14, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Order of Work Objects");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, IconSetDetailsComponent_mat_list_item_17_Template, 2, 1, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](18, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 3, ctx.iconSetName));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](12, 5, ctx.selectedActors$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](18, 7, ctx.selectedWorkobjects$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatListItem, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__.DetailsListItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
    styles: [".details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 46px - 20px);\n  grid-row-gap: 1px;\n  overflow-y: auto;\n  overflow-x: auto;\n  width: 250px;\n  border-left: solid 1px #ccc;\n}\n\n.iconSetDetails[_ngcontent-%COMP%]    .mat-mdc-form-field-infix {\n  border: none;\n  padding-bottom: 0 !important;\n  padding-top: 0 !important;\n}\n.iconSetDetails[_ngcontent-%COMP%]    .mdc-text-field {\n  padding-left: 0 !important;\n}\n\n.compactItem[_ngcontent-%COMP%] {\n  height: 40px !important;\n}\n\n.fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-left: 15px;\n}\n\n.alignment[_ngcontent-%COMP%] {\n  height: 12px;\n}\n\n.inputHeight[_ngcontent-%COMP%] {\n  height: 46px;\n}\n\n.inputWidth[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-left: 15px;\n}\n\nh3[_ngcontent-%COMP%] {\n  padding-left: 15px;\n  margin-bottom: 0;\n  font-weight: bold;\n}\n\nmat-list[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n\n.bottom-border[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #ccc;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImljb24tc2V0LWRldGFpbHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQUNGOztBQUdFO0VBQ0UsWUFBQTtFQUNBLDRCQUFBO0VBQ0EseUJBQUE7QUFBSjtBQUdFO0VBQ0UsMEJBQUE7QUFESjs7QUFLQTtFQUNFLHVCQUFBO0FBRkY7O0FBS0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtBQUZGOztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBRkY7O0FBS0E7RUFDRSxjQUFBO0FBRkY7O0FBS0E7RUFDRSw2QkFBQTtBQUZGIiwiZmlsZSI6Imljb24tc2V0LWRldGFpbHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQ2cHggLSAyMHB4KTtcbiAgZ3JpZC1yb3ctZ2FwOiAxcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIHdpZHRoOiAyNTBweDtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjY2NjO1xufVxuXG4uaWNvblNldERldGFpbHMge1xuICA6Om5nLWRlZXAubWF0LW1kYy1mb3JtLWZpZWxkLWluZml4IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLXRvcDogMCAhaW1wb3J0YW50O1xuICB9XG5cbiAgOjpuZy1kZWVwLm1kYy10ZXh0LWZpZWxkIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcbiAgfVxufVxuXG4uY29tcGFjdEl0ZW0ge1xuICBoZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcbn1cblxuLmZ1bGxXaWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG59XG5cbi5hbGlnbm1lbnQge1xuICBoZWlnaHQ6IDEycHg7XG59XG5cbi5pbnB1dEhlaWdodCB7XG4gIGhlaWdodDogNDZweDtcbn1cblxuLmlucHV0V2lkdGgge1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xufVxuXG5oMyB7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbm1hdC1saXN0IHtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbi5ib3R0b20tYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNjY2M7XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0RvbWFpbkNvbmZpZ3VyYXRpb24vaWNvbi1zZXQtZGV0YWlscy9pY29uLXNldC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7QUFDRjs7QUFHRTtFQUNFLFlBQUE7RUFDQSw0QkFBQTtFQUNBLHlCQUFBO0FBQUo7QUFHRTtFQUNFLDBCQUFBO0FBREo7O0FBS0E7RUFDRSx1QkFBQTtBQUZGOztBQUtBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUFGRjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQUZGOztBQUtBO0VBQ0UsY0FBQTtBQUZGOztBQUtBO0VBQ0UsNkJBQUE7QUFGRjtBQUNBLG8xREFBbzFEIiwic291cmNlc0NvbnRlbnQiOlsiLmRldGFpbHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA0NnB4IC0gMjBweCk7XG4gIGdyaWQtcm93LWdhcDogMXB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICB3aWR0aDogMjUwcHg7XG4gIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2NjYztcbn1cblxuLmljb25TZXREZXRhaWxzIHtcbiAgOjpuZy1kZWVwLm1hdC1tZGMtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmctYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy10b3A6IDAgIWltcG9ydGFudDtcbiAgfVxuXG4gIDo6bmctZGVlcC5tZGMtdGV4dC1maWVsZCB7XG4gICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLmNvbXBhY3RJdGVtIHtcbiAgaGVpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xufVxuXG4uYWxpZ25tZW50IHtcbiAgaGVpZ2h0OiAxMnB4O1xufVxuXG4uaW5wdXRIZWlnaHQge1xuICBoZWlnaHQ6IDQ2cHg7XG59XG5cbi5pbnB1dFdpZHRoIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXJnaW4tbGVmdDogMTVweDtcbn1cblxuaDMge1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5tYXQtbGlzdCB7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuXG4uYm90dG9tLWJvcmRlciB7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjY2NjO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9432:
/*!*******************************************************************************************!*\
  !*** ./src/app/Presentation/Header/components/header-buttons/header-buttons.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderButtonsComponent: () => (/* binding */ HeaderButtonsComponent)
/* harmony export */ });
/* harmony import */ var _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Domain/Dialog/exportDialogData */ 83064);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _Dialog_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Dialog/export-dialog/export-dialog.component */ 97218);
/* harmony import */ var _Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Domain/Dialog/infoDialogData */ 45574);
/* harmony import */ var _Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Dialog/info-dialog/info-dialog.component */ 16266);
/* harmony import */ var _Dialog_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Dialog/label-dictionary-dialog/label-dictionary-dialog.component */ 23958);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Service/Settings/settings.service */ 58124);
/* harmony import */ var _Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../Service/Modeler/modeler.service */ 74676);
/* harmony import */ var _Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../Service/Replay/replay-state.service */ 67820);
/* harmony import */ var _Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../Service/DirtyFlag/dirty-flag.service */ 89791);
/* harmony import */ var _Service_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Service/Dialog/dialog.service */ 4730);
/* harmony import */ var _Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../Service/Replay/replay.service */ 94788);
/* harmony import */ var _Service_Export_export_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../Service/Export/export.service */ 98106);
/* harmony import */ var _Service_Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../Service/Import/import-domain-story.service */ 23779);
/* harmony import */ var _Service_Title_title_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../Service/Title/title.service */ 69672);
/* harmony import */ var _Service_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../Service/Renderer/renderer.service */ 94896);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 39191);




















function HeaderButtonsComponent_div_0_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1, " archive ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
}
function HeaderButtonsComponent_div_0_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1, " archive ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
}
function HeaderButtonsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div")(1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.startReplay());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3, " play_arrow ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](4, "button", 3)(5, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](6, " unarchive ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function HeaderButtonsComponent_div_0_Template_input_change_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.import());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.openDownloadDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](9, HeaderButtonsComponent_div_0_span_9_Template, 2, 0, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](10, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](11, HeaderButtonsComponent_div_0_span_11_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.openLabelDictionary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](15, " spellcheck ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](16, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.openSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](18, " settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](19, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.openKeyboardShortcutsDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](20, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](21, " keyboard ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](22, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_0_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.createNewDomainStory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](23, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](24, " note_add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("disabled", !ctx_r1.replayService.isReplayable());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r1.replayService.isReplayable());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("disabled", !ctx_r1.isExportable());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r1.isExportable());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](10, 11, ctx_r1.isDirty$));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](12, 13, ctx_r1.isDirty$));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("disabled", !ctx_r1.exportService.isDomainStoryExportable());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r1.exportService.isDomainStoryExportable());
  }
}
function HeaderButtonsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div")(1, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_2_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.previousSentence());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3, " skip_previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](4, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_2_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.nextSentence());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](6, " skip_next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function HeaderButtonsComponent_div_2_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r1.stopReplay());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](9, " stop ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
  }
}
class HeaderButtonsComponent {
  constructor(settingsService, modelerService, replayStateService, dirtyFlagService, dialogService, replayService, exportService, importService, titleService, renderService, snackbar) {
    this.settingsService = settingsService;
    this.modelerService = modelerService;
    this.replayStateService = replayStateService;
    this.dirtyFlagService = dirtyFlagService;
    this.dialogService = dialogService;
    this.replayService = replayService;
    this.exportService = exportService;
    this.importService = importService;
    this.titleService = titleService;
    this.renderService = renderService;
    this.snackbar = snackbar;
    this.isReplay$ = this.replayStateService.replayOn$;
    this.isDirty$ = this.dirtyFlagService.dirty$;
  }
  import() {
    // @ts-ignore
    const file = document.getElementById('import').files[0];
    const filename = file.name;
    const dstSvgPattern = /.*(.dst)(\s*\(\d+\)){0,1}\.svg/;
    const egnSvgPattern = /.*(.egn)(\s*\(\d+\)){0,1}\.svg/;
    if (filename.endsWith('.dst')) {
      this.importService.importDST(file, filename, false);
    } else if (filename.match(dstSvgPattern)) {
      this.importService.importDST(file, filename, true);
    } else if (filename.endsWith('.egn')) {
      this.importService.importEGN(file, filename, false);
    } else if (filename.match(egnSvgPattern)) {
      this.importService.importEGN(file, filename, true);
    }
    this.modelerService.commandStackChanged();
  }
  openSettings() {
    this.settingsService.open();
  }
  /** Open Dialogs **/
  openDownloadDialog() {
    if (this.exportService.isDomainStoryExportable()) {
      const SVGDownloadOption = new _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__.ExportOption('SVG', 'Download an SVG-Image with the Domain-Story embedded. Can be used to save and share your Domain-Story.', (withTitle, useWhiteBackground) => this.exportService.downloadSVG(withTitle, useWhiteBackground));
      const EGNDownloadOption = new _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__.ExportOption('EGN', 'Download an EGN-File with the Domain-Story. Can be used to save and share your Domain-Story.', () => this.exportService.downloadDST());
      const PNGDownloadOption = new _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__.ExportOption('PNG', 'Download a PNG-Image of the Domain-Story. This does not include the Domain-Story!', withTitle => this.exportService.downloadPNG(withTitle));
      const HTMLDownloadOption = new _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__.ExportOption('HTML-Presentation', 'Download an HTML-Presentation. This does not include the Domain-Story!', () => this.exportService.downloadHTMLPresentation());
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      config.data = new _Domain_Dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__.ExportDialogData('Export', [SVGDownloadOption, EGNDownloadOption, PNGDownloadOption, HTMLDownloadOption]);
      this.dialogService.openDialog(_Dialog_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ExportDialogComponent, config);
    } else {
      this.snackbar.open('No Domain Story to be exported', undefined, {
        duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_DURATION,
        panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_INFO
      });
    }
  }
  openKeyboardShortcutsDialog() {
    const title = 'Keyboard Shortcuts';
    const shortCutText = 'Undo:\t\t\t\t\tctrl + Z \n' + 'Redo:\t\t\t\t\tctrl + Y    OR   ctrl + shift + Z\n' + 'Select All:\t\t\t\tctrl + A\n' + 'Export as EGN:\t\t\tctrl + S\n' + 'Import Domain Story: \t\tctrl + L\n' + 'Search for text:\t\t\tctrl + F\n' + 'Direct editing:\t\t\tE\n' + 'Hand tool:\t\t\t\tH\n' + 'Lasso tool:\t\t\t\tL\n' + 'Space tool:\t\t\t\tS';
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = new _Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_2__.InfoDialogData(title, shortCutText, true);
    this.dialogService.openDialog(_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__.InfoDialogComponent, config);
  }
  openLabelDictionary() {
    if (this.exportService.isDomainStoryExportable()) {
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_17__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      this.dialogService.openDialog(_Dialog_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_4__.LabelDictionaryDialogComponent, config);
    } else {
      this.snackbar.open('There are currently no Elements on the canvas', undefined, {
        duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_DURATION,
        panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_INFO
      });
    }
  }
  createNewDomainStory() {
    this.titleService.reset();
    this.renderService.reset();
    this.dirtyFlagService.makeClean();
  }
  /** Replay functions **/
  startReplay() {
    this.replayService.startReplay();
  }
  stopReplay() {
    this.replayService.stopReplay();
  }
  previousSentence() {
    this.replayService.previousSentence();
  }
  nextSentence() {
    this.replayService.nextSentence();
  }
  isExportable() {
    return this.titleService.hasTitleOrDescription() || this.exportService.isDomainStoryExportable();
  }
  static #_ = this.ɵfac = function HeaderButtonsComponent_Factory(t) {
    return new (t || HeaderButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_6__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_7__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_8__.ReplayStateService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_9__.DirtyFlagService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_10__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_11__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Export_export_service__WEBPACK_IMPORTED_MODULE_12__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_13__.ImportDomainStoryService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_14__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_Service_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_15__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__.MatSnackBar));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
    type: HeaderButtonsComponent,
    selectors: [["app-header-buttons"]],
    decls: 4,
    vars: 6,
    consts: [[4, "ngIf"], ["id", "buttonStartReplay", "title", "Start replay", 1, "headerButton", 3, "click", "disabled"], [1, "material-icons", "materialIconButton"], ["id", "buttonImport", "title", "Import story from file", "onclick", "document.getElementById('import').click();", 1, "headerButton"], ["type", "file", "accept", ".dst, .svg, .egn, .svg", "id", "import", "onclick", "this.value=null;", "name", "file", 2, "display", "none", 3, "change"], ["id", "export", "title", "Export story as .egn, .svg or .png file", 1, "headerButton", 3, "click", "disabled"], ["class", "material-icons-outlined materialIconButton", 4, "ngIf"], ["class", "material-icons materialIconButton", 4, "ngIf"], ["title", "Label Dictionary", 1, "headerButton", 3, "click", "disabled"], ["title", "Label Dictionary", 1, "material-icons", "materialIconButton"], ["title", "Settings", 1, "headerButton", 3, "click"], ["title", "Change Icons and Settings", 1, "material-icons", "materialIconButton"], ["title", "Show keyboard shortcuts", 1, "headerButton", 3, "click"], ["title", "Create a new domain story", 1, "headerButton", 3, "click"], [1, "material-icons-outlined", "materialIconButton"], ["title", "Previous sentence", 1, "headerButton", 3, "click"], ["title", "Next sentence", 1, "headerButton", 3, "click"], ["title", "Stop replay", 1, "headerButton", 3, "click"]],
    template: function HeaderButtonsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](0, HeaderButtonsComponent_div_0_Template, 25, 15, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](2, HeaderButtonsComponent_div_2_Template, 10, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](3, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](1, 2, ctx.isReplay$));
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](3, 4, ctx.isReplay$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_19__.AsyncPipe],
    styles: ["span[_ngcontent-%COMP%] {\n  font-size: 15pt;\n  color: white;\n}\n\n#dictionaryButton[_ngcontent-%COMP%] {\n  opacity: 0.2;\n  pointer-events: none;\n}\n\n.headerButton[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.headerButton[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.disabled[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .disabled[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  cursor: initial;\n  color: gray;\n}\n\n.materialIconButton[_ngcontent-%COMP%]:hover {\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci1idXR0b25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGO0FBQ0U7RUFDRSxZQUFBO0FBQ0o7O0FBR0E7O0VBRUUsZUFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGdCQUFBO0FBQUYiLCJmaWxlIjoiaGVhZGVyLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzcGFuIHtcbiAgZm9udC1zaXplOiAxNXB0O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiNkaWN0aW9uYXJ5QnV0dG9uIHtcbiAgb3BhY2l0eTogMC4yO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLmhlYWRlckJ1dHRvbjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICBzcGFuIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbn1cblxuLmRpc2FibGVkIHNwYW4sXG4uZGlzYWJsZWQ6aG92ZXIgc3BhbiB7XG4gIGN1cnNvcjogaW5pdGlhbDtcbiAgY29sb3I6IGdyYXk7XG59XG5cbi5tYXRlcmlhbEljb25CdXR0b246aG92ZXIge1xuICBjb2xvcjogbGlnaHRncmV5O1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0hlYWRlci9jb21wb25lbnRzL2hlYWRlci1idXR0b25zL2hlYWRlci1idXR0b25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGO0FBQ0U7RUFDRSxZQUFBO0FBQ0o7O0FBR0E7O0VBRUUsZUFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGdCQUFBO0FBQUY7QUFDQSxvNEJBQW80QiIsInNvdXJjZXNDb250ZW50IjpbInNwYW4ge1xuICBmb250LXNpemU6IDE1cHQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuI2RpY3Rpb25hcnlCdXR0b24ge1xuICBvcGFjaXR5OiAwLjI7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4uaGVhZGVyQnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIHNwYW4ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxufVxuXG4uZGlzYWJsZWQgc3Bhbixcbi5kaXNhYmxlZDpob3ZlciBzcGFuIHtcbiAgY3Vyc29yOiBpbml0aWFsO1xuICBjb2xvcjogZ3JheTtcbn1cblxuLm1hdGVyaWFsSWNvbkJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 91729:
/*!*********************************************************!*\
  !*** ./src/app/Presentation/Header/header.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 11640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 24406);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _Dialog_header_dialog_header_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dialog/header-dialog/header-dialog.component */ 21270);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Service/Title/title.service */ 69672);
/* harmony import */ var _Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Service/Replay/replay.service */ 94788);
/* harmony import */ var _Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Service/Replay/replay-state.service */ 67820);
/* harmony import */ var _Service_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Service/Dialog/dialog.service */ 4730);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _components_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/header-buttons/header-buttons.component */ 9432);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 34294);












function HeaderComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HeaderComponent_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r1.setShowDescription(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " expand_less ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HeaderComponent_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r1.setShowDescription(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" Sentence: ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, ctx_r1.sentenceDescription$), "");
  }
}
function HeaderComponent_mat_card_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-card", 15)(1, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 1, ctx_r1.description$));
  }
}
class HeaderComponent {
  constructor(titleService, replayService, replayStateService, dialogService) {
    this.titleService = titleService;
    this.replayService = replayService;
    this.replayStateService = replayStateService;
    this.dialogService = dialogService;
    this.title$ = this.titleService.title$;
    this.description$ = this.titleService.description$;
    this.showDescription$ = this.titleService.showDescription$;
    this.isReplay$ = this.replayStateService.replayOn$;
    this.sentenceDescription$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.replayService.currentSentence$, this.replayService.maxSentenceNumber$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(([sentence, count]) => `${sentence}/${count}`));
    this.showDescription = this.titleService.showDescription$;
  }
  openHeaderDialog() {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    this.dialogService.openDialog(_Dialog_header_dialog_header_dialog_component__WEBPACK_IMPORTED_MODULE_0__.HeaderDialogComponent, config);
  }
  setShowDescription(show) {
    this.titleService.setShowDescription(show);
  }
  static #_ = this.ɵfac = function HeaderComponent_Factory(t) {
    return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_1__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_2__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_3__.ReplayStateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_Service_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: HeaderComponent,
    selectors: [["app-header"]],
    decls: 19,
    vars: 15,
    consts: [["color", "primary"], ["class", "headerButton", "title", "Hide Description", 3, "click", 4, "ngIf"], ["class", "headerButton", "title", "Show Description", 3, "click", 4, "ngIf"], [1, "mr-10", "titel-scrollbar"], ["title", "Edit Title and Description", 1, "headline", 3, "click"], [1, "material-icons", "materialIconButton", "editIcon"], [1, "titleSpacer"], ["title", "Replay Sentence", 4, "ngIf"], [1, "buttonSpacer"], [1, "nowrap"], ["class", "smallScrollbar description", 4, "ngIf"], ["title", "Hide Description", 1, "headerButton", 3, "click"], [1, "material-icons", "materialIconButton", "toggle"], ["title", "Show Description", 1, "headerButton", 3, "click"], ["title", "Replay Sentence"], [1, "smallScrollbar", "description"], [1, "descriptionText"]],
    template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "mat-toolbar-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HeaderComponent_button_2_Template, 3, 0, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HeaderComponent_button_4_Template, 3, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 3)(7, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HeaderComponent_Template_span_click_7_listener() {
          return ctx.openHeaderDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " edit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, HeaderComponent_span_13_Template, 3, 3, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "span", 8)(16, "app-header-buttons", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, HeaderComponent_mat_card_17_Template, 4, 3, "mat-card", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](18, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 5, ctx.showDescription));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 7, ctx.showDescription));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 9, ctx.title$), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](14, 11, ctx.isReplay$));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](18, 13, ctx.showDescription$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _components_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_5__.HeaderButtonsComponent, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbarRow, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCard, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
    styles: [".description[_ngcontent-%COMP%] {\n  top: 0;\n  max-width: 100vw;\n  overflow-y: scroll;\n  display: grid;\n}\n\n.descriptionText[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 10pt;\n  overflow-wrap: anywhere;\n  word-wrap: anywhere;\n  white-space: pre-wrap;\n  padding-top: 15px;\n  padding-left: 15px;\n  padding-right: 15px;\n  line-height: 12pt;\n}\n\n.description[_ngcontent-%COMP%]:hover {\n  cursor: default;\n}\n\n.titleSpacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.buttonSpacer[_ngcontent-%COMP%] {\n  margin-right: 15px;\n}\n\n.headline[_ngcontent-%COMP%]:hover    > .editIcon[_ngcontent-%COMP%] {\n  display: contents;\n}\n\n.headline[_ngcontent-%COMP%]    > .editIcon[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.headerButton[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.headerButton[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.nowrap[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.mat-toolbar-row[_ngcontent-%COMP%] {\n  white-space: normal;\n  height: min-content;\n  min-height: 5rem;\n}\n\n.titel-scrollbar[_ngcontent-%COMP%] {\n  max-height: 10rem;\n  overflow: auto;\n  scrollbar-width: none;\n  max-width: 100rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLE1BQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kZXNjcmlwdGlvbiB7XG4gIHRvcDogMDtcbiAgbWF4LXdpZHRoOiAxMDB2dztcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBkaXNwbGF5OiBncmlkO1xufVxuXG4uZGVzY3JpcHRpb25UZXh0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDEwcHQ7XG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxMnB0O1xufVxuXG4uZGVzY3JpcHRpb246aG92ZXIge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi50aXRsZVNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uYnV0dG9uU3BhY2VyIHtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xufVxuXG4uaGVhZGxpbmU6aG92ZXIgPiAuZWRpdEljb24ge1xuICBkaXNwbGF5OiBjb250ZW50cztcbn1cblxuLmhlYWRsaW5lID4gLmVkaXRJY29uIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmhlYWRlckJ1dHRvbiB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmhlYWRlckJ1dHRvbjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm5vd3JhcCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5tYXQtdG9vbGJhci1yb3cge1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xuICBtaW4taGVpZ2h0OiA1cmVtO1xufVxuXG4udGl0ZWwtc2Nyb2xsYmFyIHtcbiAgbWF4LWhlaWdodDogMTByZW07XG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIG1heC13aWR0aDogMTAwcmVtO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0hlYWRlci9oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxNQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUNBLDQ4REFBNDhEIiwic291cmNlc0NvbnRlbnQiOlsiLmRlc2NyaXB0aW9uIHtcbiAgdG9wOiAwO1xuICBtYXgtd2lkdGg6IDEwMHZ3O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGRpc3BsYXk6IGdyaWQ7XG59XG5cbi5kZXNjcmlwdGlvblRleHQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtc2l6ZTogMTBwdDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG4gIHdvcmQtd3JhcDogYW55d2hlcmU7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgcGFkZGluZy10b3A6IDE1cHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEycHQ7XG59XG5cbi5kZXNjcmlwdGlvbjpob3ZlciB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLnRpdGxlU3BhY2VyIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5idXR0b25TcGFjZXIge1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG59XG5cbi5oZWFkbGluZTpob3ZlciA+IC5lZGl0SWNvbiB7XG4gIGRpc3BsYXk6IGNvbnRlbnRzO1xufVxuXG4uaGVhZGxpbmUgPiAuZWRpdEljb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGVhZGVyQnV0dG9uIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaGVhZGVyQnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubm93cmFwIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLm1hdC10b29sYmFyLXJvdyB7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XG4gIG1pbi1oZWlnaHQ6IDVyZW07XG59XG5cbi50aXRlbC1zY3JvbGxiYXIge1xuICBtYXgtaGVpZ2h0OiAxMHJlbTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgbWF4LXdpZHRoOiAxMDByZW07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 86328:
/*!****************************************************************************!*\
  !*** ./src/app/Presentation/LabelDictionary/label-dictionary.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryComponent: () => (/* binding */ LabelDictionaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _Service_LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Service/LabelDictionary/label-dictionary.service */ 59783);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/text-field */ 79401);











function LabelDictionaryComponent_mat_list_item_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 6)(2, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function LabelDictionaryComponent_mat_list_item_5_Template_input_change_2_listener($event) {
      const workobjectEntry_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateWorkobjectEntry($event, workobjectEntry_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const workobjectEntry_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", workobjectEntry_r2.name);
  }
}
function LabelDictionaryComponent_mat_list_item_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 6)(2, "textarea", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function LabelDictionaryComponent_mat_list_item_11_Template_textarea_change_2_listener($event) {
      const activityEntry_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateActivityEntry($event, activityEntry_r5));
    })("keydown.enter", function LabelDictionaryComponent_mat_list_item_11_Template_textarea_keydown_enter_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.preventDefault($event));
    })("keyup.enter", function LabelDictionaryComponent_mat_list_item_11_Template_textarea_keyup_enter_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.save());
    })("keyup.escape", function LabelDictionaryComponent_mat_list_item_11_Template_textarea_keyup_escape_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const activityEntry_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", activityEntry_r5.name);
  }
}
class LabelDictionaryComponent {
  constructor(labelDictionaryService) {
    this.labelDictionaryService = labelDictionaryService;
    this.closeEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.labelDictionaryService.createLabelDictionaries();
    this.workObjectEntries = this.labelDictionaryService.getWorkObjectLabels();
    this.activityEntries = this.labelDictionaryService.getActivityLabels();
    this.workobjectEntriesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.workObjectEntries);
    this.activityEntriesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.activityEntries);
  }
  ngAfterViewInit() {
    this.labelDictionaryService.createLabelDictionaries();
    this.workobjectEntriesSubject.next(this.labelDictionaryService.getWorkObjectLabels());
    this.activityEntriesSubject.next(this.labelDictionaryService.getActivityLabels());
  }
  save() {
    this.workObjectEntries = this.workobjectEntriesSubject.value;
    this.activityEntries = this.activityEntriesSubject.value;
    const activityNames = [];
    const originalActivityNames = [];
    const workObjectNames = [];
    const originalWorkObjectNames = [];
    this.activityEntries.filter(a => a.name !== a.originalName).forEach(activity => {
      activityNames.push(activity.name);
      originalActivityNames.push(activity.originalName);
    });
    this.workObjectEntries.filter(w => w.name !== w.originalName).forEach(workobject => {
      workObjectNames.push(workobject.name);
      originalWorkObjectNames.push(workobject.originalName);
    });
    this.labelDictionaryService.massRenameLabels(activityNames, originalActivityNames, workObjectNames, originalWorkObjectNames);
    this.closeEmitter.emit();
  }
  cancel() {
    this.workObjectEntries.forEach(w => {
      w.name = w.originalName;
    });
    this.activityEntries.forEach(a => {
      a.name = a.originalName;
    });
    this.workobjectEntriesSubject.next(this.workObjectEntries);
    this.activityEntriesSubject.next(this.activityEntries);
  }
  updateActivityEntry($event, activityEntry) {
    let entries = this.activityEntriesSubject.value;
    entries.filter(e => e.originalName === activityEntry.originalName)[0].name = $event.target.value;
    this.activityEntriesSubject.next(entries);
  }
  updateWorkobjectEntry($event, workobjectEntry) {
    let entries = this.workobjectEntriesSubject.value;
    entries.filter(e => e.originalName === workobjectEntry.originalName)[0].name = $event.target.value;
    this.workobjectEntriesSubject.next(entries);
  }
  preventDefault(event) {
    event.preventDefault();
  }
  close() {
    this.closeEmitter.emit();
  }
  static #_ = this.ɵfac = function LabelDictionaryComponent_Factory(t) {
    return new (t || LabelDictionaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_Service_LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LabelDictionaryComponent,
    selectors: [["app-label-dictionary"]],
    outputs: {
      closeEmitter: "closeEmitter"
    },
    decls: 18,
    vars: 6,
    consts: [[1, "workobjectList"], [4, "ngFor", "ngForOf"], [1, "activityList"], [1, "activityListTitle"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "inputText"], ["matInput", "", 1, "inputText", 3, "change", "value"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "1", "cdkAutosizeMaxRows", "3", 1, "inputText", "activity", 3, "change", "keydown.enter", "keyup.enter", "keyup.escape", "value"]],
    template: function LabelDictionaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content")(1, "div", 0)(2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Workobjects");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, LabelDictionaryComponent_mat_list_item_5_Template, 3, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2)(8, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Activities");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, LabelDictionaryComponent_mat_list_item_11_Template, 3, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-dialog-actions")(14, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_14_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_16_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 2, ctx.workobjectEntriesSubject));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 4, ctx.activityEntriesSubject));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListItem, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_9__.CdkTextareaAutosize, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
    styles: ["mat-dialog-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto;\n  top: 0;\n  bottom: 0;\n  max-height: 75vh;\n  grid-column-gap: 5px;\n  width: 75vw;\n}\nmat-dialog-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] {\n  height: unset !important;\n}\nmat-dialog-content[_ngcontent-%COMP%]   mat-list-item-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n\nh3[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n}\n\n.inputText[_ngcontent-%COMP%] {\n  width: 98%;\n  resize: none;\n  font-family: sans-serif;\n  font-size: small;\n  padding-top: 1px;\n  padding-bottom: 1px;\n  margin: 0;\n}\n\n.activityListHeader[_ngcontent-%COMP%] {\n  display: inline-grid;\n  grid-template-columns: auto auto auto;\n  width: 100%;\n}\n\n.activityListTitle[_ngcontent-%COMP%] {\n  justify-self: left;\n}\n\n.saveButton[_ngcontent-%COMP%] {\n  justify-self: end;\n  padding-right: 0 !important;\n}\n\n.saveButtonSpan[_ngcontent-%COMP%] {\n  margin-left: 2px;\n}\n\n.activity[_ngcontent-%COMP%] {\n  max-height: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhYmVsLWRpY3Rpb25hcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsZ0NBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0FBQ0Y7QUFDRTtFQUNFLHdCQUFBO0FBQ0o7QUFHRTtFQUNFLHFCQUFBO0FBREo7O0FBS0E7RUFDRSxpQkFBQTtBQUZGOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFGRjs7QUFLQTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBRkY7O0FBS0E7RUFDRSxvQkFBQTtFQUNBLHFDQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBO0VBQ0Usa0JBQUE7QUFGRjs7QUFLQTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0FBRkY7O0FBS0E7RUFDRSxnQkFBQTtBQUZGIiwiZmlsZSI6ImxhYmVsLWRpY3Rpb25hcnkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtZGlhbG9nLWNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIG1heC1oZWlnaHQ6IDc1dmg7XG4gIGdyaWQtY29sdW1uLWdhcDogNXB4O1xuICB3aWR0aDogNzV2dztcblxuICBtYXQtbGlzdC1pdGVtIHtcbiAgICBoZWlnaHQ6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgLy9wYWRkaW5nLWJvdHRvbTogMnB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICBtYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcbiAgfVxufVxuXG5oMyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uaWNvbiB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG59XG5cbi5pbnB1dFRleHQge1xuICB3aWR0aDogOTglO1xuICByZXNpemU6IG5vbmU7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBwYWRkaW5nLXRvcDogMXB4O1xuICBwYWRkaW5nLWJvdHRvbTogMXB4O1xuICBtYXJnaW46IDA7XG59XG5cbi5hY3Rpdml0eUxpc3RIZWFkZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG8gYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5hY3Rpdml0eUxpc3RUaXRsZSB7XG4gIGp1c3RpZnktc2VsZjogbGVmdDtcbn1cblxuLnNhdmVCdXR0b24ge1xuICBqdXN0aWZ5LXNlbGY6IGVuZDtcbiAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xufVxuXG4uc2F2ZUJ1dHRvblNwYW4ge1xuICBtYXJnaW4tbGVmdDogMnB4O1xufVxuXG4uYWN0aXZpdHkge1xuICBtYXgtaGVpZ2h0OiAzcmVtO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL0xhYmVsRGljdGlvbmFyeS9sYWJlbC1kaWN0aW9uYXJ5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtBQUNGO0FBQ0U7RUFDRSx3QkFBQTtBQUNKO0FBR0U7RUFDRSxxQkFBQTtBQURKOztBQUtBO0VBQ0UsaUJBQUE7QUFGRjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxVQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUZGOztBQUtBO0VBQ0Usb0JBQUE7RUFDQSxxQ0FBQTtFQUNBLFdBQUE7QUFGRjs7QUFLQTtFQUNFLGtCQUFBO0FBRkY7O0FBS0E7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0FBRkY7O0FBS0E7RUFDRSxnQkFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjtBQUNBLDQ2REFBNDZEIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWRpYWxvZy1jb250ZW50IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG87XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBtYXgtaGVpZ2h0OiA3NXZoO1xuICBncmlkLWNvbHVtbi1nYXA6IDVweDtcbiAgd2lkdGg6IDc1dnc7XG5cbiAgbWF0LWxpc3QtaXRlbSB7XG4gICAgaGVpZ2h0OiB1bnNldCAhaW1wb3J0YW50O1xuICAgIC8vcGFkZGluZy1ib3R0b206IDJweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgbWF0LWxpc3QtaXRlbS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuaDMge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmljb24ge1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzNnB4O1xufVxuXG4uaW5wdXRUZXh0IHtcbiAgd2lkdGg6IDk4JTtcbiAgcmVzaXplOiBub25lO1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiBzbWFsbDtcbiAgcGFkZGluZy10b3A6IDFweDtcbiAgcGFkZGluZy1ib3R0b206IDFweDtcbiAgbWFyZ2luOiAwO1xufVxuXG4uYWN0aXZpdHlMaXN0SGVhZGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvIGF1dG87XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYWN0aXZpdHlMaXN0VGl0bGUge1xuICBqdXN0aWZ5LXNlbGY6IGxlZnQ7XG59XG5cbi5zYXZlQnV0dG9uIHtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG4gIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcbn1cblxuLnNhdmVCdXR0b25TcGFuIHtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmFjdGl2aXR5IHtcbiAgbWF4LWhlaWdodDogM3JlbTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 423:
/*!*****************************************************************************!*\
  !*** ./src/app/Presentation/Settings/General/general-settings.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralSettingsComponent: () => (/* binding */ GeneralSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Autosave_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Autosave/AutosaveSettings/autosave-settings.component */ 94709);


class GeneralSettingsComponent {
  static #_ = this.ɵfac = function GeneralSettingsComponent_Factory(t) {
    return new (t || GeneralSettingsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: GeneralSettingsComponent,
    selectors: [["app-general-settings"]],
    decls: 2,
    vars: 0,
    consts: [[1, "content"]],
    template: function GeneralSettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-autosave-settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_Autosave_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveSettingsComponent],
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 450px auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlbmVyYWwtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsaUNBQUE7QUFDRiIsImZpbGUiOiJnZW5lcmFsLXNldHRpbmdzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQ1MHB4IGF1dG87XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL1NldHRpbmdzL0dlbmVyYWwvZ2VuZXJhbC1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxpQ0FBQTtBQUNGO0FBQ0EsZ1lBQWdZIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQ1MHB4IGF1dG87XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 1261:
/*!*************************************************************!*\
  !*** ./src/app/Presentation/Settings/settings.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsComponent: () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/Settings/settings.service */ 58124);
/* harmony import */ var src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/Modeler/modeler.service */ 74676);
/* harmony import */ var _Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Service/IconSetConfiguration/icon-set-customization.service */ 87007);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _General_general_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./General/general-settings.component */ 423);
/* harmony import */ var src_app_Presentation_DomainConfiguration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Presentation/DomainConfiguration/icon-set-configuration.component */ 38574);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);










function SettingsComponent_app_general_settings_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-general-settings");
  }
}
function SettingsComponent_app_icon_set_configuration_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-icon-set-configuration");
  }
}
class SettingsComponent {
  constructor(settingsService, modelerService, iconSetCustomizationService) {
    this.settingsService = settingsService;
    this.modelerService = modelerService;
    this.iconSetCustomizationService = iconSetCustomizationService;
    this.showGeneralSettings = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(false);
    this.showIconSetCustomization = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(true);
  }
  close() {
    const savedConfiguration = this.iconSetCustomizationService.getAndClearSavedConfiguration();
    if (savedConfiguration) {
      this.modelerService.restart(savedConfiguration);
    }
    this.settingsService.close();
  }
  openGeneralSettings() {
    this.showGeneralSettings.next(true);
    this.showIconSetCustomization.next(false);
  }
  openIconSetCustomization() {
    this.showGeneralSettings.next(false);
    this.showIconSetCustomization.next(true);
  }
  static #_ = this.ɵfac = function SettingsComponent_Factory(t) {
    return new (t || SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_0__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_1__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_Service_IconSetConfiguration_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__.IconSetCustomizationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: SettingsComponent,
    selectors: [["app-settings"]],
    decls: 19,
    vars: 14,
    consts: [[1, "settings"], ["color", "primary", 1, "toolbar"], ["mat-icon-button", "", 1, "headerButton", "noPadding", 3, "click"], [1, "material-icons-outlined", "materialIconButton"], [1, "paddedButton"], ["mat-button", "", 1, "headerButton", "mr-10", 3, "click"], [1, "headline"], ["mat-button", "", 1, "headerButton", 3, "click"], [4, "ngIf"]],
    template: function SettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "mat-toolbar-row")(3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_3_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " arrow_back");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 4)(7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_7_listener() {
          return ctx.openIconSetCustomization();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Customize Icons for Your Domain");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_11_listener() {
          return ctx.openGeneralSettings();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "General Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, SettingsComponent_app_general_settings_15_Template, 1, 0, "app-general-settings", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, SettingsComponent_app_icon_set_configuration_17_Template, 1, 0, "app-icon-set-configuration", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](18, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("highlight", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, ctx.showIconSetCustomization));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("highlight", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 8, ctx.showGeneralSettings));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 10, ctx.showGeneralSettings));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](18, 12, ctx.showIconSetCustomization));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _General_general_settings_component__WEBPACK_IMPORTED_MODULE_3__.GeneralSettingsComponent, src_app_Presentation_DomainConfiguration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigurationComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarRow, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
    styles: ["mat-toolbar[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  color: white;\n}\n\napp-general-settings[_ngcontent-%COMP%] {\n  overflow-y: auto;\n}\n\n.settings[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: 65px auto;\n  width: 100%;\n  height: 100%;\n}\n.settings[_ngcontent-%COMP%]    .mat-button {\n  padding: 0;\n}\n.settings[_ngcontent-%COMP%]   .materialIconButton[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-right: 5px;\n  padding: 0;\n}\n\n.highlight[_ngcontent-%COMP%] {\n  border: 2px solid white;\n}\n\n .mat-tab-label,  .mat-tab-label-active {\n  height: 30px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFDRTtFQUNFLFVBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtBQUFKOztBQUlBO0VBQ0UsdUJBQUE7QUFERjs7QUFJQTs7RUFFRSx1QkFBQTtBQURGIiwiZmlsZSI6InNldHRpbmdzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXRvb2xiYXIgKiB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYXBwLWdlbmVyYWwtc2V0dGluZ3Mge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uc2V0dGluZ3Mge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDY1cHggYXV0bztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcblxuICA6Om5nLWRlZXAubWF0LWJ1dHRvbiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIC5tYXRlcmlhbEljb25CdXR0b24ge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgcGFkZGluZzogMDtcbiAgfVxufVxuXG4uaGlnaGxpZ2h0IHtcbiAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XG59XG5cbjo6bmctZGVlcC5tYXQtdGFiLWxhYmVsLFxuOjpuZy1kZWVwLm1hdC10YWItbGFiZWwtYWN0aXZlIHtcbiAgaGVpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvUHJlc2VudGF0aW9uL1NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFDRTtFQUNFLFVBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtBQUFKOztBQUlBO0VBQ0UsdUJBQUE7QUFERjs7QUFJQTs7RUFFRSx1QkFBQTtBQURGO0FBQ0Esb21DQUFvbUMiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtdG9vbGJhciAqIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5hcHAtZ2VuZXJhbC1zZXR0aW5ncyB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zZXR0aW5ncyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogNjVweCBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuXG4gIDo6bmctZGVlcC5tYXQtYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgLm1hdGVyaWFsSWNvbkJ1dHRvbiB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG59XG5cbi5oaWdobGlnaHQge1xuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbn1cblxuOjpuZy1kZWVwLm1hdC10YWItbGFiZWwsXG46Om5nLWRlZXAubWF0LXRhYi1sYWJlbC1hY3RpdmUge1xuICBoZWlnaHQ6IDMwcHggIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 97237:
/*!********************************************************************!*\
  !*** ./src/app/Service/Autosave/autosave-configuration.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveConfigurationService: () => (/* binding */ AutosaveConfigurationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 61151);
/* harmony import */ var src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BrowserStorage/storage.service */ 59298);




const AUTOSAVE_CONFIGURATION_TAG = 'autosaveConfiguration';
const defaultConfiguration = {
  activated: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_ENABLED,
  interval: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_INTERVAL,
  maxDrafts: src_app_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_MAX_DRAFTS
};
class AutosaveConfigurationService {
  constructor(storageService) {
    this.storageService = storageService;
    this.configuration = defaultConfiguration;
    this.configurationSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
    this.configuration$ = this.configurationSubject.asObservable();
    this.initializeConfiguration();
  }
  initializeConfiguration() {
    this.loadConfiguration();
    this.configurationSubject.next(this.configuration);
  }
  setConfiguration(configuration) {
    try {
      this.configuration = configuration;
      this.saveConfiguration();
      this.configurationSubject.next(configuration);
      return true;
    } catch {
      return false;
    }
  }
  loadConfiguration() {
    this.configuration = this.storageService.get(AUTOSAVE_CONFIGURATION_TAG) ?? defaultConfiguration;
  }
  saveConfiguration() {
    this.storageService.set(AUTOSAVE_CONFIGURATION_TAG, this.configuration);
  }
  static #_ = this.ɵfac = function AutosaveConfigurationService_Factory(t) {
    return new (t || AutosaveConfigurationService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: AutosaveConfigurationService,
    factory: AutosaveConfigurationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 30534:
/*!******************************************************!*\
  !*** ./src/app/Service/Autosave/autosave.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveService: () => (/* binding */ AutosaveService),
/* harmony export */   DRAFTS_TAG: () => (/* binding */ DRAFTS_TAG)
/* harmony export */ });
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Icon-Set-Configuration/iconSetConfiguration */ 77044);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 63150);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _autosave_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autosave-configuration.service */ 97237);
/* harmony import */ var _Export_export_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Export/export.service */ 98106);
/* harmony import */ var _IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var _Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Renderer/renderer.service */ 94896);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BrowserStorage/storage.service */ 59298);
/* harmony import */ var _Title_title_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Title/title.service */ 69672);












const DRAFTS_TAG = 'autosaveDrafts';
class AutosaveService {
  constructor(autosaveConfiguration, exportService, iconDictionaryService, rendererService, snackbar, storageService, titleService) {
    this.autosaveConfiguration = autosaveConfiguration;
    this.exportService = exportService;
    this.iconDictionaryService = iconDictionaryService;
    this.rendererService = rendererService;
    this.snackbar = snackbar;
    this.storageService = storageService;
    this.titleService = titleService;
    this.autosavedDraftsChanged$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.autosaveConfiguration.configuration$.subscribe(configuration => this.updateConfiguration(configuration));
  }
  loadCurrentDrafts() {
    const drafts = this.readDrafts();
    this.sortDrafts(drafts);
    return drafts;
  }
  loadDraft(draft) {
    const configFromFile = draft.configAndDST.domain;
    const config = (0,_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_1__.fromConfigurationFromFile)(configFromFile);
    const story = JSON.parse(draft.configAndDST.dst);
    this.titleService.updateTitleAndDescription(draft.title, draft.description, false);
    const actorIcons = this.iconDictionaryService.getElementsOfType(story, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
    const workObjectIcons = this.iconDictionaryService.getElementsOfType(story, _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
    this.iconDictionaryService.updateIconRegistries(actorIcons, workObjectIcons, config);
    this.rendererService.importStory(story, true, config, false);
  }
  removeAllDrafts() {
    this.storageService.set(DRAFTS_TAG, []);
    this.autosavedDraftsChanged$.next();
  }
  loadLatestDraft() {
    const drafts = this.readDrafts();
    if (drafts.length === 0) {
      return;
    }
    this.loadDraft(drafts[0]);
  }
  updateConfiguration(configuration) {
    this.stopTimer();
    if (configuration.activated) {
      this.startTimer(configuration.interval, configuration.maxDrafts);
    }
  }
  stopTimer() {
    if (this.autosaveTimer) {
      clearInterval(this.autosaveTimer);
      this.autosaveTimer = undefined;
    }
  }
  startTimer(interval, maxDrafts) {
    this.autosaveTimer = setInterval(() => {
      const savedDrafts = this.loadCurrentDrafts();
      const newDraft = this.createDraft();
      let isChanged = maxDrafts > 0;
      if (savedDrafts.length > 0) {
        isChanged = isChanged && !this.isSame(newDraft, savedDrafts[0]);
      }
      if (isChanged && !this.isDraftEmpty(newDraft)) {
        savedDrafts.unshift(newDraft);
        while (savedDrafts.length > maxDrafts) {
          savedDrafts.pop();
        }
        this.writeDrafts(savedDrafts);
        this.snackbar.open('Draft Saved', undefined, {
          panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_INFO,
          duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION
        });
        this.autosavedDraftsChanged$.next();
      }
    }, interval * 1000);
  }
  isDraftEmpty(draft) {
    const configAndDST = draft.configAndDST ?? {
      dst: '[]'
    };
    return draft.title === _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE && draft.description === _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_DESCRIPTION && JSON.parse(configAndDST.dst).length === 0;
  }
  isSame(a, b) {
    return a.title === b.title && a.description === b.description && JSON.stringify(a.configAndDST) === JSON.stringify(b.configAndDST);
  }
  writeDrafts(drafts) {
    this.storageService.set(DRAFTS_TAG, drafts);
  }
  readDrafts() {
    return this.storageService.get(DRAFTS_TAG) ?? [];
  }
  createDraft() {
    const dst = JSON.stringify(this.rendererService.getStory(), null, 2);
    const configAndDST = this.exportService.createConfigAndDST(dst);
    const date = new Date().toString().slice(0, 25);
    return {
      title: this.titleService.getTitle(),
      description: this.titleService.getDescription(),
      configAndDST,
      date
    };
  }
  sortDrafts(drafts) {
    drafts.sort((a, b) => {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      return aDate > bDate ? 0 : 1;
    });
  }
  static #_ = this.ɵfac = function AutosaveService_Factory(t) {
    return new (t || AutosaveService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_3__.AutosaveConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_Export_export_service__WEBPACK_IMPORTED_MODULE_4__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_6__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_Title_title_service__WEBPACK_IMPORTED_MODULE_8__.TitleService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
    token: AutosaveService,
    factory: AutosaveService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 59298:
/*!***********************************************************!*\
  !*** ./src/app/Service/BrowserStorage/storage.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Icon-Set-Configuration/iconSetConfiguration */ 77044);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);



class StorageService {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key) {
    const json = localStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }
  removeItem(key) {
    localStorage.removeItem(key);
  }
  checkValidityOfConfiguration(configuratioFromFile) {
    return configuratioFromFile.actors.keysArray().length > 1 && configuratioFromFile.workObjects.keysArray().length > 1 && !configuratioFromFile.actors.all().some(e => typeof e.value !== 'string') && !configuratioFromFile.workObjects.all().some(e => typeof e.value !== 'string');
  }
  getStoredIconSetConfiguration() {
    const iconSetString = localStorage.getItem(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.ICON_SET_CONFIGURATION_TAG);
    if (!iconSetString) {
      return;
    } else {
      const configurationFromFile = (0,_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_1__.fromConfigurationFromFile)(JSON.parse(iconSetString));
      if (this.checkValidityOfConfiguration(configurationFromFile)) {
        return configurationFromFile;
      }
    }
    return;
  }
  setStoredIconSetConfiguration(config) {
    const actors = {};
    config.actors.keysArray().forEach(key => {
      actors[key] = config.actors.get(key);
    });
    const workObjects = {};
    config.workObjects.keysArray().forEach(key => {
      workObjects[key] = config.workObjects.get(key);
    });
    const configForStorage = {
      name: config.name,
      actors: actors,
      workObjects: workObjects
    };
    localStorage.setItem(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.ICON_SET_CONFIGURATION_TAG, JSON.stringify(configForStorage, null, 2));
  }
  static #_ = this.ɵfac = function StorageService_Factory(t) {
    return new (t || StorageService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: StorageService,
    factory: StorageService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 19381:
/*!***************************************************************!*\
  !*** ./src/app/Service/CommandStack/command-stack.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommandStackService: () => (/* binding */ CommandStackService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);

class CommandStackService {
  constructor() {}
  setCommandStack(commandStack) {
    this.commandStack = commandStack;
  }
  execute(action, payload) {
    this.commandStack.execute(action, payload);
  }
  static #_ = this.ɵfac = function CommandStackService_Factory(t) {
    return new (t || CommandStackService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: CommandStackService,
    factory: CommandStackService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 4730:
/*!**************************************************!*\
  !*** ./src/app/Service/Dialog/dialog.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogService: () => (/* binding */ DialogService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);


class DialogService {
  constructor(matDialog) {
    this.matDialog = matDialog;
  }
  openDialog(dialog, config) {
    this.matDialog.open(dialog, config);
  }
  static #_ = this.ɵfac = function DialogService_Factory(t) {
    return new (t || DialogService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialog));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: DialogService,
    factory: DialogService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 89791:
/*!*********************************************************!*\
  !*** ./src/app/Service/DirtyFlag/dirty-flag.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirtyFlagService: () => (/* binding */ DirtyFlagService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


class DirtyFlagService {
  constructor() {
    this.isDirtySubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.dirty$ = this.isDirtySubject.asObservable();
  }
  makeDirty() {
    this.isDirtySubject.next(true);
  }
  makeClean() {
    this.isDirtySubject.next(false);
  }
  get dirty() {
    return this.isDirtySubject.value;
  }
  static #_ = this.ɵfac = function DirtyFlagService_Factory(t) {
    return new (t || DirtyFlagService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: DirtyFlagService,
    factory: DirtyFlagService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 63149:
/*!*********************************************************************!*\
  !*** ./src/app/Service/DomManipulation/dom-manipulation.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomManipulationService: () => (/* binding */ DomManipulationService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/DomManipulation/replayConstants */ 90173);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);




/**
 * Manipulates the DOM during replay to only show the elements of the current Sentence
 */
class DomManipulationService {
  constructor(elementRegistryService) {
    this.elementRegistryService = elementRegistryService;
  }
  showAll() {
    this.removeHighlights();
    this.elementRegistryService.getAllCanvasObjects().slice().concat(this.elementRegistryService.getAllGroups().slice()).map(e => e.businessObject).forEach(element => {
      const domObject = document.querySelector('[data-element-id=' + element.id + ']');
      // @ts-ignore
      domObject.style.display = 'block';
    });
  }
  showSentence(replaySentence, previousSentence) {
    this.removeHighlights();
    const notShown = this.getAllNotShown(replaySentence.objects);
    notShown.forEach(element => {
      const domObject = document.querySelector('[data-element-id=' + element.id + ']');
      if (domObject) {
        // @ts-ignore
        domObject.style.display = 'none';
      }
    });
    this.highlightSentence(previousSentence ? replaySentence.objects.filter(o => !previousSentence.objects.includes(o)) : replaySentence.objects);
    replaySentence.objects.forEach(element => {
      const domObject = document.querySelector('[data-element-id=' + element.id + ']');
      if (domObject) {
        // @ts-ignore
        domObject.style.display = 'block';
      }
    });
  }
  getNumberDomForActivity(activity) {
    const numberText = activity.parentElement?.getElementsByClassName('djs-labelNumber')[0] ?? '';
    const circle = numberText?.previousSibling ?? '';
    return {
      numberBackgroundDom: circle,
      numberTextDom: numberText
    };
  }
  removeHighlights() {
    const allActivities = this.elementRegistryService.getAllActivities();
    const allConnections = this.elementRegistryService.getAllConnections();
    allActivities.forEach(activity => {
      const querySelector = document.querySelector('[data-element-id=' + activity.id + ']');
      if (querySelector) {
        const activityDomObject = querySelector.getElementsByTagName('polyline')[0];
        activityDomObject.style.stroke = activity.businessObject.pickedColor || 'black';
        activityDomObject.style.strokeWidth = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.STROKE_WIDTH;
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberBackgroundDom && numberTextDom) {
          numberBackgroundDom.style.fill = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_BACKGROUND_COLOR;
          numberTextDom.style.fill = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_COLOR;
        }
      }
    });
    allConnections.forEach(connection => {
      // @ts-ignore
      const connectionDomObject = document.querySelector('[data-element-id=' + connection.id + ']').getElementsByTagName('polyline')[0];
      connectionDomObject.style.stroke = connection.businessObject.pickedColor || 'black';
      connectionDomObject.style.strokeWidth = '1.5';
    });
  }
  highlightSentence(sentenceObjects) {
    sentenceObjects.filter(e => e.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY).forEach(activity => {
      const querySelector = document.querySelector('[data-element-id=' + activity.id + ']');
      if (querySelector) {
        const activityDomObject = querySelector.getElementsByTagName('polyline')[0];
        activityDomObject.style.strokeWidth = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_STROKE_WIDTH;
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberTextDom && numberBackgroundDom) {
          numberBackgroundDom.style.fill = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_NUMBER_BACKGROUNG_COLOR;
          numberTextDom.style.fill = _Domain_DomManipulation_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_NUMBER_COLOR;
        }
      }
    });
  }
  getAllNotShown(shownElements) {
    const notShownElements = [];
    const allObjects = this.elementRegistryService.getAllCanvasObjects().concat(this.elementRegistryService.getAllGroups());
    allObjects.forEach(element => {
      if (!shownElements.includes(element.businessObject)) {
        if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION)) {
          // @ts-ignore
          if (!element.source.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
            notShownElements.push(element.businessObject);
          } else {
            // @ts-ignore
            shownElements.push(element.target);
          }
        } else {
          notShownElements.push(element.businessObject);
        }
      }
    });
    return notShownElements;
  }
  static #_ = this.ɵfac = function DomManipulationService_Factory(t) {
    return new (t || DomManipulationService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_2__.ElementRegistryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: DomManipulationService,
    factory: DomManipulationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 67613:
/*!*********************************************************************!*\
  !*** ./src/app/Service/ElementRegistry/element-registry.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementRegistryService: () => (/* binding */ ElementRegistryService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


class ElementRegistryService {
  constructor() {
    this.fullyInitialized = false;
  }
  /**
   * Initially the registry has only the root-Element.
   * Once the canvas has bees initialized, we adjust the reference to point to the elements on the canvas for convenience
   */
  correctInitialize() {
    if (!this.fullyInitialized) {
      if (this.registry.__implicitroot) {
        this.registry = this.registry.__implicitroot.element.children;
        this.fullyInitialized = true;
      }
    }
  }
  setElementRegistry(registry) {
    this.registry = registry._elements;
  }
  clear() {
    this.registry = null;
    this.fullyInitialized = false;
  }
  createObjectListForDSTDownload() {
    if (this.registry) {
      const allObjectsFromCanvas = this.getAllCanvasObjects();
      const groups = this.getAllGroups();
      const objectList = [];
      this.fillListOfCanvasObjects(allObjectsFromCanvas, objectList, groups);
      return objectList;
    }
    return [];
  }
  fillListOfCanvasObjects(allObjectsFromCanvas, objectList, groups) {
    allObjectsFromCanvas.forEach(canvasElement => {
      if (canvasElement.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) {
        objectList.push(canvasElement);
      }
      // ensure that Activities are always after Actors, Workobjects and Groups in .dst files
      else {
        if (canvasElement.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION) {
          canvasElement.businessObject.width = canvasElement.width;
          canvasElement.businessObject.height = canvasElement.height;
        }
        if (!objectList.includes(canvasElement)) {
          objectList.unshift(canvasElement);
        }
      }
    });
    groups.forEach(group => {
      objectList.push(group);
    });
  }
  getAllActivities() {
    const activities = [];
    this.getAllCanvasObjects().forEach(element => {
      if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY)) {
        activities.push(element);
      }
    });
    return activities;
  }
  getAllConnections() {
    const connections = [];
    this.getAllCanvasObjects().forEach(element => {
      const type = element.type;
      if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
        connections.push(element);
      }
    });
    return connections;
  }
  getAllCanvasObjects() {
    const allObjects = [];
    const groupObjects = [];
    this.checkChildForGroup(groupObjects, allObjects);
    // for each memorized group, remove it from the group-array and check its children, whether they are groups or not
    // if a child is a group, memorize it in the group-array
    // other children should already be in the allObjects list
    let i = groupObjects.length - 1;
    while (groupObjects.length >= 1) {
      const currentGroup = groupObjects.pop();
      // @ts-ignore
      currentGroup.children.forEach(child => {
        const type = child.type;
        if (type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
          groupObjects.push(child);
        }
      });
      i = groupObjects.length - 1;
    }
    return allObjects;
  }
  // returns all groups on the canvas and inside other groups
  getAllGroups() {
    const groupObjects = [];
    const allObjects = [];
    this.checkChildForGroup(groupObjects, allObjects);
    for (const group of groupObjects) {
      group.children?.forEach(child => {
        if (child.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
          groupObjects.push(child);
        }
      });
    }
    return groupObjects;
  }
  checkChildForGroup(groupObjects, allObjects) {
    const registryElementNames = Object.keys(this.registry);
    for (let name of registryElementNames) {
      const entry = this.registry[name].element;
      if (entry.businessObject) {
        const type = entry.type;
        if (type && type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
          // if it is a group, memorize this for later
          groupObjects.push(entry);
        } else if (type) {
          allObjects.push(entry);
        }
      }
    }
  }
  // get a list of activities, that originate from an actor-type
  getActivitiesFromActors() {
    const activitiesFromActors = [];
    const activities = this.getAllActivities();
    activities.forEach(activity => {
      if (activity.source?.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
        activitiesFromActors.push(activity);
      }
    });
    // sort by activityBusinessObject number
    activitiesFromActors.sort((activityCanvasA, activityCanvasB) => {
      const activityNumberA = Number(activityCanvasA.businessObject.number);
      const activityNumberB = Number(activityCanvasB.businessObject.number);
      return activityNumberA - activityNumberB;
    });
    return activitiesFromActors;
  }
  getUsedIcons() {
    const actors = this.getAllActors();
    const workobjects = this.getAllWorkobjects();
    return {
      actors: actors.map(a => a.type.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR, '')),
      workobjects: workobjects.map(w => w.type.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, ''))
    };
  }
  getAllActors() {
    return this.getAllCanvasObjects().filter(co => co.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR));
  }
  getAllWorkobjects() {
    return this.getAllCanvasObjects().filter(co => co.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT));
  }
  static #_ = this.ɵfac = function ElementRegistryService_Factory(t) {
    return new (t || ElementRegistryService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ElementRegistryService,
    factory: ElementRegistryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 98106:
/*!**************************************************!*\
  !*** ./src/app/Service/Export/export.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportService: () => (/* binding */ ExportService)
/* harmony export */ });
/* harmony import */ var src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Utils/sanitizer */ 66107);
/* harmony import */ var src_app_Domain_Export_configAndDst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Export/configAndDst */ 74306);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Service/Title/title.service */ 69672);
/* harmony import */ var src_app_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Service/DirtyFlag/dirty-flag.service */ 89791);
/* harmony import */ var src_app_Service_Export_png_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Service/Export/png.service */ 11503);
/* harmony import */ var src_app_Service_Export_svg_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Service/Export/svg.service */ 29298);
/* harmony import */ var _html_presentation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html-presentation.service */ 72680);
/* harmony import */ var _Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Renderer/renderer.service */ 94896);












class ExportService {
  constructor(configurationService, titleService, dirtyFlagService, pngService, svgService, htmlPresentationService, rendererService) {
    this.configurationService = configurationService;
    this.titleService = titleService;
    this.dirtyFlagService = dirtyFlagService;
    this.pngService = pngService;
    this.svgService = svgService;
    this.htmlPresentationService = htmlPresentationService;
    this.rendererService = rendererService;
    this.title = '';
    this.description = '';
    this.titleSubscription = this.titleService.title$.subscribe(title => {
      this.title = title;
    });
    this.descriptionSubscription = this.titleService.description$.subscribe(description => {
      this.description = description;
    });
  }
  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
    this.descriptionSubscription.unsubscribe();
  }
  isDomainStoryExportable() {
    return this.rendererService.getStory().length >= 1;
  }
  createConfigAndDST(DomainStory) {
    return new src_app_Domain_Export_configAndDst__WEBPACK_IMPORTED_MODULE_1__.ConfigAndDST(this.configurationService.getCurrentConfigurationForExport(), DomainStory);
  }
  downloadDST() {
    const dst = this.getStoryForDownload();
    const configAndDST = this.createConfigAndDST(dst);
    const json = JSON.stringify(configAndDST, null, 2);
    const filename = (0,src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString());
    this.downloadFile(json, 'data:text/plain;charset=utf-8,', filename, '.egn', true);
  }
  downloadFile(data, datatype, filename, fileEnding, makeClean) {
    const element = document.createElement('a');
    element.setAttribute('href', datatype + encodeURIComponent(data));
    element.setAttribute('download', filename + fileEnding);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    if (makeClean) {
      this.dirtyFlagService.makeClean();
    }
    document.body.removeChild(element);
  }
  downloadSVG(withTitle, useWhiteBackground) {
    const story = this.getStoryForDownload();
    const dst = this.createConfigAndDST(story);
    const svgData = this.svgService.createSVGData(this.title, this.description, dst, withTitle, useWhiteBackground);
    this.downloadFile(svgData, 'data:application/bpmn20-xml;charset=UTF-8,', (0,src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString()), '.egn.svg', true);
  }
  downloadPNG(withTitle) {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const container = canvas.getElementsByClassName('djs-container');
      const svgElements = container[0].getElementsByTagName('svg');
      const outerSVGElement = svgElements[0];
      const viewport = outerSVGElement.getElementsByClassName('viewport')[0];
      const layerBase = viewport.getElementsByClassName('layer-base')[0];
      const image = document.createElement('img');
      // removes unwanted black dots in image
      let svg = this.pngService.extractSVG(viewport, outerSVGElement);
      svg = this.pngService.prepareSVG(svg, layerBase, this.description, this.title, withTitle);
      image.onload = () => {
        const tempCanvas = document.createElement('canvas');
        // add a 10px buffer to the right and lower boundary
        tempCanvas.width = this.pngService.getWidth() + 10;
        tempCanvas.height = this.pngService.getHeight() + 10;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          // fill with white background
          ctx.rect(0, 0, tempCanvas.width, tempCanvas.height);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.drawImage(image, 0, 0);
        }
        const png64 = tempCanvas.toDataURL('image/png');
        const ele = document.createElement('a');
        ele.setAttribute('download', (0,src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title) + '_' + this.getCurrentDateString() + '.png');
        ele.setAttribute('href', png64);
        document.body.appendChild(ele);
        ele.click();
        document.body.removeChild(ele);
        // image source has to be removed to circumvent browser caching
        image.src = '';
      };
      image.onchange = image.onload;
      image.width = this.pngService.getWidth();
      image.height = this.pngService.getHeight();
      image.src = 'data:image/svg+xml,' + svg;
    }
  }
  downloadHTMLPresentation() {
    const filename = (0,src_app_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString());
    this.htmlPresentationService.downloadHTMLPresentation(filename).then();
  }
  getStoryForDownload() {
    const story = this.rendererService.getStory();
    story.push({
      info: this.titleService.getDescription()
    });
    story.push({
      version: _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.version
    });
    return story;
  }
  getCurrentDateString() {
    return (0,_angular_common__WEBPACK_IMPORTED_MODULE_10__.formatDate)(new Date(), 'YYYY-MM-dd', 'en-GB');
  }
  static #_ = this.ɵfac = function ExportService_Factory(t) {
    return new (t || ExportService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_4__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__.DirtyFlagService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_Service_Export_png_service__WEBPACK_IMPORTED_MODULE_6__.PngService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_Service_Export_svg_service__WEBPACK_IMPORTED_MODULE_7__.SvgService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_html_presentation_service__WEBPACK_IMPORTED_MODULE_8__.HtmlPresentationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_9__.RendererService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: ExportService,
    factory: ExportService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 72680:
/*!*************************************************************!*\
  !*** ./src/app/Service/Export/html-presentation.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlPresentationService: () => (/* binding */ HtmlPresentationService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var _Utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/sanitizer */ 66107);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dot */ 13280);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dot__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Replay_replay_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Replay/replay.service */ 94788);
/* harmony import */ var _Title_title_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Title/title.service */ 69672);


// @ts-ignore




/**
 * Initial idea and PR from https://github.com/indika-dev
 */
class HtmlPresentationService {
  constructor(replayService, titleService) {
    this.replayService = replayService;
    this.titleService = titleService;
  }
  setModelerClasses(canvas, selection, modeler) {
    this.modeler = modeler;
  }
  static viewBoxCoordinates(svg) {
    const ViewBoxCoordinate = /width="([^"]+)"\s+height="([^"]+)"\s+viewBox="([^"]+)"/;
    const match = svg.match(ViewBoxCoordinate);
    return match[3];
  }
  /*
  ---------------------------
  SVG handling starts here
  ----------------------------
  */
  downloadHTMLPresentation(filename) {
    var _this = this;
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const svgData = [];
      // export all sentences of domain story
      _this.replayService.startReplay();
      try {
        const result = yield _this.modeler.saveSVG({});
        _this.fixActivityMarkersForEachSentence(result, _this.replayService.getCurrentSentenceNumber());
        svgData.push({
          content: HtmlPresentationService.createSVGData(result.svg),
          transition: 'slide'
        });
      } catch (err) {
        alert('There was an error exporting the SVG.\n' + err);
      }
      while (_this.replayService.getCurrentSentenceNumber() < _this.replayService.getMaxSentenceNumber()) {
        _this.replayService.nextSentence();
        try {
          const result = yield _this.modeler.saveSVG({});
          _this.fixActivityMarkersForEachSentence(result, _this.replayService.getCurrentSentenceNumber());
          svgData.push({
            content: HtmlPresentationService.createSVGData(result.svg),
            transition: 'slide'
          });
        } catch (err) {
          alert('There was an error exporting the SVG.\n' + err);
        }
      }
      _this.replayService.stopReplay();
      // create download for presentation
      const revealjsTemplate = document.getElementById('revealjs-template');
      const dots = dot__WEBPACK_IMPORTED_MODULE_2___default().template(revealjsTemplate?.innerHTML);
      const revealjsData = {
        script: 'script',
        title: _this.titleService.getTitle(),
        description: _this.titleService.getDescription(),
        sentences: svgData,
        multiplexSecret: _this.multiplexSecret,
        multiplexId: _this.multiplexId
      };
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/html;charset=UTF-8,' + _this.fixMalformedHtmlScript(dots, revealjsData));
      element.setAttribute('download', (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__.sanitizeForDesktop)(filename) + '.html');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    })();
  }
  fixMalformedHtmlScript(dots, revealjsData) {
    return dots(revealjsData).replace('</ script', '</script');
  }
  // tslint:disable-next-line:align
  static createSVGData(svg) {
    let data = structuredClone(svg);
    // to ensure that the title and description are inside the SVG container and do not overlap with any elements,
    // we change the confines of the SVG viewbox
    let viewBoxIndex = data.indexOf('width="');
    const viewBox = HtmlPresentationService.viewBoxCoordinates(data);
    let xLeft;
    let width;
    let yUp;
    let height;
    const splitViewBox = viewBox.split(/\s/);
    xLeft = +splitViewBox[0];
    yUp = +splitViewBox[1];
    width = +splitViewBox[2];
    height = +splitViewBox[3];
    if (width < 300) {
      width += 300;
    }
    const dataStart = data.substring(0, viewBoxIndex);
    viewBoxIndex = data.indexOf('" version');
    const dataEnd = data.substring(viewBoxIndex);
    dataEnd.substring(viewBoxIndex);
    data = dataStart + this.createBounds(xLeft, yUp, width, height) + dataEnd;
    return encodeURIComponent(data);
  }
  static createBounds(xLeft, yUp, width, height) {
    return 'width="100%"' + ' height="100%" ' + ' preserveAspectRatio="xMidYMid meet"' + ' viewBox="' + xLeft + ' ' + yUp + ' ' + (xLeft + width) + ' ' + (yUp + height);
  }
  /**
   * There is a Problem in the HTML-Presentation, where the Arrow-Heads of the Activities are not shown after the 4th sentence
   * This is due to the fact, that the marker for the Arrow-Head is defined in each sentence with the same ID
   * When the 5th sentence is reached, the first marker is set to display none, which propagates to all other markers
   *
   * To fix this, for each sentence the marker and its references are renamed
   */
  fixActivityMarkersForEachSentence(result, sectionIndex) {
    const defs = result.svg.substring(result.svg.indexOf('<defs>'), result.svg.indexOf('</defs>') + 7);
    const split = defs.split('<marker ');
    let newDefs = split[0];
    for (let i = 1; i < split.length; i++) {
      const ids = split[i].match(/(id="[^"]*")/g);
      ids?.forEach(id => {
        const idToReplace = id.substring(4, id.length - 1);
        const newId = idToReplace.slice(0, id.length - 5) + 'customId' + sectionIndex + idToReplace.slice(idToReplace.length - 2);
        // @ts-ignore
        result.svg = result.svg.replaceAll(idToReplace, newId);
      });
      newDefs += '<marker display= "block !important"; ' + split[i];
    }
    result.svg = result.svg.replace(defs, newDefs);
  }
  static #_ = this.ɵfac = function HtmlPresentationService_Factory(t) {
    return new (t || HtmlPresentationService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_Replay_replay_service__WEBPACK_IMPORTED_MODULE_3__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_Title_title_service__WEBPACK_IMPORTED_MODULE_4__.TitleService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: HtmlPresentationService,
    factory: HtmlPresentationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 11503:
/*!***********************************************!*\
  !*** ./src/app/Service/Export/png.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PngService: () => (/* binding */ PngService)
/* harmony export */ });
/* harmony import */ var src_app_Service_Export_exportUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/Export/exportUtil */ 70908);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


class PngService {
  constructor() {
    this.width = 0;
    this.height = 0;
  }
  browserSpecs() {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {
        name: 'IE',
        version: tem[1] || ''
      };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) {
        return {
          name: tem[1].replace('OPR', 'Opera'),
          version: tem[2]
        };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    // tslint:disable-next-line:no-conditional-assignment
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0],
      version: M[1]
    };
  }
  /** Needed for an SVG-Fix in CHrome where the # needs to be replaced by %23 **/
  URIHashtagFix(svg) {
    let fix = false;
    const browser = this.browserSpecs();
    const name = browser.name;
    const version = parseInt(browser.version);
    // only implemented in chrome and firefox at the moment
    if (name.includes('Chrome')) {
      if (version >= 72) {
        fix = true;
        // https://www.chromestatus.com/features/5656049583390720
      }
    } else if (name.includes('Firefox')) {
      fix = true;
      // versionNumber of implementation unknown
    }

    if (fix) {
      while (svg.includes('#')) {
        svg = svg.replace('#', '%23');
      }
    }
    return svg;
  }
  findMostOuterElements(svg) {
    let xLeft = 0;
    let xRight = 0;
    let yUp = 0;
    let yDown = 0;
    const elements = svg.getElementsByClassName('djs-group');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const sub = element.children;
      let elXLeft;
      let elXRight;
      let elYUp;
      let elYDown;
      const transform = sub[0].getAttribute('transform');
      if (transform) {
        let nums;
        if (transform.includes('matrix')) {
          transform.replace('matrix(', '');
          transform.replace(')', '');
          nums = transform.split(' ');
          elXLeft = parseInt(nums[4]);
          elYUp = parseInt(nums[5]);
        } else {
          transform.replace('translate(', '');
          transform.replace(')', '');
          nums = transform.split(' ');
          elXLeft = parseInt(nums[0]);
          elYUp = parseInt(nums[1]);
        }
        const rects = sub[0].getElementsByTagName('rect');
        const outerRect = rects[rects.length - 1];
        const width = outerRect.getAttribute('width');
        elXRight = elXLeft + parseInt(width != null ? width : '0');
        elYDown = elYUp + sub[0].getBoundingClientRect().height;
      } else {
        const rects = element.getElementsByTagName('rect');
        const outerRect = rects[rects.length - 1];
        const x = outerRect.getAttribute('x');
        const y = outerRect.getAttribute('y');
        elXLeft = parseInt(x != null ? x : '0');
        elYUp = parseInt(y != null ? y : '0');
        const width = outerRect.getAttribute('width');
        const height = outerRect.getAttribute('height');
        elXRight = elXLeft + parseInt(width != null ? width : '0');
        elYDown = elYUp + parseInt(height != null ? height : '0') + 20; // Add 20 px as Padding for text at the bottom
      }

      if (elXLeft < xLeft) {
        xLeft = elXLeft;
      }
      if (elXRight > xRight) {
        xRight = elXRight;
      }
      if (elYUp < yUp) {
        yUp = elYUp;
      }
      if (elYDown > yDown) {
        yDown = elYDown;
      }
    }
    yUp -= 75; // we need to adjust yUp to have space for the title and description
    return {
      xLeft,
      xRight,
      yUp,
      yDown
    };
  }
  prepareSVG(svg, layerBase, description, title, withTitle) {
    const box = this.findMostOuterElements(layerBase);
    let viewBoxIndex = svg.indexOf('width="');
    this.calculateWidthAndHeight(box);
    const {
      insertText,
      dynamicHeightOffset
    } = (0,src_app_Service_Export_exportUtil__WEBPACK_IMPORTED_MODULE_0__.createTitleAndDescriptionSVGElement)(0, title, description, box.xLeft + 10, box.yUp + 20, this.width);
    if (withTitle) {
      this.height += dynamicHeightOffset;
    }
    const bounds = this.createBounds(box, dynamicHeightOffset);
    const dataStart = svg.substring(0, viewBoxIndex);
    viewBoxIndex = svg.indexOf('style="');
    const dataEnd = svg.substring(viewBoxIndex);
    dataEnd.substring(viewBoxIndex);
    svg = dataStart + bounds + dataEnd;
    const insertIndex = svg.indexOf('<g class="viewport">') + 20;
    if (withTitle) {
      svg = [svg.slice(0, insertIndex), insertText, svg.slice(insertIndex)].join('');
    }
    svg = this.URIHashtagFix(svg);
    return svg;
  }
  createBounds(box, extraHeight) {
    return 'width="' + this.width + '" height="' + this.height + '" viewBox=" ' + box.xLeft + ' ' + (box.yUp - extraHeight) + ' ' + this.width + ' ' + this.height + '" ';
  }
  /**
   * Calculate the Width and Height of the Bounding Box for the PNG so no Parts are cut off
   */
  calculateWidthAndHeight(box) {
    if (box.xLeft < 0) {
      if (box.xRight < 0) {
        this.width = Math.abs(box.xLeft - box.xRight);
      } else {
        this.width = Math.abs(box.xLeft) + box.xRight;
      }
    } else {
      this.width = box.xRight - box.xLeft;
    }
    if (box.yUp < 0) {
      if (box.yDown < 0) {
        this.height = Math.abs(box.yUp - box.yDown);
      } else {
        this.height = Math.abs(box.yUp) + box.yDown;
      }
    } else {
      this.height = box.yDown - box.yUp;
    }
    // if the domain-Story is smaller than 300px in width or height, increase its dimensions
    if (this.height < 300) {
      this.height += 300;
      box.yUp -= 150;
      box.yDown += 150;
    }
    if (this.width < 300) {
      this.width += 300;
      box.xLeft -= 150;
      box.xRight += 150;
    }
    return [this.height, this.width];
  }
  extractSVG(viewport, outerSVGElement) {
    const layerResizers = viewport.getElementsByClassName('layer-resizers');
    const layerOverlays = viewport.getElementsByClassName('layer-overlays');
    const transform = viewport.getAttribute('transform');
    const translate = viewport.getAttribute('translate');
    if (layerResizers[0]) {
      layerResizers[0].parentNode.removeChild(layerResizers[0]);
    }
    if (layerOverlays[0]) {
      layerOverlays[0].parentNode.removeChild(layerOverlays[0]);
    }
    // remove canvas scrolling and scaling before serializeToString of SVG
    if (transform) {
      viewport.removeAttribute('transform');
    }
    if (translate) {
      viewport.removeAttribute('translate');
    }
    const svg = new XMLSerializer().serializeToString(outerSVGElement);
    // re-add canvas scrolling and scaling
    if (transform) {
      viewport.setAttribute('transform', transform);
    }
    if (translate) {
      viewport.setAttribute('translate', translate);
    }
    return svg;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  static #_ = this.ɵfac = function PngService_Factory(t) {
    return new (t || PngService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: PngService,
    factory: PngService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 29298:
/*!***********************************************!*\
  !*** ./src/app/Service/Export/svg.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgService: () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var src_app_Service_Export_exportUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/Export/exportUtil */ 70908);
/* harmony import */ var _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Export/exportConstants */ 27901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modeler/modeler.service */ 74676);




class SvgService {
  constructor(modelerService) {
    this.modelerService = modelerService;
    this.cacheData = '';
  }
  createSVGData(title, description, dst, withTitle, useWhiteBackground) {
    this.cacheData = this.modelerService.getEncoded();
    let domainStorySvg = structuredClone(this.cacheData);
    let viewBoxIndex = domainStorySvg.indexOf('width="');
    let {
      width,
      height,
      viewBox
    } = this.viewBoxCoordinates(domainStorySvg);
    // The value of the viewBox attribute is a list of four numbers separated by whitespace
    // and/or a comma: min-x, min-y, width, and height. min-x and min-y represent the smallest
    // X and Y coordinates that the viewBox may have (the origin coordinates of the viewBox)
    // and the width and height specify the viewBox size. The resulting viewBox is a
    // rectangle in user space mapped to the bounds of the viewport of an SVG element.
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
    let min_x;
    let viewBoxWidth;
    let min_y;
    let viewBoxHeight;
    const splitViewBox = viewBox.split(/\s/);
    min_x = +splitViewBox[0];
    min_y = +splitViewBox[1];
    viewBoxWidth = +splitViewBox[2];
    viewBoxHeight = +splitViewBox[3];
    // Set minimum width to ensure title and description are displayed reasonably
    if (viewBoxWidth < 300) {
      viewBoxWidth += 300;
      width += 300;
    }
    const {
      insertText,
      dynamicHeightOffset
    } = (0,src_app_Service_Export_exportUtil__WEBPACK_IMPORTED_MODULE_0__.createTitleAndDescriptionSVGElement)(0, title, description, min_x, min_y, width);
    const bounds = this.createBounds(width, height, min_x, min_y, viewBoxWidth, viewBoxHeight, withTitle, dynamicHeightOffset);
    const dataStart = domainStorySvg.substring(0, viewBoxIndex);
    viewBoxIndex = domainStorySvg.indexOf('" version');
    const dataEnd = domainStorySvg.substring(viewBoxIndex);
    dataEnd.substring(viewBoxIndex);
    domainStorySvg = dataStart + bounds + dataEnd;
    const insertIndex = this.findIndexToInsertData(domainStorySvg);
    if (withTitle) {
      domainStorySvg = domainStorySvg.slice(0, insertIndex) + insertText + domainStorySvg.slice(insertIndex);
    }
    if (useWhiteBackground) {
      const svgIndex = domainStorySvg.indexOf('width="');
      const backgroundColorWhite = 'style="background-color:white" ';
      domainStorySvg = domainStorySvg.slice(0, svgIndex) + backgroundColorWhite + domainStorySvg.slice(svgIndex);
    }
    return this.appendDST(domainStorySvg, dst);
  }
  findIndexToInsertData(data) {
    let insertIndex = data.indexOf('</defs>');
    if (insertIndex < 0) {
      insertIndex = data.indexOf('version="1.2">') + 14;
    } else {
      insertIndex += 7;
    }
    return insertIndex;
  }
  createBounds(width, height, min_x, min_y, viewBoxWidth, viewBoxHeight, withTitle, dynamicHeightOffset) {
    height = withTitle ? height + dynamicHeightOffset + _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT : height;
    min_x = min_x - _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING;
    min_y = withTitle ? min_y - dynamicHeightOffset - _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT : min_y;
    viewBoxHeight = withTitle ? viewBoxHeight + dynamicHeightOffset + _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT + _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING : viewBoxHeight;
    viewBoxWidth = viewBoxWidth + _Domain_Export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING;
    return `width="${width}" height="${height}" viewBox="${min_x} ${min_y} ${viewBoxWidth} ${viewBoxHeight}`;
  }
  viewBoxCoordinates(svg) {
    const ViewBoxCoordinate = /width="([^"]+)"\s+height="([^"]+)"\s+viewBox="([^"]+)"/;
    const match = svg.match(ViewBoxCoordinate);
    if (match) {
      return {
        width: +match[1],
        height: +match[2],
        viewBox: match[3]
      };
    }
    return {
      width: 0,
      height: 0,
      viewBox: ''
    };
  }
  appendDST(data, dst) {
    data += '\n<!-- <DST>\n' + JSON.stringify(dst, null, 2) + '\n </DST> -->';
    return data;
  }
  static #_ = this.ɵfac = function SvgService_Factory(t) {
    return new (t || SvgService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_2__.ModelerService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: SvgService,
    factory: SvgService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 93689:
/*!*************************************************************************!*\
  !*** ./src/app/Service/IconSetConfiguration/icon-dictionary.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_PREFIX: () => (/* binding */ ICON_PREFIX),
/* harmony export */   IconDictionaryService: () => (/* binding */ IconDictionaryService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/iconConfiguration */ 69186);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/allIcons */ 57488);
/* harmony import */ var _Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/sanitizer */ 66107);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);





var getIconId = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.getIconId;

const ICON_PREFIX = 'icon-domain-story-';
class IconDictionaryService {
  constructor() {
    this.actorIconDictionary = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.workObjectDictionary = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.allIconDictionary = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.iconDictionaryForBPMN = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.allIconDictionary.addEach(src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.allIcons);
    this.iconConfig = new src_app_Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.IconConfiguration(this.allIconDictionary);
  }
  initTypeDictionaries(actors, workObjects) {
    if (!actors || actors.length == 0) {
      actors = src_app_Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultConf.actors;
    }
    if (!workObjects || workObjects.length == 0) {
      workObjects = src_app_Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultConf.workObjects;
    }
    const allTypes = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    allTypes.addEach(src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.allIcons);
    allTypes.appendDict(this.getAppendedIconDictionary());
    this.initDictionary(actors, allTypes, this.actorIconDictionary, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    this.initDictionary(workObjects, allTypes, this.workObjectDictionary, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  }
  initDictionary(keys, allTypes, dictionary, elementType) {
    dictionary.clear();
    for (const key of keys) {
      dictionary.add(allTypes.get(key), key);
    }
    dictionary.keysArray().forEach(name => {
      this.registerIconForBPMN(name, ICON_PREFIX + (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(name.toLowerCase()), elementType);
    });
  }
  getCurrentIconConfigurationForBPMN() {
    if (this.customConfiguration) {
      return this.iconConfig.createCustomConf(this.customConfiguration);
    }
    return this.iconConfig.getDefaultConf();
  }
  allInTypeDictionary(type, elements) {
    let collection;
    if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    let allIn = true;
    if (elements) {
      elements.forEach(element => {
        if (!collection.has(getIconId(element.type))) {
          allIn = false;
        }
      });
    } else {
      return false;
    }
    return allIn;
  }
  /** Load Icons from Configuration **/
  addIconsFromIconSetConfiguration(dictionaryType, iconTypes) {
    let collection;
    if (dictionaryType === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (dictionaryType === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    const allTypes = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    allTypes.addEach(src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.allIcons);
    allTypes.appendDict(src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons);
    iconTypes.forEach(name => {
      if (!collection.has(name)) {
        const src = allTypes.get(name);
        if (src) {
          this.registerIconForType(dictionaryType, name, src);
          this.registerIconForBPMN(name, (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(ICON_PREFIX + name.toLowerCase()), dictionaryType);
        }
      }
    });
  }
  /** Add Icon(s) to Dictionary **/
  registerIconForBPMN(name, src, elementType) {
    if (name.includes(elementType)) {
      throw new Error('Should not include elementType');
    }
    this.iconDictionaryForBPMN.set(`${elementType}${name}`, src);
  }
  addIconsToTypeDictionary(actorIcons, workObjectIcons) {
    if (!this.allInTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorIcons)) {
      this.addIconsFromIconSetConfiguration(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorIcons.map(element => getIconId(element.type)));
    }
    if (!this.allInTypeDictionary(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectIcons)) {
      this.addIconsFromIconSetConfiguration(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectIcons.map(element => getIconId(element.type)));
    }
  }
  registerIconForType(type, name, src) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    let collection = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    collection.add(src, name);
  }
  unregisterIconForType(type, name) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    let collection = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    collection.delete(name);
  }
  updateIconRegistries(actors, workObjects, config) {
    const elements = [];
    actors.forEach(a => elements.push(a));
    workObjects.forEach(w => elements.push(w));
    const customIcons = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const actorsDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const workObjectsDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    config.actors.keysArray().forEach(key => {
      actorsDict.set(key, config.actors.get(key));
    });
    config.workObjects.keysArray().forEach(key => {
      workObjectsDict.set(key, config.workObjects.get(key));
    });
    this.extractCustomIconsFromDictionary(actorsDict, customIcons);
    this.extractCustomIconsFromDictionary(workObjectsDict, customIcons);
    elements.forEach(element => {
      const name = (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(element.type.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''));
      if ((element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) || element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT)) && !this.getFullDictionary().has(name)) {
        let elementType;
        if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR)) {
          elementType = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR;
        } else {
          elementType = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT;
        }
        this.registerIconForBPMN(ICON_PREFIX + name.toLowerCase(), getIconId(element.type), elementType);
      }
    });
    this.addNewIconsToDictionary(customIcons);
    this.addIconsToTypeDictionary(actors, workObjects);
  }
  extractCustomIconsFromDictionary(elementDictionary, customIcons) {
    elementDictionary.keysArray().forEach(name => {
      const sanitizedName = (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(name);
      if (!this.getFullDictionary().has(sanitizedName)) {
        customIcons.add(elementDictionary.get(name), sanitizedName);
      }
    });
  }
  /** Add new Icon(s) **/
  addNewIconsToDictionary(customIcons) {
    customIcons.keysArray().forEach(key => {
      const custom = customIcons.get(key);
      this.addIMGToIconDictionary(custom.src, key);
    });
    this.addIconsToCss(customIcons);
  }
  addIMGToIconDictionary(input, name) {
    src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons.set(name, input);
  }
  addIconsToCss(customIcons) {
    const sheetEl = document.getElementById('iconsCss');
    customIcons.keysArray().forEach(key => {
      const src = customIcons.get(key);
      const iconStyle = '.' + ICON_PREFIX + (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(key.toLowerCase()) + '::before{ content: url("data:image/svg+xml;utf8,' + this.wrapSRCInSVG(src) + '"); margin: 3px;}';
      // @ts-ignore
      sheetEl?.sheet?.insertRule(iconStyle, sheetEl.sheet.cssRules.length);
    });
  }
  wrapSRCInSVG(src) {
    return "<svg viewBox='0 0 22 22' width='22' height='22' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><image width='22' height='22' xlink:href='" + src + "'/></svg>";
  }
  /** Getter & Setter **/
  getFullDictionary() {
    const fullDictionary = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    fullDictionary.appendDict(this.allIconDictionary);
    fullDictionary.appendDict(this.getAppendedIconDictionary());
    return fullDictionary;
  }
  getAppendedIconDictionary() {
    const appendedDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons.keysArray().forEach(key => {
      if (!this.allIconDictionary.has(key)) {
        appendedDict.set(key, src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons.get(key));
      }
    });
    return appendedDict;
  }
  getTypeDictionary(type) {
    if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      return this.actorIconDictionary;
    } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      return this.workObjectDictionary;
    }
    return new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
  }
  getTypeDictionaryKeys(type) {
    return this.getTypeDictionary(type).keysArray();
  }
  getTypeIconSRC(type, name) {
    if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      return this.actorIconDictionary.get(name);
    } else if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      return this.workObjectDictionary.get(name);
    }
    return null;
  }
  getIconForBPMN(elementType, name) {
    return this.iconDictionaryForBPMN.get(`${elementType}${name}`);
  }
  getIconSource(name) {
    if (this.allIconDictionary.has(name)) {
      return this.allIconDictionary.get(name);
    } else if (src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons.has(name)) {
      return src_app_Domain_Icon_Set_Configuration_allIcons__WEBPACK_IMPORTED_MODULE_3__.appendedIcons.get(name);
    }
    return null;
  }
  getElementsOfType(elements, type) {
    const elementOfType = [];
    elements.forEach(element => {
      if (element.type.includes(type)) {
        elementOfType.push(element);
      }
    });
    return elementOfType;
  }
  getAllIconDictionary() {
    return this.allIconDictionary;
  }
  getActorsDictionary() {
    return this.actorIconDictionary;
  }
  getWorkObjectsDictionary() {
    return this.workObjectDictionary;
  }
  getIconConfiguration() {
    return this.iconConfig;
  }
  setCustomConfiguration(customConfiguration) {
    this.customConfiguration = customConfiguration;
  }
  static #_ = this.ɵfac = function IconDictionaryService_Factory(t) {
    return new (t || IconDictionaryService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: IconDictionaryService,
    factory: IconDictionaryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 10200:
/*!********************************************************************************!*\
  !*** ./src/app/Service/IconSetConfiguration/icon-set-configuration.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigurationService: () => (/* binding */ IconSetConfigurationService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Domain/Icon-Set-Configuration/iconConfiguration */ 69186);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _Title_title_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Title/title.service */ 69672);








class IconSetConfigurationService {
  constructor(iconDictionaryService, elementRegistryService, titleService) {
    this.iconDictionaryService = iconDictionaryService;
    this.elementRegistryService = elementRegistryService;
    this.titleService = titleService;
  }
  setIconSetName(iconSetName) {
    this.titleService.setIconSetName(iconSetName ? iconSetName : _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME);
  }
  exportConfiguration() {
    const iconSetConfiguration = this.getCurrentConfigurationForExport();
    if (!iconSetConfiguration) {
      return;
    }
    const configJSONString = JSON.stringify(iconSetConfiguration, null, 2);
    const filename = this.titleService.getIconSetName();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(configJSONString));
    element.setAttribute('download', filename + '.iconset');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  loadConfiguration(customConfig, updateIconSetName = true) {
    let actorDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    let workObjectDict = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    if (customConfig.actors.keysArray()) {
      actorDict = customConfig.actors;
      workObjectDict = customConfig.workObjects;
    } else {
      actorDict.addEach(customConfig.actors);
      workObjectDict.addEach(customConfig.workObjects);
    }
    const actorKeys = actorDict.keysArray();
    const workObjectKeys = workObjectDict.keysArray();
    this.iconDictionaryService.updateIconRegistries([], [], customConfig);
    this.iconDictionaryService.getIconConfiguration().appendSRCFile(actorKeys, actorDict, workObjectKeys, workObjectDict);
    this.iconDictionaryService.addIconsFromIconSetConfiguration(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorKeys.map(a => src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR + a));
    this.iconDictionaryService.addIconsFromIconSetConfiguration(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectKeys.map(w => src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT + w));
    if (updateIconSetName) {
      const configurationName = customConfig.name;
      this.setIconSetName(configurationName);
    }
  }
  getCurrentConfiguration() {
    const actors = this.iconDictionaryService.getActorsDictionary();
    const workObjects = this.iconDictionaryService.getWorkObjectsDictionary();
    let iconSetConfiguration;
    if (actors.size() > 0 && workObjects.size() > 0) {
      iconSetConfiguration = this.createConfigFromDictionaries(actors, workObjects);
    }
    return iconSetConfiguration;
  }
  getCurrentConfigurationForExport() {
    const currentConfiguration = this.getCurrentConfiguration();
    if (currentConfiguration) {
      const actors = {};
      const workObjects = {};
      currentConfiguration.actors.all().forEach(entry => {
        actors[entry.key] = entry.value;
      });
      currentConfiguration.workObjects.all().forEach(entry => {
        workObjects[entry.key] = entry.value;
      });
      return {
        name: currentConfiguration.name,
        actors: actors,
        workObjects: workObjects
      };
    }
    return;
  }
  getCurrentConfigurationNamesWithoutPrefix() {
    return {
      name: this.titleService.getIconSetName() || _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME,
      actors: this.iconDictionaryService.getActorsDictionary().keysArray().map(a => a.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '')),
      workObjects: this.iconDictionaryService.getWorkObjectsDictionary().keysArray().map(w => w.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''))
    };
  }
  createMinimalConfigurationWithDefaultIcons() {
    const minimalConfig = this.createConfigFromCanvas();
    _Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultConf.actors.forEach(iconName => {
      minimalConfig.actors.add(this.iconDictionaryService.getIconSource(iconName), iconName);
    });
    _Domain_Icon_Set_Configuration_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultConf.workObjects.forEach(iconName => {
      minimalConfig.workObjects.add(this.iconDictionaryService.getIconSource(iconName), iconName);
    });
    return minimalConfig;
  }
  createConfigFromDictionaries(actorsDict, workObjectsDict) {
    const actorNames = actorsDict.keysArray();
    const workobjectNames = workObjectsDict.keysArray();
    const newActors = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const newWorkobjects = new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    // Fill Configuration from Canvas-Objects
    actorNames.forEach(actor => {
      newActors.add(actorsDict.get(actor), actor.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, ''));
    });
    workobjectNames.forEach(workObject => {
      newWorkobjects.add(workObjectsDict.get(workObject), workObject.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''));
    });
    return {
      name: this.titleService.getIconSetName(),
      actors: newActors,
      workObjects: newWorkobjects
    };
  }
  createConfigFromCanvas() {
    const config = {
      name: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME,
      actors: new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary(),
      workObjects: new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary()
    };
    let allCanvasObjects = this.elementRegistryService.getAllCanvasObjects();
    allCanvasObjects.map(e => e.businessObject).forEach(element => {
      const type = element.type.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, '');
      if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.actors.add(src, type);
      } else if (element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.workObjects.add(src, type);
      }
    });
    return config;
  }
  static #_ = this.ɵfac = function IconSetConfigurationService_Factory(t) {
    return new (t || IconSetConfigurationService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_5__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_Title_title_service__WEBPACK_IMPORTED_MODULE_6__.TitleService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: IconSetConfigurationService,
    factory: IconSetConfigurationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 87007:
/*!********************************************************************************!*\
  !*** ./src/app/Service/IconSetConfiguration/icon-set-customization.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetCustomizationService: () => (/* binding */ IconSetCustomizationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-set-configuration.service */ 10200);
/* harmony import */ var _icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon-dictionary.service */ 93689);
/* harmony import */ var _Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Import/import-domain-story.service */ 23779);
/* harmony import */ var _Title_title_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Title/title.service */ 69672);
/* harmony import */ var _BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BrowserStorage/storage.service */ 59298);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);




var getIconId = _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.getIconId;








class IconSetCustomizationService {
  constructor(configurationService, iconDictionaryService, importService, titleService, storageService, elementRegistryService, snackbar) {
    this.configurationService = configurationService;
    this.iconDictionaryService = iconDictionaryService;
    this.importService = importService;
    this.titleService = titleService;
    this.storageService = storageService;
    this.elementRegistryService = elementRegistryService;
    this.snackbar = snackbar;
    this.allIconListItems = new _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.configurationHasChanged = false;
    this.selectedActors$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject([]);
    this.selectedWorkobjects$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject([]);
    this.iconSetConfigurationTypes = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject(this.configurationService.getCurrentConfigurationNamesWithoutPrefix());
    this.selectedWorkobjects$.next(this.iconSetConfigurationTypes.value.workObjects);
    this.selectedActors$.next(this.iconSetConfigurationTypes.value.actors);
    iconDictionaryService.getAllIconDictionary().keysArray().forEach(iconName => {
      this.addIconToAllIconList(iconName);
    });
    importService.importedConfigurationEvent.subscribe(config => {
      this.importConfiguration(config);
    });
    const storedIconSetConfiguration = this.storageService.getStoredIconSetConfiguration();
    if (storedIconSetConfiguration) {
      this.importConfiguration(storedIconSetConfiguration, false);
    }
    const importedConfiguration = this.importService.getImportedConfiguration();
    if (importedConfiguration) {
      this.importConfiguration(importedConfiguration, false);
    }
  }
  importConfiguration(customConfig, saveIconSet = true) {
    const actorKeys = customConfig.actors.keysArray();
    const workObjectKeys = customConfig.workObjects.keysArray();
    this.changeName(customConfig.name);
    actorKeys.forEach(iconName => {
      if (!this.allIconListItems.has(iconName)) {
        this.addIconToAllIconList(iconName);
      }
      const selectedActorNames = this.selectedActors$.value;
      if (!selectedActorNames.includes(iconName)) {
        this.selectActor(iconName);
      }
    });
    workObjectKeys.forEach(iconName => {
      if (!this.allIconListItems.has(iconName)) {
        this.addIconToAllIconList(iconName);
      }
      const selectedWorkobjectNames = this.selectedWorkobjects$.value;
      if (!selectedWorkobjectNames.includes(iconName)) {
        this.selectWorkObject(iconName);
      }
    });
    if (saveIconSet) {
      this.saveIconSet(this.elementRegistryService.getUsedIcons(), true);
    }
  }
  /** Getter & Setter **/
  getIconSetConfiguration() {
    return this.iconSetConfigurationTypes;
  }
  getIconForName(iconName) {
    return this.allIconListItems.get(iconName);
  }
  isIconActor(iconName) {
    return this.iconSetConfigurationTypes.value.actors.filter(actor => actor === iconName).length > 0;
  }
  isIconWorkObject(iconName) {
    return this.iconSetConfigurationTypes.value.workObjects.filter(workObject => workObject === iconName).length > 0;
  }
  changeName(iconSetName) {
    this.titleService.setIconSetName(iconSetName);
    const changedIconSet = this.iconSetConfigurationTypes.value;
    changedIconSet.name = iconSetName;
    this.iconSetConfigurationTypes.next(changedIconSet);
  }
  /** Selected Icons **/
  setAsUnassigned(iconName, isActor) {
    if (isActor) {
      this.deselectActor(iconName);
    } else {
      this.deselectWorkobject(iconName);
    }
    this.updateIcon(false, false, iconName);
  }
  setAsActor(isActor, actor) {
    if (isActor) {
      this.updateIcon(true, false, actor);
      this.selectActor(actor);
      this.deselectWorkobject(actor);
    } else {
      this.deselectActor(actor);
      this.updateIcon(false, false, actor);
    }
  }
  setAsWorkobject(isWorkobject, workobject) {
    if (isWorkobject) {
      this.updateIcon(false, true, workobject);
      this.selectWorkObject(workobject);
      this.deselectActor(workobject);
    } else {
      this.deselectWorkobject(workobject);
      this.updateIcon(false, false, workobject);
    }
  }
  selectActor(actor) {
    const value = this.iconSetConfigurationTypes.value;
    if (!value.actors.includes(actor)) {
      value.actors.push(actor);
      this.iconSetConfigurationTypes.next(value);
      this.updateActorSubject();
    }
  }
  selectWorkObject(workObject) {
    const value = this.iconSetConfigurationTypes.value;
    if (!value.workObjects.includes(workObject)) {
      value.workObjects.push(workObject);
      this.iconSetConfigurationTypes.next(value);
      this.updateWorkObjectSubject();
    }
  }
  deselectActor(actor) {
    if (this.iconSetConfigurationTypes) {
      this.iconSetConfigurationTypes.next({
        name: this.iconSetConfigurationTypes.value.name,
        actors: this.iconSetConfigurationTypes.value.actors.filter(a => !a.includes(actor)),
        workObjects: this.iconSetConfigurationTypes.value.workObjects
      });
    }
    this.updateActorSubject();
  }
  deselectWorkobject(workobject) {
    if (this.iconSetConfigurationTypes) {
      this.iconSetConfigurationTypes.next({
        name: this.iconSetConfigurationTypes.value.name,
        actors: this.iconSetConfigurationTypes.value.actors,
        workObjects: this.iconSetConfigurationTypes.value.workObjects.filter(w => !w.includes(workobject))
      });
    }
    this.updateWorkObjectSubject();
  }
  setSelectedWorkObject(sortedList) {
    const value = this.iconSetConfigurationTypes.value;
    value.workObjects = sortedList;
    this.iconSetConfigurationTypes.next(value);
    this.updateWorkObjectSubject();
  }
  setSelectedActors(sortedList) {
    const value = this.iconSetConfigurationTypes.value;
    value.actors = sortedList;
    this.iconSetConfigurationTypes.next(value);
    this.updateActorSubject();
  }
  updateActorSubject() {
    this.selectedActors$.next(this.iconSetConfigurationTypes.value.actors);
    this.configurationHasChanged = true;
  }
  updateWorkObjectSubject() {
    this.selectedWorkobjects$.next(this.iconSetConfigurationTypes.value.workObjects);
    this.configurationHasChanged = true;
  }
  /** Revert Icon Set **/
  resetIconSet() {
    const defaultConfig = this.configurationService.createMinimalConfigurationWithDefaultIcons();
    this.selectedWorkobjects$.value.forEach(workObjectName => {
      if (!defaultConfig.workObjects.has(workObjectName)) {
        this.deselectWorkobject(workObjectName);
      }
    });
    this.selectedActors$.value.forEach(actorName => {
      if (!defaultConfig.actors.has(actorName)) {
        this.deselectActor(actorName);
      }
    });
    this.iconSetConfigurationTypes.next({
      name: defaultConfig.name,
      actors: defaultConfig.actors.keysArray(),
      workObjects: defaultConfig.workObjects.keysArray()
    });
    this.updateAllIconBehaviourSubjects();
  }
  cancel() {
    this.iconSetConfigurationTypes.next(this.configurationService.getCurrentConfigurationNamesWithoutPrefix());
    this.updateAllIconBehaviourSubjects();
    this.resetToInitialConfiguration();
  }
  resetToInitialConfiguration() {
    this.updateActorSubject();
    this.updateWorkObjectSubject();
  }
  /** Persist Icon Set **/
  saveIconSet(usedIcons, imported = false) {
    const changedActors = [];
    const changedWorkobjects = [];
    if (this.configurationHasChanged) {
      const changedIconSet = this.createIconSetConfiguration();
      const configurationActors = changedIconSet.actors.keysArray();
      usedIcons?.actors.forEach(actor => {
        if (!configurationActors?.includes(actor) && !changedActors.includes(actor)) {
          changedActors.push(actor);
        }
      });
      const configurationWorkobjects = changedIconSet.workObjects.keysArray();
      usedIcons?.workobjects.forEach(workobject => {
        if (!configurationWorkobjects?.includes(workobject) && !changedWorkobjects.includes(workobject)) {
          changedWorkobjects.push(workobject);
        }
      });
      if (!changedActors.length && !changedWorkobjects.length) {
        this.changedIconSetConfiguration = changedIconSet;
        this.updateIcons(changedIconSet);
        this.storageService.setStoredIconSetConfiguration(this.changedIconSetConfiguration);
        this.snackbar.open(imported ? 'Configuration imported successfully' : 'Configuration saved successfully', undefined, {
          duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
          panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
        });
      }
    } else {
      this.snackbar.open(imported ? 'No configuration to be imported' : 'No configuration to be saved', undefined, {
        duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
      });
    }
    if (changedActors.length || changedWorkobjects.length) {
      if (changedActors.length) {
        const actors = changedActors.join(', ');
        this.snackbar.open(`The following icons are already in use as actors and cannot be changed: ${actors}`, undefined, {
          duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION * 3,
          panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
        });
      }
      if (changedWorkobjects.length) {
        const workobjects = changedWorkobjects.join(', ');
        this.snackbar.open(`The following icons are already in use as workobjects and cannot be changed: ${workobjects}`, undefined, {
          duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION * 3,
          panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
        });
      }
    }
  }
  exportIconSet() {
    this.configurationService.exportConfiguration();
  }
  getAndClearSavedConfiguration() {
    const temp = this.changedIconSetConfiguration;
    this.changedIconSetConfiguration = undefined;
    return temp;
  }
  createIconSetConfiguration() {
    const actors = new _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    const workObjects = new _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.iconSetConfigurationTypes.value.actors.forEach(name => {
      actors.add(this.iconDictionaryService.getIconSource(name), name);
    });
    this.iconSetConfigurationTypes.value.workObjects.forEach(name => {
      workObjects.add(this.iconDictionaryService.getIconSource(name), name);
    });
    return {
      name: this.iconSetConfigurationTypes.value.name || '',
      actors,
      workObjects
    };
  }
  /** Update Icons **/
  addNewIcon(iconName) {
    const iconDict = new _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    iconDict.add(this.getSrcForIcon(iconName), iconName);
    this.iconDictionaryService.addIconsToCss(iconDict);
    this.addIconToAllIconList(iconName);
  }
  addIconToAllIconList(iconName) {
    this.allIconListItems.add(new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject({
      name: iconName,
      svg: this.getSrcForIcon(iconName),
      isActor: this.isIconActor(iconName),
      isWorkObject: this.isIconWorkObject(iconName)
    }), iconName);
  }
  updateIcon(isActor, isWorkobject, iconName) {
    const iconBehaviourSubject = this.getIconForName(iconName);
    const icon = iconBehaviourSubject.value;
    icon.isActor = isActor;
    icon.isWorkObject = isWorkobject;
    iconBehaviourSubject.next(icon);
  }
  updateAllIconBehaviourSubjects() {
    const customIconSetConfiguration = this.iconSetConfigurationTypes.value;
    this.allIconListItems.keysArray().forEach(iconName => {
      if (customIconSetConfiguration.actors.includes(iconName)) {
        this.updateIcon(true, false, iconName);
      } else if (customIconSetConfiguration.workObjects.includes(iconName)) {
        this.updateIcon(false, true, iconName);
      } else {
        this.updateIcon(false, false, iconName);
      }
    });
  }
  getSrcForIcon(name) {
    let iconName;
    if (name.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.DOMAINSTORY)) {
      // TODO: td: This returns empty every time!
      iconName = getIconId(name);
    } else {
      iconName = name;
    }
    const rawSrc = this.iconDictionaryService.getIconSource(iconName);
    if (!rawSrc) {
      return '';
    }
    if (rawSrc.startsWith('data')) {
      return rawSrc;
    } else {
      return 'data:image/svg+xml,' + rawSrc;
    }
  }
  updateIcons(changedIconSet) {
    this.allIconListItems.keysArray().forEach(item => this.setAsUnassigned(item, this.isIconActor(item)));
    changedIconSet.actors.keysArray().forEach(actor => {
      this.iconDictionaryService.registerIconForType(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, actor, this.iconDictionaryService.getFullDictionary().get(actor));
      this.iconDictionaryService.unregisterIconForType(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, actor);
      this.setAsActor(true, actor);
    });
    changedIconSet.workObjects.keysArray().forEach(workObject => {
      this.iconDictionaryService.registerIconForType(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, workObject, this.iconDictionaryService.getFullDictionary().get(workObject));
      this.iconDictionaryService.unregisterIconForType(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, workObject);
      this.setAsWorkobject(true, workObject);
    });
  }
  static #_ = this.ɵfac = function IconSetCustomizationService_Factory(t) {
    return new (t || IconSetCustomizationService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_5__.ImportDomainStoryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_Title_title_service__WEBPACK_IMPORTED_MODULE_6__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_8__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
    token: IconSetCustomizationService,
    factory: IconSetCustomizationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 23779:
/*!***************************************************************!*\
  !*** ./src/app/Service/Import/import-domain-story.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDomainStoryService: () => (/* binding */ ImportDomainStoryService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var src_app_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Domain/Icon-Set-Configuration/iconSetConfiguration */ 77044);
/* harmony import */ var _Presentation_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Presentation/Dialog/info-dialog/info-dialog.component */ 16266);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Domain/Dialog/infoDialogData */ 45574);
/* harmony import */ var _Utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/sanitizer */ 66107);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var src_app_Service_Import_import_repair_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Service/Import/import-repair.service */ 75158);
/* harmony import */ var src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Service/Title/title.service */ 69672);
/* harmony import */ var src_app_Service_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Service/Renderer/renderer.service */ 94896);
/* harmony import */ var _Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Dialog/dialog.service */ 4730);
/* harmony import */ var _IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);

















class ImportDomainStoryService {
  constructor(iconDictionaryService, importRepairService, titleService, rendererService, dialogService, iconSetConfigurationService, snackbar) {
    this.iconDictionaryService = iconDictionaryService;
    this.importRepairService = importRepairService;
    this.titleService = titleService;
    this.rendererService = rendererService;
    this.dialogService = dialogService;
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.snackbar = snackbar;
    this.title = _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_TITLE;
    this.description = _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_DESCRIPTION;
    this.importedConfiguration = null;
    this.importedConfigurationEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.titleSubscription = this.titleService.title$.subscribe(title => {
      this.title = title;
    });
    this.descriptionSubscription = this.titleService.description$.subscribe(description => {
      this.description = description;
    });
  }
  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
    this.descriptionSubscription.unsubscribe();
  }
  get importedConfigurationEvent() {
    return this.importedConfigurationEmitter.asObservable();
  }
  getImportedConfiguration() {
    const config = {
      name: this.importedConfiguration?.name || '',
      actors: this.importedConfiguration?.actors || new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary(),
      workObjects: this.importedConfiguration?.workObjects || new src_app_Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary()
    };
    this.importedConfiguration = null;
    return config;
  }
  importDST(input, filename, isSVG) {
    const fileReader = new FileReader();
    const titleText = (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.restoreTitleFromFileName)(filename, isSVG);
    // no need to put this on the commandStack
    this.titleService.updateTitleAndDescription(titleText, null, false);
    fileReader.onloadend = e => {
      if (e && e.target) {
        this.fileReaderFunction(e.target.result, isSVG, false);
      }
    };
    fileReader.readAsText(input);
  }
  importEGN(input, filename, isSVG) {
    const fileReader = new FileReader();
    const titleText = (0,_Utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.restoreTitleFromFileName)(filename, isSVG);
    // no need to put this on the commandStack
    this.titleService.updateTitleAndDescription(titleText, null, false);
    fileReader.onloadend = e => {
      if (e && e.target) {
        this.fileReaderFunction(e.target.result, isSVG, true);
      }
    };
    fileReader.readAsText(input);
  }
  fileReaderFunction(text, isSVG, isEGN) {
    let dstText;
    if (typeof text === 'string') {
      if (isSVG) {
        dstText = this.removeXMLComments(text);
      } else {
        dstText = text;
      }
      let elements;
      let config;
      let configFromFile;
      let dstAndConfig = this.extractDstAndConfig(dstText, isSVG);
      if (dstAndConfig == null) {
        return;
      }
      // current implementation
      if (dstAndConfig.domain) {
        configFromFile = isEGN ? dstAndConfig.domain : JSON.parse(dstAndConfig.domain);
        config = (0,src_app_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_2__.fromConfigurationFromFile)(configFromFile);
        elements = isEGN ? dstAndConfig.dst : JSON.parse(dstAndConfig.dst);
      } else {
        // legacy implementation
        if (dstAndConfig.config) {
          configFromFile = JSON.parse(dstAndConfig.config);
          config = (0,src_app_Domain_Icon_Set_Configuration_iconSetConfiguration__WEBPACK_IMPORTED_MODULE_2__.fromConfigurationFromFile)(configFromFile);
          elements = JSON.parse(dstAndConfig.dst);
        } else {
          // implementation prior to configuration
          elements = JSON.parse(dstText);
          config = this.iconSetConfigurationService.createMinimalConfigurationWithDefaultIcons();
        }
      }
      const configChanged = this.checkConfigForChanges(config);
      let lastElement = elements[elements.length - 1];
      if (!lastElement.id) {
        lastElement = elements.pop();
        let importVersionNumber = lastElement;
        // if the last element has the importedVersionNumber has the tag version,
        // then there exists another meta tag 'info' for the description
        if (importVersionNumber.version) {
          lastElement = elements.pop();
        }
        if (importVersionNumber.version) {
          importVersionNumber = importVersionNumber.version;
        } else {
          importVersionNumber = '?';
          this.snackbar.open(`The version number is unreadable.`, undefined, {
            duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION,
            panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
          });
        }
        elements = this.handleVersionNumber(importVersionNumber, elements);
      }
      if (!this.importRepairService.checkForUnreferencedElementsInActivitiesAndRepair(elements)) {
        this.showBrokenImportDialog(isSVG ? 'SVG' : 'DST');
      }
      this.titleService.updateTitleAndDescription(this.title, lastElement.info, false);
      this.importRepairService.adjustPositions(elements);
      this.updateIconRegistries(elements, config);
      this.rendererService.importStory(elements, configChanged, config);
    }
  }
  handleVersionNumber(importVersionNumber, elements) {
    const versionPrefix = +importVersionNumber.substring(0, importVersionNumber.lastIndexOf('.'));
    if (versionPrefix <= 0.5) {
      elements = this.importRepairService.updateCustomElementsPreviousV050(elements);
      this.showPreviousV050Dialog(versionPrefix);
    }
    return elements;
  }
  extractDstAndConfig(dstText, isSVG) {
    let dstAndConfig = null;
    try {
      dstAndConfig = JSON.parse(dstText);
    } catch (e) {
      this.showBrokenImportDialog(isSVG ? 'SVG' : 'DST');
    }
    return dstAndConfig;
  }
  removeXMLComments(xmlText) {
    xmlText = xmlText.substring(xmlText.indexOf('<DST>'));
    while (xmlText.includes('<!--') || xmlText.includes('-->')) {
      xmlText = xmlText.replace('<!--', '').replace('-->', '');
    }
    xmlText = xmlText.replace('<DST>', '');
    xmlText = xmlText.replace('</DST>', '');
    return xmlText;
  }
  checkConfigForChanges(iconSetConfiguration) {
    const newActorKeys = iconSetConfiguration.actors.keysArray();
    const newWorkObjectKeys = iconSetConfiguration.workObjects.keysArray();
    const currentActorKeys = this.iconDictionaryService.getTypeDictionaryKeys(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    const currentWorkobjectKeys = this.iconDictionaryService.getTypeDictionaryKeys(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
    let changed = false;
    if (newActorKeys.length !== currentActorKeys.length || newWorkObjectKeys.length !== currentWorkobjectKeys.length) {
      return true;
    }
    for (let i = 0; i < newActorKeys.length; i++) {
      changed = this.clearName(currentActorKeys[i]) !== this.clearName(newActorKeys[i]);
      if (changed) {
        i = newActorKeys.length;
      }
    }
    if (changed) {
      return changed;
    }
    for (let i = 0; i < newWorkObjectKeys.length; i++) {
      changed = this.clearName(currentWorkobjectKeys[i]) !== this.clearName(newWorkObjectKeys[i]);
      if (changed) {
        i = newWorkObjectKeys.length;
      }
    }
    return changed;
  }
  clearName(name) {
    return name.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, '');
  }
  updateIconRegistries(elements, config) {
    const actorIcons = this.iconDictionaryService.getElementsOfType(elements, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    const workObjectIcons = this.iconDictionaryService.getElementsOfType(elements, src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
    this.iconDictionaryService.updateIconRegistries(actorIcons, workObjectIcons, config);
    this.setImportedConfigurationAndEmit(config);
  }
  showPreviousV050Dialog(version) {
    const title = 'Compatability-Warning';
    const text = 'The uploaded Domain-Story is from version ' + version + '. There may be problems with the default actors or workobjects contained in the story.';
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = new _Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_4__.InfoDialogData(title, text, true);
    this.dialogService.openDialog(_Presentation_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__.InfoDialogComponent, config);
  }
  setImportedConfigurationAndEmit(config) {
    this.importedConfiguration = config;
    this.importedConfigurationEmitter.emit(config);
  }
  showBrokenImportDialog(type) {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = new _Domain_Dialog_infoDialogData__WEBPACK_IMPORTED_MODULE_4__.InfoDialogData('Error during import', 'The uploaded ' + type + ' is not complete, there could be elements missing from the canvas.', true, false);
    this.dialogService.openDialog(_Presentation_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__.InfoDialogComponent, config);
  }
  static #_ = this.ɵfac = function ImportDomainStoryService_Factory(t) {
    return new (t || ImportDomainStoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_7__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](src_app_Service_Import_import_repair_service__WEBPACK_IMPORTED_MODULE_8__.ImportRepairService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_9__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](src_app_Service_Renderer_renderer_service__WEBPACK_IMPORTED_MODULE_10__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_11__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_12__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
    token: ImportDomainStoryService,
    factory: ImportDomainStoryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 75158:
/*!*********************************************************!*\
  !*** ./src/app/Service/Import/import-repair.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportRepairService: () => (/* binding */ ImportRepairService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


/**
 * Repairs broken Domain Stories so that it can be rendered onto the canvas
 * by removing activities and connections that reference elements that don't exists
 */
class ImportRepairService {
  checkForUnreferencedElementsInActivitiesAndRepair(elements) {
    const activities = [];
    const objectIDs = [];
    let complete = true;
    elements.forEach(element => {
      const type = element.type;
      if (type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY || type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
        activities.push(element);
      } else {
        objectIDs.push(element.id);
      }
    });
    activities.forEach(activity => {
      const source = activity.source;
      const target = activity.target;
      if (!objectIDs.includes(source) || !objectIDs.includes(target)) {
        complete = false;
        const activityIndex = elements.indexOf(activity);
        elements = elements.splice(activityIndex, 1);
      }
    });
    return complete;
  }
  /**
   * Ensure backwards compatibility.
   * Previously Document had no special name and was just addressed as workObject
   * Bubble was renamed to Conversation
   */
  updateCustomElementsPreviousV050(elements) {
    for (const element of elements) {
      if (element.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) {
        element.type = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Document';
      } else if (element.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Bubble') {
        element.type = src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Conversation';
      }
    }
    return elements;
  }
  /**
   * Adjusts Positions of Elements to ensure the Domain Story starts in the visible parts of the canvas
   */
  adjustPositions(elements) {
    let xLeft = 0;
    let yUp = 0;
    let isFirst = true;
    this.findFirstElement(elements, isFirst, xLeft, yUp);
    if (xLeft < 75 || xLeft > 150 || yUp < 0 || yUp > 50) {
      // add Padding for the Palette and the top
      xLeft -= 75;
      yUp -= 50;
      elements.forEach(element => this.adjustElementPosition(element, xLeft, yUp));
    }
  }
  adjustElementPosition(element, xLeft, yUp) {
    if (element.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY || element.type === src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
      const waypoints = element.waypoints;
      waypoints.forEach(point => {
        point.x -= xLeft;
        point.y -= yUp;
        if (point.original) {
          point.original.x = point.x;
          point.original.y = point.y;
        }
      });
    } else {
      element.x -= xLeft;
      element.y -= yUp;
    }
  }
  findFirstElement(elements, isFirst, xLeft, yUp) {
    elements.forEach(element => {
      let elXLeft;
      let elYUp;
      if (element.type !== src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY && element.type !== src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
        if (isFirst) {
          xLeft = element.x;
          yUp = element.y;
          isFirst = false;
        }
        elXLeft = element.x;
        elYUp = element.y;
        if (elXLeft < xLeft) {
          xLeft = elXLeft;
        }
        if (elYUp < yUp) {
          yUp = elYUp;
        }
      }
    });
  }
  static #_ = this.ɵfac = function ImportRepairService_Factory(t) {
    return new (t || ImportRepairService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ImportRepairService,
    factory: ImportRepairService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 59783:
/*!*********************************************************************!*\
  !*** ./src/app/Service/LabelDictionary/label-dictionary.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryService: () => (/* binding */ LabelDictionaryService)
/* harmony export */ });
/* harmony import */ var src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Domain/Common/elementTypes */ 30236);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_LabelDictionary_mass_naming_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/LabelDictionary/mass-naming.service */ 37509);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../IconSetConfiguration/icon-dictionary.service */ 93689);





class LabelDictionaryService {
  constructor(massNamingService, elementRegistryService, iconDictionaryService) {
    this.massNamingService = massNamingService;
    this.elementRegistryService = elementRegistryService;
    this.iconDictionaryService = iconDictionaryService;
    this.activityLabels = [];
    this.workObjektLabels = [];
  }
  createLabelDictionaries() {
    this.activityLabels = [];
    this.workObjektLabels = [];
    const allObjects = this.elementRegistryService.getAllCanvasObjects();
    allObjects.forEach(element => {
      const name = element.businessObject.name;
      if (name && name.length > 0 && element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) && !this.activityLabels.map(a => a.name).includes(name)) {
        this.activityLabels.push({
          name,
          originalName: name
        });
      } else if (name && name.length > 0 && element.type.includes(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) && !this.workObjektLabels.map(e => e.name).includes(name)) {
        const iconName = element.type.replace(src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, '');
        let icon = this.iconDictionaryService.getIconSource(iconName);
        if (!icon) {
          return;
        }
        if (!icon.startsWith('data')) {
          icon = 'data:image/svg+xml,' + icon;
        }
        this.workObjektLabels.push({
          name,
          originalName: name,
          icon
        });
      }
    });
    this.activityLabels.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.workObjektLabels.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
  getActivityLabels() {
    return this.activityLabels.slice();
  }
  getWorkObjectLabels() {
    return this.workObjektLabels.slice();
  }
  getUniqueWorkObjectNames() {
    const workObjects = this.elementRegistryService.getAllWorkobjects();
    return [...new Set(workObjects.filter(workObject => {
      return !!workObject.businessObject.name;
    }).map(workObject => workObject.businessObject.name))];
  }
  massRenameLabels(activityNames, originalActivityNames, workObjectNames, originalWorkObjectNames) {
    for (let i = 0; i < originalActivityNames.length; i++) {
      if (!activityNames[i]) {
        activityNames[i] = '';
      }
      if (!(activityNames[i] == originalActivityNames[i])) {
        this.massNamingService.massChangeNames(originalActivityNames[i], activityNames[i], src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY);
      }
    }
    for (let i = 0; i < originalWorkObjectNames.length; i++) {
      if (!workObjectNames[i]) {
        workObjectNames[i] = '';
      }
      if (!(workObjectNames[i] == originalWorkObjectNames[i])) {
        this.massNamingService.massChangeNames(originalWorkObjectNames[i], workObjectNames[i], src_app_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
      }
    }
  }
  static #_ = this.ɵfac = function LabelDictionaryService_Factory(t) {
    return new (t || LabelDictionaryService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_Service_LabelDictionary_mass_naming_service__WEBPACK_IMPORTED_MODULE_1__.MassNamingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_2__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__.IconDictionaryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: LabelDictionaryService,
    factory: LabelDictionaryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 37509:
/*!****************************************************************!*\
  !*** ./src/app/Service/LabelDictionary/mass-naming.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MassNamingService: () => (/* binding */ MassNamingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommandStack/command-stack.service */ 19381);



class MassNamingService {
  constructor(elementRegistryService, commandStackService) {
    this.elementRegistryService = elementRegistryService;
    this.commandStackService = commandStackService;
  }
  massChangeNames(oldValue, newValue, type) {
    const allRelevantObjects = [];
    this.elementRegistryService.getAllCanvasObjects().forEach(element => {
      if (element.type.includes(type) && element.businessObject.name === oldValue) {
        allRelevantObjects.push(element);
      }
    });
    const context = {
      elements: allRelevantObjects,
      newValue
    };
    this.commandStackService.execute('domainStoryObjects.massRename', context);
  }
  static #_ = this.ɵfac = function MassNamingService_Factory(t) {
    return new (t || MassNamingService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_0__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_1__.CommandStackService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: MassNamingService,
    factory: MassNamingService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 33666:
/*!********************************************************!*\
  !*** ./src/app/Service/Modeler/initializer.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitializerService: () => (/* binding */ InitializerService)
/* harmony export */ });
/* harmony import */ var _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Common/elementTypes */ 30236);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _Domain_Dialog_activityDialogData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Dialog/activityDialogData */ 93703);
/* harmony import */ var _Presentation_Dialog_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Presentation/Dialog/activity-dialog/activity-dialog.component */ 63954);
/* harmony import */ var _Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/mathExtensions */ 114);
/* harmony import */ var _BPMN_JS_modeler_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../BPMN-JS/modeler/context-pad/domainStoryContextPadProvider */ 48640);
/* harmony import */ var _BPMN_JS_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../BPMN-JS/modeler/updateHandler/activityUpdateHandlers */ 47379);
/* harmony import */ var _BPMN_JS_modeler_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../BPMN-JS/modeler/updateHandler/elementUpdateHandler */ 82189);
/* harmony import */ var _BPMN_JS_modeler_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../BPMN-JS/modeler/updateHandler/headlineAndDescriptionUpdateHandler */ 33524);
/* harmony import */ var _BPMN_JS_modeler_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../BPMN-JS/modeler/palette/domainStoryPalette */ 97774);
/* harmony import */ var _BPMN_JS_modeler_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../BPMN-JS/modeler/domainStoryRenderer */ 10282);
/* harmony import */ var _BPMN_JS_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../BPMN-JS/modeler/labeling/dsLabelEditingProvider */ 48153);
/* harmony import */ var _BPMN_JS_modeler_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../BPMN-JS/modeler/change-icon/replaceOptions */ 82243);
/* harmony import */ var _BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../BPMN-JS/modeler/numbering/numbering */ 93043);
/* harmony import */ var _BPMN_JS_modeler_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../BPMN-JS/modeler/updateHandler/massRenameHandler */ 68558);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../DirtyFlag/dirty-flag.service */ 89791);
/* harmony import */ var _IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var _ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var _LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../LabelDictionary/label-dictionary.service */ 59783);
/* harmony import */ var _Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../Replay/replay-state.service */ 67820);
/* harmony import */ var _Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../Dialog/dialog.service */ 4730);
/* harmony import */ var _CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../CommandStack/command-stack.service */ 19381);
/* harmony import */ var _Title_title_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../Title/title.service */ 69672);
/* harmony import */ var _Export_html_presentation_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../Export/html-presentation.service */ 72680);


























class InitializerService {
  constructor(dirtyFlagService, iconDictionaryService, elementRegistryService, configurationService, labelDictionaryService, replayStateService, dialogService, commandStackService, titleService, htmlPresentationService) {
    this.dirtyFlagService = dirtyFlagService;
    this.iconDictionaryService = iconDictionaryService;
    this.elementRegistryService = elementRegistryService;
    this.configurationService = configurationService;
    this.labelDictionaryService = labelDictionaryService;
    this.replayStateService = replayStateService;
    this.dialogService = dialogService;
    this.commandStackService = commandStackService;
    this.titleService = titleService;
    this.htmlPresentationService = htmlPresentationService;
  }
  initializeDomainStoryModelerClasses() {
    (0,_BPMN_JS_modeler_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_4__.initializeContextPadProvider)(this.dirtyFlagService, this.iconDictionaryService);
    /** The Palette and the Context Menu need the Icons present in the Domain,
     * so the IconDictionaryService and the IconSetConfigurationService needs to be given to the Palette **/
    (0,_BPMN_JS_modeler_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_8__.initializePalette)(this.iconDictionaryService, this.configurationService);
    (0,_BPMN_JS_modeler_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_9__.initializeRenderer)(this.iconDictionaryService, this.elementRegistryService, this.dirtyFlagService);
    (0,_BPMN_JS_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_10__.initializeLabelEditingProvider)(this.labelDictionaryService);
    (0,_BPMN_JS_modeler_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_11__.initializeReplaceOptions)(this.iconDictionaryService);
    (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.initializeNumbering)(this.elementRegistryService);
    (0,_BPMN_JS_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_5__.initializeActivityUpdateHandler)(this.elementRegistryService);
  }
  propagateDomainStoryModelerClassesToServices(commandStack, elementRegistry, canvas, selection, modeler) {
    this.commandStackService.setCommandStack(commandStack);
    this.elementRegistryService.setElementRegistry(elementRegistry);
    this.htmlPresentationService.setModelerClasses(canvas, selection, modeler);
  }
  initializeDomainStoryModelerEventHandlers(commandStack, eventBus) {
    (0,_BPMN_JS_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_5__["default"])(commandStack, eventBus);
    (0,_BPMN_JS_modeler_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_13__["default"])(commandStack, eventBus);
    (0,_BPMN_JS_modeler_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_6__["default"])(commandStack, eventBus);
    (0,_BPMN_JS_modeler_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_7__["default"])(commandStack, this.titleService);
  }
  initiateEventBusListeners(eventBus, commandStack) {
    eventBus.on('element.dblclick', e => {
      if (!this.replayStateService.getReplayOn()) {
        const element = e.element;
        if (element.type === _Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) {
          // override the doubleClickListener on activities
          this.activityDoubleClick(element, eventBus, commandStack);
        } else {
          const renderedNumberRegistry = (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.getNumberRegistry)();
          // add a DoubleClickListener to the number on activities
          if (renderedNumberRegistry.length > 1) {
            const allActivities = this.elementRegistryService.getActivitiesFromActors();
            if (allActivities.length > 0) {
              const htmlCanvas = document.getElementById('canvas');
              if (htmlCanvas) {
                const container = htmlCanvas.getElementsByClassName('djs-container');
                const svgElements = container[0].getElementsByTagName('svg');
                const outerSVGElement = svgElements[0];
                const viewport = outerSVGElement.getElementsByClassName('viewport')[0];
                let transform = viewport.getAttribute('transform');
                let transformX = 0;
                let transformY = 0;
                let zoomX = 1;
                let zoomY = 1;
                let nums;
                const clickX = e.originalEvent.offsetX;
                const clickY = e.originalEvent.offsetY;
                // adjust for zoom and panning
                if (transform) {
                  transform = transform.replace('matrix(', '');
                  transform.replace(')', '');
                  nums = transform.split(',');
                  zoomX = parseFloat(nums[0]);
                  zoomY = parseFloat(nums[3]);
                  transformX = parseInt(nums[4], undefined);
                  transformY = parseInt(nums[5], undefined);
                }
                const width = 25 * zoomX;
                const height = 22 * zoomY;
                for (let i = 1; i < renderedNumberRegistry.length; i++) {
                  const currentNum = renderedNumberRegistry[i];
                  if (currentNum) {
                    const tspan = currentNum.getElementsByTagName('tspan')[0];
                    const tx = tspan.getAttribute('x');
                    const ty = tspan.getAttribute('y');
                    const tNumber = parseInt(tspan.innerHTML, undefined);
                    const elementX = Math.floor(tx * zoomX + (transformX - 11 * zoomX));
                    const elementY = Math.floor(ty * zoomY + (transformY - 15 * zoomY));
                    allActivities.forEach(activity => {
                      const activityNumber = activity.businessObject.number;
                      if (activityNumber === tNumber) {
                        if ((0,_Utils_mathExtensions__WEBPACK_IMPORTED_MODULE_3__.positionsMatch)(width, height, elementX, elementY, clickX, clickY)) {
                          this.activityDoubleClick(activity, eventBus, commandStack);
                        }
                      }
                    });
                  }
                }
              }
            }
          }
        }
      }
    });
    // when in replay, do not allow any interaction on the canvas
    eventBus.on(['element.click', 'element.dblclick', 'element.mousedown', 'drag.init', 'canvas.viewbox.changing', 'autoPlace', 'popupMenu.open'], 10000000000, event => {
      if (this.replayStateService.getReplayOn()) {
        event.stopPropagation();
        event.preventDefault();
      }
    });
  }
  /** Overrrides for Canvas Functions **/
  activityDoubleClick(activity, eventBus, commandStack) {
    const source = activity.source;
    // ensure the right number when changing the direction of an activity
    (0,_BPMN_JS_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_10__.toggleStashUse)(false);
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    if (activity.businessObject.number && source && source.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
      config.data = new _Domain_Dialog_activityDialogData__WEBPACK_IMPORTED_MODULE_1__.ActivityDialogData(activity, (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.getMultipleNumberRegistry)()[activity.businessObject.number], true, data => this.saveActivityInputLabel(data, eventBus, commandStack));
    } else if (source && source.type.includes(_Domain_Common_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      config.data = new _Domain_Dialog_activityDialogData__WEBPACK_IMPORTED_MODULE_1__.ActivityDialogData(activity, false, false, activityData => this.saveActivityInputLabel(activityData, eventBus, commandStack));
    }
    this.dialogService.openDialog(_Presentation_Dialog_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_2__.ActivityDialogComponent, config);
  }
  saveActivityInputLabel(activityData, eventBus, commandStack) {
    const label = activityData.activityLabel;
    const hasNumber = activityData.activityNumber ?? false;
    const activityNumber = activityData.activityNumber;
    const multipleNumberAllowed = activityData.multipleNumbers ?? false;
    const element = activityData.activity;
    const activitiesFromActors = this.elementRegistryService.getActivitiesFromActors();
    const index = activitiesFromActors.indexOf(element);
    activitiesFromActors.splice(index, 1);
    if (hasNumber) {
      (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.setNumberIsMultiple)(activityNumber, multipleNumberAllowed);
    }
    element.businessObject.multipleNumberAllowed = multipleNumberAllowed;
    let options;
    if (hasNumber) {
      options = {
        businessObject: element.businessObject,
        newLabel: label,
        newNumber: activityNumber,
        element
      };
    } else {
      options = {
        businessObject: element.businessObject,
        newLabel: label,
        element
      };
    }
    commandStack.execute('activity.changed', options);
    if (element.businessObject.multipleNumberAllowed !== false) {
      if ((0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.getMultipleNumberRegistry)()[activityNumber] === false) {
        (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, eventBus);
      }
    } else if (element.businessObject.multipleNumberAllowed === false) {
      (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_12__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, eventBus);
    }
  }
  static #_ = this.ɵfac = function InitializerService_Factory(t) {
    return new (t || InitializerService)(_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_14__.DirtyFlagService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_15__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_16__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_17__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_18__.LabelDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_19__.ReplayStateService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_Dialog_dialog_service__WEBPACK_IMPORTED_MODULE_20__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_21__.CommandStackService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_Title_title_service__WEBPACK_IMPORTED_MODULE_22__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinject"](_Export_html_presentation_service__WEBPACK_IMPORTED_MODULE_23__.HtmlPresentationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineInjectable"]({
    token: InitializerService,
    factory: InitializerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 74676:
/*!****************************************************!*\
  !*** ./src/app/Service/Modeler/modeler.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelerService: () => (/* binding */ ModelerService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_BPMN_JS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/BPMN-JS */ 64225);
/* harmony import */ var _BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../BPMN-JS/modeler/numbering/numbering */ 93043);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _initializer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initializer.service */ 33666);
/* harmony import */ var _ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var _IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var _IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var _BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BrowserStorage/storage.service */ 59298);










class ModelerService {
  constructor(initializerService, elementRegistryService, iconDictionaryService, iconSetConfigurationService, storageService) {
    this.initializerService = initializerService;
    this.elementRegistryService = elementRegistryService;
    this.iconDictionaryService = iconDictionaryService;
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.storageService = storageService;
  }
  postInit() {
    const storedIconSetConfiguration = this.storageService.getStoredIconSetConfiguration();
    if (storedIconSetConfiguration) {
      this.iconDictionaryService.setCustomConfiguration(storedIconSetConfiguration);
      this.iconSetConfigurationService.loadConfiguration(storedIconSetConfiguration);
    }
    this.initializerService.initializeDomainStoryModelerClasses();
    this.modeler = new src_app_BPMN_JS__WEBPACK_IMPORTED_MODULE_1__["default"]({
      container: '#canvas',
      keyboard: {
        bindTo: document
      },
      // Disable BPMN-SearchModule and re-enable browser Search
      additionalModules: [{
        bpmnSearch: ['value', 'foo']
      }]
    });
    if (this.modeler.get) {
      this.canvas = this.modeler.get('canvas');
      this.elementRegistry = this.modeler.get('elementRegistry');
      this.eventBus = this.modeler.get('eventBus');
      this.commandStack = this.modeler.get('commandStack');
      this.selection = this.modeler.get('selection');
    }
    this.initializerService.initializeDomainStoryModelerEventHandlers(this.commandStack, this.eventBus);
    this.initializerService.propagateDomainStoryModelerClassesToServices(this.commandStack, this.elementRegistry, this.canvas, this.selection, this.modeler);
    const exportArtifacts = this.debounce(this.saveSVG, 500);
    if (this.modeler.get) {
      this.modeler.on('commandStack.changed', exportArtifacts);
    }
    this.initializerService.initiateEventBusListeners(this.eventBus, this.commandStack);
    this.modeler.createDiagram();
    // expose bpmnjs to window for debugging purposes
    (0,min_dash__WEBPACK_IMPORTED_MODULE_8__.assign)(window, {
      bpmnjs: this.modeler
    });
    this.startDebounce();
  }
  restart(iconSetConfiguration, domainStory) {
    const currentStory = domainStory != undefined ? domainStory : this.elementRegistryService.createObjectListForDSTDownload().map(e => e.businessObject);
    if (!iconSetConfiguration) {
      iconSetConfiguration = this.storageService.getStoredIconSetConfiguration();
    }
    if (iconSetConfiguration) {
      this.storageService.setStoredIconSetConfiguration(iconSetConfiguration);
      this.iconDictionaryService.setCustomConfiguration(iconSetConfiguration);
      this.iconSetConfigurationService.loadConfiguration(iconSetConfiguration);
    }
    this.elementRegistryService.clear();
    this.modeler?.destroy();
    this.postInit();
    (0,_BPMN_JS_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_2__.updateMultipleNumberRegistry)(currentStory.filter(bo => bo.type === 'domainStory:activity').map(bo => bo).filter(bo => bo.number !== null));
    if (currentStory && this.modeler.get) {
      this.modeler.importCustomElements(currentStory);
    }
  }
  /** Interactions with the Modeler **/
  getModeler() {
    return this.modeler;
  }
  commandStackChanged() {
    // to update the title of the svg, we need to tell the command stack, that a value has changed
    this.eventBus.fire('commandStack.changed', this.debounce(this.saveSVG, 500));
  }
  startDebounce() {
    this.debounce(this.saveSVG, 500);
  }
  debounce(fn, timeout) {
    return () => {
      let timer;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // tslint:disable-next-line:no-unused-expression
        fn(this.modeler).then(svg => {
          this.encoded = svg;
        });
      }, timeout);
    };
  }
  getEncoded() {
    return this.encoded ? this.encoded : '';
  }
  saveSVG(modeler) {
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const result = yield modeler.saveSVG();
        return result.svg;
      } catch (err) {
        alert('There was an error saving the SVG.\n' + err);
      }
    })();
  }
  static #_ = this.ɵfac = function ModelerService_Factory(t) {
    return new (t || ModelerService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_initializer_service__WEBPACK_IMPORTED_MODULE_3__.InitializerService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_4__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_6__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_BrowserStorage_storage_service__WEBPACK_IMPORTED_MODULE_7__.StorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
    token: ModelerService,
    factory: ModelerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 94896:
/*!******************************************************!*\
  !*** ./src/app/Service/Renderer/renderer.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RendererService: () => (/* binding */ RendererService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Service/Modeler/modeler.service */ 74676);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var src_app_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/DirtyFlag/dirty-flag.service */ 89791);




class RendererService {
  constructor(modelerService, elementRegistryService, dirtyFlagService) {
    this.modelerService = modelerService;
    this.elementRegistryService = elementRegistryService;
    this.dirtyFlagService = dirtyFlagService;
  }
  renderStory(domainStory) {
    this.modelerService.getModeler().importCustomElements(domainStory);
  }
  reset() {
    this.renderStory([]);
  }
  importStory(domainStory, configurationChange, config, makeClean = true) {
    this.modelerService.restart(config, domainStory);
    this.renderStory(domainStory);
    this.elementRegistryService.correctInitialize();
    this.modelerService.commandStackChanged();
    this.modelerService.startDebounce();
    if (makeClean) {
      this.dirtyFlagService.makeClean();
    }
  }
  getStory() {
    return this.elementRegistryService.createObjectListForDSTDownload().map(c => c.businessObject);
  }
  static #_ = this.ɵfac = function RendererService_Factory(t) {
    return new (t || RendererService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_0__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_Service_DirtyFlag_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__.DirtyFlagService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: RendererService,
    factory: RendererService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 67820:
/*!********************************************************!*\
  !*** ./src/app/Service/Replay/replay-state.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplayStateService: () => (/* binding */ ReplayStateService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


class ReplayStateService {
  constructor() {
    this.replayOnSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.replayOn$ = this.replayOnSubject.asObservable();
  }
  setReplayState(state) {
    this.replayOnSubject.next(state);
  }
  getReplayOn() {
    return this.replayOnSubject.value;
  }
  static #_ = this.ɵfac = function ReplayStateService_Factory(t) {
    return new (t || ReplayStateService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ReplayStateService,
    factory: ReplayStateService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 94788:
/*!**************************************************!*\
  !*** ./src/app/Service/Replay/replay.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplayService: () => (/* binding */ ReplayService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/Replay/replay-state.service */ 67820);
/* harmony import */ var src_app_Service_DomManipulation_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/DomManipulation/dom-manipulation.service */ 63149);
/* harmony import */ var _storyCreator_story_creator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storyCreator/story-creator.service */ 24127);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);







class ReplayService {
  constructor(replayStateService, domManipulationService, storyCreatorService, snackbar) {
    this.replayStateService = replayStateService;
    this.domManipulationService = domManipulationService;
    this.storyCreatorService = storyCreatorService;
    this.snackbar = snackbar;
    this.story = [];
    this.currentSentence = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(-1);
    this.maxSentenceNumber = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(0);
    this.currentSentence$ = this.currentSentence.asObservable();
    this.maxSentenceNumber$ = this.maxSentenceNumber.asObservable();
  }
  isReplayable() {
    return this.storyCreatorService.traceActivitiesAndCreateStory().length > 0;
  }
  initializeReplay() {
    this.currentSentence.next(1);
    this.story = this.storyCreatorService.traceActivitiesAndCreateStory();
    this.maxSentenceNumber.next(this.story.length);
  }
  getCurrentSentenceNumber() {
    return this.currentSentence.value;
  }
  getMaxSentenceNumber() {
    return this.maxSentenceNumber.value;
  }
  nextSentence() {
    if (this.currentSentence.value < this.story.length) {
      this.currentSentence.next(this.currentSentence.value + 1);
      this.showCurrentSentence();
    }
  }
  previousSentence() {
    if (this.currentSentence.value > 1) {
      this.currentSentence.next(this.currentSentence.value - 1);
      this.showCurrentSentence();
    }
  }
  showCurrentSentence() {
    this.domManipulationService.showSentence(this.story[this.currentSentence.value - 1], this.currentSentence.value > 1 ? this.story[this.currentSentence.value - 2] : undefined);
  }
  startReplay() {
    this.initializeReplay();
    if (this.story.length > 0) {
      const missingSentences = this.storyCreatorService.getMissingSentences(this.story);
      if (missingSentences.length === 0) {
        this.replayStateService.setReplayState(true);
        this.domManipulationService.showSentence(this.story[this.currentSentence.getValue() - 1]);
      } else {
        const sentence = missingSentences.join(', ');
        this.snackbar.open(missingSentences.length === 1 ? `The Domain Story is not complete. Sentence ${sentence} is missing.` : `The Domain Story is not complete. Sentences ${sentence} are missing.`, undefined, {
          duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION * 2,
          panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
        });
      }
    } else {
      this.snackbar.open('You need a Domain Story for replay.', undefined, {
        duration: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION * 2,
        panelClass: _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
      });
    }
  }
  stopReplay() {
    this.currentSentence.next(-1);
    this.maxSentenceNumber.next(0);
    this.replayStateService.setReplayState(false);
    this.domManipulationService.showAll();
  }
  static #_ = this.ɵfac = function ReplayService_Factory(t) {
    return new (t || ReplayService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](src_app_Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_1__.ReplayStateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](src_app_Service_DomManipulation_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_2__.DomManipulationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_storyCreator_story_creator_service__WEBPACK_IMPORTED_MODULE_3__.StoryCreatorService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: ReplayService,
    factory: ReplayService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 24127:
/*!**********************************************************************!*\
  !*** ./src/app/Service/Replay/storyCreator/story-creator.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryCreatorService: () => (/* binding */ StoryCreatorService)
/* harmony export */ });
/* harmony import */ var _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Domain/Common/dictionary/dictionary */ 54972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ElementRegistry/element-registry.service */ 67613);



class StoryCreatorService {
  constructor(elementRegistryService) {
    this.elementRegistryService = elementRegistryService;
  }
  traceActivitiesAndCreateStory() {
    const tracedActivityMap = new _Domain_Common_dictionary_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const story = [];
    const activities = this.elementRegistryService.getActivitiesFromActors();
    const tracedActivityMapKeys = [];
    activities.forEach(activity => {
      const activityNumber = Number(activity.businessObject.number); // Sometimes the activityNumber is a string for some reason
      const tracedItem = tracedActivityMap.get(`${activityNumber}`) ?? [];
      if (!tracedActivityMapKeys.includes(activityNumber)) {
        tracedActivityMapKeys.push(activityNumber);
      }
      tracedItem.push(activity);
      tracedActivityMap.set(`${activityNumber}`, tracedItem);
    });
    let storyIndex = 0;
    tracedActivityMapKeys.forEach(key => {
      this.createSentence(tracedActivityMap, key, story, storyIndex);
      storyIndex++;
    });
    this.addGroupsToLastSentence(story);
    return story;
  }
  createSentence(tracedActivityMap, tracedActivityMapKey, story, storyIndex) {
    let tracedActivity = tracedActivityMap.get(`${tracedActivityMapKey}`) ?? [];
    const sentenceObjects = this.getSentenceObjects(tracedActivity);
    const highlightedElements = sentenceObjects.map(t => t.id);
    if (storyIndex > 0) {
      story[storyIndex - 1].objects.forEach(object => {
        if (!sentenceObjects.includes(object)) {
          sentenceObjects.push(object);
        }
      });
    }
    story[storyIndex] = {
      highlightedObjects: highlightedElements,
      objects: sentenceObjects
    };
  }
  getMissingSentences(story) {
    // if the story is empty, no sequence number is missing
    if (!story || story.length === 0) {
      return [];
    }
    // collect all sequence numbers of the story
    const allActivityNumbersFromActors = story.map(sentence => {
      // find all activity numbers of the ActivityBusinessObject
      // and returned the highest one
      const allActivityNumbers = sentence.objects.map(businessObject => {
        if (businessObject.type.includes('activity')) {
          const activity = businessObject;
          return activity.number ?? 0;
        } else {
          return 0;
        }
      });
      return Math.max(...allActivityNumbers);
    });
    const highestSequenceNumber = Math.max(...allActivityNumbersFromActors);
    const missingSentences = [];
    // with a high sequence number like 1_000_000, this could be led
    // to long calculation or completely stop from Egon.io
    for (let i = 1; i <= highestSequenceNumber; i++) {
      if (!allActivityNumbersFromActors.includes(i)) {
        missingSentences.push(i);
      }
    }
    return missingSentences;
  }
  getSentenceObjects(tracedActivity) {
    const initialSource = [];
    const activities = tracedActivity;
    const targetObjects = [];
    tracedActivity.forEach(parallelSentence => {
      initialSource.push(parallelSentence.source);
      const firstTarget = parallelSentence.target;
      targetObjects.push(firstTarget);
      // check the outgoing activities for each target
      for (const checkTarget of targetObjects) {
        if (checkTarget.businessObject && !checkTarget.businessObject.type.includes('actor') && checkTarget.outgoing) {
          // check the target for each outgoing activity
          checkTarget.outgoing.forEach(activity => {
            activities.push(activity);
            const activityTarget = activity.target;
            if (activityTarget && !targetObjects.includes(activityTarget)) {
              targetObjects.push(activityTarget);
            }
          });
        }
      }
    });
    return initialSource.map(e => e.businessObject).concat(activities.map(a => a.businessObject)).concat(targetObjects.map(t => t.businessObject));
  }
  addGroupsToLastSentence(story) {
    const groups = this.elementRegistryService.getAllGroups();
    if (groups.length > 0 && story.length > 0) {
      story[story.length - 1].objects = story[story.length - 1].objects.concat(groups.map(g => g.businessObject));
    }
  }
  static #_ = this.ɵfac = function StoryCreatorService_Factory(t) {
    return new (t || StoryCreatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: StoryCreatorService,
    factory: StoryCreatorService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 58124:
/*!******************************************************!*\
  !*** ./src/app/Service/Settings/settings.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsService: () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);


class SettingsService {
  constructor() {
    this.showSettings = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.showSettings$ = this.showSettings.asObservable();
  }
  close() {
    this.showSettings.next(false);
  }
  open() {
    this.showSettings.next(true);
  }
  static #_ = this.ɵfac = function SettingsService_Factory(t) {
    return new (t || SettingsService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SettingsService,
    factory: SettingsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 69672:
/*!************************************************!*\
  !*** ./src/app/Service/Title/title.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleService: () => (/* binding */ TitleService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 45312);
/* harmony import */ var _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domain/Common/constants */ 90816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommandStack/command-stack.service */ 19381);





class TitleService {
  constructor(commandStackService) {
    this.commandStackService = commandStackService;
    this.titleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE);
    this.descriptionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION);
    this.iconSetNameSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_ICON_SET_NAME);
    this.showDescriptionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(true);
    this.title$ = this.titleSubject.asObservable();
    this.description$ = this.descriptionSubject.asObservable();
    this.showDescription$ = this.showDescriptionSubject.asObservable();
    this.iconSetName$ = this.iconSetNameSubject.asObservable();
  }
  updateTitleAndDescription(title, description, allowUndo) {
    if (allowUndo) {
      this.fireTitleAndDescriptionUpdate(title, description);
    } else {
      this.updateTitle(title);
      this.updateDescription(description);
    }
  }
  reset() {
    this.updateTitleAndDescription(_Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE, _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION, false);
  }
  updateTitle(inputTitle) {
    const title = !inputTitle || inputTitle.trim().length === 0 ? _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE : inputTitle;
    this.titleSubject.next(title);
    document.title = title === _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE ? 'egon.io' : title;
  }
  updateDescription(description) {
    this.descriptionSubject.next(description ?? this.descriptionSubject.value);
  }
  setShowDescription(show) {
    this.showDescriptionSubject.next(show);
  }
  setIconSetName(name) {
    this.iconSetNameSubject.next(name);
  }
  getTitle() {
    return this.titleSubject.value;
  }
  getDescription() {
    return this.descriptionSubject.value;
  }
  getIconSetName() {
    return this.iconSetNameSubject.value;
  }
  getVersion() {
    return _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.version;
  }
  hasTitleOrDescription() {
    return this.getTitle().trim().length > 0 && this.getTitle() !== _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE || this.getDescription().trim().length > 0 && this.getDescription() !== _Domain_Common_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION;
  }
  fireTitleAndDescriptionUpdate(newTitle, newDescription) {
    const context = {
      newTitle,
      newDescription
    };
    this.commandStackService.execute('story.updateHeadlineAndDescription', context);
  }
  static #_ = this.ɵfac = function TitleService_Factory(t) {
    return new (t || TitleService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_CommandStack_command_stack_service__WEBPACK_IMPORTED_MODULE_2__.CommandStackService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: TitleService,
    factory: TitleService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 114:
/*!*****************************************!*\
  !*** ./src/app/Utils/mathExtensions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Point: () => (/* binding */ Point),
/* harmony export */   angleBetween: () => (/* binding */ angleBetween),
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   positionsMatch: () => (/* binding */ positionsMatch)
/* harmony export */ });


// convert rad to deg
function degrees(radians) {
  return radians * 180 / Math.PI;
}
// calculate the angle between two points in 2D
function angleBetween(startPoint, endPoint) {
  let quadrant;
  // determine in which quadrant we are
  if (startPoint.x <= endPoint.x) {
    if (startPoint.y >= endPoint.y) {
      quadrant = 0;
    } // upper right quadrant
    else {
      quadrant = 3;
    } // lower right quadrant
  } else {
    if (startPoint.y >= endPoint.y) {
      quadrant = 1;
    } // upper left Quadrant
    else {
      quadrant = 2;
    } // lower left quadrant
  }

  const adjacent = Math.abs(startPoint.y - endPoint.y);
  const opposite = Math.abs(startPoint.x - endPoint.x);
  // since the arcus-tangens only gives values between 0 and 90, we have to adjust for the quadrant we are in
  if (quadrant === 0) {
    return 90 - degrees(Math.atan2(opposite, adjacent));
  }
  if (quadrant === 1) {
    return 90 + degrees(Math.atan2(opposite, adjacent));
  }
  if (quadrant === 2) {
    return 270 - degrees(Math.atan2(opposite, adjacent));
  }
  if (quadrant === 3) {
    return 270 + degrees(Math.atan2(opposite, adjacent));
  }
  return undefined;
}
function positionsMatch(width, height, elementX, elementY, clickX, clickY) {
  if (clickX > elementX && clickX < elementX + width) {
    if (clickY > elementY && clickY < elementY + height) {
      return true;
    }
  }
  return false;
}
class Point {
  constructor() {
    this.y = 0;
    this.x = 0;
  }
}

/***/ }),

/***/ 66107:
/*!************************************!*\
  !*** ./src/app/Utils/sanitizer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   restoreTitleFromFileName: () => (/* binding */ restoreTitleFromFileName),
/* harmony export */   sanitizeForDesktop: () => (/* binding */ sanitizeForDesktop),
/* harmony export */   sanitizeIconName: () => (/* binding */ sanitizeIconName)
/* harmony export */ });


// sanitize user-Input to be Desktop-Filename safe
function sanitizeForDesktop(str) {
  const map = {
    '/': '',
    '\\': '',
    ':': '',
    '*': '',
    '?': '',
    '"': '',
    '<': '',
    '>': '',
    '|': ''
  };
  const reg = /[/\\:*?"<>|]/gi;
  return str ? str.replace(reg, match => map[match]) : '';
}
function sanitizeIconName(name) {
  const map = {
    '/': '',
    '\\': '',
    ':': '',
    '*': '',
    '?': '',
    '"': '',
    '<': '',
    '>': '',
    '|': '',
    '(': '',
    ')': '',
    ' ': '-',
    '.': '_'
  };
  const reg = /[/\\:*?"<>|() .]/gi;
  return name ? name.replace(reg, match => {
    return map[match];
  }) : '';
}
function restoreTitleFromFileName(filename, isSVG) {
  let title;
  const domainStoryRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(.dst|.egn)/;
  const svgRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(.dst|.egn).svg/;
  const egnSuffix = '.egn';
  const dstSuffix = '.dst';
  const svgSuffix = '.svg';
  let filenameWithoutDateSuffix = filename.replace(isSVG ? svgRegex : domainStoryRegex, '');
  if (filenameWithoutDateSuffix.includes(isSVG ? svgSuffix : dstSuffix)) {
    filenameWithoutDateSuffix = filenameWithoutDateSuffix.replace(svgSuffix, '').replace(dstSuffix, '').replace(egnSuffix, '');
  }
  title = filenameWithoutDateSuffix;
  return title;
}

/***/ }),

/***/ 20092:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-color-picker */ 32580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/Settings/settings.service */ 58124);
/* harmony import */ var _Service_Title_title_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Service/Title/title.service */ 69672);
/* harmony import */ var _Service_Export_export_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Service/Export/export.service */ 98106);
/* harmony import */ var _Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Service/Replay/replay-state.service */ 67820);
/* harmony import */ var _Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Service/Replay/replay.service */ 94788);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var src_app_Presentation_Header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Presentation/Header/header.component */ 91729);
/* harmony import */ var src_app_Presentation_Settings_settings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Presentation/Settings/settings.component */ 1261);
/* harmony import */ var src_app_Presentation_Canvas_modeler_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Presentation/Canvas/modeler.component */ 29383);














function AppComponent_app_settings_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-settings");
  }
}
class AppComponent {
  constructor(settingsService, titleService, exportService, replayStateService, replayService) {
    this.settingsService = settingsService;
    this.titleService = titleService;
    this.exportService = exportService;
    this.replayStateService = replayStateService;
    this.version = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.version;
    this.color = '#000000';
    this.skipNextColorUpdate = false;
    // define preset colors that have good contrast on white background and are compatible to EventStorming notation
    this.colorBox = ['#FDD835',
    // yellow
    '#FB8C00',
    // orange
    '#D32F2F',
    // red
    '#F48FB1',
    // light pink
    '#EC407A',
    // dark pink
    '#8E24AA',
    // purple
    '#1E88E5',
    // blue
    '#00ACC1',
    // cyan
    '#43A047',
    // green
    '#C0CA33',
    // lime
    '#9E9E9E',
    // grey
    '#000000' // black
    ];

    this.showSettings$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false);
    this.showDescription$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(true);
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        if (this.exportService.isDomainStoryExportable()) {
          this.exportService.downloadDST();
        }
      }
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('import')?.click();
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && this.replayStateService.getReplayOn()) {
        e.preventDefault();
        e.stopPropagation();
        replayService.nextSentence();
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && this.replayStateService.getReplayOn()) {
        e.preventDefault();
        e.stopPropagation();
        replayService.previousSentence();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.skipNextColorUpdate = true;
        this.colorPicker.closeDialog();
      }
    });
  }
  ngOnInit() {
    this.showDescription$ = this.titleService.showDescription$;
    this.showSettings$ = this.settingsService.showSettings$;
    document.addEventListener('defaultColor', event => {
      const customEvent = event;
      this.color = customEvent.detail.color;
    });
    document.addEventListener('openColorPicker', () => {
      this.colorPicker.openDialog();
    });
  }
  onColorChanged(color) {
    if (this.skipNextColorUpdate) {
      this.skipNextColorUpdate = false;
      return;
    }
    document.dispatchEvent(new CustomEvent('pickedColor', {
      detail: {
        color: color
      }
    }));
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_Service_Settings_settings_service__WEBPACK_IMPORTED_MODULE_1__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_2__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_Service_Export_export_service__WEBPACK_IMPORTED_MODULE_3__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_Service_Replay_replay_state_service__WEBPACK_IMPORTED_MODULE_4__.ReplayStateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_5__.ReplayService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    viewQuery: function AppComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](ngx_color_picker__WEBPACK_IMPORTED_MODULE_11__.ColorPickerDirective, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.colorPicker = _t.first);
      }
    },
    decls: 36,
    vars: 40,
    consts: [["role", "main", 1, "content"], ["id", "colorPicker", 2, "display", "none", "height", "0", 3, "colorPickerChange", "colorPickerClose", "cpPresetColors", "colorPicker"], [4, "ngIf"], ["src", "./favicon.ico", "height", "24", "alt", "Egon Logo"], ["href", "https://egon.io", "target", "_blank"], ["href", "https://egon.io/changelog", "target", "_blank"], ["src", "./assets/logo/wps-icon.ico", "height", "24", "alt", "WPS Logo"], ["href", "https://www.wps.de/", "target", "_blank"], ["href", "https://www.wps.de/datenschutz/", "target", "_blank"], ["href", "https://www.wps.de/impressum/", "target", "_blank"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtwoWayListener"]("colorPickerChange", function AppComponent_Template_input_colorPickerChange_1_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtwoWayBindingSet"](ctx.color, $event) || (ctx.color = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("colorPickerClose", function AppComponent_Template_input_colorPickerClose_1_listener($event) {
          return ctx.onColorChanged($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, AppComponent_app_settings_2_Template, 1, 0, "app-settings", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "app-modeler");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](18, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, " egon.io");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, "version: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](27, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "WPS");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "span")(31, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](32, "Privacy");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "span")(34, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](35, "Imprint");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("background", ctx.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("cpPresetColors", ctx.colorBox);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtwoWayProperty"]("colorPicker", ctx.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 20, ctx.showSettings$));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("headerAndCanvas", !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 22, ctx.showSettings$) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 24, ctx.showDescription$))("headerAndCanvasCollapsed", !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 26, ctx.showSettings$) && !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 28, ctx.showDescription$))("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 30, ctx.showSettings$));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("header", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 32, ctx.showDescription$))("headerCollapsed", !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 34, ctx.showDescription$));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("logoContainer", !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](15, 36, ctx.showSettings$))("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 38, ctx.showSettings$));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.version);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_color_picker__WEBPACK_IMPORTED_MODULE_11__.ColorPickerDirective, src_app_Presentation_Header_header_component__WEBPACK_IMPORTED_MODULE_6__.HeaderComponent, src_app_Presentation_Settings_settings_component__WEBPACK_IMPORTED_MODULE_7__.SettingsComponent, src_app_Presentation_Canvas_modeler_component__WEBPACK_IMPORTED_MODULE_8__.ModelerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
    styles: [".content[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n}\n\n\n\n.headerAndCanvas[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.headerAndCanvasCollapsed[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.settings[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: min-content 155px;\n}\n\n\n\n.logoContainer[_ngcontent-%COMP%] {\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  right: 100px;\n  align-items: flex-end;\n}\n.logoContainer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 16px;\n  margin-bottom: 14px;\n  align-items: center;\n}\n\n.hidden[_ngcontent-%COMP%] {\n  height: 1px;\n  width: 1px;\n}\n\n#wrapper[_ngcontent-%COMP%] {\n  padding: 16px;\n  min-height: 100%;\n  height: 100%;\n  box-sizing: border-box; \n\n}\n\n#tab-group[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n#tab-group[_ngcontent-%COMP%]   mat-tab-body[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\n.mat-button-toggle-label-content[_ngcontent-%COMP%] {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n\n .mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: white;\n}\n\nspan[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n\nspan[_ngcontent-%COMP%] {\n  height: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBLHFCQUFBO0FBRUE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EscUNBQUE7QUFBRjs7QUFHQSxtQkFBQTtBQUVBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQURGO0FBR0U7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUEsRUFBQSxNQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxZQUFBO0FBRkY7O0FBTUE7RUFDRSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsK0JBQUE7QUFIRjs7QUFNQTtFQUNFLHVCQUFBO0FBSEY7O0FBTUE7RUFDRSxzQkFBQTtBQUhGOztBQU1BO0VBQ0UsWUFBQTtBQUhGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBoZWFkZXIgYW5kIENhbnZhcyovXG5cbi5oZWFkZXJBbmRDYW52YXMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5oZWFkZXJBbmRDYW52YXNDb2xsYXBzZWQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5zZXR0aW5ncyB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMTU1cHg7XG59XG5cbi8qIExvZ28gQ29udGFpbmVyICovXG5cbi5sb2dvQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAxMDBweDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuXG4gIHNwYW4ge1xuICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4uaGlkZGVuIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiAxcHg7XG59XG5cbiN3cmFwcGVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKm5ldyovXG59XG5cbiN0YWItZ3JvdXAge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiN0YWItZ3JvdXAgbWF0LXRhYi1ib2R5IHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4vLyBNYXRlcmlhbCBEZXNpZ24gT3ZlcnJpZGVzXG4ubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTBwdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWRjLXRleHQtZmllbGQtLWZpbGxlZDpub3QoLm1kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuc3BhbiAqIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuc3BhbiB7XG4gIGhlaWdodDogMjRweDtcbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUEscUJBQUE7QUFFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtBQUFGOztBQUdBLG1CQUFBO0FBRUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FBREY7QUFHRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQURKOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQSxFQUFBLE1BQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7QUFGRjs7QUFNQTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSwrQkFBQTtBQUhGOztBQU1BO0VBQ0UsdUJBQUE7QUFIRjs7QUFNQTtFQUNFLHNCQUFBO0FBSEY7O0FBTUE7RUFDRSxZQUFBO0FBSEY7QUFDQSw0cEZBQTRwRiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBoZWFkZXIgYW5kIENhbnZhcyovXG5cbi5oZWFkZXJBbmRDYW52YXMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5oZWFkZXJBbmRDYW52YXNDb2xsYXBzZWQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5zZXR0aW5ncyB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWluLWNvbnRlbnQgMTU1cHg7XG59XG5cbi8qIExvZ28gQ29udGFpbmVyICovXG5cbi5sb2dvQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAxMDBweDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuXG4gIHNwYW4ge1xuICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4uaGlkZGVuIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiAxcHg7XG59XG5cbiN3cmFwcGVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKm5ldyovXG59XG5cbiN0YWItZ3JvdXAge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiN0YWItZ3JvdXAgbWF0LXRhYi1ib2R5IHtcbiAgZmxleC1ncm93OiAxO1xufVxuXG4vLyBNYXRlcmlhbCBEZXNpZ24gT3ZlcnJpZGVzXG4ubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTBwdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWRjLXRleHQtZmllbGQtLWZpbGxlZDpub3QoLm1kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuc3BhbiAqIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuc3BhbiB7XG4gIGhlaWdodDogMjRweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 50635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser */ 4199);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/platform-browser/animations */ 91244);
/* harmony import */ var src_app_Presentation_Header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Presentation/Header/header.component */ 91729);
/* harmony import */ var src_app_Presentation_Settings_settings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Presentation/Settings/settings.component */ 1261);
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ 20092);
/* harmony import */ var src_app_Service_Export_export_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Service/Export/export.service */ 98106);
/* harmony import */ var src_app_Service_Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Service/Import/import-domain-story.service */ 23779);
/* harmony import */ var src_app_Service_Import_import_repair_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Service/Import/import-repair.service */ 75158);
/* harmony import */ var src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Service/Modeler/modeler.service */ 74676);
/* harmony import */ var src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Service/Title/title.service */ 69672);
/* harmony import */ var src_app_Service_LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Service/LabelDictionary/label-dictionary.service */ 59783);
/* harmony import */ var src_app_Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Service/Replay/replay.service */ 94788);
/* harmony import */ var src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Service/ElementRegistry/element-registry.service */ 67613);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-set-configuration.service */ 10200);
/* harmony import */ var src_app_Service_LabelDictionary_mass_naming_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Service/LabelDictionary/mass-naming.service */ 37509);
/* harmony import */ var src_app_Presentation_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Presentation/Dialog/info-dialog/info-dialog.component */ 16266);
/* harmony import */ var src_app_Presentation_Dialog_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Presentation/Dialog/export-dialog/export-dialog.component */ 97218);
/* harmony import */ var src_app_Presentation_Dialog_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Presentation/Dialog/activity-dialog/activity-dialog.component */ 63954);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var src_app_Presentation_Dialog_header_dialog_header_dialog_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/Presentation/Dialog/header-dialog/header-dialog.component */ 21270);
/* harmony import */ var src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/Service/IconSetConfiguration/icon-dictionary.service */ 93689);
/* harmony import */ var src_app_Presentation_Canvas_modeler_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/Presentation/Canvas/modeler.component */ 29383);
/* harmony import */ var src_app_Modules_settings_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/Modules/settings.module */ 47261);
/* harmony import */ var _Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Service/Autosave/autosave.service */ 30534);
/* harmony import */ var _Modules_domain_story_modeler_module_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Modules/domain-story-modeler-module.module */ 76330);
/* harmony import */ var _Presentation_Dialog_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Presentation/Dialog/label-dictionary-dialog/label-dictionary-dialog.component */ 23958);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./material.module */ 89439);
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-color-picker */ 32580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 96623);































class AppModule {
  constructor(autosaveService) {
    this.autosaveService = autosaveService;
    // autosaveService wird so automatisch initialisiert, auf keinen Fall entfernen!
  }

  ngDoBootstrap(app) {
    const componentElement = document.createElement('app-root');
    document.body.append(componentElement);
    app.bootstrap(src_app_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent);
  }
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_20__.AutosaveService));
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({
    type: AppModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({
    providers: [_Service_Autosave_autosave_service__WEBPACK_IMPORTED_MODULE_20__.AutosaveService, src_app_Service_Export_export_service__WEBPACK_IMPORTED_MODULE_3__.ExportService, src_app_Service_Import_import_domain_story_service__WEBPACK_IMPORTED_MODULE_4__.ImportDomainStoryService, src_app_Service_Import_import_repair_service__WEBPACK_IMPORTED_MODULE_5__.ImportRepairService, src_app_Service_IconSetConfiguration_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_17__.IconDictionaryService, src_app_Service_Title_title_service__WEBPACK_IMPORTED_MODULE_7__.TitleService, src_app_Service_LabelDictionary_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__.LabelDictionaryService, src_app_Service_Replay_replay_service__WEBPACK_IMPORTED_MODULE_9__.ReplayService, src_app_Service_ElementRegistry_element_registry_service__WEBPACK_IMPORTED_MODULE_10__.ElementRegistryService, src_app_Service_IconSetConfiguration_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_11__.IconSetConfigurationService, src_app_Service_Modeler_modeler_service__WEBPACK_IMPORTED_MODULE_6__.ModelerService, src_app_Service_LabelDictionary_mass_naming_service__WEBPACK_IMPORTED_MODULE_12__.MassNamingService, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.UntypedFormBuilder, {
      provide: _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_26__.MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: {
        clickAction: 'noop'
      }
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__.NoopAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule, src_app_Modules_settings_module__WEBPACK_IMPORTED_MODULE_19__.SettingsModule, _Modules_domain_story_modeler_module_module__WEBPACK_IMPORTED_MODULE_21__.DomainStoryModelerModuleModule, _material_module__WEBPACK_IMPORTED_MODULE_23__.MaterialModule, ngx_color_picker__WEBPACK_IMPORTED_MODULE_29__.ColorPickerModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [src_app_Presentation_Header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, src_app_Presentation_Settings_settings_component__WEBPACK_IMPORTED_MODULE_1__.SettingsComponent, src_app_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent, src_app_Presentation_Dialog_info_dialog_info_dialog_component__WEBPACK_IMPORTED_MODULE_13__.InfoDialogComponent, src_app_Presentation_Dialog_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_14__.ExportDialogComponent, src_app_Presentation_Dialog_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_15__.ActivityDialogComponent, src_app_Presentation_Dialog_header_dialog_header_dialog_component__WEBPACK_IMPORTED_MODULE_16__.HeaderDialogComponent, src_app_Presentation_Canvas_modeler_component__WEBPACK_IMPORTED_MODULE_18__.ModelerComponent, _Presentation_Dialog_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_22__.LabelDictionaryDialogComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__.NoopAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule, src_app_Modules_settings_module__WEBPACK_IMPORTED_MODULE_19__.SettingsModule, _Modules_domain_story_modeler_module_module__WEBPACK_IMPORTED_MODULE_21__.DomainStoryModelerModuleModule, _material_module__WEBPACK_IMPORTED_MODULE_23__.MaterialModule, ngx_color_picker__WEBPACK_IMPORTED_MODULE_29__.ColorPickerModule]
  });
})();

/***/ }),

/***/ 89439:
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaterialModule: () => (/* binding */ MaterialModule)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/expansion */ 3695);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 34294);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/grid-list */ 84533);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button-toggle */ 68529);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);













class MaterialModule {
  static #_ = this.ɵfac = function MaterialModule_Factory(t) {
    return new (t || MaterialModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: MaterialModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__.MatButtonToggleModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__.MatGridListModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__.MatButtonToggleModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__.MatGridListModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialModule, {
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__.MatButtonToggleModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__.MatGridListModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule],
    exports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_2__.MatButtonToggleModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__.MatGridListModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule]
  });
})();

/***/ }),

/***/ 45312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration production` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  version: '2.0.0-dev'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 84429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4199);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 50635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 45312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map