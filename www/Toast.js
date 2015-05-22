function Toast() {
}

Toast.prototype.optionsBuilder = function () {

  /**
   * Default values for toast object
   * */
  var defaults = {
    DURATION: "short",
    POSITION: "center"
  };

  var message = null;
  var duration = defaults.DURATION + ""; // clone value only
  var position = defaults.POSITION + ""; //

  return {
    withMessage: function(m) {
      message = m;
      return this;
    },

    withDuration: function(d) {
      duration = d;
      return this;
    },

    withPosition: function(p) {
      position = p;
      return this;
    },

    build: function() {
      return {
        message: message,
        duration: duration || defaults.DURATION,
        position: position || defaults.POSITION
      }
    }
  }
};

/**
 * Toast.POSITION
 *    defines the default toast position.
 *
 *    Allowed string values:
 *      - "top"
 *      - "center"
 *      - "bottom"
 * */

Toast.prototype.POSITION = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
};

/**
 * Toast.DURATION:
 *    defines the default toast duration
 *
 *    Allowed string values:
 *      - "short"
 *      - "long"
 * */

Toast.prototype.DURATION = {
  SHORT: "short",
  LONG: "long"
};

Toast.prototype.showWithOptions = function (options, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Toast", "show", [options]);
};

Toast.prototype.show = function (message, duration, position, successCallback, errorCallback) {
  this.showWithOptions(
     this.optionsBuilder()
        .withMessage(message)
        .withDuration(duration)
        .withPosition(position)
        .build(),
     successCallback,
     errorCallback);
};

Toast.prototype.showShortTop = function (message, successCallback, errorCallback) {
  this.show(message, "short", "top", successCallback, errorCallback);
};

Toast.prototype.showShortCenter = function (message, successCallback, errorCallback) {
  this.show(message, "short", "center", successCallback, errorCallback);
};

Toast.prototype.showShortBottom = function (message, successCallback, errorCallback) {
  this.show(message, "short", "bottom", successCallback, errorCallback);
};

Toast.prototype.showLongTop = function (message, successCallback, errorCallback) {
  this.show(message, "long", "top", successCallback, errorCallback);
};

Toast.prototype.showLongCenter = function (message, successCallback, errorCallback) {
  this.show(message, "long", "center", successCallback, errorCallback);
};

Toast.prototype.showLongBottom = function (message, successCallback, errorCallback) {
  this.show(message, "long", "bottom", successCallback, errorCallback);
};

Toast.prototype.hide = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Toast", "hide", []);
};

Toast.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.toast = new Toast();
  return window.plugins.toast;
};

cordova.addConstructor(Toast.install);