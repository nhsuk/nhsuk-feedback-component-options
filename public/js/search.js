"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var healthAz = [];
var searchWrapper = document.querySelector('.nhsuk-header__search');
var reusltsWrapper = document.querySelector('.new-search-results-wrapper');
var results = document.querySelector('.new-search-results');
reusltsWrapper.style.display = "none";
fetch("/javascript/conditions.json").then(function (response) {
  return response.json();
}).then(function (data) {
  return healthAz.push.apply(healthAz, _toConsumableArray(data));
});
function searchTerm(searchTerm, healthAz) {
  return healthAz.filter(function (condition) {
    var regex = new RegExp(searchTerm, 'gi');
    return condition.title.match(regex) || condition.synonyms.match(regex) || condition.misspelling.match(regex) || condition.tag.match(regex);
  });
}
function showSearchResults() {
  var _this = this;
  var matchArray = searchTerm(this.value, healthAz);
  var checkLength = searchConditions.value;
  var html = matchArray.map(function (condition) {
    var regex = new RegExp(_this.value, 'gi');
    var conditionTitle = condition.title.replace(regex, "<span class=\"\">".concat(_this.value, "</span>"));
    return "\n        ".concat(function () {
      if (regex.test(condition.synonyms)) {
        return "\n              <li class='nhsuk-list-panel__item'>\n                  <a class=\"nhsuk-list-panel__link\" href=\"".concat(condition.link, "\">\n                  <svg class=\"nhsuk-icon nhsuk-icon__search\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z\"></path></svg>\n                    ").concat(conditionTitle, " \n                    \n                  </a>\n              </li>\n            ");
      } else {
        return "\n              <li class='nhsuk-list-panel__item'>\n                <a class=\"nhsuk-list-panel__link\" href=\"".concat(condition.link, "\">\n                <svg class=\"nhsuk-icon nhsuk-icon__search\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z\"></path></svg>\n                    ").concat(conditionTitle, " \n                  </a>\n              </li>\n            ");
      }
    }(), "        \n    ");
  }).join("");
  if (checkLength.length >= 2) {
    results.innerHTML = html;
    reusltsWrapper.style.display = "block";
    results.style.display = "block";
  } else {
    reusltsWrapper.style.display = "none";
  }
  if (checkLength.length >= 1 && matchArray.length === 0) {
    return;
    // results.innerHTML = `
    //     <li class='nhsuk-list-panel__item'>
    //         <a class="nhsuk-list-panel__link">
    //             No matches. Please check the spelling or try the A-Z.
    //         </a>
    //     </li>
    // `;
  }
}

var searchConditions = document.querySelector('.new-search__input');
searchConditions.addEventListener('change', showSearchResults);
searchConditions.addEventListener('keyup', showSearchResults);
searchConditions.addEventListener('search', function () {
  reusltsWrapper.style.display = "none";
});