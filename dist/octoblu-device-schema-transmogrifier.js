(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.OctobluDeviceSchemaTransmogrifier = require('octoblu-device-schema-transmogrifier/src/transmogrifier')(window._);

},{"octoblu-device-schema-transmogrifier/src/transmogrifier":2}],2:[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = (function(_this) {
  return function(_) {
    var OctobluDeviceSchemaTransmogrifier;
    OctobluDeviceSchemaTransmogrifier = (function() {
      function OctobluDeviceSchemaTransmogrifier(oldDevice) {
        _this._migrateMessageSchema = bind(_this._migrateMessageSchema, this);
        _this.transmogrify = bind(_this.transmogrify, this);
        if (oldDevice == null) {
          throw new Error('Someone tried to transmogrify an undefined device! Stop doing that.');
        }
        this.device = _.clone(oldDevice);
        this.device.schemas = _.cloneDeep(oldDevice.schemas);
      }

      OctobluDeviceSchemaTransmogrifier.prototype.transmogrify = function() {
        if (_.get(this.device, 'schemas.version') === '1.0.0') {
          return this.device;
        }
        _.set(this.device, 'schemas.version', '1.0.0');
        this._migrateMessageSchema();
        return this.device;
      };

      OctobluDeviceSchemaTransmogrifier.prototype._migrateMessageSchema = function() {
        var base, messageSchema;
        messageSchema = this.device.messageSchema;
        delete this.device.messageSchema;
        if ((base = this.device.schemas).message == null) {
          base.message = [];
        }
        if (_.isArray(messageSchema)) {
          return this.device.schemas.message = messageSchema;
        }
        return this.device.schemas.message.push(messageSchema);
      };

      return OctobluDeviceSchemaTransmogrifier;

    })();
    return OctobluDeviceSchemaTransmogrifier;
  };
})(this);


},{}]},{},[1]);
