(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.OctobluDeviceSchemaTransmogrifier = require('octoblu-device-schema-transmogrifier/src/transmogrifier')(window._);

},{"octoblu-device-schema-transmogrifier/src/transmogrifier":2}],2:[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = (function(_this) {
  return function(_) {
    var OctobluDeviceSchemaTransmogrifier;
    OctobluDeviceSchemaTransmogrifier = (function() {
      function OctobluDeviceSchemaTransmogrifier(device1) {
        this.device = device1;
        _this.transmogrify = bind(_this.transmogrify, this);
        if (this.device == null) {
          throw new Error('Someone tried to transmogrify an undefined device! Stop doing that.');
        }
      }

      OctobluDeviceSchemaTransmogrifier.prototype.transmogrify = function() {
        var device, messageSchema;
        device = _.cloneDeep(this.device);
        if (_.get(device, 'schemas.version') === '1.0.0') {
          return device;
        }
        messageSchema = device.messageSchema;
        delete device.messageSchema;
        device.schemas = {
          version: '1.0.0'
        };
        _.set(device, 'schemas.message.default', messageSchema);
        return device;
      };

      return OctobluDeviceSchemaTransmogrifier;

    })();
    return OctobluDeviceSchemaTransmogrifier;
  };
})(this);


},{}]},{},[1]);
