"use strict";
(self["webpackChunkegon"] = self["webpackChunkegon"] || []).push([["main"],{

/***/ 97563
/*!*****************************************************!*\
  !*** ./src/app/tools/export/services/exportUtil.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewBoxCoordinateRegExp: () => (/* binding */ ViewBoxCoordinateRegExp),
/* harmony export */   createTitleAndDescriptionSVGElement: () => (/* binding */ createTitleAndDescriptionSVGElement)
/* harmony export */ });
/* harmony import */ var _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/export/exportConstants */ 41646);

let dynamicHeightOffset = 0;
const ViewBoxCoordinateRegExp = /width="([^"]+)"\s+height="([^"]+)"\s+viewBox="([^"]+)"/;
// Has to be js File so we can access te correct non-standard HTML-Properties without excessive usage of ts-ignore
function createTitleAndDescriptionSVGElement(initDynamicHeightOffset, title, description, min_x, min_y, width) {
  dynamicHeightOffset = initDynamicHeightOffset;
  title = title.replace("&lt;", "").replace("&gt;", "");
  let titleElement = createTitle(title, width);
  let descriptionElement = "";
  if (description) {
    descriptionElement = createDescription(description, width);
  }
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
        textSpan.setAttribute("font-size", fontSize);
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

/***/ },

/***/ 42523
/*!********************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/BaseViewer.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseViewer)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var min_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! min-dom */ 14551);
/* harmony import */ var min_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dom */ 3899);
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-svg */ 15845);
/* harmony import */ var diagram_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! diagram-js */ 93274);
/* harmony import */ var inherits_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! inherits-browser */ 2890);






function BaseViewer(options) {
  options = (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)({}, DEFAULT_OPTIONS, options);
  this._container = this._createContainer(options);
  this._init(this._container, options);
}
(0,inherits_browser__WEBPACK_IMPORTED_MODULE_6__["default"])(BaseViewer, diagram_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
BaseViewer.prototype.saveSVG = /*#__PURE__*/function () {
  var _saveSVG = (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    this._emit("saveSVG.start");
    let svg, err;
    try {
      const canvas = this.get("canvas");
      const contentNode = canvas.getActiveLayer(),
        defsNode = (0,min_dom__WEBPACK_IMPORTED_MODULE_2__.query)(":scope > defs", canvas._svg);
      const contents = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.innerSVG)(contentNode),
        defs = defsNode ? "<defs>" + (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.innerSVG)(defsNode) + "</defs>" : "";
      const bbox = contentNode.getBBox();
      svg = '<?xml version="1.0" encoding="utf-8"?>\n' + "<!-- created with diagram-js / http://bpmn.io -->\n" + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'width="' + bbox.width + '" height="' + bbox.height + '" ' + 'viewBox="' + bbox.x + " " + bbox.y + " " + bbox.width + " " + bbox.height + '" version="1.1">' + defs + contents + "</svg>";
    } catch (e) {
      err = e;
    }
    this._emit("saveSVG.done", {
      error: err,
      svg: svg
    });
    if (err) {
      throw err;
    }
    return {
      svg
    };
  });
  function saveSVG() {
    return _saveSVG.apply(this, arguments);
  }
  return saveSVG;
}();
BaseViewer.prototype.getModules = function () {
  return this._modules;
};
BaseViewer.prototype.clear = function () {
  if (!this.getDefinitions()) {
    // no diagram to clear
    return;
  }
  // remove drawn elements
  diagram_js__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.clear.call(this);
};
BaseViewer.prototype.destroy = function () {
  // diagram destroy
  diagram_js__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.destroy.call(this);
  // dom detach
  (0,min_dom__WEBPACK_IMPORTED_MODULE_2__.remove)(this._container);
};
BaseViewer.prototype.on = function (events, priority, callback, that) {
  return this.get("eventBus").on(events, priority, callback, that);
};
BaseViewer.prototype.off = function (events, callback) {
  this.get("eventBus").off(events, callback);
};
BaseViewer.prototype.attachTo = function (parentNode) {
  if (!parentNode) {
    throw new Error("parentNode required");
  }
  // ensure we detach from the
  // previous, old parent
  this.detach();
  // unwrap jQuery if provided
  if (parentNode.get && parentNode.constructor.prototype.jquery) {
    parentNode = parentNode.get(0);
  }
  if (typeof parentNode === "string") {
    parentNode = (0,min_dom__WEBPACK_IMPORTED_MODULE_2__.query)(parentNode);
  }
  parentNode.appendChild(this._container);
  this._emit("attach", {});
  this.get("canvas").resized();
};
BaseViewer.prototype.detach = function () {
  const container = this._container,
    parentNode = container.parentNode;
  if (!parentNode) {
    return;
  }
  this._emit("detach", {});
  parentNode.removeChild(container);
};
BaseViewer.prototype._init = function (container, options) {
  const baseModules = options.modules || this.getModules(options),
    additionalModules = options.additionalModules || [],
    staticModules = [{
      egon: ["value", this]
    }];
  const diagramModules = [].concat(staticModules, baseModules, additionalModules);
  const diagramOptions = (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)((0,min_dash__WEBPACK_IMPORTED_MODULE_1__.omit)(options, ["additionalModules"]), {
    canvas: (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)({}, options.canvas, {
      container: container
    }),
    modules: diagramModules
  });
  // invoke diagram constructor
  diagram_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, diagramOptions);
  if (options && options.container) {
    this.attachTo(options.container);
  }
};
BaseViewer.prototype._emit = function (type, event) {
  return this.get("eventBus").fire(type, event);
};
BaseViewer.prototype._createContainer = function (options) {
  const container = (0,min_dom__WEBPACK_IMPORTED_MODULE_3__["default"])('<div class="egon-container"></div>');
  (0,min_dom__WEBPACK_IMPORTED_MODULE_2__.assignStyle)(container, {
    width: ensureUnit(options.width),
    height: ensureUnit(options.height),
    position: options.position
  });
  return container;
};
BaseViewer.prototype._modules = [];
// helpers ///////////////
const DEFAULT_OPTIONS = {
  width: "100%",
  height: "100%",
  position: "relative"
};
/**
 * Ensure the passed argument is a proper unit (defaulting to px)
 */
function ensureUnit(val) {
  return val + ((0,min_dash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(val) ? "px" : "");
}

/***/ },

/***/ 91869
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/change-icon/replace.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 86811
/*!**************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/change-icon/replaceMenuProvider.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReplaceMenuProvider)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replace */ 91869);
/* harmony import */ var _replaceOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replaceOptions */ 40867);
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

/***/ },

/***/ 40867
/*!*********************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/change-icon/replaceOptions.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
  const actors = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
  let replaceOption = {};
  let i = 0;
  actors.keysArray().forEach(actorType => {
    if (!name.includes(actorType)) {
      const typeName = actorType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName.toLowerCase(),
        className: iconDictionaryService.getCSSClassOfIcon(actorType),
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
  const workObjects = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
  let replaceOption = {};
  let i = 0;
  workObjects.keysArray().forEach(workObjectType => {
    if (!name.includes(workObjectType)) {
      const typeName = workObjectType;
      replaceOption[i] = {
        label: "Change to " + typeName,
        actionName: "replace-with-actor-" + typeName,
        className: iconDictionaryService.getCSSClassOfIcon(workObjectType),
        target: {
          type: `${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT}${workObjectType}`
        }
      };
    }
    i++;
  });
  return replaceOption;
}

/***/ },

/***/ 18144
/*!************************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/context-pad/domainStoryContextPadProvider.js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryContextPadProvider),
/* harmony export */   initializeContextPadProvider: () => (/* binding */ initializeContextPadProvider)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbering/numbering */ 19955);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../utils/colorConverter */ 99683);
/* harmony import */ var diagram_js_lib_util_Mouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! diagram-js/lib/util/Mouse */ 53171);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../diagramJSConstants */ 273);








let dirtyFlagService;
let iconDictionaryService;
function initializeContextPadProvider(dirtyFlag, iconDictionary) {
  dirtyFlagService = dirtyFlag;
  iconDictionaryService = iconDictionary;
}
function DomainStoryContextPadProvider(connect, translate, elementFactory, create, canvas, contextPad, popupMenu, replaceMenuProvider, commandStack, eventBus, modeling, rules) {
  contextPad.registerProvider(this);
  popupMenu.registerProvider(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.DS_REPLACE_PROVIDER, replaceMenuProvider);
  let _selectedElement;
  let startConnect;
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.EVENT_CREATE_END, 250, function (event) {
    const context = event.context,
      shape = context.shape;
    if (!(0,diagram_js_lib_util_Mouse__WEBPACK_IMPORTED_MODULE_4__.hasPrimaryModifier)(event) || !contextPad.isOpen(shape)) {
      return;
    }
    const entries = contextPad.getEntries(shape);
    if (entries.replace) {
      entries.replace.action.click(event, shape);
    }
  });
  document.addEventListener(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.EVENT_PICKED_COLOR, event => {
    if (_selectedElement) {
      executeCommandStack(event);
    }
  });
  this.getContextPadEntries = function (element) {
    let actions = {};
    startConnect = function (event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    };
    if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT)) {
      addDelete(actions, element);
      addColorChange(actions, element);
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addActors(appendAction, actions);
      addWorkObjects(appendAction, actions);
      addChangeWorkObjectTypeMenu(actions);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR)) {
      addDelete(actions, element);
      addColorChange(actions, element);
      addConnectWithActivity(actions, startConnect);
      addTextAnnotation(actions);
      addWorkObjects(appendAction, actions);
      addChangeActorTypeMenu(actions);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP)) {
      addTextAnnotation(actions);
      addDeleteGroupWithoutChildren(actions, element);
      addColorChange(actions, element);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY)) {
      addChangeDirection(actions);
      addColorChange(actions, element);
      addDelete(actions, element);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
      addDelete(actions, element);
      addColorChange(actions, element);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.CONNECTION)) {
      addDelete(actions, element);
    }
    notifyColorPickerOfCurrentElementColor();
    return actions;
    /* When the color picker is opened, the current element color should be selected. */
    function notifyColorPickerOfCurrentElementColor() {
      let currentColor = _selectedElement.businessObject.pickedColor;
      if ((0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.isHexWithAlpha)(currentColor)) {
        currentColor = (0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.hexToRGBA)(currentColor);
      }
      document.dispatchEvent(new CustomEvent(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_COLOR_EVENT, {
        detail: {
          color: currentColor ?? "#000000"
        }
      }));
    }
  };
  this.getMultiElementContextPadEntries = function (elements) {
    let actions = {};
    addDelete(actions, elements);
    addColorChange(actions, elements);
    return actions;
  };
  function addDelete(actions, element) {
    // delete element entry, only show if allowed by rules
    let deleteAllowed = rules.allowed(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.EVENT_ELEMENTS_DELETE, {
      elements: {
        element
      }
    });
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(deleteAllowed)) {
      // was the element returned as a deletion candidate?
      deleteAllowed = deleteAllowed[0] === element;
    }
    if (deleteAllowed) {
      (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
        delete: {
          group: "edit",
          className: "bpmn-icon-trash",
          title: translate("Remove"),
          action: {
            click: function (event, element) {
              if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(element)) {
                const groups = element.filter(el => el.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP));
                const otherElements = element.filter(el => !el.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP));
                groups.forEach(group => modeling.removeGroup(group));
                modeling.removeElements(otherElements.slice());
              } else {
                modeling.removeElements({
                  element
                });
              }
              dirtyFlagService.makeDirty();
            }
          }
        }
      });
    }
  }
  function addDeleteGroupWithoutChildren(actions, element) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      deleteGroup: {
        group: "edit",
        className: "bpmn-icon-trash",
        title: translate("Remove Group without Child-Elements"),
        action: {
          click: function (event, element) {
            modeling.removeGroup(element);
            dirtyFlagService.makeDirty();
          }
        }
      }
    });
  }
  function addChangeDirection(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      changeDirection: {
        group: "edit",
        className: "icon-domain-story-changeDirection",
        title: translate("Change direction"),
        action: {
          // event needs to be addressed
          click: function (event, element) {
            changeDirection(element);
            dirtyFlagService.makeDirty();
          }
        }
      }
    });
  }
  function addChangeActorTypeMenu(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      replace: {
        group: "edit",
        className: "bpmn-icon-screw-wrench",
        title: translate("Change type"),
        action: {
          click: function (event, element) {
            let position = (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(getReplaceMenuPosition(), {
              cursor: {
                x: event.x,
                y: event.y
              }
            });
            popupMenu.open(element, _diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.DS_REPLACE_PROVIDER, position);
          }
        }
      }
    });
  }
  function addColorChange(actions, elements) {
    _selectedElement = elements;
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      colorChange: {
        group: "edit",
        className: "icon-domain-story-color-picker",
        title: translate("Change color"),
        action: {
          click: function (event, element) {
            document.dispatchEvent(new CustomEvent(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.OPEN_COLOR_PICKER_EVENT));
          }
        }
      }
    });
  }
  function addTextAnnotation(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      "append.text-annotation": appendAction(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION, "bpmn-icon-text-annotation", "textannotation", "connect")
    });
  }
  function addConnectWithActivity(actions, startConnect) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
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
    let workObjects = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
    workObjects.keysArray().forEach(workObjectType => {
      let name = workObjectType;
      let icon = iconDictionaryService.getCSSClassOfIcon(workObjectType);
      let action = [];
      action["append.workObject" + name] = appendAction(`${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT}${workObjectType}`, icon, name, "workObjects");
      (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, action);
    });
  }
  function addActors(appendAction, actions) {
    let actors = iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR);
    actors.keysArray().forEach(actorType => {
      let name = actorType;
      let icon = iconDictionaryService.getCSSClassOfIcon(actorType);
      let action = [];
      action["append.actor" + name] = appendAction(`${src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR}${actorType}`, icon, name, "actors");
      (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, action);
    });
  }
  function addChangeWorkObjectTypeMenu(actions) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
      replace: {
        group: "edit",
        className: "bpmn-icon-screw-wrench",
        title: translate("Change type"),
        action: {
          click: function (event, element) {
            let position = (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(getReplaceMenuPosition(), {
              cursor: {
                x: event.x,
                y: event.y
              }
            });
            popupMenu.open(element, _diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.DS_REPLACE_PROVIDER, position);
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
    commandStack.execute(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.ACTIVITY_DIRECTION_CHANGE_EVENT, context);
  }
  function getReplaceMenuPosition() {
    let Y_OFFSET = 5;
    let diagramContainer = canvas.getContainer(),
      pad = document.getElementsByClassName(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.OPEN_CONTEXT_PAD_CSS_CLASS)[0];
    let diagramRect = diagramContainer.getBoundingClientRect(),
      padRect = pad.getBoundingClientRect();
    let top = padRect.top - diagramRect.top;
    let left = padRect.left - diagramRect.left;
    return {
      x: left,
      y: top + padRect.height + Y_OFFSET
    };
  }
  function appendAction(type, className, title, group, options) {
    if (typeof title !== "string") {
      options = title;
      title = translate("{type}", {
        type: type.replace(/^domainStory:/, "")
      });
    }
    function appendStart(event, element) {
      let shape = elementFactory.createShape((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)({
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
  /* builds a payload describing a color change */
  function getColorChangeDescription(element, newColor) {
    const oldColor = element.businessObject.pickedColor;
    if ((0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.isHexWithAlpha)(oldColor)) {
      newColor = (0,_utils_colorConverter__WEBPACK_IMPORTED_MODULE_3__.rgbaToHex)(newColor);
    }
    return {
      businessObject: element.businessObject,
      newColor: newColor,
      element: element
    };
  }
  function executeCommandStack(colorChangedEvent) {
    let newColor = colorChangedEvent.detail.color;
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(_selectedElement)) {
      _selectedElement.forEach(el => commandStack.execute(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.ELEMENT_COLOR_CHANGE_EVENT, getColorChangeDescription(el, newColor)));
    } else {
      const colorChangeDescription = getColorChangeDescription(_selectedElement, newColor);
      commandStack.execute(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_5__.ELEMENT_COLOR_CHANGE_EVENT, colorChangeDescription);
    }
    dirtyFlagService.makeDirty();
  }
}
DomainStoryContextPadProvider.$inject = ["connect", "translate", "elementFactory", "create", "canvas", "contextPad", "popupMenu", "replaceMenuProvider", "commandStack", "eventBus", "modeling", "rules"];

/***/ },

/***/ 55116
/*!******************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/copyPaste/EgonCopyPaste.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EgonCopyPaste)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ 84029);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../diagramJSConstants */ 273);



function copyProperties(source, target, properties) {
  if (!(0,min_dash__WEBPACK_IMPORTED_MODULE_1__.isArray)(properties)) {
    properties = [properties];
  }
  (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.forEach)(properties, function (property) {
    if (!(0,min_dash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(source[property])) {
      target[property] = source[property];
    }
  });
}
function removeProperties(element, properties) {
  if (!(0,min_dash__WEBPACK_IMPORTED_MODULE_1__.isArray)(properties)) {
    properties = [properties];
  }
  (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.forEach)(properties, function (property) {
    if (element[property]) {
      delete element[property];
    }
  });
}
const LOW_PRIORITY = 750;
function EgonCopyPaste(eventBus, propertyCopy) {
  eventBus.on("copyPaste.copyElement", LOW_PRIORITY, function (context) {
    const descriptor = context.descriptor,
      element = context.element;
    const businessObject = descriptor.oldBusinessObject = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject)(element);
    descriptor.type = element.type;
    copyProperties(businessObject, descriptor, "name");
    if (isLabel(descriptor)) {
      return descriptor;
    }
  });
  let references;
  function resolveReferences(descriptor, cache) {
    const businessObject = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject)(descriptor);
    // boundary events
    if (descriptor.host) {
      // relationship can be resolved immediately
      (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject)(descriptor).attachedToRef = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject)(cache[descriptor.host]);
    }
    references = (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.omit)(references, (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.reduce)(references, function (array, reference, key) {
      const element = reference.element,
        property = reference.property;
      if (key === descriptor.id) {
        element[property] = businessObject;
        array.push(descriptor.id);
      }
      return array;
    }, []));
  }
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_COPY_PASE_PASTE_ELEMENTS, function () {
    references = {};
  });
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_COPY_PASE_PASTE_ELEMENT, function (context) {
    const cache = context.cache,
      descriptor = context.descriptor,
      oldBusinessObject = descriptor.oldBusinessObject;
    let newBusinessObject;
    // do NOT copy business object if external label
    if (isLabel(descriptor)) {
      descriptor.businessObject = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject)(cache[descriptor.labelTarget]);
      return;
    }
    newBusinessObject = {};
    descriptor.businessObject = propertyCopy.copyElement(oldBusinessObject, newBusinessObject);
    // resolve references e.g. default sequence flow
    resolveReferences(descriptor, cache);
    copyProperties(descriptor, newBusinessObject, ["name"]);
    removeProperties(descriptor, "oldBusinessObject");
  });
}
EgonCopyPaste.$inject = ["eventBus", "propertyCopy"];
// helpers //////////
function isLabel(element) {
  return !!element.labelTarget;
}

/***/ },

/***/ 29715
/*!*****************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/copyPaste/PropertyCopy.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PropertyCopy)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../diagramJSConstants */ 273);


const DISALLOWED_PROPERTIES = ["incoming", "outgoing"];
function PropertyCopy(eventBus) {
  this._eventBus = eventBus;
  // copy extension elements last
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.PROPERTY_COPY_CAN_COPY_PROPERTIES_EVENT, function (context) {
    const propertyNames = context.propertyNames;
    if (!propertyNames || !propertyNames.length) {
      return;
    }
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.sortBy)(propertyNames, function (propertyName) {
      return propertyName === "extensionElements";
    });
  });
  // default check whether property can be copied
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.PROPERTY_COPY_CAN_COPY_PROPERTY_EVENT, function (context) {
    const propertyName = context.propertyName;
    if (propertyName && DISALLOWED_PROPERTIES.indexOf(propertyName) !== -1) {
      // disallow copying property
      return false;
    }
  });
}
PropertyCopy.$inject = ["eventBus"];
PropertyCopy.prototype.copyElement = function (sourceElement, targetElement, propertyNames) {
  const self = this;
  if (propertyNames && !(0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(propertyNames)) {
    propertyNames = [propertyNames];
  }
  const canCopyProperties = this._eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.PROPERTY_COPY_CAN_COPY_PROPERTIES_EVENT, {
    propertyNames: propertyNames,
    sourceElement: sourceElement,
    targetElement: targetElement
  });
  if (canCopyProperties === false) {
    return targetElement;
  }
  if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(canCopyProperties)) {
    propertyNames = canCopyProperties;
  }
  // copy properties
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.forEach)(propertyNames, function (propertyName) {
    let sourceProperty;
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.has)(sourceElement, propertyName)) {
      sourceProperty = sourceElement.get(propertyName);
    }
    const copiedProperty = self.copyProperty(sourceProperty, targetElement, propertyName);
    const canSetProperty = self._eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.PROPERTY_COPY_CAN_SET_COPIED_PROPERTY_EVENT, {
      parent: targetElement,
      property: copiedProperty,
      propertyName: propertyName
    });
    if (canSetProperty === false) {
      return;
    }
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isDefined)(copiedProperty)) {
      targetElement.set(propertyName, copiedProperty);
    }
  });
  return targetElement;
};
PropertyCopy.prototype.copyProperty = function (property, parent, propertyName) {
  const self = this;
  // allow others to copy property
  let copiedProperty = this._eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.PROPERTY_COPY_CAN_COPY_PROPERTY_EVENT, {
    parent: parent,
    property: property,
    propertyName: propertyName
  });
  // return if copying is NOT allowed
  if (copiedProperty === false) {
    return;
  }
  if (copiedProperty) {
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isObject)(copiedProperty) && !copiedProperty.$parent) {
      copiedProperty.$parent = parent;
    }
    return copiedProperty;
  }
  // copy arrays
  if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isArray)(property)) {
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.reduce)(property, function (childProperties, childProperty) {
      // recursion
      copiedProperty = self.copyProperty(childProperty, parent, propertyName);
      // copying might NOT be allowed
      if (copiedProperty) {
        copiedProperty.$parent = parent;
        return childProperties.concat(copiedProperty);
      }
      return childProperties;
    }, []);
  }
  // copy model elements
  if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isObject)(property)) {
    copiedProperty = {};
    copiedProperty.$parent = parent;
    // recursion
    copiedProperty = self.copyElement(property, copiedProperty);
    return copiedProperty;
  }
  // copy primitive properties
  return property;
};

/***/ },

/***/ 95223
/*!**********************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/copyPaste/index.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_copy_paste__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/features/copy-paste */ 54307);
/* harmony import */ var _EgonCopyPaste__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EgonCopyPaste */ 55116);
/* harmony import */ var _PropertyCopy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PropertyCopy */ 29715);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_copy_paste__WEBPACK_IMPORTED_MODULE_0__["default"]],
  __init__: ["egonCopyPaste", "propertyCopy"],
  egonCopyPaste: ["type", _EgonCopyPaste__WEBPACK_IMPORTED_MODULE_1__["default"]],
  propertyCopy: ["type", _PropertyCopy__WEBPACK_IMPORTED_MODULE_2__["default"]]
});

/***/ },

/***/ 273
/*!*************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/diagramJSConstants.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTIVITY_CHANGED_EVENT: () => (/* binding */ ACTIVITY_CHANGED_EVENT),
/* harmony export */   ACTIVITY_DIRECTION_CHANGE_EVENT: () => (/* binding */ ACTIVITY_DIRECTION_CHANGE_EVENT),
/* harmony export */   DEFAULT_COLOR_EVENT: () => (/* binding */ DEFAULT_COLOR_EVENT),
/* harmony export */   DS_REPLACE_PROVIDER: () => (/* binding */ DS_REPLACE_PROVIDER),
/* harmony export */   ELEMENT_COLOR_CHANGE_EVENT: () => (/* binding */ ELEMENT_COLOR_CHANGE_EVENT),
/* harmony export */   EVENT_BENDPOINT_MOVE_END: () => (/* binding */ EVENT_BENDPOINT_MOVE_END),
/* harmony export */   EVENT_BENDPOINT_MOVE_START: () => (/* binding */ EVENT_BENDPOINT_MOVE_START),
/* harmony export */   EVENT_COMMANDSTACK_CHANGED: () => (/* binding */ EVENT_COMMANDSTACK_CHANGED),
/* harmony export */   EVENT_CONNECTION_SEGMENT_MOVE_START: () => (/* binding */ EVENT_CONNECTION_SEGMENT_MOVE_START),
/* harmony export */   EVENT_COPY_PASE_PASTE_ELEMENT: () => (/* binding */ EVENT_COPY_PASE_PASTE_ELEMENT),
/* harmony export */   EVENT_COPY_PASE_PASTE_ELEMENTS: () => (/* binding */ EVENT_COPY_PASE_PASTE_ELEMENTS),
/* harmony export */   EVENT_CREATE_END: () => (/* binding */ EVENT_CREATE_END),
/* harmony export */   EVENT_DIAGRAM_CLEAR: () => (/* binding */ EVENT_DIAGRAM_CLEAR),
/* harmony export */   EVENT_ELEMENTS_DELETE: () => (/* binding */ EVENT_ELEMENTS_DELETE),
/* harmony export */   EVENT_ELEMENT_CHANGED: () => (/* binding */ EVENT_ELEMENT_CHANGED),
/* harmony export */   EVENT_ELEMENT_CLICK: () => (/* binding */ EVENT_ELEMENT_CLICK),
/* harmony export */   EVENT_ELEMENT_DBLCLICK: () => (/* binding */ EVENT_ELEMENT_DBLCLICK),
/* harmony export */   EVENT_ELEMENT_HOVER: () => (/* binding */ EVENT_ELEMENT_HOVER),
/* harmony export */   EVENT_INTERACTION_EVENTS_CREATE_HIT: () => (/* binding */ EVENT_INTERACTION_EVENTS_CREATE_HIT),
/* harmony export */   EVENT_LASSO_SELECTION_START: () => (/* binding */ EVENT_LASSO_SELECTION_START),
/* harmony export */   EVENT_PICKED_COLOR: () => (/* binding */ EVENT_PICKED_COLOR),
/* harmony export */   EVENT_SHAPE_ADDED: () => (/* binding */ EVENT_SHAPE_ADDED),
/* harmony export */   EVENT_SHAPE_MOVE_START: () => (/* binding */ EVENT_SHAPE_MOVE_START),
/* harmony export */   EVENT_SHAPE_REMOVE: () => (/* binding */ EVENT_SHAPE_REMOVE),
/* harmony export */   EVENT_SPACE_TOOL_SELECTION_START: () => (/* binding */ EVENT_SPACE_TOOL_SELECTION_START),
/* harmony export */   LABEL_CSS_CLASS: () => (/* binding */ LABEL_CSS_CLASS),
/* harmony export */   LABEL_NUMBER_CSS_CLASS: () => (/* binding */ LABEL_NUMBER_CSS_CLASS),
/* harmony export */   OPEN_COLOR_PICKER_EVENT: () => (/* binding */ OPEN_COLOR_PICKER_EVENT),
/* harmony export */   OPEN_CONTEXT_PAD_CSS_CLASS: () => (/* binding */ OPEN_CONTEXT_PAD_CSS_CLASS),
/* harmony export */   PROPERTY_COPY_CAN_COPY_PROPERTIES_EVENT: () => (/* binding */ PROPERTY_COPY_CAN_COPY_PROPERTIES_EVENT),
/* harmony export */   PROPERTY_COPY_CAN_COPY_PROPERTY_EVENT: () => (/* binding */ PROPERTY_COPY_CAN_COPY_PROPERTY_EVENT),
/* harmony export */   PROPERTY_COPY_CAN_SET_COPIED_PROPERTY_EVENT: () => (/* binding */ PROPERTY_COPY_CAN_SET_COPIED_PROPERTY_EVENT),
/* harmony export */   SHAPE_REMOVE_GROUP_WITHOUT_CHILDREN_EVENT: () => (/* binding */ SHAPE_REMOVE_GROUP_WITHOUT_CHILDREN_EVENT)
/* harmony export */ });
const DS_REPLACE_PROVIDER = "ds-replace";
// Events
const EVENT_CREATE_END = "create.end";
const EVENT_PICKED_COLOR = "pickedColor";
const EVENT_ELEMENTS_DELETE = "elements.delete";
const EVENT_COPY_PASE_PASTE_ELEMENT = "copyPaste.pasteElement";
const EVENT_COPY_PASE_PASTE_ELEMENTS = "copyPaste.pasteElements";
const EVENT_SHAPE_MOVE_START = "shape.move.start"; // move existing shapes
const EVENT_SHAPE_ADDED = "shape.added";
const EVENT_SHAPE_REMOVE = "shape.remove";
const EVENT_BENDPOINT_MOVE_START = "bendpoint.move.start"; // move and create bendpoints
const EVENT_BENDPOINT_MOVE_END = "bendpoint.move.end"; // move and create bendpoints
const EVENT_CONNECTION_SEGMENT_MOVE_START = "connectionSegment.move.start"; // move horizontal/vertical segments of connections
const EVENT_ELEMENT_CLICK = "element.click"; // click on existing element (opens context pad if element is actor or work object)
const EVENT_ELEMENT_DBLCLICK = "element.dblclick";
const EVENT_ELEMENT_HOVER = "element.hover"; // show outline around element
const EVENT_ELEMENT_CHANGED = "element.changed";
const EVENT_INTERACTION_EVENTS_CREATE_HIT = "interactionEvents.createHit"; // use palette to create new element
const EVENT_SPACE_TOOL_SELECTION_START = "spaceTool.selection.start"; // use space tool
const EVENT_LASSO_SELECTION_START = "lasso.selection.start"; // use lasso tool
const EVENT_COMMANDSTACK_CHANGED = "commandStack.changed";
const EVENT_DIAGRAM_CLEAR = "diagram.clear";
// Custom Events
const ELEMENT_COLOR_CHANGE_EVENT = "element.colorChange";
const ACTIVITY_DIRECTION_CHANGE_EVENT = "activity.directionChange";
const ACTIVITY_CHANGED_EVENT = "activity.changed";
const OPEN_COLOR_PICKER_EVENT = "openColorPicker";
const DEFAULT_COLOR_EVENT = "defaultColor";
const SHAPE_REMOVE_GROUP_WITHOUT_CHILDREN_EVENT = "shape.removeGroupWithoutChildren";
const PROPERTY_COPY_CAN_COPY_PROPERTY_EVENT = "propertyCopy.canCopyProperty";
const PROPERTY_COPY_CAN_COPY_PROPERTIES_EVENT = "propertyCopy.canCopyProperties";
const PROPERTY_COPY_CAN_SET_COPIED_PROPERTY_EVENT = "propertyCopy.canSetCopiedProperty";
// CSS-Classes
const OPEN_CONTEXT_PAD_CSS_CLASS = "djs-context-pad open";
const LABEL_NUMBER_CSS_CLASS = "djs-labelNumber";
const LABEL_CSS_CLASS = "djs-label";

/***/ },

/***/ 66619
/*!********************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/domainStoryElementFactory.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryElementFactory)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var diagram_js_lib_core_ElementFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/core/ElementFactory */ 22037);
/* harmony import */ var _domainStoryIdFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domainStoryIdFactory */ 72960);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);







function DomainStoryElementFactory() {
  let self = this;
  let domainStoryIdFactory = new _domainStoryIdFactory__WEBPACK_IMPORTED_MODULE_3__["default"]();
  /**
   * create a diagram-js element
   *
   * @param  {String} djsElementType
   * @param  {Object} attrs
   *
   * @return {djs.model.Base}
   */
  this.create = function (djsElementType, attrs) {
    let dstElementType = attrs.type;
    if (!attrs.businessObject) {
      attrs.businessObject = {
        type: dstElementType,
        name: attrs.name ? attrs.name : ""
      };
    }
    if (attrs.id) {
      domainStoryIdFactory.registerId(attrs.id);
    } else {
      attrs.id = domainStoryIdFactory.getId(djsElementType);
    }
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(attrs.businessObject, {
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
        (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(attrs.businessObject, {
          id: value
        });
      }
    };
    // add width and height if shape
    if (djsElementType === "shape") {
      let alreadyHasSize = attrs.height || attrs.width; // if a story is imported, groups and annotations already have dimensions; we must not overwrite them with default values
      if (!alreadyHasSize) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(attrs, self._getShapeSize(dstElementType));
      }
    }
    if (!("$instanceOf" in attrs.businessObject)) {
      // ensure we can use ModelUtil#is for type checks
      Object.defineProperty(attrs.businessObject, "$instanceOf", {
        value: function (type) {
          return this.type === type;
        }
      });
    }
    return self.baseCreate(djsElementType, attrs);
  };
}
inherits__WEBPACK_IMPORTED_MODULE_1___default()(DomainStoryElementFactory, diagram_js_lib_core_ElementFactory__WEBPACK_IMPORTED_MODULE_2__["default"]);
DomainStoryElementFactory.prototype.baseCreate = diagram_js_lib_core_ElementFactory__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.create;
/**
 * returns the default size for shapes.
 * *
 * @param {String} dstElementType
 *
 * @return {width, height} object representing the size of the element
 */
DomainStoryElementFactory.prototype._getShapeSize = function (dstElementType) {
  let shapes = {
    __default: {
      width: 75,
      height: 75
    },
    [src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.TEXTANNOTATION]: {
      width: 100,
      height: 30
    },
    [src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_4__.ElementTypes.GROUP]: {
      width: 300,
      height: 200
    }
  };
  return shapes[dstElementType] || shapes.__default;
};

/***/ },

/***/ 72960
/*!***************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/domainStoryIdFactory.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 84234
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/domainStoryRenderer.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRenderer),
/* harmony export */   initializeRenderer: () => (/* binding */ initializeRenderer)
/* harmony export */ });
/* harmony import */ var inherits_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits-browser */ 2890);
/* harmony import */ var diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/draw/BaseRenderer */ 14694);
/* harmony import */ var ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ids */ 70678);
/* harmony import */ var diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/util/RenderUtil */ 96546);
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-svg */ 15845);
/* harmony import */ var min_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! min-dom */ 14551);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/labeling/dsLabelEditingProvider */ 12921);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/numbering/numbering */ 19955);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/labeling/dsLabelUtil */ 54554);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_labeling_position__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/labeling/position */ 2512);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _utils_mathExtensions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../utils/mathExtensions */ 67858);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./util/util */ 84029);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./diagramJSConstants */ 273);

















let RENDERER_IDS = new ids__WEBPACK_IMPORTED_MODULE_2__["default"]();
let numbers = [];
const DEFAULT_COLOR = "#000000";
let _iconDictionaryService;
let _elementRegistryService;
let _dirtyFlagService;
function initializeRenderer(iconDictionaryService, elementRegistryService, dirtyFlagService) {
  _iconDictionaryService = iconDictionaryService;
  _elementRegistryService = elementRegistryService;
  _dirtyFlagService = dirtyFlagService;
}
function DomainStoryRenderer(eventBus, styles, canvas, textRenderer, commandStack) {
  diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, eventBus, 2000);
  let rendererId = RENDERER_IDS.next();
  let markers = {};
  let computeStyle = styles.computeStyle;
  // generate the automatic Number for an activity originating from an actor
  function generateActivityNumber(parentGfx, element, box) {
    // whenever we want to edit an activity, it gets redrawn as a new object
    // and the custom information is lost,
    // so we stash it before the editing occurs and set the value here
    let numberStash = (0,src_app_tools_modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_7__.getNumberStash)();
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
    renderNumber(parentGfx, semantic.number, numberStyle(box), element.type);
  }
  // style functions
  function numberStyle(box) {
    return {
      box: box,
      fitBox: true,
      style: (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)({}, textRenderer.getExternalStyle(), {
        fill: "black",
        position: "absolute"
      })
    };
  }
  function renderActorAndWorkObjectLabel(parentGfx, element, align, padding) {
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
  function renderActivityLabel(parentGfx, element) {
    let semantic = element.businessObject;
    let waypoints = element.waypoints;
    let lines = (0,src_app_tools_modeler_diagram_js_features_labeling_position__WEBPACK_IMPORTED_MODULE_10__.countLines)(semantic.name);
    if (element.waypoints != null) {
      let position = (0,src_app_tools_modeler_diagram_js_features_labeling_position__WEBPACK_IMPORTED_MODULE_10__.labelPosition)(waypoints, lines);
      let startPoint = element.waypoints[position.selected];
      let endPoint = element.waypoints[position.selected + 1];
      let angle = (0,_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_12__.angleBetween)(startPoint, endPoint);
      let alignment = "left";
      let boxWidth = 500;
      let xStart = position.x;
      // if the activity is horizontal, we want to center the label
      if (angle === 0 || angle === 180) {
        boxWidth = Math.abs(startPoint.x - endPoint.x);
        alignment = "center";
        const textWidthInPixel = (0,src_app_tools_modeler_diagram_js_features_labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_9__.approximateArialSize11TextWidthInPixel)(semantic.name);
        xStart = (startPoint.x + endPoint.x) / 2 - (textWidthInPixel / 2 + 20);
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
          style: (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)({}, textRenderer.getExternalStyle(), {
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
      let box = (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_8__.numberBoxDefinitions)(element);
      if (semantic.number == null && element.source.type && element.source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.ACTOR)) {
        (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_8__.generateAutomaticNumber)(element, commandStack);
      }
      // render the background for the number
      if (semantic.number && element.source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.ACTOR)) {
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
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.classes)(text).add(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__.LABEL_NUMBER_CSS_CLASS);
    setCoordinates(type, text, options, height, parentGfx);
    // !IMPORTANT!
    // When converting svg-files via Inkscape or Photoshop the svg-circle is converted to a black dot that obscures the number.
    // To circumvent this, we draw an arc.
    let circle = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("path");
    let radius = 11;
    let x = options.box.x + 18 + (number > 9 ? 3 : 0);
    let y = options.box.y - radius + 7;
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(circle, {
      d: `
      M ${x} ${y}
      m ${radius},0
      a ${radius},${radius} 0 1,0 ${-radius * 2},0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      `,
      fill: "white",
      stroke: "black"
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parentGfx, circle);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parentGfx, text);
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
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.classes)(text).add("djs-label");
    setCoordinates(type, text, options, height, parentGfx);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parentGfx, text);
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
    let rect = drawRect(parentGfx, element.width, element.height, 0, (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)({
      fill: "none",
      stroke: element.businessObject.pickedColor
    }, element.attrs));
    renderActorAndWorkObjectLabel(parentGfx, element, "left-top", 8);
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
    if ((0,_util_util__WEBPACK_IMPORTED_MODULE_13__.isCustomIcon)(icon)) {
      let dataURL;
      if ((0,_util_util__WEBPACK_IMPORTED_MODULE_13__.isCustomSvgIcon)(icon)) {
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
    let iconSRC = _iconDictionaryService.getIconSource(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    let actor = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(actor, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parent, actor);
    renderActorAndWorkObjectLabel(parent, element, "center", -5);
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
    let iconSRC = _iconDictionaryService.getIconSource(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.getIconId(element.type));
    iconSRC = getIconSvg(iconSRC, element);
    workObject = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)(iconSRC);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(workObject, svgDynamicSizeAttributes);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parent, workObject);
    renderActorAndWorkObjectLabel(parent, element, "center", -5);
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
      let x = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.createLine)(element.waypoints, attrs));
      renderActivityLabel(p, element);
      renderExternalNumber(p, element);
      // just adjusting the start- and endpoint of the connection-element moves only the drawn connection,
      // not the interactive line. This can be fixed by manually overriding the points of the interactive polyline
      // in the HTML with the points of the drawn one.
      // this however does not adjust the surrounding box of the connection.
      fixConnectionInHTML(p.parentElement);
      // changes the color of the moved activity back to original instead of blue
      if (p.className.baseVal === "djs-dragger") {
        (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.classes)(p).remove("djs-dragger");
        (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.classes)(p).add("djs-connection-preview");
      }
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
    return (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(p, (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.createLine)(element.waypoints, attrs));
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
      (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)(element, {
        height: height
      });
      // for some reason the keyword height is not exported, so we use another, which we know will be exported,
      // to ensure persistent annotation heights between sessions
      (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)(element.businessObject, {
        number: height
      });
    }
    let textElement = drawRect(parentGfx, element.width, element.height, 0, 0, style);
    let bracketPath = (0,_util_util__WEBPACK_IMPORTED_MODULE_13__.getAnnotationBracketSvg)(element.height);
    drawPath(parentGfx, bracketPath, {
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
    let path = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("path");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(path, {
      d: d
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(path, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parentGfx, path);
    return path;
  }
  function drawRect(parentGfx, width, height, r, offset, attrs) {
    if ((0,min_dash__WEBPACK_IMPORTED_MODULE_6__.isObject)(offset)) {
      attrs = offset;
      offset = 0;
    }
    offset = offset || 0;
    attrs = computeStyle(attrs, {
      stroke: "black",
      strokeWidth: 2,
      fill: "white"
    });
    let rect = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("rect");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r
    });
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(rect, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(parentGfx, rect);
    return rect;
  }
  // marker functions ("markers" are arrowheads of activities)
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
      let activityArrow = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("path");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(activityArrow, {
        d: "M 1 5 L 11 10 L 1 15 Z"
      });
      addMarker(id, {
        element: activityArrow,
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
    let attrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_6__.assign)({
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
    let marker = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("marker");
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(options.element, attrs);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(marker, options.element);
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.attr)(marker, {
      id: id,
      viewBox: "0 0 20 20",
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: "auto"
    });
    let defs = (0,min_dom__WEBPACK_IMPORTED_MODULE_5__.query)("defs", canvas._svg);
    if (!defs) {
      defs = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.create)("defs");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(canvas._svg, defs);
    }
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.append)(defs, marker);
    markers[id] = marker;
  }
  // path functions
  this.getWorkObjectPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.componentsToPath)(rectangle);
  };
  this.getGroupPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.componentsToPath)(rectangle);
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
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.componentsToPath)(activityPath);
  };
  this.getActorPath = function (shape) {
    let rectangle = getRectPath(shape);
    return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__.componentsToPath)(rectangle);
  };
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__.EVENT_BENDPOINT_MOVE_START, 200, function (event) {
    // the bendpoint which we are dragging will otherwise be displayed with 0.3 opacity
    // through bendpoint-dragging we match the CSS class more specifically, hence our style applies
    (0,tiny_svg__WEBPACK_IMPORTED_MODULE_4__.classes)(event.context.draggerGfx).add("bendpoint-dragging");
    // the old path of the activity will otherwise be displayed in gray
    canvas.addMarker(event.context.connection, "djs-element-hidden");
  });
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__.EVENT_BENDPOINT_MOVE_END, 2000, function (event) {
    // the activity will not be displayed if we don't remove the marker we added during bendpoint.move.start
    // high priority is necessary, so we come before something that might stop the execution
    canvas.removeMarker(event.context.connection, "djs-element-hidden");
  });
}
(0,inherits_browser__WEBPACK_IMPORTED_MODULE_0__["default"])(DomainStoryRenderer, diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
DomainStoryRenderer.$inject = ["eventBus", "styles", "canvas", "textRenderer", "commandStack"];
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
  _dirtyFlagService.makeDirty();
  if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.ACTOR)) {
    return this.drawActor(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.WORKOBJECT)) {
    return this.drawWorkObject(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.TEXTANNOTATION)) {
    return this.drawAnnotation(p, element);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.GROUP)) {
    return this.drawGroup(p, element);
  }
};
DomainStoryRenderer.prototype.getShapePath = function (shape) {
  let type = shape.type;
  if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.ACTOR)) {
    return this.getActorPath(shape);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.WORKOBJECT)) {
    return this.getWorkObjectPath(shape);
  } else if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.GROUP)) {
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
  if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.ACTIVITY) {
    return this.drawActivity(p, element);
  } else if (type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_11__.ElementTypes.CONNECTION) {
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

/***/ },

/***/ 63694
/*!***********************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/domainStoryRules.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryRules),
/* harmony export */   isBackground: () => (/* binding */ isBackground),
/* harmony export */   isGroup: () => (/* binding */ isGroup),
/* harmony export */   isLabel: () => (/* binding */ isLabel)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/features/rules/RuleProvider */ 19812);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/util */ 84029);







const HIGH_PRIORITY = 1500;
const MIN_SIZE = 125;
function isGroup(element) {
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
// indirect usage of IMPLICIT_ROOT_ID, constant not used because of Regex
function isBackground(element) {
  return element && /^__implicitroot/.test(element.id);
}
function isLabel(element) {
  return element && !!element.labelTarget;
}
function nonExistingOrLabel(element) {
  return !element || isLabel(element);
}
function canStartConnection(element) {
  if (nonExistingOrLabel(element)) {
    return null;
  }
  return false;
}
/**
 * can source and target be connected?
 */
function canConnect(source, target) {
  // never connect to background; since the direction of the activity can get reversed during dragging, we also have to check if the source
  if (isBackground(target) || isBackground(source)) {
    return false;
  }
  if (isGroup(target)) {
    return false;
  }
  // do not allow a connection from one element to itself
  if (source === target) {
    return false;
  }
  // do not allow a connection between two actors
  if (isActor(source) && isActor(target)) {
    return false;
  }
  // do not allow a connection, where the source or target is an activity
  if (isActivity(source) || isActivity(target)) {
    return false;
  }
  // do not allow a connection, where the source or target is an annotation connection
  if (isConnection(source) || isConnection(target)) {
    return false;
  }
  // do not allow a connection to a connection(the special type of connection between an element and a comment box)
  // when the target is an annotation, the connection type is an annotation connection instead of an activity
  if (isAnnotation(target)) {
    return {
      type: src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.CONNECTION
    };
  }
  return {
    type: src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.ACTIVITY
  };
}
function canResize(shape, newBounds) {
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(shape, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.GROUP)) {
    if (newBounds) {
      const lowerLeft = {
        x: shape.x,
        y: shape.y + shape.height
      };
      const lowerRight = {
        x: shape.x + shape.width,
        y: shape.y + shape.height
      };
      const upperRight = {
        x: shape.x + shape.width,
        y: shape.y
      };
      if (newBounds.x !== shape.x && newBounds.y !== shape.y) {
        // upper left
        if (newBounds.x > lowerRight.x - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
            x: lowerRight.x - MIN_SIZE
          });
        }
        if (newBounds.y > lowerRight.y - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
            y: lowerRight.y - MIN_SIZE
          });
        }
      }
      if (newBounds.x !== shape.x && newBounds.y === shape.y) {
        // lower left
        if (newBounds.x > upperRight.x - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
            x: upperRight.x - MIN_SIZE
          });
        }
      }
      if (newBounds.x === shape.x && newBounds.y !== shape.y) {
        // upper right
        if (newBounds.y > lowerLeft.y - MIN_SIZE) {
          (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
            y: lowerLeft.y - MIN_SIZE
          });
        }
      }
      if (newBounds.height < MIN_SIZE) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
          height: MIN_SIZE
        });
      }
      if (newBounds.width < MIN_SIZE) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(newBounds, {
          width: MIN_SIZE
        });
      }
    }
    return true;
  }
  return false;
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
function DomainStoryRules(eventBus) {
  diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, eventBus);
}
inherits__WEBPACK_IMPORTED_MODULE_1___default()(DomainStoryRules, diagram_js_lib_features_rules_RuleProvider__WEBPACK_IMPORTED_MODULE_2__["default"]);
DomainStoryRules.$inject = ["eventBus"];
DomainStoryRules.prototype.init = function () {
  /**
   * can a shape be created on target?
   */
  function canCreate(shape, target) {
    // allow creation on canvas ||  allow groups on everything || allow everything on groups
    return isBackground(target) || isGroup(shape) || isGroup(target);
  }
  this.addRule("elements.create", function (context) {
    const elements = context.elements,
      target = context.target;
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.every)(elements, function (element) {
      if (isConnection(element)) {
        return canConnect(element.source, element.target);
      }
      return canCreate(element, target);
    });
  });
  this.addRule("elements.move", HIGH_PRIORITY, function (context) {
    const target = context.target,
      shapes = context.shapes;
    // The idea of this code is to make sure that if any of the selected shapes cannot be moved,
    // then the whole selection cannot be moved. However, it actually only checks
    // if the shape that is under the mouse cursor is over another shape.
    // This is probably enough as a full detection over overlapping shapes might make it hard
    // to move large selections
    return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.reduce)(shapes, function (result, s) {
      if (result === false) {
        return false;
      }
      return canCreate(s, target);
    }, undefined);
  });
  this.addRule("shape.create", HIGH_PRIORITY, function (context) {
    const target = context.target,
      shape = context.shape;
    return canCreate(shape, target);
  });
  this.addRule("connection.create", HIGH_PRIORITY, function (context) {
    const source = context.source,
      target = context.target;
    return canConnect(source, target);
  });
  this.addRule("connection.reconnect", HIGH_PRIORITY, function (context) {
    const connection = context.connection,
      source = context.hover || context.source,
      target = context.target;
    const result = canConnectToAnnotation(source, target, connection);
    if (!result) {
      return;
    }
    return canConnect(source, target);
  });
  this.addRule("shape.resize", function (context) {
    const shape = context.shape,
      newBounds = context.newBounds;
    return canResize(shape, newBounds);
  });
  this.addRule("connection.start", function (context) {
    const source = context.source;
    return canStartConnection(source);
  });
  this.addRule("connection.updateWaypoints", function (context) {
    return {
      type: context.connection.type
    };
  });
  // CopyPaste.js requires this empty-looking rule to exist
  this.addRule("element.copy", function (context) {
    return true;
  });
};
DomainStoryRules.prototype.canConnect = canConnect;
DomainStoryRules.prototype.canResize = canResize;

/***/ },

/***/ 28208
/*!*************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/domainStoryUpdater.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryUpdater)
/* harmony export */ });
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/command/CommandInterceptor */ 35353);
/* harmony import */ var diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/util/Collections */ 39233);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/util */ 84029);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domainStoryRules */ 63694);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../domain/entities/elementTypes */ 73190);









/**
 * a handler responsible for updating the element's businessObject
 * once changes on the diagram happen.
 */
function DomainStoryUpdater(eventBus, egon, connectionDocking) {
  diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, eventBus);
  function updateElement(e) {
    let context = e.context,
      shape = context.shape;
    if (!shape) {
      return;
    }
    let businessObject = shape.businessObject;
    let parent = shape.parent;
    let elements = egon._elements;
    // make sure element is added / removed from egon._elements
    if (!parent) {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_3__.remove)(elements, businessObject);
    } else {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_3__.add)(elements, businessObject);
    }
    // save element position
    (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.pick)(shape, ["x", "y"]));
    if (shape.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.GROUP) {
      // save element size if resizable
      (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.pick)(shape, ["height", "width"]));
      // rework the child-parent relations if a group was moved, such that all Objects that are visually in the group are also associated with it
      if ((0,_domainStoryRules__WEBPACK_IMPORTED_MODULE_5__.isBackground)(parent) || (0,_domainStoryRules__WEBPACK_IMPORTED_MODULE_5__.isGroup)(parent)) {
        (0,_util_util__WEBPACK_IMPORTED_MODULE_4__.reworkGroupElements)(parent, shape);
      } else if (parent != null) {
        // the group is created on top of a shape or connection which makes it their child; we need to invert the child-parent relationship
        shape.parent = parent.parent;
        (0,_util_util__WEBPACK_IMPORTED_MODULE_4__.reworkGroupElements)(parent.parent, shape);
      }
    }
    if (shape.parent && "type" in shape.parent && shape.parent.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.GROUP) {
      (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, {
        parent: shape.parent.id
      });
    }
  }
  function updateConnection(e) {
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
    let elements = egon._elements;
    // make sure element is added / removed from egon._elements
    if (!parent) {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_3__.remove)(elements, businessObject);
    } else {
      (0,diagram_js_lib_util_Collections__WEBPACK_IMPORTED_MODULE_3__.add)(elements, businessObject);
    }
    // update waypoints
    (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, {
      waypoints: copyWaypoints(connection)
    });
    if (source) {
      if (!businessObject.source) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, {
          source: source.id
        });
      } else {
        businessObject.source = source.id;
      }
    }
    if (target) {
      if (!businessObject.target) {
        (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.assign)(businessObject, {
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
  // crop connection ends during create/update
  function cropConnection(e) {
    const context = e.context,
      hints = context.hints || {};
    let connection;
    if (!context.cropped && hints.createElementsBehavior !== false) {
      connection = context.connection;
      connection.waypoints = connectionDocking.getCroppedWaypoints(connection);
      context.cropped = true;
    }
  }
  // cropping must be done before updateElement
  // do not change the order of these .executed calls
  this.executed(["connection.layout", "connection.create"], cropConnection);
  this.reverted(["connection.layout"], function (e) {
    delete e.context.cropped;
  });
  this.executed(["shape.create", "shape.move", "shape.delete", "shape.resize", "shape.removeGroupWithChildren"], updateElement);
  this.reverted(["shape.create", "shape.move", "shape.delete", "shape.resize", "shape.removeGroupWithChildren"], updateElement);
  this.executed(["connection.create", "connection.reconnect", "connection.updateWaypoints", "connection.delete", "connection.layout", "connection.move"], updateConnection);
  this.reverted(["connection.create", "connection.reconnect", "connection.updateWaypoints", "connection.delete", "connection.layout", "connection.move"], updateConnection);
}
inherits__WEBPACK_IMPORTED_MODULE_0___default()(DomainStoryUpdater, diagram_js_lib_command_CommandInterceptor__WEBPACK_IMPORTED_MODULE_2__["default"]);
DomainStoryUpdater.$inject = ["eventBus", "egon", "connectionDocking"];

/***/ },

/***/ 76348
/*!************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/index.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_lasso_tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/features/lasso-tool */ 10707);
/* harmony import */ var diagram_js_lib_features_space_tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/space-tool */ 88363);
/* harmony import */ var diagram_js_lib_features_palette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/features/palette */ 42383);
/* harmony import */ var _util_TextRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/TextRenderer */ 81081);
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domainStoryElementFactory */ 66619);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domainStoryRenderer */ 84234);
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./palette/domainStoryPalette */ 18990);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./domainStoryRules */ 63694);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./domainStoryUpdater */ 28208);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./updateHandler/updateLabelHandler */ 5065);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./updateHandler/headlineAndDescriptionUpdateHandler */ 3476);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./context-pad/domainStoryContextPadProvider */ 18144);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./change-icon/replaceMenuProvider */ 86811);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modeling/dSModeling */ 40518);
/* harmony import */ var diagram_js_lib_layout_BaseLayouter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! diagram-js/lib/layout/BaseLayouter */ 17640);
/* harmony import */ var diagram_js_lib_layout_CroppingConnectionDocking__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! diagram-js/lib/layout/CroppingConnectionDocking */ 91569);





















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_9__["default"], diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_10__["default"], diagram_js_lib_features_palette__WEBPACK_IMPORTED_MODULE_2__["default"], diagram_js_lib_features_space_tool__WEBPACK_IMPORTED_MODULE_1__["default"], diagram_js_lib_features_lasso_tool__WEBPACK_IMPORTED_MODULE_0__["default"]],
  __init__: ["domainStoryRenderer", "paletteProvider", "domainStoryRules", "domainStoryUpdater", "contextPadProvider", "replaceMenuProvider"],
  connectionDocking: ["type", diagram_js_lib_layout_CroppingConnectionDocking__WEBPACK_IMPORTED_MODULE_18__["default"]],
  layouter: ["type", diagram_js_lib_layout_BaseLayouter__WEBPACK_IMPORTED_MODULE_17__["default"]],
  textRenderer: ["type", _util_TextRenderer__WEBPACK_IMPORTED_MODULE_3__["default"]],
  elementFactory: ["type", _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_4__["default"]],
  domainStoryRenderer: ["type", _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_5__["default"]],
  paletteProvider: ["type", _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_6__["default"]],
  domainStoryRules: ["type", _domainStoryRules__WEBPACK_IMPORTED_MODULE_7__["default"]],
  domainStoryUpdater: ["type", _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_8__["default"]],
  contextPadProvider: ["type", _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_14__["default"]],
  replaceMenuProvider: ["type", _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_15__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_11__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_12__["default"]],
  headlineAndDescriptionUpdateHandler: ["type", _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_13__["default"]],
  modeling: ["type", _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_16__["default"]]
});

/***/ },

/***/ 97498
/*!*************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/labeling/dsLabelEditingPreview.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingPreview)
/* harmony export */ });
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-svg */ 15845);
/* harmony import */ var diagram_js_lib_util_SvgTransformUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/util/SvgTransformUtil */ 81384);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/util */ 84029);






const MARKER_HIDDEN = "djs-element-hidden",
  MARKER_LABEL_HIDDEN = "djs-label-hidden";
function DSLabelEditingPreview(eventBus, canvas) {
  let self = this;
  let defaultLayer = canvas.getDefaultLayer();
  let element, absoluteElementBBox, gfx;
  eventBus.on("directEditing.activate", function (context) {
    let activeProvider = context.active;
    element = activeProvider.element.label || activeProvider.element;
    if ((0,_util_util__WEBPACK_IMPORTED_MODULE_3__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
      absoluteElementBBox = canvas.getAbsoluteBBox(element);
      gfx = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.create)("g");
      let bracketPath = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.getAnnotationBracketSvg)(element.height);
      let path = self.path = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.create)("path");
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.attr)(path, {
        d: bracketPath,
        strokeWidth: 2,
        stroke: "black"
      });
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.append)(gfx, path);
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.append)(defaultLayer, gfx);
      (0,diagram_js_lib_util_SvgTransformUtil__WEBPACK_IMPORTED_MODULE_1__.translate)(gfx, element.x, element.y);
    }
    if ((0,_util_util__WEBPACK_IMPORTED_MODULE_3__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION) || element.labelTarget) {
      canvas.addMarker(element, MARKER_HIDDEN);
    } else if (element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY) || element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP)) {
      canvas.addMarker(element, MARKER_LABEL_HIDDEN);
    }
  });
  eventBus.on("directEditing.resize", function (context) {
    if ((0,_util_util__WEBPACK_IMPORTED_MODULE_3__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
      let height = context.height,
        dy = context.dy;
      let newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);
      let bracketPath = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.getAnnotationBracketSvg)(newElementHeight);
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.attr)(self.path, {
        d: bracketPath
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
      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_0__.remove)(gfx);
      gfx = undefined;
    }
  });
}
DSLabelEditingPreview.$inject = ["eventBus", "canvas"];

/***/ },

/***/ 12921
/*!**************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/labeling/dsLabelEditingProvider.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSLabelEditingProvider),
/* harmony export */   focusElement: () => (/* binding */ focusElement),
/* harmony export */   getNumberStash: () => (/* binding */ getNumberStash),
/* harmony export */   initializeLabelEditingProvider: () => (/* binding */ initializeLabelEditingProvider),
/* harmony export */   toggleStashUse: () => (/* binding */ toggleStashUse)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dsLabelUtil */ 54554);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/util */ 84029);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domainStoryRules */ 63694);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../diagramJSConstants */ 273);









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
  // Opening an Angular Dialog seems to mess with the focus logic somehow.
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
    activateDirectEdit(event.element);
    if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(event.element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY)) {
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
  eventBus.on(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_6__.EVENT_CREATE_END, 500, function (event) {
    let element = event.shape,
      canExecute = event.context.canExecute;
    if (!canExecute) {
      return;
    }
    if (!(0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY)) {
      activateDirectEdit(element);
    }
    let editingBox = document.getElementsByClassName("djs-direct-editing-content");
    focusElement(editingBox.item(0));
  });
  eventBus.on("autoPlace.end", 500, function (event) {
    activateDirectEdit(event.shape);
  });
  function activateDirectEdit(element) {
    directEditing.activate(element);
  }
  function createAutocomplete(element) {
    const editingBox = document.getElementsByClassName("djs-direct-editing-content");
    focusElement(editingBox.item(0));
    (0,_dsLabelUtil__WEBPACK_IMPORTED_MODULE_1__.createAutocompleteForEdit)(editingBox[0], dictionaryService.getUniqueWorkObjectNames(), element, eventBus);
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
  if ((0,_domainStoryRules__WEBPACK_IMPORTED_MODULE_5__.isBackground)(element)) {
    return;
  }
  let text = (0,_dsLabelUtil__WEBPACK_IMPORTED_MODULE_1__.getLabel)(element);
  if (text === undefined) {
    return;
  }
  let context = {
    text: text
  };
  // bounds
  let bounds = this.getEditingBBox(element);
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(context, bounds);
  let options = {};
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(options, {
      resizable: true,
      autoResize: true
    });
  }
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(context, {
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
  /** The canvas is an object from diagram-js. The IDE might say that zoom is deprecated,
   * because it thinks that canvas is the standard HTML element.**/
  let zoom = canvas.zoom();
  let defaultStyle = this._textRenderer.getDefaultStyle();
  // take Zoom into account
  let defaultFontSize = defaultStyle.fontSize * zoom,
    defaultLineHeight = defaultStyle.lineHeight;
  let style = {
    fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
    fontWeight: this._textRenderer.getDefaultStyle().fontWeight
  };
  // adjust for groups
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.GROUP)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(bounds, {
      minWidth: bbox.width / 2.5 > 125 ? bbox.width / 2.5 : 125,
      maxWidth: bbox.width,
      minHeight: 30 * zoom,
      x: bbox.x,
      y: bbox.y
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(style, {
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
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(bounds, {
      width: bbox.width,
      minHeight: 30,
      y: bbox.y + bbox.height - 20,
      x: bbox.x
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(style, {
      fontSize: defaultFontSize + "px",
      lineHeight: defaultLineHeight,
      paddingTop: 7 * zoom + "px",
      paddingBottom: 7 * zoom + "px",
      paddingLeft: 5 * zoom + "px",
      paddingRight: 5 * zoom + "px"
    });
  }
  // text annotations
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(bounds, {
      width: bbox.width,
      height: bbox.height,
      minWidth: 30 * zoom,
      minHeight: 10 * zoom
    });
    (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(style, {
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
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_4__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.TEXTANNOTATION)) {
    bbox = this._canvas.getAbsoluteBBox(element);
    newBounds = {
      x: element.x,
      y: element.y,
      width: element.width / bbox.width * bounds.width,
      height: element.height / bbox.height * bounds.height
    };
  }
  this._modeling.updateLabel(element, (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_3__.sanitizeTextForSVGExport)(newLabel), newBounds);
};

/***/ },

/***/ 54554
/*!***************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/labeling/dsLabelUtil.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   approximateArialSize11TextWidthInPixel: () => (/* binding */ approximateArialSize11TextWidthInPixel),
/* harmony export */   createAutocompleteForEdit: () => (/* binding */ createAutocompleteForEdit),
/* harmony export */   getLabel: () => (/* binding */ getLabel),
/* harmony export */   getNumber: () => (/* binding */ getNumber),
/* harmony export */   selectPartOfActivity: () => (/* binding */ selectPartOfActivity),
/* harmony export */   setLabel: () => (/* binding */ setLabel),
/* harmony export */   setNumber: () => (/* binding */ setNumber)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/util */ 84029);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../diagramJSConstants */ 273);





function getLabelAttr(semantic) {
  if (semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) || semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
    return "name";
  }
  if (semantic.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
    return "text";
  }
}
function getNumberAttr(semantic) {
  if ((0,_util_util__WEBPACK_IMPORTED_MODULE_1__.is)(semantic, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY)) {
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
function approximateArialSize11TextWidthInPixel(text) {
  if (!text) {
    return 0;
  }
  // 5.1 is the approximate median width of a character in fontsize 11 with font Arial
  return text.length * 5.1;
}
function createAutocompleteForEdit(editingBox, workObjectNames, businessElement, eventBus) {
  clearOldAutocompleteList();
  if (!businessElement || !businessElement.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
    return;
  }
  let currentFocus, workObjectNamesFilteredBySearchterm;
  editingBox.addEventListener("input", inputFunction);
  function inputFunction() {
    if (!workObjectNames || workObjectNames.length === 0 || !businessElement || !businessElement.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      return;
    }
    // the direct editing field of actors and workObjects is a recycled html-element and has old values that need to be overridden
    if (businessElement.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      this.value = this.innerHTML;
    }
    let searchterm = this.value?.toUpperCase() ? this.value.toUpperCase() : "";
    currentFocus = -1;
    clearOldAutocompleteList();
    const autocompleteList = document.createElement("DIV");
    autocompleteList.setAttribute("id", "autocomplete-list");
    autocompleteList.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(autocompleteList);
    workObjectNamesFilteredBySearchterm = [];
    for (const name of workObjectNames) {
      if (searchterm.length === 0 || name.toUpperCase().startsWith(searchterm) && !workObjectNamesFilteredBySearchterm.includes(name)) {
        const autocompleteItem = document.createElement("div");
        autocompleteItem.innerHTML = name;
        autocompleteItem.innerHTML += "<input type='hidden' value='" + name + "'>";
        autocompleteItem.addEventListener("click", function (e) {
          e.preventDefault();
          currentFocus = workObjectNamesFilteredBySearchterm.indexOf(name);
          updateFocusOnAutocompleteList();
          // Keydown Events do not properly work on autoCompleteItem -> set the focus on the editigBox so the keyboard controls still work
          editingBox.focus();
        });
        // TODO dbClick should trigger the selection of the autocomplete-item
        autocompleteList.appendChild(autocompleteItem);
        workObjectNamesFilteredBySearchterm.push(name);
      }
    }
  }
  editingBox.onkeydown = function onKeyDownListener(e) {
    if (!businessElement || !businessElement.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT)) {
      return;
    }
    if (e.keyCode === 40) {
      // KEYDOWN
      e.preventDefault();
      currentFocus++;
      updateFocusOnAutocompleteList();
    } else if (e.keyCode === 38) {
      // KEYUP
      e.preventDefault();
      currentFocus--;
      updateFocusOnAutocompleteList();
    } else if (e.key === "Enter" && !e.shiftKey) {
      // ENTER
      e.preventDefault();
      if (currentFocus > -1) {
        businessElement.businessObject.name = workObjectNamesFilteredBySearchterm[currentFocus];
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
          element: businessElement
        });
        // remove obsolete listener
        // it is always added when opening the editingBox with the associated businessObject as Context
        editingBox.removeEventListener("input", inputFunction);
      }
    }
  };
  function clearOldAutocompleteList(target) {
    const oldAutocompleteList = document.getElementById("autocomplete-list");
    if (oldAutocompleteList && !(target?.classList.contains("djs-direct-editing-content") || target?.parentElement.id === "autocomplete-list")) {
      oldAutocompleteList.remove();
      return true;
    }
    return false;
  }
  function updateFocusOnAutocompleteList() {
    const autocompleteList = document.getElementById("autocomplete-list");
    const autocompleteListItems = autocompleteList?.getElementsByTagName("div");
    if (!autocompleteListItems || autocompleteListItems.length < 1) {
      return;
    }
    for (const item of autocompleteListItems) {
      item.classList.remove("autocomplete-active");
    }
    // wrapAround
    if (currentFocus >= autocompleteListItems.length) {
      currentFocus = 0;
    } else if (currentFocus < 0) {
      currentFocus = autocompleteListItems.length - 1;
    }
    autocompleteListItems[currentFocus].classList.add("autocomplete-active");
  }
  document.addEventListener("click", function (e) {
    if (clearOldAutocompleteList(e.target)) {
      // remove event listener
      // it is always added when opening the editingBox with the associated businessObject as Context
      editingBox.removeEventListener("input", inputFunction);
    }
  });
}

/***/ },

/***/ 47211
/*!*********************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/labeling/index.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_change_support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/features/change-support */ 46242);
/* harmony import */ var diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/resize */ 40844);
/* harmony import */ var diagram_js_direct_editing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js-direct-editing */ 96914);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 5065);
/* harmony import */ var _dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dsLabelEditingPreview */ 97498);
/* harmony import */ var _dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dsLabelEditingProvider */ 12921);
/* harmony import */ var _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modeling/dSModeling */ 40518);










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_change_support__WEBPACK_IMPORTED_MODULE_0__["default"], diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_1__["default"], diagram_js_direct_editing__WEBPACK_IMPORTED_MODULE_2__["default"]],
  __init__: ["dSlabelEditingProvider", "dSlabelEditingPreview"],
  dSlabelEditingProvider: ["type", _dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_6__["default"]],
  dSlabelEditingPreview: ["type", _dsLabelEditingPreview__WEBPACK_IMPORTED_MODULE_5__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_4__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_3__["default"]],
  modeling: ["type ", _modeling_dSModeling__WEBPACK_IMPORTED_MODULE_7__["default"]]
});

/***/ },

/***/ 2512
/*!************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/labeling/position.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countLines: () => (/* binding */ countLines),
/* harmony export */   labelPosition: () => (/* binding */ labelPosition),
/* harmony export */   labelPositionX: () => (/* binding */ labelPositionX),
/* harmony export */   labelPositionY: () => (/* binding */ labelPositionY)
/* harmony export */ });
/* harmony import */ var _dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsLabelUtil */ 54554);
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
  const angle = (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_1__.angleBetween)(startPoint, endPoint);
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

/***/ },

/***/ 40518
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/modeling/dSModeling.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSModeling)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/features/modeling/Modeling */ 98680);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ 22122);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);




function DSModeling(eventBus, elementFactory, commandStack, domainStoryRules) {
  diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, eventBus, elementFactory, commandStack, domainStoryRules);
}
diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.updateLabel = function (element, newLabel, newBounds) {
  if (element.businessObject ? newLabel !== element.businessObject.name : newLabel !== element.name) {
    this._commandStack.execute("element.updateLabel", {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds
    });
  }
};
diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.updateNumber = function (element, newNumber, newBounds) {
  if (element.businessObject ? newNumber !== element.businessObject.number : newNumber !== element.number) {
    this._commandStack.execute("element.updateLabel", {
      element: element,
      newNumber: newNumber,
      newBounds: newBounds
    });
  }
};
diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.replaceShape = function (oldShape, newShape, hints) {
  let context = {
    oldShape: oldShape,
    newData: newShape,
    hints: hints || {}
  };
  this._commandStack.execute("shape.replace", context);
  return context.newShape;
};
diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.removeGroup = function (element) {
  this._commandStack.execute("shape.removeGroupWithoutChildren", {
    element: element
  });
  this.removeElements({
    element
  });
};
(0,util__WEBPACK_IMPORTED_MODULE_1__.inherits)(DSModeling, diagram_js_lib_features_modeling_Modeling__WEBPACK_IMPORTED_MODULE_0__["default"]);
DSModeling.$inject = ["eventBus", "elementFactory", "commandStack", "domainStoryRules"];

/***/ },

/***/ 30038
/*!*********************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/modeling/index.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../palette/domainStoryPalette */ 18990);
/* harmony import */ var diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/create */ 48256);
/* harmony import */ var diagram_js_lib_features_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/features/connect */ 60262);
/* harmony import */ var diagram_js_lib_i18n_translate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! diagram-js/lib/i18n/translate */ 3933);
/* harmony import */ var diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! diagram-js/lib/features/context-pad */ 93331);
/* harmony import */ var diagram_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! diagram-js/lib/features/popup-menu */ 63162);
/* harmony import */ var diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! diagram-js/lib/command/CommandStack */ 77738);
/* harmony import */ var _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../updateHandler/updateLabelHandler */ 5065);
/* harmony import */ var _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domainStoryUpdater */ 28208);
/* harmony import */ var _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../domainStoryElementFactory */ 66619);
/* harmony import */ var _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../updateHandler/headlineAndDescriptionUpdateHandler */ 3476);
/* harmony import */ var _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../domainStoryRenderer */ 84234);
/* harmony import */ var _dSModeling__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dSModeling */ 40518);
/* harmony import */ var _domainStoryRules__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../domainStoryRules */ 63694);
/* harmony import */ var _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../change-icon/replaceMenuProvider */ 86811);
/* harmony import */ var _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../context-pad/domainStoryContextPadProvider */ 18144);


















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_create__WEBPACK_IMPORTED_MODULE_1__["default"], diagram_js_lib_features_context_pad__WEBPACK_IMPORTED_MODULE_4__["default"], diagram_js_lib_features_connect__WEBPACK_IMPORTED_MODULE_2__["default"], diagram_js_lib_i18n_translate__WEBPACK_IMPORTED_MODULE_3__["default"], diagram_js_lib_features_popup_menu__WEBPACK_IMPORTED_MODULE_5__["default"]],
  __init__: ["domainStoryRenderer", "paletteProvider", "domainStoryRules", "domainStoryUpdater", "contextPadProvider", "replaceMenuProvider"],
  elementFactory: ["type", _domainStoryElementFactory__WEBPACK_IMPORTED_MODULE_9__["default"]],
  domainStoryRenderer: ["type", _domainStoryRenderer__WEBPACK_IMPORTED_MODULE_11__["default"]],
  paletteProvider: ["type", _palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_0__["default"]],
  domainStoryRules: ["type", _domainStoryRules__WEBPACK_IMPORTED_MODULE_13__["default"]],
  domainStoryUpdater: ["type", _domainStoryUpdater__WEBPACK_IMPORTED_MODULE_8__["default"]],
  contextPadProvider: ["type", _context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_15__["default"]],
  replaceMenuProvider: ["type", _change_icon_replaceMenuProvider__WEBPACK_IMPORTED_MODULE_14__["default"]],
  commandStack: ["type", diagram_js_lib_command_CommandStack__WEBPACK_IMPORTED_MODULE_6__["default"]],
  updateLabelHandler: ["type", _updateHandler_updateLabelHandler__WEBPACK_IMPORTED_MODULE_7__["default"]],
  headlineAndDescriptionUpdateHandler: ["type", _updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_10__["default"]],
  modeling: ["type", _dSModeling__WEBPACK_IMPORTED_MODULE_12__["default"]]
});

/***/ },

/***/ 19955
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/numbering/numbering.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAutomaticNumber: () => (/* binding */ generateAutomaticNumber),
/* harmony export */   getNumbersAndIDs: () => (/* binding */ getNumbersAndIDs),
/* harmony export */   initializeNumbering: () => (/* binding */ initializeNumbering),
/* harmony export */   isNumberMultiple: () => (/* binding */ isNumberMultiple),
/* harmony export */   numberBoxDefinitions: () => (/* binding */ numberBoxDefinitions),
/* harmony export */   setNumberIsMultiple: () => (/* binding */ setNumberIsMultiple),
/* harmony export */   updateExistingNumbersAtEditing: () => (/* binding */ updateExistingNumbersAtEditing),
/* harmony export */   updateExistingNumbersAtGeneration: () => (/* binding */ updateExistingNumbersAtGeneration),
/* harmony export */   updateMultipleNumberRegistry: () => (/* binding */ updateMultipleNumberRegistry)
/* harmony export */ });
/* harmony import */ var src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/mathExtensions */ 67858);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../diagramJSConstants */ 273);




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
      wantedNumber = i;
      i = usedNumbers.length;
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
function setNumberIsMultiple(number, multi) {
  multipleNumberRegistry[number] = multi;
}
function isNumberMultiple(number) {
  return multipleNumberRegistry[number];
}
function setNumberOfActivity(elementArray, wantedNumber, eventBus) {
  if (elementArray) {
    elementArray.forEach(element => {
      if (element) {
        let businessObject = element.businessObject;
        if (businessObject) {
          businessObject.number = wantedNumber;
        }
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
          element
        });
      }
    });
  }
}

/***/ },

/***/ 18990
/*!*********************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/palette/domainStoryPalette.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PaletteProvider),
/* harmony export */   initializePalette: () => (/* binding */ initializePalette)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);




let iconDictionary;
function initializePalette(iconDictionaryService) {
  iconDictionary = iconDictionaryService;
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
      let shape = elementFactory.createShape((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)({
        type: type
      }, options));
      (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(shape.businessObject, {
        id: shape.id
      });
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
function initPalette(actions, spaceTool, lassoTool, createAction) {
  iconDictionary?.initTypeDictionaries();
  let actorTypes = iconDictionary?.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
  actorTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
    "actor-separator": {
      group: "actor",
      separator: true
    }
  });
  let workObjectTypes = iconDictionary?.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  workObjectTypes?.keysArray().forEach(name => {
    addCanvasObjectTypes(name, createAction, actions, "actor", src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.WORKOBJECT);
  });
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, {
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
  let icon = iconDictionary.getCSSClassOfIcon(name);
  let action = [];
  action["domainStory-" + className + name] = createAction(`${elementType}${name}`, className, icon, name);
  (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)(actions, action);
}

/***/ },

/***/ 95391
/*!****************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/shortcuts/AdditionalEditorActions.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdditionalEditorActions)
/* harmony export */ });
/* harmony import */ var inherits_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits-browser */ 2890);
/* harmony import */ var diagram_js_lib_features_editor_actions_EditorActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/editor-actions/EditorActions */ 56891);


function AdditionalEditorActions(injector) {
  injector.invoke(diagram_js_lib_features_editor_actions_EditorActions__WEBPACK_IMPORTED_MODULE_1__["default"], this);
}
(0,inherits_browser__WEBPACK_IMPORTED_MODULE_0__["default"])(AdditionalEditorActions, diagram_js_lib_features_editor_actions_EditorActions__WEBPACK_IMPORTED_MODULE_1__["default"]);
AdditionalEditorActions.$inject = ["injector"];
/**
 * Register default actions.
 *
 * @param {Injector} injector
 */
AdditionalEditorActions.prototype._registerDefaultActions = function (injector) {
  // (0) invoke super method
  diagram_js_lib_features_editor_actions_EditorActions__WEBPACK_IMPORTED_MODULE_1__["default"].prototype._registerDefaultActions.call(this, injector);
  // (1) retrieve optional components to integrate with
  const canvas = injector.get("canvas", false);
  const elementRegistry = injector.get("elementRegistry", false);
  const selection = injector.get("selection", false);
  const spaceTool = injector.get("spaceTool", false);
  const lassoTool = injector.get("lassoTool", false);
  const handTool = injector.get("handTool", false);
  const directEditing = injector.get("directEditing", false);
  if (canvas && elementRegistry && selection) {
    this._registerAction("selectElements", function () {
      // select all elements except for the invisible
      // root element
      const rootElement = canvas.getRootElement();
      const elements = elementRegistry.filter(function (element) {
        return element !== rootElement;
      });
      selection.select(elements);
      return elements;
    });
  }
  if (spaceTool) {
    this._registerAction("spaceTool", function () {
      spaceTool.toggle();
    });
  }
  if (lassoTool) {
    this._registerAction("lassoTool", function () {
      lassoTool.toggle();
    });
  }
  if (handTool) {
    this._registerAction("handTool", function () {
      handTool.toggle();
    });
  }
  if (selection && directEditing) {
    this._registerAction("directEditing", function () {
      const currentSelection = selection.get();
      if (currentSelection.length) {
        directEditing.activate(currentSelection[0]);
      }
    });
  }
};

/***/ },

/***/ 29600
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/shortcuts/AdditionalKeyboardBindings.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdditionalKeyboardBindings)
/* harmony export */ });
/* harmony import */ var inherits_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inherits-browser */ 2890);
/* harmony import */ var diagram_js_lib_features_keyboard_KeyboardBindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/keyboard/KeyboardBindings */ 17946);


function AdditionalKeyboardBindings(injector) {
  injector.invoke(diagram_js_lib_features_keyboard_KeyboardBindings__WEBPACK_IMPORTED_MODULE_1__["default"], this);
}
(0,inherits_browser__WEBPACK_IMPORTED_MODULE_0__["default"])(AdditionalKeyboardBindings, diagram_js_lib_features_keyboard_KeyboardBindings__WEBPACK_IMPORTED_MODULE_1__["default"]);
AdditionalKeyboardBindings.$inject = ["injector"];
AdditionalKeyboardBindings.prototype.registerBindings = function (keyboard, editorActions) {
  // inherit default bindings
  diagram_js_lib_features_keyboard_KeyboardBindings__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.registerBindings.call(this, keyboard, editorActions);
  function addListener(action, fn) {
    if (editorActions.isRegistered(action)) {
      keyboard.addListener(fn);
    }
  }
  // select all elements
  // CTRL + A
  addListener("selectElements", function (context) {
    const event = context.keyEvent;
    if (keyboard.isKey(["a", "A"], event) && keyboard.isCmd(event)) {
      editorActions.trigger("selectElements");
      return true;
    }
  });
  // activate space tool
  // S
  addListener("spaceTool", function (context) {
    const event = context.keyEvent;
    if (keyboard.hasModifier(event)) {
      return;
    }
    if (keyboard.isKey(["s", "S"], event)) {
      editorActions.trigger("spaceTool");
      return true;
    }
  });
  // activate lasso tool
  // L
  addListener("lassoTool", function (context) {
    const event = context.keyEvent;
    if (keyboard.hasModifier(event)) {
      return;
    }
    if (keyboard.isKey(["l", "L"], event)) {
      editorActions.trigger("lassoTool");
      return true;
    }
  });
  // activate hand tool
  // H
  addListener("handTool", function (context) {
    const event = context.keyEvent;
    if (keyboard.hasModifier(event)) {
      return;
    }
    if (keyboard.isKey(["h", "H"], event)) {
      editorActions.trigger("handTool");
      return true;
    }
  });
  // activate direct editing
  // E
  addListener("directEditing", function (context) {
    const event = context.keyEvent;
    if (keyboard.hasModifier(event)) {
      return;
    }
    if (keyboard.isKey(["e", "E"], event)) {
      editorActions.trigger("directEditing");
      return true;
    }
  });
};

/***/ },

/***/ 51623
/*!**********************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/shortcuts/index.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_features_editor_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/features/editor-actions */ 56919);
/* harmony import */ var diagram_js_lib_features_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/keyboard */ 6329);
/* harmony import */ var _AdditionalEditorActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdditionalEditorActions */ 95391);
/* harmony import */ var _AdditionalKeyboardBindings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdditionalKeyboardBindings */ 29600);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __depends__: [diagram_js_lib_features_editor_actions__WEBPACK_IMPORTED_MODULE_0__["default"], diagram_js_lib_features_keyboard__WEBPACK_IMPORTED_MODULE_1__["default"]],
  __init__: ["additionalEditorActions", "additionalKeyBindings"],
  additionalEditorActions: ["type", _AdditionalEditorActions__WEBPACK_IMPORTED_MODULE_2__["default"]],
  additionalKeyBindings: ["type", _AdditionalKeyboardBindings__WEBPACK_IMPORTED_MODULE_3__["default"]]
});

/***/ },

/***/ 87251
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/updateHandler/activityUpdateHandlers.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ activityUpdateHandler),
/* harmony export */   initializeActivityUpdateHandler: () => (/* binding */ initializeActivityUpdateHandler)
/* harmony export */ });
/* harmony import */ var _numbering_numbering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../numbering/numbering */ 19955);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../diagramJSConstants */ 273);




/**
 * commandStack Handler for changes at activities
 */
let canvasElementRegistry;
function initializeActivityUpdateHandler(canvasElementRegistryService) {
  canvasElementRegistry = canvasElementRegistryService;
}
function activityUpdateHandler(commandStack, eventBus) {
  commandStack.registerHandler(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_DIRECTION_CHANGE_EVENT, activity_directionChange);
  commandStack.registerHandler(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_CHANGED_EVENT, activity_changed);
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
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      semantic.name = context.oldLabel;
      semantic.number = context.oldNumber;
      revertAutomaticNumberGenerationChange(context.oldNumbersWithIDs, eventBus);
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
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
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
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
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
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
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
          element
        });
        iDWithNumber.splice(j, 1);
      }
    }
  }
}

/***/ },

/***/ 55629
/*!*****************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/updateHandler/elementUpdateHandler.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ elementUpdateHandler)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ 84029);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../diagramJSConstants */ 273);





function elementUpdateHandler(commandStack, eventBus) {
  commandStack.registerHandler(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.ELEMENT_COLOR_CHANGE_EVENT, element_colorChange);
  commandStack.registerHandler(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.SHAPE_REMOVE_GROUP_WITHOUT_CHILDREN_EVENT, removeGroupWithoutChildren);
  function element_colorChange() {
    this.preExecute = function (context) {
      context.oldColor = context.businessObject.pickedColor;
    };
    this.execute = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      if (semantic.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION) && element.incoming[0]) {
        element.incoming[0].businessObject.pickedColor = context.newColor;
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
          element: element.incoming[0]
        });
      }
      semantic.pickedColor = context.newColor;
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
        element
      });
    };
    this.revert = function (context) {
      let semantic = context.businessObject;
      let element = context.element;
      if (semantic.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION) && element.incoming[0]) {
        element.incoming[0].businessObject.pickedColor = context.oldColor;
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
          element: element.incoming[0]
        });
      }
      semantic.pickedColor = context.oldColor;
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
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
        (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.undoGroupRework)(element, child);
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_ELEMENT_CHANGED, {
          element: child
        });
      });
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_SHAPE_REMOVE, {
        element
      });
    };
    this.revert = function (ctx) {
      let element = ctx.element;
      eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_2__.EVENT_SHAPE_ADDED, {
        element
      });
      ctx.element.children.forEach(child => {
        reworkGroupElements(element, child);
      });
    };
  }
}

/***/ },

/***/ 3476
/*!********************************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/updateHandler/headlineAndDescriptionUpdateHandler.js ***!
  \********************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ headlineAndDescriptionUpdateHandler)
/* harmony export */ });
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);

function headlineAndDescriptionUpdateHandler(commandStack, propertiesService) {
  commandStack.registerHandler("story.updateHeadlineAndDescriptionAndScope", handlerFunction);
  function handlerFunction() {
    this.execute = function (ctx) {
      ctx.oldTitle = propertiesService.getTitle();
      ctx.oldDescription = propertiesService.getDescription();
      ctx.oldScope = propertiesService.getScope();
      propertiesService.updateTitleAndDescriptionAndScope((0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeTextForSVGExport)(ctx.newTitle), (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_0__.sanitizeTextForSVGExport)(ctx.newDescription), ctx.newScope, false);
    };
    this.revert = function (ctx) {
      propertiesService.updateTitleAndDescriptionAndScope(ctx.oldTitle, ctx.oldDescription, ctx.oldScope, false);
    };
  }
}

/***/ },

/***/ 37102
/*!**************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/updateHandler/massRenameHandler.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DSMassRenameHandler)
/* harmony export */ });
/* harmony import */ var _diagramJSConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../diagramJSConstants */ 273);



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
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_0__.EVENT_ELEMENT_CHANGED, {
          element
        });
      });
    };
    this.revert = function (context) {
      let relevantElements = context.elements;
      relevantElements.forEach(element => {
        let semantic = element.businessObject;
        semantic.name = context.oldLabel;
        eventBus.fire(_diagramJSConstants__WEBPACK_IMPORTED_MODULE_0__.EVENT_ELEMENT_CHANGED, {
          element
        });
      });
    };
  }
}

/***/ },

/***/ 5065
/*!***************************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/updateHandler/updateLabelHandler.js ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateLabelHandler)
/* harmony export */ });
/* harmony import */ var _labeling_dsLabelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../labeling/dsLabelUtil */ 54554);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/util */ 84029);





const NULL_DIMENSIONS = {
  width: 0,
  height: 0
};
/**
 * a handler that updates the text or label of an element.
 */
function UpdateLabelHandler(modeling, textRenderer, commandStack) {
  commandStack.registerHandler("element.updateLabel", handlerFunction);
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
      if ((0,_util_util__WEBPACK_IMPORTED_MODULE_2__.is)(element, src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.TEXTANNOTATION)) {
        let bo = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getBusinessObject)(label);
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

/***/ },

/***/ 81081
/*!************************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/util/TextRenderer.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextRenderer)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var diagram_js_lib_util_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/util/Text */ 46209);


const DEFAULT_FONT_SIZE = 12;
const LINE_HEIGHT_RATIO = 1.2;
const MIN_TEXT_ANNOTATION_HEIGHT = 30;
/**
 * @typedef { {
 *   fontFamily: string;
 *   fontSize: number;
 *   fontWeight: string;
 *   lineHeight: number;
 * } } TextRendererStyle
 *
 * @typedef { {
 *   defaultStyle?: Partial<TextRendererStyle>;
 *   externalStyle?: Partial<TextRendererStyle>;
 * } } TextRendererConfig
 *
 * @typedef { import('diagram-js/lib/util/Text').TextLayoutConfig } TextLayoutConfig
 *
 * @typedef { import('diagram-js/lib/util/Types').Rect } Rect
 */
/**
 * Renders text and computes text bounding boxes.
 *
 * @param {TextRendererConfig} [config]
 */
function TextRenderer(config) {
  const defaultStyle = (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)({
    fontFamily: "Arial, sans-serif",
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: "normal",
    lineHeight: LINE_HEIGHT_RATIO
  }, config && config.defaultStyle || {});
  const fontSize = parseInt(defaultStyle.fontSize, 10) - 1;
  const externalStyle = (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.assign)({}, defaultStyle, {
    fontSize: fontSize
  }, config && config.externalStyle || {});
  const textUtil = new diagram_js_lib_util_Text__WEBPACK_IMPORTED_MODULE_1__["default"]({
    style: defaultStyle
  });
  /**
   * Get the new bounds of an externally rendered,
   * layouted label.
   *
   * @param {Rect} bounds
   * @param {string} text
   *
   * @return {Rect}
   */
  this.getExternalLabelBounds = function (bounds, text) {
    const layoutedDimensions = textUtil.getDimensions(text, {
      box: {
        width: 90,
        height: 30
      },
      style: externalStyle
    });
    // resize label shape to fit label text
    return {
      x: Math.round(bounds.x + bounds.width / 2 - layoutedDimensions.width / 2),
      y: Math.round(bounds.y),
      width: Math.ceil(layoutedDimensions.width),
      height: Math.ceil(layoutedDimensions.height)
    };
  };
  /**
   * Get the new bounds of text annotation.
   *
   * @param {Rect} bounds
   * @param {string} text
   *
   * @return {Rect}
   */
  this.getTextAnnotationBounds = function (bounds, text) {
    const layoutedDimensions = textUtil.getDimensions(text, {
      box: bounds,
      style: defaultStyle,
      align: "left-top",
      padding: 5
    });
    return {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: Math.max(MIN_TEXT_ANNOTATION_HEIGHT, Math.round(layoutedDimensions.height))
    };
  };
  /**
   * Create a layouted text element.
   *
   * @param {string} text
   * @param {TextLayoutConfig} [options]
   *
   * @return {SVGElement} rendered text
   */
  this.createText = function (text, options) {
    return textUtil.createText(text, options || {});
  };
  /**
   * Get default text style.
   */
  this.getDefaultStyle = function () {
    return defaultStyle;
  };
  /**
   * Get the external text style.
   */
  this.getExternalStyle = function () {
    return externalStyle;
  };
}
TextRenderer.$inject = ["config.textRenderer"];

/***/ },

/***/ 84029
/*!****************************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/features/util/util.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAnnotationBracketSvg: () => (/* binding */ getAnnotationBracketSvg),
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
          if (innerShape.children.includes(shape)) {
            innerShape.children.remove(shape);
          }
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
  superParent.children.set(undefined, shape);
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
/**
 * Annotations have a bracket on the left side.
 */
function getAnnotationBracketSvg(height) {
  return `m 0, 0 m 10,0 l -10,0 l 0,${height} l 10,0`;
}

/***/ },

/***/ 46970
/*!***************************************************!*\
  !*** ./src/app/tools/modeler/diagram-js/index.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomainStoryModeler)
/* harmony export */ });
/* harmony import */ var _BaseViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseViewer */ 42523);
/* harmony import */ var diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diagram-js/lib/features/resize */ 40844);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inherits */ 98069);
/* harmony import */ var inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _features__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./features */ 76348);
/* harmony import */ var _features_labeling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./features/labeling */ 47211);
/* harmony import */ var _features_modeling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./features/modeling */ 30038);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var diagram_js_lib_navigation_movecanvas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! diagram-js/lib/navigation/movecanvas */ 26962);
/* harmony import */ var diagram_js_lib_navigation_keyboard_move__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! diagram-js/lib/navigation/keyboard-move */ 9612);
/* harmony import */ var diagram_js_lib_navigation_zoomscroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! diagram-js/lib/navigation/zoomscroll */ 8901);
/* harmony import */ var diagram_js_lib_features_move__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! diagram-js/lib/features/move */ 74569);
/* harmony import */ var diagram_js_lib_features_bendpoints__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! diagram-js/lib/features/bendpoints */ 31068);
/* harmony import */ var diagram_js_lib_features_connection_preview__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! diagram-js/lib/features/connection-preview */ 54205);
/* harmony import */ var _features_copyPaste__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./features/copyPaste */ 95223);
/* harmony import */ var diagram_js_lib_features_space_tool__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! diagram-js/lib/features/space-tool */ 88363);
/* harmony import */ var diagram_js_lib_features_lasso_tool__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! diagram-js/lib/features/lasso-tool */ 10707);
/* harmony import */ var diagram_js_lib_features_hand_tool__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! diagram-js/lib/features/hand-tool */ 14590);
/* harmony import */ var diagram_js_lib_features_connect__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! diagram-js/lib/features/connect */ 60262);
/* harmony import */ var diagram_js_lib_features_keyboard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! diagram-js/lib/features/keyboard */ 6329);
/* harmony import */ var diagram_js_lib_features_editor_actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! diagram-js/lib/features/editor-actions */ 56919);
/* harmony import */ var diagram_js_lib_features_snapping__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! diagram-js/lib/features/snapping */ 22760);
/* harmony import */ var _features_shortcuts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./features/shortcuts */ 51623);
/* harmony import */ var diagram_js_minimap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! diagram-js-minimap */ 39843);
/* harmony import */ var _bpmn_io_align_to_origin__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @bpmn-io/align-to-origin */ 25437);
/* harmony import */ var _features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./features/diagramJSConstants */ 273);


























// Do not convert to class, this breaks the modeler
function DomainStoryModeler(options) {
  _BaseViewer__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, options);
  this._elements = [];
  this._groupElements = [];
}
inherits__WEBPACK_IMPORTED_MODULE_3___default()(DomainStoryModeler, _BaseViewer__WEBPACK_IMPORTED_MODULE_0__["default"]);
DomainStoryModeler.prototype._modules = [].concat([_features__WEBPACK_IMPORTED_MODULE_4__["default"], _features_labeling__WEBPACK_IMPORTED_MODULE_5__["default"], _features_modeling__WEBPACK_IMPORTED_MODULE_6__["default"]], [diagram_js_lib_features_resize__WEBPACK_IMPORTED_MODULE_1__["default"]], [diagram_js_lib_features_space_tool__WEBPACK_IMPORTED_MODULE_15__["default"], diagram_js_lib_features_lasso_tool__WEBPACK_IMPORTED_MODULE_16__["default"], diagram_js_lib_features_hand_tool__WEBPACK_IMPORTED_MODULE_17__["default"]], [diagram_js_lib_navigation_movecanvas__WEBPACK_IMPORTED_MODULE_8__["default"], diagram_js_lib_navigation_keyboard_move__WEBPACK_IMPORTED_MODULE_9__["default"], diagram_js_lib_navigation_zoomscroll__WEBPACK_IMPORTED_MODULE_10__["default"]],
// Navigation on Canvas
[diagram_js_lib_features_move__WEBPACK_IMPORTED_MODULE_11__["default"], diagram_js_lib_features_bendpoints__WEBPACK_IMPORTED_MODULE_12__["default"], diagram_js_lib_features_connection_preview__WEBPACK_IMPORTED_MODULE_13__["default"], _features_copyPaste__WEBPACK_IMPORTED_MODULE_14__["default"], diagram_js_lib_features_connect__WEBPACK_IMPORTED_MODULE_18__["default"]],
// Move/Create/Alter Elements
[diagram_js_lib_features_keyboard__WEBPACK_IMPORTED_MODULE_19__["default"], diagram_js_lib_features_editor_actions__WEBPACK_IMPORTED_MODULE_20__["default"], _features_shortcuts__WEBPACK_IMPORTED_MODULE_22__["default"]],
// Shortcuts
[diagram_js_lib_features_snapping__WEBPACK_IMPORTED_MODULE_21__["default"]],
// Alignment
[_bpmn_io_align_to_origin__WEBPACK_IMPORTED_MODULE_24__["default"]],
// places diagram in the lower right quadrant (+x/+y) of the canvas
[diagram_js_minimap__WEBPACK_IMPORTED_MODULE_23__["default"]]);
DomainStoryModeler.prototype._createElementFromBusinessObject = function (bo) {
  let parentId = bo.parent;
  delete bo.children;
  delete bo.parent;
  this._elements.push(bo);
  let canvas = this.get("canvas"),
    elementFactory = this.get("elementFactory");
  let attributes = (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)({
    businessObject: bo
  }, bo);
  let shape = elementFactory.create("shape", attributes);
  if (isOfTypeGroup(bo)) {
    this._groupElements[bo.id] = shape;
  }
  if (parentId) {
    let parentShape = this._groupElements[parentId];
    if (isOfTypeGroup(parentShape)) {
      return canvas.addShape(shape, parentShape, parentShape.id);
    }
  }
  return canvas.addShape(shape);
};
DomainStoryModeler.prototype._addConnection = function (element) {
  this._elements.push(element);
  let canvas = this.get("canvas"),
    elementFactory = this.get("elementFactory"),
    elementRegistry = this.get("elementRegistry");
  let attributes = (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)({
    businessObject: element
  }, element);
  let connection = elementFactory.create("connection", (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(attributes, {
    source: elementRegistry.get(element.source),
    target: elementRegistry.get(element.target)
  }), elementRegistry.get(element.source).parent);
  return canvas.addConnection(connection);
};
DomainStoryModeler.prototype.importBusinessObjects = function (businessObjects) {
  this.get("eventBus").fire(_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_25__.EVENT_DIAGRAM_CLEAR, {});
  this._elements = [];
  this._groupElements = [];
  if (!(0,min_dash__WEBPACK_IMPORTED_MODULE_2__.isArray)(businessObjects)) {
    throw new Error("argument must be an array");
  }
  let connections = [],
    groups = [],
    otherElementTypes = [];
  businessObjects.forEach(function (bo) {
    if (isOfTypeConnection(bo)) {
      connections.push(bo);
    } else if (isOfTypeGroup(bo)) {
      groups.push(bo);
    } else {
      otherElementTypes.push(bo);
    }
  });
  // add groups before shapes and other element types before connections so that connections
  // can already rely on the shapes being part of the diagram
  groups.forEach(this._createElementFromBusinessObject, this);
  otherElementTypes.forEach(this._createElementFromBusinessObject, this);
  connections.forEach(this._addConnection, this);
};
/**
 * Make sure that the whole story is in the visible quadrant of the canvas.
 * To achieve this, the element coordinates are manipulated so that coordinate 0/0 is in the top left corner (avoids problems with HTML export)
 * Then, the canvas is scrolled and zoom level adjusted so that the whole story is visible.
 */
DomainStoryModeler.prototype.fitStoryToScreen = function () {
  this.get("alignToOrigin").align();
  this.get("canvas")._fitViewport({
    x: 0,
    y: 0
  });
};
function isOfTypeConnection(element) {
  return element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.ACTIVITY || element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.CONNECTION;
}
function isOfTypeGroup(element) {
  return element && element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_7__.ElementTypes.GROUP;
}

/***/ },

/***/ 20092
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/workbench/services/settings/settings.service */ 1299);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var _tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools/export/services/export.service */ 39595);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/replay/services/replay.service */ 3687);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-color-picker */ 32580);
/* harmony import */ var _tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tools/autosave/services/autosave.service */ 41707);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 47804);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 96383);
/* harmony import */ var _workbench_presentation_header_header_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./workbench/presentation/header/header/header.component */ 38361);
/* harmony import */ var _workbench_presentation_settings_settings_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./workbench/presentation/settings/settings.component */ 45263);
/* harmony import */ var _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tools/import/directive/dragDrop.directive */ 42482);
/* harmony import */ var src_app_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/tools/import/services/import-domain-story.service */ 93586);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 48065);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/diagramJSConstants */ 273);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 11525);




















function AppComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "app-settings");
  }
}
class AppComponent {
  constructor() {
    this.version = _environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.version;
    this.color = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.BLACK;
    this.skipNextColorUpdate = false;
    // define preset colors that have good contrast on white background and are compatible to EventStorming notation
    this.colorBox = [_domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.YELLOW, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.ORANGE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.RED, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.LIGHT_PINK, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.DARK_PINK, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.PURPLE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.BLUE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.CYAN, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.GREEN, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.LIME, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.GREY, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.BLACK];
    this.settingsService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_2__.SettingsService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__.PropertiesService);
    this.exportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_4__.ExportService);
    this.autosaveService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_8__.AutosaveService);
    this.cd = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__.MatSnackBar);
    this.replayService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_5__.ReplayService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_11__.ModelerService);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_12__.DirtyFlagService);
    this.importDomainStoryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_18__.ImportDomainStoryService);
    this.activatedRoute = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute);
    this.showDescription = this.propertiesService.showDescription;
    this.showSettings = this.settingsService.showSettings;
    this.importDomainStoryService.automatedImportSuccessFull$().pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_19__.takeUntilDestroyed)()).subscribe(() => {
      // A timeout is needed to make sure that the import and all asynchronous tasks are finished before the replay is started.
      setTimeout(() => {
        this.replayService.startReplay(true);
      }, 100);
    });
    document.addEventListener('keydown', e => {
      const modifierPressed = e.ctrlKey || e.metaKey;
      const filename = this.exportService.getFilename();
      if (modifierPressed && e.key === 's' && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        if (this.exportService.isDomainStoryExportable()) {
          this.exportService.downloadEGN(filename);
        }
      }
      if (modifierPressed && e.altKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        if (this.exportService.isDomainStoryExportable()) {
          this.exportService.downloadSVG(filename, true, true, undefined);
        }
      }
      if (modifierPressed && e.key === 'l') {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('import')?.click();
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && this.replayService.replayOn()) {
        e.preventDefault();
        e.stopPropagation();
        this.replayService.nextSentence();
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && this.replayService.replayOn()) {
        e.preventDefault();
        e.stopPropagation();
        this.replayService.previousSentence();
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
        this.color = _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.BLACK;
      } else {
        this.color = customEvent.detail.color;
      }
    });
    document.addEventListener(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_20__.OPEN_COLOR_PICKER_EVENT, () => {
      this.colorPicker.openDialog();
    });
    document.addEventListener('errorColoringOnlySvg', () => {
      this.snackbar.open('Only SVG icons can be colored', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_9__.SNACKBAR_INFO
      });
    });
  }
  ngOnInit() {
    this.modelerService.postInit();
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
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      const urlToLoad = queryParams.get('storyUrl');
      const startReplay = queryParams.get('startReplay') === 'true';
      if (urlToLoad) {
        this.importDomainStoryService.autoImportFromUrl(urlToLoad, startReplay);
      }
    });
    this.autosaveService.loadLatestDraft();
    this.cd.detectChanges();
  }
  onWindowClose(event) {
    if (this.dirtyFlagService.dirty()) {
      event.preventDefault();
    }
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      viewQuery: function AppComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](ngx_color_picker__WEBPACK_IMPORTED_MODULE_7__.ColorPickerDirective, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.colorPicker = _t.first);
        }
      },
      hostBindings: function AppComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("beforeunload", function AppComponent_beforeunload_HostBindingHandler($event) {
            return ctx.onWindowClose($event);
          }, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresolveWindow"]);
        }
      },
      decls: 26,
      vars: 20,
      consts: [["role", "main", 1, "content"], ["id", "colorPicker", 2, "display", "none", "height", "0", 3, "colorPickerChange", "colorPickerClose", "cpPresetColors", "colorPicker"], ["appDrag", "", "id", "canvas"], ["src", "favicon.ico", "height", "24", "alt", "Egon Logo"], ["href", "https://egon.io", "target", "_blank"], ["href", "https://egon.io/changelog", "target", "_blank"], ["src", "assets/logo/wps-icon.ico", "height", "24", "alt", "WPS Logo"], ["href", "https://www.wps.de/", "target", "_blank"], ["href", "https://www.wps.de/datenschutz/", "target", "_blank"], ["href", "https://www.wps.de/impressum/", "target", "_blank"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 0)(1, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("colorPickerChange", function AppComponent_Template_input_colorPickerChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.color, $event) || (ctx.color = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("colorPickerClose", function AppComponent_Template_input_colorPickerClose_1_listener($event) {
            return ctx.onColorChanged($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵconditionalCreate"](2, AppComponent_Conditional_2_Template, 1, 0, "app-settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](4, "app-header")(5, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](6, "div")(7, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](8, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10, " egon.io");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](11, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](12, "version: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](13, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](15, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](16, "by ");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](17, "img", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](18, "a", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](19, "WPS");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](20, "span")(21, "a", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](22, "Privacy");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](23, "span")(24, "a", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](25, "Imprint");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵstyleProp"]("background", ctx.color);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("cpPresetColors", ctx.colorBox);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("colorPicker", ctx.color);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵconditional"](ctx.showSettings() ? 2 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵclassProp"]("headerAndCanvas", !ctx.showSettings() && ctx.showDescription())("headerAndCanvasCollapsed", !ctx.showSettings() && !ctx.showDescription())("hidden", ctx.showSettings());
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵclassProp"]("header", ctx.showDescription())("headerCollapsed", !ctx.showDescription());
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵclassProp"]("logoContainer", !ctx.showSettings())("hidden", ctx.showSettings());
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](ctx.version);
        }
      },
      dependencies: [_workbench_presentation_header_header_header_component__WEBPACK_IMPORTED_MODULE_15__.HeaderComponent, _workbench_presentation_settings_settings_component__WEBPACK_IMPORTED_MODULE_16__.SettingsComponent, _tools_import_directive_dragDrop_directive__WEBPACK_IMPORTED_MODULE_17__.DragDirective, ngx_color_picker__WEBPACK_IMPORTED_MODULE_7__.ColorPickerDirective, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule],
      styles: [".content[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n}\n\n\n.headerAndCanvas[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.headerAndCanvasCollapsed[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: min-content auto;\n  overflow: hidden;\n}\n\n.settings[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: min-content 155px;\n}\n\n\n.logoContainer[_ngcontent-%COMP%] {\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  right: 4px;\n  align-items: flex-end;\n  background-color: #f7f7f8;\n  margin-bottom: 4px;\n  border-width: 1px;\n  border-radius: 2px;\n  border-style: solid;\n  border-color: #b9bcc6;\n}\n.logoContainer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin: 7px;\n  align-items: center;\n}\n\n.hidden[_ngcontent-%COMP%] {\n  height: 1px;\n  width: 1px;\n}\n\n.mat-button-toggle-label-content[_ngcontent-%COMP%] {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n\n .mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: white;\n}\n\nspan[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n\nspan[_ngcontent-%COMP%] {\n  height: 24px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUEscUJBQUE7QUFFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtBQUFGOztBQUdBLG1CQUFBO0FBRUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0FBREY7QUFHRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtBQURKOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUFGRjs7QUFNQTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSwrQkFBQTtBQUhGOztBQU1BO0VBQ0UsdUJBQUE7QUFIRjs7QUFNQTtFQUNFLHNCQUFBO0FBSEY7O0FBTUE7RUFDRSxZQUFBO0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLyogaGVhZGVyIGFuZCBDYW52YXMqL1xuXG4uaGVhZGVyQW5kQ2FudmFzIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uaGVhZGVyQW5kQ2FudmFzQ29sbGFwc2VkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW4tY29udGVudCBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uc2V0dGluZ3Mge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oZWFkZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1pbi1jb250ZW50IDE1NXB4O1xufVxuXG4vKiBMb2dvIENvbnRhaW5lciAqL1xuXG4ubG9nb0NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogNHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjYjliY2M2O1xuXG4gIHNwYW4ge1xuICAgIG1hcmdpbjogN3B4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuLmhpZGRlbiB7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogMXB4O1xufVxuXG4vLyBNYXRlcmlhbCBEZXNpZ24gT3ZlcnJpZGVzXG4ubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTBwdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWRjLXRleHQtZmllbGQtLWZpbGxlZDpub3QoLm1kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuc3BhbiAqIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuc3BhbiB7XG4gIGhlaWdodDogMjRweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 70289
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 91244);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _tools_modeler_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/modeler.providers */ 81748);
/* harmony import */ var _tools_autosave_autosave_providers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools/autosave/autosave.providers */ 37311);
/* harmony import */ var _tools_import_import_providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/import/import.providers */ 47457);






const appConfig = {
  providers: [(0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_0__.provideAnimations)(), _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormBuilder, {
    provide: _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_1__.MAT_CHECKBOX_DEFAULT_OPTIONS,
    useValue: {
      clickAction: 'check'
    }
  }, (0,_tools_modeler_providers__WEBPACK_IMPORTED_MODULE_3__.provideModeler)(), (0,_tools_autosave_autosave_providers__WEBPACK_IMPORTED_MODULE_4__.provideAutosave)(), (0,_tools_import_import_providers__WEBPACK_IMPORTED_MODULE_5__.provideImportDomainStory)()]
};

/***/ },

/***/ 40550
/*!**********************************************!*\
  !*** ./src/app/domain/entities/constants.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 20843
/*!***********************************************!*\
  !*** ./src/app/domain/entities/dictionary.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
  putEntry(entry) {
    if (!this.has(entry.key)) {
      this.entries.push(entry);
    }
  }
  keysArray() {
    return this.entries.map(entry => entry.key);
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
    if (found.length < 1) {
      throw new Error(`Key ${key} not found in dictionary`);
    }
    return found[0].value;
  }
  find(key) {
    const found = this.entries.filter(entry => entry.key === key);
    return found[0] ? found[0].value : null;
  }
  /** Convert to a plain key-value object. */
  toRecord() {
    const result = {};
    for (const entry of this.entries) {
      result[entry.key] = entry.value;
    }
    return result;
  }
  /** Create a Dictionary from a plain key-value object. */
  static fromRecord(record) {
    const dict = new Dictionary();
    for (const [key, value] of Object.entries(record)) {
      if (value != null) {
        dict.set(key, value);
      }
    }
    return dict;
  }
}
class Entry {
  constructor(value, key, keyWords = []) {
    this.value = value;
    this.key = key;
    this.keyWords = keyWords;
  }
}

/***/ },

/***/ 73190
/*!*************************************************!*\
  !*** ./src/app/domain/entities/elementTypes.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 41795
/*!******************************************!*\
  !*** ./src/app/domain/entities/scope.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomainPurity: () => (/* binding */ DomainPurity),
/* harmony export */   PointInTime: () => (/* binding */ PointInTime)
/* harmony export */ });
var PointInTime;
(function (PointInTime) {
  PointInTime["AS_IS"] = "as_is";
  PointInTime["TO_BE"] = "to_be";
})(PointInTime || (PointInTime = {}));
var DomainPurity;
(function (DomainPurity) {
  DomainPurity["PURE"] = "pure";
  DomainPurity["DIGITALIZED"] = "digitalized";
})(DomainPurity || (DomainPurity = {}));

/***/ },

/***/ 45466
/*!*************************************************************************************************************************!*\
  !*** ./src/app/domain/presentation/keyboard-shortcuts-dialog/keyboard-shortcuts/keyboard-shortcuts-dialog.component.ts ***!
  \*************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyboardShortcutsDialogComponent: () => (/* binding */ KeyboardShortcutsDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11525);




const _forTrack0 = ($index, $item) => $item.description;
function KeyboardShortcutsDialogComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const shortCut_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", shortCut_r1.description, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](shortCut_r1.shortCut);
  }
}
class KeyboardShortcutsDialogComponent {
  constructor() {
    this.data = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA);
    this.title = this.data.title;
    this.shortCuts = this.data.shortCuts ?? [];
  }
  static {
    this.ɵfac = function KeyboardShortcutsDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || KeyboardShortcutsDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: KeyboardShortcutsDialogComponent,
      selectors: [["app-keyboard-shortcuts-dialog"]],
      decls: 5,
      vars: 1,
      consts: [[1, "content"], ["id", "info-dialog-title"], [1, "row"], [1, "description-width"]],
      template: function KeyboardShortcutsDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-dialog-content", 0)(1, "h2", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](3, KeyboardShortcutsDialogComponent_For_4_Template, 5, 2, "div", 2, _forTrack0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx.shortCuts);
        }
      },
      dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent],
      styles: [".content[_ngcontent-%COMP%] {\n  height: fit-content;\n  width: 30vw;\n  overflow: hidden;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n\n.description-width[_ngcontent-%COMP%] {\n  width: 12rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZG9tYWluL3ByZXNlbnRhdGlvbi9rZXlib2FyZC1zaG9ydGN1dHMtZGlhbG9nL2tleWJvYXJkLXNob3J0Y3V0cy9rZXlib2FyZC1zaG9ydGN1dHMtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xuICB3aWR0aDogMzB2dztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5kZXNjcmlwdGlvbi13aWR0aCB7XG4gIHdpZHRoOiAxMnJlbTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 96445
/*!**********************************************************!*\
  !*** ./src/app/domain/services/command-stack.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommandStackService: () => (/* binding */ CommandStackService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);

class CommandStackService {
  setCommandStack(commandStack) {
    this.commandStack = commandStack;
  }
  execute(action, payload) {
    this.commandStack.execute(action, payload);
  }
  static {
    this.ɵfac = function CommandStackService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CommandStackService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: CommandStackService,
      factory: CommandStackService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 12855
/*!***************************************************!*\
  !*** ./src/app/domain/services/dialog.service.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogService: () => (/* binding */ DialogService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/keyboard-shortcuts-dialog/keyboard-shortcuts/keyboard-shortcuts-dialog.component */ 45466);




class DialogService {
  constructor() {
    this.matDialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialog);
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
    this.openDialog(_presentation_keyboard_shortcuts_dialog_keyboard_shortcuts_keyboard_shortcuts_dialog_component__WEBPACK_IMPORTED_MODULE_2__.KeyboardShortcutsDialogComponent, config);
  }
  static {
    this.ɵfac = function DialogService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DialogService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: DialogService,
      factory: DialogService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 94658
/*!*******************************************************!*\
  !*** ./src/app/domain/services/dirty-flag.service.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirtyFlagService: () => (/* binding */ DirtyFlagService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);


class DirtyFlagService {
  constructor() {
    this.isDirtySignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "isDirtySignal"
    }] : /* istanbul ignore next */[]));
    this.dirty = this.isDirtySignal.asReadonly();
  }
  makeDirty() {
    this.isDirtySignal.set(true);
  }
  makeClean() {
    this.isDirtySignal.set(false);
  }
  static {
    this.ɵfac = function DirtyFlagService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DirtyFlagService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: DirtyFlagService,
      factory: DirtyFlagService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 85511
/*!*************************************************************!*\
  !*** ./src/app/domain/services/element-registry.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementRegistryService: () => (/* binding */ ElementRegistryService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);


class ElementRegistryService {
  constructor() {
    this.registry = null;
  }
  setElementRegistry(elementRegistry) {
    this.registry = elementRegistry._elements;
  }
  clear() {
    this.registry = null;
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
  getAllBusinessObjectsFromCanvasNotIn(notIn) {
    const otherBusinessObjects = [];
    const allObjects = this.getAllCanvasObjects().concat(this.getAllGroups());
    allObjects.forEach(element => {
      if (!notIn.includes(element.businessObject)) {
        otherBusinessObjects.push(element.businessObject);
      }
    });
    return otherBusinessObjects;
  }
  fillListOfCanvasObjects(allObjectsFromCanvas, objectList, groups) {
    allObjectsFromCanvas.forEach(canvasElement => {
      if (canvasElement.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY) {
        objectList.push(canvasElement);
      }
      // ensure that Activities are always after Actors, WorkObjects and Groups in .dst files
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
  getObjectsOfType(type) {
    return this.getAllCanvasObjects().filter(o => o.type.includes(type));
  }
  getAllActivities() {
    return this.getObjectsOfType(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTIVITY);
  }
  getAllConnections() {
    return this.getObjectsOfType(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.CONNECTION);
  }
  getAllActors() {
    return this.getObjectsOfType(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR);
  }
  getAllWorkObjects() {
    return this.getObjectsOfType(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT);
  }
  getAllCanvasObjects() {
    const allObjects = [];
    const groupObjects = [];
    this.checkChildForGroup(groupObjects, allObjects);
    // for each memorized group, remove it from the group-array and check its children, whether they are groups or not
    // if a child is a group, memorize it in the group-array
    // other children should already be in the allObjects list
    while (groupObjects.length >= 1) {
      const currentGroup = groupObjects.pop();
      currentGroup?.children?.forEach(child => {
        const type = child.type;
        if (type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.GROUP)) {
          groupObjects.push(child);
        }
      });
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
    if (this.registry) {
      const registryElementNames = Object.keys(this.registry);
      for (const name of registryElementNames) {
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
    const workObjects = this.getAllWorkObjects();
    return {
      actors: actors.map(a => a.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.ACTOR, '')),
      workObjects: workObjects.map(w => w.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.WORKOBJECT, ''))
    };
  }
  static {
    this.ɵfac = function ElementRegistryService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ElementRegistryService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ElementRegistryService,
      factory: ElementRegistryService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 50624
/*!****************************************************!*\
  !*** ./src/app/domain/services/storage.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);

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
  static {
    this.ɵfac = function StorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StorageService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: StorageService,
      factory: StorageService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 37311
/*!******************************************************!*\
  !*** ./src/app/tools/autosave/autosave.providers.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideAutosave: () => (/* binding */ provideAutosave)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _services_autosave_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/autosave.service */ 41707);


function provideAutosave() {
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.provideAppInitializer)(() => {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_autosave_service__WEBPACK_IMPORTED_MODULE_2__.AutosaveService);
  });
}

/***/ },

/***/ 421
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosaveOptions/autosave-options.component.ts ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveOptionsComponent: () => (/* binding */ AutosaveOptionsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _services_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/autosave-configuration.service */ 96040);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 21662);













class AutosaveOptionsComponent {
  constructor() {
    this.autosaveConfiguration = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_services_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveConfigurationService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar);
    this.activated = this.autosaveConfiguration.configuration().activated;
  }
  save(maxDrafts, interval) {
    if (this.autosaveConfiguration.setConfiguration({
      activated: this.activated,
      maxDrafts,
      interval
    })) {
      this.snackbar.open('Settings for Autosave saved', undefined, {
        duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_DURATION,
        panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_SUCCESS
      });
    } else {
      this.snackbar.open('Unable to save settings for Autosave - please try again', undefined, {
        duration: 2 * src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_DURATION,
        panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_ERROR
      });
    }
  }
  toggleAutosave(checked) {
    this.activated = checked;
  }
  static {
    this.ɵfac = function AutosaveOptionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AutosaveOptionsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: AutosaveOptionsComponent,
      selectors: [["app-autosave-options"]],
      decls: 23,
      vars: 3,
      consts: [["interval", ""], ["drafts", ""], [1, "header"], [1, "content"], [1, "heading"], [1, "option"], [3, "change", "checked"], ["color", "accent"], ["matInput", "", "min", "1", "type", "number", 1, "numberInput", 3, "value"], [1, "spacer"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"]],
      template: function AutosaveOptionsComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Autosave Options");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 5)(5, "mat-checkbox", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function AutosaveOptionsComponent_Template_mat_checkbox_change_5_listener($event) {
            return ctx.toggleAutosave($event.checked);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6, " Enabled ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 5)(8, "mat-form-field", 7)(9, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10, "Interval [seconds]");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "input", 8, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "div", 5)(14, "mat-form-field", 7)(15, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, "Keep last X drafts");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](17, "input", 8, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AutosaveOptionsComponent_Template_button_click_21_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
            const interval_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](12);
            const drafts_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](18);
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.save(+drafts_r3.value, +interval_r2.value));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, " Apply ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("checked", ctx.activated);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.autosaveConfiguration.configuration().interval);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.autosaveConfiguration.configuration().maxDrafts);
        }
      },
      dependencies: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckbox],
      styles: [".header[_ngcontent-%COMP%] {\n  background-color: #f7f7f8;\n  margin: 8px;\n}\n\n.content[_ngcontent-%COMP%] {\n  margin: 8px;\n  padding: 8px;\n}\n\n.heading[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.option[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto;\n  row-gap: 8px;\n}\n\n.numberInput[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  height: inherit;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvYXV0b3NhdmUvcHJlc2VudGF0aW9uL0F1dG9zYXZlT3B0aW9ucy9hdXRvc2F2ZS1vcHRpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxtQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbjogOHB4O1xufVxuXG4uY29udGVudCB7XG4gIG1hcmdpbjogOHB4O1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbi5oZWFkaW5nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5vcHRpb24ge1xuICBtYXJnaW46IDhweDtcbn1cblxuLmdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XG4gIHJvdy1nYXA6IDhweDtcbn1cblxuLm51bWJlcklucHV0IHtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG5idXR0b24ge1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBsaW5lLWhlaWdodDogMC45cmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 91525
/*!*********************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosaveSettings/autosave-settings.component.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveSettingsComponent: () => (/* binding */ AutosaveSettingsComponent)
/* harmony export */ });
/* harmony import */ var _AutosaveOptions_autosave_options_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutosaveOptions/autosave-options.component */ 421);
/* harmony import */ var _AutosavedDrafts_autosaved_drafts_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AutosavedDrafts/autosaved-drafts.component */ 29051);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11525);



class AutosaveSettingsComponent {
  static {
    this.ɵfac = function AutosaveSettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AutosaveSettingsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
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
}

/***/ },

/***/ 29051
/*!*******************************************************************************************!*\
  !*** ./src/app/tools/autosave/presentation/AutosavedDrafts/autosaved-drafts.component.ts ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosavedDraftsComponent: () => (/* binding */ AutosavedDraftsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _services_autosave_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/autosave.service */ 41707);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 48065);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11525);










function AutosavedDraftsComponent_Conditional_7_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-list-item")(1, "div", 6)(2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function AutosavedDraftsComponent_Conditional_7_For_3_Template_button_click_6_listener() {
      const draft_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.loadDraft(draft_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, " Load draft ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const draft_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](draft_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](draft_r2.date);
  }
}
function AutosavedDraftsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5)(1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterCreate"](2, AutosavedDraftsComponent_Conditional_7_For_3_Template, 8, 2, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeater"](ctx_r2.drafts);
  }
}
class AutosavedDraftsComponent {
  constructor() {
    this.autosaveService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_services_autosave_service__WEBPACK_IMPORTED_MODULE_1__.AutosaveService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar);
    this.drafts = this.autosaveService.getDrafts();
    this.autosaveService.autosavedDraftsChanged$.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.takeUntilDestroyed)()).subscribe(() => this.initDrafts());
  }
  initDrafts() {
    this.drafts = this.autosaveService.getDrafts();
  }
  loadDraft(draft) {
    this.autosaveService.loadDraft(draft);
    this.snackbar.open('Draft loaded', undefined, {
      duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_DURATION,
      panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_3__.SNACKBAR_SUCCESS
    });
  }
  removeAllDrafts() {
    this.autosaveService.removeAllDrafts();
  }
  static {
    this.ɵfac = function AutosavedDraftsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AutosavedDraftsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: AutosavedDraftsComponent,
      selectors: [["app-autosaved-drafts"]],
      decls: 8,
      vars: 4,
      consts: [[1, "header"], [1, "history"], [1, "spacer"], [1, "buttons"], ["type", "button", "mat-stroked-button", "", 1, "mr-1", 3, "click", "disabled"], [1, "draftsList", "smallScrollbar"], [1, "draft"], [1, "item-title"], [1, "item-date"], ["type", "button", "mat-stroked-button", "", 3, "click"]],
      template: function AutosavedDraftsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 3)(5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function AutosavedDraftsComponent_Template_button_click_5_listener() {
            return ctx.removeAllDrafts();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, " Remove all drafts ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](7, AutosavedDraftsComponent_Conditional_7_Template, 4, 0, "div", 5);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx.drafts.length ? ctx.drafts.length : "no", " ", ctx.drafts.length > 1 ? "drafts" : "draft", " saved ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !ctx.drafts.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.drafts.length ? 7 : -1);
        }
      },
      dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListItem],
      styles: [".header[_ngcontent-%COMP%] {\n  display: flex;\n  height: 46px;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 16px;\n}\n\n.history[_ngcontent-%COMP%] {\n  font-weight: bold;\n  display: inline-flex;\n  margin-left: 16px;\n  align-self: center;\n  align-items: center;\n  justify-self: left;\n  height: inherit;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n  justify-self: right;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-self: center;\n  align-items: center;\n  justify-self: right;\n  height: inherit;\n}\n\nmat-list[_ngcontent-%COMP%] {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.draftsList[_ngcontent-%COMP%] {\n  height: calc(100vh - 54px - 4rem);\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n  \n  overflow: auto;\n  padding-right: 8px;\n}\n\nmat-list-item[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n  border: 1px solid #b9bcc6;\n}\n\n.draft[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto max-content max-content;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.item-date[_ngcontent-%COMP%] {\n  font-weight: normal;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvYXV0b3NhdmUvcHJlc2VudGF0aW9uL0F1dG9zYXZlZERyYWZ0cy9hdXRvc2F2ZWQtZHJhZnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQ0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EseUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtREFBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDQ2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xufVxuXG4uaGlzdG9yeSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG59XG5cbmJ1dHRvbiB7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gIGxpbmUtaGVpZ2h0OiAwLjlyZW07XG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiByaWdodDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuXG5tYXQtbGlzdCB7XG4gIHBhZGRpbmctdG9wOiAwO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLmRyYWZ0c0xpc3Qge1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1NHB4IC0gNHJlbSk7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gIC8qIGZvciBzY3JvbGxiYXI6ICovXG4gIG92ZXJmbG93OiBhdXRvO1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG59XG5cbm1hdC1saXN0LWl0ZW0ge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiOWJjYzY7XG59XG5cbi5kcmFmdCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudCBtYXgtY29udGVudDtcbn1cblxuLml0ZW0tdGl0bGUge1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLml0ZW0tZGF0ZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 96040
/*!***************************************************************************!*\
  !*** ./src/app/tools/autosave/services/autosave-configuration.service.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveConfigurationService: () => (/* binding */ AutosaveConfigurationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);




const AUTOSAVE_CONFIGURATION_TAG = 'autosaveConfiguration';
const defaultConfiguration = {
  activated: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_AUTOSAVES_ENABLED,
  interval: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_AUTOSAVES_INTERVAL,
  maxDrafts: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_AUTOSAVES_MAX_DRAFTS
};
class AutosaveConfigurationService {
  constructor() {
    this.currentConfiguration = defaultConfiguration;
    this.configurationSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(defaultConfiguration, ...(ngDevMode ? [{
      debugName: "configurationSignal"
    }] : /* istanbul ignore next */[]));
    this.configuration = this.configurationSignal.asReadonly();
    this.storageService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService);
    this.initializeConfiguration();
  }
  initializeConfiguration() {
    this.currentConfiguration = this.storageService.get(AUTOSAVE_CONFIGURATION_TAG) ?? defaultConfiguration;
    this.configurationSignal.set(this.currentConfiguration);
  }
  setConfiguration(configuration) {
    try {
      this.currentConfiguration = configuration;
      this.saveConfiguration();
      this.configurationSignal.set(configuration);
      return true;
    } catch {
      return false;
    }
  }
  saveConfiguration() {
    this.storageService.set(AUTOSAVE_CONFIGURATION_TAG, this.currentConfiguration);
  }
  static {
    this.ɵfac = function AutosaveConfigurationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AutosaveConfigurationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AutosaveConfigurationService,
      factory: AutosaveConfigurationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 41707
/*!*************************************************************!*\
  !*** ./src/app/tools/autosave/services/autosave.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutosaveService: () => (/* binding */ AutosaveService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _export_services_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../export/services/export.service */ 39595);
/* harmony import */ var _autosave_configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autosave-configuration.service */ 96040);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 63150);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var src_app_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/utils/isPresent */ 32951);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 48065);














class AutosaveService {
  constructor() {
    this.autosavedDraftsChangedEmitterSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this.autosavedDraftsChanged$ = this.autosavedDraftsChangedEmitterSubject.asObservable();
    this.importConfigChangedSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(undefined, ...(ngDevMode ? [{
      debugName: "importConfigChangedSignal"
    }] : /* istanbul ignore next */[]));
    this.importConfigChanged = this.importConfigChangedSignal.asReadonly();
    this.autosaveConfiguration = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_autosave_configuration_service__WEBPACK_IMPORTED_MODULE_3__.AutosaveConfigurationService);
    this.exportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_export_services_export_service__WEBPACK_IMPORTED_MODULE_2__.ExportService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_1__.ModelerService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__.MatSnackBar);
    this.storageService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_4__.StorageService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_5__.PropertiesService);
    this.iconSetImportExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_10__.IconSetImportExportService);
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
      this.updateConfiguration(this.autosaveConfiguration.configuration());
    });
    this.iconSetImportExportService.iconSetChanged$.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_12__.takeUntilDestroyed)()).subscribe(() => {
      this.autosave(this.autosaveConfiguration.configuration().maxDrafts, false);
    });
  }
  getDrafts() {
    const drafts = this.readDrafts();
    this.sortDrafts(drafts);
    return drafts;
  }
  // if we fitToScreen while the Autosave-Dialoge is open, the canvas is not on screen and the Zoom breaks
  loadDraft(draft, fitToScreen = false) {
    const iconSet = this.iconSetImportExportService.createIconSetConfiguration(this.getIconSetFromAutosave(draft));
    const businessObjects = this.getBusinessObjectsFromDraft(draft);
    this.propertiesService.updateTitleAndDescriptionAndScope(draft.title, draft.description, draft.scope, false);
    this.importConfigChangedSignal.set(iconSet);
    this.modelerService.importStory(businessObjects, iconSet, fitToScreen);
  }
  removeAllDrafts() {
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.DRAFTS_KEY, []);
    this.autosavedDraftsChangedEmitterSubject.next();
  }
  loadLatestDraft() {
    const drafts = this.readDrafts();
    if (drafts.length === 0) {
      return;
    }
    this.loadDraft(drafts[0], true);
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
  startTimer(intervalInMs, maxDrafts) {
    this.autosaveTimer = setInterval(() => this.autosave(maxDrafts, true), intervalInMs * 1000);
  }
  // non-private for testing purposes
  autosave(maxDrafts, showAutosaveMessage) {
    const savedDrafts = this.getDrafts();
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
      if (showAutosaveMessage) {
        this.snackbar.open('Draft Saved', undefined, {
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.SNACKBAR_INFO,
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.SNACKBAR_DURATION
        });
      }
      this.autosavedDraftsChangedEmitterSubject.next();
    }
  }
  isDraftEmpty(draft) {
    const configAndDST = draft.configAndDST ?? {
      iconSet: '',
      domainStory: {
        businessObjects: [],
        description: '',
        version: ''
      }
    };
    return draft.title === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.INITIAL_TITLE && draft.description === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.INITIAL_DESCRIPTION && configAndDST.domainStory.businessObjects.length === 0;
  }
  isSame(a, b) {
    return a.title === b.title && a.description === b.description && JSON.stringify(a.configAndDST) === JSON.stringify(b.configAndDST);
  }
  writeDrafts(drafts) {
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.DRAFTS_KEY, drafts);
  }
  readDrafts() {
    return this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.DRAFTS_KEY) ?? [];
  }
  createDraft() {
    const domainStory = {
      businessObjects: this.modelerService.getStory(),
      version: _environments_environment__WEBPACK_IMPORTED_MODULE_9__.environment.version,
      description: this.propertiesService.getDescription(),
      title: this.propertiesService.getTitle(),
      scope: this.propertiesService.getScope()
    };
    const configAndDST = this.exportService.createConfigAndDST(domainStory);
    const date = new Date().toString().slice(0, 25);
    return {
      title: this.propertiesService.getTitle(),
      description: this.propertiesService.getDescription(),
      scope: this.propertiesService.getScope(),
      configAndDST,
      date
    };
  }
  sortDrafts(drafts) {
    drafts.sort((a, b) => {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      return aDate === bDate ? 0 : aDate > bDate ? -1 : 1;
    });
  }
  // Legacy Compatability - to be removed in version v5.0.0
  //@ts-ignore
  getIconSetFromAutosave(draft) {
    return (0,src_app_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(draft.configAndDST.iconSet) ?
    //@ts-ignore
    draft.configAndDST.iconSet :
    //@ts-ignore
    draft.configAndDST.domain;
  }
  //@ts-ignore
  getBusinessObjectsFromDraft(draft) {
    return (0,src_app_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(draft.configAndDST.domainStory) ?
    //@ts-ignore
    draft.configAndDST.domainStory.businessObjects :
    //@ts-ignore
    JSON.parse(draft.configAndDST.dst);
  }
  static {
    this.ɵfac = function AutosaveService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AutosaveService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AutosaveService,
      factory: AutosaveService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 55701
/*!****************************************************************!*\
  !*** ./src/app/tools/export/domain/dialog/exportDialogData.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportDialogData: () => (/* binding */ ExportDialogData),
/* harmony export */   ExportOption: () => (/* binding */ ExportOption)
/* harmony export */ });
class ExportDialogData {
  constructor(title, defaultFilename, options) {
    this.title = title;
    this.options = options;
    this.defaultFilename = defaultFilename;
  }
}
class ExportOption {
  constructor(text, tooltip, fn) {
    this.text = text;
    this.tooltip = tooltip;
    this.fn = fn;
  }
}

/***/ },

/***/ 23959
/*!************************************************************!*\
  !*** ./src/app/tools/export/domain/export/configAndDst.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigAndDST: () => (/* binding */ ConfigAndDST)
/* harmony export */ });
class ConfigAndDST {
  constructor(domain, dst) {
    this.iconSet = domain;
    this.domainStory = dst;
  }
}

/***/ },

/***/ 41646
/*!***************************************************************!*\
  !*** ./src/app/tools/export/domain/export/exportConstants.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 2200
/*!************************************************************************************!*\
  !*** ./src/app/tools/export/presentation/export-dialog/export-dialog.component.ts ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportDialogComponent: () => (/* binding */ ExportDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 21662);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11525);










function ExportDialogComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " - animation speed:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function ExportDialogComponent_Conditional_20_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx_r1.animationSpeed, $event) || (ctx_r1.animationSpeed = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExportDialogComponent_Conditional_20_Template_span_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onExportAnimatedSvg(!ctx_r1.isAnimatedSvgExport()));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "seconds");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.animationSpeed);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("max", 9)("min", 1)("maxLength", 1);
  }
}
function ExportDialogComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExportDialogComponent_For_28_Template_button_click_0_listener() {
      const ɵ$index_55_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.doOption(ɵ$index_55_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", option_r5.tooltip);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", option_r5.text, " ");
  }
}
class ExportDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
    this.data = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA);
    this.title = this.data.title;
    this.defaultFileName = this.data.defaultFilename;
    this.options = this.data.options;
    this.withTitle = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(true, ...(ngDevMode ? [{
      debugName: "withTitle"
    }] : /* istanbul ignore next */[]));
    this.useWhiteBackground = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(true, ...(ngDevMode ? [{
      debugName: "useWhiteBackground"
    }] : /* istanbul ignore next */[]));
    this.isAnimatedSvgExport = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "isAnimatedSvgExport"
    }] : /* istanbul ignore next */[]));
    this.animationSpeed = 2;
    this.filename = '';
  }
  doOption(index) {
    this.options[index].fn(this.determineFilename(), this.withTitle(), this.useWhiteBackground(), this.isAnimatedSvgExport() ? this.animationSpeed : undefined);
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  updateWithTitle(checked) {
    this.withTitle.set(checked);
  }
  updateUseWhiteBackground(checked) {
    this.useWhiteBackground.set(checked);
  }
  onExportAnimatedSvg(checked) {
    this.isAnimatedSvgExport.set(checked);
  }
  updateFileName($event) {
    const target = $event.target;
    this.filename = target.value;
  }
  determineFilename() {
    if (this.filename && this.filename.length > 0) {
      return this.filename;
    }
    return this.defaultFileName;
  }
  static {
    this.ɵfac = function ExportDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ExportDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ExportDialogComponent,
      selectors: [["app-export-dialog"]],
      decls: 29,
      vars: 6,
      consts: [[1, "row"], ["color", "accent", 1, "dialogWidth"], ["matInput", "", "type", "text", 3, "change", "placeholder"], [3, "change", "checked"], ["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-stroked-button", "", 1, "mr-1", 3, "title"], ["oninput", "this.value = this.value.replace(/[^1-9]/g, '')", 1, "number-input", 3, "ngModelChange", "ngModel", "max", "min", "maxLength"], [3, "click"], ["type", "button", "mat-stroked-button", "", 1, "mr-1", 3, "click", "title"]],
      template: function ExportDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 0)(4, "mat-form-field", 1)(5, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Filename");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ExportDialogComponent_Template_input_change_7_listener($event) {
            return ctx.updateFileName($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Image Export Options");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 0)(12, "mat-checkbox", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ExportDialogComponent_Template_mat_checkbox_change_12_listener($event) {
            return ctx.updateWithTitle($event.checked);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, " Add title and description to image ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 0)(15, "mat-checkbox", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ExportDialogComponent_Template_mat_checkbox_change_15_listener($event) {
            return ctx.updateUseWhiteBackground($event.checked);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " Add white background to SVG (default: transparent) ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "div", 0)(18, "mat-checkbox", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function ExportDialogComponent_Template_mat_checkbox_change_18_listener($event) {
            return ctx.onExportAnimatedSvg($event.checked);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, " Animated SVG ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](20, ExportDialogComponent_Conditional_20_Template, 5, 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](21, "br")(22, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "mat-dialog-actions")(24, "div")(25, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExportDialogComponent_Template_button_click_25_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterCreate"](27, ExportDialogComponent_For_28_Template, 2, 2, "button", 5, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("placeholder", ctx.defaultFileName);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("checked", ctx.withTitle());
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("checked", ctx.useWhiteBackground());
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("checked", ctx.isAnimatedSvgExport());
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.isAnimatedSvgExport() ? 20 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeater"](ctx.options);
        }
      },
      dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule],
      styles: [".ml-2[_ngcontent-%COMP%] {\n  margin-left: 2rem;\n}\n\n.card[_ngcontent-%COMP%] {\n  border: var(--borderGray10) solid 2px;\n  border-radius: 2px;\n  padding: 0.5rem;\n  -webkit-user-select: none;  \n  user-select: none; \n}\n\n.number-input[_ngcontent-%COMP%] {\n  max-width: 1rem;\n  text-align: center;\n  height: 1rem;\n  align-self: center;\n  border: var(--borderGray10) solid 2px;\n  border-radius: 2px;\n  padding: 0 0.25rem;\n}\n\n.number-input[_ngcontent-%COMP%]:focus {\n  outline: none; \n  border-color: var(--borderGray10); \n  box-shadow: 0 0 5px var(--borderGray10); \n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 0.25rem;\n  cursor: pointer;\n}\n\ninput[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n\n.dialogWidth[_ngcontent-%COMP%] {\n  width: 50vw;\n}\n.dialogWidth[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  font-size: 12pt;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvZXhwb3J0L3ByZXNlbnRhdGlvbi9leHBvcnQtZGlhbG9nL2V4cG9ydC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UscUNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQSxFQUFBLFdBQUEsRUFDQSxvQkFBQTtFQUNBLGlCQUFBLEVBQUEsb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQSxFQUFBLDJCQUFBO0VBQ0EsaUNBQUEsRUFBQSx3QkFBQTtFQUNBLHVDQUFBLEVBQUEsbUNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtBQUNGO0FBQUU7RUFDRSxlQUFBO0FBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIubWwtMiB7XG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xufVxuXG4uY2FyZCB7XG4gIGJvcmRlcjogdmFyKC0tYm9yZGVyR3JheTEwKSBzb2xpZCAycHg7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMC41cmVtO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAvKiBJRSAxMCBhbmQgSUUgMTEgKi9cbiAgdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFN0YW5kYXJkIHN5bnRheCAqL1xufVxuXG4ubnVtYmVyLWlucHV0IHtcbiAgbWF4LXdpZHRoOiAxcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGhlaWdodDogMXJlbTtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xuICBib3JkZXI6IHZhcigtLWJvcmRlckdyYXkxMCkgc29saWQgMnB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDAgMC4yNXJlbTtcbn1cblxuLm51bWJlci1pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7IC8qIFJlbW92ZSBkZWZhdWx0IG91dGxpbmUgKi9cbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ib3JkZXJHcmF5MTApOyAvKiBDaGFuZ2UgYm9yZGVyIGNvbG9yICovXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggdmFyKC0tYm9yZGVyR3JheTEwKTsgLyogT3B0aW9uYWw6IEFkZCBhIGdsb3dpbmcgZWZmZWN0ICovXG59XG5cbi5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBnYXA6IDAuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuaW5wdXQge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5kaWFsb2dXaWR0aCB7XG4gIHdpZHRoOiA1MHZ3O1xuICBtYXQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTJwdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 39595
/*!*********************************************************!*\
  !*** ./src/app/tools/export/services/export.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportService: () => (/* binding */ ExportService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var src_app_tools_export_domain_export_configAndDst__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/export/domain/export/configAndDst */ 23959);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);
/* harmony import */ var src_app_tools_export_services_png_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/export/services/png.service */ 82972);
/* harmony import */ var src_app_tools_export_services_svg_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/export/services/svg.service */ 56837);
/* harmony import */ var _html_presentation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html-presentation.service */ 87047);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../domain/dialog/exportDialogData */ 55701);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../presentation/export-dialog/export-dialog.component */ 2200);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/utils/downloadFile */ 25312);
/* harmony import */ var _utils_isPresent__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../utils/isPresent */ 32951);




















class ExportService {
  constructor() {
    this.importExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_1__.IconSetImportExportService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__.PropertiesService);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__.DirtyFlagService);
    this.pngService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_export_services_png_service__WEBPACK_IMPORTED_MODULE_6__.PngService);
    this.svgService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_export_services_svg_service__WEBPACK_IMPORTED_MODULE_7__.SvgService);
    this.htmlPresentationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_html_presentation_service__WEBPACK_IMPORTED_MODULE_8__.HtmlPresentationService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_14__.ModelerService);
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_16__.DialogService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__.MatSnackBar);
    this.fileNameSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)('', ...(ngDevMode ? [{
      debugName: "fileNameSignal"
    }] : /* istanbul ignore next */[]));
  }
  isDomainStoryExportable() {
    return this.modelerService.getStory().length >= 1;
  }
  createConfigAndDST(domainStory) {
    return new src_app_tools_export_domain_export_configAndDst__WEBPACK_IMPORTED_MODULE_4__.ConfigAndDST(this.importExportService.getCurrentConfigurationForExport(), domainStory);
  }
  downloadEGN(filename) {
    this.fileNameSignal.set(filename);
    const dst = this.getStoryForDownload();
    const configAndDST = this.createConfigAndDST(dst);
    const json = JSON.stringify(configAndDST, null, 2);
    (0,src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_17__.downloadFile)(json, 'data:text/plain;charset=utf-8,', filename, '.egn');
    this.dirtyFlagService.makeClean();
  }
  downloadSVG(filename, withTitle, useWhiteBackground, animationSpeed) {
    const story = this.getStoryForDownload();
    const dst = this.createConfigAndDST(story);
    const svgData = this.svgService.createSVGData(this.propertiesService.title(), this.propertiesService.description(), dst, withTitle, useWhiteBackground, animationSpeed);
    (0,src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_17__.downloadFile)(svgData, 'data:application/bpmn20-xml;charset=UTF-8,', filename, '.egn.svg');
    this.dirtyFlagService.makeClean();
  }
  downloadPNG(filename, withTitle) {
    this.fileNameSignal.set(filename);
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const {
        svg,
        image,
        width,
        height
      } = this.pngService.createSvgAndImage(canvas, this.propertiesService.description(), this.propertiesService.title(), withTitle);
      image.onload = () => {
        const tempCanvas = this.pngService.createTempCanvas(width, height);
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          // fill with white background
          ctx.rect(0, 0, tempCanvas.width, tempCanvas.height);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.drawImage(image, 0, 0);
        }
        const png64 = tempCanvas.toDataURL('image/png');
        (0,src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_17__.downloadFile)(png64, '', filename, '.png', false);
        // image source has to be removed to circumvent browser caching
        image.src = '';
      };
      image.onchange = image.onload;
      image.width = width;
      image.height = height;
      image.src = 'data:image/svg+xml,' + svg;
    }
  }
  openDownloadDialog() {
    if (this.isDomainStoryExportable()) {
      const SVGDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__.ExportOption('SVG', 'Download an SVG-Image with the Domain-Story embedded. Can be used to save and share your Domain-Story.', (filename, withTitle, useWhiteBackground, animationSpeed) => this.downloadSVG(filename, withTitle, useWhiteBackground, animationSpeed));
      const EGNDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__.ExportOption('EGN', 'Download an EGN-File with the Domain-Story. Can be used to save and share your Domain-Story.', filename => this.downloadEGN(filename));
      const PNGDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__.ExportOption('PNG', 'Download a PNG-Image of the Domain-Story. This does not include the Domain-Story!', (filename, withTitle) => this.downloadPNG(filename, withTitle));
      const HTMLDownloadOption = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__.ExportOption('HTML-Presentation', 'Download an HTML-Presentation. This does not include the Domain-Story!', filename => this.downloadHTMLPresentation(filename));
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      config.data = new _domain_dialog_exportDialogData__WEBPACK_IMPORTED_MODULE_10__.ExportDialogData('Export', this.getFilename(), [SVGDownloadOption, EGNDownloadOption, PNGDownloadOption, HTMLDownloadOption]);
      this.dialogService.openDialog(_presentation_export_dialog_export_dialog_component__WEBPACK_IMPORTED_MODULE_12__.ExportDialogComponent, config);
    } else {
      this.snackbar.open('No Domain Story to be exported', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_13__.SNACKBAR_DURATION,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_13__.SNACKBAR_INFO
      });
    }
  }
  downloadHTMLPresentation(filename) {
    this.fileNameSignal.set(filename);
    this.htmlPresentationService.downloadHTMLPresentation(filename).then();
  }
  getStoryForDownload() {
    let story = this.modelerService.getStory().sort((objA, objB) => {
      if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_18__.isPresent)(objA.id) && (0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_18__.isPresent)(objB.id)) {
        return objA.id.localeCompare(objB.id);
      } else {
        return 0;
      }
    });
    return {
      businessObjects: story,
      title: this.propertiesService.getTitle(),
      description: this.propertiesService.getDescription(),
      version: _environments_environment__WEBPACK_IMPORTED_MODULE_9__.environment.version,
      scope: this.propertiesService.getScope()
    };
  }
  createFileName() {
    return (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_2__.sanitizeForDesktop)(this.propertiesService.title());
  }
  getFilename() {
    return this.fileNameSignal() ? this.fileNameSignal() : this.createFileName();
  }
  static {
    this.ɵfac = function ExportService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ExportService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ExportService,
      factory: ExportService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 87047
/*!********************************************************************!*\
  !*** ./src/app/tools/export/services/html-presentation.service.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlPresentationService: () => (/* binding */ HtmlPresentationService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _utils_sanitizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/sanitizer */ 43515);
/* harmony import */ var _replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../replay/services/replay.service */ 3687);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dot */ 13280);
/* harmony import */ var dot__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dot__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/export/services/exportUtil */ 97563);
/* harmony import */ var src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/utils/downloadFile */ 25312);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);




// @ts-ignore








/**
 * Initial idea and PR from https://github.com/indika-dev
 */
class HtmlPresentationService {
  constructor() {
    this.replayService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__.ReplayService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_5__.PropertiesService);
    this.modeler = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_7__.ModelerService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar);
  }
  static viewBoxCoordinates(svg) {
    const match = svg.match(src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_6__.ViewBoxCoordinateRegExp);
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
      _this.modeler.fitStoryToScreen(); // fixes problem with HTML export when story is not in the visible area of the canvas
      const svgData = [];
      // export all sentences of domain story
      _this.replayService.startReplay();
      _this.replayService.toggleShowGroups(); // Always show groups
      while (_this.replayService.currentSentence() < _this.replayService.maxSentenceNumber()) {
        try {
          svgData.push(yield _this.getSvgItemsForSentence());
        } catch (err) {
          _this.snackbar.open('There was an error exporting the SVG.\n' + err, undefined, {
            duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.SNACKBAR_DURATION,
            panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.SNACKBAR_ERROR
          });
        }
        if (_this.replayService.currentSentence() < _this.replayService.maxSentenceNumber()) {
          _this.replayService.nextSentence();
        }
      }
      _this.replayService.stopReplay();
      // create download for presentation
      const revealjsTemplate = document.getElementById('revealjs-template');
      const dots = dot__WEBPACK_IMPORTED_MODULE_4___default().template(revealjsTemplate?.innerHTML);
      const revealjsData = {
        script: 'script',
        title: _this.propertiesService.getTitle(),
        description: _this.propertiesService.getDescription(),
        sentences: svgData,
        multiplexSecret: _this.multiplexSecret,
        multiplexId: _this.multiplexId
      };
      (0,src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_8__.downloadFile)(_this.fixMalformedHtmlScript(dots, revealjsData), 'data:text/html;charset=UTF-8,', (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_2__.sanitizeForDesktop)(filename), '.html', false);
    })();
  }
  getSvgItemsForSentence() {
    var _this2 = this;
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this2.modeler.getModeler().saveSVG({});
      _this2.fixActivityMarkersForEachSentence(result, _this2.replayService.currentSentence());
      return {
        content: HtmlPresentationService.createSVGData(result.svg),
        transition: 'slide'
      };
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
        const newId = idToReplace.slice(0, id.length - 5) + 'customId' + sectionIndex + idToReplace.slice(-2);
        result.svg = result.svg.replaceAll(idToReplace, newId);
      });
      newDefs += '<marker display= "block !important"; ' + split[i];
    }
    result.svg = result.svg.replace(defs, newDefs);
  }
  static {
    this.ɵfac = function HtmlPresentationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HtmlPresentationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: HtmlPresentationService,
      factory: HtmlPresentationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 82972
/*!******************************************************!*\
  !*** ./src/app/tools/export/services/png.service.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PngService: () => (/* binding */ PngService)
/* harmony export */ });
/* harmony import */ var src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/export/services/exportUtil */ 97563);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);


class PngService {
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
  /** Needed for an SVG-Fix in Chrome where the # needs to be replaced by %23 **/
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
      svg = svg.replaceAll('#', '%23');
    }
    return svg;
  }
  findMostOuterElements(svg, includeSpaceForDescription) {
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
    // we need to adjust yUp to have space for the description if necessary
    if (includeSpaceForDescription) {
      yUp -= 75;
    }
    return {
      xLeft,
      xRight,
      yUp,
      yDown
    };
  }
  prepareSVG(svg, layerBase, description, title, withTitle) {
    const box = this.findMostOuterElements(layerBase, description === undefined);
    let viewBoxIndex = svg.indexOf('width="');
    let {
      width,
      height
    } = this.calculateWidthAndHeight(box);
    const {
      insertText,
      dynamicHeightOffset
    } = (0,src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_0__.createTitleAndDescriptionSVGElement)(0, title, description, box.xLeft + 10, box.yUp + 20, width);
    if (withTitle) {
      height += dynamicHeightOffset;
    }
    const bounds = this.createBounds(box, withTitle ? dynamicHeightOffset : 0, width, height);
    const dataStart = svg.substring(0, viewBoxIndex);
    viewBoxIndex = svg.indexOf('tabindex="');
    const dataEnd = svg.substring(viewBoxIndex);
    svg = dataStart + bounds + dataEnd;
    const insertIndex = svg.indexOf('<g class="viewport">') + 20;
    if (withTitle) {
      svg = [svg.slice(0, insertIndex), insertText, svg.slice(insertIndex)].join('');
    }
    svg = this.URIHashtagFix(svg);
    return {
      svg,
      width,
      height
    };
  }
  createBounds(box, extraHeight, width, height) {
    return 'width="' + width + '" height="' + height + '" viewBox=" ' + box.xLeft + ' ' + (box.yUp - extraHeight) + ' ' + width + ' ' + height + '" ';
  }
  /**
   * Calculate the Width and Height of the Bounding Box for the PNG so no Parts are cut off
   */
  calculateWidthAndHeight(box) {
    let width = 0;
    let height = 0;
    if (box.xLeft < 0) {
      if (box.xRight < 0) {
        width = Math.abs(box.xLeft - box.xRight);
      } else {
        width = Math.abs(box.xLeft) + box.xRight;
      }
    } else {
      width = box.xRight - box.xLeft;
    }
    if (box.yUp < 0) {
      if (box.yDown < 0) {
        height = Math.abs(box.yUp - box.yDown);
      } else {
        height = Math.abs(box.yUp) + box.yDown;
      }
    } else {
      height = box.yDown - box.yUp;
    }
    // if the domain-Story is smaller than 300px in width or height, increase its dimensions
    if (height < 300) {
      height += 300;
      box.yUp -= 150;
      box.yDown += 150;
    }
    if (width < 300) {
      width += 300;
      box.xLeft -= 150;
      box.xRight += 150;
    }
    return {
      width,
      height
    };
  }
  extractSVG(viewport, outerSVGElement) {
    const layerResizers = viewport.getElementsByClassName('layer-resizers');
    const layerOverlays = viewport.getElementsByClassName('layer-overlays');
    const transform = viewport.getAttribute('transform');
    const translate = viewport.getAttribute('translate');
    if (layerResizers[0]) {
      layerResizers[0].remove();
    }
    if (layerOverlays[0]) {
      layerOverlays[0].remove();
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
  createTempCanvas(width, height) {
    const tempCanvas = document.createElement('canvas');
    const padding = 10;
    tempCanvas.width = width + padding;
    tempCanvas.height = height + padding;
    return tempCanvas;
  }
  createSvgAndImage(canvas, description, title, withTitle) {
    const container = canvas.getElementsByClassName('djs-container');
    const svgElements = container[0].getElementsByTagName('svg');
    const outerSVGElement = svgElements[0];
    const viewport = outerSVGElement.getElementsByClassName('viewport')[0];
    const layerBase = viewport.querySelector('[class^="layer-root-"]');
    const {
      svg,
      width,
      height
    } = this.prepareSVG(this.extractSVG(viewport, outerSVGElement),
    // removes unwanted black dots in image
    layerBase, description, title, withTitle);
    return {
      svg,
      width,
      height,
      image: document.createElement('img')
    };
  }
  static {
    this.ɵfac = function PngService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PngService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: PngService,
      factory: PngService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 56837
/*!******************************************************!*\
  !*** ./src/app/tools/export/services/svg.service.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgService: () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/export/services/exportUtil */ 97563);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/export/exportConstants */ 41646);
/* harmony import */ var _replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../replay/services/story-creator.service */ 97720);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);







const MIN_WIDTH = 300;
class SvgService {
  constructor() {
    this.cacheData = '';
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__.ModelerService);
    this.storyCreatorService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_replay_services_story_creator_service__WEBPACK_IMPORTED_MODULE_4__.StoryCreatorService);
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
    const splitViewBox = viewBox.split(/\s/);
    const min_x = +splitViewBox[0];
    const min_y = +splitViewBox[1];
    let viewBoxWidth = +splitViewBox[2];
    const viewBoxHeight = +splitViewBox[3];
    // Set minimum width to ensure title and description are displayed reasonably
    if (viewBoxWidth < MIN_WIDTH) {
      viewBoxWidth += MIN_WIDTH;
      width += MIN_WIDTH;
    }
    const {
      insertText,
      dynamicHeightOffset
    } = (0,src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_1__.createTitleAndDescriptionSVGElement)(0, title, description, min_x, min_y, width);
    const bounds = this.createBounds(width, height, min_x, min_y, viewBoxWidth, viewBoxHeight, withTitle, dynamicHeightOffset);
    const dataStart = domainStorySvg.substring(0, viewBoxIndex);
    viewBoxIndex = domainStorySvg.indexOf('" version');
    const dataEnd = domainStorySvg.substring(viewBoxIndex);
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
    return this.appendSourceCode(domainStorySvg, dst);
  }
  createAnimatedSvg(domainStorySvg, animationSpeed = 2) {
    const story = this.storyCreatorService.traceActivitiesAndCreateStory().storyWithGroupsInLastSentence;
    const usedElementId = [];
    const storyLength = story.length;
    const visibleTimeInPercent = Math.floor(100 / storyLength);
    const durationOfAnimation = storyLength * animationSpeed;
    let sentenceCounter = 1;
    let currentVisibleTimeInPercent = visibleTimeInPercent;
    let previousVisibleTimeInPercent = visibleTimeInPercent;
    story.forEach(sentence => {
      const objects = sentence.objects.filter(it => !usedElementId.includes(it.id));
      objects.forEach(objectId => {
        usedElementId.push(objectId.id);
        const idIndex = domainStorySvg.indexOf(objectId.id);
        const insertIdIndex = domainStorySvg.indexOf('>', idIndex);
        domainStorySvg = `${domainStorySvg.slice(0, insertIdIndex)} id="group${sentenceCounter}" ${domainStorySvg.slice(insertIdIndex)}`;
        const index = domainStorySvg.indexOf(objectId.id);
        const insertIndex = domainStorySvg.indexOf('>', index) + 1;
        if (sentenceCounter > 1) {
          domainStorySvg = `${domainStorySvg.slice(0, insertIndex)}
            <style>
              #group${sentenceCounter} {
                  opacity: 0;
                  animation: visibilityControl${sentenceCounter} ${durationOfAnimation}s infinite;
              }
              @keyframes visibilityControl${sentenceCounter} {
                  ${previousVisibleTimeInPercent - 1}% { opacity: 0; }    /* Initially invisible */
                  ${previousVisibleTimeInPercent}% { opacity: 1; }  /* Starts becoming visible */
                  98% { opacity: 1; }   /* Stays visible */
                  99% { opacity: 0; }   /* Starts disappearing */
                  100% { opacity: 0; }  /* Fully invisible */
              }
            </style>  ${domainStorySvg.slice(insertIndex)}`;
        }
      });
      sentenceCounter += 1;
      previousVisibleTimeInPercent = currentVisibleTimeInPercent;
      currentVisibleTimeInPercent = visibleTimeInPercent * sentenceCounter;
    });
    return domainStorySvg;
  }
  findIndexToInsertData(data) {
    let insertIndex = data.indexOf('</defs>');
    if (insertIndex < 0) {
      insertIndex = data.indexOf('version="1.1">') + 14; // diagram-js exports SVG v. 1.1
    } else {
      insertIndex += 7;
    }
    return insertIndex;
  }
  createBounds(width, height, min_x, min_y, viewBoxWidth, viewBoxHeight, withTitle, dynamicHeightOffset) {
    height = withTitle ? height + dynamicHeightOffset + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.TEXTSPAN_TITLE_HEIGHT : height;
    min_x = min_x - _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_PADDING;
    min_y = withTitle ? min_y - dynamicHeightOffset - _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.TEXTSPAN_TITLE_HEIGHT : min_y;
    viewBoxHeight = withTitle ? viewBoxHeight + dynamicHeightOffset + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.TEXTSPAN_TITLE_HEIGHT + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_PADDING : viewBoxHeight;
    viewBoxWidth = viewBoxWidth + _domain_export_exportConstants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_PADDING;
    return `width="${width}" height="${height}" viewBox="${min_x} ${min_y} ${viewBoxWidth} ${viewBoxHeight}`;
  }
  viewBoxCoordinates(svg) {
    const match = svg.match(src_app_tools_export_services_exportUtil__WEBPACK_IMPORTED_MODULE_1__.ViewBoxCoordinateRegExp);
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
  appendSourceCode(data, dst) {
    const indexToAdd = data.length - '</svg>'.length;
    const start = data.substring(0, indexToAdd);
    const end = data.substring(indexToAdd);
    const hiddenText = "\n<text class='hiddenDomainStory' style='font-size: 0'>\n\n";
    const textClose = '\n\n</text>\n';
    return start + hiddenText + (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.sanitizeTextForSVGExport)('<DST>') + (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.sanitizeTextForSVGExport)(JSON.stringify(dst, null, 2)) + (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.sanitizeTextForSVGExport)('</DST>') + textClose + end;
  }
  static {
    this.ɵfac = function SvgService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SvgService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: SvgService,
      factory: SvgService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 31938
/*!**************************************************************!*\
  !*** ./src/app/tools/icon-set-config/domain/builtInIcons.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   builtInIcons: () => (/* binding */ builtInIcons)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);

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
// These SVGs are used to render the actors/work objects on the canvas and in the IconSet configuration. For palette and context pad, icons.css is used.
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

/***/ },

/***/ 76954
/*!*******************************************************************!*\
  !*** ./src/app/tools/icon-set-config/domain/iconFilterOptions.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 26103
/*!***************************************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-set-configuration/icon-set-configuration.component.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetConfigurationComponent: () => (/* binding */ IconSetConfigurationComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../domain/iconFilterOptions */ 76954);
/* harmony import */ var _services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/icon-set-customization.service */ 46252);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _selectable_icon_selectable_icon_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../selectable-icon/selectable-icon.component */ 60123);
/* harmony import */ var _icon_set_icon_set_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../icon-set/icon-set.component */ 58873);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 21662);

















function IconSetConfigurationComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "app-selectable-icon", 18);
  }
  if (rf & 2) {
    const iconName_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("iconName", iconName_r1);
  }
}
class IconSetConfigurationComponent {
  constructor() {
    this.iconSetImportExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_2__.IconSetImportExportService);
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__.IconDictionaryService);
    this.iconSetCustomizationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_7__.IconSetCustomizationService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__.ElementRegistryService);
    this.filter = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.NO_FILTER, ...(ngDevMode ? [{
      debugName: "filter"
    }] : /* istanbul ignore next */[]));
    this.allIcons = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(this.iconDictionaryService.getFullDictionary(), ...(ngDevMode ? [{
      debugName: "allIcons"
    }] : /* istanbul ignore next */[]));
    this.allIconNames = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)([], ...(ngDevMode ? [{
      debugName: "allIconNames"
    }] : /* istanbul ignore next */[]));
    this.allFilteredIconNames = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)([], ...(ngDevMode ? [{
      debugName: "allFilteredIconNames"
    }] : /* istanbul ignore next */[]));
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.effect)(() => {
      this.allIconNames.set(this.allIcons().keysArray().sort(this.sortByName));
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.effect)(() => {
      const allFiltered = this.getFilteredNamesForType(this.filter());
      this.allFilteredIconNames.set([...allFiltered].sort(this.sortByName));
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
  /** Open dialog for uploading custom icon **/
  startIconUpload() {
    document.getElementById('importIcon')?.click();
  }
  /** Read icon from file and store it **/
  importIcon() {
    var _this = this;
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // @ts-ignore
      const files = document.getElementById('importIcon').files;
      for (let iconInputFile of files) {
        const name = (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_5__.sanitizeIconName)(iconInputFile.name);
        const iconName = name + '-custom'; // this suffix helps users to see which icons they uploaded; it should not be used to check if an icon is actually custom or not since this convention was introduced after v1.3.0 and is therefore not reliable information
        const src = yield _this.readFileAsDataURL(iconInputFile);
        _this.iconDictionaryService.addCustomIcon(src, iconName);
        _this.allIcons.set(_this.iconDictionaryService.getFullDictionary());
        _this.filter.set(_this.filter());
        _this.iconSetCustomizationService.addNewCustomIcon(iconName);
      }
    })();
  }
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = e => {
        if (e.target?.result) {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  /** Import Icon Set **/
  startIconSetImport() {
    document.getElementById('importIconSet')?.click();
  }
  importIconSet() {
    var _this2 = this;
    return (0,_home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // @ts-ignore
      const iconSetInputFile = document.getElementById('importIconSet').files[0];
      const text = yield iconSetInputFile.text();
      const configFromFile = JSON.parse(text);
      const config = _this2.iconSetImportExportService.createIconSetConfiguration(configFromFile);
      _this2.iconSetImportExportService.loadIconSet(config, false);
      _this2.iconSetCustomizationService.importConfiguration(config);
      _this2.allIcons.set(_this2.iconDictionaryService.getFullDictionary());
      _this2.filter.set(_this2.filter());
    })();
  }
  /** Filter **/
  filterForActors() {
    if (this.filter() === _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_ACTORS) {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.NO_FILTER);
    } else {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_ACTORS);
    }
  }
  filterForWorkObjects() {
    if (this.filter() === _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_WORKOBJECTS) {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.NO_FILTER);
    } else {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_WORKOBJECTS);
    }
  }
  filterForUnassigned() {
    if (this.filter() === _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_UNASSIGNED) {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.NO_FILTER);
    } else {
      this.filter.set(_domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_UNASSIGNED);
    }
  }
  filterByNameAndType($event) {
    const filteredByKeyWord = this.allIcons().all().filter(entry => entry.keyWords.some(key => {
      //@ts-ignore
      return key.toLowerCase().includes($event.target.value.toLowerCase());
    })).map(entry => entry.key);
    const filteredByNameAndType = this.getFilteredNamesForType(this.filter()).filter(name =>
    //@ts-ignore
    name.toLowerCase().includes($event.target.value.toLowerCase()) || filteredByKeyWord.includes(name));
    this.allFilteredIconNames.set([...filteredByNameAndType].sort(this.sortByName));
  }
  getFilteredNamesForType(type) {
    let allFiltered = [];
    switch (type) {
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.NO_FILTER:
        allFiltered = this.allIconNames();
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_ACTORS:
        allFiltered = this.allIconNames().filter(name => this.iconSetCustomizationService.isIconActor(name));
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_WORKOBJECTS:
        allFiltered = this.allIconNames().filter(name => this.iconSetCustomizationService.isIconWorkObject(name));
        break;
      case _domain_iconFilterOptions__WEBPACK_IMPORTED_MODULE_6__.IconFilterOptions.ONLY_UNASSIGNED:
        allFiltered = this.allIconNames().filter(name => !this.iconSetCustomizationService.isIconActor(name) && !this.iconSetCustomizationService.isIconWorkObject(name));
        break;
    }
    return allFiltered;
  }
  static {
    this.ɵfac = function IconSetConfigurationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconSetConfigurationComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
      type: IconSetConfigurationComponent,
      selectors: [["app-icon-set-configuration"]],
      decls: 41,
      vars: 6,
      consts: [[1, "content"], [1, "header"], [1, "searchbar"], [1, "heading"], ["type", "button", "mat-button", "", "title", "Unassigned Icons", 3, "click"], ["type", "button", "mat-button", "", "title", "Icons used as actors", 3, "click"], ["type", "button", "mat-button", "", "title", "Icons used as work objects", 3, "click"], ["color", "accent", "subscriptSizing", "dynamic", "appearance", "outline", 1, "searchForm", "dense-8"], ["matInput", "", "type", "text", 3, "input"], [1, "buttons"], ["type", "button", "mat-stroked-button", "", "title", "Import icon set", 1, "mr-1", 3, "click"], ["type", "file", "accept", ".domain, .iconset", "id", "importIconSet", "name", "file", "onclick", "this.value = null", 2, "display", "none", 3, "change"], ["type", "button", "mat-stroked-button", "", "title", "Upload icon", 1, "mr-1", 3, "click"], ["type", "file", "multiple", "", "accept", ".svg, image/png, image/jpeg, image/gif", "id", "importIcon", "name", "file", "onclick", "this.value = null", 2, "display", "none", 3, "change"], ["type", "button", "mat-stroked-button", "", "title", "Reset to default icon set", 1, "mr-1", 3, "click"], ["type", "button", "mat-stroked-button", "", "title", "Cancel changes", 1, "mr-1", 3, "click"], ["type", "button", "mat-flat-button", "", "title", "Save changes", "color", "primary", 1, "mr-1", 3, "click"], [1, "iconList", "smallScrollbar"], [3, "iconName"]],
      template: function IconSetConfigurationComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "div", 1)(3, "div", 2)(4, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5, "Filter:");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_6_listener() {
            return ctx.filterForUnassigned();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8, "Unassigned");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_9_listener() {
            return ctx.filterForActors();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](11, "Actors");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_12_listener() {
            return ctx.filterForWorkObjects();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14, "Work Objects");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "mat-form-field", 7)(16, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](17, "Search icons");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("input", function IconSetConfigurationComponent_Template_input_input_18_listener($event) {
            return ctx.filterByNameAndType($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "div", 9)(20, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_20_listener() {
            return ctx.startIconSetImport();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](22, "Import icon set");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](23, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_23_listener() {
            return ctx.importIconSet();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_24_listener() {
            return ctx.startIconUpload();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](25, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](26, "Upload icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](27, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function IconSetConfigurationComponent_Template_input_change_27_listener() {
            return ctx.importIcon();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](28, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_28_listener() {
            return ctx.loadMinimalIconConfigurationWithDefaultIcons();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](29, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](30, "Reset to default");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](31, "button", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_31_listener() {
            return ctx.loadInitialConfiguration();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](32, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](33, "Cancel changes");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](34, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IconSetConfigurationComponent_Template_button_click_34_listener() {
            return ctx.saveIconSet();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](35, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](36, "Save changes");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](37, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterCreate"](38, IconSetConfigurationComponent_For_39_Template, 1, 1, "app-selectable-icon", 18, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](40, "app-icon-set");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("activeNone", ctx.filter() === "ICON_FILTER_UNASSIGNED");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("activeActor", ctx.filter() === "ICON_FILTER_ACTOR");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("activeWorkObject", ctx.filter() === "ICON_FILTER_WORKOBJECT");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeater"](ctx.allFilteredIconNames());
        }
      },
      dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _selectable_icon_selectable_icon_component__WEBPACK_IMPORTED_MODULE_11__.SelectableIconComponent, _icon_set_icon_set_component__WEBPACK_IMPORTED_MODULE_12__.IconSetComponent],
      styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto max-content;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: max-content auto;\n  height: 46px;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.searchbar[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-left: 15px;\n  margin-right: 15px;\n  align-self: center;\n  align-items: center;\n  justify-self: left;\n  height: inherit;\n}\n\n.heading[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 4px;\n}\n\nbutton[_ngcontent-%COMP%] {\n  letter-spacing: 0.05em;\n  line-height: 0.9rem;\n}\n\n.buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-self: center;\n  align-items: center;\n  justify-self: right;\n  height: inherit;\n}\n\n.activeNone[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.activeActor[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.activeWorkObject[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.searchForm[_ngcontent-%COMP%] {\n  background-color: white;\n  margin: 4px;\n}\n\n.iconList[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-y: scroll;\n  height: calc(100vh - 130px);\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: baseline;\n  margin-top: 1rem;\n  margin-left: 1rem;\n  gap: 1rem;\n}\n.iconList[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-last-child(1) {\n  margin-bottom: 1rem;\n}\n\n .mat-grid-tile .mat-grid-tile-content {\n  justify-content: inherit;\n}\n\n .mat-form-field .mat-mdc-text-field-wrapper {\n  height: 28px;\n}\n .mat-form-field {\n  height: 28px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9pY29uLXNldC1jb25maWd1cmF0aW9uL2ljb24tc2V0LWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsdUNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSx1Q0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0FBQ0Y7QUFDRTtFQUNFLG1CQUFBO0FBQ0o7O0FBSUU7RUFDRSx3QkFBQTtBQURKOztBQU1FO0VBQ0UsWUFBQTtBQUhKO0FBQ0E7RUFJRSxZQUFBO0FBRkYiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcbn1cblxuLmhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgYXV0bztcbiAgaGVpZ2h0OiA0NnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uc2VhcmNoYmFyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG59XG5cbi5oZWFkaW5nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xufVxuXG5idXR0b24ge1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBsaW5lLWhlaWdodDogMC45cmVtO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XG4gIGhlaWdodDogaW5oZXJpdDtcbn1cblxuLmFjdGl2ZU5vbmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5M2FjO1xufVxuXG4uYWN0aXZlQWN0b3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5M2FjO1xufVxuXG4uYWN0aXZlV29ya09iamVjdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDkzYWM7XG59XG5cbi5zZWFyY2hGb3JtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1hcmdpbjogNHB4O1xufVxuXG4uaWNvbkxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDEzMHB4KTtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1jb250ZW50OiBiYXNlbGluZTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIGdhcDogMXJlbTtcblxuICA6bnRoLWxhc3QtY2hpbGQoMSkge1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIH1cbn1cblxuOjpuZy1kZWVwLm1hdC1ncmlkLXRpbGUge1xuICAubWF0LWdyaWQtdGlsZS1jb250ZW50IHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGluaGVyaXQ7XG4gIH1cbn1cblxuOjpuZy1kZWVwLm1hdC1mb3JtLWZpZWxkIHtcbiAgLm1hdC1tZGMtdGV4dC1maWVsZC13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gIH1cbiAgaGVpZ2h0OiAyOHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 58873
/*!***********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/icon-set/icon-set.component.ts ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetComponent: () => (/* binding */ IconSetComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-customization.service */ 46252);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _selected_icon_selected_icon_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../selected-icon/selected-icon.component */ 97955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 21662);













function IconSetComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("dragover", function IconSetComponent_For_17_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.allowDrop($event, "actorList"));
    })("dragstart", function IconSetComponent_For_17_Template_mat_list_item_dragstart_0_listener() {
      const ɵ$index_29_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onDragStart(ɵ$index_29_r3, "actorList"));
    })("drop", function IconSetComponent_For_17_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const iconName_r5 = ctx_r3.$implicit;
      const ɵ$index_29_r3 = ctx_r3.$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r5, true, ɵ$index_29_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-selected-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const iconName_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("icon", ctx_r1.getIconForName(iconName_r5));
  }
}
function IconSetComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("dragover", function IconSetComponent_For_23_Template_mat_list_item_dragover_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.allowDrop($event, "workObjectList"));
    })("dragstart", function IconSetComponent_For_23_Template_mat_list_item_dragstart_0_listener() {
      const ɵ$index_41_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onDragStart(ɵ$index_41_r7, "workObjectList"));
    })("drop", function IconSetComponent_For_23_Template_mat_list_item_drop_0_listener($event) {
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const iconName_r9 = ctx_r7.$implicit;
      const ɵ$index_41_r7 = ctx_r7.$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onDrop($event, iconName_r9, false, ɵ$index_41_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-selected-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const iconName_r9 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("icon", ctx_r1.getIconForName(iconName_r9));
  }
}
class IconSetComponent {
  constructor() {
    this.customizationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_1__.IconSetCustomizationService);
    this.importExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_2__.IconSetImportExportService);
    this.draggedList = '';
    this.draggedIndex = 0;
    this.iconSetName = this.importExportService.iconSetName;
    this.selectedActorsSignal = this.customizationService.selectedActorsSignal;
    this.selectedWorkObjectsSignal = this.customizationService.selectedWorkObjectsSignal;
  }
  changeName(event) {
    const target = event.target;
    this.customizationService.changeName(target.value);
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
      list = this.selectedActorsSignal;
    } else {
      list = this.selectedWorkObjectsSignal;
    }
    const sortedList = list();
    const item = sortedList[this.draggedIndex];
    sortedList.splice(this.draggedIndex, 1);
    sortedList.splice(index, 0, item);
    list.set(sortedList);
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
    this.importExportService.exportConfiguration();
  }
  static {
    this.ɵfac = function IconSetComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconSetComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: IconSetComponent,
      selectors: [["app-icon-set"]],
      decls: 24,
      vars: 1,
      consts: [[1, "details", "smallScrollbar"], [1, "IconSet"], ["color", "accent", 1, "exportForm"], ["matInput", "", "type", "text", "subscriptSizing", "dynamic", 1, "dense-8", 3, "input", "value"], ["type", "button", "mat-stroked-button", "", "title", "Export icon set", 1, "exportForm", 3, "click"], [1, "actorList"], ["draggable", "true", 1, "compactItem"], [1, "workObjectList"], ["draggable", "true", 1, "compactItem", 3, "dragover", "dragstart", "drop"], [3, "icon"]],
      template: function IconSetComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Export as File:");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 1)(5, "mat-form-field", 2)(6, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Icon set name");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function IconSetComponent_Template_input_input_8_listener($event) {
            return ctx.changeName($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function IconSetComponent_Template_button_click_9_listener() {
            return ctx.exportIconSet();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Export icon set");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 5)(13, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Order of Actors:");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "mat-list");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterCreate"](16, IconSetComponent_For_17_Template, 2, 1, "mat-list-item", 6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "div", 7)(19, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Order of Work Objects:");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "mat-list");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterCreate"](22, IconSetComponent_For_23_Template, 2, 1, "mat-list-item", 6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.iconSetName());
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeater"](ctx.selectedActorsSignal());
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeater"](ctx.selectedWorkObjectsSignal());
        }
      },
      dependencies: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatListModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatListItem, _selected_icon_selected_icon_component__WEBPACK_IMPORTED_MODULE_7__.SelectedIconComponent],
      styles: [".details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 46px - 20px);\n  grid-row-gap: 4px;\n  overflow-y: auto;\n  overflow-x: auto;\n  background-color: #f7f7f8;\n  margin-top: 8px;\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.IconSet[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.compactItem[_ngcontent-%COMP%] {\n  height: 40px !important;\n}\n\n.compactItem[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-left: 12px;\n}\n\n.exportForm[_ngcontent-%COMP%] {\n  margin: 8px 12px 0;\n}\n\nh3[_ngcontent-%COMP%] {\n  padding-left: 12px;\n  margin-top: 8px;\n  margin-bottom: 0;\n  font-weight: bold;\n}\n\nmat-list[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n\n .mat-mdc-form-field-subscript-wrapper {\n  height: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9pY29uLXNldC9pY29uLXNldC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGlDQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQ2cHggLSAyMHB4KTtcbiAgZ3JpZC1yb3ctZ2FwOiA0cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG59XG5cbi5JY29uU2V0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcbn1cblxuLmNvbXBhY3RJdGVtIHtcbiAgaGVpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5jb21wYWN0SXRlbTpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmZ1bGxXaWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nLWxlZnQ6IDEycHg7XG59XG5cbi5leHBvcnRGb3JtIHtcbiAgbWFyZ2luOiA4cHggMTJweCAwO1xufVxuXG5oMyB7XG4gIHBhZGRpbmctbGVmdDogMTJweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxubWF0LWxpc3Qge1xuICBwYWRkaW5nLXRvcDogMDtcbn1cblxuOjpuZy1kZWVwLm1hdC1tZGMtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XG4gIGhlaWdodDogMCAhaW1wb3J0YW50O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 60123
/*!*************************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/selectable-icon/selectable-icon.component.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectableIconComponent: () => (/* binding */ SelectableIconComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var _services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/icon-set-customization.service */ 46252);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ 68529);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11525);






class SelectableIconComponent {
  constructor() {
    this.iconName = '';
    this.iconInitiated = false;
    this.icon = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject({
      isActor: false,
      isWorkObject: false,
      name: '',
      svg: ''
    });
    this.isActor = false;
    this.isWorkObject = false;
    this.isNone = true;
    this.iconSetCustomizationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_2__.IconSetCustomizationService);
  }
  get name() {
    return this.iconName;
  }
  get id() {
    return 'domain-configuration-icon-' + this.iconName;
  }
  ngOnInit() {
    this.icon = this.iconSetCustomizationService.getIconForName(this.iconName);
    if (!this.icon) {
      return;
    }
    this.icon.subscribe(value => {
      this.isActor = value.isActor;
      this.isWorkObject = value.isWorkObject;
      this.isNone = !(value.isActor || value.isWorkObject);
    });
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
  setAsUnassigned() {
    this.iconSetCustomizationService.setAsUnassigned(this.iconName);
  }
  setAsActor() {
    this.iconSetCustomizationService.setAsActor(this.iconName);
  }
  setAsWorkObject() {
    this.iconSetCustomizationService.setAsWorkObject(this.iconName);
  }
  static {
    this.ɵfac = function SelectableIconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SelectableIconComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: SelectableIconComponent,
      selectors: [["app-selectable-icon"]],
      inputs: {
        iconName: "iconName"
      },
      decls: 16,
      vars: 16,
      consts: [[1, "content"], ["src", "", 1, "icon", 3, "id", "alt"], [1, "name"], [1, "footer"], [3, "hideSingleSelectionIndicator"], ["type", "button", 3, "change", "value", "checked"], [1, "toggleButtonTitle"]],
      template: function SelectableIconComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3)(6, "mat-button-toggle-group", 4)(7, "mat-button-toggle", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SelectableIconComponent_Template_mat_button_toggle_change_7_listener() {
            return ctx.setAsUnassigned();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "None");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-button-toggle", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SelectableIconComponent_Template_mat_button_toggle_change_10_listener() {
            return ctx.setAsActor();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Actor");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "mat-button-toggle", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SelectableIconComponent_Template_mat_button_toggle_change_13_listener() {
            return ctx.setAsWorkObject();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Work Object");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinterpolate"](ctx.id))("alt", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinterpolate"](ctx.name));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("hideSingleSelectionIndicator", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.isNone)("checked", ctx.isNone);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("activeMatButtonActor", ctx.isActor);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.isActor)("checked", ctx.isActor);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("activeMatButtonWorkObject", ctx.isWorkObject);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.isWorkObject)("checked", ctx.isWorkObject);
        }
      },
      dependencies: [_angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__.MatButtonToggleModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__.MatButtonToggle],
      styles: [".content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto;\n  justify-items: center;\n}\n\n.icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n}\n\n.name[_ngcontent-%COMP%] {\n  word-wrap: anywhere;\n  max-height: 75px;\n  overflow: hidden;\n  padding-bottom: 2px;\n}\n\n.footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.footer[_ngcontent-%COMP%]    .mat-button-toggle-label-content {\n  font-size: 10pt !important;\n  padding: 0 5px !important;\n  line-height: inherit !important;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonActor button {\n  background-color: #e1aea4;\n}\n.footer[_ngcontent-%COMP%]    .activeMatButtonWorkObject button {\n  background-color: #a4d7e1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9zZWxlY3RhYmxlLWljb24vc2VsZWN0YWJsZS1pY29uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFDRTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSwrQkFBQTtBQUNKO0FBRUU7RUFDRSx5QkFBQTtBQUFKO0FBR0U7RUFDRSx5QkFBQTtBQURKIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xufVxuXG4uaWNvbiB7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG59XG5cbi5uYW1lIHtcbiAgd29yZC13cmFwOiBhbnl3aGVyZTtcbiAgbWF4LWhlaWdodDogNzVweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZy1ib3R0b206IDJweDtcbn1cblxuLmZvb3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIDo6bmctZGVlcC5tYXQtYnV0dG9uLXRvZ2dsZS1sYWJlbC1jb250ZW50IHtcbiAgICBmb250LXNpemU6IDEwcHQgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiAwIDVweCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gIH1cblxuICA6Om5nLWRlZXAuYWN0aXZlTWF0QnV0dG9uQWN0b3IgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFhZWE0O1xuICB9XG5cbiAgOjpuZy1kZWVwLmFjdGl2ZU1hdEJ1dHRvbldvcmtPYmplY3QgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTRkN2UxO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 97955
/*!*********************************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/presentation/selected-icon/selected-icon.component.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectedIconComponent: () => (/* binding */ SelectedIconComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ 21662);



class SelectedIconComponent {
  constructor() {
    this.iconInitiated = false;
  }
  get id() {
    return 'domain-configuration-details-icon-' + this.icon.name.toLowerCase() + '-' + (this.icon.isWorkObject ? 'workObject' : 'actor');
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
  static {
    this.ɵfac = function SelectedIconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SelectedIconComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SelectedIconComponent,
      selectors: [["app-selected-icon"]],
      inputs: {
        icon: "icon"
      },
      decls: 4,
      vars: 6,
      consts: [[1, "detailsListItem"], [1, "icon", 3, "id", "alt", "src"], [1, "iconName"]],
      template: function SelectedIconComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-label", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinterpolate"](ctx.id))("alt", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinterpolate"](ctx.name))("src", ctx.icon.svg, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.icon.name);
        }
      },
      dependencies: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_0__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatLabel],
      styles: [".icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  padding-right: 3px;\n}\n\n.detailsListItem[_ngcontent-%COMP%] {\n  display: flex;\n  justify-items: center;\n  align-items: center;\n  width: 250px;\n}\n\n.iconName[_ngcontent-%COMP%] {\n  max-width: 225px;\n  word-wrap: anywhere;\n  white-space: pre-wrap !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaWNvbi1zZXQtY29uZmlnL3ByZXNlbnRhdGlvbi9zZWxlY3RlZC1pY29uL3NlbGVjdGVkLWljb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmljb24ge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAzcHg7XG59XG5cbi5kZXRhaWxzTGlzdEl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAyNTBweDtcbn1cblxuLmljb25OYW1lIHtcbiAgbWF4LXdpZHRoOiAyMjVweDtcbiAgd29yZC13cmFwOiBhbnl3aGVyZTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwICFpbXBvcnRhbnQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 25583
/*!********************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-css.service.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconCssService: () => (/* binding */ IconCssService)
/* harmony export */ });
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 38424);



const ICON_CSS_SHEET_ID = 'iconsCss';
class IconCssService {
  addIconsToCss(iconSrc, iconName) {
    const iconCssSheet = document.getElementById(ICON_CSS_SHEET_ID);
    if (!iconCssSheet) {
      return;
    }
    const iconStyle = '.' + src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_0__.ICON_CSS_CLASS_PREFIX + (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_1__.sanitizeForCss)(iconName) + '::before{ content: url("data:image/svg+xml;utf8,' + this.wrapSRCInSVG(iconSrc) + '"); margin: 3px;}';
    // @ts-ignore
    iconCssSheet?.sheet?.insertRule(iconStyle,
    // @ts-ignore
    iconCssSheet.sheet.cssRules.length);
  }
  wrapSRCInSVG(src) {
    return "<svg viewBox='0 0 22 22' width='22' height='22' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><image width='22' height='22' xlink:href='" + src + "'/></svg>";
  }
  static {
    this.ɵfac = function IconCssService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconCssService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: IconCssService,
      factory: IconCssService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 6932
/*!***************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-dictionary.service.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_CSS_CLASS_PREFIX: () => (/* binding */ ICON_CSS_CLASS_PREFIX),
/* harmony export */   IconDictionaryService: () => (/* binding */ IconDictionaryService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/icon-set-config/domain/builtInIcons */ 31938);
/* harmony import */ var _utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/sanitizer */ 43515);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_css_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-css.service */ 25583);








const ICON_CSS_CLASS_PREFIX = 'icon-domain-story-';
class IconDictionaryService {
  constructor() {
    this.iconCssService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_css_service__WEBPACK_IMPORTED_MODULE_6__.IconCssService);
    // The dictionaries hold icons (as SVG) and icon names as key-value pairs
    this.customIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    // these dictionaries make up the current icon set:
    this.selectedActorsDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.selectedWorkObjectsDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    // default icon sets:
    this.NAMES_OF_DEFAULT_ICONS = {
      actors: ['Person', 'Group', 'System'],
      workObjects: ['Document', 'Folder', 'Call', 'Email', 'Conversation', 'Info']
    };
  }
  createDefaultIconSet() {
    const defaultActorsDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    const defaultWorkObjectsDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.initDictionary(this.NAMES_OF_DEFAULT_ICONS.actors, src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons, defaultActorsDictionary);
    this.initDictionary(this.NAMES_OF_DEFAULT_ICONS.workObjects, src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons, defaultWorkObjectsDictionary);
    return {
      name: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_ICON_SET_NAME,
      actors: defaultActorsDictionary,
      workObjects: defaultWorkObjectsDictionary
    };
  }
  initTypeDictionaries() {
    if (this.selectedActorsDictionary.isEmpty() && this.selectedWorkObjectsDictionary.isEmpty()) {
      this.setIconSet(this.createDefaultIconSet());
    }
  }
  initDictionary(selectedIconNames, allIcons, dictionary) {
    dictionary.clear();
    for (const key of selectedIconNames) {
      dictionary.set(key, allIcons.get(key));
    }
  }
  registerIconForType(type, name, src) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    this.getIconsAssignedAs(type).set(name, src);
  }
  unregisterIconForType(type, name) {
    if (name.includes(type)) {
      throw new Error('Name should not include type!');
    }
    this.getIconsAssignedAs(type).delete(name);
  }
  // When an icon set or a domain story (which includes its icon set) are imported,
  // we need to...:
  // 1. add new custom icons (if any)
  // 2. update which icons are selected as actors/work objects
  updateIconRegistries(config) {
    const newIcons = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    this.extractCustomIconsFromDictionary(config.actors, newIcons);
    this.extractCustomIconsFromDictionary(config.workObjects, newIcons);
    this.addCustomIcons(newIcons);
    this.setIconSet(config);
  }
  extractCustomIconsFromDictionary(elementDictionary, customIcons) {
    elementDictionary.keysArray().forEach(name => {
      if (!this.getFullDictionary().has(name)) {
        customIcons.set(name, elementDictionary.get(name));
      }
    });
  }
  addCustomIcon(iconSrc, name) {
    this.customIcons.set(name, iconSrc);
    this.iconCssService.addIconsToCss(iconSrc, name);
  }
  addCustomIcons(icons) {
    icons.keysArray().forEach(key => {
      const custom = icons.get(key);
      this.addCustomIcon(custom, key);
    });
  }
  /** Getter & Setter **/
  getFullDictionary() {
    const fullDictionary = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_1__.Dictionary();
    fullDictionary.appendDict(src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons);
    fullDictionary.appendDict(this.customIcons);
    return fullDictionary;
  }
  getIconsAssignedAs(type) {
    switch (type) {
      case src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTOR:
        return this.selectedActorsDictionary;
      case src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT:
        return this.selectedWorkObjectsDictionary;
      default:
        throw new Error(`Unsupported icon type: ${type}`);
    }
  }
  getCSSClassOfIcon(name) {
    return ICON_CSS_CLASS_PREFIX + (0,_utils_sanitizer__WEBPACK_IMPORTED_MODULE_4__.sanitizeForCss)(name);
  }
  getIconSource(name) {
    if (src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons.has(name)) {
      return src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_3__.builtInIcons.get(name);
    } else if (this.customIcons.has(name)) {
      return this.customIcons.get(name);
    }
    return '';
  }
  setIconSet(iconSet) {
    this.selectedActorsDictionary = iconSet.actors;
    this.selectedWorkObjectsDictionary = iconSet.workObjects;
  }
  getDefaultIconSet() {
    return this.createDefaultIconSet();
  }
  static {
    this.ɵfac = function IconDictionaryService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconDictionaryService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: IconDictionaryService,
      factory: IconDictionaryService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 46252
/*!**********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-set-customization.service.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetChangedService: () => (/* binding */ IconSetChangedService),
/* harmony export */   IconSetCustomizationService: () => (/* binding */ IconSetCustomizationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 63445);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 95536);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../domain/entities/dictionary */ 20843);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icon-set-import-export.service */ 93103);
/* harmony import */ var _icon_dictionary_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icon-dictionary.service */ 6932);
/* harmony import */ var src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/tools/icon-set-config/domain/builtInIcons */ 31938);
/* harmony import */ var src_app_tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/tools/autosave/services/autosave.service */ 41707);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_set_notification_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-set-notification.service */ 31832);












/**
 * We are not allowed to call ImportDomainStoryService directly,
 * so we use this "interface" instead.
 */
class IconSetChangedService {}
class IconSetCustomizationService {
  constructor() {
    this.allIconListItems = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__.Dictionary();
    this.configurationHasChanged = false;
    this.iconSetImportExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__.IconSetImportExportService);
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_8__.IconDictionaryService);
    this.iconSetNotificationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_set_notification_service__WEBPACK_IMPORTED_MODULE_11__.IconSetNotificationService);
    this.iconSetChangedService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(IconSetChangedService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_3__.ElementRegistryService);
    this.autosaveService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_autosave_services_autosave_service__WEBPACK_IMPORTED_MODULE_10__.AutosaveService);
    const configurationNamesWithoutPrefix = this.getCurrentConfigurationNamesWithoutPrefix();
    this.iconSetConfigurationTypesSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(configurationNamesWithoutPrefix, ...(ngDevMode ? [{
      debugName: "iconSetConfigurationTypesSignal"
    }] : /* istanbul ignore next */[]));
    this.selectedWorkObjectsSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(configurationNamesWithoutPrefix.workObjects, ...(ngDevMode ? [{
      debugName: "selectedWorkObjectsSignal"
    }] : /* istanbul ignore next */[]));
    this.selectedActorsSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(configurationNamesWithoutPrefix.actors, ...(ngDevMode ? [{
      debugName: "selectedActorsSignal"
    }] : /* istanbul ignore next */[]));
    src_app_tools_icon_set_config_domain_builtInIcons__WEBPACK_IMPORTED_MODULE_9__.builtInIcons.keysArray().forEach(iconName => {
      this.addIconToAllIconList(iconName);
    });
    const storedIconSetConfiguration = this.iconSetImportExportService.getStoredIconSetConfiguration();
    if (storedIconSetConfiguration) {
      this.importConfiguration(storedIconSetConfiguration, false);
    }
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
      const importConfigChanged = this.autosaveService.importConfigChanged();
      if (importConfigChanged) {
        // effects track EVERY SIGNAL inside their executionChain.
        // importConfiguration triggers both selectedActorsSignal and selectedWorkObjectsSignal
        // => if these are tracked, then selecting an Icon to be an actor or workobjects
        // triggers the import chich then resets the configuration to its initial state
        (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.untracked)(() => {
          this.importConfiguration(importConfigChanged, false);
          this.updateAllIconBehaviorSubjects();
        });
      }
    });
    this.iconSetChangedService.iconConfigurationChanged().subscribe(config => {
      this.importConfiguration(config);
    });
  }
  importConfiguration(customConfig, saveIconSet = true) {
    this.changeName(customConfig.name);
    const currentlyUsedIcons = this.elementRegistryService.getUsedIcons();
    this.updateActorsFromConfiguration(customConfig.actors.keysArray(), currentlyUsedIcons);
    this.updateWorkObjectsFromConfiguration(customConfig.workObjects.keysArray(), currentlyUsedIcons);
    if (saveIconSet) {
      this.saveIconSet(currentlyUsedIcons, true);
    }
  }
  updateWorkObjectsFromConfiguration(workObjectKeys, usedIcons) {
    workObjectKeys.forEach(iconName => {
      if (!this.allIconListItems.has(iconName)) {
        this.addIconToAllIconList(iconName);
      }
      const selectedWorkObjectNames = this.selectedWorkObjectsSignal();
      if (!selectedWorkObjectNames.includes(iconName)) {
        this.selectWorkObject(iconName);
      }
    });
    this.selectedWorkObjectsSignal().forEach(iconName => {
      if (!workObjectKeys.includes(iconName) && !usedIcons.workObjects.includes(iconName)) {
        this.deselectWorkObject(iconName);
      }
    });
  }
  updateActorsFromConfiguration(actorKeys, usedIcons) {
    actorKeys.forEach(iconName => {
      if (!this.allIconListItems.has(iconName)) {
        this.addIconToAllIconList(iconName);
      }
      const selectedActorNames = this.selectedActorsSignal();
      if (!selectedActorNames.includes(iconName)) {
        this.selectActor(iconName);
      }
    });
    this.selectedActorsSignal().forEach(iconName => {
      if (!actorKeys.includes(iconName) && !usedIcons.actors.includes(iconName)) {
        this.deselectActor(iconName);
      }
    });
  }
  /** Getter & Setter **/
  getIconForName(iconName) {
    return this.allIconListItems.get(iconName);
  }
  isIconActor(iconName) {
    return this.iconSetConfigurationTypesSignal().actors.includes(iconName);
  }
  isIconWorkObject(iconName) {
    return this.iconSetConfigurationTypesSignal().workObjects.includes(iconName);
  }
  changeName(iconSetName) {
    this.iconSetImportExportService.setIconSetName(iconSetName);
    this.iconSetConfigurationTypesSignal.update(current => ({
      ...current,
      name: iconSetName
    }));
  }
  /** Selected Icons **/
  setAsUnassigned(iconName) {
    this.isIconActor(iconName) ? this.deselectActor(iconName) : this.deselectWorkObject(iconName);
    this.updateIconSelectionState(false, false, iconName);
  }
  setAsActor(actor) {
    this.updateIconSelectionState(true, false, actor);
    this.selectActor(actor);
    this.deselectWorkObject(actor);
  }
  setAsWorkObject(workObject) {
    this.updateIconSelectionState(false, true, workObject);
    this.selectWorkObject(workObject);
    this.deselectActor(workObject);
  }
  selectActor(actor) {
    const currentIconSetSelection = this.iconSetConfigurationTypesSignal();
    if (!currentIconSetSelection.actors.includes(actor)) {
      this.iconSetConfigurationTypesSignal.set({
        actors: [actor, ...currentIconSetSelection.actors],
        workObjects: currentIconSetSelection.workObjects,
        name: currentIconSetSelection.name
      });
      this.updateActorSignal();
    }
  }
  selectWorkObject(workObject) {
    const currentIconSetSelection = this.iconSetConfigurationTypesSignal();
    if (!currentIconSetSelection.workObjects.includes(workObject)) {
      this.iconSetConfigurationTypesSignal.set({
        actors: currentIconSetSelection.actors,
        workObjects: [workObject, ...currentIconSetSelection.workObjects],
        name: currentIconSetSelection.name
      });
      this.updateWorkObjectSignal();
    }
  }
  deselectActor(actor) {
    if (this.iconSetConfigurationTypesSignal()) {
      this.iconSetConfigurationTypesSignal.set({
        name: this.iconSetConfigurationTypesSignal().name,
        actors: this.iconSetConfigurationTypesSignal().actors.filter(a => a !== actor),
        workObjects: this.iconSetConfigurationTypesSignal().workObjects
      });
    }
    this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR, actor);
    this.updateActorSignal();
  }
  deselectWorkObject(workObject) {
    if (this.iconSetConfigurationTypesSignal()) {
      this.iconSetConfigurationTypesSignal.set({
        name: this.iconSetConfigurationTypesSignal().name,
        actors: this.iconSetConfigurationTypesSignal().actors,
        workObjects: this.iconSetConfigurationTypesSignal().workObjects.filter(w => w !== workObject)
      });
    }
    this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT, workObject);
    this.updateWorkObjectSignal();
  }
  setSelectedWorkObject(sortedList) {
    this.iconSetConfigurationTypesSignal.update(current => ({
      ...current,
      workObjects: sortedList
    }));
    this.updateWorkObjectSignal();
  }
  setSelectedActors(sortedList) {
    this.iconSetConfigurationTypesSignal.update(current => ({
      ...current,
      actors: sortedList
    }));
    this.updateActorSignal();
  }
  updateActorSignal() {
    this.selectedActorsSignal.set(this.iconSetConfigurationTypesSignal().actors);
    this.configurationHasChanged = true;
  }
  updateWorkObjectSignal() {
    this.selectedWorkObjectsSignal.set(this.iconSetConfigurationTypesSignal().workObjects);
    this.configurationHasChanged = true;
  }
  resetIconSet() {
    const currentIconSet = this.createMinimalIconSet();
    this.selectedWorkObjectsSignal().forEach(workObjectName => {
      if (!currentIconSet.workObjects.has(workObjectName)) {
        this.deselectWorkObject(workObjectName);
      }
    });
    this.selectedActorsSignal().forEach(actorName => {
      if (!currentIconSet.actors.has(actorName)) {
        this.deselectActor(actorName);
      }
    });
    this.iconSetConfigurationTypesSignal.set({
      name: currentIconSet.name,
      actors: currentIconSet.actors.keysArray(),
      workObjects: currentIconSet.workObjects.keysArray()
    });
    this.updateAllIconBehaviorSubjects();
  }
  /* creates an icon set that contains the default icons
     AND all other icons that are actually used on the canvas. */
  createMinimalIconSet() {
    const usedIconSet = this.createIconSetFromCanvas();
    const defaultIconSet = this.iconDictionaryService.getDefaultIconSet();
    defaultIconSet.actors.keysArray().forEach(iconName => {
      usedIconSet.actors.set(iconName, this.iconDictionaryService.getIconSource(iconName));
    });
    defaultIconSet.workObjects.keysArray().forEach(iconName => {
      usedIconSet.workObjects.set(iconName, this.iconDictionaryService.getIconSource(iconName));
    });
    return usedIconSet;
  }
  /* finds out which icons are actually used on the canvas */
  createIconSetFromCanvas() {
    const config = {
      name: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_ICON_SET_NAME,
      actors: new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__.Dictionary(),
      workObjects: new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__.Dictionary()
    };
    const allCanvasObjects = this.elementRegistryService.getAllCanvasObjects();
    allCanvasObjects.map(e => e.businessObject).forEach(element => {
      const type = element.type.replace(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR, '').replace(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT, '');
      if (element.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.actors.set(type, src);
      } else if (element.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT)) {
        let src = this.iconDictionaryService.getIconSource(type) || '';
        config.workObjects.set(type, src);
      }
    });
    return config;
  }
  cancel() {
    this.iconSetConfigurationTypesSignal.set(this.getCurrentConfigurationNamesWithoutPrefix());
    this.updateAllIconBehaviorSubjects();
    this.resetToInitialConfiguration();
  }
  getCurrentConfigurationNamesWithoutPrefix() {
    return {
      name: this.iconSetImportExportService.getIconSetName() || _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_ICON_SET_NAME,
      actors: this.iconDictionaryService.getIconsAssignedAs(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR).keysArray().map(a => a.replace(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR, '')),
      workObjects: this.iconDictionaryService.getIconsAssignedAs(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT).keysArray().map(w => w.replace(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT, ''))
    };
  }
  resetToInitialConfiguration() {
    this.updateActorSignal();
    this.updateWorkObjectSignal();
  }
  saveIconSet(usedIcons, imported = false) {
    let changedActors = [];
    let changedWorkObjects = [];
    if (this.configurationHasChanged) {
      const changedObjects = this.handleChangedConfiguration(usedIcons, imported);
      changedActors = changedObjects.changedActors;
      changedWorkObjects = changedObjects.changedWorkObjects;
    } else {
      this.iconSetNotificationService.openNoImportOrNoSaveSnackbar(imported);
    }
    if (changedActors.length || changedWorkObjects.length) {
      this.iconSetNotificationService.openAlreadyUsedIconsSnackbar(changedActors, changedWorkObjects);
    }
    this.iconSetImportExportService.notifyIconSetSaved();
  }
  handleChangedConfiguration(usedIcons, imported) {
    const changedIconSet = this.createIconSetConfiguration();
    const changedActors = this.determineChangedIcons(usedIcons?.actors, changedIconSet.actors.keysArray());
    const changedWorkObjects = this.determineChangedIcons(usedIcons?.workObjects, changedIconSet.workObjects.keysArray());
    if (!changedActors.length && !changedWorkObjects.length) {
      this.changedIconSetConfiguration = changedIconSet;
      this.overrideSelectedIcons(changedIconSet);
      this.iconSetImportExportService.setStoredIconSetConfiguration(this.changedIconSetConfiguration);
      this.iconSetNotificationService.openConfigurationImportOrSavedSnackbar(imported);
    }
    return {
      changedActors,
      changedWorkObjects
    };
  }
  determineChangedIcons(usedIcons, changedIconSet) {
    const changedIcons = new Set();
    usedIcons?.forEach(icon => {
      if (!changedIconSet.includes(icon)) {
        changedIcons.add(icon);
      }
    });
    return Array.from(changedIcons);
  }
  getAndClearSavedConfiguration() {
    const temp = this.changedIconSetConfiguration;
    this.changedIconSetConfiguration = undefined;
    return temp;
  }
  createIconSetConfiguration() {
    const actors = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__.Dictionary();
    const workObjects = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_5__.Dictionary();
    this.iconSetConfigurationTypesSignal().actors.forEach(name => {
      actors.set(name, this.iconDictionaryService.getIconSource(name));
    });
    this.iconSetConfigurationTypesSignal().workObjects.forEach(name => {
      workObjects.set(name, this.iconDictionaryService.getIconSource(name));
    });
    return {
      name: this.iconSetConfigurationTypesSignal().name || '',
      actors,
      workObjects
    };
  }
  addNewCustomIcon(iconName) {
    this.iconDictionaryService.addCustomIcon(this.getDataUrlForIcon(iconName), iconName);
    this.addIconToAllIconList(iconName);
  }
  addIconToAllIconList(iconName) {
    this.allIconListItems.set(iconName, new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({
      name: iconName,
      svg: this.getDataUrlForIcon(iconName),
      isActor: this.isIconActor(iconName),
      isWorkObject: this.isIconWorkObject(iconName)
    }));
  }
  updateIconSelectionState(isActor, isWorkObject, iconName) {
    const iconBehaviourSubject = this.getIconForName(iconName);
    const icon = iconBehaviourSubject.value;
    icon.isActor = isActor;
    icon.isWorkObject = isWorkObject;
    iconBehaviourSubject.next(icon);
  }
  updateAllIconBehaviorSubjects() {
    const customIconSetConfiguration = this.iconSetConfigurationTypesSignal();
    this.allIconListItems.keysArray().forEach(iconName => {
      if (customIconSetConfiguration.actors.includes(iconName)) {
        this.updateIconSelectionState(true, false, iconName);
      } else if (customIconSetConfiguration.workObjects.includes(iconName)) {
        this.updateIconSelectionState(false, true, iconName);
      } else {
        this.updateIconSelectionState(false, false, iconName);
      }
    });
  }
  getDataUrlForIcon(iconName) {
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
  overrideSelectedIcons(changedIconSet) {
    this.allIconListItems.keysArray().forEach(item => this.setAsUnassigned(item));
    changedIconSet.actors.keysArray().forEach(actor => {
      this.iconDictionaryService.registerIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR, actor, this.iconDictionaryService.getFullDictionary().get(actor));
      this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT, actor);
      this.setAsActor(actor);
    });
    changedIconSet.workObjects.keysArray().forEach(workObject => {
      this.iconDictionaryService.registerIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.WORKOBJECT, workObject, this.iconDictionaryService.getFullDictionary().get(workObject));
      this.iconDictionaryService.unregisterIconForType(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_6__.ElementTypes.ACTOR, workObject);
      this.setAsWorkObject(workObject);
    });
  }
  static {
    this.ɵfac = function IconSetCustomizationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconSetCustomizationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: IconSetCustomizationService,
      factory: IconSetCustomizationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 93103
/*!**********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-set-import-export.service.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetImportExportService: () => (/* binding */ IconSetImportExportService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/dictionary */ 20843);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utils/downloadFile */ 25312);
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/internal/Subject */ 63150);









class IconSetImportExportService {
  constructor() {
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_1__.IconDictionaryService);
    this.storageService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_5__.StorageService);
    this.iconSetNameSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_ICON_SET_NAME, ...(ngDevMode ? [{
      debugName: "iconSetNameSignal"
    }] : /* istanbul ignore next */[]));
    this.iconSetChangedEmitterSubject = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this.iconSetChanged$ = this.iconSetChangedEmitterSubject.asObservable();
    this.iconSetName = this.iconSetNameSignal.asReadonly();
  }
  setIconSetName(name) {
    this.iconSetNameSignal.set(name);
  }
  getIconSetName() {
    return this.iconSetNameSignal();
  }
  exportConfiguration() {
    const iconSetConfiguration = this.getCurrentConfigurationForExport();
    if (!iconSetConfiguration) {
      return;
    }
    const configJSONString = JSON.stringify(iconSetConfiguration, null, 2);
    const filename = this.iconSetNameSignal();
    (0,src_app_utils_downloadFile__WEBPACK_IMPORTED_MODULE_6__.downloadFile)(configJSONString, 'data:text/plain;charset=utf-8,', filename, '.iconset');
  }
  loadIconSet(iconSet, updateIconSetName = true) {
    this.iconDictionaryService.updateIconRegistries(iconSet);
    if (updateIconSetName) {
      this.setIconSetName(iconSet.name);
    }
  }
  getCurrentConfiguration() {
    const actors = this.iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.ACTOR);
    const workObjects = this.iconDictionaryService.getIconsAssignedAs(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.WORKOBJECT);
    let iconSetConfiguration;
    if (actors.length > 0 && workObjects.length > 0) {
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
  createConfigFromDictionaries(actorsDict, workObjectsDict) {
    const actorNames = actorsDict.keysArray();
    const workObjectNames = workObjectsDict.keysArray();
    const newActors = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary();
    const newWorkObjects = new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary();
    // Fill Configuration from Canvas-Objects
    actorNames.forEach(actor => {
      newActors.set(actor.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.ACTOR, ''), actorsDict.get(actor));
    });
    workObjectNames.forEach(workObject => {
      newWorkObjects.set(workObject.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.WORKOBJECT, ''), workObjectsDict.get(workObject));
    });
    return {
      name: this.iconSetNameSignal(),
      actors: newActors,
      workObjects: newWorkObjects
    };
  }
  createIconSetConfiguration(fileConfiguration) {
    if (fileConfiguration === undefined) {
      return {
        name: '',
        actors: new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary(),
        workObjects: new src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary()
      };
    }
    return {
      name: fileConfiguration.name,
      actors: src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary.fromRecord(fileConfiguration.actors),
      workObjects: src_app_domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_2__.Dictionary.fromRecord(fileConfiguration.workObjects)
    };
  }
  getStoredIconSetConfiguration() {
    const iconSetString = this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.ICON_SET_CONFIGURATION_KEY);
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
    const configForStorage = {
      name: config.name,
      actors: config.actors.toRecord(),
      workObjects: config.workObjects.toRecord()
    };
    this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.ICON_SET_CONFIGURATION_KEY, JSON.stringify(configForStorage, null, 2));
  }
  checkValidityOfConfiguration(iconSetConfiguration) {
    return iconSetConfiguration.actors.keysArray().length > 1 && iconSetConfiguration.workObjects.keysArray().length > 1 && !iconSetConfiguration.actors.all().some(e => typeof e.value !== 'string') && !iconSetConfiguration.workObjects.all().some(e => typeof e.value !== 'string');
  }
  notifyIconSetSaved() {
    this.iconSetChangedEmitterSubject.next();
  }
  static {
    this.ɵfac = function IconSetImportExportService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconSetImportExportService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: IconSetImportExportService,
      factory: IconSetImportExportService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 31832
/*!*********************************************************************************!*\
  !*** ./src/app/tools/icon-set-config/services/icon-set-notification.service.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconSetNotificationService: () => (/* binding */ IconSetNotificationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);




class IconSetNotificationService {
  constructor() {
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar);
  }
  openConfigurationImportOrSavedSnackbar(imported) {
    this.snackbar.open(imported ? 'Configuration imported successfully' : 'Configuration saved successfully', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_SUCCESS
    });
  }
  openAlreadyUsedIconsSnackbar(changedActors, changedWorkObjects) {
    if (changedActors.length && !changedWorkObjects.length) {
      const actors = changedActors.join(', ');
      this.snackbar.open(`The following icons are already in use as actors and cannot be changed: ${actors}`, undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_ERROR
      });
    } else if (changedWorkObjects.length && !changedActors.length) {
      const workObjects = changedWorkObjects.join(', ');
      this.snackbar.open(`The following icons are already in use as work objects and cannot be changed: ${workObjects}`, undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_ERROR
      });
    } else {
      const workObjects = changedWorkObjects.join(', ');
      const actors = changedActors.join(', ');
      this.snackbar.open(`The following icons are already in use as actors and cannot be changed: ${actors} & ` + `the following icons are already in use as work objects and cannot be changed: ${workObjects}`, undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_ERROR
      });
    }
  }
  openNoImportOrNoSaveSnackbar(imported) {
    this.snackbar.open(imported ? 'No configuration to be imported' : 'No configuration to be saved', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_DURATION,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_1__.SNACKBAR_INFO
    });
  }
  static {
    this.ɵfac = function IconSetNotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconSetNotificationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: IconSetNotificationService,
      factory: IconSetNotificationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 42482
/*!**************************************************************!*\
  !*** ./src/app/tools/import/directive/dragDrop.directive.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragDirective: () => (/* binding */ DragDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/import-domain-story.service */ 93586);
/* harmony import */ var src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/constants */ 40550);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11525);






class DragDirective {
  constructor() {
    this.background = '';
    this.importDomainStoryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_1__.ImportDomainStoryService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_4__.DirtyFlagService);
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
      if (this.dirtyFlagService.dirty()) {
        this.importDomainStoryService.openUnsavedChangesReminderDialog(() => this.importDomainStoryService.performDropImport(evt.dataTransfer.files[0]));
      } else {
        this.importDomainStoryService.performDropImport(evt.dataTransfer.files[0]);
      }
    } else {
      this.snackbar.open('Nothing to import', undefined, {
        duration: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_DURATION_LONG,
        panelClass: src_app_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.SNACKBAR_ERROR
      });
    }
  }
  static {
    this.ɵfac = function DragDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DragDirective)();
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineDirective"]({
      type: DragDirective,
      selectors: [["", "appDrag", ""]],
      hostVars: 2,
      hostBindings: function DragDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("dragover", function DragDirective_dragover_HostBindingHandler($event) {
            return ctx.onDragOver($event);
          })("dragleave", function DragDirective_dragleave_HostBindingHandler($event) {
            return ctx.onDragLeave($event);
          })("drop", function DragDirective_drop_HostBindingHandler($event) {
            return ctx.onDrop($event);
          });
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background", ctx.background);
        }
      }
    });
  }
}

/***/ },

/***/ 47457
/*!**************************************************!*\
  !*** ./src/app/tools/import/import.providers.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideImportDomainStory: () => (/* binding */ provideImportDomainStory)
/* harmony export */ });
/* harmony import */ var _services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/import-domain-story.service */ 93586);
/* harmony import */ var _icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icon-set-config/services/icon-set-customization.service */ 46252);


function provideImportDomainStory() {
  return [{
    provide: _icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_1__.IconSetChangedService,
    useExisting: _services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_0__.ImportDomainStoryService
  }];
}

/***/ },

/***/ 93125
/*!****************************************************************************************************************************!*\
  !*** ./src/app/tools/import/presentation/external-resources-warning-dialog/external-resources-warning-dialog.component.ts ***!
  \****************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExternalResourcesWarningDialogComponent: () => (/* binding */ ExternalResourcesWarningDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11525);




class ExternalResourcesWarningDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
    this.fn = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA);
  }
  close() {
    this.dialogRef.close();
  }
  doImport() {
    this.fn();
    this.close();
  }
  static {
    this.ɵfac = function ExternalResourcesWarningDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ExternalResourcesWarningDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: ExternalResourcesWarningDialogComponent,
      selectors: [["app-external-resources-warning-dialog"]],
      decls: 15,
      vars: 0,
      consts: [["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"]],
      template: function ExternalResourcesWarningDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-dialog-content")(1, "label")(2, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Attention");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "You are about to load a domain story from an external source.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Do you want to continue?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-dialog-actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div")(11, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ExternalResourcesWarningDialogComponent_Template_button_click_11_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ExternalResourcesWarningDialogComponent_Template_button_click_13_listener() {
            return ctx.doImport();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, " Import ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
      },
      dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 88401
/*!************************************************************************************!*\
  !*** ./src/app/tools/import/presentation/import-dialog/import-dialog.component.ts ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDialogComponent: () => (/* binding */ ImportDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 21662);










class ImportDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
    this.fn = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA);
    this.fileUrl = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)('', ...(ngDevMode ? [{
      debugName: "fileUrl"
    }] : /* istanbul ignore next */[]));
  }
  doImport() {
    this.fn(this.fileUrl());
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  updateUrl($event) {
    const target = $event.target;
    this.fileUrl.set(target.value);
  }
  static {
    this.ɵfac = function ImportDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ImportDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: ImportDialogComponent,
      selectors: [["app-import-dialog"]],
      decls: 15,
      vars: 2,
      consts: [["for", "urlInput"], ["color", "accent", 1, "form-width"], ["matInput", "", "type", "url", "id", "urlInput", "subscriptSizing", "dynamic", 1, "dense-8", 3, "input", "value"], ["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click", "disabled"]],
      template: function ImportDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-dialog-content")(1, "label", 0)(2, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Import Domain Story");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "mat-form-field", 1)(5, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "URL");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function ImportDialogComponent_Template_input_input_7_listener($event) {
            return ctx.updateUrl($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "mat-dialog-actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div")(11, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ImportDialogComponent_Template_button_click_11_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ImportDialogComponent_Template_button_click_13_listener() {
            return ctx.doImport();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, " Import ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.fileUrl());
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.fileUrl());
        }
      },
      dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_3__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_3__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton],
      styles: [".form-width[_ngcontent-%COMP%] {\n  width: 40rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvaW1wb3J0L3ByZXNlbnRhdGlvbi9pbXBvcnQtZGlhbG9nL2ltcG9ydC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS13aWR0aCB7XG4gIHdpZHRoOiA0MHJlbTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 93586
/*!**********************************************************************!*\
  !*** ./src/app/tools/import/services/import-domain-story.service.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDomainStoryService: () => (/* binding */ ImportDomainStoryService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var src_app_tools_import_services_import_repair_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/import/services/import-repair.service */ 56511);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modeler/services/modeler.service */ 40439);
/* harmony import */ var _presentation_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../presentation/import-dialog/import-dialog.component */ 88401);
/* harmony import */ var _utils_isPresent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../utils/isPresent */ 32951);
/* harmony import */ var _unsavedChangesReminder_presentation_unsavedChangesReminder_dialog_unsaved_changes_reminder_unsaved_changes_reminder_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../unsavedChangesReminder/presentation/unsavedChangesReminder-dialog/unsaved-changes-reminder/unsaved-changes-reminder.component */ 92642);
/* harmony import */ var src_app_tools_import_presentation_external_resources_warning_dialog_external_resources_warning_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/tools/import/presentation/external-resources-warning-dialog/external-resources-warning-dialog.component */ 93125);
/* harmony import */ var src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/utils/sanitizer */ 43515);
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/internal/Subject */ 63150);

















class ImportDomainStoryService {
  constructor() {
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_1__.IconDictionaryService);
    this.importRepairService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_import_services_import_repair_service__WEBPACK_IMPORTED_MODULE_3__.ImportRepairService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_2__.PropertiesService);
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService);
    this.iconSetImportExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__.IconSetImportExportService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_9__.ModelerService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__.MatSnackBar);
    this.importedConfigurationEmitter = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_15__.Subject();
    this.automatedImportSuccessFullEmitterSubject = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_15__.Subject();
  }
  automatedImportSuccessFull$() {
    return this.automatedImportSuccessFullEmitterSubject.asObservable();
  }
  iconConfigurationChanged() {
    return this.importedConfigurationEmitter.asObservable();
  }
  performImport() {
    const inputElement = document.getElementById('import');
    if (inputElement && inputElement instanceof HTMLInputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.import(file, file.name);
    } else {
      this.snackbar.open('No file selected or invalid input element.', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
      });
    }
  }
  performDropImport(file) {
    if (this.isSupportedFileEnding(file.name)) {
      this.import(file, file.name);
    } else {
      this.snackbar.open('File type not supported', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
      });
    }
  }
  importNotDirtyFromUrl(fileUrl, isDirty) {
    if (isDirty) {
      this.openUnsavedChangesReminderDialog(() => this.importFromUrl(fileUrl));
    } else {
      this.importFromUrl(fileUrl);
    }
  }
  importFromUrl(fileUrl, emitSuccess = false) {
    if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
      this.snackbar.open('Url not valid', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
      });
      return;
    }
    fileUrl = this.convertToDownloadableUrl(fileUrl);
    fetch(fileUrl).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.blob();
    }).then(blob => {
      const string = fileUrl.split('/');
      const filename = string[string.length - 1].replace(/%20/g, ' ').replace(/(\.egn\.svg|\.dst\.svg).*/, '$1');
      if (!filename) {
        throw new Error('Unable to extract filename from URL');
      }
      if (this.isSupportedFileEnding(filename)) {
        this.import(blob, filename, emitSuccess);
      } else {
        this.snackbar.open('File type not supported', undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONG,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
        });
      }
    }).catch(() => {
      this.snackbar.open('Request blocked by server (CORS error) or Network error', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
      });
    });
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
    const supportedSvgPattern = /.*\.(dst|egn)(\s*\(\d+\))?\.svg$/;
    return !!filename && (filename.endsWith('.dst') || filename.endsWith('.egn') || supportedSvgPattern.test(filename));
  }
  openImportFromUrlDialog(isDirty) {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = fileUrl => this.importNotDirtyFromUrl(fileUrl, isDirty);
    this.dialogService.openDialog(_presentation_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_10__.ImportDialogComponent, config);
  }
  openUnsavedChangesReminderDialog(fn) {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = fn;
    this.dialogService.openDialog(_unsavedChangesReminder_presentation_unsavedChangesReminder_dialog_unsaved_changes_reminder_unsaved_changes_reminder_component__WEBPACK_IMPORTED_MODULE_12__.UnsavedChangesReminderComponent, config);
  }
  openExternalResourcesWarningDialog(fn) {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.data = fn;
    this.dialogService.openDialog(src_app_tools_import_presentation_external_resources_warning_dialog_external_resources_warning_dialog_component__WEBPACK_IMPORTED_MODULE_13__.ExternalResourcesWarningDialogComponent, config);
  }
  import(input, filename, emitSuccess = false) {
    // return value is currently only used for tests
    const egnSvgPattern = /.*(.egn)(\s*\(\d+\)){0,1}\.svg/;
    const isSVG = filename.endsWith('.svg');
    const isEGN = isSVG ? filename.match(egnSvgPattern) != null : filename.endsWith('.egn');
    try {
      const fileReader = new FileReader();
      let domainStory = null;
      fileReader.onloadend = e => {
        if (e?.target) {
          try {
            this.processDomainStoryImport(e.target.result, filename, isSVG, isEGN, emitSuccess);
          } catch (error) {
            this.importFailed();
          }
        } else {
          this.importFailed();
        }
      };
      fileReader.readAsText(input);
      return domainStory;
    } catch (error) {
      this.importFailed();
      return null;
    }
  }
  processDomainStoryImport(text, filename, isSVG, isEGN, emitSuccess) {
    if (typeof text !== 'string') {
      throw new Error('Failed to parse domain story from file');
    }
    const contentAsJson = isSVG ? this.extractJsonFromSvgComment(text) : text;
    const sanitizedFileName = this.restoreTitleFromFileName(filename, isSVG);
    const {
      iconSet,
      domainStory
    } = this.separateExportFileIntoIconSetAndStoryElements(isEGN, contentAsJson, sanitizedFileName);
    this.handleLegacyVersion(domainStory);
    if (!this.importRepairService.checkForUnreferencedElementsInActivitiesAndRepair(domainStory.businessObjects)) {
      this.showBrokenImportDialog();
    }
    this.updateIconRegistries(iconSet);
    this.modelerService.importStory(domainStory.businessObjects, iconSet);
    this.importSuccessful(emitSuccess);
    this.modelerService.commandStackChanged();
    // no need to put this on the commandStack
    this.propertiesService.updateTitleAndDescriptionAndScope(domainStory.title, domainStory.description, domainStory.scope, false);
    return domainStory;
  }
  handleLegacyVersion(domainStory) {
    const versionPrefix = +domainStory.version.substring(0, domainStory.version.lastIndexOf('.'));
    if (versionPrefix <= 0.5) {
      domainStory.businessObjects = this.importRepairService.updateCustomElementsPreviousV050(domainStory.businessObjects);
      this.showPreviousV050Dialog(versionPrefix);
    }
  }
  separateExportFileIntoIconSetAndStoryElements(isEgnFormat, contentAsJson, filename) {
    let storyAndIconSet = null;
    try {
      storyAndIconSet = JSON.parse(contentAsJson);
    } catch (e) {
      this.showBrokenImportDialog();
    }
    if (storyAndIconSet == null) {
      throw new Error('Invalid import file');
    }
    const domainStory = this.exportToDomainStory(storyAndIconSet, filename);
    const iconSet = this.extractIconSet(storyAndIconSet, isEgnFormat);
    this.importRepairService.removeWhitespacesFromIcons(domainStory.businessObjects);
    this.importRepairService.removeUnnecessaryBpmnProperties(domainStory.businessObjects);
    return {
      iconSet,
      domainStory
    };
  }
  extractIconSet(storyAndIconSet, isEgnFormat) {
    const iconSetContent = storyAndIconSet.iconSet ? storyAndIconSet.iconSet : storyAndIconSet.domain;
    return iconSetContent ? this.extractStoryAndConfigurationFromCurrentFileFormat(isEgnFormat, iconSetContent) : this.extractStoryAndConfigurationFromLegacyFileFormat(storyAndIconSet);
  }
  extractStoryAndConfigurationFromCurrentFileFormat(isEgnFormat, storyAndIconSet) {
    const iconSetFromFile = isEgnFormat ? storyAndIconSet : JSON.parse(storyAndIconSet);
    return this.iconSetImportExportService.createIconSetConfiguration(iconSetFromFile);
  }
  extractStoryAndConfigurationFromLegacyFileFormat(storyAndIconSet) {
    // legacy implementation
    let iconSet;
    if (storyAndIconSet.config) {
      const iconSetFromFile = JSON.parse(storyAndIconSet.config);
      iconSet = this.iconSetImportExportService.createIconSetConfiguration(iconSetFromFile);
    } else {
      // even older legacy implementation (prior to configurable icon set):
      iconSet = this.iconDictionaryService.getDefaultIconSet();
    }
    return iconSet;
  }
  importSuccessful(emitSuccessExternally) {
    this.snackbar.open('Import successful', undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_SUCCESS
    });
    if (emitSuccessExternally) {
      this.automatedImportSuccessFullEmitterSubject.next();
    }
  }
  importFailed(message) {
    const errorMessage = (0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(message) ? 'Import failed due to: ' + message : 'Import failed';
    this.snackbar.open(errorMessage, undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONGER,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
    });
  }
  extractJsonFromSvgComment(xmlText) {
    const unsanitizedXml = (0,src_app_utils_sanitizer__WEBPACK_IMPORTED_MODULE_14__.unsanitizeTextFromSvgExport)(xmlText);
    let domainStory = unsanitizedXml.substring(0, unsanitizedXml.indexOf('</DST>')).substring(unsanitizedXml.indexOf('<DST>'));
    domainStory = domainStory.replace('<DST>', '');
    domainStory = domainStory.replace('</DST>', '');
    // legacy implementation where the SVG was embedded as a comment in the svg.
    // Generally preferred method, however external Tools sometimes strip SVG Comments removing the DomainStory.
    while (domainStory.includes('<!--') || domainStory.includes('-->')) {
      domainStory = domainStory.replace('<!--', '').replace('-->', '');
    }
    return domainStory;
  }
  updateIconRegistries(iconSet) {
    this.iconDictionaryService.updateIconRegistries(iconSet);
    this.importedConfigurationEmitter.next(iconSet);
  }
  showPreviousV050Dialog(version) {
    const message = `Your domain story was created with Egon version ${version}. The file format has since changed.
    Your Domain Story was converted to the new format. Please check if it is complete.`;
    this.snackbar.open(message, undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONGER,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_INFO
    });
  }
  showBrokenImportDialog() {
    const message = `Error during import: The imported domain story is not complete. Please check if there are elements missing from the canvas.`;
    this.snackbar.open(message, undefined, {
      duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_DURATION_LONGER,
      panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_6__.SNACKBAR_ERROR
    });
  }
  restoreTitleFromFileName(filename, isSVG) {
    let title;
    const domainStoryRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(\.dst|\.egn)/;
    const svgRegex = /_\d+-\d+-\d+( ?_?-?\(\d+\))?(-?\d)?(\.dst|\.egn)\.svg/;
    const egnSuffix = '.egn';
    const dstSuffix = '.dst';
    const svgSuffix = '.svg';
    let filenameWithoutDateSuffix = filename.replace(isSVG ? svgRegex : domainStoryRegex, '');
    filenameWithoutDateSuffix = filenameWithoutDateSuffix.replace(svgSuffix, '').replace(dstSuffix, '').replace(egnSuffix, '');
    title = filenameWithoutDateSuffix;
    return title;
  }
  autoImportFromUrl(urlToLoad, startReplay) {
    this.openExternalResourcesWarningDialog(() => this.importFromUrl(urlToLoad, startReplay));
  }
  exportToDomainStory(parsedJson, filename) {
    const domainStory = {
      businessObjects: [],
      version: '?',
      description: '',
      title: filename
    };
    if (!(0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(parsedJson.dst) && !(0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(parsedJson.domainStory)) {
      return this.handleLegacyFormat(parsedJson, filename);
    }
    let domainStoryContent = parsedJson.domainStory ? parsedJson.domainStory : parsedJson.dst;
    if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(domainStoryContent.businessObjects)) {
      domainStory.businessObjects = domainStoryContent.businessObjects;
      if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(domainStoryContent.version)) {
        domainStory.version = domainStoryContent.version;
      }
      if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(domainStoryContent.description)) {
        domainStory.description = domainStoryContent.description;
      }
      if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(domainStoryContent.title)) {
        domainStory.title = domainStoryContent.title;
      }
      if ((0,_utils_isPresent__WEBPACK_IMPORTED_MODULE_11__.isPresent)(domainStoryContent.scope)) {
        domainStory.scope = domainStoryContent.scope;
      }
      return domainStory;
    } else if (!Array.isArray(domainStoryContent)) {
      // for older versions where the dst.dst is a string
      domainStoryContent = JSON.parse(domainStoryContent);
    }
    if (Array.isArray(domainStoryContent)) {
      domainStoryContent.forEach(it => {
        const hasOwnProperty = it.hasOwnProperty('type');
        if (it.type !== undefined || hasOwnProperty) {
          const businessObject = Object.assign({}, it);
          domainStory.businessObjects.push(businessObject);
        }
        if (it.info !== undefined || it.hasOwnProperty('info')) {
          domainStory.description = it.info;
        }
        if (it.version !== undefined || it.hasOwnProperty('version')) {
          domainStory.version = it.version;
        }
      });
    }
    return domainStory;
  }
  handleLegacyFormat(oldFormat, filename) {
    const domainStory = {
      businessObjects: [],
      version: '?',
      description: '',
      title: filename
    };
    oldFormat.forEach(entry => {
      if (entry.type) {
        domainStory.businessObjects.push(entry);
      } else if (entry.version) {
        domainStory.version = entry.version;
      } else if (entry.info) {
        domainStory.description = entry.info;
      }
    });
    return domainStory;
  }
  static {
    this.ɵfac = function ImportDomainStoryService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ImportDomainStoryService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ImportDomainStoryService,
      factory: ImportDomainStoryService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 56511
/*!****************************************************************!*\
  !*** ./src/app/tools/import/services/import-repair.service.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportRepairService: () => (/* binding */ ImportRepairService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);


/**
 * Repairs broken Domain Stories so that it can be rendered onto the canvas
 * by removing activities and connections that reference elements that don't exist
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
  // Early versions of Egon allowed Whitespaces in Icon names which are now not supported anymore.
  // To find the right icon in the dictionary, they need to be replaced.
  removeWhitespacesFromIcons(elements) {
    elements.forEach(bo => {
      if (bo.type) {
        bo.type = bo.type.replace(/ /g, '-');
      }
    });
  }
  removeUnnecessaryBpmnProperties(elements) {
    elements.forEach(bo => {
      // @ts-ignore
      if (bo.$type) {
        // @ts-ignore
        bo.$type = undefined;
      }
      // @ts-ignore
      if (bo.$descriptor) {
        // @ts-ignore
        bo.$descriptor = undefined;
      }
      // @ts-ignore
      if (bo.di) {
        // @ts-ignore
        bo.di = undefined;
      }
    });
  }
  static {
    this.ɵfac = function ImportRepairService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ImportRepairService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ImportRepairService,
      factory: ImportRepairService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 68701
/*!******************************************************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/presentation/label-dictionary-dialog/label-dictionary-dialog.component.ts ***!
  \******************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryDialogComponent: () => (/* binding */ LabelDictionaryDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../label-dictionary/label-dictionary.component */ 36921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11525);





class LabelDictionaryDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
  }
  close() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function LabelDictionaryDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LabelDictionaryDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: LabelDictionaryDialogComponent,
      selectors: [["app-label-dictionary-dialog"]],
      decls: 4,
      vars: 0,
      consts: [[1, "sticky-top"], [3, "closeEmitter"]],
      template: function LabelDictionaryDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Label Dictionary");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "app-label-dictionary", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("closeEmitter", function LabelDictionaryDialogComponent_Template_app_label_dictionary_closeEmitter_3_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
      },
      dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _label_dictionary_label_dictionary_component__WEBPACK_IMPORTED_MODULE_2__.LabelDictionaryComponent],
      styles: [".sticky-top[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background-color: white;\n  z-index: 1;\n  box-shadow: -20px -20px white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbGFiZWwtZGljdGlvbmFyeS9wcmVzZW50YXRpb24vbGFiZWwtZGljdGlvbmFyeS1kaWFsb2cvbGFiZWwtZGljdGlvbmFyeS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLE1BQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnN0aWNreS10b3Age1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB6LWluZGV4OiAxO1xuICBib3gtc2hhZG93OiAtMjBweCAtMjBweCB3aGl0ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 36921
/*!****************************************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/presentation/label-dictionary/label-dictionary.component.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryComponent: () => (/* binding */ LabelDictionaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/label-dictionary.service */ 69731);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 68708);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 21662);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/text-field */ 79401);














function LabelDictionaryComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 5)(2, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function LabelDictionaryComponent_For_6_Template_input_change_2_listener($event) {
      const workObjectEntry_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateWorkObjectEntry($event, workObjectEntry_r2));
    })("keydown.enter", function LabelDictionaryComponent_For_6_Template_input_keydown_enter_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.preventDefault($event));
    })("keyup.enter", function LabelDictionaryComponent_For_6_Template_input_keyup_enter_2_listener($event) {
      const workObjectEntry_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.saveDirectFromWorkObject($event, workObjectEntry_r2));
    })("keyup.escape", function LabelDictionaryComponent_For_6_Template_input_keyup_escape_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const workObjectEntry_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", workObjectEntry_r2.name);
  }
}
function LabelDictionaryComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-item")(1, "mat-form-field", 5)(2, "textarea", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function LabelDictionaryComponent_For_12_Template_textarea_change_2_listener($event) {
      const activityEntry_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.updateActivityEntry($event, activityEntry_r5));
    })("keydown.enter", function LabelDictionaryComponent_For_12_Template_textarea_keydown_enter_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.preventDefault($event));
    })("keyup.enter", function LabelDictionaryComponent_For_12_Template_textarea_keyup_enter_2_listener($event) {
      const activityEntry_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.saveDirectFromActivity($event, activityEntry_r5));
    })("keyup.escape", function LabelDictionaryComponent_For_12_Template_textarea_keyup_escape_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const activityEntry_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", activityEntry_r5.name);
  }
}
class LabelDictionaryComponent {
  constructor() {
    this.labelDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_2__.LabelDictionaryService);
    this.workObjectEntriesSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(this.labelDictionaryService.getWorkObjectLabels(), ...(ngDevMode ? [{
      debugName: "workObjectEntriesSignal"
    }] : /* istanbul ignore next */[]));
    this.activityEntriesSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(this.labelDictionaryService.getActivityLabels(), ...(ngDevMode ? [{
      debugName: "activityEntriesSignal"
    }] : /* istanbul ignore next */[]));
    this.closeEmitter = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.labelDictionaryService.createLabelDictionaries();
  }
  save() {
    const workObjectEntries = this.workObjectEntriesSignal();
    const activityEntries = this.activityEntriesSignal();
    const activityNames = [];
    const originalActivityNames = [];
    const workObjectNames = [];
    const originalWorkObjectNames = [];
    activityEntries.filter(a => a.name !== a.originalName).forEach(activity => {
      activityNames.push(activity.name);
      originalActivityNames.push(activity.originalName);
    });
    workObjectEntries.filter(w => w.name !== w.originalName).forEach(workObject => {
      workObjectNames.push(workObject.name);
      originalWorkObjectNames.push(workObject.originalName);
    });
    this.labelDictionaryService.massRenameLabels(activityNames, originalActivityNames, workObjectNames, originalWorkObjectNames);
    this.closeEmitter.emit();
  }
  cancel() {
    const workObjectEntries = this.workObjectEntriesSignal();
    const activityEntries = this.activityEntriesSignal();
    workObjectEntries.forEach(w => {
      w.name = w.originalName;
    });
    activityEntries.forEach(a => {
      a.name = a.originalName;
    });
    this.workObjectEntriesSignal.set(workObjectEntries);
    this.activityEntriesSignal.set(activityEntries);
  }
  // The keydown in the input / textarea field is handled before the (change) event, thus we need to trigger the update manually
  saveDirectFromActivity($event, activityEntry) {
    this.updateActivityEntry($event, activityEntry);
    this.save();
  }
  // The keydown in the input / textarea field is handled before the (change) event, thus we need to trigger the update manually
  saveDirectFromWorkObject($event, workObjectEntry) {
    this.updateWorkObjectEntry($event, workObjectEntry);
    this.save();
  }
  updateActivityEntry($event, activityEntry) {
    const target = $event.target;
    let entries = this.activityEntriesSignal();
    entries.filter(e => e.originalName === activityEntry.originalName)[0].name = target.value;
    this.activityEntriesSignal.set(entries);
  }
  updateWorkObjectEntry($event, workObjectEntry) {
    const target = $event.target;
    let entries = this.workObjectEntriesSignal();
    entries.filter(e => e.originalName === workObjectEntry.originalName)[0].name = target.value;
    this.workObjectEntriesSignal.set(entries);
  }
  preventDefault(event) {
    event.preventDefault();
  }
  close() {
    this.closeEmitter.emit();
  }
  static {
    this.ɵfac = function LabelDictionaryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LabelDictionaryComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: LabelDictionaryComponent,
      selectors: [["app-label-dictionary"]],
      outputs: {
        closeEmitter: "closeEmitter"
      },
      decls: 18,
      vars: 0,
      consts: [[1, "list-content"], [1, "listTitle"], [1, "sticky-bottom"], ["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"], ["color", "accent", 1, "inputText", "dense-8"], ["matInput", "", 1, "inputText", 3, "change", "keydown.enter", "keyup.enter", "keyup.escape", "value"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "1", "cdkAutosizeMaxRows", "3", 1, "inputText", "activity", 3, "change", "keydown.enter", "keyup.enter", "keyup.escape", "value"]],
      template: function LabelDictionaryComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h3", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Work Objects");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "mat-list");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterCreate"](5, LabelDictionaryComponent_For_6_Template, 3, 1, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div")(8, "h3", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Activities");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "mat-list");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterCreate"](11, LabelDictionaryComponent_For_12_Template, 3, 1, "mat-list-item", null, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-dialog-actions", 2)(14, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_14_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LabelDictionaryComponent_Template_button_click_16_listener() {
            return ctx.save();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, " Save ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeater"](ctx.workObjectEntriesSignal());
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrepeater"](ctx.activityEntriesSignal());
        }
      },
      dependencies: [_angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItem, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__.CdkTextareaAutosize, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton],
      styles: [".list-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto;\n  top: 0;\n  bottom: 0;\n  grid-column-gap: 4px;\n  width: 50vw;\n}\n.list-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] {\n  height: unset !important;\n  padding-left: 0;\n}\n.list-content[_ngcontent-%COMP%]   mat-list-item-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n\nh3[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.inputText[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.listTitle[_ngcontent-%COMP%] {\n  justify-self: left;\n}\n\n.activity[_ngcontent-%COMP%] {\n  max-height: 3rem;\n}\n\n.sticky-bottom[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  background-color: white;\n  padding: 10px;\n  z-index: 1;\n  box-shadow: 0 20px white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbGFiZWwtZGljdGlvbmFyeS9wcmVzZW50YXRpb24vbGFiZWwtZGljdGlvbmFyeS9sYWJlbC1kaWN0aW9uYXJ5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUFDRjtBQUNFO0VBQ0Usd0JBQUE7RUFDQSxlQUFBO0FBQ0o7QUFFRTtFQUNFLHFCQUFBO0FBQUo7O0FBSUE7RUFDRSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxnQkFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0Esd0JBQUE7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LWNvbnRlbnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGdyaWQtY29sdW1uLWdhcDogNHB4O1xuICB3aWR0aDogNTB2dztcblxuICBtYXQtbGlzdC1pdGVtIHtcbiAgICBoZWlnaHQ6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5cbiAgbWF0LWxpc3QtaXRlbS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuaDMge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlucHV0VGV4dCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubGlzdFRpdGxlIHtcbiAganVzdGlmeS1zZWxmOiBsZWZ0O1xufVxuXG4uYWN0aXZpdHkge1xuICBtYXgtaGVpZ2h0OiAzcmVtO1xufVxuXG4uc3RpY2t5LWJvdHRvbSB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHotaW5kZXg6IDE7XG4gIGJveC1zaGFkb3c6IDAgMjBweCB3aGl0ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 69731
/*!*****************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/services/label-dictionary.service.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelDictionaryService: () => (/* binding */ LabelDictionaryService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_label_dictionary_services_mass_naming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/label-dictionary/services/mass-naming.service */ 75961);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _presentation_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../presentation/label-dictionary-dialog/label-dictionary-dialog.component */ 68701);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);











class LabelDictionaryService {
  constructor() {
    this.activityLabels = [];
    this.workObjektLabels = [];
    this.massNamingService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_label_dictionary_services_mass_naming_service__WEBPACK_IMPORTED_MODULE_3__.MassNamingService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService);
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_4__.IconDictionaryService);
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_8__.DialogService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar);
  }
  openLabelDictionary() {
    const isActivityWithLabel = element => element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY) && element.businessObject.name;
    const isWorkObjectWithLabel = element => element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT) && element.businessObject.name;
    const hasAtLeastOneLabel = this.elementRegistryService.getAllCanvasObjects().some(element => isActivityWithLabel(element) || isWorkObjectWithLabel(element));
    if (hasAtLeastOneLabel) {
      const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogConfig();
      config.disableClose = false;
      config.autoFocus = true;
      this.dialogService.openDialog(_presentation_label_dictionary_dialog_label_dictionary_dialog_component__WEBPACK_IMPORTED_MODULE_6__.LabelDictionaryDialogComponent, config);
    } else {
      this.snackbar.open('There are currently no activities or work objects with labels on the canvas', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_7__.SNACKBAR_INFO
      });
    }
  }
  createLabelDictionaries() {
    this.activityLabels = [];
    this.workObjektLabels = [];
    const allObjects = this.elementRegistryService.getAllCanvasObjects();
    allObjects.forEach(element => {
      const name = element.businessObject.name;
      if (name && name.length > 0 && element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY) && !this.activityLabels.map(a => a.name).includes(name)) {
        this.activityLabels.push({
          name,
          originalName: name
        });
      } else if (name && name.length > 0 && element.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT) && !this.workObjektLabels.map(e => e.name).includes(name)) {
        const iconName = element.type.replace(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT, '');
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
    const workObjects = this.elementRegistryService.getAllWorkObjects();
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
        this.massNamingService.massChangeNames(originalActivityNames[i], activityNames[i], src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY);
      }
    }
    for (let i = 0; i < originalWorkObjectNames.length; i++) {
      if (!workObjectNames[i]) {
        workObjectNames[i] = '';
      }
      if (!(workObjectNames[i] == originalWorkObjectNames[i])) {
        this.massNamingService.massChangeNames(originalWorkObjectNames[i], workObjectNames[i], src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.WORKOBJECT);
      }
    }
  }
  static {
    this.ɵfac = function LabelDictionaryService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LabelDictionaryService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: LabelDictionaryService,
      factory: LabelDictionaryService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 75961
/*!************************************************************************!*\
  !*** ./src/app/tools/label-dictionary/services/mass-naming.service.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MassNamingService: () => (/* binding */ MassNamingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);




class MassNamingService {
  constructor() {
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService);
    this.commandStackService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_2__.CommandStackService);
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
  static {
    this.ɵfac = function MassNamingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MassNamingService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: MassNamingService,
      factory: MassNamingService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 81748
/*!********************************************!*\
  !*** ./src/app/tools/modeler.providers.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideModeler: () => (/* binding */ provideModeler)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/services/element-registry.service */ 85511);
/* harmony import */ var _label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./label-dictionary/services/label-dictionary.service */ 69731);
/* harmony import */ var _modeler_diagram_js_features_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modeler/diagram-js/features/context-pad/domainStoryContextPadProvider */ 18144);
/* harmony import */ var _modeler_diagram_js_features_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modeler/diagram-js/features/palette/domainStoryPalette */ 18990);
/* harmony import */ var _modeler_diagram_js_features_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modeler/diagram-js/features/domainStoryRenderer */ 84234);
/* harmony import */ var _modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modeler/diagram-js/features/labeling/dsLabelEditingProvider */ 12921);
/* harmony import */ var _modeler_diagram_js_features_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modeler/diagram-js/features/change-icon/replaceOptions */ 40867);
/* harmony import */ var _modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modeler/diagram-js/features/numbering/numbering */ 19955);
/* harmony import */ var _modeler_diagram_js_features_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modeler/diagram-js/features/updateHandler/activityUpdateHandlers */ 87251);












function provideModeler() {
  return (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.provideAppInitializer)(() => {
    const dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_2__.DirtyFlagService);
    const iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_3__.IconDictionaryService);
    const elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_4__.ElementRegistryService);
    const labelDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_5__.LabelDictionaryService);
    (0,_modeler_diagram_js_features_context_pad_domainStoryContextPadProvider__WEBPACK_IMPORTED_MODULE_6__.initializeContextPadProvider)(dirtyFlagService, iconDictionaryService);
    (0,_modeler_diagram_js_features_palette_domainStoryPalette__WEBPACK_IMPORTED_MODULE_7__.initializePalette)(iconDictionaryService);
    (0,_modeler_diagram_js_features_domainStoryRenderer__WEBPACK_IMPORTED_MODULE_8__.initializeRenderer)(iconDictionaryService, elementRegistryService, dirtyFlagService);
    (0,_modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_9__.initializeLabelEditingProvider)(labelDictionaryService);
    (0,_modeler_diagram_js_features_change_icon_replaceOptions__WEBPACK_IMPORTED_MODULE_10__.initializeReplaceOptions)(iconDictionaryService);
    (0,_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_11__.initializeNumbering)(elementRegistryService);
    (0,_modeler_diagram_js_features_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_12__.initializeActivityUpdateHandler)(elementRegistryService);
  });
}

/***/ },

/***/ 40955
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/domain/activity-dialog-form.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 13547
/*!************************************************************!*\
  !*** ./src/app/tools/modeler/domain/activityDialogData.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ 89142
/*!*****************************************************************************************!*\
  !*** ./src/app/tools/modeler/presentation/activity-dialog/activity-dialog.component.ts ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityDialogComponent: () => (/* binding */ ActivityDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var _domain_activity_dialog_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../domain/activity-dialog-form */ 40955);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ 62827);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 48065);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 21662);















class ActivityDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
    this.data = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA);
    this.activity = this.data.activity;
    this.activityLabel = this.data.activity.businessObject.name;
    this.numberIsAllowedMultipleTimes = this.data.numberIsAllowedMultipleTimes;
    this.activityNumber = this.data.activity.businessObject.number ?? null;
    this.showNumberFields = this.data.showNumberFields;
    this.saveFN = this.data.saveFN;
    this.form = _domain_activity_dialog_form__WEBPACK_IMPORTED_MODULE_3__.ActivityDialogForm.create(this.activityLabel, this.activityNumber, this.numberIsAllowedMultipleTimes);
    this.form.controls.activityNumber.valueChanges.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.takeUntilDestroyed)()).subscribe(activityNumber => {
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
    let activityNumber;
    if (this.form.value.activityNumber !== null) {
      activityNumber = this.form.value.activityNumber;
    }
    this.saveFN({
      activity: this.activity,
      activityNumber,
      activityLabel: this.form.value.activityLabel,
      multipleNumbers: this.form.value.multipleNumbers
    });
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  preventDefault(event) {
    event.preventDefault();
  }
  static {
    this.ɵfac = function ActivityDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ActivityDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: ActivityDialogComponent,
      selectors: [["app-activity-dialog"]],
      decls: 20,
      vars: 2,
      consts: [[3, "formGroup"], [3, "hidden"], ["color", "accent"], ["matInput", "", "type", "number", "formControlName", "activityNumber"], ["formControlName", "multipleNumbers", 3, "change"], ["color", "accent", 1, "fullWidth"], ["matInput", "", "type", "text", "formControlName", "activityLabel", "autofocus", "", "cdkFocusInitial", "", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"]],
      template: function ActivityDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-dialog-content")(1, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Edit Activity");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "form", 0)(4, "div", 1)(5, "mat-form-field", 2)(6, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7, "Number");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "mat-checkbox", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function ActivityDialogComponent_Template_mat_checkbox_change_9_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10, " multiple ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "mat-form-field", 5)(12, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13, "Label");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "textarea", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("keydown.enter", function ActivityDialogComponent_Template_textarea_keydown_enter_14_listener($event) {
            return ctx.preventDefault($event);
          })("keyup.enter", function ActivityDialogComponent_Template_textarea_keyup_enter_14_listener() {
            return ctx.save();
          })("keyup.escape", function ActivityDialogComponent_Template_textarea_keyup_escape_14_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "mat-dialog-actions")(16, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ActivityDialogComponent_Template_button_click_16_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](17, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ActivityDialogComponent_Template_button_click_18_listener() {
            return ctx.save();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, " Save ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("formGroup", ctx.form);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("hidden", !ctx.showNumberFields);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckbox],
      styles: [".fullWidth[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvbW9kZWxlci9wcmVzZW50YXRpb24vYWN0aXZpdHktZGlhbG9nL2FjdGl2aXR5LWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5mdWxsV2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 84338
/*!**************************************************************************!*\
  !*** ./src/app/tools/modeler/services/activity-click-handler.service.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivityClickHandlerService: () => (/* binding */ ActivityClickHandlerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/labeling/dsLabelEditingProvider */ 12921);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_modeler_domain_activityDialogData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/modeler/domain/activityDialogData */ 13547);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/numbering/numbering */ 19955);
/* harmony import */ var src_app_tools_modeler_presentation_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/modeler/presentation/activity-dialog/activity-dialog.component */ 89142);
/* harmony import */ var src_app_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/domain/services/dialog.service */ 12855);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/utils/mathExtensions */ 67858);
/* harmony import */ var src_app_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/domain/services/command-stack.service */ 96445);
/* harmony import */ var src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/tools/replay/services/dom-manipulation.service */ 95802);













class ActivityClickHandlerService {
  constructor() {
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_7__.DialogService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_8__.ElementRegistryService);
    this.commandStackService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_10__.CommandStackService);
    this.domManipulationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_11__.DomManipulationService);
  }
  setModelerContext(eventBus) {
    this.eventBus = eventBus;
  }
  /** Overrides for Canvas Functions **/
  activityDoubleClick(activity) {
    const source = activity.source;
    // ensure the right number when changing the direction of an activity
    (0,src_app_tools_modeler_diagram_js_features_labeling_dsLabelEditingProvider__WEBPACK_IMPORTED_MODULE_1__.toggleStashUse)(false);
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    if (activity.businessObject.number && source && source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.ACTOR)) {
      config.data = new src_app_tools_modeler_domain_activityDialogData__WEBPACK_IMPORTED_MODULE_4__.ActivityDialogData(activity, (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.isNumberMultiple)(activity.businessObject.number), true, data => this.saveActivityInputLabel(data));
    } else if (source && source.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_3__.ElementTypes.WORKOBJECT)) {
      config.data = new src_app_tools_modeler_domain_activityDialogData__WEBPACK_IMPORTED_MODULE_4__.ActivityDialogData(activity, false, false, activityData => this.saveActivityInputLabel(activityData));
    }
    this.dialogService.openDialog(src_app_tools_modeler_presentation_activity_dialog_activity_dialog_component__WEBPACK_IMPORTED_MODULE_6__.ActivityDialogComponent, config);
  }
  saveActivityInputLabel(activityData) {
    const label = activityData.activityLabel;
    const hasNumber = activityData.activityNumber ?? false;
    const activityNumber = activityData.activityNumber;
    const multipleNumberAllowed = activityData.multipleNumbers ?? false;
    const element = activityData.activity;
    const activitiesFromActors = this.elementRegistryService.getActivitiesFromActors();
    const index = activitiesFromActors.indexOf(element);
    activitiesFromActors.splice(index, 1);
    if (hasNumber) {
      (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.setNumberIsMultiple)(activityNumber, multipleNumberAllowed);
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
    this.commandStackService.execute('activity.changed', options);
    if (element.businessObject.multipleNumberAllowed !== false) {
      if (!(0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.isNumberMultiple)(activityNumber)) {
        (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, this.eventBus);
      }
    } else if (element.businessObject.multipleNumberAllowed === false) {
      (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_5__.updateExistingNumbersAtEditing)(activitiesFromActors, activityNumber, this.eventBus);
    }
  }
  activityNumberDoubleClick(event) {
    const renderedNumberRegistry = this.domManipulationService.getRenderedNumbers();
    const allActivities = this.elementRegistryService.getActivitiesFromActors();
    if (renderedNumberRegistry.length > 0 && allActivities.length > 0) {
      const geometry = this.getGeometricValuesFromViewport();
      let activity;
      for (let i = 0; i < renderedNumberRegistry.length; i++) {
        const currentNum = renderedNumberRegistry[i];
        const elementId = currentNum.parentElement.parentElement.dataset.elementId;
        const elementMetadata = this.getCurrentNumberPositionAndValue(currentNum, geometry.zoomX, geometry.transformX, geometry.zoomY, geometry.transformY);
        const searchedActivity = allActivities.find(activity => activity.businessObject.number === elementMetadata.tNumber && elementId === activity.id && (0,src_app_utils_mathExtensions__WEBPACK_IMPORTED_MODULE_9__.positionsMatch)(geometry.width, geometry.height, elementMetadata.elementX, elementMetadata.elementY, event.originalEvent.offsetX, event.originalEvent.offsetY));
        if (searchedActivity) {
          activity = searchedActivity;
        }
      }
      if (activity) {
        this.activityDoubleClick(activity);
      }
    }
  }
  getCurrentNumberPositionAndValue(currentNum, zoomX, transformX, zoomY, transformY) {
    const tspan = currentNum.getElementsByTagName('tspan')[0];
    const tx = Number(tspan.getAttribute('x'));
    const ty = Number(tspan.getAttribute('y'));
    const tNumber = parseInt(tspan.innerHTML, undefined);
    const elementX = Math.floor(tx * zoomX + (transformX - 11 * zoomX));
    const elementY = Math.floor(ty * zoomY + (transformY - 15 * zoomY));
    return {
      tNumber,
      elementX,
      elementY
    };
  }
  getGeometricValuesFromViewport() {
    const htmlCanvas = document.getElementById('canvas');
    if (!htmlCanvas) throw new Error();
    const viewport = this.getViewport(htmlCanvas);
    const transform = viewport.getAttribute('transform');
    let transformX = 0;
    let transformY = 0;
    let zoomX = 1;
    let zoomY = 1;
    // adjust for zoom and panning
    if (transform) {
      const nums = transform.replace('matrix(', '').replace(')', '').split(',');
      zoomX = parseFloat(nums[0]);
      zoomY = parseFloat(nums[3]);
      transformX = parseInt(nums[4], undefined);
      transformY = parseInt(nums[5], undefined);
    }
    const width = 25 * zoomX;
    const height = 22 * zoomY;
    return {
      transformX,
      transformY,
      zoomX,
      zoomY,
      width,
      height
    };
  }
  getViewport(htmlCanvas) {
    const container = htmlCanvas.getElementsByClassName('djs-container');
    const svgElements = container[0].getElementsByTagName('svg');
    const outerSVGElement = svgElements[0];
    return outerSVGElement.getElementsByClassName('viewport')[0];
  }
  static {
    this.ɵfac = function ActivityClickHandlerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ActivityClickHandlerService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ActivityClickHandlerService,
      factory: ActivityClickHandlerService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 70976
/*!**************************************************************!*\
  !*** ./src/app/tools/modeler/services/copy-paste.service.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CopyPasteService: () => (/* binding */ CopyPasteService)
/* harmony export */ });
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/diagramJSConstants */ 273);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 38424);



class CopyPasteService {
  constructor() {
    this.pasteColor = [];
    this.pasteText = [];
    this.pasteHeight = [];
  }
  setModelerContext(eventBus) {
    this.eventBus = eventBus;
  }
  pasteElement(event) {
    this.pasteColor.push(event.descriptor.oldBusinessObject.pickedColor);
    if (event.descriptor.oldBusinessObject.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
      this.pasteText.push(event.descriptor.oldBusinessObject.text ?? '');
      this.pasteHeight.push(event.descriptor.oldBusinessObject.height);
    }
  }
  createEnd(event) {
    if (!this.pasteColor) {
      return;
    }
    for (let elementsKey in event.elements) {
      const element = event.elements[elementsKey];
      if (element.businessObject.type.includes(src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_0__.ElementTypes.TEXTANNOTATION)) {
        element.businessObject.text = this.pasteText[0];
        element.businessObject.number = this.pasteHeight[0];
        element.businessObject.height = this.pasteHeight[0];
        this.pasteText.shift();
        this.pasteHeight.shift();
      }
      element.businessObject.pickedColor = this.pasteColor[parseInt(elementsKey)];
      this.eventBus.fire(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_1__.EVENT_ELEMENT_CHANGED, {
        element
      });
    }
    this.pasteColor = [];
    this.pasteText = [];
    this.pasteHeight = [];
  }
  static {
    this.ɵfac = function CopyPasteService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CopyPasteService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: CopyPasteService,
      factory: CopyPasteService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 52317
/*!***************************************************************!*\
  !*** ./src/app/tools/modeler/services/initializer.service.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InitializerService: () => (/* binding */ InitializerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/updateHandler/activityUpdateHandlers */ 87251);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/updateHandler/massRenameHandler */ 37102);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/updateHandler/elementUpdateHandler */ 55629);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/updateHandler/headlineAndDescriptionUpdateHandler */ 3476);
/* harmony import */ var _replay_services_replay_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../replay/services/replay.service */ 3687);
/* harmony import */ var src_app_tools_modeler_services_activity_click_handler_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/tools/modeler/services/activity-click-handler.service */ 84338);
/* harmony import */ var src_app_tools_modeler_services_copy_paste_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/tools/modeler/services/copy-paste.service */ 70976);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/diagramJSConstants */ 273);














class InitializerService {
  constructor() {
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService);
    this.replayService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_9__.ReplayService);
    this.commandStackService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_4__.CommandStackService);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__.PropertiesService);
    this.activityClickHandlerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_modeler_services_activity_click_handler_service__WEBPACK_IMPORTED_MODULE_10__.ActivityClickHandlerService);
    this.copyPasteService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_modeler_services_copy_paste_service__WEBPACK_IMPORTED_MODULE_11__.CopyPasteService);
  }
  propagateDomainStoryModelerClassesToServices(commandStack, elementRegistry, contextPad, palette, selection, eventBus) {
    this.commandStackService.setCommandStack(commandStack);
    this.elementRegistryService.setElementRegistry(elementRegistry);
    this.replayService.setModelerContext(contextPad, palette, selection);
    this.activityClickHandlerService.setModelerContext(eventBus);
    this.copyPasteService.setModelerContext(eventBus);
  }
  initializeDomainStoryModelerEventHandlers(commandStack, eventBus) {
    (0,src_app_tools_modeler_diagram_js_features_updateHandler_activityUpdateHandlers__WEBPACK_IMPORTED_MODULE_5__["default"])(commandStack, eventBus);
    (0,src_app_tools_modeler_diagram_js_features_updateHandler_massRenameHandler__WEBPACK_IMPORTED_MODULE_6__["default"])(commandStack, eventBus);
    (0,src_app_tools_modeler_diagram_js_features_updateHandler_elementUpdateHandler__WEBPACK_IMPORTED_MODULE_7__["default"])(commandStack, eventBus);
    (0,src_app_tools_modeler_diagram_js_features_updateHandler_headlineAndDescriptionUpdateHandler__WEBPACK_IMPORTED_MODULE_8__["default"])(commandStack, this.propertiesService);
  }
  initiateEventBusListeners(eventBus) {
    eventBus.on(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_ELEMENT_DBLCLICK, event => {
      if (!this.replayService.replayOn()) {
        const element = event.element;
        if (element.type === _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY) {
          // override the doubleClickListener on activities
          this.activityClickHandlerService.activityDoubleClick(element);
        } else {
          this.activityClickHandlerService.activityNumberDoubleClick(event);
        }
      }
    });
    // while replaying, we only allow editing labels but no other changes (to avoid accidentally modeling on top of hidden model elements)
    eventBus.on([src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_SHAPE_MOVE_START, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_BENDPOINT_MOVE_START, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_CONNECTION_SEGMENT_MOVE_START, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_ELEMENT_CLICK, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_ELEMENT_HOVER, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_INTERACTION_EVENTS_CREATE_HIT, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_SPACE_TOOL_SELECTION_START, src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_LASSO_SELECTION_START
    // TODO:  enable editing of connection labels #217
    ], 10000000000, event => {
      if (this.replayService.replayOn()) {
        event.stopPropagation();
        event.preventDefault();
      }
    });
    eventBus.on(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_COPY_PASE_PASTE_ELEMENT, 10000, event => {
      this.copyPasteService.pasteElement(event);
    });
    eventBus.on(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_12__.EVENT_CREATE_END, event => {
      this.copyPasteService.createEnd(event);
    });
  }
  static {
    this.ɵfac = function InitializerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || InitializerService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: InitializerService,
      factory: InitializerService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 40439
/*!***********************************************************!*\
  !*** ./src/app/tools/modeler/services/modeler.service.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelerService: () => (/* binding */ ModelerService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_egon_io_egon_io_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 56207);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! min-dash */ 81410);
/* harmony import */ var src_app_tools_modeler_diagram_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js */ 46970);
/* harmony import */ var _initializer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./initializer.service */ 52317);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);
/* harmony import */ var _icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../icon-set-config/services/icon-dictionary.service */ 6932);
/* harmony import */ var _icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../icon-set-config/services/icon-set-import-export.service */ 93103);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/numbering/numbering */ 19955);
/* harmony import */ var _domain_services_storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../domain/services/storage.service */ 50624);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/diagramJSConstants */ 273);
















class ModelerService {
  constructor() {
    this.initializerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_initializer_service__WEBPACK_IMPORTED_MODULE_4__.InitializerService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_5__.ElementRegistryService);
    this.iconDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_icon_set_config_services_icon_dictionary_service__WEBPACK_IMPORTED_MODULE_6__.IconDictionaryService);
    this.iconSetImportExportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_icon_set_config_services_icon_set_import_export_service__WEBPACK_IMPORTED_MODULE_7__.IconSetImportExportService);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_13__.DirtyFlagService);
    this.storageService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_domain_services_storage_service__WEBPACK_IMPORTED_MODULE_9__.StorageService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__.MatSnackBar);
  }
  postInit() {
    this.checkCurrentVersion();
    const lastUsedIconSet = this.iconSetImportExportService.getStoredIconSetConfiguration();
    if (lastUsedIconSet) {
      this.iconSetImportExportService.loadIconSet(lastUsedIconSet);
    }
    this.modeler = new src_app_tools_modeler_diagram_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      container: '#canvas',
      keyboard: {
        bind: true
      },
      canvas: {
        autoFocus: true // see https://github.com/bpmn-io/diagram-js/pull/956 (setting autoFocus to 'true' might cause problems with future integrations)
      }
    });
    if (this.modeler.get) {
      this.elementRegistry = this.modeler.get('elementRegistry');
      this.eventBus = this.modeler.get('eventBus');
      this.commandStack = this.modeler.get('commandStack');
      this.contextPad = this.modeler.get('contextPad');
      this.palette = this.modeler.get('palette');
      this.selection = this.modeler.get('selection');
    }
    this.initializerService.initializeDomainStoryModelerEventHandlers(this.commandStack, this.eventBus);
    this.initializerService.propagateDomainStoryModelerClassesToServices(this.commandStack, this.elementRegistry, this.contextPad, this.palette, this.selection, this.eventBus);
    const exportArtifacts = this.debounce(this.saveSVG, 500);
    if (this.modeler.get) {
      this.modeler.on('commandStack.changed', exportArtifacts);
    }
    this.initializerService.initiateEventBusListeners(this.eventBus);
    // expose modeler to window for debugging purposes
    (0,min_dash__WEBPACK_IMPORTED_MODULE_2__.assign)(window, {
      egon: this.modeler
    });
    this.startDebounce();
  }
  checkCurrentVersion() {
    const version = this.storageService.get(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.VERSION_KEY);
    if (version === null) {
      this.storageService.set(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.VERSION_KEY, _environments_environment__WEBPACK_IMPORTED_MODULE_11__.environment.version);
    }
    if (version !== null && version !== _environments_environment__WEBPACK_IMPORTED_MODULE_11__.environment.version) {
      this.snackbar.open("Egon was updated. Clear your browser's local storage.", 'More information', {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.SNACKBAR_DURATION_LONGER,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_10__.SNACKBAR_INFO
      }).onAction().subscribe(() => {
        window.open('https://egon.io/howto#launching-egon');
      });
    }
  }
  restart(iconSetConfiguration, domainStory) {
    const currentStory = domainStory != undefined ? domainStory : this.elementRegistryService.createObjectListForDSTDownload().map(e => e.businessObject);
    if (!iconSetConfiguration) {
      iconSetConfiguration = this.iconSetImportExportService.getStoredIconSetConfiguration();
    }
    if (iconSetConfiguration) {
      this.iconSetImportExportService.setStoredIconSetConfiguration(iconSetConfiguration);
      this.iconDictionaryService.setIconSet(iconSetConfiguration);
      this.iconSetImportExportService.loadIconSet(iconSetConfiguration);
    }
    this.elementRegistryService.clear();
    this.modeler?.destroy();
    this.postInit();
    (0,src_app_tools_modeler_diagram_js_features_numbering_numbering__WEBPACK_IMPORTED_MODULE_8__.updateMultipleNumberRegistry)(currentStory.filter(bo => bo.type === 'domainStory:activity').map(bo => bo).filter(bo => bo.number !== null));
    if (currentStory && this.modeler.get) {
      this.renderStory(currentStory);
    }
  }
  fitStoryToScreen() {
    this.modeler.fitStoryToScreen();
  }
  getModeler() {
    return this.modeler;
  }
  commandStackChanged() {
    // to update the title of the svg, we need to tell the command stack, that a value has changed
    this.eventBus.fire(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_14__.EVENT_COMMANDSTACK_CHANGED, this.debounce(this.saveSVG, 500));
  }
  startDebounce() {
    this.debounce(this.saveSVG, 500);
  }
  debounce(fn, timeout) {
    return () => {
      let timer = setTimeout(() => {
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
  reset() {
    this.renderStory([]);
    this.dirtyFlagService.makeClean();
  }
  importStory(domainStory, config, fitToScreen = true) {
    this.restart(config, domainStory);
    if (fitToScreen) {
      this.fitStoryToScreen();
    }
    this.commandStackChanged();
    this.startDebounce();
    this.dirtyFlagService.makeClean();
  }
  getStory() {
    return this.elementRegistryService.createObjectListForDSTDownload().map(c => c.businessObject);
  }
  renderStory(domainStory) {
    this.modeler.importBusinessObjects(domainStory);
  }
  static {
    this.ɵfac = function ModelerService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ModelerService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ModelerService,
      factory: ModelerService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 41954
/*!*******************************************************************!*\
  !*** ./src/app/tools/properties/domain/properties-dialog-form.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertiesDialogForm: () => (/* binding */ PropertiesDialogForm)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 48015);

var PropertiesDialogForm;
(function (PropertiesDialogForm) {
  function create(title, description, granularity, pointInTime, domainPurity) {
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormGroup({
      title: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(title),
      description: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(description),
      granularity: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(granularity),
      pointInTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(pointInTime),
      domainPurity: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(domainPurity)
    });
  }
  PropertiesDialogForm.create = create;
})(PropertiesDialogForm || (PropertiesDialogForm = {}));

/***/ },

/***/ 88529
/*!************************************************************************************************!*\
  !*** ./src/app/tools/properties/presentation/properties-dialog/properties-dialog.component.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertiesDialogComponent: () => (/* binding */ PropertiesDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 48015);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var src_app_tools_properties_domain_properties_dialog_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/properties/domain/properties-dialog-form */ 41954);
/* harmony import */ var src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 48913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 29836);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var src_app_domain_entities_scope__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/domain/entities/scope */ 41795);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button-toggle */ 68529);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 11525);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 21662);

















class PropertiesDialogComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef);
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_3__.PropertiesService);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__.DirtyFlagService);
    this.PointInTime = src_app_domain_entities_scope__WEBPACK_IMPORTED_MODULE_9__.PointInTime;
    this.DomainPurity = src_app_domain_entities_scope__WEBPACK_IMPORTED_MODULE_9__.DomainPurity;
  }
  ngOnInit() {
    const title = this.propertiesService.getTitle();
    const description = this.propertiesService.getDescription();
    const scope = this.propertiesService.getScope();
    this.form = src_app_tools_properties_domain_properties_dialog_form__WEBPACK_IMPORTED_MODULE_4__.PropertiesDialogForm.create(title, description, scope?.granularity ? scope.granularity : '', scope?.pointInTime ? scope.pointInTime : null, scope?.domainPurity ? scope.domainPurity : null);
  }
  save() {
    if (this.form.dirty) {
      this.dirtyFlagService.makeDirty();
      const granularity = this.form.getRawValue().granularity;
      const pointInTime = this.form.getRawValue().pointInTime;
      const domainPurity = this.form.getRawValue().domainPurity;
      const scope = {
        granularity: granularity ? granularity : '',
        pointInTime: pointInTime ? pointInTime : undefined,
        domainPurity: domainPurity ? domainPurity : undefined
      };
      this.propertiesService.updateTitleAndDescriptionAndScope(this.form.getRawValue().title, this.form.getRawValue().description, scope, true);
    }
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  preventDefault(event) {
    event.preventDefault();
  }
  pointInTime() {
    return this.form.getRawValue().pointInTime;
  }
  domainPurity() {
    return this.form.getRawValue().domainPurity;
  }
  static {
    this.ɵfac = function PropertiesDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PropertiesDialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
      type: PropertiesDialogComponent,
      selectors: [["app-properties-dialog"]],
      decls: 45,
      vars: 19,
      consts: [[3, "formGroup"], ["color", "accent", 1, "dialogWidth"], ["matInput", "", "type", "text", "formControlName", "title"], ["maxlength", "2000", "matInput", "", "formControlName", "description", 1, "descriptionInput", 3, "keydown.enter", "keyup.enter", "keyup.escape"], ["matInput", "", "type", "text", "formControlName", "granularity"], [1, "scopeValues"], [1, "scopeValueButtonToggle"], [1, "subHeader"], ["formControlName", "pointInTime"], [3, "value"], ["formControlName", "domainPurity"], ["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"]],
      template: function PropertiesDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-dialog-content")(1, "form", 0)(2, "mat-form-field", 1)(3, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "Title");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "mat-form-field", 1)(8, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "Description");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "textarea", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("keydown.enter", function PropertiesDialogComponent_Template_textarea_keydown_enter_10_listener($event) {
            return ctx.preventDefault($event);
          })("keyup.enter", function PropertiesDialogComponent_Template_textarea_keyup_enter_10_listener() {
            return ctx.save();
          })("keyup.escape", function PropertiesDialogComponent_Template_textarea_keyup_escape_10_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "Scope");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "mat-form-field", 1)(16, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](17, "Granularity");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "div", 5)(20, "div", 6)(21, "mat-label", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](22, "Point In Time");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "mat-button-toggle-group", 8)(24, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25, "Not Specified");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](27, "As Is");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](29, "To Be");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "div", 6)(31, "mat-label", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](32, "Domain Purity");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](33, "mat-button-toggle-group", 10)(34, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](35, "Not Specified");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](36, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](37, "Pure");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "mat-button-toggle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](39, "Digitalized");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](40, "mat-dialog-actions")(41, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PropertiesDialogComponent_Template_button_click_41_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](42, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](43, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PropertiesDialogComponent_Template_button_click_43_listener() {
            return ctx.save();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](44, " Save ");
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx.form);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.pointInTime() === null);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", null);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.pointInTime() === ctx.PointInTime.AS_IS);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ctx.PointInTime.AS_IS);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.pointInTime() === ctx.PointInTime.TO_BE);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ctx.PointInTime.TO_BE);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.domainPurity() === null);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", null);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.domainPurity() === ctx.DomainPurity.PURE);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ctx.DomainPurity.PURE);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("isSelected", ctx.domainPurity() === ctx.DomainPurity.DIGITALIZED);
          _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ctx.DomainPurity.DIGITALIZED);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__.MatButtonToggle],
      styles: [".dialogWidth[_ngcontent-%COMP%] {\n  width: 50vw;\n}\n.dialogWidth[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  font-size: 12pt;\n}\n\n.descriptionInput[_ngcontent-%COMP%] {\n  min-height: 75px;\n}\n\n.scopeValues[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.scopeValueButtonToggle[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  gap: 0.2rem;\n}\n\n.subHeader[_ngcontent-%COMP%] {\n  font-size: small;\n}\n\n .isSelected button {\n  background-color: #a4d7e1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9vbHMvcHJvcGVydGllcy9wcmVzZW50YXRpb24vcHJvcGVydGllcy1kaWFsb2cvcHJvcGVydGllcy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7QUFFSjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmRpYWxvZ1dpZHRoIHtcbiAgd2lkdGg6IDUwdnc7XG4gIG1hdC1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxMnB0O1xuICB9XG59XG5cbi5kZXNjcmlwdGlvbklucHV0IHtcbiAgbWluLWhlaWdodDogNzVweDtcbn1cblxuLnNjb3BlVmFsdWVzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBnYXA6IDFyZW07XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnNjb3BlVmFsdWVCdXR0b25Ub2dnbGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMC4ycmVtO1xufVxuXG4uc3ViSGVhZGVyIHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbn1cblxuOjpuZy1kZWVwLmlzU2VsZWN0ZWQgYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E0ZDdlMTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 36787
/*!*****************************************************************!*\
  !*** ./src/app/tools/properties/services/properties.service.ts ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertiesService: () => (/* binding */ PropertiesService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/environment */ 45312);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);
/* harmony import */ var _domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/services/command-stack.service */ 96445);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var src_app_tools_properties_presentation_properties_dialog_properties_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/tools/properties/presentation/properties-dialog/properties-dialog.component */ 88529);








class PropertiesService {
  constructor() {
    this.commandStackService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_command_stack_service__WEBPACK_IMPORTED_MODULE_3__.CommandStackService);
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService);
    this.titleSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE, ...(ngDevMode ? [{
      debugName: "titleSignal"
    }] : /* istanbul ignore next */[]));
    this.scopeSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(undefined, ...(ngDevMode ? [{
      debugName: "scopeSignal"
    }] : /* istanbul ignore next */[]));
    this.descriptionSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_DESCRIPTION, ...(ngDevMode ? [{
      debugName: "descriptionSignal"
    }] : /* istanbul ignore next */[]));
    this.showDescriptionSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "showDescriptionSignal"
    }] : /* istanbul ignore next */[]));
    this.title = this.titleSignal.asReadonly();
    this.description = this.descriptionSignal.asReadonly();
    this.showDescription = this.showDescriptionSignal.asReadonly();
  }
  openHeaderDialog() {
    const config = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    this.dialogService.openDialog(src_app_tools_properties_presentation_properties_dialog_properties_dialog_component__WEBPACK_IMPORTED_MODULE_6__.PropertiesDialogComponent, config);
  }
  updateTitleAndDescriptionAndScope(title, description, scope, allowUndo) {
    if (allowUndo) {
      this.fireTitleAndDescriptionAndScopeUpdate(title, description, scope);
    } else {
      this.updateTitle(title);
      this.updateDescription(description);
      this.updateScope(scope);
    }
  }
  reset() {
    this.updateTitleAndDescriptionAndScope(_domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE, _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_DESCRIPTION, undefined, false);
  }
  updateTitle(inputTitle) {
    const title = !inputTitle || inputTitle.trim().length === 0 ? _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE : inputTitle;
    this.titleSignal.set(title);
    document.title = title === _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE ? 'egon.io' : title;
  }
  updateScope(scope) {
    this.scopeSignal.set(scope);
  }
  updateDescription(description) {
    this.descriptionSignal.set(description ?? this.descriptionSignal());
  }
  setShowDescription(show) {
    this.showDescriptionSignal.set(show);
  }
  getTitle() {
    return this.titleSignal();
  }
  getScope() {
    return this.scopeSignal();
  }
  getDescription() {
    return this.descriptionSignal();
  }
  getVersion() {
    return _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.version;
  }
  hasTitleOrDescription() {
    return this.getTitle().trim().length > 0 && this.getTitle() !== _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_TITLE || this.getDescription().trim().length > 0 && this.getDescription() !== _domain_entities_constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_DESCRIPTION;
  }
  fireTitleAndDescriptionAndScopeUpdate(newTitle, newDescription, newScope) {
    const context = {
      newTitle,
      newDescription,
      newScope
    };
    this.commandStackService.execute('story.updateHeadlineAndDescriptionAndScope', context);
  }
  static {
    this.ɵfac = function PropertiesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PropertiesService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: PropertiesService,
      factory: PropertiesService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 97961
/*!********************************************************!*\
  !*** ./src/app/tools/replay/domain/replayConstants.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONNECTION_PATH_DOM_SELECTOR: () => (/* binding */ CONNECTION_PATH_DOM_SELECTOR),
/* harmony export */   DISPLAY_BLOCK: () => (/* binding */ DISPLAY_BLOCK),
/* harmony export */   DISPLAY_NONE: () => (/* binding */ DISPLAY_NONE),
/* harmony export */   HIGHLIGHT_LABEL_FONT_WEIGHT: () => (/* binding */ HIGHLIGHT_LABEL_FONT_WEIGHT),
/* harmony export */   HIGHLIGHT_NUMBER_BACKGROUND_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_BACKGROUND_COLOR),
/* harmony export */   HIGHLIGHT_NUMBER_COLOR: () => (/* binding */ HIGHLIGHT_NUMBER_COLOR),
/* harmony export */   HIGHLIGHT_STROKE_WIDTH: () => (/* binding */ HIGHLIGHT_STROKE_WIDTH),
/* harmony export */   LABEL_FONT_WEIGHT: () => (/* binding */ LABEL_FONT_WEIGHT),
/* harmony export */   NUMBER_BACKGROUND_COLOR: () => (/* binding */ NUMBER_BACKGROUND_COLOR),
/* harmony export */   NUMBER_COLOR: () => (/* binding */ NUMBER_COLOR),
/* harmony export */   STROKE_WIDTH: () => (/* binding */ STROKE_WIDTH)
/* harmony export */ });
const LABEL_FONT_WEIGHT = 'normal';
const NUMBER_BACKGROUND_COLOR = 'white';
const NUMBER_COLOR = 'black';
const STROKE_WIDTH = '1.5';
const HIGHLIGHT_LABEL_FONT_WEIGHT = 'bold';
const HIGHLIGHT_NUMBER_BACKGROUND_COLOR = '#a4d7e1';
const HIGHLIGHT_NUMBER_COLOR = 'black';
const HIGHLIGHT_STROKE_WIDTH = '4';
const CONNECTION_PATH_DOM_SELECTOR = 'path';
const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';

/***/ },

/***/ 95802
/*!*******************************************************************!*\
  !*** ./src/app/tools/replay/services/dom-manipulation.service.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomManipulationService: () => (/* binding */ DomManipulationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/replayConstants */ 97961);
/* harmony import */ var src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/modeler/diagram-js/features/diagramJSConstants */ 273);






const MINIMAP_CSS_CLASS = 'djs-minimap';
const QUERY_SELECTOR_PREFIX = '[data-element-id=';
const QUERY_SELECTOR_POSTFIX = ']';
const DEFAULT_COLOR = 'black';
/**
 * Manipulates the DOM during replay to only show the elements of the current Sentence
 */
class DomManipulationService {
  constructor() {
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_1__.ElementRegistryService);
  }
  showAll() {
    this.removeHighlights();
    this.elementRegistryService.getAllCanvasObjects().slice().concat(this.elementRegistryService.getAllGroups().slice()).map(e => e.businessObject).forEach(element => {
      const domObject = document.querySelector(QUERY_SELECTOR_PREFIX + element.id + QUERY_SELECTOR_POSTFIX);
      // @ts-ignore
      domObject.style.display = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.DISPLAY_BLOCK;
    });
  }
  showSentence(replaySentence) {
    this.removeHighlights();
    this.elementRegistryService.getAllBusinessObjectsFromCanvasNotIn(replaySentence.objects).forEach(element => {
      const domObject = document.querySelector(QUERY_SELECTOR_PREFIX + element.id + QUERY_SELECTOR_POSTFIX);
      if (domObject) {
        // @ts-ignore
        domObject.style.display = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.DISPLAY_NONE;
      }
    });
    this.highlightSentence(replaySentence.objects.filter(o => replaySentence.highlightedObjects.includes(o.id)));
    replaySentence.objects.forEach(element => {
      const domObject = document.querySelector(QUERY_SELECTOR_PREFIX + element.id + QUERY_SELECTOR_POSTFIX);
      if (domObject) {
        // @ts-ignore
        domObject.style.display = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.DISPLAY_BLOCK;
      }
    });
  }
  getRenderedNumbers() {
    const elementsByClassName = document.getElementsByClassName(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_4__.LABEL_NUMBER_CSS_CLASS);
    const renderedNumberRegistry = [];
    for (let i = 0; i < elementsByClassName.length; i++) {
      if (!elementsByClassName[i].closest('.' + MINIMAP_CSS_CLASS)) {
        renderedNumberRegistry.push(elementsByClassName[i]);
      }
    }
    return renderedNumberRegistry;
  }
  getNumberDomForActivity(activity) {
    const numberText = activity.parentElement?.getElementsByClassName(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_4__.LABEL_NUMBER_CSS_CLASS)[0];
    const circle = numberText?.previousSibling;
    return {
      numberBackgroundDom: circle,
      numberTextDom: numberText
    };
  }
  getLabelDomForActivity(activity) {
    return activity.parentElement?.getElementsByClassName(src_app_tools_modeler_diagram_js_features_diagramJSConstants__WEBPACK_IMPORTED_MODULE_4__.LABEL_CSS_CLASS)[0];
  }
  removeHighlights() {
    const allActivities = this.elementRegistryService.getAllActivities();
    const allConnections = this.elementRegistryService.getAllConnections();
    allActivities.forEach(activity => {
      const querySelector = document.querySelector(QUERY_SELECTOR_PREFIX + activity.id + QUERY_SELECTOR_POSTFIX);
      if (querySelector) {
        const activityDomObject = querySelector.getElementsByTagName(_domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_PATH_DOM_SELECTOR)[0];
        activityDomObject.style.stroke = activity.businessObject.pickedColor || DEFAULT_COLOR;
        activityDomObject.style.strokeWidth = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.STROKE_WIDTH;
        const activityLabelDom = this.getLabelDomForActivity(activityDomObject);
        if (activityLabelDom) {
          activityLabelDom.style.fontWeight = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.LABEL_FONT_WEIGHT;
        }
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberBackgroundDom && numberTextDom) {
          numberBackgroundDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.NUMBER_BACKGROUND_COLOR;
          numberTextDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.NUMBER_COLOR;
        }
      }
    });
    allConnections.forEach(connection => {
      const querySelector = document.querySelector(QUERY_SELECTOR_PREFIX + connection.id + QUERY_SELECTOR_POSTFIX);
      if (querySelector) {
        const connectionDomObject = querySelector.getElementsByTagName(_domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_PATH_DOM_SELECTOR)[0];
        connectionDomObject.style.stroke = connection.businessObject.pickedColor || DEFAULT_COLOR;
        connectionDomObject.style.strokeWidth = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.STROKE_WIDTH;
      }
    });
  }
  highlightSentence(sentenceObjects) {
    sentenceObjects.filter(e => e.type === src_app_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_2__.ElementTypes.ACTIVITY).forEach(activity => {
      const querySelector = document.querySelector(QUERY_SELECTOR_PREFIX + activity.id + QUERY_SELECTOR_POSTFIX);
      if (querySelector) {
        const activityDomObject = querySelector.getElementsByTagName(_domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_PATH_DOM_SELECTOR)[0];
        activityDomObject.style.strokeWidth = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.HIGHLIGHT_STROKE_WIDTH;
        const activityLabelDom = this.getLabelDomForActivity(activityDomObject);
        if (activityLabelDom) {
          activityLabelDom.style.fontWeight = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.HIGHLIGHT_LABEL_FONT_WEIGHT;
        }
        const {
          numberBackgroundDom,
          numberTextDom
        } = this.getNumberDomForActivity(activityDomObject);
        if (numberTextDom && numberBackgroundDom) {
          numberBackgroundDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.HIGHLIGHT_NUMBER_BACKGROUND_COLOR;
          numberTextDom.style.fill = _domain_replayConstants__WEBPACK_IMPORTED_MODULE_3__.HIGHLIGHT_NUMBER_COLOR;
        }
      }
    });
  }
  static {
    this.ɵfac = function DomManipulationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DomManipulationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: DomManipulationService,
      factory: DomManipulationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 3687
/*!*********************************************************!*\
  !*** ./src/app/tools/replay/services/replay.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplayService: () => (/* binding */ ReplayService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/replay/services/dom-manipulation.service */ 95802);
/* harmony import */ var _story_creator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./story-creator.service */ 97720);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 40382);
/* harmony import */ var _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../domain/entities/constants */ 40550);






class ReplayService {
  constructor() {
    this.storyWithoutGroups = [];
    this.currentSentenceSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(-1, ...(ngDevMode ? [{
      debugName: "currentSentenceSignal"
    }] : /* istanbul ignore next */[]));
    this.maxSentenceNumberSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(0, ...(ngDevMode ? [{
      debugName: "maxSentenceNumberSignal"
    }] : /* istanbul ignore next */[]));
    this.replayOnSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "replayOnSignal"
    }] : /* istanbul ignore next */[]));
    this.showGroupsSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "showGroupsSignal"
    }] : /* istanbul ignore next */[]));
    this.hasGroupsSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "hasGroupsSignal"
    }] : /* istanbul ignore next */[]));
    this.currentSentence = this.currentSentenceSignal.asReadonly();
    this.maxSentenceNumber = this.maxSentenceNumberSignal.asReadonly();
    this.replayOn = this.replayOnSignal.asReadonly();
    this.showGroups = this.showGroupsSignal.asReadonly();
    this.hasGroups = this.hasGroupsSignal.asReadonly();
    this.domManipulationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_replay_services_dom_manipulation_service__WEBPACK_IMPORTED_MODULE_1__.DomManipulationService);
    this.storyCreatorService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_story_creator_service__WEBPACK_IMPORTED_MODULE_2__.StoryCreatorService);
    this.snackbar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar);
  }
  setReplayState(state) {
    this.replayOnSignal.set(state);
  }
  isReplayable() {
    return this.storyCreatorService.traceActivitiesAndCreateStory().storyWithoutGroups.length > 0;
  }
  initializeReplay(storyWithoutGroups, storyWithGroups) {
    this.currentSentenceSignal.set(1);
    this.storyWithoutGroups = storyWithoutGroups;
    this.storyWithGroups = storyWithGroups;
    this.maxSentenceNumberSignal.set(this.storyWithoutGroups.length);
  }
  toggleShowGroups() {
    this.showGroupsSignal.set(!this.showGroupsSignal());
    this.showCurrentSentence();
  }
  nextSentence() {
    if (this.currentSentenceSignal() < this.storyWithoutGroups.length) {
      this.currentSentenceSignal.set(this.currentSentenceSignal() + 1);
      this.showCurrentSentence();
    }
  }
  previousSentence() {
    if (this.currentSentenceSignal() > 1) {
      this.currentSentenceSignal.set(this.currentSentenceSignal() - 1);
      this.showCurrentSentence();
    }
  }
  showCurrentSentence() {
    const story = this.determineStoryToShow();
    this.domManipulationService.showSentence(story[this.currentSentenceSignal() - 1]);
  }
  startReplay(checkSequenceNumbers = false) {
    const {
      storyWithoutGroups,
      storyWithGroups
    } = this.storyCreatorService.traceActivitiesAndCreateStory();
    this.hasGroupsSignal.set(storyWithGroups !== undefined);
    this.clearUserInteractionsOnCanvas();
    if (checkSequenceNumbers) {
      const missingSentences = this.storyCreatorService.getMissingSentences(storyWithoutGroups);
      if (missingSentences.length > 0) {
        const sentence = missingSentences.join(', ');
        this.snackbar.open(missingSentences.length === 1 ? `The Domain Story is not complete. Sentence ${sentence} is missing.` : `The Domain Story is not complete. Sentences ${sentence} are missing.`, undefined, {
          duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.SNACKBAR_DURATION_LONG,
          panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.SNACKBAR_ERROR
        });
        return;
      }
    }
    this.initializeReplay(storyWithoutGroups, storyWithGroups);
    if (this.storyWithoutGroups.length > 0) {
      this.setReplayState(true);
      const story = this.determineStoryToShow();
      this.domManipulationService.showSentence(story[this.currentSentenceSignal() - 1]);
    } else {
      this.snackbar.open('You need a Domain Story for replay.', undefined, {
        duration: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.SNACKBAR_DURATION_LONG,
        panelClass: _domain_entities_constants__WEBPACK_IMPORTED_MODULE_4__.SNACKBAR_INFO
      });
    }
  }
  determineStoryToShow() {
    return this.showGroupsSignal() && this.storyWithGroups ? this.storyWithGroups : this.storyWithoutGroups;
  }
  clearUserInteractionsOnCanvas() {
    this.selection._selectedElements.forEach(element => this.selection.deselect(element));
    this.contextPad.close();
    this.palette.close();
  }
  stopReplay() {
    this.currentSentenceSignal.set(-1);
    this.maxSentenceNumberSignal.set(0);
    this.setReplayState(false);
    this.domManipulationService.showAll();
    this.palette.open();
  }
  setModelerContext(contextPad, palette, selection) {
    this.contextPad = contextPad;
    this.palette = palette;
    this.selection = selection;
  }
  static {
    this.ɵfac = function ReplayService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ReplayService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ReplayService,
      factory: ReplayService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 97720
/*!****************************************************************!*\
  !*** ./src/app/tools/replay/services/story-creator.service.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryCreatorService: () => (/* binding */ StoryCreatorService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/entities/elementTypes */ 73190);
/* harmony import */ var _domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/services/element-registry.service */ 85511);
/* harmony import */ var _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/entities/dictionary */ 20843);





class StoryCreatorService {
  constructor() {
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_2__.ElementRegistryService);
  }
  traceActivitiesAndCreateStory() {
    const tracedActivityMap = new _domain_entities_dictionary__WEBPACK_IMPORTED_MODULE_3__.Dictionary();
    const story = [];
    const activities = this.elementRegistryService.getActivitiesFromActors();
    const tracedActivityMapKeys = [];
    activities.forEach(activity => {
      const activityNumber = Number(activity.businessObject.number); // Sometimes the activityNumber is a string for some reason
      const tracedItem = tracedActivityMap.find(`${activityNumber}`) ?? [];
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
    return this.createStoryWithGroups(story);
  }
  createStoryWithGroups(story) {
    const groups = this.elementRegistryService.getAllGroups();
    const annotationsForGroups = [];
    groups.forEach(group => this.addTextAnnotationsForActorOrGroup(group, annotationsForGroups));
    let storyWithGroups;
    const storyWithGroupsInLastSentence = JSON.parse(JSON.stringify(story));
    if (groups.length > 0) {
      storyWithGroups = JSON.parse(JSON.stringify(story));
      if (groups.length > 0 && story.length > 0) {
        storyWithGroups.forEach(sentence => {
          sentence.objects = sentence.objects.concat(groups.map(g => g.businessObject)).concat(annotationsForGroups.map(a => a.businessObject));
        });
      }
    }
    if (groups.length > 0 && storyWithGroupsInLastSentence.length > 0) {
      storyWithGroupsInLastSentence[storyWithGroupsInLastSentence.length - 1].objects = storyWithGroupsInLastSentence[storyWithGroupsInLastSentence.length - 1].objects.concat(groups.map(g => g.businessObject)).concat(annotationsForGroups.map(a => a.businessObject));
    }
    return {
      storyWithoutGroups: story,
      storyWithGroups,
      storyWithGroupsInLastSentence
    };
  }
  createSentence(tracedActivityMap, tracedActivityMapKey, story, storyIndex) {
    const tracedActivity = tracedActivityMap.get(`${tracedActivityMapKey}`) ?? [];
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
        if (businessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTIVITY)) {
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
    const actorsAndWorkObjects = [];
    const activities = tracedActivity;
    const actorTextAnnotations = [];
    tracedActivity.forEach(parallelSentence => {
      const parallelSentenceTargetObjects = [];
      if (!actorsAndWorkObjects.includes(parallelSentence.source)) {
        actorsAndWorkObjects.push(parallelSentence.source);
      }
      const firstTarget = parallelSentence.target;
      actorsAndWorkObjects.push(firstTarget);
      parallelSentenceTargetObjects.push(firstTarget);
      // check the outgoing activities for each target
      for (const checkTarget of parallelSentenceTargetObjects) {
        if (checkTarget.businessObject && !checkTarget.businessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR) && checkTarget.outgoing) {
          // check the target for each outgoing activity
          checkTarget.outgoing.forEach(activity => {
            activities.push(activity);
            const activityTarget = activity.target;
            if (activityTarget && !actorsAndWorkObjects.includes(activityTarget)) {
              actorsAndWorkObjects.push(activityTarget);
              parallelSentenceTargetObjects.push(activityTarget);
            }
          });
        }
      }
    });
    actorsAndWorkObjects.forEach(object => {
      if (object.businessObject.type.includes(_domain_entities_elementTypes__WEBPACK_IMPORTED_MODULE_1__.ElementTypes.ACTOR)) {
        this.addTextAnnotationsForActorOrGroup(object, actorTextAnnotations);
      }
    });
    return actorsAndWorkObjects.map(e => e.businessObject).concat(activities.map(a => a.businessObject)).concat(actorTextAnnotations.map(ta => ta.businessObject));
  }
  addTextAnnotationsForActorOrGroup(object, objectTextAnnotations) {
    object.outgoing?.forEach(connection => {
      // connections outgoing from actors or groups without number must be connections to text annotations
      if (!connection.businessObject.number) {
        objectTextAnnotations.push(connection, connection.target);
      }
    });
  }
  static {
    this.ɵfac = function StoryCreatorService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StoryCreatorService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: StoryCreatorService,
      factory: StoryCreatorService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 92642
/*!********************************************************************************************************************************************************!*\
  !*** ./src/app/tools/unsavedChangesReminder/presentation/unsavedChangesReminder-dialog/unsaved-changes-reminder/unsaved-changes-reminder.component.ts ***!
  \********************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsavedChangesReminderComponent: () => (/* binding */ UnsavedChangesReminderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 72768);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11525);




class UnsavedChangesReminderComponent {
  constructor() {
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef);
    this.fn = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA);
  }
  continueAction() {
    this.fn();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function UnsavedChangesReminderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UnsavedChangesReminderComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: UnsavedChangesReminderComponent,
      selectors: [["app-unsaved-changes-reminder"]],
      decls: 13,
      vars: 0,
      consts: [["type", "button", "mat-flat-button", "", 3, "click"], ["type", "button", "mat-flat-button", "", "color", "primary", 3, "click"]],
      template: function UnsavedChangesReminderComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-dialog-content")(1, "label")(2, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Attention");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "There are some unsaved changes. Do you want to discard them?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-dialog-actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div")(9, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UnsavedChangesReminderComponent_Template_button_click_9_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function UnsavedChangesReminderComponent_Template_button_click_11_listener() {
            return ctx.continueAction();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " Discard changes ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
      },
      dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 99683
/*!*****************************************!*\
  !*** ./src/app/utils/colorConverter.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexToRGBA: () => (/* binding */ hexToRGBA),
/* harmony export */   isHexWithAlpha: () => (/* binding */ isHexWithAlpha),
/* harmony export */   rgbaToHex: () => (/* binding */ rgbaToHex)
/* harmony export */ });
function rgbaToHex(rgba) {
  if (isValidHex(rgba)) {
    return rgba;
  }
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
    return Math.round((a / 255 + Number.EPSILON) * 100) / 100; // Round to 2 or less decimal places
  }
  return 1;
};
const isHexWithAlpha = hex => hex?.startsWith('#') && (hex?.length === 5 || hex?.length === 9);
const hexToRGBA = hex => {
  if (!isValidHex(hex)) {
    throw new Error('Invalid HEX');
  }
  const chunkSize = Math.floor((hex.length - 1) / 3); // 1 if hex has 3-4 digits, 2 if hex  has 6 or 8 digits
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r},${g},${b},${getAlphafloat(a)})`;
};

/***/ },

/***/ 25312
/*!***************************************!*\
  !*** ./src/app/utils/downloadFile.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadFile: () => (/* binding */ downloadFile)
/* harmony export */ });
function downloadFile(data, datatype, filename, fileEnding, encodeUri = true) {
  const element = document.createElement('a');
  const dataToAdd = encodeUri ? encodeURIComponent(data) : data;
  element.setAttribute('href', datatype + dataToAdd);
  element.setAttribute('download', filename + fileEnding);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  element.remove();
}

/***/ },

/***/ 32951
/*!************************************!*\
  !*** ./src/app/utils/isPresent.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPresent: () => (/* binding */ isPresent)
/* harmony export */ });
function isPresent(value) {
  return value !== null && value !== undefined;
}

/***/ },

/***/ 67858
/*!*****************************************!*\
  !*** ./src/app/utils/mathExtensions.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
var Quadrant;
(function (Quadrant) {
  Quadrant[Quadrant["upperRight"] = 0] = "upperRight";
  Quadrant[Quadrant["upperLeft"] = 1] = "upperLeft";
  Quadrant[Quadrant["lowerLeft"] = 2] = "lowerLeft";
  Quadrant[Quadrant["lowerRight"] = 3] = "lowerRight";
})(Quadrant || (Quadrant = {}));
function determineQuadrant(startPoint, endPoint) {
  if (startPoint.x <= endPoint.x) {
    if (startPoint.y >= endPoint.y) {
      return Quadrant.upperRight;
    } else {
      return Quadrant.lowerRight;
    }
  } else {
    if (startPoint.y >= endPoint.y) {
      return Quadrant.upperLeft;
    } else {
      return Quadrant.lowerLeft;
    }
  }
}
// calculate the angle between two points in 2D
function angleBetween(startPoint, endPoint) {
  const adjacent = Math.abs(startPoint.y - endPoint.y);
  const opposite = Math.abs(startPoint.x - endPoint.x);
  const angle = degrees(Math.atan2(opposite, adjacent));
  // since the arcus-tangens only gives values between 0 and 90, we have to adjust for the quadrant we are in
  const quadrant = determineQuadrant(startPoint, endPoint);
  switch (quadrant) {
    case Quadrant.upperRight:
      return 90 - angle;
    case Quadrant.upperLeft:
      return 90 + angle;
    case Quadrant.lowerLeft:
      return 270 - angle;
    case Quadrant.lowerRight:
      return 270 + angle;
  }
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

/***/ },

/***/ 43515
/*!************************************!*\
  !*** ./src/app/utils/sanitizer.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitizeForCss: () => (/* binding */ sanitizeForCss),
/* harmony export */   sanitizeForDesktop: () => (/* binding */ sanitizeForDesktop),
/* harmony export */   sanitizeIconName: () => (/* binding */ sanitizeIconName),
/* harmony export */   sanitizeTextForSVGExport: () => (/* binding */ sanitizeTextForSVGExport),
/* harmony export */   unsanitizeTextFromSvgExport: () => (/* binding */ unsanitizeTextFromSvgExport)
/* harmony export */ });


function sanitizeTextForSVGExport(str) {
  return str.replaceAll('--', '––').replaceAll('<', '%3C').replaceAll('>', '%3E');
}
function unsanitizeTextFromSvgExport(str) {
  return str.replaceAll('––', '--').replaceAll('&#34;', '"') // External Tools HTML-escape more characters than we do => We need to unescape them
  .replaceAll('&#39;', "'") // External Tools HTML-escape more characters than we do => We need to unescape them
  .replaceAll('&#43;', '+') // External Tools HTML-escape more characters than we do => We need to unescape them
  .replaceAll('&#61;', '=') // External Tools HTML-escape more characters than we do => We need to unescape them
  .replaceAll('%3C', '<').replaceAll('%3E', '>');
}
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
  return str ? sanitizeTextForSVGExport(str.replace(reg, match => map[match])) : '';
}
// CSS-Classes with semantic characters cannot be addressed properly
function sanitizeForCss(name) {
  return name
  // Replace every character that isn't a letter, digit, hyphen, or underscore
  .replace(/[^a-zA-Z0-9_-]/g, '_')
  // Avoid a class name starting with a digit or a "-<digit>" sequence
  .replace(/^(-?\d)/, '_$1').toLowerCase();
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

/***/ },

/***/ 4225
/*!******************************************************************************************!*\
  !*** ./src/app/workbench/presentation/header/header-buttons/header-buttons.component.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderButtonsComponent: () => (/* binding */ HeaderButtonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 63445);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../tools/replay/services/replay.service */ 3687);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 55279);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11525);




function HeaderButtonsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](0, "div")(1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.startReplay.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " play_arrow ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Replay");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](6, "button", 4)(7, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " file_upload ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](9, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Import file");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](11, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openImportFromUrlDialog.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](12, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, " cloud_upload ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](14, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Import URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](16, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("change", function HeaderButtonsComponent_Conditional_0_Template_input_change_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.import.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](17, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openDownloadDialog.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](18, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, " file_download ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](20, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "Export");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](22, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openLabelDictionary.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](23, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, " spellcheck ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](25, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "Dictionary");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](27, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.newStory.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](28, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, " note_add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](30, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31, "New story");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](32, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openSettings.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](33, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34, " settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](35, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](37, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_0_Template_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.showKeyboardShortCuts.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](38, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39, " keyboard ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](40, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, "Shortcuts");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("disabled", !ctx_r1.isReplayable());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomProperty"]("disabled", !ctx_r1.isReplayable());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("disabled", !ctx_r1.hasDomainStory() && !ctx_r1.hasTitle())("dirty", ctx_r1.isDirty());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomProperty"]("disabled", !ctx_r1.hasDomainStory() && !ctx_r1.hasTitle());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("disabled", !ctx_r1.hasDomainStory());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomProperty"]("disabled", !ctx_r1.hasDomainStory());
  }
}
function HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleGroups.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " visibility_off ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
  }
}
function HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleGroups.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " visibility ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
  }
}
function HeaderButtonsComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditionalCreate"](0, HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_0_Template, 5, 0, "button", 16)(1, HeaderButtonsComponent_Conditional_1_Conditional_1_Conditional_1_Template, 5, 0, "button", 17);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](ctx_r1.showGroups() ? 0 : 1);
  }
}
function HeaderButtonsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditionalCreate"](1, HeaderButtonsComponent_Conditional_1_Conditional_1_Template, 2, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](2, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.previousSentence.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](3, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " skip_previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Prev.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](7, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.nextSentence.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](8, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " skip_next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](10, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Next");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](12, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomListener"]("click", function HeaderButtonsComponent_Conditional_1_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.stopReplay.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](13, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, " stop ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](15, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementStart"](17, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdomElementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](ctx_r1.hasGroups() ? 1 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Sentence: ", ctx_r1.sentenceDescription());
  }
}
class HeaderButtonsComponent {
  constructor() {
    this.replayService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_3__.ReplayService);
    this.sentenceDescription = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => `${this.replayService.currentSentence()}/${this.replayService.maxSentenceNumber()}`, ...(ngDevMode ? [{
      debugName: "sentenceDescription"
    }] : /* istanbul ignore next */[]));
    this.hasDomainStory = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "hasDomainStory"
    }] : /* istanbul ignore next */[]));
    this.hasTitle = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "hasTitle"
    }] : /* istanbul ignore next */[]));
    this.isReplaying = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "isReplaying"
    }] : /* istanbul ignore next */[]));
    this.showGroups = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "showGroups"
    }] : /* istanbul ignore next */[]));
    this.hasGroups = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "hasGroups"
    }] : /* istanbul ignore next */[]));
    this.isDirty = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "isDirty"
    }] : /* istanbul ignore next */[]));
    this.isReplayable = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(false, ...(ngDevMode ? [{
      debugName: "isReplayable"
    }] : /* istanbul ignore next */[]));
    this.import = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.openSettings = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.startReplay = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.stopReplay = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.previousSentence = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.nextSentence = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.newStory = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.toggleGroups = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.showKeyboardShortCuts = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.openLabelDictionary = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.openDownloadDialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
    this.openImportFromUrlDialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.output)();
  }
  static {
    this.ɵfac = function HeaderButtonsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeaderButtonsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: HeaderButtonsComponent,
      selectors: [["app-header-buttons"]],
      inputs: {
        hasDomainStory: [1, "hasDomainStory"],
        hasTitle: [1, "hasTitle"],
        isReplaying: [1, "isReplaying"],
        showGroups: [1, "showGroups"],
        hasGroups: [1, "hasGroups"],
        isDirty: [1, "isDirty"],
        isReplayable: [1, "isReplayable"]
      },
      outputs: {
        import: "import",
        openSettings: "openSettings",
        startReplay: "startReplay",
        stopReplay: "stopReplay",
        previousSentence: "previousSentence",
        nextSentence: "nextSentence",
        newStory: "newStory",
        toggleGroups: "toggleGroups",
        showKeyboardShortCuts: "showKeyboardShortCuts",
        openLabelDictionary: "openLabelDictionary",
        openDownloadDialog: "openDownloadDialog",
        openImportFromUrlDialog: "openImportFromUrlDialog"
      },
      decls: 2,
      vars: 1,
      consts: [[1, "replaying"], ["type", "button", "id", "buttonStartReplay", "title", "Start replay", 1, "headerButton", 3, "click", "disabled"], [1, "material-icons-outlined", "materialIconButton"], [1, "button-label"], ["type", "button", "id", "buttonImport", "title", "Import story from file", "onclick", "document.getElementById('import').click()", 1, "headerButton"], ["type", "button", "id", "buttonUrlImport", "title", "Import story from URL", 1, "headerButton", 3, "click"], ["type", "file", "accept", ".dst, .egn, .svg", "id", "import", "onclick", "this.value = null", 2, "display", "none", 3, "change"], ["type", "button", "id", "export", "title", "Export story as .egn, .svg or .png file", 1, "headerButton", 3, "click", "disabled"], ["type", "button", "title", "Change multiple labels at once", 1, "headerButton", 3, "click", "disabled"], ["type", "button", "title", "Create a new domain story", 1, "headerButton", 3, "click"], ["type", "button", "title", "Change Icons and Settings", 1, "headerButton", 3, "click"], ["type", "button", "title", "Show keyboard shortcuts", 1, "headerButton", 3, "click"], ["type", "button", "title", "Previous sentence", 1, "headerButton", 3, "click"], ["type", "button", "title", "Next sentence", 1, "headerButton", 3, "click"], ["type", "button", "title", "Stop replay", 1, "headerButton", 3, "click"], [1, "sentences"], ["type", "button", "title", "Hide groups", 1, "headerButton"], ["type", "button", "title", "Show groups", 1, "headerButton"], ["type", "button", "title", "Hide groups", 1, "headerButton", 3, "click"], ["type", "button", "title", "Show groups", 1, "headerButton", 3, "click"]],
      template: function HeaderButtonsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditionalCreate"](0, HeaderButtonsComponent_Conditional_0_Template, 42, 11, "div")(1, HeaderButtonsComponent_Conditional_1_Template, 19, 2, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](!ctx.isReplaying() ? 0 : 1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule],
      styles: [".disabled[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], \n.disabled[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.disabled[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  cursor: initial;\n  color: gray;\n}\n\n.dirty[_ngcontent-%COMP%] {\n  color: #b64435;\n}\n\n.dirty[_ngcontent-%COMP%]:hover {\n  color: #0093ac;\n}\n\n.replaying[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n\n.sentences[_ngcontent-%COMP%] {\n  align-self: center;\n  margin-left: 16px;\n  width: 150px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9oZWFkZXIvaGVhZGVyLWJ1dHRvbnMvaGVhZGVyLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztFQUdFLGVBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUEsc0ZBQUE7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzYWJsZWQgLmJ1dHRvbi1sYWJlbCxcbi5kaXNhYmxlZCBzcGFuLFxuLmRpc2FibGVkOmhvdmVyIHNwYW4ge1xuICBjdXJzb3I6IGluaXRpYWw7XG4gIGNvbG9yOiBncmF5O1xufVxuXG4uZGlydHkge1xuICBjb2xvcjogI2I2NDQzNTtcbn1cblxuLmRpcnR5OmhvdmVyIHtcbiAgY29sb3I6ICMwMDkzYWM7XG59XG5cbi5yZXBsYXlpbmcge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4vKiogZml4ZWQgd2lkdGggYXZvaWRzIFwianVtcGluZ1wiIG9mIGxhYmVsIHdoZW4gc2VxdWVuY2UgbnVtYmVyIHJlYWNoZXMgZG91YmxlIGRpZ2l0cyoqL1xuLnNlbnRlbmNlcyB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG4gIHdpZHRoOiAxNTBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 38361
/*!**************************************************************************!*\
  !*** ./src/app/workbench/presentation/header/header/header.component.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/tools/properties/services/properties.service */ 36787);
/* harmony import */ var _tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../tools/replay/services/replay.service */ 3687);
/* harmony import */ var _tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../tools/import/services/import-domain-story.service */ 93586);
/* harmony import */ var _services_settings_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/settings/settings.service */ 1299);
/* harmony import */ var _domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../domain/services/dirty-flag.service */ 94658);
/* harmony import */ var _domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../domain/services/dialog.service */ 12855);
/* harmony import */ var _tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../tools/export/services/export.service */ 39595);
/* harmony import */ var _tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../tools/label-dictionary/services/label-dictionary.service */ 69731);
/* harmony import */ var src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ 34294);
/* harmony import */ var _header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../header-buttons/header-buttons.component */ 4225);
/* harmony import */ var src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/domain/services/element-registry.service */ 85511);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 11525);

















function HeaderComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Conditional_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.setShowDescription(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, " visibility_off ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Conditional_11_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.setShowDescription(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, " visibility ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function HeaderComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "mat-card", 11)(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r1.description());
  }
}
class HeaderComponent {
  constructor() {
    this.propertiesService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_properties_services_properties_service__WEBPACK_IMPORTED_MODULE_1__.PropertiesService);
    this.replayService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tools_replay_services_replay_service__WEBPACK_IMPORTED_MODULE_2__.ReplayService);
    this.importService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tools_import_services_import_domain_story_service__WEBPACK_IMPORTED_MODULE_3__.ImportDomainStoryService);
    this.settingsService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_4__.SettingsService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_9__.ModelerService);
    this.dirtyFlagService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dirty_flag_service__WEBPACK_IMPORTED_MODULE_5__.DirtyFlagService);
    this.dialogService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_domain_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__.DialogService);
    this.exportService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tools_export_services_export_service__WEBPACK_IMPORTED_MODULE_7__.ExportService);
    this.labelDictionaryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tools_label_dictionary_services_label_dictionary_service__WEBPACK_IMPORTED_MODULE_8__.LabelDictionaryService);
    this.elementRegistryService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_domain_services_element_registry_service__WEBPACK_IMPORTED_MODULE_13__.ElementRegistryService);
    this.description = this.propertiesService.description;
    this.showDescription = this.propertiesService.showDescription;
    this.isReplayOn = this.replayService.replayOn;
    this.showGroups = this.replayService.showGroups;
    this.hasGroups = this.replayService.hasGroups;
    this.isDirty = this.dirtyFlagService.dirty;
  }
  openHeaderDialog() {
    this.propertiesService.openHeaderDialog();
  }
  openSettings() {
    this.settingsService.open();
  }
  setShowDescription(show) {
    this.propertiesService.setShowDescription(show);
  }
  createNewDomainStory() {
    if (this.dirtyFlagService.dirty()) {
      this.importService.openUnsavedChangesReminderDialog(() => {
        this.propertiesService.reset();
        this.modelerService.reset();
      });
    } else {
      this.propertiesService.reset();
      this.modelerService.reset();
    }
  }
  onImport() {
    if (this.dirtyFlagService.dirty()) {
      this.importService.openUnsavedChangesReminderDialog(() => this.importService.performImport());
    } else {
      this.importService.performImport();
    }
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
  toggleGroups() {
    this.replayService.toggleShowGroups();
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
    this.importService.openImportFromUrlDialog(this.dirtyFlagService.dirty());
  }
  get hasDomainStory() {
    return this.exportService.isDomainStoryExportable();
  }
  get hasTitle() {
    return this.propertiesService.hasTitleOrDescription();
  }
  get isReplayable() {
    return this.replayService.isReplayable();
  }
  static {
    this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeaderComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
      type: HeaderComponent,
      selectors: [["app-header"]],
      decls: 15,
      vars: 11,
      consts: [["color", "primary"], [1, "firstRow"], [1, "mr-10", "title-scrollbar"], ["title", "Edit properties", 1, "headline", 3, "click"], ["type", "button", "title", "Edit properties", 1, "headerButton", 3, "click"], [1, "material-icons-outlined", "materialIconButton"], [1, "button-label"], ["type", "button", "title", "Hide description", 1, "headerButton"], ["type", "button", "title", "Show description", 1, "headerButton"], [1, "titleSpacer"], [1, "nowrap", 3, "import", "openSettings", "startReplay", "stopReplay", "nextSentence", "previousSentence", "toggleGroups", "newStory", "showKeyboardShortCuts", "openLabelDictionary", "openDownloadDialog", "openImportFromUrlDialog", "hasDomainStory", "hasTitle", "isDirty", "isReplayable", "isReplaying", "showGroups", "hasGroups"], [1, "smallScrollbar", "description"], ["type", "button", "title", "Hide description", 1, "headerButton", 3, "click"], ["type", "button", "title", "Show description", 1, "headerButton", 3, "click"], [1, "descriptionText"]],
      template: function HeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "mat-toolbar-row", 1)(2, "div", 2)(3, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_span_click_3_listener() {
            return ctx.openHeaderDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_5_listener() {
            return ctx.openHeaderDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](7, " edit ");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](8, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](9, "Properties");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](10, HeaderComponent_Conditional_10_Template, 5, 0, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](11, HeaderComponent_Conditional_11_Template, 5, 0, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](12, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "app-header-buttons", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("import", function HeaderComponent_Template_app_header_buttons_import_13_listener() {
            return ctx.onImport();
          })("openSettings", function HeaderComponent_Template_app_header_buttons_openSettings_13_listener() {
            return ctx.openSettings();
          })("startReplay", function HeaderComponent_Template_app_header_buttons_startReplay_13_listener() {
            return ctx.startReplay();
          })("stopReplay", function HeaderComponent_Template_app_header_buttons_stopReplay_13_listener() {
            return ctx.stopReplay();
          })("nextSentence", function HeaderComponent_Template_app_header_buttons_nextSentence_13_listener() {
            return ctx.nextSentence();
          })("previousSentence", function HeaderComponent_Template_app_header_buttons_previousSentence_13_listener() {
            return ctx.previousSentence();
          })("toggleGroups", function HeaderComponent_Template_app_header_buttons_toggleGroups_13_listener() {
            return ctx.toggleGroups();
          })("newStory", function HeaderComponent_Template_app_header_buttons_newStory_13_listener() {
            return ctx.createNewDomainStory();
          })("showKeyboardShortCuts", function HeaderComponent_Template_app_header_buttons_showKeyboardShortCuts_13_listener() {
            return ctx.openKeyboardShortcutsDialog();
          })("openLabelDictionary", function HeaderComponent_Template_app_header_buttons_openLabelDictionary_13_listener() {
            return ctx.openLabelDictionary();
          })("openDownloadDialog", function HeaderComponent_Template_app_header_buttons_openDownloadDialog_13_listener() {
            return ctx.openDownloadDialog();
          })("openImportFromUrlDialog", function HeaderComponent_Template_app_header_buttons_openImportFromUrlDialog_13_listener() {
            return ctx.openImportFromUrlDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](14, HeaderComponent_Conditional_14_Template, 3, 1, "mat-card", 11);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx.propertiesService.title(), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.showDescription() ? 10 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!ctx.showDescription() ? 11 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("hasDomainStory", ctx.hasDomainStory)("hasTitle", ctx.hasTitle)("isDirty", ctx.isDirty())("isReplayable", ctx.isReplayable)("isReplaying", ctx.isReplayOn())("showGroups", ctx.showGroups())("hasGroups", ctx.hasGroups());
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.showDescription() ? 14 : -1);
        }
      },
      dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__.MatToolbarModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__.MatToolbarRow, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCard, _header_buttons_header_buttons_component__WEBPACK_IMPORTED_MODULE_12__.HeaderButtonsComponent],
      styles: [".firstRow[_ngcontent-%COMP%] {\n  min-height: 4rem;\n}\n\n.description[_ngcontent-%COMP%] {\n  top: 0;\n  max-width: 100vw;\n  overflow-y: scroll;\n  display: grid;\n  background-color: #f7f7f8;\n}\n\n.descriptionText[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 10pt;\n  overflow-wrap: anywhere;\n  word-wrap: anywhere;\n  white-space: pre-wrap;\n  padding-top: 15px;\n  padding-left: 27px;\n  padding-right: 15px;\n  line-height: 12pt;\n}\n\n.description[_ngcontent-%COMP%]:hover {\n  cursor: default;\n}\n\n.titleSpacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.headline[_ngcontent-%COMP%]    > .editIcon[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.nowrap[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.mat-toolbar-row[_ngcontent-%COMP%] {\n  white-space: normal;\n  height: min-content;\n}\n\n.title-scrollbar[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  max-height: 10rem;\n  overflow: auto;\n  scrollbar-width: none;\n  max-width: 100rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9oZWFkZXIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxNQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5maXJzdFJvdyB7XG4gIG1pbi1oZWlnaHQ6IDRyZW07XG59XG5cbi5kZXNjcmlwdGlvbiB7XG4gIHRvcDogMDtcbiAgbWF4LXdpZHRoOiAxMDB2dztcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBkaXNwbGF5OiBncmlkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y4O1xufVxuXG4uZGVzY3JpcHRpb25UZXh0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDEwcHQ7XG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xuICB3b3JkLXdyYXA6IGFueXdoZXJlO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDI3cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxMnB0O1xufVxuXG4uZGVzY3JpcHRpb246aG92ZXIge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi50aXRsZVNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uaGVhZGxpbmUgPiAuZWRpdEljb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ubm93cmFwIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLm1hdC10b29sYmFyLXJvdyB7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XG59XG5cbi50aXRsZS1zY3JvbGxiYXIge1xuICBtYXJnaW4tbGVmdDogMTJweDtcbiAgbWF4LWhlaWdodDogMTByZW07XG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIG1heC13aWR0aDogMTAwcmVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 45263
/*!***********************************************************************!*\
  !*** ./src/app/workbench/presentation/settings/settings.component.ts ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsComponent: () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);
/* harmony import */ var src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/workbench/services/settings/settings.service */ 1299);
/* harmony import */ var src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/modeler/services/modeler.service */ 40439);
/* harmony import */ var _tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../tools/icon-set-config/services/icon-set-customization.service */ 46252);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 31165);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 95912);
/* harmony import */ var _tools_autosave_presentation_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../tools/autosave/presentation/AutosaveSettings/autosave-settings.component */ 91525);
/* harmony import */ var _tools_icon_set_config_presentation_icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../tools/icon-set-config/presentation/icon-set-configuration/icon-set-configuration.component */ 26103);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11525);











function SettingsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-autosave-settings");
  }
}
function SettingsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-icon-set-configuration");
  }
}
class SettingsComponent {
  constructor() {
    this.showAutosaveSettings = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "showAutosaveSettings"
    }] : /* istanbul ignore next */[]));
    this.showIconSetCustomization = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(true, ...(ngDevMode ? [{
      debugName: "showIconSetCustomization"
    }] : /* istanbul ignore next */[]));
    this.settingsService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_workbench_services_settings_settings_service__WEBPACK_IMPORTED_MODULE_1__.SettingsService);
    this.modelerService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(src_app_tools_modeler_services_modeler_service__WEBPACK_IMPORTED_MODULE_2__.ModelerService);
    this.iconSetCustomizationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_tools_icon_set_config_services_icon_set_customization_service__WEBPACK_IMPORTED_MODULE_3__.IconSetCustomizationService);
  }
  close() {
    const savedConfiguration = this.iconSetCustomizationService.getAndClearSavedConfiguration();
    if (savedConfiguration) {
      this.modelerService.restart(savedConfiguration);
    }
    this.settingsService.close();
  }
  openGeneralSettings() {
    this.showAutosaveSettings.set(true);
    this.showIconSetCustomization.set(false);
  }
  openIconSetCustomization() {
    this.showAutosaveSettings.set(false);
    this.showIconSetCustomization.set(true);
  }
  static {
    this.ɵfac = function SettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SettingsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: SettingsComponent,
      selectors: [["app-settings"]],
      decls: 15,
      vars: 6,
      consts: [[1, "settings"], ["color", "primary"], [1, "firstRow"], ["type", "button", "mat-button", "", 1, "headerButton", "tab-small", 3, "click"], [1, "material-icons-outlined", "alignedWithText"], ["type", "button", "mat-button", "", 1, "headerButton", "tab-like", 3, "click"], [1, "headline"]],
      template: function SettingsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "mat-toolbar-row", 2)(3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_3_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "chevron_left");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, " Back ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_7_listener() {
            return ctx.openIconSetCustomization();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Customize Icon Set");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SettingsComponent_Template_button_click_10_listener() {
            return ctx.openGeneralSettings();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Autosave Settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditionalCreate"](13, SettingsComponent_Conditional_13_Template, 1, 0, "app-autosave-settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditionalCreate"](14, SettingsComponent_Conditional_14_Template, 1, 0, "app-icon-set-configuration");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("highlight", ctx.showIconSetCustomization());
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("highlight", ctx.showAutosaveSettings());
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditional"](ctx.showAutosaveSettings() ? 13 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditional"](ctx.showIconSetCustomization() ? 14 : -1);
        }
      },
      dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarRow, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _tools_autosave_presentation_AutosaveSettings_autosave_settings_component__WEBPACK_IMPORTED_MODULE_6__.AutosaveSettingsComponent, _tools_icon_set_config_presentation_icon_set_configuration_icon_set_configuration_component__WEBPACK_IMPORTED_MODULE_7__.IconSetConfigurationComponent],
      styles: [".firstRow[_ngcontent-%COMP%] {\n  min-height: 4rem;\n  padding: 0;\n}\n\n.tab-like[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 0;\n}\n\n.tab-small[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 200px;\n  border-radius: 0;\n}\n\n.settings[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: 4rem auto;\n  width: 100%;\n  height: 100%;\n}\n\n.highlight[_ngcontent-%COMP%] {\n  background-color: #0093ac;\n}\n\n.alignedWithText[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvd29ya2JlbmNoL3ByZXNlbnRhdGlvbi9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmZpcnN0Um93IHtcbiAgbWluLWhlaWdodDogNHJlbTtcbiAgcGFkZGluZzogMDtcbn1cblxuLnRhYi1saWtlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMDtcbn1cblxuLnRhYi1zbWFsbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDIwMHB4O1xuICBib3JkZXItcmFkaXVzOiAwO1xufVxuXG4uc2V0dGluZ3Mge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRyZW0gYXV0bztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmhpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDkzYWM7XG59XG5cbi5hbGlnbmVkV2l0aFRleHQge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 1299
/*!*****************************************************************!*\
  !*** ./src/app/workbench/services/settings/settings.service.ts ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsService: () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 38424);


class SettingsService {
  constructor() {
    this.showSettingsSignal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false, ...(ngDevMode ? [{
      debugName: "showSettingsSignal"
    }] : /* istanbul ignore next */[]));
    this.showSettings = this.showSettingsSignal.asReadonly();
  }
  close() {
    this.showSettingsSignal.set(false);
  }
  open() {
    this.showSettingsSignal.set(true);
  }
  static {
    this.ɵfac = function SettingsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SettingsService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: SettingsService,
      factory: SettingsService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 45312
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration production` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  version: '4.0.0-dev'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ },

/***/ 84429
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 96623);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 96383);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 17436);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.component */ 20092);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ 45312);
/* harmony import */ var _app_app_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/app.config */ 70289);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.enableProdMode)();
}
(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent, {
  ..._app_app_config__WEBPACK_IMPORTED_MODULE_5__.appConfig,
  providers: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.provideZoneChangeDetection)(), (0,_angular_router__WEBPACK_IMPORTED_MODULE_1__.provideRouter)([]), ..._app_app_config__WEBPACK_IMPORTED_MODULE_5__.appConfig.providers]
}).catch(err => console.error(err));

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map