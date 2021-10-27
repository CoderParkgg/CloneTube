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

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n//import regeneratorRuntime from \"regenerator-runtime\"; : main.js에 import 문 넣기\nvar startBtn = document.getElementById(\"startBtn\");\nvar video = document.getElementById(\"preview\");\nvar stream;\nvar recorder;\nvar videoFile;\n\nvar handleDownload = function handleDownload() {\n  var a = document.createElement(\"a\");\n  a.href = videoFile;\n  a.download = \"MyRecording.mp4\"; //a태그에서 download 속성은 사용자에게 url을 통해 어디로 보내주는 것이 아니라 url을 저장하게 해준다. 값으로 받은 것을 파일 이름으로 하여 저장한다.\n\n  a.click(); //링크 걸린 a 태그를 직접 누르는 것과 같은 효과를 준다. \n};\n\nvar handleStop = function handleStop() {\n  startBtn.innerText = \"Download Recording\";\n  startBtn.removeEventListener(\"click\", handleStop);\n  startBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\n\nvar handleStart = function handleStart() {\n  startBtn.innerText = \"Stop recording\";\n  startBtn.removeEventListener(\"click\", handleStart);\n  startBtn.addEventListener(\"click\", handleStop);\n  recorder = new MediaRecorder(stream); //MediaRecorder은 미디어를 녹화(녹은)할 수 있는 함수들을 제공한다. stream을 인자로 하는 생성자를 만들 경우 리코더 객체를 반환하여 준다. \n\n  recorder.ondataavailable = function (event) {\n    videoFile = URL.createObjectURL(event.data); //브라우저 메모리에서만 가능한 URL을 만들어 준다. \n\n    video.srcObject = null;\n    video.src = videoFile; //video 태그(dom)에 만든 주소를 주면 그 파일이 열린다. \n\n    video.loop = true; //video에도 loop 설정이 존재한다.\n\n    video.play();\n  }; //MediaRecorder에서 발생하는 event를 잡으려면 이처럼 ondataavailable handler를 사용해야 한다. \n  //ondataavailable로 반환한 객체에는 다양한 것들이 존재하는데 우리가 사용할 비디오는 data 프로퍼티에 존재한다. (event.data)\n  //녹화한 것(event.data)을 주소로 바꿔주는 것이 URL.createObjectURL(event.data). 참고로 이 주소는 서버상에 존재하지 않는 주소이다. 이곳으로 들어가면 에러뜸. 이것은 브라우저상에서 존재하는 파일의 주소라고 생각하면 된다. \n  //이렇게 바꾼 주소를 이용하여 저장하거나 재생하는 등의 작업을 할 수 있다. \n\n\n  recorder.start();\n};\n\nvar init = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return navigator.mediaDevices.getUserMedia({\n              audio: false,\n              video: {\n                width: 500,\n                height: 400\n              }\n            });\n\n          case 2:\n            stream = _context.sent;\n            //video\n            video.srcObject = stream;\n            video.play();\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function init() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://clonetube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;