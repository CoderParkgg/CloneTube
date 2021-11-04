/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\n\nvar addComment = function addComment(text) {\n  var videoComments = document.querySelector(\".video__comments ul\"); //video__comments를 받아오고 그 안의 ul태그를 가져온다.\n\n  var newComment = document.createElement(\"li\");\n  newComment.className = \"video__comment\";\n  var icon = document.createElement(\"i\");\n  icon.className = \"fa fa-comment\";\n  var span = document.createElement(\"span\");\n  span.innerText = \" \".concat(text);\n  newComment.appendChild(icon);\n  newComment.appendChild(span);\n  videoComments.prepend(newComment);\n};\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {\n    var textArea, text, videoId, _yield$fetch, status;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            //돔을 만드는 것 역시 null에서 요소를 돔으로 만드는 것이 안됨. 이를 방지하기 위해\n            textArea = form.querySelector(\"textarea\"); //const btn = form.querySelector(\"button\");\n\n            event.preventDefault();\n            text = textArea.value;\n            videoId = videoContainer.dataset.id;\n\n            if (!(text === \"\")) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 6:\n            _context.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n              method: \"POST\",\n              //header는 기본적으로 request의 정보를 담고 있다.\n              headers: {\n                \"content-type\": \"application/json\" //우리가 보내는 정보는 문자열화된 json이다는 것을 알려준다.\n\n              },\n              body: JSON.stringify({\n                text: text\n              })\n            });\n\n          case 8:\n            _yield$fetch = _context.sent;\n            status = _yield$fetch.status;\n            textArea.value = \"\";\n\n            if (status === 201) {\n              //만약 요청이 제대로 되었다면 status의 값이 201이 되었을 것이다.\n              addComment(text);\n            }\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleSubmit(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nif (form) {\n  //로그인 했을 때만 태그를 보여주니 로그인 하지 않은 경우 존재하지 않은 태그를 가져와 addEventListener를 사용하는 것이니까 에러뜸. 이를 방지하기 위해\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\n//# sourceURL=webpack://clonetube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;