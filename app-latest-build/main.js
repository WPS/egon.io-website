"use strict";
(self["webpackChunkegon"] = self["webpackChunkegon"] || []).push([["main"],{

/***/ 97563:
/*!*****************************************************!*\
  !*** ./src/app/tools/export/services/exportUtil.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTitleAndDescriptionSVGElement: () => (/* binding */ createTitleAndDescriptionSVGElement)
/* harmony export */ });
/* harmony import */ var _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/export/exportConstants */ 41646);

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
  return createTextSpans(text, width, ctx, 10, _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.TEXTSPAN_TITLE_HEIGHT, 30);
}
function createDescription(text, width) {
  let description = "";
  let descriptionParts = text.split("<br>");
  let tempCanvas = document.createElement("canvas");
  let ctx = tempCanvas.getContext("2d");
  ctx.font = "12px Arial";
  for (let i = 0; i < descriptionParts.length; i++) {
    description += createTextSpans(descriptionParts[i], width, ctx, 0, _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.TEXTSPAN_DESCRIPTION_HEIGHT, 12);
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
  let textSpan = document.createElementNS(_domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.SVG_LINK, "tspan");
  let textNode = document.createTextNode(words[0]);
  textSpan.setAttribute("x", _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.X_OFFSET_UTIL);
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
        textSpan = document.createElementNS(_domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.SVG_LINK, "tspan");
        textNode = document.createTextNode(words[j]);
        textSpan.setAttribute("x", _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__.X_OFFSET_UTIL);
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

/***/ 96064:
/*!*********************************************!*\
  !*** ./src/app/tools/modeler/bpmn/index.js ***!
  \*********************************************/
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
/* harmony import */ var _modeler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modeler */ 64341);
/* harmony import */ var _modeler_labeling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modeler/labeling */ 2620);
/* harmony import */ var _modeler_modeling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modeler/modeling */ 29061);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);








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
  return element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.ACTIVITY || element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.CONNECTION;
}
function isGroup(element) {
  return element && element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.GROUP;
}

/***/ }),

/***/ 86552:
/*!*******************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/change-icon/replace.js ***!
  \*******************************************************************/
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

/***/ 44970:
/*!*******************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/change-icon/replaceMenuProvider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReplaceMenuProvider)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replace */ 86552);
/* harmony import */ var _replaceOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replaceOptions */ 15916);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ 81410);






/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
function ReplaceMenuProvider(modeling) {
  this._dsReplace = new _replace__WEBPACK_IMPORTED_MODULE_1__["default"](modeling);
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
  if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
    entries = _replaceOptions__WEBPACK_IMPORTED_MODULE_2__.actorReplaceOptions(element.type);
  } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
    entries = _replaceOptions__WEBPACK_IMPORTED_MODULE_2__.workObjectReplaceOptions(element.type);
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
  (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.forEach)(replaceOptions, function (definition) {
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

/***/ 15916:
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/change-icon/replaceOptions.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actorReplaceOptions: () => (/* binding */ actorReplaceOptions),
/* harmony export */   initializeReplaceOptions: () => (/* binding */ initializeReplaceOptions),
/* harmony export */   workObjectReplaceOptions: () => (/* binding */ workObjectReplaceOptions)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);

let iconDictionaryService;
function initializeReplaceOptions(iconDictionary) {
  iconDictionaryService = iconDictionary;
}
function actorReplaceOptions(name) {
  const actorTypes = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
  let replaceOption = {};
  let i = 0;
  actorTypes.keysArray().forEach(actorType => {
    if (!name.includes(actorType)) {
      const typeName = actorType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName.toLowerCase(),
        className: iconDictionaryService.getIconForBPMN(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR, actorType),
        target: {
          type: `${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR}${actorType}`
        }
      };
      i++;
    }
  });
  return replaceOption;
}
function workObjectReplaceOptions(name) {
  const workObjectTypes = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
  let replaceOption = {};
  let i = 0;
  workObjectTypes.keysArray().forEach(workObjectType => {
    if (!name.includes(workObjectType)) {
      const typeName = workObjectType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName,
        className: iconDictionaryService.getIconForBPMN(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, workObjectType),
        target: {
          type: `${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT}${workObjectType}`
        }
      };
    }
    i++;
  });
  return replaceOption;
}

/***/ }),

/***/ 17325:
/*!*****************************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/context-pad/domainStoryContextPadProvider.js ***!
  \*****************************************************************************************/
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
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbering/numbering */ 33862);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../utils/colorConverter */ 99683);








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
    let pickedColor = selectedElement.businessObject.pickedColor;
    if ((0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.isHexWithAlpha)(pickedColor)) {
      pickedColor = (0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.hexToRGBA)(pickedColor);
    }
    document.dispatchEvent(new CustomEvent("defaultColor", {
      detail: {
        color: pickedColor ?? "#000000"
      }
    }));
    let actions = cached(element);
    startConnect = function (event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    };
    if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT)) {
      addColorChange(actions);
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addActors(appendAction, actions);
      addWorkObjects(appendAction, actions);
      addChangeWorkObjectTypeMenu(actions);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR)) {
      addColorChange(actions);
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addWorkObjects(appendAction, actions);
      addChangeActorTypeMenu(actions);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP)) {
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
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY)) {
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
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
      addColorChange(actions);
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
      "append.text-annotation": appendAction(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION, "bpmn-icon-text-annotation", "textannotation", "connect")
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
    let workObjectTypes = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
    workObjectTypes.keysArray().forEach(workObjectType => {
      let name = workObjectType;
      let icon = iconDictionaryService.getIconForBPMN(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, workObjectType);
      let action = [];
      action["append.workObject" + name] = appendAction(`${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT}${workObjectType}`, icon, name, "workObjects");
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(actions, action);
    });
  }
  function addActors(appendAction, actions) {
    let actorTypes = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
    actorTypes.keysArray().forEach(actorType => {
      let name = actorType;
      let icon = iconDictionaryService.getIconForBPMN(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, actorType);
      let action = [];
      action["append.actor" + name] = appendAction(`${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR}${actorType}`, icon, name, "actors");
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
    if (element.source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR)) {
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
    const oldColor = selectedElement.businessObject.pickedColor;
    let newColor = event.detail.color;
    if ((0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.isHexWithAlpha)(oldColor)) {
      newColor = (0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.rgbaToHex)(newColor);
    }
    return {
      businessObject: selectedElement.businessObject,
      newColor: newColor,
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

/***/ 73938:
/*!*************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/domainStoryElementFactory.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryElementFactory)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bpmn-js/lib/util/LabelUtil */ 81454);
/* harmony import */ var _domainStoryIdFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domainStoryIdFactory */ 43331);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);








/**
 * A custom factory that knows how to create BPMN _and_ custom elements.
 */
function DomainStoryElementFactory(bpmnFactory, moddle) {
  bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, bpmnFactory, moddle);
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
      return self.baseCreate(elementType, (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)({
        type: "label"
      }, bpmn_js_lib_util_LabelUtil__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_LABEL_SIZE, attrs));
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
      (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs.businessObject, {
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
          (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs.businessObject, {
            id: value
          });
        }
      };
      if (!attrs.businessObject.$type) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs.businessObject, {
          $type: "Element"
        });
      }
      (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs.businessObject, {
        di: {}
      });
      if (!attrs.businessObject.$descriptor) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs.businessObject, {
          $descriptor: {}
        });
      }
      // add width and height if shape
      if ((!/:activity$/.test(type) || !/:connection$/.test(type)) && !(/:group$/.test(type) && attrs.height || attrs.width)) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_4__.assign)(attrs, self._getCustomElementSize(type));
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
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryElementFactory, bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
    [src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION]: {
      width: 100,
      height: 30
    },
    [src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP]: {
      width: 525,
      height: 275
    }
  };
  return shapes[type] || shapes.__default;
};
class Dimensions {}

/***/ }),

/***/ 43331:
/*!********************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/domainStoryIdFactory.js ***!
  \********************************************************************/
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

/***/ 80215:
/*!*******************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/domainStoryRenderer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRenderer),
/* harmony export */   initializeRenderer: () => (/* binding */ initializeRenderer)
/* harmony export */ });
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/draw/BaseRenderer */ 14694);
/* harmony import */ var ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ids */ 70678);
/* harmony import */ var src_app_tools_modeler_bpmn_modeler_labeling_dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/modeler/bpmn/modeler/labeling/dsLabelEditingPreview */ 91889);
/* harmony import */ var diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! diagram-js/lib/util/RenderUtil */ 96546);
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tiny-svg */ 57491);
/* harmony import */ var min_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! min-dom */ 73599);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_tools_modeler_bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/modeler/bpmn/modeler/labeling/dsLabelEditingProvider */ 46604);
/* harmony import */ var src_app_tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/modeler/bpmn/modeler/numbering/numbering */ 33862);
/* harmony import */ var src_app_tools_modeler_bpmn_modeler_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/modeler/bpmn/modeler/labeling/dsLabelUtil */ 5513);
/* harmony import */ var src_app_tools_modeler_bpmn_modeler_labeling_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/modeler/bpmn/modeler/labeling/position */ 68105);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _utils_mathExtensions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utils/mathExtensions */ 67858);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util */ 44741);

















let RENDERER_IDS = new ids__WEBPACK_IMPORTED_MODULE_1__["default"]();
let numbers = [];
const DEFAULT_COLOR = "#000000";
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
  diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_10__["default"].call(this, eventBus, 2000);
  let rendererId = RENDERER_IDS.next();
  let markers = {};
  let computeStyle = styles.computeStyle;
  // generate the automatic Number for an activity originating from an actor
  function generateActivityNumber(parentGfx, element, box) {
    // whenever we want to edit an activity, it gets redrawn as a new object
    // and the custom information is lost,
    // so we stash it before the editing occurs and set the value here
    let numberStash = (0,src_app_tools_modeler_bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__.getNumberStash)();
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
    (0,src_app_tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.addNumberToRegistry)(newRenderedNumber, semantic.number);
  }
  // style functions
  function numberStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({}, textRenderer.getExternalStyle(), {
        fill: "black",
        position: "absolute"
      })
    };
  }
  function backgroundBoxStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({}, textRenderer.getExternalStyle(), {
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
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({}, textRenderer.getExternalStyle(), {
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
    let lines = (0,src_app_tools_modeler_bpmn_modeler_labeling_position__WEBPACK_IMPORTED_MODULE_6__.countLines)(semantic.name);
    if (element.waypoints != null) {
      let position = (0,src_app_tools_modeler_bpmn_modeler_labeling_position__WEBPACK_IMPORTED_MODULE_6__.labelPosition)(waypoints, lines);
      let startPoint = element.waypoints[position.selected];
      let endPoint = element.waypoints[position.selected + 1];
      let angle = (0,_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_8__.angleBetween)(startPoint, endPoint);
      let alignment = "left";
      let boxWidth = 500;
      let xStart = position.x;
      // if the activity is horizontal, we want to center the label
      if (angle === 0 || angle === 180) {
        boxWidth = Math.abs(startPoint.x - endPoint.x);
        alignment = "center";
        xStart = (startPoint.x + endPoint.x) / 2 - (0,src_app_tools_modeler_bpmn_modeler_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_5__.calculateTextWidth)(semantic.name);
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
          style: (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({}, textRenderer.getExternalStyle(), {
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
      let box = (0,src_app_tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.numberBoxDefinitions)(element);
      if (semantic.number == null && element.source.type && element.source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
        (0,src_app_tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_4__.generateAutomaticNumber)(element, commandStack);
      }
      // render the background for the number
      if (semantic.number && element.source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
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
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.classes)(text).add("djs-labelNumber");
    setCoordinates(type, text, options, height, parentGfx);
    // !IMPORTANT!
    // When converting svg-files via Inkscape or Photoshop the svg-circle is converted to a black dot that obscures the number.
    // To circumvent this, we draw an arc.
    let circle = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("path");
    let radius = 11;
    let x = options.box.x + 18 + (number > 9 ? 3 : 0);
    let y = options.box.y - radius + 7;
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(circle, {
      d: `
      M ${x} ${y}
      m ${radius},0
      a ${radius},${radius} 0 1,0 ${-radius * 2},0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      `,
      fill: "white",
      stroke: "black"
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parentGfx, circle);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parentGfx, text);
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
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.classes)(text).add("djs-label");
    setCoordinates(type, text, options, height, parentGfx);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parentGfx, text);
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
    let rect = drawRect(parentGfx, element.width, element.height, 0, (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({
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
    const match = iconSvg.match(/fill=\s*"(?!none).*?"|fill:\s*[#r]\w*[;\s]{1}/);
    if (match && match.some(it => it)) {
      return iconSvg.replaceAll(/fill=\s*"(?!none).*?"/g, `fill="${pickedColor} "`).replaceAll(/fill:\s*[#r]\w*[;\s]{1}/g, `fill:${pickedColor};`);
    } else {
      const index = iconSvg.indexOf("<svg ") + 5;
      return iconSvg.substring(0, index) + ' fill=" ' + pickedColor + '" ' + iconSvg.substring(index);
    }
  }
  function getIconSvg(icon, element) {
    const pickedColor = element.businessObject.pickedColor;
    if ((0,_util__WEBPACK_IMPORTED_MODULE_9__.isCustomIcon)(icon)) {
      let dataURL;
      if ((0,_util__WEBPACK_IMPORTED_MODULE_9__.isCustomSvgIcon)(icon)) {
        dataURL = applyColorToCustomSvgIcon(pickedColor, icon);
      } else {
        dataURL = icon;
        if (pickedColor && pickedColor !== DEFAULT_COLOR) {
          document.dispatchEvent(new CustomEvent("errorColoringOnlySvg"));
        }
      }
      return '<svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<image width="24" height="24" xlink:href="' + dataURL + '"/></svg>';
    } else {
      return applyColorToIcon(pickedColor, icon);
    }
  }
  this.drawActor = function (parent, element) {
    let svgDynamicSizeAttributes = {
      width: element.width,
      height: element.height
    };
    let iconSRC = _iconDictionaryService.getTypeIconSRC(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    let actor = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(actor, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parent, actor);
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
    let iconSRC = _iconDictionaryService.getTypeIconSRC(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    workObject = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(workObject, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parent, workObject);
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
      let x = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.createLine)(element.waypoints, attrs));
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
      stroke: element.businessObject.pickedColor ?? "black",
      strokeWidth: 1.5,
      strokeLinejoin: "round",
      strokeDasharray: "5, 5"
    });
    return (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.createLine)(element.waypoints, attrs));
  };
  this.drawAnnotation = function (parentGfx, element) {
    let style = {
      fill: "none",
      stroke: "none"
    };
    let text = element.businessObject.text || "";
    if (element.businessObject.text) {
      let height = element.height ?? 0;
      if (height === 0 && element.businessObject.number) {
        height = element.businessObject.number;
      }
      (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)(element, {
        height: height
      });
      // for some reason the keyword height is not exported, so we use another, which we know will be exported,
      // to ensure persistent annotation heights between sessions
      (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)(element.businessObject, {
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
      stroke: element.businessObject.pickedColor ?? "black"
    });
    renderLabel(parentGfx, text, {
      box: element,
      align: "left-top",
      padding: 5,
      style: {
        fill: element.businessObject.pickedColor ?? "black"
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
    let path = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("path");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(path, {
      d: d
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(path, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parentGfx, path);
    return path;
  }
  function drawRect(parentGfx, width, height, r, offset, attrs) {
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_11__.isObject)(offset)) {
      attrs = offset;
      offset = 0;
    }
    offset = offset || 0;
    attrs = computeStyle(attrs, {
      stroke: "black",
      strokeWidth: 2,
      fill: "white"
    });
    let rect = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("rect");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(rect, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(parentGfx, rect);
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
      let sequenceflowEnd = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("path");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(sequenceflowEnd, {
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
    let attrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_11__.assign)({
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
    let marker = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("marker");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(options.element, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(marker, options.element);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.attr)(marker, {
      id: id,
      viewBox: "0 0 20 20",
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: "auto"
    });
    let defs = (0,min_dom__WEBPACK_IMPORTED_MODULE_14__.query)("defs", canvas._svg);
    if (!defs) {
      defs = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.create)("defs");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(canvas._svg, defs);
    }
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_12__.append)(defs, marker);
    markers[id] = marker;
  }
  // path functions
  this.getWorkObjectPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.componentsToPath)(rectangle);
  };
  this.getGroupPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.componentsToPath)(rectangle);
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
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.componentsToPath)(activityPath);
  };
  this.getActorPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_13__.componentsToPath)(rectangle);
  };
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryRenderer, diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_10__["default"]);
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
  if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
    return this.drawActor(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT)) {
    return this.drawWorkObject(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.TEXTANNOTATION)) {
    return this.drawAnnotation(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.GROUP)) {
    return this.drawGroup(p, element);
  }
};
DomainStoryRenderer.prototype.getShapePath = function (shape) {
  let type = shape.type;
  if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTOR)) {
    return this.getActorPath(shape);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.WORKOBJECT)) {
    return this.getWorkObjectPath(shape);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.GROUP)) {
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
  if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTIVITY) {
    return this.drawActivity(p, element);
  } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.CONNECTION) {
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

/***/ 15313:
/*!****************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/domainStoryRules.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRules)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! diagram-js/lib/features/rules/RuleProvider */ 19812);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ 44741);







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
      type: src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.CONNECTION
    };
  }
  return {
    type: src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY
  };
}
function canResize(shape, newBounds) {
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(shape, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.GROUP)) {
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

/***/ 75187:
/*!******************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/domainStoryUpdater.js ***!
  \******************************************************************/
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ 44741);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../domain/entities/elementTypes */ 73190);








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
    if (!shape || !shape.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.DOMAINSTORY)) {
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
    if (shape.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP) {
      (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.assign)(businessObject, (0,min_dash__WEBPACK_IMPORTED_MODULE_5__.pick)(shape, ["height", "width"]));
      // rework the child-parent relations if a group was moved, such that all Objects that are visually in the group are also associated with it
      // since we do not have access to the standard-canvas object here, we cannot use the function correctGroupChildren() from DSLabelUtil
      if (parent != null) {
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.reworkGroupElements)(parent, shape);
      }
    }
    if (shape && shape.parent && "type" in shape.parent && shape.parent.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP) {
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

/***/ 64341:
/*!*****************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domainStoryElementFactory */ 73938);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domainStoryRenderer */ 80215);
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./palette/domainStoryPalette */ 23285);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domainStoryRules */ 15313);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domainStoryUpdater */ 75187);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bpmn-js/lib/draw/PathMap */ 56089);
/* harmony import */ var bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bpmn-js/lib/features/popup-menu */ 30918);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateHandler/updateLabelHandler */ 70670);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateHandler/headlineAndDescriptionUpdateHandler */ 87613);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context-pad/domainStoryContextPadProvider */ 17325);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./change-icon/replaceMenuProvider */ 44970);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modeling/dSModeling */ 81979);


















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

/***/ 91889:
/*!******************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/labeling/dsLabelEditingPreview.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingPreview)
/* harmony export */ });
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-svg */ 57491);
/* harmony import */ var diagram_js_lib_util_SvgTransformUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/util/SvgTransformUtil */ 81384);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ 44741);






const MARKER_HIDDEN = "djs-element-hidden",
  MARKER_LABEL_HIDDEN = "djs-label-hidden";
function DSLabelEditingPreview(eventBus, canvas, pathMap) {
  let self = this;
  let defaultLayer = canvas.getDefaultLayer();
  let element, absoluteElementBBox, gfx;
  eventBus.on("directEditing.activate", function (context) {
    let activeProvider = context.active;
    element = activeProvider.element.label || activeProvider.element;
    // text annotation
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
      absoluteElementBBox = canvas.getAbsoluteBBox(element);
      gfx = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("g");
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
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION) || element.labelTarget) {
      canvas.addMarker(element, MARKER_HIDDEN);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
      canvas.addMarker(element, MARKER_LABEL_HIDDEN);
    }
  });
  eventBus.on("directEditing.resize", function (context) {
    // text annotation
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
      let height = context.height,
        dy = context.dy;
      let newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);
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

/***/ 46604:
/*!*******************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/labeling/dsLabelEditingProvider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingProvider),
/* harmony export */   focusElement: () => (/* binding */ focusElement),
/* harmony export */   getNumberStash: () => (/* binding */ getNumberStash),
/* harmony export */   initializeLabelEditingProvider: () => (/* binding */ initializeLabelEditingProvider),
/* harmony export */   toggleStashUse: () => (/* binding */ toggleStashUse)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsLabelUtil */ 5513);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ 44741);






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
    if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(event.element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY)) {
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
    if (!(0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY)) {
      activateDirectEdit(element);
    }
    let editingBox = document.getElementsByClassName("djs-direct-editing-content");
    focusElement(editingBox.item(0));
  });
  eventBus.on("autoPlace.end", 500, function (event) {
    activateDirectEdit(event.shape);
  });
  function activateDirectEdit(element, force) {
    if (force || element.businessObject.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.DOMAINSTORY)) {
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
  (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(context, bounds);
  let options = {};
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(options, {
      resizable: true,
      autoResize: true
    });
  }
  (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(context, {
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
  // default position
  let bounds = {
    x: bbox.x,
    y: bbox.y
  };
  /** The canvas is an object from bpmn-js. The IDE might say that zoom is deprecated,
   * because it thinks that canvas is the standard HTML element.**/
  let zoom = canvas.zoom();
  let defaultStyle = this._textRenderer.getDefaultStyle();
  // take zoom into account
  let defaultFontSize = defaultStyle.fontSize * zoom,
    defaultLineHeight = defaultStyle.lineHeight;
  let style = {
    fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
    fontWeight: this._textRenderer.getDefaultStyle().fontWeight
  };
  // adjust for groups
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.GROUP)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(bounds, {
      minWidth: bbox.width / 2.5 > 125 ? bbox.width / 2.5 : 125,
      maxWidth: bbox.width,
      minHeight: 30 * zoom,
      x: bbox.x,
      y: bbox.y
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(style, {
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight,
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px",
      textAlign: "left"
    });
  }
  if (
  // we can't use util's is() function here because the type contains the name of the icon
  /^domainStory:actor\w*/.test(element.type) || /^domainStory:workObject\w*/.test(element.type)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(bounds, {
      width: bbox.width,
      minHeight: 30,
      y: bbox.y + bbox.height - 20,
      x: bbox.x
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(style, {
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight,
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px"
    });
  }
  // text annotations
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(bounds, {
      width: bbox.width,
      height: bbox.height,
      minWidth: 30 * zoom,
      minHeight: 10 * zoom
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)(style, {
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
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
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

/***/ 5513:
/*!********************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/labeling/dsLabelUtil.js ***!
  \********************************************************************/
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
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ 44741);




function getLabelAttr(semantic) {
  if (semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
    return "name";
  }
  if (semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
    return "text";
  }
}
function getNumberAttr(semantic) {
  if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.is)(semantic, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY)) {
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
    if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
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
    if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
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

/***/ 2620:
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/labeling/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_change_support__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! diagram-js/lib/features/change-support */ 46242);
/* harmony import */ var diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! diagram-js/lib/features/resize */ 40844);
/* harmony import */ var diagram_js_direct_editing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js-direct-editing */ 32110);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 70670);
/* harmony import */ var _dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dsLabelEditingPreview */ 91889);
/* harmony import */ var _dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dsLabelEditingProvider */ 46604);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modeling/dSModeling */ 81979);










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

/***/ 68105:
/*!*****************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/labeling/position.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countLines: () => (/* binding */ countLines),
/* harmony export */   labelPosition: () => (/* binding */ labelPosition),
/* harmony export */   labelPositionX: () => (/* binding */ labelPositionX),
/* harmony export */   labelPositionY: () => (/* binding */ labelPositionY)
/* harmony export */ });
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsLabelUtil */ 5513);
/* harmony import */ var src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/mathExtensions */ 67858);




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
      angleActivity[i] = (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(waypoints[i], waypoints[i + 1]);
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
  let angle = (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(startPoint, endPoint);
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
  let angle = (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(startPoint, endPoint);
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

/***/ 81979:
/*!*******************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/modeling/dSModeling.js ***!
  \*******************************************************************/
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

/***/ 29061:
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/modeling/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../palette/domainStoryPalette */ 23285);
/* harmony import */ var bpmn_js_lib_features_modeling_ElementFactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/ElementFactory */ 5557);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var bpmn_js_lib_draw_PathMap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bpmn-js/lib/draw/PathMap */ 56089);
/* harmony import */ var bpmn_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bpmn-js/lib/features/popup-menu */ 30918);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 70670);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domainStoryUpdater */ 75187);
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domainStoryElementFactory */ 73938);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../updateHandler/headlineAndDescriptionUpdateHandler */ 87613);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domainStoryRenderer */ 80215);
/* harmony import */ var _dSModeling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dSModeling */ 81979);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../domainStoryRules */ 15313);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../change-icon/replaceMenuProvider */ 44970);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../context-pad/domainStoryContextPadProvider */ 17325);


















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

/***/ 33862:
/*!*******************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/numbering/numbering.js ***!
  \*******************************************************************/
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
/* harmony import */ var src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/mathExtensions */ 67858);



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
    angle = (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_0__.angleBetween)(
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

/***/ 23285:
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/palette/domainStoryPalette.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PaletteProvider),
/* harmony export */   initializePalette: () => (/* binding */ initializePalette)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);





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
      let shape = elementFactory.createShape((0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)({
        type: type
      }, options));
      (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(shape.businessObject, {
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
  let customIconDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
  customIconDict.appendDict(customIcons);
  let customIconDictKeys = customIconDict.keysArray();
  customIconDictKeys.forEach(name => {
    if (iconDictionary.getCustomIconsDictionary().has(name)) {
      let src = customIconDict.get(name);
      const iconStyle = ".icon-domain-story-" + name.toLowerCase() + "::before{" + " display: block;" + ' content: url("data:image/svg+xml;utf8,' + wrapSRCInSVG(src) + '");' + " margin: 3px;}";
      sheetEl.sheet.insertRule(iconStyle, sheetEl.sheet.cssRules.length);
    }
  });
}
function initPalette(actions, spaceTool, lassoTool, createAction) {
  let config = iconDictionary?.getCurrentIconConfigurationForBPMN();
  iconDictionary?.initTypeDictionaries(config.actors, config.workObjects);
  let actorTypes = iconDictionary?.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
  actorTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(actions, {
    "actor-separator": {
      group: "actor",
      separator: true
    }
  });
  let workObjectTypes = iconDictionary?.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  workObjectTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(actions, {
    "workObject-separator": {
      group: "workObject",
      separator: true
    },
    "domainStory-group": createAction(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.GROUP, "group", "icon-domain-story-tool-group", "group"),
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
  (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(actions, action);
}
// For some reason its important to use ' in the content for the Palette and ContextPad
// Do not change!
function wrapSRCInSVG(src) {
  return "<svg viewBox='0 0 22 22' width='22' height='22' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" + "<image width='22' height='22' xlink:href='" + src + "'/></svg>";
}

/***/ }),

/***/ 2860:
/*!************************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/updateHandler/activityUpdateHandlers.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ activityUpdateHandler),
/* harmony export */   initializeActivityUpdateHandler: () => (/* binding */ initializeActivityUpdateHandler)
/* harmony export */ });
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../numbering/numbering */ 33862);



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

/***/ 26830:
/*!**********************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/updateHandler/elementUpdateHandler.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ elementUpdateHandler)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ 44741);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../domain/entities/elementTypes */ 73190);




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
      if (semantic.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION) && element.incoming[0]) {
        element.incoming[0].businessObject.pickedColor = context.newColor;
        eventBus.fire("element.changed", {
          element: element.incoming[0]
        });
      }
      semantic.pickedColor = context.newColor;
      eventBus.fire("element.changed", {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      if (semantic.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION) && element.incoming[0]) {
        element.incoming[0].businessObject.pickedColor = context.oldColor;
        eventBus.fire("element.changed", {
          element: element.incoming[0]
        });
      }
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

/***/ 87613:
/*!*************************************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/updateHandler/headlineAndDescriptionUpdateHandler.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ headlineAndDescriptionUpdateHandler)
/* harmony export */ });
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

/***/ 89055:
/*!*******************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/updateHandler/massRenameHandler.js ***!
  \*******************************************************************************/
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

/***/ 70670:
/*!********************************************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/updateHandler/updateLabelHandler.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateLabelHandler)
/* harmony export */ });
/* harmony import */ var _labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../labeling/dsLabelUtil */ 5513);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ 44741);





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
        newBounds = ctx.newBounds;
      // resize text annotation to amount of text that is entered
      if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
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
      }
    };
  }
}
function setText(element, text, textNumber) {
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

/***/ 44741:
/*!****************************************************!*\
  !*** ./src/app/tools/modeler/bpmn/modeler/util.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBusinessObject: () => (/* binding */ getBusinessObject),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isCustomIcon: () => (/* binding */ isCustomIcon),
/* harmony export */   isCustomSvgIcon: () => (/* binding */ isCustomSvgIcon),
/* harmony export */   reworkGroupElements: () => (/* binding */ reworkGroupElements),
/* harmony export */   undoGroupRework: () => (/* binding */ undoGroupRework)
/* harmony export */ });
// TODO: this will not work for actors and work objects as the name of the icon is part of the type
function is(element, type) {
  const bo = getBusinessObject(element);
  return bo && bo.type === type;
}
function getBusinessObject(element) {
  return element && element.businessObject || element;
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
function isCustomIcon(icon) {
  // default icons are provided as SVG
  // custom icons are provided as "Data URL" with a base64-encoded image as payload
  return icon.startsWith("data");
}
function isCustomSvgIcon(icon) {
  // default icons are provided as SVG
  // custom icons are provided as "Data URL" with a base64-encoded image as payload
  return icon.startsWith("data:image/svg");
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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-color-picker */ 32580);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/workbench/services/settings/settings.service */ 1299);
/* harmony import */ var _tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/title/services/title.service */ 41535);
/* harmony import */ var _tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools/export/services/export.service */ 39595);
/* harmony import */ var _tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/autosave/services/autosave.service */ 41707);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tools/replay/services/replay.service */ 3687);
/* harmony import */ var _tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var _workbench_presentation_header_header_header_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./workbench/presentation/header/header/header.component */ 38361);
/* harmony import */ var _workbench_presentation_settings_settings_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./workbench/presentation/settings/settings.component */ 45263);
/* harmony import */ var _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tools/import/directive/dragDrop.directive */ 42482);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 39191);

















function AppComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "app-settings");
  }
}
class AppComponent {
  constructor(settingsService, titleService, exportService, autosaveService, cd, snackbar, replayService, modelerService) {
    this.settingsService = settingsService;
    this.titleService = titleService;
    this.exportService = exportService;
    this.autosaveService = autosaveService;
    this.cd = cd;
    this.snackbar = snackbar;
    this.modelerService = modelerService;
    this.version = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.version;
    this.color = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.BLACK;
    this.skipNextColorUpdate = false;
    // define preset colors that have good contrast on white background and are compatible to EventStorming notation
    this.colorBox = [_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.YELLOW, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.ORANGE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.RED, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.LIGHT_PINK, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.DARK_PINK, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.PURPLE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.BLUE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.CYAN, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.GREEN, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.LIME, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.GREY, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.BLACK];
    this.showSettings$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(false);
    this.showDescription$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(true);
    document.addEventListener('keydown', e => {
      const modifierPressed = e.ctrlKey || e.metaKey;
      if (modifierPressed && e.key === 's' && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        if (this.exportService.isDomainStoryExportable()) {
          this.exportService.downloadDST();
        }
      }
      if (modifierPressed && e.altKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        if (this.exportService.isDomainStoryExportable()) {
          this.exportService.downloadSVG(true, true, undefined);
        }
      }
      if (modifierPressed && e.key === 'l') {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('import')?.click();
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && replayService.getReplayOn()) {
        e.preventDefault();
        e.stopPropagation();
        replayService.nextSentence();
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && replayService.getReplayOn()) {
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
    document.addEventListener('defaultColor', event => {
      const customEvent = event;
      if (customEvent.detail.color === 'black') {
        this.color = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.BLACK;
      } else {
        this.color = customEvent.detail.color;
      }
    });
    document.addEventListener('openColorPicker', () => {
      this.colorPicker.openDialog();
    });
    document.addEventListener('errorColoringOnlySvg', () => {
      this.snackbar.open('Only SVG icons can be colored', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_INFO
      });
    });
  }
  ngOnInit() {
    this.modelerService.postInit();
    this.showDescription$ = this.titleService.showDescription$;
    this.showSettings$ = this.settingsService.showSettings$;
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
  ngAfterViewInit() {
    this.autosaveService.loadLatestDraft();
    this.cd.detectChanges();
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_2__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_3__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_4__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_5__.AutosaveService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_6__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_7__.ModelerService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    viewQuery: function AppComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](ngx_color_picker__WEBPACK_IMPORTED_MODULE_14__.ColorPickerDirective, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.colorPicker = _t.first);
      }
    },
    decls: 36,
    vars: 40,
    consts: [["role", "main", 1, "content"], ["id", "colorPicker", 2, "display", "none", "height", "0", 3, "colorPickerChange", "colorPickerClose", "cpPresetColors", "colorPicker"], ["appDrag", "", "id", "canvas"], ["src", "favicon.ico", "height", "24", "alt", "Egon Logo"], ["href", "https://egon.io", "target", "_blank"], ["href", "https://egon.io/changelog", "target", "_blank"], ["src", "assets/logo/wps-icon.ico", "height", "24", "alt", "WPS Logo"], ["href", "https://www.wps.de/", "target", "_blank"], ["href", "https://www.wps.de/datenschutz/", "target", "_blank"], ["href", "https://www.wps.de/impressum/", "target", "_blank"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 0)(1, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtwoWayListener"]("colorPickerChange", function AppComponent_Template_input_colorPickerChange_1_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtwoWayBindingSet"](ctx.color, $event) || (ctx.color = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("colorPickerClose", function AppComponent_Template_input_colorPickerClose_1_listener($event) {
          return ctx.onColorChanged($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, AppComponent_Conditional_2_Template, 1, 0, "app-settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20, " egon.io");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](22, "version: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](25, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](26, "by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](27, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](29, "WPS");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "span")(31, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](32, "Privacy");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](33, "span")(34, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](35, "Imprint");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background", ctx.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("cpPresetColors", ctx.colorBox);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtwoWayProperty"]("colorPicker", ctx.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵconditional"](2, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 20, ctx.showSettings$) ? 2 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("headerAndCanvas", !_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 22, ctx.showSettings$) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 24, ctx.showDescription$))("headerAndCanvasCollapsed", !_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 26, ctx.showSettings$) && !_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 28, ctx.showDescription$))("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](9, 30, ctx.showSettings$));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("header", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 32, ctx.showDescription$))("headerCollapsed", !_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](12, 34, ctx.showDescription$));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("logoContainer", !_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](15, 36, ctx.showSettings$))("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](16, 38, ctx.showSettings$));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx.version);
      }
    },
    dependencies: [ngx_color_picker__WEBPACK_IMPORTED_MODULE_14__.ColorPickerDirective, _workbench_presentation_header_header_header_component__WEBPACK_IMPORTED_MODULE_8__.HeaderComponent, _workbench_presentation_settings_settings_component__WEBPACK_IMPORTED_MODULE_9__.SettingsComponent, _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_10__.DragDirective, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe],
    styles: [".content[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n}\n\n\n\n.headerAndCanvas[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.headerAndCanvasCollapsed[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.settings[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: min-content 155px;\n}\n\n\n\n.logoContainer[_ngcontent-%COMP%] {\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  right: 100px;\n  align-items: flex-end;\n  background-color: #f7f7f8;\n  margin-bottom: 7px;\n  border-width: 1px;\n  border-radius: 2px;\n  border-style: solid;\n  border-color: #b9bcc6;\n}\n.logoContainer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 7px;\n  margin-right: 7px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n  align-items: center;\n}\n\n.hidden[_ngcontent-%COMP%] {\n  height: 1px;\n  width: 1px;\n}\n\n.mat-button-toggle-label-content[_ngcontent-%COMP%] {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n\n .mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: white;\n}\n\nspan[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n\nspan[_ngcontent-%COMP%] {\n  height: 24px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUEscUJBQUE7QUFFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtBQUFGOztBQUdBLG1CQUFBO0FBRUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0FBREY7QUFHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQURKOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUFGRjs7QUFNQTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSwrQkFBQTtBQUhGOztBQU1BO0VBQ0UsdUJBQUE7QUFIRjs7QUFNQTtFQUNFLHNCQUFBO0FBSEY7O0FBTUE7RUFDRSxZQUFBO0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLyogaGVhZGVyIGFuZCBDYW52YXMqL1xuXG4uaGVhZGVyQW5kQ2FudmFzIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uaGVhZGVyQW5kQ2FudmFzQ29sbGFwc2VkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uc2V0dGluZ3Mge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oZWFkZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDE1NXB4O1xufVxuXG4vKiBMb2dvIENvbnRhaW5lciAqL1xuXG4ubG9nb0NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMTAwcHg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmODtcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6ICNiOWJjYzY7XG5cbiAgc3BhbiB7XG4gICAgbWFyZ2luLWxlZnQ6IDdweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDdweDtcbiAgICBtYXJnaW4tdG9wOiA3cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogN3B4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuLmhpZGRlbiB7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogMXB4O1xufVxuXG4vLyBNYXRlcmlhbCBEZXNpZ24gT3ZlcnJpZGVzXG4ubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTBwdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWRjLXRleHQtZmllbGQtLWZpbGxlZDpub3QoLm1kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuc3BhbiAqIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuc3BhbiB7XG4gIGhlaWdodDogMjRweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/platform-browser */ 4199);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/platform-browser/animations */ 91244);
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/app.component */ 20092);
/* harmony import */ var src_app_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/import/services/import-domain-story.service */ 93586);
/* harmony import */ var src_app_tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/label-dictionary/services/label-dictionary.service */ 69731);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-configuration.service */ 46527);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./material.module */ 89439);
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-color-picker */ 32580);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tools/icon-set-config/services/icon-set-customization.service */ 46252);
/* harmony import */ var _tools_modeler_bpmn_modeler_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/context-pad/domainStoryContextPadProvider */ 17325);
/* harmony import */ var _tools_modeler_bpmn_modeler_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/palette/domainStoryPalette */ 23285);
/* harmony import */ var _tools_modeler_bpmn_modeler_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/domainStoryRenderer */ 80215);
/* harmony import */ var _tools_modeler_bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/labeling/dsLabelEditingProvider */ 46604);
/* harmony import */ var _tools_modeler_bpmn_modeler_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/change-icon/replaceOptions */ 15916);
/* harmony import */ var _tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/numbering/numbering */ 33862);
/* harmony import */ var _tools_modeler_bpmn_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tools/modeler/bpmn/modeler/updateHandler/activityUpdateHandlers */ 2860);
/* harmony import */ var _workbench_presentation_workbench_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./workbench/presentation/workbench.module */ 75128);
/* harmony import */ var _domain_presentation_domain_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./domain/presentation/domain.module */ 16126);
/* harmony import */ var _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tools/autosave/presentation/autosave.module */ 39042);
/* harmony import */ var _tools_export_presentation_export_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tools/export/presentation/export.module */ 43490);
/* harmony import */ var _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tools/icon-set-config/presentation/icon-set-config.module */ 92324);
/* harmony import */ var _tools_import_presentation_import_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tools/import/presentation/import.module */ 39166);
/* harmony import */ var _tools_label_dictionary_presentation_label_dictionary_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./tools/label-dictionary/presentation/label-dictionary.module */ 10462);
/* harmony import */ var _tools_modeler_presentation_modeler_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./tools/modeler/presentation/modeler.module */ 71638);
/* harmony import */ var _tools_title_presentation_title_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./tools/title/presentation/title.module */ 80302);
/* harmony import */ var _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./tools/import/directive/dragDrop.directive */ 42482);
/* harmony import */ var _tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./tools/autosave/services/autosave.service */ 41707);


































class AppModule {
  constructor(autosaveService) {
    this.autosaveService = autosaveService;
    // autosaveService wird so automatisch initialisiert, auf keinen Fall entfernen!
  }
  ngDoBootstrap(app) {
    const componentElement = document.createElement('app-root');
    document.body.append(componentElement);
    app.bootstrap(src_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent);
  }
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵinject"](_tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_26__.AutosaveService));
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineNgModule"]({
    type: AppModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineInjector"]({
    providers: [_angular_forms__WEBPACK_IMPORTED_MODULE_28__.UntypedFormBuilder, {
      provide: _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_29__.MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: {
        clickAction: 'noop'
      }
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_27__.APP_INITIALIZER,
      useFactory: initialize,
      multi: true,
      deps: [_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_7__.DirtyFlagService, src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService, src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigurationService, src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_3__.ElementRegistryService, src_app_tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_2__.LabelDictionaryService]
    }, {
      provide: _tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_8__.IconSetChangedService,
      useExisting: src_app_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__.ImportDomainStoryService
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_31__.NoopAnimationsModule, _material_module__WEBPACK_IMPORTED_MODULE_6__.MaterialModule, ngx_color_picker__WEBPACK_IMPORTED_MODULE_32__.ColorPickerModule, _workbench_presentation_workbench_module__WEBPACK_IMPORTED_MODULE_16__.WorkbenchModule, _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_18__.AutosaveModule, _tools_export_presentation_export_module__WEBPACK_IMPORTED_MODULE_19__.ExportModule, _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_20__.IconSetConfigModule, _tools_import_presentation_import_module__WEBPACK_IMPORTED_MODULE_21__.ImportModule, _tools_label_dictionary_presentation_label_dictionary_module__WEBPACK_IMPORTED_MODULE_22__.LabelDictionaryModule, _tools_modeler_presentation_modeler_module__WEBPACK_IMPORTED_MODULE_23__.ModelerModule, _tools_title_presentation_title_module__WEBPACK_IMPORTED_MODULE_24__.TitleModule, _domain_presentation_domain_module__WEBPACK_IMPORTED_MODULE_17__.DomainModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [src_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_30__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_31__.NoopAnimationsModule, _material_module__WEBPACK_IMPORTED_MODULE_6__.MaterialModule, ngx_color_picker__WEBPACK_IMPORTED_MODULE_32__.ColorPickerModule, _workbench_presentation_workbench_module__WEBPACK_IMPORTED_MODULE_16__.WorkbenchModule, _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_18__.AutosaveModule, _tools_export_presentation_export_module__WEBPACK_IMPORTED_MODULE_19__.ExportModule, _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_20__.IconSetConfigModule, _tools_import_presentation_import_module__WEBPACK_IMPORTED_MODULE_21__.ImportModule, _tools_label_dictionary_presentation_label_dictionary_module__WEBPACK_IMPORTED_MODULE_22__.LabelDictionaryModule, _tools_modeler_presentation_modeler_module__WEBPACK_IMPORTED_MODULE_23__.ModelerModule, _tools_title_presentation_title_module__WEBPACK_IMPORTED_MODULE_24__.TitleModule, _domain_presentation_domain_module__WEBPACK_IMPORTED_MODULE_17__.DomainModule, _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_25__.DragDirective]
  });
})();
function initialize(dirtyFlagService, iconDictionaryService, configurationService, elementRegistryService, labelDictionaryService) {
  return () => {
    (0,_tools_modeler_bpmn_modeler_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_9__.initializeContextPadProvider)(dirtyFlagService, iconDictionaryService);
    /** The Palette and the Context Menu need the Icons present in the Domain,
     * so the IconDictionaryService and the IconSetConfigurationService needs to be given to the Palette **/
    (0,_tools_modeler_bpmn_modeler_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_10__.initializePalette)(iconDictionaryService, configurationService);
    (0,_tools_modeler_bpmn_modeler_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_11__.initializeRenderer)(iconDictionaryService, elementRegistryService, dirtyFlagService);
    (0,_tools_modeler_bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_12__.initializeLabelEditingProvider)(labelDictionaryService);
    (0,_tools_modeler_bpmn_modeler_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_13__.initializeReplaceOptions)(iconDictionaryService);
    (0,_tools_modeler_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_14__.initializeNumbering)(elementRegistryService);
    (0,_tools_modeler_bpmn_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_15__.initializeActivityUpdateHandler)(elementRegistryService);
  };
}

/***/ }),

/***/ 56165:
/*!**************************************************!*\
  !*** ./src/app/domain/entities/configuration.ts ***!
  \**************************************************/
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

/***/ 40550:
/*!**********************************************!*\
  !*** ./src/app/domain/entities/constants.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLACK: () => (/* binding */ BLACK),
/* harmony export */   BLUE: () => (/* binding */ BLUE),
/* harmony export */   CYAN: () => (/* binding */ CYAN),
/* harmony export */   DARK_PINK: () => (/* binding */ DARK_PINK),
/* harmony export */   DEFAULT_AUTOSAVES_ENABLED: () => (/* binding */ DEFAULT_AUTOSAVES_ENABLED),
/* harmony export */   DEFAULT_AUTOSAVES_INTERVAL: () => (/* binding */ DEFAULT_AUTOSAVES_INTERVAL),
/* harmony export */   DEFAULT_AUTOSAVES_MAX_DRAFTS: () => (/* binding */ DEFAULT_AUTOSAVES_MAX_DRAFTS),
/* harmony export */   DRAFTS_KEY: () => (/* binding */ DRAFTS_KEY),
/* harmony export */   GREEN: () => (/* binding */ GREEN),
/* harmony export */   GREY: () => (/* binding */ GREY),
/* harmony export */   ICON_SET_CONFIGURATION_KEY: () => (/* binding */ ICON_SET_CONFIGURATION_KEY),
/* harmony export */   IMPLICIT_ROOT_ID: () => (/* binding */ IMPLICIT_ROOT_ID),
/* harmony export */   INITIAL_DESCRIPTION: () => (/* binding */ INITIAL_DESCRIPTION),
/* harmony export */   INITIAL_ICON_SET_NAME: () => (/* binding */ INITIAL_ICON_SET_NAME),
/* harmony export */   INITIAL_TITLE: () => (/* binding */ INITIAL_TITLE),
/* harmony export */   LIGHT_PINK: () => (/* binding */ LIGHT_PINK),
/* harmony export */   LIME: () => (/* binding */ LIME),
/* harmony export */   ORANGE: () => (/* binding */ ORANGE),
/* harmony export */   PURPLE: () => (/* binding */ PURPLE),
/* harmony export */   RED: () => (/* binding */ RED),
/* harmony export */   SNACKBAR_DURATION: () => (/* binding */ SNACKBAR_DURATION),
/* harmony export */   SNACKBAR_DURATION_LONG: () => (/* binding */ SNACKBAR_DURATION_LONG),
/* harmony export */   SNACKBAR_DURATION_LONGER: () => (/* binding */ SNACKBAR_DURATION_LONGER),
/* harmony export */   SNACKBAR_ERROR: () => (/* binding */ SNACKBAR_ERROR),
/* harmony export */   SNACKBAR_INFO: () => (/* binding */ SNACKBAR_INFO),
/* harmony export */   SNACKBAR_SUCCESS: () => (/* binding */ SNACKBAR_SUCCESS),
/* harmony export */   VERSION_KEY: () => (/* binding */ VERSION_KEY),
/* harmony export */   YELLOW: () => (/* binding */ YELLOW)
/* harmony export */ });
/** DEFAULT VALUES **/
const INITIAL_TITLE = '<title>';
const INITIAL_DESCRIPTION = '';
const INITIAL_ICON_SET_NAME = 'default';
/** LocalStorage KEYS **/
const ICON_SET_CONFIGURATION_KEY = 'iconSetConfiguration';
const DRAFTS_KEY = 'autosaveDrafts';
const VERSION_KEY = 'version';
/** AUTOSAVE DEFAULTS **/
const DEFAULT_AUTOSAVES_ENABLED = true;
const DEFAULT_AUTOSAVES_MAX_DRAFTS = 5;
const DEFAULT_AUTOSAVES_INTERVAL = 30;
/** SNACKBAR **/
const SNACKBAR_DURATION = 2000;
const SNACKBAR_DURATION_LONG = 4000;
const SNACKBAR_DURATION_LONGER = 6000;
const SNACKBAR_SUCCESS = 'snackbar_success';
const SNACKBAR_ERROR = 'snackbar_error';
const SNACKBAR_INFO = 'snackbar_info';
/** BPMN_RELEVANT_CONSTANTS **/
const IMPLICIT_ROOT_ID = '__implicitroot';
/** COLOR PICKER DEFAULT COLORS **/
const YELLOW = '#FDD835';
const ORANGE = '#FB8C00';
const RED = '#D32F2F';
const LIGHT_PINK = '#F48FB1';
const DARK_PINK = '#EC407A';
const PURPLE = '#8E24AA';
const BLUE = '#1E88E5';
const CYAN = '#00ACC1';
const GREEN = '#43A047';
const LIME = '#C0CA33';
const GREY = '#9E9E9E';
const BLACK = '#000000';

/***/ }),

/***/ 20843:
/*!***********************************************!*\
  !*** ./src/app/domain/entities/dictionary.ts ***!
  \***********************************************/
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
      this.entries.push(entry);
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
  addBuildInIcons(buildInIcons) {
    buildInIcons.entries.forEach(entry => {
      if (!this.has(entry.key)) {
        this.entries.push(entry);
      }
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
}
class Entry {
  constructor(value, key, keyWords = []) {
    this.value = value;
    this.key = key;
    this.keyWords = keyWords;
  }
}

/***/ }),

/***/ 73190:
/*!*************************************************!*\
  !*** ./src/app/domain/entities/elementTypes.ts ***!
  \*************************************************/
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
})(ElementTypes || (ElementTypes = {}));

/***/ }),

/***/ 16126:
/*!******************************************************!*\
  !*** ./src/app/domain/presentation/domain.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomainModule: () => (/* binding */ DomainModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../material.module */ 89439);
/* harmony import */ var _keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard-shortcuts-dialog/keyboard-shortcuts/keyboard-shortcuts-dialog.component */ 45466);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);




class DomainModule {
  static #_ = this.ɵfac = function DomainModule_Factory(t) {
    return new (t || DomainModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: DomainModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DomainModule, {
    declarations: [_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_1__.KeyboardShortcutsDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule],
    exports: [_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_1__.KeyboardShortcutsDialogComponent]
  });
})();

/***/ }),

/***/ 45466:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/domain/presentation/keyboard-shortcuts-dialog/keyboard-shortcuts/keyboard-shortcuts-dialog.component.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyboardShortcutsDialogComponent: () => (/* binding */ KeyboardShortcutsDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);



const _forTrack0 = ($index, $item) => $item.description;
function KeyboardShortcutsDialogComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const shortCut_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", shortCut_r1.description, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](shortCut_r1.shortCut);
  }
}
class KeyboardShortcutsDialogComponent {
  constructor(data) {
    this.shortCuts = [];
    this.title = data.title;
    this.shortCuts = data.shortCuts ?? [];
  }
  static #_ = this.ɵfac = function KeyboardShortcutsDialogComponent_Factory(t) {
    return new (t || KeyboardShortcutsDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: KeyboardShortcutsDialogComponent,
    selectors: [["app-keyboard-shortcuts-dialog"]],
    decls: 5,
    vars: 1,
    consts: [[1, "content"], ["id", "info-dialog-title"], [1, "row"], [1, "description-width"]],
    template: function KeyboardShortcutsDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-dialog-content", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterCreate"](3, KeyboardShortcutsDialogComponent_For_4_Template, 5, 2, "div", 2, _forTrack0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeater"](ctx.shortCuts);
      }
    },
    dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent],
    styles: [".content[_ngcontent-%COMP%] {\n  height: -moz-fit-content;\n  height: fit-content;\n  width: 30vw;\n  overflow: hidden;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n\n.description-width[_ngcontent-%COMP%] {\n  width: 12rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZG9tYWluL3ByZXNlbnRhdGlvbi9rZXlib2FyZC1zaG9ydGN1dHMtZGlhbG9nL2tleWJvYXJkLXNob3J0Y3V0cy9rZXlib2FyZC1zaG9ydGN1dHMtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQUE7RUFBQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gIHdpZHRoOiAzMHZ3O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cblxuLmRlc2NyaXB0aW9uLXdpZHRoIHtcbiAgd2lkdGg6IDEycmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 96445:
/*!**********************************************************!*\
  !*** ./src/app/domain/services/command-stack.service.ts ***!
  \**********************************************************/
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

/***/ 12855:
/*!***************************************************!*\
  !*** ./src/app/domain/services/dialog.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogService: () => (/* binding */ DialogService)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../presentation/keyboard-shortcuts-dialog/keyboard-shortcuts/keyboard-shortcuts-dialog.component */ 45466);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);




class DialogService {
  constructor(matDialog) {
    this.matDialog = matDialog;
  }
  openDialog(dialog, config) {
    this.matDialog.open(dialog, config);
  }
  openKeyboardShortcutsDialog() {
    const shortCuts = [];
    shortCuts.push({
      description: 'Undo',
      shortCut: 'ctrl + Z'
    });
    shortCuts.push({
      description: 'Redo',
      shortCut: 'ctrl + Y    OR   ctrl + shift + Z'
    });
    shortCuts.push({
      description: 'Select All',
      shortCut: 'ctrl + A'
    });
    shortCuts.push({
      description: 'Export as EGN',
      shortCut: 'ctrl + S'
    });
    shortCuts.push({
      description: 'Export as SVG',
      shortCut: 'ctrl + alt + S'
    });
    shortCuts.push({
      description: 'Import Domain Story',
      shortCut: 'ctrl + L'
    });
    shortCuts.push({
      description: 'Search for text',
      shortCut: 'ctrl + F'
    });
    shortCuts.push({
      description: 'Direct editing',
      shortCut: 'E'
    });
    shortCuts.push({
      description: 'Hand tool',
      shortCut: 'H'
    });
    shortCuts.push({
      description: 'Lasso tool',
      shortCut: 'L'
    });
    shortCuts.push({
      description: 'Space tool',
      shortCut: 'S'
    });
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogConfig();
    config.data = {
      title: 'Keyboard Shortcuts',
      shortCuts: shortCuts
    };
    this.openDialog(_presentation_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_0__.KeyboardShortcutsDialogComponent, config);
  }
  static #_ = this.ɵfac = function DialogService_Factory(t) {
    return new (t || DialogService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialog));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: DialogService,
    factory: DialogService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 94658:
/*!*******************************************************!*\
  !*** ./src/app/domain/services/dirty-flag.service.ts ***!
  \*******************************************************/
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

/***/ 85511:
/*!*************************************************************!*\
  !*** ./src/app/domain/services/element-registry.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementRegistryService: () => (/* binding */ ElementRegistryService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
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
      if (canvasElement.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) {
        objectList.push(canvasElement);
      }
      // ensure that Activities are always after Actors, Workobjects and Groups in .dst files
      else {
        if (canvasElement.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION) {
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
      if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY)) {
        activities.push(element);
      }
    });
    return activities;
  }
  getAllConnections() {
    const connections = [];
    this.getAllCanvasObjects().forEach(element => {
      const type = element.type;
      if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
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
        if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
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
        if (child.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
          groupObjects.push(child);
        }
      });
    }
    const seenIds = new Set();
    return groupObjects.filter(groupObject => {
      const isNewId = !seenIds.has(groupObject.id);
      if (isNewId) {
        seenIds.add(groupObject.id);
      }
      return isNewId;
    });
  }
  checkChildForGroup(groupObjects, allObjects) {
    const registryElementNames = Object.keys(this.registry);
    for (let name of registryElementNames) {
      const entry = this.registry[name].element;
      if (entry.businessObject) {
        const type = entry.type;
        if (type && type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
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
      if (activity.source?.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
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
      actors: actors.map(a => a.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR, '')),
      workobjects: workobjects.map(w => w.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, ''))
    };
  }
  getAllActors() {
    return this.getAllCanvasObjects().filter(co => co.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR));
  }
  getAllWorkobjects() {
    return this.getAllCanvasObjects().filter(co => co.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT));
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

/***/ 50624:
/*!****************************************************!*\
  !*** ./src/app/domain/services/storage.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);

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
  static #_ = this.ɵfac = function StorageService_Factory(t) {
    return new (t || StorageService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: StorageService,
    factory: StorageService.ɵfac,
    providedIn: 'root'
  });
}

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

/***/ 421:
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosaveOptions/autosave-options.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveOptionsComponent: () => (/* binding */ AutosaveOptionsComponent)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _services_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/autosave-configuration.service */ 96040);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 39191);








function AutosaveOptionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Autosave Options");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 7, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Enabled ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 6)(9, "mat-form-field", 8)(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Interval [seconds]");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input", 9, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 6)(15, "mat-form-field", 8)(16, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Keep last X drafts");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input", 9, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosaveOptionsComponent_Conditional_0_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const activated_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
      const interval_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](13);
      const drafts_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](19);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r4.save(activated_r2.checked, +drafts_r4.value, +interval_r3.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " Apply ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const configuration_r6 = ctx;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", configuration_r6.activated);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", configuration_r6.interval);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
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
        duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
      });
    } else {
      this.snackbar.open('Unable to save settings for Autosave - please try again', undefined, {
        duration: 2 * src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_ERROR
      });
    }
  }
  static #_ = this.ɵfac = function AutosaveOptionsComponent_Factory(t) {
    return new (t || AutosaveOptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosaveOptionsComponent,
    selectors: [["app-autosave-options"]],
    decls: 2,
    vars: 3,
    consts: [["activated", ""], ["interval", ""], ["drafts", ""], [1, "header"], [1, "content"], [1, "heading"], [1, "option"], ["type", "checkbox", 3, "checked"], ["color", "accent"], ["matInput", "", "min", "1", "type", "number", 1, "numberInput", 3, "value"], [1, "spacer"], ["mat-flat-button", "", "color", "primary", 3, "click"]],
    template: function AutosaveOptionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AutosaveOptionsComponent_Conditional_0_Template, 24, 3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        let tmp_0_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](0, (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx.autosaveConfiguration.configuration$)) ? 0 : -1, tmp_0_0);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
    styles: [".header[_ngcontent-%COMP%] {\n  background-color: #f7f7f8;\n  margin: 8px;\n}\n\n.content[_ngcontent-%COMP%] {\n  margin: 8px;\n  padding: 8px;\n}\n\n.heading[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.option[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto;\n  row-gap: 8px;\n}\n\n.numberInput[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  height: inherit;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvYXV0b3NhdmUvcHJlc2VudGF0aW9uL0F1dG9zYXZlT3B0aW9ucy9hdXRvc2F2ZS1vcHRpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxtQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbjogOHB4O1xufVxuXG4uY29udGVudCB7XG4gIG1hcmdpbjogOHB4O1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbi5oZWFkaW5nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5vcHRpb24ge1xuICBtYXJnaW46IDhweDtcbn1cblxuLmdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XG4gIHJvdy1nYXA6IDhweDtcbn1cblxuLm51bWJlcklucHV0IHtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG5idXR0b24ge1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBsaW5lLWhlaWdodDogMC45cmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 91525:
/*!*********************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosaveSettings/autosave-settings.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveSettingsComponent: () => (/* binding */ AutosaveSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutosaveOptions/autosave-options.component */ 421);
/* harmony import */ var _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AutosavedDrafts/autosaved-drafts.component */ 29051);



class AutosaveSettingsComponent {
  static #_ = this.ɵfac = function AutosaveSettingsComponent_Factory(t) {
    return new (t || AutosaveSettingsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosaveSettingsComponent,
    selectors: [["app-autosave-settings"]],
    decls: 3,
    vars: 0,
    consts: [[1, "content"]],
    template: function AutosaveSettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-autosaved-drafts")(2, "app-autosave-options");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveOptionsComponent, _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_1__.AutosavedDraftsComponent],
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto max-content;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvYXV0b3NhdmUvcHJlc2VudGF0aW9uL0F1dG9zYXZlU2V0dGluZ3MvYXV0b3NhdmUtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsdUNBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIG1heC1jb250ZW50O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 29051:
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosavedDrafts/autosaved-drafts.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosavedDraftsComponent: () => (/* binding */ AutosavedDraftsComponent)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _services_autosave_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/autosave.service */ 41707);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 68708);






function AutosavedDraftsComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item")(1, "div", 5)(2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosavedDraftsComponent_Conditional_7_For_2_Template_button_click_6_listener() {
      const draft_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.loadDraft(draft_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Load draft ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const draft_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](draft_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](draft_r2.date);
  }
}
function AutosavedDraftsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](1, AutosavedDraftsComponent_Conditional_7_For_2_Template, 8, 2, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx_r2.drafts);
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
      duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
      panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
    });
  }
  removeAllDrafts() {
    this.autosaveService.removeAllDrafts();
  }
  static #_ = this.ɵfac = function AutosavedDraftsComponent_Factory(t) {
    return new (t || AutosavedDraftsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_autosave_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AutosavedDraftsComponent,
    selectors: [["app-autosaved-drafts"]],
    decls: 8,
    vars: 4,
    consts: [[1, "header"], [1, "history"], [1, "spacer"], [1, "buttons"], ["mat-stroked-button", "", 1, "mr-1", 3, "click", "disabled"], [1, "draft"], [1, "item-title"], [1, "item-date"], ["mat-stroked-button", "", 3, "click"]],
    template: function AutosavedDraftsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3)(5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AutosavedDraftsComponent_Template_button_click_5_listener() {
          return ctx.removeAllDrafts();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " Remove all drafts ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, AutosavedDraftsComponent_Conditional_7_Template, 3, 0, "mat-list");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx.drafts.length ? ctx.drafts.length : "no", " ", ctx.drafts.length > 1 ? "drafts" : "draft", " saved ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.drafts.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](7, ctx.drafts.length ? 7 : -1);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListItem],
    styles: [".header[_ngcontent-%COMP%] {\n  display: flex;\n  height: 46px;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.history[_ngcontent-%COMP%] {\n  font-weight: bold;\n  display: inline-flex;\n  margin-left: 16px;\n  align-self: center;\n  align-items: center;\n  justify-self: left;\n  height: inherit;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n  justify-self: right;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-self: center;\n  align-items: center;\n  justify-self: right;\n  height: inherit;\n}\n\nmat-list[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\nmat-list-item[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  border: 1px solid #b9bcc6;\n}\n\n.draft[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto max-content max-content;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.item-date[_ngcontent-%COMP%] {\n  font-weight: normal;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvYXV0b3NhdmUvcHJlc2VudGF0aW9uL0F1dG9zYXZlZERyYWZ0cy9hdXRvc2F2ZWQtZHJhZnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbURBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA0NnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uaGlzdG9yeSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG59XG5cbmJ1dHRvbiB7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gIGxpbmUtaGVpZ2h0OiAwLjlyZW07XG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiByaWdodDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG5tYXQtbGlzdCB7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG5tYXQtbGlzdC1pdGVtIHtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYjliY2M2O1xufVxuXG4uZHJhZnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XG59XG5cbi5pdGVtLXRpdGxlIHtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5pdGVtLWRhdGUge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW4tbGVmdDogMTVweDtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 39042:
/*!****************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/autosave.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveModule: () => (/* binding */ AutosaveModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutosaveSettings/autosave-settings.component */ 91525);
/* harmony import */ var _AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutosaveOptions/autosave-options.component */ 421);
/* harmony import */ var _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutosavedDrafts/autosaved-drafts.component */ 29051);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);







class AutosaveModule {
  static #_ = this.ɵfac = function AutosaveModule_Factory(t) {
    return new (t || AutosaveModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: AutosaveModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AutosaveModule, {
    declarations: [_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveSettingsComponent, _AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_1__.AutosaveOptionsComponent, _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_2__.AutosavedDraftsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule],
    exports: [_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_0__.AutosaveSettingsComponent]
  });
})();

/***/ }),

/***/ 96040:
/*!***************************************************************************!*\
  !*** ./src/app/tools/autosave/services/autosave-configuration.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveConfigurationService: () => (/* binding */ AutosaveConfigurationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 61151);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);




const AUTOSAVE_CONFIGURATION_TAG = 'autosaveConfiguration';
const defaultConfiguration = {
  activated: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_ENABLED,
  interval: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_INTERVAL,
  maxDrafts: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_AUTOSAVES_MAX_DRAFTS
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
    return new (t || AutosaveConfigurationService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: AutosaveConfigurationService,
    factory: AutosaveConfigurationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 41707:
/*!*************************************************************!*\
  !*** ./src/app/tools/autosave/services/autosave.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveService: () => (/* binding */ AutosaveService)
/* harmony export */ });
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 63150);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _autosave_configuration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autosave-configuration.service */ 96040);
/* harmony import */ var _export_services_export_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../export/services/export.service */ 39595);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modeler/services/renderer.service */ 63812);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var _title_services_title_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../title/services/title.service */ 41535);
/* harmony import */ var _icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-configuration.service */ 46527);












class AutosaveService {
  constructor(autosaveConfiguration, exportService, iconDictionaryService, rendererService, snackbar, storageService, titleService, iconSetConfigurationService) {
    this.autosaveConfiguration = autosaveConfiguration;
    this.exportService = exportService;
    this.iconDictionaryService = iconDictionaryService;
    this.rendererService = rendererService;
    this.snackbar = snackbar;
    this.storageService = storageService;
    this.titleService = titleService;
    this.iconSetConfigurationService = iconSetConfigurationService;
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
    const config = this.iconSetConfigurationService.createIconSetConfiguration(configFromFile);
    const story = JSON.parse(draft.configAndDST.dst);
    this.titleService.updateTitleAndDescription(draft.title, draft.description, false);
    const actorIcons = this.iconDictionaryService.getElementsOfType(story, _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
    const workObjectIcons = this.iconDictionaryService.getElementsOfType(story, _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
    this.iconDictionaryService.updateIconRegistries(actorIcons, workObjectIcons, config);
    this.rendererService.importStory(story, true, config, false);
  }
  removeAllDrafts() {
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.DRAFTS_KEY, []);
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
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_INFO,
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION
        });
        this.autosavedDraftsChanged$.next();
      }
    }, interval * 1000);
  }
  isDraftEmpty(draft) {
    const configAndDST = draft.configAndDST ?? {
      dst: '[]'
    };
    return draft.title === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE && draft.description === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION && JSON.parse(configAndDST.dst).length === 0;
  }
  isSame(a, b) {
    return a.title === b.title && a.description === b.description && JSON.stringify(a.configAndDST) === JSON.stringify(b.configAndDST);
  }
  writeDrafts(drafts) {
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.DRAFTS_KEY, drafts);
  }
  readDrafts() {
    return this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.DRAFTS_KEY) ?? [];
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
    return new (t || AutosaveService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_2__.AutosaveConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_export_services_export_service__WEBPACK_IMPORTED_MODULE_3__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_5__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_6__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_title_services_title_service__WEBPACK_IMPORTED_MODULE_7__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_8__.IconSetConfigurationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
    token: AutosaveService,
    factory: AutosaveService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 55701:
/*!****************************************************************!*\
  !*** ./src/app/tools/export/domain/dialog/exportDialogData.ts ***!
  \****************************************************************/
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

/***/ 23959:
/*!************************************************************!*\
  !*** ./src/app/tools/export/domain/export/configAndDst.ts ***!
  \************************************************************/
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

/***/ 41646:
/*!***************************************************************!*\
  !*** ./src/app/tools/export/domain/export/exportConstants.ts ***!
  \***************************************************************/
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

/***/ 2200:
/*!************************************************************************************!*\
  !*** ./src/app/tools/export/presentation/export-dialog/export-dialog.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportDialogComponent: () => (/* binding */ ExportDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/BehaviorSubject */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var src_app_tools_export_domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/export/domain/dialog/exportDialogData */ 55701);








function ExportDialogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " - animation speed:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ExportDialogComponent_Conditional_18_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.animationSpeed, $event) || (ctx_r1.animationSpeed = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_Conditional_18_Template_span_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onExportAnimatedSvg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "seconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.animationSpeed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("max", 9)("min", 1)("maxLength", 1);
  }
}
function ExportDialogComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_For_26_Template_button_click_0_listener() {
      const i_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.doOption(i_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("title", option_r5.tooltip);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", option_r5.text, " ");
  }
}
class ExportDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.isAnimatedSvgExport = false;
    this.animationSpeed = 2;
    this.withTitle = new rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this.useWhiteBackground = new rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this.title = data.title;
    this.options = data.options;
  }
  ngOnInit() {}
  doOption(i) {
    if (this.isAnimatedSvgExport) {
      this.options[i].fn(this.withTitle.value, this.useWhiteBackground.value, this.animationSpeed);
    } else {
      this.options[i].fn(this.withTitle.value, this.useWhiteBackground.value);
    }
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
  onExportAnimatedSvg() {
    this.isAnimatedSvgExport = !this.isAnimatedSvgExport;
  }
  static #_ = this.ɵfac = function ExportDialogComponent_Factory(t) {
    return new (t || ExportDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ExportDialogComponent,
    selectors: [["app-export-dialog"]],
    decls: 27,
    vars: 9,
    consts: [[1, "card"], [1, "row"], ["type", "checkbox", 3, "change", "checked"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [3, "click"], ["mat-flat-button", "", 3, "click"], ["mat-stroked-button", "", 1, "mr-1", 3, "title"], ["oninput", "this.value = this.value.replace(/[^1-9]/g, '');", 1, "number-input", 3, "ngModelChange", "ngModel", "max", "min", "maxLength"], ["mat-stroked-button", "", 1, "mr-1", 3, "click", "title"]],
    template: function ExportDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 0)(4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Options for image export:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "label", 1)(7, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ExportDialogComponent_Template_input_change_7_listener($event) {
          return ctx.updateWithTitle($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Add title and description to image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "label", 1)(11, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ExportDialogComponent_Template_input_change_11_listener($event) {
          return ctx.updateUseWhiteBackground($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Add white background to SVG (default: transparent) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 1)(15, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ExportDialogComponent_Template_input_ngModelChange_15_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.isAnimatedSvgExport, $event) || (ctx.isAnimatedSvgExport = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_Template_span_click_16_listener() {
          return ctx.onExportAnimatedSvg();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Animated SVG");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, ExportDialogComponent_Conditional_18_Template, 5, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "br")(20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-dialog-actions")(22, "div")(23, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExportDialogComponent_Template_button_click_23_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](25, ExportDialogComponent_For_26_Template, 2, 2, "button", 6, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 5, ctx.withTitle));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 7, ctx.useWhiteBackground));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.isAnimatedSvgExport);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](18, ctx.isAnimatedSvgExport ? 18 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](ctx.options);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
    styles: [".ml-2[_ngcontent-%COMP%] {\n  margin-left: 2rem;\n}\n\n.card[_ngcontent-%COMP%] {\n  border: var(--borderGray10) solid 2px;\n  border-radius: 2px;\n  padding: 0.5rem;\n  -webkit-user-select: none; \n \n\n  user-select: none; \n\n}\n\n.number-input[_ngcontent-%COMP%] {\n  max-width: 1rem;\n  text-align: center;\n  height: 1rem;\n  align-self: center;\n  border: var(--borderGray10) solid 2px;\n  border-radius: 2px;\n  padding: 0 0.25rem;\n}\n\n.number-input[_ngcontent-%COMP%]:focus {\n  outline: none; \n\n  border-color: var(--borderGray10); \n\n  box-shadow: 0 0 5px var(--borderGray10); \n\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 0.25rem;\n  cursor: pointer;\n}\n\ninput[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvZXhwb3J0L3ByZXNlbnRhdGlvbi9leHBvcnQtZGlhbG9nL2V4cG9ydC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UscUNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQSxFQUFBLFdBQUEsRUFDQSxvQkFBQTtFQUNBLGlCQUFBLEVBQUEsb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQSxFQUFBLDJCQUFBO0VBQ0EsaUNBQUEsRUFBQSx3QkFBQTtFQUNBLHVDQUFBLEVBQUEsbUNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLm1sLTIge1xuICBtYXJnaW4tbGVmdDogMnJlbTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IHZhcigtLWJvcmRlckdyYXkxMCkgc29saWQgMnB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLyogU2FmYXJpICovXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUgMTAgYW5kIElFIDExICovXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKiBTdGFuZGFyZCBzeW50YXggKi9cbn1cblxuLm51bWJlci1pbnB1dCB7XG4gIG1heC13aWR0aDogMXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBoZWlnaHQ6IDFyZW07XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXJHcmF5MTApIHNvbGlkIDJweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBwYWRkaW5nOiAwIDAuMjVyZW07XG59XG5cbi5udW1iZXItaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lOyAvKiBSZW1vdmUgZGVmYXVsdCBvdXRsaW5lICovXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyR3JheTEwKTsgLyogQ2hhbmdlIGJvcmRlciBjb2xvciAqL1xuICBib3gtc2hhZG93OiAwIDAgNXB4IHZhcigtLWJvcmRlckdyYXkxMCk7IC8qIE9wdGlvbmFsOiBBZGQgYSBnbG93aW5nIGVmZmVjdCAqL1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZ2FwOiAwLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmlucHV0IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 43490:
/*!************************************************************!*\
  !*** ./src/app/tools/export/presentation/export.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportModule: () => (/* binding */ ExportModule)
/* harmony export */ });
/* harmony import */ var _export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./export-dialog/export-dialog.component */ 2200);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);





class ExportModule {
  static #_ = this.ɵfac = function ExportModule_Factory(t) {
    return new (t || ExportModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: ExportModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ExportModule, {
    declarations: [_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ExportDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule],
    exports: [_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ExportDialogComponent]
  });
})();

/***/ }),

/***/ 39595:
/*!*********************************************************!*\
  !*** ./src/app/tools/export/services/export.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportService: () => (/* binding */ ExportService)
/* harmony export */ });
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var src_app_tools_export_domain_export_configAndDst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/export/domain/export/configAndDst */ 23959);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/dialog/exportDialogData */ 55701);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presentation/export-dialog/export-dialog.component */ 2200);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-configuration.service */ 46527);
/* harmony import */ var src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/title/services/title.service */ 41535);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);
/* harmony import */ var src_app_tools_export_services_png_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/tools/export/services/png.service */ 82972);
/* harmony import */ var src_app_tools_export_services_svg_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/tools/export/services/svg.service */ 56837);
/* harmony import */ var _html_presentation_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./html-presentation.service */ 87047);
/* harmony import */ var _modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../modeler/services/renderer.service */ 63812);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);



















class ExportService {
  constructor(configurationService, titleService, dirtyFlagService, pngService, svgService, htmlPresentationService, rendererService, modelerService, dialogService, snackbar) {
    this.configurationService = configurationService;
    this.titleService = titleService;
    this.dirtyFlagService = dirtyFlagService;
    this.pngService = pngService;
    this.svgService = svgService;
    this.htmlPresentationService = htmlPresentationService;
    this.rendererService = rendererService;
    this.modelerService = modelerService;
    this.dialogService = dialogService;
    this.snackbar = snackbar;
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
    return new src_app_tools_export_domain_export_configAndDst__WEBPACK_IMPORTED_MODULE_1__.ConfigAndDST(this.configurationService.getCurrentConfigurationForExport(), DomainStory);
  }
  downloadDST() {
    const dst = this.getStoryForDownload();
    const configAndDST = this.createConfigAndDST(dst);
    const json = JSON.stringify(configAndDST, null, 2);
    const filename = (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString());
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
  downloadSVG(withTitle, useWhiteBackground, animationSpeed) {
    const story = this.getStoryForDownload();
    const dst = this.createConfigAndDST(story);
    const svgData = this.svgService.createSVGData(this.title, this.description, dst, withTitle, useWhiteBackground, animationSpeed);
    this.downloadFile(svgData, 'data:application/bpmn20-xml;charset=UTF-8,', (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString()), '.egn.svg', true);
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
        ele.setAttribute('download', (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title) + '_' + this.getCurrentDateString() + '.png');
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
  downloadHTMLPresentation(modeler) {
    const filename = (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeForDesktop)(this.title + '_' + this.getCurrentDateString());
    this.htmlPresentationService.downloadHTMLPresentation(filename, modeler).then();
  }
  getStoryForDownload() {
    let story = this.rendererService.getStory().sort((objA, objB) => {
      if (objA.id !== undefined && objB.id !== undefined) {
        return objA.id.localeCompare(objB.id);
      } else {
        return 0;
      }
    });
    story.push({
      info: this.titleService.getDescription()
    });
    story.push({
      version: _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.version
    });
    return story;
  }
  getCurrentDateString() {
    return (0,_angular_common__WEBPACK_IMPORTED_MODULE_15__.formatDate)(new Date(), 'YYYY-MM-dd', 'en-GB');
  }
  openDownloadDialog() {
    if (this.isDomainStoryExportable()) {
      const SVGDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__.ExportOption('SVG', 'Download an SVG-Image with the Domain-Story embedded. Can be used to save and share your Domain-Story.', (withTitle, useWhiteBackground, animationSpeed) => this.downloadSVG(withTitle, useWhiteBackground, animationSpeed));
      const EGNDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__.ExportOption('EGN', 'Download an EGN-File with the Domain-Story. Can be used to save and share your Domain-Story.', () => this.downloadDST());
      const PNGDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__.ExportOption('PNG', 'Download a PNG-Image of the Domain-Story. This does not include the Domain-Story!', withTitle => this.downloadPNG(withTitle));
      const HTMLDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__.ExportOption('HTML-Presentation', 'Download an HTML-Presentation. This does not include the Domain-Story!', () => this.downloadHTMLPresentation(this.modelerService.getModeler()));
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      config.data = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_3__.ExportDialogData('Export', [SVGDownloadOption, EGNDownloadOption, PNGDownloadOption, HTMLDownloadOption]);
      this.dialogService.openDialog(_presentation_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_4__.ExportDialogComponent, config);
    } else {
      this.snackbar.open('No Domain Story to be exported', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_DURATION,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_5__.SNACKBAR_INFO
      });
    }
  }
  static #_ = this.ɵfac = function ExportService_Factory(t) {
    return new (t || ExportService)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_6__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_7__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_8__.DirtyFlagService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](src_app_tools_export_services_png_service__WEBPACK_IMPORTED_MODULE_9__.PngService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](src_app_tools_export_services_svg_service__WEBPACK_IMPORTED_MODULE_10__.SvgService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_html_presentation_service__WEBPACK_IMPORTED_MODULE_11__.HtmlPresentationService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_12__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_13__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_14__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjectable"]({
    token: ExportService,
    factory: ExportService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 87047:
/*!********************************************************************!*\
  !*** ./src/app/tools/export/services/html-presentation.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlPresentationService: () => (/* binding */ HtmlPresentationService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var _utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/sanitizer */ 43515);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dot */ 13280);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dot__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../replay/services/replay.service */ 3687);
/* harmony import */ var _title_services_title_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../title/services/title.service */ 41535);
/* harmony import */ var _replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../replay/services/story-creator.service */ 97720);


// @ts-ignore





/**
 * Initial idea and PR from https://github.com/indika-dev
 */
class HtmlPresentationService {
  constructor(replayService, titleService, storyCreatorService) {
    this.replayService = replayService;
    this.titleService = titleService;
    this.storyCreatorService = storyCreatorService;
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
  downloadHTMLPresentation(filename, modeler) {
    var _this = this;
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const svgData = [];
      // export all sentences of domain story
      _this.replayService.startReplay();
      try {
        const result = yield modeler.saveSVG({});
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
          const result = yield modeler.saveSVG({});
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
      element.setAttribute('download', (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__.sanitizeForDesktop)(filename) + '.html');
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
    return new (t || HtmlPresentationService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_title_services_title_service__WEBPACK_IMPORTED_MODULE_4__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_5__.StoryCreatorService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: HtmlPresentationService,
    factory: HtmlPresentationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 82972:
/*!******************************************************!*\
  !*** ./src/app/tools/export/services/png.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PngService: () => (/* binding */ PngService)
/* harmony export */ });
/* harmony import */ var src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/export/services/exportUtil */ 97563);
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
    } = (0,src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__.createTitleAndDescriptionSVGElement)(0, title, description, box.xLeft + 10, box.yUp + 20, this.width);
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

/***/ 56837:
/*!******************************************************!*\
  !*** ./src/app/tools/export/services/svg.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgService: () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/export/services/exportUtil */ 97563);
/* harmony import */ var _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/export/exportConstants */ 41646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../replay/services/story-creator.service */ 97720);





class SvgService {
  constructor(modelerService, storyCreatorService) {
    this.modelerService = modelerService;
    this.storyCreatorService = storyCreatorService;
    this.cacheData = '';
  }
  createSVGData(title, description, dst, withTitle, useWhiteBackground, animationSpeed) {
    this.cacheData = this.modelerService.getEncoded();
    let domainStorySvg = structuredClone(this.cacheData);
    if (animationSpeed) {
      domainStorySvg = this.createAnimatedSvg(domainStorySvg, animationSpeed);
    }
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
    } = (0,src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__.createTitleAndDescriptionSVGElement)(0, title, description, min_x, min_y, width);
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
  createAnimatedSvg(domainStorySvg, animationSpeed = 2) {
    const story = this.storyCreatorService.traceActivitiesAndCreateStory();
    const usedElementId = [];
    const storyLength = story.length;
    const visibleTimeInPercent = Math.floor(100 / storyLength);
    const durationOfAnimation = storyLength * animationSpeed;
    let senteceCounter = 1;
    let currentVisibleTimeInPercent = visibleTimeInPercent;
    let previouVisibleTimeInPercent = visibleTimeInPercent;
    story.forEach(sentence => {
      const objects = sentence.objects.filter(it => !usedElementId.includes(it.id));
      objects.forEach(objectId => {
        usedElementId.push(objectId.id);
        const idIndex = domainStorySvg.indexOf(objectId.id);
        const insertIdIndex = domainStorySvg.indexOf('>', idIndex);
        domainStorySvg = `${domainStorySvg.slice(0, insertIdIndex)} id="group${senteceCounter}" ${domainStorySvg.slice(insertIdIndex)}`;
        const index = domainStorySvg.indexOf(objectId.id);
        const insertIndex = domainStorySvg.indexOf('>', index) + 1;
        if (senteceCounter > 1) {
          domainStorySvg = `${domainStorySvg.slice(0, insertIndex)}
            <style>
              #group${senteceCounter} {
                  opacity: 0;
                  animation: visibilityControl${senteceCounter} ${durationOfAnimation}s infinite;
              }
              @keyframes visibilityControl${senteceCounter} {
                  ${previouVisibleTimeInPercent - 1}% { opacity: 0; }    /* Initially invisible */
                  ${previouVisibleTimeInPercent}% { opacity: 1; }  /* Starts becoming visible */
                  98% { opacity: 1; }   /* Stays visible */
                  99% { opacity: 0; }   /* Starts disappearing */
                  100% { opacity: 0; }  /* Fully invisible */
              }
            </style>  ${domainStorySvg.slice(insertIndex)}`;
        }
      });
      senteceCounter += 1;
      previouVisibleTimeInPercent = currentVisibleTimeInPercent;
      currentVisibleTimeInPercent = visibleTimeInPercent * senteceCounter;
    });
    return domainStorySvg;
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
    height = withTitle ? height + dynamicHeightOffset + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT : height;
    min_x = min_x - _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING;
    min_y = withTitle ? min_y - dynamicHeightOffset - _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT : min_y;
    viewBoxHeight = withTitle ? viewBoxHeight + dynamicHeightOffset + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.TEXTSPAN_TITLE_HEIGHT + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING : viewBoxHeight;
    viewBoxWidth = viewBoxWidth + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PADDING;
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
    return new (t || SvgService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_3__.StoryCreatorService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: SvgService,
    factory: SvgService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 61070:
/*!**********************************************************!*\
  !*** ./src/app/tools/icon-set-config/domain/allIcons.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCustomIcons: () => (/* binding */ addCustomIcons),
/* harmony export */   builtInIcons: () => (/* binding */ builtInIcons),
/* harmony export */   customIcons: () => (/* binding */ customIcons)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);

let customIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
const people = ['person', 'group', 'team', 'community', 'actor', 'collective', 'account circle', 'avatar', 'identity', 'user', 'network', 'profile', 'contacts'];
const animal = ['animal', 'pet', 'companion', 'friend'];
const vehicle = ['car', 'vehicle', 'bus', 'truck', 'train', 'motorcycle', 'taxi', 'bike', 'spaceship', 'rocket'];
const airport = ['plane', 'airport', 'take off', 'landing', 'departure', 'arriving', 'destination', 'launch', 'flight', 'space', 'science'];
const driving = ['traffic', 'walk', 'running', 'commute', 'traffic jam', 'traffic lights', 'crosswalk', 'move'];
const print = ['media', 'pc', 'computer', 'update', 'ink', 'photo', 'print', 'draft', 'office', 'attach', 'edit', 'pencil', 'pdf', 'jpeg', 'pdf to image', 'picture as pdf', 'print to pdf', 'picture in picture', 'portrait'];
const calling = ['mobile', 'cellphone', 'e-mail', 'microphone', 'message', 'content', 'contact', 'letter', 'sms', 'communication', 'letter', 'notification', 'inbox', 'send', 'incoming', 'attachments'];
const computer = ['system', 'security', 'search', 'desktop', 'dashboard', 'update', 'computer', 'pc', 'signal', 'wifi', 'wi-fi', 'tablet'];
const speaker = ['head', 'sound', 'microphone', 'acoustic', 'speaker', 'speak', 'noise', 'speaker', 'speaker phone'];
const legalSystem = ['judge', 'justice', 'legal', 'court', 'hammer', 'judgment', 'lawyer', 'trial', 'ruling', 'judicial', 'sentence', 'authority', 'auction', 'legal system', 'courtroom', 'building', 'attorney', 'witness', 'honor', 'jury'];
const infoDialogs = ['bug', 'alert', 'error', 'issue', 'warning', 'danger', 'risk', 'trouble', 'failure', 'broken', 'critical', 'caution', 'conflict', 'problem', 'info'];
const finance = ['money', 'symbol', 'cash', 'currency', 'coin', 'sign', 'payment', 'funds', 'economy', 'investment', 'banking', 'finance', 'euro', 'dollar', 'credit-card', 'master', 'visa'];
const times = ['clock', 'time', 'timer', 'smartwatch', 'hour', 'minute', 'second', 'stopwatch', 'countdown', 'clockwise', 'counter clockwise', 'schedule', 'alarm', 'snooze', 'devices'];
const rating = ['star', 'grade', 'thumb up', 'bookmark', 'label', 'book', 'hart plus', 'added', 'more', 'shortcut', 'rate', 'grading', 'credits', 'check', 'like', 'feature', 'priority', 'loved', 'save', 'preferred', 'highlight', 'selected'];
const groceries = ['menu', 'restaurant', 'lunch', 'meal', 'food', 'brunch', 'dessert', 'grocery', 'pizza', 'burger', 'snack', 'hot dog', 'soda', 'chips', 'restaurant', 'quick meal'];
const fingers = ['thumb up', 'handshake', 'touch', 'controller', 'help', 'symbol', 'pointing', 'gesture', 'wave', 'fingers', 'hand'];
const entertainment = ['recording', 'playback', 'play', 'pause', 'streaming', 'video', 'media', 'home entertainment', 'cinema', 'theatre', 'tv', 'camera', 'filming', 'webcam', 'digital', 'film', 'device', 'capture'];
// These SVGs are used to render the actors/work objects on the canvas and in the iconset configuration. For palette and context pad, icons.css is used.
const builtInIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
const person = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>', 'Person', [...people]);
builtInIcons.putEntry(person);
const group = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" viewBox="0 0 24 26"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>', 'Group', [...people]);
builtInIcons.putEntry(group);
const pet = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"/></svg>', 'Pet', [...animal]);
builtInIcons.putEntry(pet);
const conversation = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg height="48" viewBox="0 0 24 26" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>', 'Conversation', ['mobile', 'email', 'sms', 'office']);
builtInIcons.putEntry(conversation);
const world = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/></svg>', 'World', ['globe', 'language', 'travel', 'public']);
builtInIcons.putEntry(world);
const store = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/></svg>', 'Store', ['history', 'shopping', 'shop', 'archive']);
builtInIcons.putEntry(store);
const theater = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm4-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>', 'Theater', ['stadium', 'cinema', 'comedy', 'video']);
builtInIcons.putEntry(theater);
const business = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>', 'Business', ['work', 'meeting-room', 'meeting']);
builtInIcons.putEntry(business);
const water = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 16.99c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-4.45c-1.35 0-2.2.43-2.95.8-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-8.08c-.75-.38-1.58-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.37-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.93c1.35 0 2.2-.43 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V5.04c-.9 0-1.4-.25-2.05-.58zM17 8.09c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V9.49c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z"/></svg>', 'Water', ['pool', 'shower', 'swimming']);
builtInIcons.putEntry(water);
const hotel = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/></svg>', 'Hotel', ['bed', 'concierge', 'room service', 'house keeping']);
builtInIcons.putEntry(hotel);
const dining = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>', 'Dining', [...groceries]);
builtInIcons.putEntry(dining);
const gasStation = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 13.5V19H6v-7h6v1.5zm0-3.5H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>', 'Gas-station', ['gas', 'fuel', 'petrol']);
builtInIcons.putEntry(gasStation);
const meetingRoom = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 19V4h-4V3H5v16H3v2h12V6h2v15h4v-2h-2zm-6 0H7V5h6v14zm-3-8h2v2h-2z"/></svg>', 'Meeting-room', ['office', 'room', 'business', 'work', 'group', 'conversation']);
builtInIcons.putEntry(meetingRoom);
const courthouse = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>', 'Courthouse', [...legalSystem]);
builtInIcons.putEntry(courthouse);
const flag = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6L14 4z"/></svg>', 'Flag', ['bookmark', 'country', 'place']);
builtInIcons.putEntry(flag);
const place = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>', 'Place', ['flag', 'location', 'border']);
builtInIcons.putEntry(place);
const car = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>', 'Car', [...vehicle]);
builtInIcons.putEntry(car);
const bus = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm5.66 2.99H6.34C6.89 4.46 8.31 4 12 4s5.11.46 5.66.99zm.34 2V10H6V6.99h12zm-.34 9.74l-.29.27H6.63l-.29-.27C6.21 16.62 6 16.37 6 16v-4h12v4c0 .37-.21.62-.34.73z"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>', 'Bus', [...vehicle]);
builtInIcons.putEntry(bus);
const train = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.51 0 4.96.48 5.57 1H6.43c.61-.52 2.06-1 5.57-1zM6 7h5v3H6V7zm12 8.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5zm0-5.5h-5V7h5v3z"/></svg>', 'Train', [...vehicle]);
builtInIcons.putEntry(train);
const truck = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>', 'Truck', [...vehicle]);
builtInIcons.putEntry(truck);
const taxi = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>', 'Taxi', [...vehicle]);
builtInIcons.putEntry(taxi);
const bike = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>', 'Bike', [...vehicle]);
builtInIcons.putEntry(bike);
const boat = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13 3v1h-2V3h2m-1 7.11l5.38 1.77 2.39.78-1.12 3.97c-.54-.3-.94-.71-1.14-.94L16 13.96l-1.51 1.72c-.34.4-1.28 1.32-2.49 1.32s-2.15-.92-2.49-1.32L8 13.96l-1.51 1.72c-.2.23-.6.63-1.14.93l-1.13-3.96 2.4-.79L12 10.11M15 1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1zM6 9.97V6h12v3.97L12 8 6 9.97zm10 9.71c-1.22.85-2.61 1.28-4 1.28s-2.78-.43-4-1.28C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 1.26.64 2.63.97 4 .97s2.74-.32 4-.97c1.26.65 2.62.99 4 .99h2v-2h-2c-1.39 0-2.78-.47-4-1.32z"/></svg>', 'Boat', [...vehicle]);
builtInIcons.putEntry(boat);
const motorcycle = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.72 11l-2 2h-.77l-.25-.69c-.18-.48-.42-.92-.72-1.31h3.74m2.69-6H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97L15.41 5zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82C7.4 16.15 6.28 17 5 17z"/></svg>', 'Motorcycle', [...vehicle]);
builtInIcons.putEntry(motorcycle);
const plane = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>', 'Plane', [...vehicle, ...airport]);
builtInIcons.putEntry(plane);
const flightTakeoff = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"/></svg>', 'Flight-takeoff', [...airport]);
builtInIcons.putEntry(flightTakeoff);
const flightLanding = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/></svg>', 'Flight-landing', [...airport]);
builtInIcons.putEntry(flightLanding);
const shuttle = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 5H3c-1.1 0-2 .89-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-6-6zm-2 2h1l3 3h-4V7zM9 7h4v3H9V7zM3 7h4v3H3V7zm3 10.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm12 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM21 14h-.78c-.55-.61-1.34-1-2.22-1s-1.67.39-2.22 1H8.22c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3v-2h18v2z"/></svg>', 'Shuttle', [...vehicle, ...airport]);
builtInIcons.putEntry(shuttle);
const walking = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7"/></svg>', 'Walking', [...driving]);
builtInIcons.putEntry(walking);
const traffic = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 10h-3V8.86c1.72-.45 3-2 3-3.86h-3V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v1H4c0 1.86 1.28 3.41 3 3.86V10H4c0 1.86 1.28 3.41 3 3.86V15H4c0 1.86 1.28 3.41 3 3.86V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.14c1.72-.45 3-2 3-3.86h-3v-1.14c1.72-.45 3-2 3-3.86zm-5 9H9V5h6v14zm-3-1c.83 0 1.5-.67 1.5-1.5S12.83 15 12 15s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm0-4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 9c.83 0 1.5-.67 1.5-1.5S12.83 6 12 6s-1.5.67-1.5 1.5S11.17 9 12 9z"/></svg>', 'Traffic', [...driving]);
builtInIcons.putEntry(traffic);
const commute = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 4H5C3.34 4 2 5.34 2 7v8c0 1.66 1.34 3 3 3l-1 1v1h1l2-2h2v-5H4V6h9v2h2V7c0-1.66-1.34-3-3-3zM5 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66l-1.42 4.11v5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11zm-8.16.34h7.19l1.03 3h-9.25l1.03-3zM12 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>', 'Commute', [...driving]);
builtInIcons.putEntry(commute);
const system = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path d="M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z"/></svg>', 'System', ['update', 'media', 'microservice', 'pc', 'computer']);
builtInIcons.putEntry(system);
const printer = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/></svg>', 'Printer', [...print]);
builtInIcons.putEntry(printer);
const document = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>', 'Document', ['folder', 'article', 'file', 'draft', 'paper', ...print]);
builtInIcons.putEntry(document);
const folder = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path d="M9.17,6l2,2H20v10L4,18V6H9.17 M10,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2 h-8L10,4L10,4z"/></svg>', 'Folder', [...print]);
builtInIcons.putEntry(folder);
const call = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path d="M6.54,5C6.6,5.89,6.75,6.76,6.99,7.59l-1.2,1.2C5.38,7.59,5.12,6.32,5.03,5H6.54 M16.4,17.02c0.85,0.24,1.72,0.39,2.6,0.45 v1.49c-1.32-0.09-2.59-0.35-3.8-0.75L16.4,17.02 M7.5,3H4C3.45,3,3,3.45,3,4c0,9.39,7.61,17,17,17c0.55,0,1-0.45,1-1v-3.49\tc0-0.55-0.45-1-1-1c-1.24,0-2.45-0.2-3.57-0.57c-0.1-0.04-0.21-0.05-0.31-0.05c-0.26,0-0.51,0.1-0.71,0.29l-2.2,2.2 c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2C9.1,8.31,9.18,7.92,9.07,7.57C8.7,6.45,8.5,5.25,8.5,4C8.5,3.45,8.05,3,7.5,3L7.5,3z"/></svg>', 'Call', [...calling]);
builtInIcons.putEntry(call);
const email = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h24v24H0V0z"/><path fill-opacity="0.9" d="M12,1.95c-5.52,0-10,4.48-10,10s4.48,10,10,10h5v-2h-5c-4.34,0-8-3.66-8-8s3.66-8,8-8s8,3.66,8,8v1.43 c0,0.79-0.71,1.57-1.5,1.57S17,14.17,17,13.38v-1.43c0-2.76-2.24-5-5-5s-5,2.24-5,5s2.24,5,5,5c1.38,0,2.64-0.56,3.54-1.47 c0.65,0.89,1.77,1.47,2.96,1.47c1.97,0,3.5-1.6,3.5-3.57v-1.43C22,6.43,17.52,1.95,12,1.95z M12,14.95c-1.66,0-3-1.34-3-3 s1.34-3,3-3s3,1.34,3,3S13.66,14.95,12,14.95z"/></svg>', 'Email', [...calling]);
builtInIcons.putEntry(email);
const copyright = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>', 'Copyright', ['contract', 'legal', 'commercial', 'copyleft']);
builtInIcons.putEntry(copyright);
const dns = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>', 'DNS', ['server', 'domain', 'system', 'name', 'cloud']);
builtInIcons.putEntry(dns);
const settings = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>', 'Settings', [...computer]);
builtInIcons.putEntry(settings);
const cellphone = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 22h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 18H8v-1h8v1zm0-3H8V5h8v10zm0-12H8V2h8v1z"/></svg>', 'Cellphone', [...calling]);
builtInIcons.putEntry(cellphone);
const update = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 8v5l4.25 2.52.77-1.28-3.52-2.09V8zm10 2V3l-2.64 2.64C16.74 4.01 14.49 3 12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c1.93 0 3.68.79 4.95 2.05L14 10h7z"/></svg>', 'Update', [...computer]);
builtInIcons.putEntry(update);
const briefcase = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/></svg>', 'Briefcase', [...print]);
builtInIcons.putEntry(briefcase);
const microphone = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>', 'Microphone', [...print]);
builtInIcons.putEntry(microphone);
const signal = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>', 'Signal', [...computer]);
builtInIcons.putEntry(signal);
const key = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M22 19h-6v-4h-2.68c-1.14 2.42-3.6 4-6.32 4-3.86 0-7-3.14-7-7s3.14-7 7-7c2.72 0 5.17 1.58 6.32 4H24v6h-2v4zm-4-2h2v-4h2v-2H11.94l-.23-.67C11.01 8.34 9.11 7 7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.11 0 4.01-1.34 4.71-3.33l.23-.67H18v4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>', 'Key', ['keyboard', 'lock', 'security']);
builtInIcons.putEntry(key);
const pencil = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/></svg>', 'Pencil', [...print]);
builtInIcons.putEntry(pencil);
const sum = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z"/></svg>', 'Sum', ['subtract', 'result', 'math', 'mathematics']);
builtInIcons.putEntry(sum);
const headset = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 14v4h-2v-4h2M7 14v4H6c-.55 0-1-.45-1-1v-3h2m5-13c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4v1h-7v2h6c1.66 0 3-1.34 3-3V10c0-4.97-4.03-9-9-9z"/></svg>', 'Headset', ['head', 'sound', 'microphone', 'acoustic', 'speaker', 'speak', 'noise']);
builtInIcons.putEntry(headset);
const keyboard = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-3 0h2v2H5zm0-3h2v2H5zm3 6h8v2H8zm6-3h2v2h-2zm0-3h2v2h-2zm3 3h2v2h-2zm0-3h2v2h-2z"/></svg>', 'Keyboard', ['key', 'up', 'down', 'top', 'bottom', 'arrow', 'space', 'tab', 'enter', 'control', 'command', ...computer, 'mouse']);
builtInIcons.putEntry(keyboard);
const mouse = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 9c-.04-4.39-3.6-7.93-8-7.93S4.04 4.61 4 9v6c0 4.42 3.58 8 8 8s8-3.58 8-8V9zm-2 0h-5V3.16c2.81.47 4.96 2.9 5 5.84zm-7-5.84V9H6c.04-2.94 2.19-5.37 5-5.84zM18 15c0 3.31-2.69 6-6 6s-6-2.69-6-6v-4h12v4z"/></svg>', 'Mouse', ['scrolling', 'click', 'mouse up', 'mouse down', 'move']);
builtInIcons.putEntry(mouse);
const router = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16 4.2c1.5 0 3 .6 4.2 1.7l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2zm-3.3 2.5l.8.8c.7-.7 1.6-1 2.5-1s1.8.3 2.5 1l.8-.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 6H5v-4h14v4zM6 16h2v2H6zm3.5 0h2v2h-2zm3.5 0h2v2h-2z"/></svg>', 'Router', ['net', 'network', 'dns', 'domain', 'wifi', 'wi-fi']);
builtInIcons.putEntry(router);
const scanner = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.8 10.7L4.2 5l-.7 1.9L17.6 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5.5c0-.8-.5-1.6-1.2-1.8zM19 18H5v-4h14v4zM6 15h2v2H6zm4 0h8v2h-8z"/></svg>', 'Scanner', ['qr code', 'bar code', 'document', ...print]);
builtInIcons.putEntry(scanner);
const security = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>', 'Security', [...computer]);
builtInIcons.putEntry(security);
const desktop = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>', 'Desktop', [...computer]);
builtInIcons.putEntry(desktop);
const speakerPhone = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 7.07L8.43 8.5c.91-.91 2.18-1.48 3.57-1.48s2.66.57 3.57 1.48L17 7.07C15.72 5.79 13.95 5 12 5s-3.72.79-5 2.07zM12 1C8.98 1 6.24 2.23 4.25 4.21l1.41 1.41C7.28 4 9.53 3 12 3s4.72 1 6.34 2.62l1.41-1.41C17.76 2.23 15.02 1 12 1zm2.86 9.01L9.14 10C8.51 10 8 10.51 8 11.14v9.71c0 .63.51 1.14 1.14 1.14h5.71c.63 0 1.14-.51 1.14-1.14v-9.71c.01-.63-.5-1.13-1.13-1.13zM15 20H9v-8h6v8z"/></svg>', 'Speaker-phone', [...speaker]);
builtInIcons.putEntry(speakerPhone);
const tablet = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"/></svg>', 'Tablet', [...computer]);
builtInIcons.putEntry(tablet);
const label = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/></svg>', 'Label', ['book', 'bookmark', 'flag']);
builtInIcons.putEntry(label);
const receipt = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/></svg>', 'Receipt', ['order', 'email receipt']);
builtInIcons.putEntry(receipt);
const calendar = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z" /></svg>', 'Calendar', ['year', 'month', 'day', 'holiday', 'photo', 'meeting']);
builtInIcons.putEntry(calendar);
const cloud = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>', 'Cloud', [...computer]);
builtInIcons.putEntry(cloud);
const assessment = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>', 'Assessment', ['evaluation', 'rating', 'judgment', 'estimate']);
builtInIcons.putEntry(assessment);
const dashboard = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"/></svg>', 'Dashboard', [...computer]);
builtInIcons.putEntry(dashboard);
const pieChart = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.93 9H13V4.07c3.61.45 6.48 3.32 6.93 6.93zM4 12c0-4.07 3.06-7.44 7-7.93v15.86c-3.94-.49-7-3.86-7-7.93zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"/></svg>', 'Pie-chart', ['business', 'sales', 'financial', 'commercial', 'demographic', 'market']);
builtInIcons.putEntry(pieChart);
const problem = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>', 'Problem', [...infoDialogs]);
builtInIcons.putEntry(problem);
const pictureAsPdf = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9zm4 2h1v-1h-1V9h1V8h-2v5h1zm-8 0h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H9v5h1v-2zm0-2h1v1h-1V9z"/></svg>', 'Picture-as-PDF', [...print]);
builtInIcons.putEntry(pictureAsPdf);
const grid = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>', 'Grid', ['table', 'matrix', 'layout', 'grid view', 'mesh', 'pattern', 'dashboard', 'window']);
builtInIcons.putEntry(grid);
const watch = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14.31 2l.41 2.48C13.87 4.17 12.96 4 12 4c-.95 0-1.87.17-2.71.47L9.7 2h4.61m.41 17.52L14.31 22H9.7l-.41-2.47c.84.3 1.76.47 2.71.47.96 0 1.87-.17 2.72-.48M16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12s-1.19-4.81-3.04-6.27L16 0zm-4 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>', 'Watch', [...times]);
builtInIcons.putEntry(watch);
const euro = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1s.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/></svg>', 'Euro', [...finance]);
builtInIcons.putEntry(euro);
const dollar = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>', 'Dollar', [...finance]);
builtInIcons.putEntry(dollar);
const info = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg height="48" viewBox="0 0 24 26" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>', 'Info', [...infoDialogs]);
builtInIcons.putEntry(info);
const alarm = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zm4.837-6.19l4.607 3.845-1.28 1.535-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>', 'Alarm', [...infoDialogs]);
builtInIcons.putEntry(alarm);
const wrench = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M22.61 18.99l-9.08-9.08c.93-2.34.45-5.1-1.44-7C9.79.61 6.21.4 3.66 2.26L7.5 6.11 6.08 7.52 2.25 3.69C.39 6.23.6 9.82 2.9 12.11c1.86 1.86 4.57 2.35 6.89 1.48l9.11 9.11c.39.39 1.02.39 1.41 0l2.3-2.3c.4-.38.4-1.01 0-1.41zm-3 1.6l-9.46-9.46c-.61.45-1.29.72-2 .82-1.36.2-2.79-.21-3.83-1.25C3.37 9.76 2.93 8.5 3 7.26l3.09 3.09 4.24-4.24-3.09-3.09c1.24-.07 2.49.37 3.44 1.31 1.08 1.08 1.49 2.57 1.24 3.96-.12.71-.42 1.37-.88 1.96l9.45 9.45-.88.89z"/></svg>', 'Wrench', ['reset', 'build', 'plumbing', 'construction', 'tool', 'fix', 'repair', 'settings', 'mechanic', 'hardware', 'maintenance', 'spanner', 'tighten']);
builtInIcons.putEntry(wrench);
const circleArrows = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>', 'Circle-Arrows', ['refresh', 'reload', 'rewind', 'cycle', 'rotate', 'loop', 'reset', 'continuous', 'recycle', 'sync', 'return']);
builtInIcons.putEntry(circleArrows);
const creditCard = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>', 'Credit-Card', [...finance]);
builtInIcons.putEntry(creditCard);
const favorite = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>', 'Favorite', [...rating]);
builtInIcons.putEntry(favorite);
const gavel = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M1 21h12v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66 5.66-2.83 2.83L1 12.31l2.83-2.83z"/></svg>', 'Gavel', [...legalSystem]);
builtInIcons.putEntry(gavel);
const blind = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="8" cy="14" r="2"/><circle cx="12" cy="8" r="2"/><circle cx="16" cy="14" r="2"/></svg>', 'Blind', ['curtains', 'blinds', 'roller shades', 'closed', 'no sight', 'low vision']);
builtInIcons.putEntry(blind);
const hourglass = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>', 'Hourglass', ['empty', 'top', 'bottom', 'disabled', ...times]);
builtInIcons.putEntry(hourglass);
const time = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>', 'Time', [...times]);
builtInIcons.putEntry(time);
const search = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>', 'Search', [...computer, 'query', 'zoom in', 'zoom out', 'since', 'policy', 'find', 'experiment', 'labs', 'check', 'biotech', 'signal']);
builtInIcons.putEntry(search);
const shopping = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>', 'Shopping', [...finance, 'sopping card', 'selling', 'buying', 'barcode', 'price', 'business', 'mall', 'paid', 'scanner', 'change', 'store']);
builtInIcons.putEntry(shopping);
const thumbUp = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/></svg>', 'Thumb-up', [...rating, 'thumb down', 'thumb up down']);
builtInIcons.putEntry(thumbUp);
const thumbDown = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z"/></svg>', 'Thumb-down', [...rating, 'thumb up', 'thumb up down']);
builtInIcons.putEntry(thumbDown);
const thumbUpDown = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm-2 1.13L7.92 12H2V6.21l1.93-1.93L3.36 7H10v.13zM22.5 10h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5zm-.5 7.79l-1.93 1.93.57-2.72H14v-.13L16.08 12H22v5.79z"/></svg>', 'Thumb-up-down', [...rating, 'thumb down', 'thumb down']);
builtInIcons.putEntry(thumbUpDown);
const couch = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 9V7c0-1.65-1.35-3-3-3H6C4.35 4 3 5.35 3 7v2c-1.65 0-3 1.35-3 3v5c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3v-5c0-1.65-1.35-3-3-3zM5 7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v2.78c-.61.55-1 1.34-1 2.22v2H6v-2c0-.88-.39-1.67-1-2.22V7zm17 10c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v4h16v-4c0-.55.45-1 1-1s1 .45 1 1v5z"/></svg>', 'Couch', ['chair', 'weekend', 'scene', 'living', 'sofa', 'furniture', 'seat', 'rest', 'relax', 'living room', 'comfort', 'interior design']);
builtInIcons.putEntry(couch);
const attach = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 28"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>', 'Attach', ['file', 'ling', 'email', 'media', 'money', 'include', 'pin', 'append', 'drag and drop', 'combine', 'join', 'insert', 'upload']);
builtInIcons.putEntry(attach);
const ruler = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>', 'Ruler', ['design service', 'straighten', 'square foot', 'measuring tool', 'scale', 'geometry', 'math', 'length', 'inch', 'meter', 'line', 'precision']);
builtInIcons.putEntry(ruler);
const education = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>', 'Education', ['school', 'learning', 'books', 'teacher', 'student', 'classroom', 'knowledge', 'graduation', 'academics', 'academy', 'university', 'pencil', 'e-learning', 'literacy', 'research', 'tutoring']);
builtInIcons.putEntry(education);
const howToReg = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path fill-rule="evenodd" clip-rule="evenodd" fill="none" d="M0 0h24v24H0z"/><g fill-rule="evenodd" clip-rule="evenodd"><path d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"/><path d="M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z"/></g></svg>', 'How-To-Reg', ['registration', 'sign up', 'guid', 'tutorial', 'help', 'support']);
builtInIcons.putEntry(howToReg);
const viewList = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M3 5v14h17V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm13 2H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z"/></svg>', 'View-List', ['filtered list', 'sorted', 'check list', 'summarized', 'items', 'data list', 'menu', 'catalog', 'overview', 'table', 'content List', 'grid view']);
builtInIcons.putEntry(viewList);
const accessible = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><circle cx="12" cy="4" r="2"/><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-9 7c-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07c-.41 1.16-1.52 2-2.83 2z"/></svg>', 'Accessible', ['subtitles', 'caption', 'forward', 'blind', 'disability', 'wheelchair', 'hearing', 'support', 'handicap', 'barrier free']);
builtInIcons.putEntry(accessible);
const accountCircle = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z"/><path d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></g></g></svg>', 'Account-Circle', [...people]);
builtInIcons.putEntry(accountCircle);
const assignment = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/></svg>', 'Assignment', ['task', 'projekt', 'work', 'due date', 'homework', 'list', 'checklist', 'introduction', 'schedule']);
builtInIcons.putEntry(assignment);
const battery = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M17,5v16c0,0.55-0.45,1-1,1H8c-0.55,0-1-0.45-1-1V5c0-0.55,0.45-1,1-1h2V2h4v2h2C16.55,4,17,4.45,17,5z M15,6H9v14h6V6z"/></g></svg>', 'Battery', ['full', 'empty', 'charge', 'low', 'charging 90', 'charging 80', 'status', 'power', 'capacity', 'recharge', 'ac/dc', 'power source', 'lithium ion', 'power bank', 'electronics', 'energy', 'voltage']);
builtInIcons.putEntry(battery);
const book = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"/></svg>', 'Book', [...rating]);
builtInIcons.putEntry(book);
const bug = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-4 4v3c0 .22-.03.47-.07.7l-.1.65-.37.65c-.72 1.24-2.04 2-3.46 2s-2.74-.77-3.46-2l-.37-.64-.1-.65C8.03 15.48 8 15.23 8 15v-4c0-.23.03-.48.07-.7l.1-.65.37-.65c.3-.52.72-.97 1.21-1.31l.57-.39.74-.18c.31-.08.63-.12.94-.12.32 0 .63.04.95.12l.68.16.61.42c.5.34.91.78 1.21 1.31l.38.65.1.65c.04.22.07.47.07.69v1zm-6 2h4v2h-4zm0-4h4v2h-4z"/></svg>', 'Bug', [...infoDialogs, 'report', 'nature', 'software', 'code', 'defect', 'fault', 'malfunction', 'debugging', 'insect']);
builtInIcons.putEntry(bug);
const changeHistory = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/></svg>', 'Change-History', ['schedule', 'update', 'timeline', 'logging', 'backup', 'restore', 'documentation', 'tracking', 'vision control']);
builtInIcons.putEntry(changeHistory);
const checkCircle = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>', 'Check-Circle', ['confirmation', 'done', 'verified', 'approval', 'checked', 'complete', 'green check', 'mark', 'success', 'finish', 'good']);
builtInIcons.putEntry(checkCircle);
const code = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>', 'Code', ['terminal', 'console', ...computer, 'password', 'barcode', 'programming', 'developer', 'script', 'software', 'syntax', 'security']);
builtInIcons.putEntry(code);
const contactMail = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6h-7v5h7V6zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7v1zM9 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.59c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.41zM5.48 16c.74-.5 2.22-1 3.52-1s2.77.49 3.52 1H5.48z"/></svg>', 'Contact-Mail', [...calling]);
builtInIcons.putEntry(contactMail);
const crop = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"/></svg>', 'Crop', ['screenshot', 'landscape', 'transform', 'cut', 'framing', 'select area', 'trimming', 'crop tool', 'rectangle', 'square']);
builtInIcons.putEntry(crop);
const dvr = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-2-9H8v2h11V8zm0 4H8v2h11v-2zM7 8H5v2h2V8zm0 4H5v2h2v-2z"/></svg>', 'DVR', [...entertainment]);
builtInIcons.putEntry(dvr);
const error = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>', 'Error', [...infoDialogs]);
builtInIcons.putEntry(error);
const extension = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.5 4.5c.28 0 .5.22.5.5v2h6v6h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2v6h-2.12c-.68-1.75-2.39-3-4.38-3s-3.7 1.25-4.38 3H4v-2.12c1.75-.68 3-2.39 3-4.38 0-1.99-1.24-3.7-2.99-4.38L4 7h6V5c0-.28.22-.5.5-.5m0-2C9.12 2.5 8 3.62 8 5H4c-1.1 0-1.99.9-1.99 2v3.8h.29c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-.3c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7v.3H17c1.1 0 2-.9 2-2v-4c1.38 0 2.5-1.12 2.5-2.5S20.38 11 19 11V7c0-1.1-.9-2-2-2h-4c0-1.38-1.12-2.5-2.5-2.5z"/></svg>', 'Extension', ['add on', 'plugin', 'feature', 'modification', 'utility', 'package', 'upgrade', 'update', 'software', 'tool']);
builtInIcons.putEntry(extension);
const face = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"/></svg>', 'Face', [...people, 'smile', 'emotion', 'expression', 'head', 'mask', 'appearance', 'character']);
builtInIcons.putEntry(face);
const fastfood = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21.98c0 .56.45 1.01 1.01 1.01H15c.56 0 1.01-.45 1.01-1.01V21H1v.98zM8.5 8.99C4.75 8.99 1 11 1 15h15c0-4-3.75-6.01-7.5-6.01zM3.62 13c1.11-1.55 3.47-2.01 4.88-2.01s3.77.46 4.88 2.01H3.62zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5h-5z"/></svg>', 'Fastfood', [...groceries]);
builtInIcons.putEntry(fastfood);
const fingerprint = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/></svg>', 'Fingerprint', ['security', 'crime', 'authentication', 'identity', 'access', 'login']);
builtInIcons.putEntry(fingerprint);
const hand = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 24h-6.55c-1.08 0-2.14-.45-2.89-1.23l-7.3-7.61 2.07-1.83c.62-.55 1.53-.66 2.26-.27L8 14.34V4.79c0-1.38 1.12-2.5 2.5-2.5.17 0 .34.02.51.05.09-1.3 1.17-2.33 2.49-2.33.86 0 1.61.43 2.06 1.09.29-.12.61-.18.94-.18 1.38 0 2.5 1.12 2.5 2.5v.28c.16-.03.33-.05.5-.05 1.38 0 2.5 1.12 2.5 2.5V20c0 2.21-1.79 4-4 4zM4.14 15.28l5.86 6.1c.38.39.9.62 1.44.62H18c1.1 0 2-.9 2-2V6.15c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V3.42c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V2.51c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V4.79c0-.28-.22-.5-.5-.5s-.5.23-.5.5v12.87l-5.35-2.83-.51.45z"/></svg>', 'Hand', [...fingers]);
builtInIcons.putEntry(hand);
const help = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>', 'Help', [...fingers]);
builtInIcons.putEntry(help);
const image = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>', 'Image', [...print]);
builtInIcons.putEntry(image);
const lightbulb = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>', 'Lightbulb', ['fluorescent', 'circle', 'idea', 'inspiration', 'creativity', 'illumination', 'energy', 'solution', 'lightning', 'lamp', 'vision', 'glow', 'light source']);
builtInIcons.putEntry(lightbulb);
const lock = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>', 'Lock', ['key', 'timer', 'schedule', 'grid view', 'face', 'password', 'security', 'safety', 'secure', 'unlock', 'access', 'protection']);
builtInIcons.putEntry(lock);
const loyalty = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/><path d="M8.9 12.55c0 .57.23 1.07.6 1.45l3.5 3.5 3.5-3.5c.37-.37.6-.89.6-1.45 0-1.13-.92-2.05-2.05-2.05-.57 0-1.08.23-1.45.6l-.6.6-.6-.59c-.37-.38-.89-.61-1.45-.61-1.13 0-2.05.92-2.05 2.05z"/></svg>', 'Loyalty', ['dog', 'trust', 'partnership', 'honor', 'faithfulness', 'long therm']);
builtInIcons.putEntry(loyalty);
const pictureInPicture = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zm4-8H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>', 'Picture-in-Picture', [...print]);
builtInIcons.putEntry(pictureInPicture);
const portrait = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.42zM8.48 16c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48zM19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>', 'Portrait', [...people, ...print]);
builtInIcons.putEntry(portrait);
const rocket = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M14,11c0-1.1-0.9-2-2-2s-2,0.9-2,2s0.9,2,2,2S14,12.1,14,11z M7.98,18.25c-0.29-0.9-0.57-1.94-0.76-3L6,16.07v2.98 L7.98,18.25z M12,2c0,0,5,2,5,11l2.11,1.41c0.56,0.37,0.89,1,0.89,1.66V22l-5-2H9l-5,2v-5.93c0-0.67,0.33-1.29,0.89-1.66L7,13 C7,4,12,2,12,2z M12,4.36c0,0-3,2.02-3,8.64c0,2.25,1,5,1,5h4c0,0,1-2.75,1-5C15,6.38,12,4.36,12,4.36z M18,19.05v-2.98 l-1.22-0.81c-0.19,1.05-0.47,2.1-0.76,3L18,19.05z"/></g></g></g></svg>', 'Rocket', [...vehicle, ...airport]);
builtInIcons.putEntry(rocket);
const satellite = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M21,14l2,0c0,4.97-4.03,9-9,9l0-2C17.87,21,21,17.87,21,14z M14,17l0,2c2.76,0,5-2.24,5-5l-2,0C17,15.66,15.66,17,14,17z M18.26,0.59l3.54,3.54c0.78,0.78,0.78,2.05,0,2.83l-3.18,3.18c-0.78,0.78-2.05,0.78-2.83,0l-1.24-1.24L13.84,9.6l1.24,1.24 c0.78,0.78,0.78,2.05,0,2.83l-1.41,1.41c-0.78,0.78-2.05,0.78-2.83,0L9.6,13.84l-0.71,0.71l1.24,1.24c0.78,0.78,0.78,2.05,0,2.83 L6.95,21.8c-0.78,0.78-2.05,0.78-2.83,0l-3.54-3.54c-0.78-0.78-0.78-2.05,0-2.83l3.18-3.18c0.78-0.78,2.05-0.78,2.83,0l1.24,1.24 l0.71-0.71L7.3,11.55c-0.78-0.78-0.78-2.05,0-2.83L8.72,7.3c0.78-0.78,2.05-0.78,2.83,0l1.24,1.24l0.71-0.71L12.25,6.6 c-0.78-0.78-0.78-2.05,0-2.83l3.18-3.18C16.22-0.2,17.48-0.2,18.26,0.59z M3.06,15.79L2,16.85l3.54,3.54l1.06-1.06L3.06,15.79z M5.18,13.67l-1.06,1.06l3.54,3.54l1.06-1.06L5.18,13.67z M10.13,8.72l-1.41,1.41l3.54,3.54l1.41-1.41L10.13,8.72z M14.73,4.12 l-1.06,1.06l3.54,3.54l1.06-1.06L14.73,4.12z M16.85,2l-1.06,1.06l3.54,3.54l1.06-1.06L16.85,2z"/></g></svg>', 'Satellite', [...airport]);
builtInIcons.putEntry(satellite);
const share = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>', 'Share', ['send', 'link', 'mobile', 'location', 'upload', 'download', ...calling]);
builtInIcons.putEntry(share);
const slideshow = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>', 'Slideshow', ['send', 'link', 'mobile', 'location', 'upload', 'download', ...calling]);
builtInIcons.putEntry(slideshow);
const star = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>', 'Star', [...rating]);
builtInIcons.putEntry(star);
const sun = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"/></svg>', 'Sun', ['light mode', 'solar power', 'clear day', 'curtains', 'star', 'summer', 'warm', 'energy']);
builtInIcons.putEntry(sun);
const table = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21.96,9.73l-1.43-5C20.41,4.3,20.02,4,19.57,4H4.43C3.98,4,3.59,4.3,3.47,4.73l-1.43,5C1.86,10.36,2.34,11,3,11h2.2L4,20 h2l0.67-5h10.67L18,20h2l-1.2-9H21C21.66,11,22.14,10.36,21.96,9.73z M6.93,13l0.27-2h9.6l0.27,2H6.93z M4.33,9l0.86-3h13.63 l0.86,3H4.33z"/></g></g></svg>', 'Table', ['device', 'furniture', 'desk', 'dining', 'meeting']);
builtInIcons.putEntry(table);
const videocam = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"/></svg>', 'Videocam', [...entertainment]);
builtInIcons.putEntry(videocam);
const wysiwyg = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Entry('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/><path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.11,3,19,3z M19,19H5V7h14V19z M17,12H7v-2 h10V12z M13,16H7v-2h6V16z"/></g></svg>', 'Wysiwyg', ['editor', 'design', 'content', 'user interface', 'page builder', 'layout', 'preview', 'templates']);
builtInIcons.putEntry(wysiwyg);
function addCustomIcons(newIcons) {
  for (const key in newIcons.keysArray().entries()) {
    customIcons.add(newIcons.get(key), key);
  }
}

/***/ }),

/***/ 26976:
/*!*******************************************************************!*\
  !*** ./src/app/tools/icon-set-config/domain/iconConfiguration.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconConfiguration: () => (/* binding */ IconConfiguration),
/* harmony export */   defaultIconSet: () => (/* binding */ defaultIconSet)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/icon-set-config/domain/allIcons */ 61070);
/* harmony import */ var src_app_domain_entities_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/configuration */ 56165);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);




class IconConfiguration {
  constructor(allIconDictionary) {
    this.iconSetName = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME;
    this.allIconDictionary = allIconDictionary;
  }
  getDefaultConf() {
    return defaultIconSet;
  }
  addCustomIcons(actors, actorsDict, workObjects, workObjectsDict) {
    const newCustomIcons = {};
    actors.forEach(name => {
      if (!this.allIconDictionary.has(name)) {
        newCustomIcons[name] = actorsDict.get(name);
      }
    });
    workObjects.forEach(name => {
      if (!this.allIconDictionary.has(name)) {
        newCustomIcons[name] = workObjectsDict.get(name);
      }
    });
    const customIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    Object.keys(newCustomIcons).forEach(key => {
      customIcons.set(key, newCustomIcons[key]);
    });
    (0,src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_1__.addCustomIcons)(customIcons);
  }
  createCustomConf(iconSetConfiguration) {
    this.iconSetName = iconSetConfiguration.name;
    let actors = iconSetConfiguration.actors;
    let workObjects = iconSetConfiguration.workObjects;
    this.addCustomIcons(actors.keysArray(), actors, workObjects.keysArray(), workObjects);
    return new src_app_domain_entities_configuration__WEBPACK_IMPORTED_MODULE_2__.Configuration(actors.keysArray(), workObjects.keysArray());
  }
}
const defaultIconSet = {
  actors: ['Person', 'Group', 'System'],
  workObjects: ['Document', 'Folder', 'Call', 'Email', 'Conversation', 'Info']
};

/***/ }),

/***/ 76954:
/*!*******************************************************************!*\
  !*** ./src/app/tools/icon-set-config/domain/iconFilterOptions.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconFilterOptions: () => (/* binding */ IconFilterOptions)
/* harmony export */ });
var IconFilterOptions;
(function (IconFilterOptions) {
  IconFilterOptions["ONLY_ACTORS"] = "ICON_FILTER_ACTOR";
  IconFilterOptions["ONLY_WORKOBJECTS"] = "ICON_FILTER_WORKOBJECT";
  IconFilterOptions["ONLY_UNASSIGNED"] = "ICON_FILTER_UNASSIGNED";
  IconFilterOptions["NO_FILTER"] = "";
})(IconFilterOptions || (IconFilterOptions = {}));

/***/ }),

/***/ 21135:
/*!*****************************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/details-list-item/details-list-item.component.ts ***!
  \*****************************************************************************************************/
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
    styles: [".icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  padding-right: 3px;\n}\n\n.detailsListItem[_ngcontent-%COMP%] {\n  display: flex;\n  justify-items: center;\n  align-items: center;\n  width: 250px;\n}\n\n.iconName[_ngcontent-%COMP%] {\n  max-width: 225px;\n  word-wrap: anywhere;\n  white-space: pre-wrap !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9kZXRhaWxzLWxpc3QtaXRlbS9kZXRhaWxzLWxpc3QtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvbiB7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDNweDtcbn1cblxuLmRldGFpbHNMaXN0SXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDI1MHB4O1xufVxuXG4uaWNvbk5hbWUge1xuICBtYXgtd2lkdGg6IDIyNXB4O1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXAgIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 10665:
/*!***********************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-list-item/icon-list-item.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconListItemComponent: () => (/* binding */ IconListItemComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/icon-set-customization.service */ 46252);
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
      img.src = '' + this.icon?.value?.svg;
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
    return new (t || IconListItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__.IconSetCustomizationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: IconListItemComponent,
    selectors: [["app-icon-list-item"]],
    inputs: {
      iconName: "iconName"
    },
    decls: 16,
    vars: 14,
    consts: [[1, "content"], ["src", "", 1, "icon", 3, "id", "alt"], [1, "name"], [1, "footer"], [3, "hideSingleSelectionIndicator"], [3, "change", "value", "checked"], [1, "toggleButtonTitle"]],
    template: function IconListItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3)(6, "mat-button-toggle-group", 4)(7, "mat-button-toggle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_7_listener() {
          return ctx.toggleNone();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "None");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-button-toggle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_10_listener() {
          return ctx.toggleActor();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Actor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-button-toggle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function IconListItemComponent_Template_mat_button_toggle_change_13_listener() {
          return ctx.toggleWorkobject();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Work Object");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hideSingleSelectionIndicator", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
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
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto;\n  justify-items: center;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n}\n\n.name[_ngcontent-%COMP%] {\n  word-wrap: anywhere;\n  max-height: 75px;\n  overflow: hidden;\n  padding-bottom: 2px;\n}\n\n.footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.footer[_ngcontent-%COMP%]    .mat-button-toggle-label-content {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonActor button {\n  background-color: #eedddd;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonWorkObject button {\n  background-color: #a4d7e1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9pY29uLWxpc3QtaXRlbS9pY29uLWxpc3QtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSw2QkFBQTtFQUNBLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQUNGO0FBQ0U7RUFDRSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsK0JBQUE7QUFDSjtBQUVFO0VBQ0UseUJBQUE7QUFBSjtBQUdFO0VBQ0UseUJBQUE7QUFESiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbn1cblxuLmljb24ge1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xufVxuXG4ubmFtZSB7XG4gIHdvcmQtd3JhcDogYW55d2hlcmU7XG4gIG1heC1oZWlnaHQ6IDc1cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmctYm90dG9tOiAycHg7XG59XG5cbi5mb290ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICA6Om5nLWRlZXAubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudCB7XG4gICAgZm9udC1zaXplOiAxMHB0ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZzogMCA1cHggIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xuICB9XG5cbiAgOjpuZy1kZWVwLmFjdGl2ZU1hdEJ1dHRvbkFjdG9yIGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZGRkZDtcbiAgfVxuXG4gIDo6bmctZGVlcC5hY3RpdmVNYXRCdXR0b25Xb3JrT2JqZWN0IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E0ZDdlMTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 92324:
/*!******************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-set-config.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigModule: () => (/* binding */ IconSetConfigModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./details-list-item/details-list-item.component */ 21135);
/* harmony import */ var _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon-list-item/icon-list-item.component */ 10665);
/* harmony import */ var _icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-set-configuration/icon-set-configuration.component */ 26103);
/* harmony import */ var _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon-set-details/icon-set-details.component */ 31415);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);







class IconSetConfigModule {
  static #_ = this.ɵfac = function IconSetConfigModule_Factory(t) {
    return new (t || IconSetConfigModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: IconSetConfigModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](IconSetConfigModule, {
    declarations: [_details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_1__.DetailsListItemComponent, _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_2__.IconListItemComponent, _icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationComponent, _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_4__.IconSetDetailsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule],
    exports: [_details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_1__.DetailsListItemComponent, _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_2__.IconListItemComponent, _icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationComponent, _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_4__.IconSetDetailsComponent]
  });
})();

/***/ }),

/***/ 26103:
/*!***************************************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-set-configuration/icon-set-configuration.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigurationComponent: () => (/* binding */ IconSetConfigurationComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../domain/iconFilterOptions */ 76954);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-configuration.service */ 46527);
/* harmony import */ var _services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/icon-set-customization.service */ 46252);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icon-list-item/icon-list-item.component */ 10665);
/* harmony import */ var _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../icon-set-details/icon-set-details.component */ 31415);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 39191);
















function IconSetConfigurationComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-icon-list-item", 18);
  }
  if (rf & 2) {
    const iconName_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("iconName", iconName_r1);
  }
}
class IconSetConfigurationComponent {
  constructor(iconSetConfigurationService, iconDictionaryService, iconSetCustomizationService, elementRegistryService) {
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.iconDictionaryService = iconDictionaryService;
    this.iconSetCustomizationService = iconSetCustomizationService;
    this.elementRegistryService = elementRegistryService;
    this.filter = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.NO_FILTER);
    this.selectedActors = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject([]);
    this.selectedWorkobjects = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject([]);
    this.allIconNames = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject([]);
    this.allFilteredIconNames = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject([]);
    this.iconSetConfigurationTypes = this.iconSetCustomizationService.getIconSetConfiguration().value;
    this.allIcons = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(this.iconDictionaryService.getFullDictionary());
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
    return a.toLowerCase().localeCompare(b.toLowerCase());
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
  /** Add Custom Icon **/
  startIconUpload() {
    document.getElementById('importIcon')?.click();
  }
  importIcon() {
    // @ts-ignore
    const files = document.getElementById('importIcon').files;
    for (let iconInputFile of files) {
      const reader = new FileReader();
      const name = (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__.sanitizeIconName)(iconInputFile.name);
      const iconName = name + '-custom'; // this suffix helps users to see which icons they uploaded; it should not be used to check if an icon is actually custom or not since this convention was introduce after v1.3.0 and is therefore not reliable information
      reader.onloadend = e => {
        if (e.target) {
          const src = e.target.result;
          this.iconDictionaryService.addIMGToIconDictionary(src, iconName);
          // TODO: td: What kind of type is it here?
          this.iconDictionaryService.registerIconForBPMN(iconName, src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_0__.ICON_PREFIX + iconName.toLowerCase(), _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
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
      const config = this.iconSetConfigurationService.createIconSetConfiguration(configFromFile);
      this.iconSetConfigurationService.loadConfiguration(config, false);
      this.iconSetCustomizationService.importConfiguration(config);
      this.allIcons.next(this.iconDictionaryService.getFullDictionary());
      this.filter.next(this.filter.value);
    };
    reader.readAsText(iconSetInputFile);
  }
  /** Filter **/
  filterForActors() {
    if (this.filter.value !== _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_ACTORS) {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_ACTORS);
    } else {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.NO_FILTER);
    }
  }
  filterForWorkobjects() {
    if (this.filter.value !== _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_WORKOBJECTS) {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_WORKOBJECTS);
    } else {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.NO_FILTER);
    }
  }
  filterForUnassigned() {
    if (this.filter.value !== _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_UNASSIGNED) {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_UNASSIGNED);
    } else {
      this.filter.next(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.NO_FILTER);
    }
  }
  filterByNameAndType($event) {
    const filteredByKeyWord = this.allIcons.value.all().filter(entry => entry.keyWords.some(key => {
      return key.toLowerCase().includes($event.target.value.toLowerCase());
    })).map(entry => entry.key);
    const filteredByNameAndType = this.getFilteredNamesForType(this.filter.value).filter(name => name.toLowerCase().includes($event.target.value.toLowerCase()) || filteredByKeyWord.includes(name));
    this.allFilteredIconNames.next(filteredByNameAndType.sort(this.sortByName));
  }
  getFilteredNamesForType(type) {
    let allFiltered = [];
    switch (type) {
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.NO_FILTER:
        allFiltered = this.allIconNames.value;
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_ACTORS:
        allFiltered = this.allIconNames.value.filter(name => this.iconSetCustomizationService.isIconActor(name));
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_WORKOBJECTS:
        allFiltered = this.allIconNames.value.filter(name => this.iconSetCustomizationService.isIconWorkObject(name));
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_3__.IconFilterOptions.ONLY_UNASSIGNED:
        allFiltered = this.allIconNames.value.filter(name => !this.iconSetCustomizationService.isIconActor(name) && !this.iconSetCustomizationService.isIconWorkObject(name));
        break;
    }
    return allFiltered;
  }
  static #_ = this.ɵfac = function IconSetConfigurationComponent_Factory(t) {
    return new (t || IconSetConfigurationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_tools_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_0__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_5__.IconSetCustomizationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__.ElementRegistryService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: IconSetConfigurationComponent,
    selectors: [["app-icon-set-configuration"]],
    decls: 45,
    vars: 14,
    consts: [[1, "content"], [1, "header"], [1, "searchbar"], [1, "heading"], ["mat-button", "", "title", "Unassigned Icons", 3, "click"], ["mat-button", "", "title", "Icons used as actors", 3, "click"], ["mat-button", "", "title", "Icons used as work objects", 3, "click"], ["color", "accent", "subscriptSizing", "dynamic", "appearance", "outline", 1, "searchForm", "dense-8"], ["matInput", "", "type", "text", 3, "input"], [1, "buttons"], ["mat-stroked-button", "", "title", "Import icon set", 1, "mr-1", 3, "click"], ["type", "file", "accept", ".domain, .iconset", "id", "importDomain", "name", "file", "onclick", "this.value=null", 2, "display", "none", 3, "change"], ["mat-stroked-button", "", "title", "Upload icon", 1, "mr-1", 3, "click"], ["type", "file", "multiple", "", "accept", ".svg, image/png, image/jpeg, image/gif, image/bpmn", "id", "importIcon", "name", "file", "onclick", "this.value=null", 2, "display", "none", 3, "change"], ["mat-stroked-button", "", "title", "Reset to default icon set", 1, "mr-1", 3, "click"], ["mat-stroked-button", "", "title", "Cancel changes", 1, "mr-1", 3, "click"], ["mat-flat-button", "", "title", "Save changes", "color", "primary", 1, "mr-1", 3, "click"], [1, "iconList", "smallScrollbar"], [3, "iconName"]],
    template: function IconSetConfigurationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "div", 1)(3, "div", 2)(4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Filter:");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_6_listener() {
          return ctx.filterForUnassigned();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Unassigned");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_10_listener() {
          return ctx.filterForActors();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13, "Actors");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_14_listener() {
          return ctx.filterForWorkobjects();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](17, "Work Objects");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "mat-form-field", 7)(19, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, "Search icons");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("input", function IconSetConfigurationComponent_Template_input_input_21_listener($event) {
          return ctx.filterByNameAndType($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "div", 9)(23, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_23_listener() {
          return ctx.startIconSetImport();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](24, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](25, "Import icon set");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_26_listener() {
          return ctx.importIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_27_listener() {
          return ctx.startIconUpload();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "Upload icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_30_listener() {
          return ctx.importIcon();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_31_listener() {
          return ctx.loadMinimalIconConfigurationWithDefaultIcons();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](32, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](33, "Reset to default");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_34_listener() {
          return ctx.loadInitialConfiguration();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](36, "Cancel changes");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_37_listener() {
          return ctx.saveIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](38, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39, "Save changes");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](40, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeaterCreate"](41, IconSetConfigurationComponent_For_42_Template, 1, 1, "app-icon-list-item", 18, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](43, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](44, "app-icon-set-details");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("activeNone", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 6, ctx.filter) === "ICON_FILTER_UNASSIGNED");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("activeActor", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 8, ctx.filter) === "ICON_FILTER_ACTOR");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("activeWorkObject", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](15, 10, ctx.filter) === "ICON_FILTER_WORKOBJECT");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](43, 12, ctx.allFilteredIconNames));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _icon_list_item_icon_list_item_component__WEBPACK_IMPORTED_MODULE_7__.IconListItemComponent, _icon_set_details_icon_set_details_component__WEBPACK_IMPORTED_MODULE_8__.IconSetDetailsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
    styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto max-content;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: max-content auto;\n  height: 46px;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.searchbar[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-left: 15px;\n  margin-right: 15px;\n  align-self: center;\n  align-items: center;\n  justify-self: left;\n  height: inherit;\n}\n\n.heading[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 4px;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-self: center;\n  align-items: center;\n  justify-self: right;\n  height: inherit;\n}\n\n.activeNone[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.activeActor[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.activeWorkObject[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.searchForm[_ngcontent-%COMP%] {\n  background-color: white;\n  margin: 4px;\n}\n\n.iconList[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-y: scroll;\n  height: calc(100vh - 130px);\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: baseline;\n  margin-top: 1rem;\n  margin-left: 1rem;\n  gap: 1rem;\n}\n.iconList[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-last-child(1) {\n  margin-bottom: 1rem;\n}\n\n .mat-grid-tile .mat-grid-tile-content {\n  justify-content: inherit;\n}\n\n .mat-form-field {\n  height: 28px;\n}\n .mat-form-field .mat-mdc-text-field-wrapper {\n  height: 28px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9pY29uLXNldC1jb25maWd1cmF0aW9uL2ljb24tc2V0LWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsdUNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSx1Q0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0FBQ0Y7QUFDRTtFQUNFLG1CQUFBO0FBQ0o7O0FBSUU7RUFDRSx3QkFBQTtBQURKOztBQUtBO0VBSUUsWUFBQTtBQUxGO0FBRUU7RUFDRSxZQUFBO0FBQUoiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcbn1cblxuLmhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgYXV0bztcbiAgaGVpZ2h0OiA0NnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uc2VhcmNoYmFyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG59XG5cbi5oZWFkaW5nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xufVxuXG5idXR0b24ge1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBsaW5lLWhlaWdodDogMC45cmVtO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XG4gIGhlaWdodDogaW5oZXJpdDtcbn1cblxuLmFjdGl2ZU5vbmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5M2FjO1xufVxuXG4uYWN0aXZlQWN0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5M2FjO1xufVxuXG4uYWN0aXZlV29ya09iamVjdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDkzYWM7XG59XG5cbi5zZWFyY2hGb3JtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1hcmdpbjogNHB4O1xufVxuXG4uaWNvbkxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDEzMHB4KTtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1jb250ZW50OiBiYXNlbGluZTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIGdhcDogMXJlbTtcblxuICA6bnRoLWxhc3QtY2hpbGQoMSkge1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIH1cbn1cblxuOjpuZy1kZWVwLm1hdC1ncmlkLXRpbGUge1xuICAubWF0LWdyaWQtdGlsZS1jb250ZW50IHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGluaGVyaXQ7XG4gIH1cbn1cblxuOjpuZy1kZWVwLm1hdC1mb3JtLWZpZWxkIHtcbiAgLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gIH1cbiAgaGVpZ2h0OiAyOHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 31415:
/*!***************************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-set-details/icon-set-details.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetDetailsComponent: () => (/* binding */ IconSetDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-customization.service */ 46252);
/* harmony import */ var src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/title/services/title.service */ 41535);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../details-list-item/details-list-item.component */ 21135);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 39191);









function IconSetDetailsComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dragover", function IconSetDetailsComponent_For_18_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.allowDrop($event, "actorList"));
    })("dragstart", function IconSetDetailsComponent_For_18_Template_mat_list_item_dragstart_0_listener() {
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDragStart(i_r3, "actorList"));
    })("drop", function IconSetDetailsComponent_For_18_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const iconName_r5 = ctx_r3.$implicit;
      const i_r3 = ctx_r3.$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r5, true, i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-details-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const iconName_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r1.getIconForName(iconName_r5));
  }
}
function IconSetDetailsComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("dragover", function IconSetDetailsComponent_For_25_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.allowDrop($event, "workobjectList"));
    })("dragstart", function IconSetDetailsComponent_For_25_Template_mat_list_item_dragstart_0_listener() {
      const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDragStart(i_r7, "workobjectList"));
    })("drop", function IconSetDetailsComponent_For_25_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const iconName_r9 = ctx_r7.$implicit;
      const i_r7 = ctx_r7.$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r9, false, i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-details-list-item", 9);
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
  exportIconSet() {
    this.customizationService.exportIconSet();
  }
  static #_ = this.ɵfac = function IconSetDetailsComponent_Factory(t) {
    return new (t || IconSetDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_0__.IconSetCustomizationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_1__.TitleService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: IconSetDetailsComponent,
    selectors: [["app-icon-set-details"]],
    decls: 27,
    vars: 7,
    consts: [[1, "details", "smallScrollbar"], [1, "iconSetDetails"], ["color", "accent", 1, "exportForm"], ["matInput", "", "type", "text", "subscriptSizing", "dynamic", 1, "dense-8", 3, "input", "value"], ["mat-stroked-button", "", "title", "Export icon set", 1, "exportForm", 3, "click"], [1, "actorList"], ["draggable", "true", 1, "compactItem"], [1, "workobjectList"], ["draggable", "true", 1, "compactItem", 3, "dragover", "dragstart", "drop"], [3, "icon"]],
    template: function IconSetDetailsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Export as File:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 1)(5, "mat-form-field", 2)(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Icon set name");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function IconSetDetailsComponent_Template_input_input_8_listener($event) {
          return ctx.changeName($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IconSetDetailsComponent_Template_button_click_10_listener() {
          return ctx.exportIconSet();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Export icon set");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 5)(14, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Order of Actors:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeaterCreate"](17, IconSetDetailsComponent_For_18_Template, 2, 1, "mat-list-item", 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](19, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 7)(21, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Order of Work Objects:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeaterCreate"](24, IconSetDetailsComponent_For_25_Template, 2, 1, "mat-list-item", 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](26, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 1, ctx.iconSetName));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](19, 3, ctx.selectedActors$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](26, 5, ctx.selectedWorkobjects$));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListItem, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _details_list_item_details_list_item_component__WEBPACK_IMPORTED_MODULE_2__.DetailsListItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
    styles: [".details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 46px - 20px);\n  grid-row-gap: 4px;\n  overflow-y: auto;\n  overflow-x: auto;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.iconSetDetails[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.compactItem[_ngcontent-%COMP%] {\n  height: 40px !important;\n}\n\n.compactItem[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-left: 12px;\n}\n\n.exportForm[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  margin-right: 12px;\n  margin-top: 8px;\n  margin-bottom: 0;\n}\n\nh3[_ngcontent-%COMP%] {\n  padding-left: 12px;\n  margin-top: 8px;\n  margin-bottom: 0;\n  font-weight: bold;\n}\n\nmat-list[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n\n .mat-mdc-form-field-subscript-wrapper {\n  height: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9pY29uLXNldC1kZXRhaWxzL2ljb24tc2V0LWRldGFpbHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQ2cHggLSAyMHB4KTtcbiAgZ3JpZC1yb3ctZ2FwOiA0cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG59XG5cbi5pY29uU2V0RGV0YWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG59XG5cbi5jb21wYWN0SXRlbSB7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xufVxuXG4uY29tcGFjdEl0ZW06aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xufVxuXG4uZXhwb3J0Rm9ybSB7XG4gIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaDMge1xuICBwYWRkaW5nLWxlZnQ6IDEycHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbm1hdC1saXN0IHtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbjo6bmctZGVlcC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xuICBoZWlnaHQ6IDAgIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6932:
/*!***************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-dictionary.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_PREFIX: () => (/* binding */ ICON_PREFIX),
/* harmony export */   IconDictionaryService: () => (/* binding */ IconDictionaryService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_icon_set_config_domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/icon-set-config/domain/iconConfiguration */ 26976);
/* harmony import */ var src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/icon-set-config/domain/allIcons */ 61070);
/* harmony import */ var _utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/sanitizer */ 43515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);





var getIconId = src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.getIconId;

const ICON_PREFIX = 'icon-domain-story-';
class IconDictionaryService {
  constructor() {
    this.actorIconDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.workObjectDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.builtInIconsDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.iconDictionaryForBPMN = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    this.builtInIconsDictionary.addBuildInIcons(src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons);
    this.iconConfig = new src_app_tools_icon_set_config_domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.IconConfiguration(this.builtInIconsDictionary);
  }
  initTypeDictionaries(actors, workObjects) {
    if (!actors || actors.length == 0) {
      actors = src_app_tools_icon_set_config_domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultIconSet.actors;
    }
    if (!workObjects || workObjects.length == 0) {
      workObjects = src_app_tools_icon_set_config_domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultIconSet.workObjects;
    }
    const allTypes = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    allTypes.addBuildInIcons(src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons);
    allTypes.appendDict(this.getCustomIconsDictionary());
    this.initDictionary(actors, allTypes, this.actorIconDictionary, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    this.initDictionary(workObjects, allTypes, this.workObjectDictionary, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  }
  initDictionary(keys, allTypes, dictionary, elementType) {
    dictionary.clear();
    for (const key of keys) {
      dictionary.add(allTypes.get(key), key);
    }
    dictionary.keysArray().forEach(name => {
      this.registerIconForBPMN(name, ICON_PREFIX + (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(name.toLowerCase()), elementType);
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
    if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
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
    if (dictionaryType === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (dictionaryType === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    const allTypes = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    allTypes.addBuildInIcons(src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons);
    allTypes.appendDict(src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons);
    iconTypes.forEach(name => {
      if (!collection.has(name)) {
        const src = allTypes.get(name);
        if (src) {
          this.registerIconForType(dictionaryType, name, src);
          this.registerIconForBPMN(name, (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(ICON_PREFIX + name.toLowerCase()), dictionaryType);
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
    if (!this.allInTypeDictionary(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorIcons)) {
      this.addIconsFromIconSetConfiguration(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorIcons.map(element => getIconId(element.type)));
    }
    if (!this.allInTypeDictionary(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectIcons)) {
      this.addIconsFromIconSetConfiguration(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectIcons.map(element => getIconId(element.type)));
    }
  }
  registerIconForType(type, name, src) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    let collection = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    collection.add(src, name);
  }
  unregisterIconForType(type, name) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    let collection = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      collection = this.actorIconDictionary;
    } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      collection = this.workObjectDictionary;
    }
    collection.delete(name);
  }
  updateIconRegistries(actors, workObjects, config) {
    const elements = [];
    actors.forEach(a => elements.push(a));
    workObjects.forEach(w => elements.push(w));
    const customIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const actorsDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const workObjectsDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    config.actors.keysArray().forEach(key => {
      actorsDict.set(key, config.actors.get(key));
    });
    config.workObjects.keysArray().forEach(key => {
      workObjectsDict.set(key, config.workObjects.get(key));
    });
    this.extractCustomIconsFromDictionary(actorsDict, customIcons);
    this.extractCustomIconsFromDictionary(workObjectsDict, customIcons);
    elements.forEach(element => {
      const name = (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(element.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''));
      if ((element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT)) && !this.getFullDictionary().has(name)) {
        let elementType;
        if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR)) {
          elementType = src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR;
        } else {
          elementType = src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT;
        }
        this.registerIconForBPMN(ICON_PREFIX + name.toLowerCase(), getIconId(element.type), elementType);
      }
    });
    this.addNewIconsToDictionary(customIcons);
    this.addIconsToTypeDictionary(actors, workObjects);
  }
  extractCustomIconsFromDictionary(elementDictionary, customIcons) {
    elementDictionary.keysArray().forEach(name => {
      const sanitizedName = (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(name);
      if (!this.getFullDictionary().has(sanitizedName)) {
        customIcons.add(elementDictionary.get(name), sanitizedName);
      }
    });
  }
  /** Add new Icon(s) **/
  addNewIconsToDictionary(customIcons) {
    customIcons.keysArray().forEach(key => {
      const custom = customIcons.get(key);
      this.addIMGToIconDictionary(custom, key);
    });
    this.addIconsToCss(customIcons);
  }
  addIMGToIconDictionary(input, name) {
    src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons.set(name, input);
  }
  addIconsToCss(customIcons) {
    const sheetEl = document.getElementById('iconsCss');
    customIcons.keysArray().forEach(key => {
      const src = customIcons.get(key);
      const iconStyle = '.' + ICON_PREFIX + (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(key.toLowerCase()) + '::before{ content: url("data:image/svg+xml;utf8,' + this.wrapSRCInSVG(src) + '"); margin: 3px;}';
      // @ts-ignore
      sheetEl?.sheet?.insertRule(iconStyle, sheetEl.sheet.cssRules.length);
    });
  }
  wrapSRCInSVG(src) {
    return "<svg viewBox='0 0 22 22' width='22' height='22' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><image width='22' height='22' xlink:href='" + src + "'/></svg>";
  }
  /** Getter & Setter **/
  getFullDictionary() {
    const fullDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    fullDictionary.appendDict(this.builtInIconsDictionary);
    fullDictionary.appendDict(this.getCustomIconsDictionary());
    return fullDictionary;
  }
  getCustomIconsDictionary() {
    const appendedDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons.keysArray().forEach(key => {
      if (!this.builtInIconsDictionary.has(key)) {
        appendedDict.set(key, src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons.get(key));
      }
    });
    return appendedDict;
  }
  getIconsAssignedAs(type) {
    if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      return this.actorIconDictionary;
    } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      return this.workObjectDictionary;
    }
    return new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
  }
  getNamesOfIconsAssignedAs(type) {
    return this.getIconsAssignedAs(type).keysArray();
  }
  getTypeIconSRC(type, name) {
    if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) {
      return this.actorIconDictionary.get(name);
    } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT) {
      return this.workObjectDictionary.get(name);
    }
    return null;
  }
  getIconForBPMN(elementType, name) {
    return this.iconDictionaryForBPMN.get(`${elementType}${name}`);
  }
  getIconSource(name) {
    if (this.builtInIconsDictionary.has(name)) {
      return this.builtInIconsDictionary.get(name);
    } else if (src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons.has(name)) {
      return src_app_tools_icon_set_config_domain_allIcons__WEBPACK_IMPORTED_MODULE_3__.customIcons.get(name);
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
    return this.builtInIconsDictionary;
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

/***/ 46527:
/*!**********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-set-configuration.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigurationService: () => (/* binding */ IconSetConfigurationService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/iconConfiguration */ 26976);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/sanitizer */ 43515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _title_services_title_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../title/services/title.service */ 41535);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);










class IconSetConfigurationService {
  constructor(iconDictionaryService, elementRegistryService, titleService, storageService) {
    this.iconDictionaryService = iconDictionaryService;
    this.elementRegistryService = elementRegistryService;
    this.titleService = titleService;
    this.storageService = storageService;
  }
  setIconSetName(iconSetName) {
    this.titleService.setIconSetName(iconSetName ? iconSetName : _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME);
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
    let actorDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    let workObjectDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
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
    this.iconDictionaryService.getIconConfiguration().addCustomIcons(actorKeys, actorDict, workObjectKeys, workObjectDict);
    this.iconDictionaryService.addIconsFromIconSetConfiguration(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, actorKeys.map(a => src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR + a));
    this.iconDictionaryService.addIconsFromIconSetConfiguration(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, workObjectKeys.map(w => src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT + w));
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
      name: this.titleService.getIconSetName() || _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME,
      actors: this.iconDictionaryService.getActorsDictionary().keysArray().map(a => a.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '')),
      workObjects: this.iconDictionaryService.getWorkObjectsDictionary().keysArray().map(w => w.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''))
    };
  }
  createMinimalConfigurationWithDefaultIcons() {
    const minimalConfig = this.createConfigFromCanvas();
    _domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultIconSet.actors.forEach(iconName => {
      minimalConfig.actors.add(this.iconDictionaryService.getIconSource(iconName), iconName);
    });
    _domain_iconConfiguration__WEBPACK_IMPORTED_MODULE_2__.defaultIconSet.workObjects.forEach(iconName => {
      minimalConfig.workObjects.add(this.iconDictionaryService.getIconSource(iconName), iconName);
    });
    return minimalConfig;
  }
  createConfigFromDictionaries(actorsDict, workObjectsDict) {
    const actorNames = actorsDict.keysArray();
    const workobjectNames = workObjectsDict.keysArray();
    const newActors = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const newWorkobjects = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    // Fill Configuration from Canvas-Objects
    actorNames.forEach(actor => {
      newActors.add(actorsDict.get(actor), actor.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, ''));
    });
    workobjectNames.forEach(workObject => {
      newWorkobjects.add(workObjectsDict.get(workObject), workObject.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, ''));
    });
    return {
      name: this.titleService.getIconSetName(),
      actors: newActors,
      workObjects: newWorkobjects
    };
  }
  createIconSetConfiguration(fileConfiguration) {
    const actorsDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    const workObjectsDict = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
    Object.keys(fileConfiguration.actors).forEach(key => {
      let icon = fileConfiguration.actors[key];
      if (icon) {
        // make sure the actor has an icon
        actorsDict.add(icon, (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(key));
      }
    });
    Object.keys(fileConfiguration.workObjects).forEach(key => {
      let icon = fileConfiguration.workObjects[key];
      if (icon) {
        // make sure the work object has an icon
        workObjectsDict.add(icon, (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeIconName)(key));
      }
    });
    return {
      name: fileConfiguration.name,
      actors: actorsDict,
      workObjects: workObjectsDict
    };
  }
  getStoredIconSetConfiguration() {
    const iconSetString = this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.ICON_SET_CONFIGURATION_KEY);
    if (!iconSetString) {
      return;
    } else {
      const configurationFromFile = this.createIconSetConfiguration(JSON.parse(iconSetString));
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
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.ICON_SET_CONFIGURATION_KEY, JSON.stringify(configForStorage, null, 2));
  }
  createConfigFromCanvas() {
    const config = {
      name: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.INITIAL_ICON_SET_NAME,
      actors: new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary(),
      workObjects: new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary()
    };
    let allCanvasObjects = this.elementRegistryService.getAllCanvasObjects();
    allCanvasObjects.map(e => e.businessObject).forEach(element => {
      const type = element.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, '');
      if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.actors.add(src, type);
      } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.workObjects.add(src, type);
      }
    });
    return config;
  }
  checkValidityOfConfiguration(iconSetConfiguration) {
    return iconSetConfiguration.actors.keysArray().length > 1 && iconSetConfiguration.workObjects.keysArray().length > 1 && !iconSetConfiguration.actors.all().some(e => typeof e.value !== 'string') && !iconSetConfiguration.workObjects.all().some(e => typeof e.value !== 'string');
  }
  static #_ = this.ɵfac = function IconSetConfigurationService_Factory(t) {
    return new (t || IconSetConfigurationService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_title_services_title_service__WEBPACK_IMPORTED_MODULE_7__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_8__.StorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
    token: IconSetConfigurationService,
    factory: IconSetConfigurationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46252:
/*!**********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-set-customization.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetChangedService: () => (/* binding */ IconSetChangedService),
/* harmony export */   IconSetCustomizationService: () => (/* binding */ IconSetCustomizationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/dictionary */ 20843);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-set-configuration.service */ 46527);
/* harmony import */ var _icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon-dictionary.service */ 6932);
/* harmony import */ var _title_services_title_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../title/services/title.service */ 41535);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);




var getIconId = _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.getIconId;






/**
 * We are not allowed to call ImportDomainStoryService directly,
 * so we use this "interface" instead.
 */
class IconSetChangedService {}
class IconSetCustomizationService {
  constructor(iconSetConfigurationService, iconDictionaryService, iconSetChangedService, titleService, elementRegistryService, snackbar) {
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.iconDictionaryService = iconDictionaryService;
    this.titleService = titleService;
    this.elementRegistryService = elementRegistryService;
    this.snackbar = snackbar;
    this.allIconListItems = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.configurationHasChanged = false;
    this.selectedActors$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject([]);
    this.selectedWorkobjects$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject([]);
    this.iconSetConfigurationTypes = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(this.iconSetConfigurationService.getCurrentConfigurationNamesWithoutPrefix());
    this.selectedWorkobjects$.next(this.iconSetConfigurationTypes.value.workObjects);
    this.selectedActors$.next(this.iconSetConfigurationTypes.value.actors);
    iconDictionaryService.getAllIconDictionary().keysArray().forEach(iconName => {
      this.addIconToAllIconList(iconName);
    });
    iconSetChangedService.iconConfigrationChanged().subscribe(config => {
      this.importConfiguration(config);
    });
    const storedIconSetConfiguration = this.iconSetConfigurationService.getStoredIconSetConfiguration();
    if (storedIconSetConfiguration) {
      this.importConfiguration(storedIconSetConfiguration, false);
    }
  }
  importConfiguration(customConfig, saveIconSet = true) {
    const actorKeys = customConfig.actors.keysArray();
    const workObjectKeys = customConfig.workObjects.keysArray();
    const usedIcons = this.elementRegistryService.getUsedIcons();
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
    this.selectedActors$.value.forEach(iconName => {
      if (!actorKeys.includes(iconName) && !usedIcons.actors.includes(iconName)) {
        this.deselectActor(iconName);
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
    this.selectedWorkobjects$.value.forEach(iconName => {
      if (!workObjectKeys.includes(iconName) && !usedIcons.workobjects.includes(iconName)) {
        this.deselectWorkobject(iconName);
      }
    });
    if (saveIconSet) {
      this.saveIconSet(usedIcons, true);
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
    const defaultConfig = this.iconSetConfigurationService.createMinimalConfigurationWithDefaultIcons();
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
    this.iconSetConfigurationTypes.next(this.iconSetConfigurationService.getCurrentConfigurationNamesWithoutPrefix());
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
        this.iconSetConfigurationService.setStoredIconSetConfiguration(this.changedIconSetConfiguration);
        this.snackbar.open(imported ? 'Configuration imported successfully' : 'Configuration saved successfully', undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_SUCCESS
        });
      }
    } else {
      this.snackbar.open(imported ? 'No configuration to be imported' : 'No configuration to be saved', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
      });
    }
    if (changedActors.length || changedWorkobjects.length) {
      if (changedActors.length) {
        const actors = changedActors.join(', ');
        this.snackbar.open(`The following icons are already in use as actors and cannot be changed: ${actors}`, undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION_LONGER,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_ERROR
        });
      }
      if (changedWorkobjects.length) {
        const workobjects = changedWorkobjects.join(', ');
        this.snackbar.open(`The following icons are already in use as work objects and cannot be changed: ${workobjects}`, undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION_LONGER,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_ERROR
        });
      }
    }
  }
  exportIconSet() {
    this.iconSetConfigurationService.exportConfiguration();
  }
  getAndClearSavedConfiguration() {
    const temp = this.changedIconSetConfiguration;
    this.changedIconSetConfiguration = undefined;
    return temp;
  }
  createIconSetConfiguration() {
    const actors = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    const workObjects = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
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
    const iconDict = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    iconDict.add(this.getSrcForIcon(iconName), iconName);
    this.iconDictionaryService.addIconsToCss(iconDict);
    this.addIconToAllIconList(iconName);
  }
  addIconToAllIconList(iconName) {
    this.allIconListItems.add(new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject({
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
    if (name.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.DOMAINSTORY)) {
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
      this.iconDictionaryService.registerIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, actor, this.iconDictionaryService.getFullDictionary().get(actor));
      this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, actor);
      this.setAsActor(true, actor);
    });
    changedIconSet.workObjects.keysArray().forEach(workObject => {
      this.iconDictionaryService.registerIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, workObject, this.iconDictionaryService.getFullDictionary().get(workObject));
      this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR, workObject);
      this.setAsWorkobject(true, workObject);
    });
  }
  static #_ = this.ɵfac = function IconSetCustomizationService_Factory(t) {
    return new (t || IconSetCustomizationService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](IconSetChangedService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_title_services_title_service__WEBPACK_IMPORTED_MODULE_5__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
    token: IconSetCustomizationService,
    factory: IconSetCustomizationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 42482:
/*!**************************************************************!*\
  !*** ./src/app/tools/import/directive/dragDrop.directive.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragDirective: () => (/* binding */ DragDirective)
/* harmony export */ });
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/import-domain-story.service */ 93586);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);




class DragDirective {
  constructor(importDomainStoryService, snackbar) {
    this.importDomainStoryService = importDomainStoryService;
    this.snackbar = snackbar;
    this.background = '';
  }
  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }
  onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '';
  }
  onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '';
    if (evt.dataTransfer?.files[0]) {
      this.importDomainStoryService.performDropImport(evt.dataTransfer.files[0]);
    } else {
      this.snackbar.open('Nothing to import', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_ERROR
      });
    }
  }
  static #_ = this.ɵfac = function DragDirective_Factory(t) {
    return new (t || DragDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__.ImportDomainStoryService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({
    type: DragDirective,
    selectors: [["", "appDrag", ""]],
    hostVars: 2,
    hostBindings: function DragDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("dragover", function DragDirective_dragover_HostBindingHandler($event) {
          return ctx.onDragOver($event);
        })("dragleave", function DragDirective_dragleave_HostBindingHandler($event) {
          return ctx.onDragLeave($event);
        })("drop", function DragDirective_drop_HostBindingHandler($event) {
          return ctx.onDrop($event);
        });
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background", ctx.background);
      }
    },
    standalone: true
  });
}

/***/ }),

/***/ 88401:
/*!************************************************************************************!*\
  !*** ./src/app/tools/import/presentation/import-dialog/import-dialog.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDialogComponent: () => (/* binding */ ImportDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal/BehaviorSubject */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 39191);








class ImportDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.fileUrl = new rxjs_internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject('');
    this.fn = data;
  }
  ngOnInit() {}
  doImport() {
    this.fn(this.fileUrl.value);
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  updateUrl($event) {
    // @ts-ignore
    this.fileUrl.next($event.target.value);
  }
  static #_ = this.ɵfac = function ImportDialogComponent_Factory(t) {
    return new (t || ImportDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ImportDialogComponent,
    selectors: [["app-import-dialog"]],
    decls: 16,
    vars: 4,
    consts: [["for", "urlInput"], ["color", "accent", 1, "form-width"], ["matInput", "", "type", "url", "id", "urlInput", "subscriptSizing", "dynamic", 1, "dense-8", 3, "input", "value"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]],
    template: function ImportDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-dialog-content")(1, "label", 0)(2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Import Domain Story:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-form-field", 1)(5, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "URL");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function ImportDialogComponent_Template_input_input_7_listener($event) {
          return ctx.updateUrl($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-dialog-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div")(12, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportDialogComponent_Template_button_click_12_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportDialogComponent_Template_button_click_14_listener() {
          return ctx.doImport();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Import ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 2, ctx.fileUrl));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.fileUrl.value);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
    styles: [".form-width[_ngcontent-%COMP%] {\n  width: 40rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaW1wb3J0L3ByZXNlbnRhdGlvbi9pbXBvcnQtZGlhbG9nL2ltcG9ydC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS13aWR0aCB7XG4gIHdpZHRoOiA0MHJlbTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 39166:
/*!************************************************************!*\
  !*** ./src/app/tools/import/presentation/import.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportModule: () => (/* binding */ ImportModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import-dialog/import-dialog.component */ 88401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);




class ImportModule {
  static #_ = this.ɵfac = function ImportModule_Factory(t) {
    return new (t || ImportModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: ImportModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ImportModule, {
    declarations: [_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ImportDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule],
    exports: [_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ImportDialogComponent]
  });
})();

/***/ }),

/***/ 93586:
/*!**********************************************************************!*\
  !*** ./src/app/tools/import/services/import-domain-story.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDomainStoryService: () => (/* binding */ ImportDomainStoryService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _presentation_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presentation/import-dialog/import-dialog.component */ 88401);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_tools_import_services_import_repair_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/import/services/import-repair.service */ 56511);
/* harmony import */ var src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/title/services/title.service */ 41535);
/* harmony import */ var src_app_tools_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/modeler/services/renderer.service */ 63812);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-configuration.service */ 46527);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);















class ImportDomainStoryService {
  constructor(iconDictionaryService, importRepairService, titleService, rendererService, dialogService, iconSetConfigurationService, modelerService, snackbar) {
    this.iconDictionaryService = iconDictionaryService;
    this.importRepairService = importRepairService;
    this.titleService = titleService;
    this.rendererService = rendererService;
    this.dialogService = dialogService;
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.modelerService = modelerService;
    this.snackbar = snackbar;
    this.title = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE;
    this.description = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_DESCRIPTION;
    this.importedConfiguration = null;
    this.importedConfigurationEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
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
  iconConfigrationChanged() {
    return this.importedConfigurationEmitter.asObservable();
  }
  getConfiguration() {
    const config = {
      name: this.importedConfiguration?.name || '',
      actors: this.importedConfiguration?.actors || new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary(),
      workObjects: this.importedConfiguration?.workObjects || new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__.Dictionary()
    };
    this.importedConfiguration = null;
    return config;
  }
  performImport() {
    // @ts-ignore
    const file = document.getElementById('import').files[0];
    this.import(file, file.name);
    this.modelerService.commandStackChanged();
  }
  performDropImport(file) {
    if (this.isSupportedFileEnding(file.name)) {
      this.import(file, file.name);
    } else {
      this.snackbar.open('File type not supported', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
      });
    }
    this.modelerService.commandStackChanged();
  }
  importFromUrl(fileUrl) {
    if (!fileUrl.startsWith('http')) {
      this.snackbar.open('Url not valid', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
      });
      return;
    }
    fileUrl = this.convertToDownloadableUrl(fileUrl);
    fetch(fileUrl).then(response => {
      return response.blob();
    }).then(blob => {
      const string = fileUrl.split('/');
      const filename = string[string.length - 1].replace(/%20/g, ' ').replace(/(\.egn\.svg).*/, '$1');
      if (!filename) {
        throw new Error('Unable to extract filename from URL');
      }
      if (this.isSupportedFileEnding(filename)) {
        this.import(blob, filename);
      } else {
        this.snackbar.open('File type not supported', undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONG,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
        });
      }
      this.modelerService.commandStackChanged();
    }).catch(() => this.snackbar.open('Request blocked by server (CORS error)', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONG,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
    }));
  }
  convertToDownloadableUrl(fileUrl) {
    // Convert GitHub URLs to raw content
    const githubPattern = /https:\/\/github\.com\/(.+)\/(blob|blame)\/(.+)/;
    if (githubPattern.test(fileUrl)) {
      fileUrl = fileUrl.replace(githubPattern, 'https://raw.githubusercontent.com/$1/$3');
    }
    //Convert Dropbox URLs to dl content
    const dropboxPattern = /https:\/\/www\.dropbox\.com\/(.+)/;
    if (dropboxPattern.test(fileUrl)) {
      fileUrl = fileUrl.replace(dropboxPattern, 'https://dl.dropbox.com/$1');
    }
    return fileUrl;
  }
  isSupportedFileEnding(filename) {
    let isSupported = false;
    const dstSvgPattern = /.*(.dst)(\s*\(\d+\)){0,1}\.svg/;
    const egnSvgPattern = /.*(.egn)(\s*\(\d+\)){0,1}\.svg/;
    if (filename != null) {
      isSupported = filename.endsWith('.dst') || filename.endsWith('.egn') || filename.match(dstSvgPattern) != null || filename.match(egnSvgPattern) != null;
    }
    return isSupported;
  }
  openImportFromUrlDialog() {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = fileUrl => this.importFromUrl(fileUrl);
    this.dialogService.openDialog(_presentation_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_3__.ImportDialogComponent, config);
  }
  import(input, filename) {
    const egnSvgPattern = /.*(.egn)(\s*\(\d+\)){0,1}\.svg/;
    const isSVG = filename.endsWith('.svg');
    let isEGN = filename.endsWith('.egn');
    if (isSVG) {
      isEGN = filename.match(egnSvgPattern) != null;
    }
    try {
      const fileReader = new FileReader();
      const titleText = this.restoreTitleFromFileName(filename, isSVG);
      // no need to put this on the commandStack
      this.titleService.updateTitleAndDescription(titleText, null, false);
      fileReader.onloadend = e => {
        if (e && e.target) {
          this.fileReaderFunction(e.target.result, isSVG, isEGN);
        }
      };
      fileReader.readAsText(input);
      this.importSuccessful();
    } catch (error) {
      this.importFailed();
    }
  }
  fileReaderFunction(text, isSvgFile, isEgnFormat) {
    let contentAsJson;
    if (typeof text === 'string') {
      if (isSvgFile) {
        contentAsJson = this.extractJsonFromSvgComment(text);
      } else {
        contentAsJson = text;
      }
      let elements;
      let iconSetConfig;
      let iconSetFromFile;
      let storyAndIconSet = this.extractStoryAndIconSet(contentAsJson);
      if (storyAndIconSet == null) {
        return;
      }
      // current implementation
      if (storyAndIconSet.domain) {
        iconSetFromFile = isEgnFormat ? storyAndIconSet.domain : JSON.parse(storyAndIconSet.domain);
        iconSetConfig = this.iconSetConfigurationService.createIconSetConfiguration(iconSetFromFile);
        elements = isEgnFormat ? storyAndIconSet.dst : JSON.parse(storyAndIconSet.dst);
      } else {
        // legacy implementation
        if (storyAndIconSet.config) {
          iconSetFromFile = JSON.parse(storyAndIconSet.config);
          iconSetConfig = this.iconSetConfigurationService.createIconSetConfiguration(iconSetFromFile);
          elements = JSON.parse(storyAndIconSet.dst);
        } else {
          // even older legacy implementation (prior to configurable icon set):
          elements = JSON.parse(contentAsJson);
          iconSetConfig = this.iconSetConfigurationService.createMinimalConfigurationWithDefaultIcons();
        }
      }
      this.importRepairService.removeWhitespacesFromIcons(elements);
      const configChanged = this.checkConfigForChanges(iconSetConfig);
      let lastElement = elements[elements.length - 1];
      if (!lastElement.id) {
        lastElement = elements.pop();
        let importVersionNumber = lastElement;
        // if the last element has the tag 'version',
        // then there exists another tag 'info' for the description
        if (importVersionNumber.version) {
          lastElement = elements.pop();
          importVersionNumber = importVersionNumber.version;
        } else {
          importVersionNumber = '?';
          this.snackbar.open(`The version number is unreadable.`, undefined, {
            duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION,
            panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
          });
        }
        elements = this.handleVersionNumber(importVersionNumber, elements);
      }
      if (!this.importRepairService.checkForUnreferencedElementsInActivitiesAndRepair(elements)) {
        this.showBrokenImportDialog();
      }
      this.titleService.updateTitleAndDescription(this.title, lastElement.info, false);
      this.importRepairService.adjustPositions(elements);
      this.updateIconRegistries(elements, iconSetConfig);
      this.rendererService.importStory(elements, configChanged, iconSetConfig);
    }
  }
  importSuccessful() {
    this.snackbar.open('Import successful', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_SUCCESS
    });
  }
  importFailed() {
    this.snackbar.open('Import failed', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
    });
  }
  handleVersionNumber(importVersionNumber, elements) {
    const versionPrefix = +importVersionNumber.substring(0, importVersionNumber.lastIndexOf('.'));
    if (versionPrefix <= 0.5) {
      elements = this.importRepairService.updateCustomElementsPreviousV050(elements);
      this.showPreviousV050Dialog(versionPrefix);
    }
    return elements;
  }
  extractStoryAndIconSet(dstText) {
    let dstAndConfig = null;
    try {
      dstAndConfig = JSON.parse(dstText);
    } catch (e) {
      this.showBrokenImportDialog();
    }
    return dstAndConfig;
  }
  extractJsonFromSvgComment(xmlText) {
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
    const currentActorKeys = this.iconDictionaryService.getNamesOfIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    const currentWorkobjectKeys = this.iconDictionaryService.getNamesOfIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
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
    return name.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR, '').replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT, '');
  }
  updateIconRegistries(elements, config) {
    const actorIcons = this.iconDictionaryService.getElementsOfType(elements, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
    const workObjectIcons = this.iconDictionaryService.getElementsOfType(elements, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
    this.iconDictionaryService.updateIconRegistries(actorIcons, workObjectIcons, config);
    this.setImportedConfigurationAndEmit(config);
  }
  showPreviousV050Dialog(version) {
    const message = `Your domain story was created with Egon version ${version}. The file format has since changed.
    Your Domain Story was converted to the new format. Please check if it is complete.`;
    this.snackbar.open(message, undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONGER,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_INFO
    });
  }
  setImportedConfigurationAndEmit(config) {
    this.importedConfiguration = config;
    this.importedConfigurationEmitter.emit(config);
  }
  showBrokenImportDialog() {
    const message = `Error during import: The imported domain story is not complete. Please check if there are elements missing from the canvas.`;
    this.snackbar.open(message, undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONGER,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
    });
  }
  restoreTitleFromFileName(filename, isSVG) {
    let title;
    const domainStoryRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(.dst|.egn)/;
    const svgRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(.dst|.egn).svg/;
    const egnSuffix = '.egn';
    const dstSuffix = '.dst';
    const svgSuffix = '.svg';
    let filenameWithoutDateSuffix = filename.replace(isSVG ? svgRegex : domainStoryRegex, '');
    filenameWithoutDateSuffix = filenameWithoutDateSuffix.replace(svgSuffix, '').replace(dstSuffix, '').replace(egnSuffix, '');
    title = filenameWithoutDateSuffix;
    return title;
  }
  static #_ = this.ɵfac = function ImportDomainStoryService_Factory(t) {
    return new (t || ImportDomainStoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_tools_import_services_import_repair_service__WEBPACK_IMPORTED_MODULE_5__.ImportRepairService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_6__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_tools_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_7__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_8__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_9__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_10__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: ImportDomainStoryService,
    factory: ImportDomainStoryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 56511:
/*!****************************************************************!*\
  !*** ./src/app/tools/import/services/import-repair.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportRepairService: () => (/* binding */ ImportRepairService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
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
      if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY || type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
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
      if (element.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) {
        element.type = src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Document';
      } else if (element.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Bubble') {
        element.type = src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT + 'Conversation';
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
    if (element.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY || element.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
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
      if (element.type !== src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY && element.type !== src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION) {
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
  // Early versions of Egon allowed Whitespaces in Icon names which are now not supported anymore.
  // To find the right icon in the dictionary, they need to be replaced.
  removeWhitespacesFromIcons(elements) {
    elements.forEach(bo => {
      if (bo.type) {
        bo.type = bo.type.replace(/ /g, '-');
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

/***/ 68701:
/*!******************************************************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/presentation/label-dictionary-dialog/label-dictionary-dialog.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryDialogComponent: () => (/* binding */ LabelDictionaryDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);


class LabelDictionaryDialogComponent {
  constructor(dialogRef) {
    this.dialogRef = dialogRef;
  }
  close() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function LabelDictionaryDialogComponent_Factory(t) {
    return new (t || LabelDictionaryDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: LabelDictionaryDialogComponent,
    selectors: [["app-label-dictionary-dialog"]],
    decls: 4,
    vars: 0,
    consts: [[1, "sticky-top"], [3, "closeEmitter"]],
    template: function LabelDictionaryDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Label Dictionary");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-label-dictionary", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("closeEmitter", function LabelDictionaryDialogComponent_Template_app_label_dictionary_closeEmitter_3_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
    },
    styles: [".sticky-top[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background-color: white;\n  z-index: 1;\n  box-shadow: -20px -20px white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbGFiZWwtZGljdGlvbmFyeS9wcmVzZW50YXRpb24vbGFiZWwtZGljdGlvbmFyeS1kaWFsb2cvbGFiZWwtZGljdGlvbmFyeS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLE1BQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnN0aWNreS10b3Age1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB6LWluZGV4OiAxO1xuICBib3gtc2hhZG93OiAtMjBweCAtMjBweCB3aGl0ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 10462:
/*!********************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/presentation/label-dictionary.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryModule: () => (/* binding */ LabelDictionaryModule)
/* harmony export */ });
/* harmony import */ var _label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./label-dictionary/label-dictionary.component */ 36921);
/* harmony import */ var _label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./label-dictionary-dialog/label-dictionary-dialog.component */ 68701);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);






class LabelDictionaryModule {
  static #_ = this.ɵfac = function LabelDictionaryModule_Factory(t) {
    return new (t || LabelDictionaryModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: LabelDictionaryModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](LabelDictionaryModule, {
    declarations: [_label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryComponent, _label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LabelDictionaryDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_2__.MaterialModule],
    exports: [_label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryComponent, _label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LabelDictionaryDialogComponent]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetComponentScope"](_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LabelDictionaryDialogComponent, [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogContent, _label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryComponent], []);

/***/ }),

/***/ 36921:
/*!****************************************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/presentation/label-dictionary/label-dictionary.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryComponent: () => (/* binding */ LabelDictionaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/label-dictionary.service */ 69731);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/text-field */ 79401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 39191);











function LabelDictionaryComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 5)(2, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function LabelDictionaryComponent_For_6_Template_input_change_2_listener($event) {
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
function LabelDictionaryComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 5)(2, "textarea", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function LabelDictionaryComponent_For_13_Template_textarea_change_2_listener($event) {
      const activityEntry_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateActivityEntry($event, activityEntry_r5));
    })("keydown.enter", function LabelDictionaryComponent_For_13_Template_textarea_keydown_enter_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.preventDefault($event));
    })("keyup.enter", function LabelDictionaryComponent_For_13_Template_textarea_keyup_enter_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.save());
    })("keyup.escape", function LabelDictionaryComponent_For_13_Template_textarea_keyup_escape_2_listener() {
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
  constructor(labelDictionaryService, cd) {
    this.labelDictionaryService = labelDictionaryService;
    this.cd = cd;
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
    this.cd.detectChanges();
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
    return new (t || LabelDictionaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_0__.LabelDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LabelDictionaryComponent,
    selectors: [["app-label-dictionary"]],
    outputs: {
      closeEmitter: "closeEmitter"
    },
    decls: 20,
    vars: 4,
    consts: [[1, "list-content"], [1, "listTitle"], [1, "sticky-bottom"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["color", "accent", 1, "inputText", "dense-8"], ["matInput", "", 1, "inputText", 3, "change", "value"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "1", "cdkAutosizeMaxRows", "3", 1, "inputText", "activity", 3, "change", "keydown.enter", "keyup.enter", "keyup.escape", "value"]],
    template: function LabelDictionaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Work Objects");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](5, LabelDictionaryComponent_For_6_Template, 3, 1, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div")(9, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Activities");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](12, LabelDictionaryComponent_For_13_Template, 3, 1, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-dialog-actions", 2)(16, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_16_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_18_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 0, ctx.workobjectEntriesSubject));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](14, 2, ctx.activityEntriesSubject));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatListItem, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogActions, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_8__.CdkTextareaAutosize, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
    styles: [".list-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto;\n  top: 0;\n  bottom: 0;\n  grid-column-gap: 4px;\n  width: 50vw;\n}\n.list-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] {\n  height: unset !important;\n  padding-left: 0;\n}\n.list-content[_ngcontent-%COMP%]   mat-list-item-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n\nh3[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.inputText[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.listTitle[_ngcontent-%COMP%] {\n  justify-self: left;\n}\n\n.activity[_ngcontent-%COMP%] {\n  max-height: 3rem;\n}\n\n.sticky-bottom[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  background-color: white;\n  padding: 10px;\n  z-index: 1;\n  box-shadow: 0 20px white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbGFiZWwtZGljdGlvbmFyeS9wcmVzZW50YXRpb24vbGFiZWwtZGljdGlvbmFyeS9sYWJlbC1kaWN0aW9uYXJ5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUFDRjtBQUNFO0VBQ0Usd0JBQUE7RUFDQSxlQUFBO0FBQ0o7QUFFRTtFQUNFLHFCQUFBO0FBQUo7O0FBSUE7RUFDRSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxnQkFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0Esd0JBQUE7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LWNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGdyaWQtY29sdW1uLWdhcDogNHB4O1xuICB3aWR0aDogNTB2dztcblxuICBtYXQtbGlzdC1pdGVtIHtcbiAgICBoZWlnaHQ6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5cbiAgbWF0LWxpc3QtaXRlbS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuaDMge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlucHV0VGV4dCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubGlzdFRpdGxlIHtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xufVxuXG4uYWN0aXZpdHkge1xuICBtYXgtaGVpZ2h0OiAzcmVtO1xufVxuXG4uc3RpY2t5LWJvdHRvbSB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHotaW5kZXg6IDE7XG4gIGJveC1zaGFkb3c6IDAgMjBweCB3aGl0ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 69731:
/*!*****************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/services/label-dictionary.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryService: () => (/* binding */ LabelDictionaryService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presentation/label-dictionary-dialog/label-dictionary-dialog.component */ 68701);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_label_dictionary_services_mass_naming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/label-dictionary/services/mass-naming.service */ 75961);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);










class LabelDictionaryService {
  constructor(massNamingService, elementRegistryService, iconDictionaryService, dialogService, snackbar) {
    this.massNamingService = massNamingService;
    this.elementRegistryService = elementRegistryService;
    this.iconDictionaryService = iconDictionaryService;
    this.dialogService = dialogService;
    this.snackbar = snackbar;
    this.activityLabels = [];
    this.workObjektLabels = [];
  }
  openLabelDictionary() {
    const isActivityWithLabel = element => element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) && element.businessObject.name;
    const isWorkObjectWithLabel = element => element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) && element.businessObject.name;
    const hasAtLeastOneLabel = this.elementRegistryService.getAllCanvasObjects().some(element => isActivityWithLabel(element) || isWorkObjectWithLabel(element));
    if (hasAtLeastOneLabel) {
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      this.dialogService.openDialog(_presentation_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LabelDictionaryDialogComponent, config);
    } else {
      this.snackbar.open('There are currently no activities or work objects with labels on the canvas', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_INFO
      });
    }
  }
  createLabelDictionaries() {
    this.activityLabels = [];
    this.workObjektLabels = [];
    const allObjects = this.elementRegistryService.getAllCanvasObjects();
    allObjects.forEach(element => {
      const name = element.businessObject.name;
      if (name && name.length > 0 && element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) && !this.activityLabels.map(a => a.name).includes(name)) {
        this.activityLabels.push({
          name,
          originalName: name
        });
      } else if (name && name.length > 0 && element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) && !this.workObjektLabels.map(e => e.name).includes(name)) {
        const iconName = element.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, '');
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
        this.massNamingService.massChangeNames(originalActivityNames[i], activityNames[i], src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY);
      }
    }
    for (let i = 0; i < originalWorkObjectNames.length; i++) {
      if (!workObjectNames[i]) {
        workObjectNames[i] = '';
      }
      if (!(workObjectNames[i] == originalWorkObjectNames[i])) {
        this.massNamingService.massChangeNames(originalWorkObjectNames[i], workObjectNames[i], src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
      }
    }
  }
  static #_ = this.ɵfac = function LabelDictionaryService_Factory(t) {
    return new (t || LabelDictionaryService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_tools_label_dictionary_services_mass_naming_service__WEBPACK_IMPORTED_MODULE_3__.MassNamingService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
    token: LabelDictionaryService,
    factory: LabelDictionaryService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 75961:
/*!************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/services/mass-naming.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MassNamingService: () => (/* binding */ MassNamingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);



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
    return new (t || MassNamingService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_0__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_1__.CommandStackService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: MassNamingService,
    factory: MassNamingService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 40955:
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/domain/activity-dialog-form.ts ***!
  \**************************************************************/
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

/***/ 13547:
/*!************************************************************!*\
  !*** ./src/app/tools/modeler/domain/activityDialogData.ts ***!
  \************************************************************/
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

/***/ 89142:
/*!*****************************************************************************************!*\
  !*** ./src/app/tools/modeler/presentation/activity-dialog/activity-dialog.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityDialogComponent: () => (/* binding */ ActivityDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _domain_activity_dialog_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../domain/activity-dialog-form */ 40955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var src_app_tools_modeler_domain_activityDialogData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/modeler/domain/activityDialogData */ 13547);









class ActivityDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.activity = data.activity;
    this.activityLabel = data.activity.businessObject.name;
    this.numberIsAllowedMultipleTimes = data.numberIsAllowedMultipleTimes;
    this.activityNumber = data.activity.businessObject.number ?? null;
    this.showNumberFields = data.showNumberFields;
    this.saveFN = data.saveFN;
    this.form = _domain_activity_dialog_form__WEBPACK_IMPORTED_MODULE_0__.ActivityDialogForm.create(this.activityLabel, this.activityNumber, this.numberIsAllowedMultipleTimes);
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
    consts: [[3, "formGroup"], [3, "hidden"], ["color", "accent"], ["matInput", "", "type", "number", "formControlName", "activityNumber"], ["type", "checkbox", "formControlName", "multipleNumbers", 3, "change"], ["color", "accent", 1, "fullWidth"], ["matInput", "", "type", "text", "formControlName", "activityLabel", "autofocus", "", "cdkFocusInitial", "", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"]],
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
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName],
    styles: [".fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbW9kZWxlci9wcmVzZW50YXRpb24vYWN0aXZpdHktZGlhbG9nL2FjdGl2aXR5LWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 71638:
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/presentation/modeler.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelerModule: () => (/* binding */ ModelerModule)
/* harmony export */ });
/* harmony import */ var _activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activity-dialog/activity-dialog.component */ 89142);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);





class ModelerModule {
  static #_ = this.ɵfac = function ModelerModule_Factory(t) {
    return new (t || ModelerModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: ModelerModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ModelerModule, {
    declarations: [_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ActivityDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule],
    exports: [_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_0__.ActivityDialogComponent]
  });
})();

/***/ }),

/***/ 52317:
/*!***************************************************************!*\
  !*** ./src/app/tools/modeler/services/initializer.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitializerService: () => (/* binding */ InitializerService)
/* harmony export */ });
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _domain_activityDialogData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/activityDialogData */ 13547);
/* harmony import */ var _presentation_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/activity-dialog/activity-dialog.component */ 89142);
/* harmony import */ var _utils_mathExtensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/mathExtensions */ 67858);
/* harmony import */ var _bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bpmn/modeler/labeling/dsLabelEditingProvider */ 46604);
/* harmony import */ var _bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bpmn/modeler/numbering/numbering */ 33862);
/* harmony import */ var _bpmn_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../bpmn/modeler/updateHandler/activityUpdateHandlers */ 2860);
/* harmony import */ var _bpmn_modeler_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../bpmn/modeler/updateHandler/massRenameHandler */ 89055);
/* harmony import */ var _bpmn_modeler_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../bpmn/modeler/updateHandler/elementUpdateHandler */ 26830);
/* harmony import */ var _bpmn_modeler_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../bpmn/modeler/updateHandler/headlineAndDescriptionUpdateHandler */ 87613);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);
/* harmony import */ var _replay_services_replay_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../replay/services/replay.service */ 3687);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);
/* harmony import */ var _title_services_title_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../title/services/title.service */ 41535);

















class InitializerService {
  constructor(elementRegistryService, replayService, dialogService, commandStackService, titleService) {
    this.elementRegistryService = elementRegistryService;
    this.replayService = replayService;
    this.dialogService = dialogService;
    this.commandStackService = commandStackService;
    this.titleService = titleService;
  }
  propagateDomainStoryModelerClassesToServices(commandStack, elementRegistry, canvas, selection, modeler) {
    this.commandStackService.setCommandStack(commandStack);
    this.elementRegistryService.setElementRegistry(elementRegistry);
  }
  initializeDomainStoryModelerEventHandlers(commandStack, eventBus) {
    (0,_bpmn_modeler_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_6__["default"])(commandStack, eventBus);
    (0,_bpmn_modeler_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_7__["default"])(commandStack, eventBus);
    (0,_bpmn_modeler_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_8__["default"])(commandStack, eventBus);
    (0,_bpmn_modeler_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_9__["default"])(commandStack, this.titleService);
  }
  initiateEventBusListeners(eventBus, commandStack) {
    eventBus.on('element.dblclick', e => {
      if (!this.replayService.getReplayOn()) {
        const element = e.element;
        if (element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) {
          // override the doubleClickListener on activities
          this.activityDoubleClick(element, eventBus, commandStack);
        } else {
          const renderedNumberRegistry = (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.getNumberRegistry)();
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
                        if ((0,_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_3__.positionsMatch)(width, height, elementX, elementY, clickX, clickY)) {
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
      if (this.replayService.getReplayOn()) {
        event.stopPropagation();
        event.preventDefault();
      }
    });
    let pasteColor = [];
    let pasteText = [];
    let pasteHeight = [];
    eventBus.on('copyPaste.pasteElement', 10000, e => {
      pasteColor.push(e.descriptor.oldBusinessObject.pickedColor);
      if (e.descriptor.oldBusinessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
        pasteText.push(e.descriptor.oldBusinessObject.text ?? '');
        pasteHeight.push(e.descriptor.oldBusinessObject.height);
      }
    });
    eventBus.on('create.end', e => {
      if (!pasteColor) {
        return;
      }
      for (let elementsKey in e.elements) {
        const element = e.elements[elementsKey];
        if (element.businessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
          element.businessObject.text = pasteText[0];
          element.businessObject.number = pasteHeight[0];
          element.businessObject.height = pasteHeight[0];
          pasteText.shift();
          pasteHeight.shift();
        }
        element.businessObject.pickedColor = pasteColor[parseInt(elementsKey)];
        eventBus.fire('element.changed', {
          element
        });
      }
      pasteColor = [];
      pasteText = [];
      pasteHeight = [];
    });
  }
  /** Overrrides for Canvas Functions **/
  activityDoubleClick(activity, eventBus, commandStack) {
    const source = activity.source;
    // ensure the right number when changing the direction of an activity
    (0,_bpmn_modeler_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_4__.toggleStashUse)(false);
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_15__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    if (activity.businessObject.number && source && source.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
      config.data = new _domain_activityDialogData__WEBPACK_IMPORTED_MODULE_1__.ActivityDialogData(activity, (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.getMultipleNumberRegistry)()[activity.businessObject.number], true, data => this.saveActivityInputLabel(data, eventBus, commandStack));
    } else if (source && source.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      config.data = new _domain_activityDialogData__WEBPACK_IMPORTED_MODULE_1__.ActivityDialogData(activity, false, false, activityData => this.saveActivityInputLabel(activityData, eventBus, commandStack));
    }
    this.dialogService.openDialog(_presentation_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_2__.ActivityDialogComponent, config);
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
      (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.setNumberIsMultiple)(activityNumber, multipleNumberAllowed);
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
      if ((0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.getMultipleNumberRegistry)()[activityNumber] === false) {
        (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, eventBus);
      }
    } else if (element.businessObject.multipleNumberAllowed === false) {
      (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, eventBus);
    }
  }
  static #_ = this.ɵfac = function InitializerService_Factory(t) {
    return new (t || InitializerService)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵinject"](_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_10__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵinject"](_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_11__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵinject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_12__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵinject"](_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_13__.CommandStackService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵinject"](_title_services_title_service__WEBPACK_IMPORTED_MODULE_14__.TitleService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjectable"]({
    token: InitializerService,
    factory: InitializerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 40439:
/*!***********************************************************!*\
  !*** ./src/app/tools/modeler/services/modeler.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelerService: () => (/* binding */ ModelerService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_tools_modeler_bpmn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/modeler/bpmn */ 96064);
/* harmony import */ var _bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bpmn/modeler/numbering/numbering */ 33862);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _initializer_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initializer.service */ 52317);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-configuration.service */ 46527);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);













class ModelerService {
  constructor(initializerService, elementRegistryService, iconDictionaryService, iconSetConfigurationService, storageService, snackbar) {
    this.initializerService = initializerService;
    this.elementRegistryService = elementRegistryService;
    this.iconDictionaryService = iconDictionaryService;
    this.iconSetConfigurationService = iconSetConfigurationService;
    this.storageService = storageService;
    this.snackbar = snackbar;
  }
  postInit() {
    this.checkCurrentVersion();
    const storedIconSetConfiguration = this.iconSetConfigurationService.getStoredIconSetConfiguration();
    if (storedIconSetConfiguration) {
      this.iconDictionaryService.setCustomConfiguration(storedIconSetConfiguration);
      this.iconSetConfigurationService.loadConfiguration(storedIconSetConfiguration);
    }
    this.modeler = new src_app_tools_modeler_bpmn__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
    (0,min_dash__WEBPACK_IMPORTED_MODULE_10__.assign)(window, {
      bpmnjs: this.modeler
    });
    this.startDebounce();
  }
  checkCurrentVersion() {
    const version = this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.VERSION_KEY);
    if (version === null) {
      this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.VERSION_KEY, _environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.version);
    }
    if (version !== null && version !== _environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.version) {
      this.snackbar.open("Egon was updated. Clear your browser's local storage.", 'More information', {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_INFO
      }).onAction().subscribe(() => {
        window.open('https://egon.io/howto#launching-egon');
      });
    }
  }
  restart(iconSetConfiguration, domainStory) {
    const currentStory = domainStory != undefined ? domainStory : this.elementRegistryService.createObjectListForDSTDownload().map(e => e.businessObject);
    if (!iconSetConfiguration) {
      iconSetConfiguration = this.iconSetConfigurationService.getStoredIconSetConfiguration();
    }
    if (iconSetConfiguration) {
      this.iconSetConfigurationService.setStoredIconSetConfiguration(iconSetConfiguration);
      this.iconDictionaryService.setCustomConfiguration(iconSetConfiguration);
      this.iconSetConfigurationService.loadConfiguration(iconSetConfiguration);
    }
    this.elementRegistryService.clear();
    this.modeler?.destroy();
    this.postInit();
    (0,_bpmn_modeler_numbering_numbering__WEBPACK_IMPORTED_MODULE_2__.updateMultipleNumberRegistry)(currentStory.filter(bo => bo.type === 'domainStory:activity').map(bo => bo).filter(bo => bo.number !== null));
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
    return new (t || ModelerService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_initializer_service__WEBPACK_IMPORTED_MODULE_5__.InitializerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_6__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_7__.IconDictionaryService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_icon_set_config_services_icon_set_configuration_service__WEBPACK_IMPORTED_MODULE_8__.IconSetConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_9__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: ModelerService,
    factory: ModelerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 63812:
/*!************************************************************!*\
  !*** ./src/app/tools/modeler/services/renderer.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RendererService: () => (/* binding */ RendererService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);




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
    this.dirtyFlagService.makeClean();
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
    return new (t || RendererService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_0__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__.DirtyFlagService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: RendererService,
    factory: RendererService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 97961:
/*!********************************************************!*\
  !*** ./src/app/tools/replay/domain/replayConstants.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIGHLIGHT_NUMBER_BACKGROUND_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_BACKGROUND_COLOR),
/* harmony export */   HIGHLIGHT_NUMBER_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_COLOR),
/* harmony export */   HIGHLIGHT_STROKE_WIDTH: () => (/* binding */ HIGHLIGHT_STROKE_WIDTH),
/* harmony export */   NUMBER_BACKGROUND_COLOR: () => (/* binding */ NUMBER_BACKGROUND_COLOR),
/* harmony export */   NUMBER_COLOR: () => (/* binding */ NUMBER_COLOR),
/* harmony export */   STROKE_WIDTH: () => (/* binding */ STROKE_WIDTH)
/* harmony export */ });
const NUMBER_BACKGROUND_COLOR = 'white';
const NUMBER_COLOR = 'black';
const STROKE_WIDTH = '1.5';
const HIGHLIGHT_NUMBER_BACKGROUND_COLOR = '#a4d7e1';
const HIGHLIGHT_NUMBER_COLOR = 'black';
const HIGHLIGHT_STROKE_WIDTH = '4';

/***/ }),

/***/ 95802:
/*!*******************************************************************!*\
  !*** ./src/app/tools/replay/services/dom-manipulation.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomManipulationService: () => (/* binding */ DomManipulationService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/replayConstants */ 97961);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);




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
        activityDomObject.style.strokeWidth = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.STROKE_WIDTH;
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberBackgroundDom && numberTextDom) {
          numberBackgroundDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_BACKGROUND_COLOR;
          numberTextDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_COLOR;
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
    sentenceObjects.filter(e => e.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY).forEach(activity => {
      const querySelector = document.querySelector('[data-element-id=' + activity.id + ']');
      if (querySelector) {
        const activityDomObject = querySelector.getElementsByTagName('polyline')[0];
        activityDomObject.style.strokeWidth = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_STROKE_WIDTH;
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberTextDom && numberBackgroundDom) {
          numberBackgroundDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_NUMBER_BACKGROUND_COLOR;
          numberTextDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_1__.HIGHLIGHT_NUMBER_COLOR;
        }
      }
    });
  }
  getAllNotShown(shownElements) {
    const notShownElements = [];
    const allObjects = this.elementRegistryService.getAllCanvasObjects().concat(this.elementRegistryService.getAllGroups());
    allObjects.forEach(element => {
      if (!shownElements.includes(element.businessObject)) {
        notShownElements.push(element.businessObject);
      }
    });
    return notShownElements;
  }
  static #_ = this.ɵfac = function DomManipulationService_Factory(t) {
    return new (t || DomManipulationService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__.ElementRegistryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: DomManipulationService,
    factory: DomManipulationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3687:
/*!*********************************************************!*\
  !*** ./src/app/tools/replay/services/replay.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplayService: () => (/* binding */ ReplayService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/replay/services/dom-manipulation.service */ 95802);
/* harmony import */ var _story_creator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./story-creator.service */ 97720);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);






class ReplayService {
  constructor(domManipulationService, storyCreatorService, snackbar) {
    this.domManipulationService = domManipulationService;
    this.storyCreatorService = storyCreatorService;
    this.snackbar = snackbar;
    this.story = [];
    this.currentSentence = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(-1);
    this.maxSentenceNumber = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(0);
    this.replayOnSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(false);
    this.currentSentence$ = this.currentSentence.asObservable();
    this.maxSentenceNumber$ = this.maxSentenceNumber.asObservable();
    this.replayOn$ = this.replayOnSubject.asObservable();
  }
  setReplayState(state) {
    this.replayOnSubject.next(state);
  }
  getReplayOn() {
    return this.replayOnSubject.value;
  }
  isReplayable() {
    return this.storyCreatorService.traceActivitiesAndCreateStory().length > 0;
  }
  initializeReplay(story) {
    this.currentSentence.next(1);
    this.story = story;
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
  startReplay(checkSequenceNumbers = false) {
    const story = this.storyCreatorService.traceActivitiesAndCreateStory();
    if (checkSequenceNumbers) {
      const missingSentences = this.storyCreatorService.getMissingSentences(story);
      if (missingSentences.length > 0) {
        const sentence = missingSentences.join(', ');
        this.snackbar.open(missingSentences.length === 1 ? `The Domain Story is not complete. Sentence ${sentence} is missing.` : `The Domain Story is not complete. Sentences ${sentence} are missing.`, undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION_LONG,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
        });
        return;
      }
    }
    this.initializeReplay(story);
    if (this.story.length > 0) {
      this.setReplayState(true);
      this.domManipulationService.showSentence(this.story[this.currentSentence.getValue() - 1]);
    } else {
      this.snackbar.open('You need a Domain Story for replay.', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_0__.SNACKBAR_INFO
      });
    }
  }
  stopReplay() {
    this.currentSentence.next(-1);
    this.maxSentenceNumber.next(0);
    this.setReplayState(false);
    this.domManipulationService.showAll();
  }
  static #_ = this.ɵfac = function ReplayService_Factory(t) {
    return new (t || ReplayService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_1__.DomManipulationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_story_creator_service__WEBPACK_IMPORTED_MODULE_2__.StoryCreatorService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: ReplayService,
    factory: ReplayService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 97720:
/*!****************************************************************!*\
  !*** ./src/app/tools/replay/services/story-creator.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryCreatorService: () => (/* binding */ StoryCreatorService)
/* harmony export */ });
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/dictionary */ 20843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);




class StoryCreatorService {
  constructor(elementRegistryService) {
    this.elementRegistryService = elementRegistryService;
  }
  traceActivitiesAndCreateStory() {
    const tracedActivityMap = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
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
    const actorTextAnnotations = [];
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
    initialSource.forEach(actor => this.addTextAnnotationsForActorOrGroup(actor, actorTextAnnotations));
    targetObjects.forEach(target => {
      if (target.businessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR)) {
        this.addTextAnnotationsForActorOrGroup(target, actorTextAnnotations);
      }
    });
    return initialSource.map(e => e.businessObject).concat(activities.map(a => a.businessObject)).concat(targetObjects.map(t => t.businessObject)).concat(actorTextAnnotations.map(ta => ta.businessObject));
  }
  addTextAnnotationsForActorOrGroup(object, objectTextAnnotations) {
    object.outgoing?.forEach(connection => {
      // connections outgoing from actors or groups without number must be connections to text annotations
      if (!connection.businessObject.number) {
        objectTextAnnotations.push(connection);
        objectTextAnnotations.push(connection.target);
      }
    });
  }
  addGroupsToLastSentence(story) {
    const groups = this.elementRegistryService.getAllGroups();
    const annotationsForGroups = [];
    groups.forEach(group => this.addTextAnnotationsForActorOrGroup(group, annotationsForGroups));
    if (groups.length > 0 && story.length > 0) {
      story[story.length - 1].objects = story[story.length - 1].objects.concat(groups.map(g => g.businessObject)).concat(annotationsForGroups.map(a => a.businessObject));
    }
  }
  static #_ = this.ɵfac = function StoryCreatorService_Factory(t) {
    return new (t || StoryCreatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__.ElementRegistryService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: StoryCreatorService,
    factory: StoryCreatorService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 86322:
/*!*********************************************************!*\
  !*** ./src/app/tools/title/domain/title-dialog-form.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleDialogForm: () => (/* binding */ TitleDialogForm)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 48015);

var TitleDialogForm;
(function (TitleDialogForm) {
  function create(titel, description) {
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormGroup({
      title: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(titel),
      description: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(description)
    });
  }
  TitleDialogForm.create = create;
})(TitleDialogForm || (TitleDialogForm = {}));

/***/ }),

/***/ 35458:
/*!*********************************************************************************!*\
  !*** ./src/app/tools/title/presentation/title-dialog/title-dialog.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleDialogComponent: () => (/* binding */ TitleDialogComponent)
/* harmony export */ });
/* harmony import */ var _domain_title_dialog_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../domain/title-dialog-form */ 86322);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/title/services/title.service */ 41535);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 48015);









class TitleDialogComponent {
  constructor(dialogRef, titleService, dirtyFlagService) {
    this.dialogRef = dialogRef;
    this.titleService = titleService;
    this.dirtyFlagService = dirtyFlagService;
  }
  ngOnInit() {
    const title = this.titleService.getTitle();
    const description = this.titleService.getDescription();
    this.form = _domain_title_dialog_form__WEBPACK_IMPORTED_MODULE_0__.TitleDialogForm.create(title, description);
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
  static #_ = this.ɵfac = function TitleDialogComponent_Factory(t) {
    return new (t || TitleDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_1__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__.DirtyFlagService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: TitleDialogComponent,
    selectors: [["app-header-dialog"]],
    decls: 16,
    vars: 1,
    consts: [[3, "formGroup"], ["color", "accent", 1, "dialogWidth"], ["matInput", "", "type", "text", "formControlName", "title"], ["maxlength", "2000", "matInput", "", "formControlName", "description", 1, "descriptionInput", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["mat-flat-button", "", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"]],
    template: function TitleDialogComponent_Template(rf, ctx) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keydown.enter", function TitleDialogComponent_Template_textarea_keydown_enter_10_listener($event) {
          return ctx.preventDefault($event);
        })("keyup.enter", function TitleDialogComponent_Template_textarea_keyup_enter_10_listener() {
          return ctx.save();
        })("keyup.escape", function TitleDialogComponent_Template_textarea_keyup_escape_10_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "mat-dialog-actions")(12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TitleDialogComponent_Template_button_click_12_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TitleDialogComponent_Template_button_click_14_listener() {
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
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName],
    styles: [".dialogWidth[_ngcontent-%COMP%] {\n  width: 50vw;\n}\n.dialogWidth[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  font-size: 12pt;\n}\n\n.descriptionInput[_ngcontent-%COMP%] {\n  min-height: 75px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvdGl0bGUvcHJlc2VudGF0aW9uL3RpdGxlLWRpYWxvZy90aXRsZS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7QUFFSjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlhbG9nV2lkdGgge1xuICB3aWR0aDogNTB2dztcbiAgbWF0LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEycHQ7XG4gIH1cbn1cblxuLmRlc2NyaXB0aW9uSW5wdXQge1xuICBtaW4taGVpZ2h0OiA3NXB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 80302:
/*!**********************************************************!*\
  !*** ./src/app/tools/title/presentation/title.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleModule: () => (/* binding */ TitleModule)
/* harmony export */ });
/* harmony import */ var _title_dialog_title_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title-dialog/title-dialog.component */ 35458);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../material.module */ 89439);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 96623);





class TitleModule {
  static #_ = this.ɵfac = function TitleModule_Factory(t) {
    return new (t || TitleModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: TitleModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TitleModule, {
    declarations: [_title_dialog_title_dialog_component__WEBPACK_IMPORTED_MODULE_0__.TitleDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_1__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule],
    exports: [_title_dialog_title_dialog_component__WEBPACK_IMPORTED_MODULE_0__.TitleDialogComponent]
  });
})();

/***/ }),

/***/ 41535:
/*!*******************************************************!*\
  !*** ./src/app/tools/title/services/title.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleService: () => (/* binding */ TitleService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_title_dialog_title_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/title-dialog/title-dialog.component */ 35458);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);








class TitleService {
  constructor(commandStackService, dialogService) {
    this.commandStackService = commandStackService;
    this.dialogService = dialogService;
    this.titleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE);
    this.descriptionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION);
    this.iconSetNameSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_ICON_SET_NAME);
    this.showDescriptionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(true);
    this.title$ = this.titleSubject.asObservable();
    this.description$ = this.descriptionSubject.asObservable();
    this.showDescription$ = this.showDescriptionSubject.asObservable();
    this.iconSetName$ = this.iconSetNameSubject.asObservable();
  }
  openHeaderDialog() {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    this.dialogService.openDialog(_presentation_title_dialog_title_dialog_component__WEBPACK_IMPORTED_MODULE_2__.TitleDialogComponent, config);
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
    this.updateTitleAndDescription(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION, false);
  }
  updateTitle(inputTitle) {
    const title = !inputTitle || inputTitle.trim().length === 0 ? _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE : inputTitle;
    this.titleSubject.next(title);
    document.title = title === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE ? 'egon.io' : title;
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
    return this.getTitle().trim().length > 0 && this.getTitle() !== _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_TITLE || this.getDescription().trim().length > 0 && this.getDescription() !== _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_DESCRIPTION;
  }
  fireTitleAndDescriptionUpdate(newTitle, newDescription) {
    const context = {
      newTitle,
      newDescription
    };
    this.commandStackService.execute('story.updateHeadlineAndDescription', context);
  }
  static #_ = this.ɵfac = function TitleService_Factory(t) {
    return new (t || TitleService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_3__.CommandStackService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: TitleService,
    factory: TitleService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 99683:
/*!*****************************************!*\
  !*** ./src/app/utils/colorConverter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexToRGBA: () => (/* binding */ hexToRGBA),
/* harmony export */   isHexWithAlpha: () => (/* binding */ isHexWithAlpha),
/* harmony export */   rgbaToHex: () => (/* binding */ rgbaToHex)
/* harmony export */ });
function rgbaToHex(rgba) {
  const [r, g, b, a] = rgba.match(/\d+(\.\d+)?/g).map(it => +it);
  const red = r.toString(16).padStart(2, '0');
  const green = g.toString(16).padStart(2, '0');
  const blue = b.toString(16).padStart(2, '0');
  const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}${alpha}`;
}
const isValidHex = hex => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, 'g')) ?? [];
const convertHexUnitTo256 = hexStr => parseInt(hexStr.repeat(2 / hexStr.length), 16);
const getAlphafloat = a => {
  if (typeof a !== 'undefined') {
    return Math.round((a / 255 + Number.EPSILON) * 100) / 100; // Runden auf 2 oder weniger Nachkommastellen
  }
  return 1;
};
const isHexWithAlpha = hex => hex?.startsWith('#') && (hex?.length === 5 || hex?.length === 9);
const hexToRGBA = hex => {
  if (!isValidHex(hex)) {
    throw new Error('Invalid HEX');
  }
  const chunkSize = Math.floor((hex.length - 1) / 3); // 1 falls hex 3-4 Stellen, 2 falls hex 6 oder 8 Stellen
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r},${g},${b},${getAlphafloat(a)})`;
};

/***/ }),

/***/ 67858:
/*!*****************************************!*\
  !*** ./src/app/utils/mathExtensions.ts ***!
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

/***/ 43515:
/*!************************************!*\
  !*** ./src/app/utils/sanitizer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
  if (!name) {
    return '';
  }
  let nameWithoutFileEnding = name.lastIndexOf('.') > 0 ? name.substring(0, name.lastIndexOf('.')) : name;
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
    ' ': '-'
  };
  const reg = /[/\\:*?"<>|() ]/gi;
  return nameWithoutFileEnding.trim().replace(reg, match => map[match]);
}

/***/ }),

/***/ 4225:
/*!******************************************************************************************!*\
  !*** ./src/app/workbench/presentation/header/header-buttons/header-buttons.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderButtonsComponent: () => (/* binding */ HeaderButtonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 11640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 24406);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../tools/replay/services/replay.service */ 3687);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 39191);





function HeaderButtonsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.startReplay.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " play_arrow ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Replay");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 4)(7, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " file_upload ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Import from file");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openImportFromUrlDialog.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " cloud_upload ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Import from URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function HeaderButtonsComponent_Conditional_0_Template_input_change_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.import.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openDownloadDialog.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " file_download ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Export");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openLabelDictionary.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, " spellcheck ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Dictionary");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.newStory.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, " note_add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "New story");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openSettings.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, " settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.showKeyboardShortCuts.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, " keyboard ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Shortcuts");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", !ctx_r1.isReplayable);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.isReplayable);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", !ctx_r1.hasDomainStory && !ctx_r1.hasTitle)("dirty", ctx_r1.isDirty);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.hasDomainStory && !ctx_r1.hasTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", !ctx_r1.hasDomainStory);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.hasDomainStory);
  }
}
function HeaderButtonsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.previousSentence.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " skip_previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Prev.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.nextSentence.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " skip_next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Next");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.stopReplay.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " stop ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](18, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Sentence: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](18, 1, ctx_r1.sentenceDescription$), "");
  }
}
class HeaderButtonsComponent {
  constructor(replayService) {
    this.replayService = replayService;
    this.hasDomainStory = false;
    this.hasTitle = false;
    this.isReplaying = false;
    this.isDirty = false;
    this.isReplayable = false;
    this.import = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.openSettings = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.startReplay = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.stopReplay = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.previousSentence = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.nextSentence = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.newStory = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.showKeyboardShortCuts = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.openLabelDictionary = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.openDownloadDialog = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.openImportFromUrlDialog = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.sentenceDescription$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.combineLatest)([this.replayService.currentSentence$, this.replayService.maxSentenceNumber$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(([sentence, count]) => `${sentence}/${count}`));
  }
  static #_ = this.ɵfac = function HeaderButtonsComponent_Factory(t) {
    return new (t || HeaderButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_0__.ReplayService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: HeaderButtonsComponent,
    selectors: [["app-header-buttons"]],
    inputs: {
      hasDomainStory: "hasDomainStory",
      hasTitle: "hasTitle",
      isReplaying: "isReplaying",
      isDirty: "isDirty",
      isReplayable: "isReplayable"
    },
    outputs: {
      import: "import",
      openSettings: "openSettings",
      startReplay: "startReplay",
      stopReplay: "stopReplay",
      previousSentence: "previousSentence",
      nextSentence: "nextSentence",
      newStory: "newStory",
      showKeyboardShortCuts: "showKeyboardShortCuts",
      openLabelDictionary: "openLabelDictionary",
      openDownloadDialog: "openDownloadDialog",
      openImportFromUrlDialog: "openImportFromUrlDialog"
    },
    decls: 2,
    vars: 2,
    consts: [[1, "replaying"], ["id", "buttonStartReplay", "title", "Start replay", 1, "headerButton", 3, "click", "disabled"], [1, "material-icons-outlined", "materialIconButton"], [1, "button-label"], ["id", "buttonImport", "title", "Import story from file", "onclick", "document.getElementById('import').click();", 1, "headerButton"], ["id", "buttonUrlImport", "title", "Import story from URL", 1, "headerButton", 3, "click"], ["type", "file", "accept", ".dst, .svg, .egn, .svg", "id", "import", "onclick", "this.value=null;", 2, "display", "none", 3, "change"], ["id", "export", "title", "Export story as .egn, .svg or .png file", 1, "headerButton", 3, "click", "disabled"], ["title", "Label Dictionary", 1, "headerButton", 3, "click", "disabled"], ["title", "Label Dictionary", 1, "material-icons", "materialIconButton"], ["title", "Create a new domain story", 1, "headerButton", 3, "click"], ["title", "Settings", 1, "headerButton", 3, "click"], ["title", "Change Icons and Settings", 1, "material-icons-outlined", "materialIconButton"], ["title", "Show keyboard shortcuts", 1, "headerButton", 3, "click"], ["title", "Previous sentence", 1, "headerButton", 3, "click"], ["title", "Next sentence", 1, "headerButton", 3, "click"], ["title", "Stop replay", 1, "headerButton", 3, "click"], [1, "sentences"]],
    template: function HeaderButtonsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, HeaderButtonsComponent_Conditional_0_Template, 42, 11, "div")(1, HeaderButtonsComponent_Conditional_1_Template, 19, 3, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](0, !ctx.isReplaying ? 0 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](1, ctx.isReplaying ? 1 : -1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
    styles: [".disabled[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], .disabled[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .disabled[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  cursor: initial;\n  color: gray;\n}\n\n.dirty[_ngcontent-%COMP%] {\n  color: #b64435;\n}\n\n.dirty[_ngcontent-%COMP%]:hover {\n  color: #0093ac;\n}\n\n.replaying[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n\n\n.sentences[_ngcontent-%COMP%] {\n  align-self: center;\n  margin-left: 16px;\n  width: 150px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9oZWFkZXIvaGVhZGVyLWJ1dHRvbnMvaGVhZGVyLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztFQUdFLGVBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUEsc0ZBQUE7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzYWJsZWQgLmJ1dHRvbi1sYWJlbCxcbi5kaXNhYmxlZCBzcGFuLFxuLmRpc2FibGVkOmhvdmVyIHNwYW4ge1xuICBjdXJzb3I6IGluaXRpYWw7XG4gIGNvbG9yOiBncmF5O1xufVxuXG4uZGlydHkge1xuICBjb2xvcjogI2I2NDQzNTtcbn1cblxuLmRpcnR5OmhvdmVyIHtcbiAgY29sb3I6ICMwMDkzYWM7XG59XG5cbi5yZXBsYXlpbmcge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4vKiogZml4ZWQgd2lkdGggYXZvaWRzIFwianVtcGluZ1wiIG9mIGxhYmVsIHdoZW4gc2VxdWVuY2UgbnVtYmVyIHJlYWNoZXMgZG91YmxlIGRpZ2l0cyoqL1xuLnNlbnRlbmNlcyB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG4gIHdpZHRoOiAxNTBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 38361:
/*!**************************************************************************!*\
  !*** ./src/app/workbench/presentation/header/header/header.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../tools/title/services/title.service */ 41535);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../tools/replay/services/replay.service */ 3687);
/* harmony import */ var _tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../tools/import/services/import-domain-story.service */ 93586);
/* harmony import */ var _services_settings_settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/settings/settings.service */ 1299);
/* harmony import */ var _tools_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../tools/modeler/services/renderer.service */ 63812);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../tools/export/services/export.service */ 39595);
/* harmony import */ var _tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../tools/label-dictionary/services/label-dictionary.service */ 69731);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 34294);
/* harmony import */ var _header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../header-buttons/header-buttons.component */ 4225);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 39191);














function HeaderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function HeaderComponent_Conditional_11_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r1.setShowDescription(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, " visibility_off ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function HeaderComponent_Conditional_13_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r1.setShowDescription(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, " visibility ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-card", 11)(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, ctx_r1.description$));
  }
}
class HeaderComponent {
  constructor(titleService, replayService, importService, settingsService, renderService, dirtyFlagService, dialogService, exportService, labelDictionaryService) {
    this.titleService = titleService;
    this.replayService = replayService;
    this.importService = importService;
    this.settingsService = settingsService;
    this.renderService = renderService;
    this.dirtyFlagService = dirtyFlagService;
    this.dialogService = dialogService;
    this.exportService = exportService;
    this.labelDictionaryService = labelDictionaryService;
    this.title$ = this.titleService.title$;
    this.description$ = this.titleService.description$;
    this.showDescription$ = this.titleService.showDescription$;
    this.isReplay$ = this.replayService.replayOn$;
    this.isDirty$ = this.dirtyFlagService.dirty$;
    this.showDescription = this.titleService.showDescription$;
  }
  openHeaderDialog() {
    this.titleService.openHeaderDialog();
  }
  openSettings() {
    this.settingsService.open();
  }
  setShowDescription(show) {
    this.titleService.setShowDescription(show);
  }
  createNewDomainStory() {
    this.titleService.reset();
    this.renderService.reset();
  }
  onImport() {
    this.importService.performImport();
  }
  startReplay() {
    this.replayService.startReplay(true);
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
  openKeyboardShortcutsDialog() {
    this.dialogService.openKeyboardShortcutsDialog();
  }
  openLabelDictionary() {
    this.labelDictionaryService.openLabelDictionary();
  }
  openDownloadDialog() {
    this.exportService.openDownloadDialog();
  }
  openImportFromUrlDialog() {
    this.importService.openImportFromUrlDialog();
  }
  get hasDomainStory() {
    return this.exportService.isDomainStoryExportable();
  }
  get hasTitle() {
    return this.titleService.hasTitleOrDescription();
  }
  get isReplayable() {
    return this.replayService.isReplayable();
  }
  static #_ = this.ɵfac = function HeaderComponent_Factory(t) {
    return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_title_services_title_service__WEBPACK_IMPORTED_MODULE_0__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_1__.ReplayService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_2__.ImportDomainStoryService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_3__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_modeler_services_renderer_service__WEBPACK_IMPORTED_MODULE_4__.RendererService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__.DirtyFlagService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_7__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__.LabelDictionaryService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: HeaderComponent,
    selectors: [["app-header"]],
    decls: 21,
    vars: 21,
    consts: [["color", "primary"], [1, "firstRow"], [1, "mr-10", "titel-scrollbar"], ["title", "Edit title and description", 1, "headline", 3, "click"], ["title", "Edit title and description", 1, "headerButton", 3, "click"], [1, "material-icons-outlined", "materialIconButton"], [1, "button-label"], ["title", "Hide description", 1, "headerButton"], ["title", "Show description", 1, "headerButton"], [1, "titleSpacer"], [1, "nowrap", 3, "import", "openSettings", "startReplay", "stopReplay", "nextSentence", "previousSentence", "newStory", "showKeyboardShortCuts", "openLabelDictionary", "openDownloadDialog", "openImportFromUrlDialog", "hasDomainStory", "hasTitle", "isDirty", "isReplayable", "isReplaying"], [1, "smallScrollbar", "description"], ["title", "Hide description", 1, "headerButton", 3, "click"], ["title", "Show description", 1, "headerButton", 3, "click"], [1, "descriptionText"]],
    template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "mat-toolbar-row", 1)(2, "div", 2)(3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function HeaderComponent_Template_span_click_3_listener() {
          return ctx.openHeaderDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_6_listener() {
          return ctx.openHeaderDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, " edit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, HeaderComponent_Conditional_11_Template, 5, 0, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, HeaderComponent_Conditional_13_Template, 5, 0, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](14, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "app-header-buttons", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](18, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("import", function HeaderComponent_Template_app_header_buttons_import_16_listener() {
          return ctx.onImport();
        })("openSettings", function HeaderComponent_Template_app_header_buttons_openSettings_16_listener() {
          return ctx.openSettings();
        })("startReplay", function HeaderComponent_Template_app_header_buttons_startReplay_16_listener() {
          return ctx.startReplay();
        })("stopReplay", function HeaderComponent_Template_app_header_buttons_stopReplay_16_listener() {
          return ctx.stopReplay();
        })("nextSentence", function HeaderComponent_Template_app_header_buttons_nextSentence_16_listener() {
          return ctx.nextSentence();
        })("previousSentence", function HeaderComponent_Template_app_header_buttons_previousSentence_16_listener() {
          return ctx.previousSentence();
        })("newStory", function HeaderComponent_Template_app_header_buttons_newStory_16_listener() {
          return ctx.createNewDomainStory();
        })("showKeyboardShortCuts", function HeaderComponent_Template_app_header_buttons_showKeyboardShortCuts_16_listener() {
          return ctx.openKeyboardShortcutsDialog();
        })("openLabelDictionary", function HeaderComponent_Template_app_header_buttons_openLabelDictionary_16_listener() {
          return ctx.openLabelDictionary();
        })("openDownloadDialog", function HeaderComponent_Template_app_header_buttons_openDownloadDialog_16_listener() {
          return ctx.openDownloadDialog();
        })("openImportFromUrlDialog", function HeaderComponent_Template_app_header_buttons_openImportFromUrlDialog_16_listener() {
          return ctx.openImportFromUrlDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, HeaderComponent_Conditional_19_Template, 4, 3, "mat-card", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](20, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 9, ctx.title$), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵconditional"](11, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](12, 11, ctx.showDescription) ? 11 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵconditional"](13, !_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](14, 13, ctx.showDescription) ? 13 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("hasDomainStory", ctx.hasDomainStory)("hasTitle", ctx.hasTitle)("isDirty", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](17, 15, ctx.isDirty$))("isReplayable", ctx.isReplayable)("isReplaying", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](18, 17, ctx.isReplay$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵconditional"](19, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](20, 19, ctx.showDescription$) ? 19 : -1);
      }
    },
    dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__.MatToolbarRow, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCard, _header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_9__.HeaderButtonsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe],
    styles: [".firstRow[_ngcontent-%COMP%] {\n  min-height: 4rem;\n}\n\n.description[_ngcontent-%COMP%] {\n  top: 0;\n  max-width: 100vw;\n  overflow-y: scroll;\n  display: grid;\n  background-color: #f7f7f8;\n}\n\n.descriptionText[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 10pt;\n  overflow-wrap: anywhere;\n  word-wrap: anywhere;\n  white-space: pre-wrap;\n  padding-top: 15px;\n  padding-left: 27px;\n  padding-right: 15px;\n  line-height: 12pt;\n}\n\n.description[_ngcontent-%COMP%]:hover {\n  cursor: default;\n}\n\n.titleSpacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.headline[_ngcontent-%COMP%]    > .editIcon[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.nowrap[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.mat-toolbar-row[_ngcontent-%COMP%] {\n  white-space: normal;\n  height: min-content;\n}\n\n.titel-scrollbar[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  max-height: 10rem;\n  overflow: auto;\n  scrollbar-width: none;\n  max-width: 100rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9oZWFkZXIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxNQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5maXJzdFJvdyB7XG4gIG1pbi1oZWlnaHQ6IDRyZW07XG59XG5cbi5kZXNjcmlwdGlvbiB7XG4gIHRvcDogMDtcbiAgbWF4LXdpZHRoOiAxMDB2dztcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBkaXNwbGF5OiBncmlkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y4O1xufVxuXG4uZGVzY3JpcHRpb25UZXh0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDEwcHQ7XG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDI3cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxMnB0O1xufVxuXG4uZGVzY3JpcHRpb246aG92ZXIge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi50aXRsZVNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uaGVhZGxpbmUgPiAuZWRpdEljb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ubm93cmFwIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLm1hdC10b29sYmFyLXJvdyB7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XG59XG5cbi50aXRlbC1zY3JvbGxiYXIge1xuICBtYXJnaW4tbGVmdDogMTJweDtcbiAgbWF4LWhlaWdodDogMTByZW07XG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIG1heC13aWR0aDogMTAwcmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 45263:
/*!***********************************************************************!*\
  !*** ./src/app/workbench/presentation/settings/settings.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsComponent: () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/workbench/services/settings/settings.service */ 1299);
/* harmony import */ var src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var _tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../tools/icon-set-config/services/icon-set-customization.service */ 46252);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _tools_icon_set_config_presentation_icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../tools/icon-set-config/presentation/icon-set-configuration/icon-set-configuration.component */ 26103);
/* harmony import */ var _tools_autosave_presentation_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../tools/autosave/presentation/AutosaveSettings/autosave-settings.component */ 91525);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 39191);










function SettingsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-autosave-settings");
  }
}
function SettingsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-icon-set-configuration");
  }
}
class SettingsComponent {
  constructor(settingsService, modelerService, iconSetCustomizationService) {
    this.settingsService = settingsService;
    this.modelerService = modelerService;
    this.iconSetCustomizationService = iconSetCustomizationService;
    this.showAutosaveSettings = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(false);
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
    this.showAutosaveSettings.next(true);
    this.showIconSetCustomization.next(false);
  }
  openIconSetCustomization() {
    this.showAutosaveSettings.next(false);
    this.showIconSetCustomization.next(true);
  }
  static #_ = this.ɵfac = function SettingsComponent_Factory(t) {
    return new (t || SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_0__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_1__.ModelerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__.IconSetCustomizationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: SettingsComponent,
    selectors: [["app-settings"]],
    decls: 19,
    vars: 14,
    consts: [[1, "settings"], ["color", "primary"], [1, "firstRow"], ["mat-button", "", 1, "headerButton", "tab-small", 3, "click"], [1, "material-icons"], ["mat-button", "", 1, "headerButton", "tab-like", 3, "click"], [1, "headline"]],
    template: function SettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "mat-toolbar-row", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_3_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "navigate_before");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, " Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_7_listener() {
          return ctx.openIconSetCustomization();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Customize Icon Set");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_11_listener() {
          return ctx.openGeneralSettings();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Autosave Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, SettingsComponent_Conditional_15_Template, 1, 0, "app-autosave-settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, SettingsComponent_Conditional_17_Template, 1, 0, "app-icon-set-configuration");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](18, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("highlight", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, ctx.showIconSetCustomization));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("highlight", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 8, ctx.showAutosaveSettings));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](15, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 10, ctx.showAutosaveSettings) ? 15 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](17, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](18, 12, ctx.showIconSetCustomization) ? 17 : -1);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarRow, _tools_icon_set_config_presentation_icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_3__.IconSetConfigurationComponent, _tools_autosave_presentation_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_4__.AutosaveSettingsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe],
    styles: [".firstRow[_ngcontent-%COMP%] {\n  min-height: 4rem;\n  padding: 0px;\n}\n\n.tab-like[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 0px;\n}\n\n.tab-small[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 200px;\n  border-radius: 0px;\n}\n\n.settings[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: 4rem auto;\n  width: 100%;\n  height: 100%;\n}\n\n.highlight[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlyc3RSb3cge1xuICBtaW4taGVpZ2h0OiA0cmVtO1xuICBwYWRkaW5nOiAwcHg7XG59XG5cbi50YWItbGlrZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbn1cblxuLnRhYi1zbWFsbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDIwMHB4O1xuICBib3JkZXItcmFkaXVzOiAwcHg7XG59XG5cbi5zZXR0aW5ncyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogNHJlbSBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uaGlnaGxpZ2h0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTNhYztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 75128:
/*!************************************************************!*\
  !*** ./src/app/workbench/presentation/workbench.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkbenchModule: () => (/* binding */ WorkbenchModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 39191);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../material.module */ 89439);
/* harmony import */ var _header_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/header/header.component */ 38361);
/* harmony import */ var _header_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header-buttons/header-buttons.component */ 4225);
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings/settings.component */ 45263);
/* harmony import */ var _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tools/icon-set-config/presentation/icon-set-config.module */ 92324);
/* harmony import */ var _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tools/autosave/presentation/autosave.module */ 39042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 96623);









class WorkbenchModule {
  static #_ = this.ɵfac = function WorkbenchModule_Factory(t) {
    return new (t || WorkbenchModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: WorkbenchModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule, _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigModule, _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_5__.AutosaveModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](WorkbenchModule, {
    declarations: [_header_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _header_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_2__.HeaderButtonsComponent, _settings_settings_component__WEBPACK_IMPORTED_MODULE_3__.SettingsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _material_module__WEBPACK_IMPORTED_MODULE_0__.MaterialModule, _tools_icon_set_config_presentation_icon_set_config_module__WEBPACK_IMPORTED_MODULE_4__.IconSetConfigModule, _tools_autosave_presentation_autosave_module__WEBPACK_IMPORTED_MODULE_5__.AutosaveModule],
    exports: [_header_header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _header_header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_2__.HeaderButtonsComponent, _settings_settings_component__WEBPACK_IMPORTED_MODULE_3__.SettingsComponent]
  });
})();

/***/ }),

/***/ 1299:
/*!*****************************************************************!*\
  !*** ./src/app/workbench/services/settings/settings.service.ts ***!
  \*****************************************************************/
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
  version: '2.3.1-dev'
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