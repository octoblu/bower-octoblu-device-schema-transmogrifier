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
        _this._getFormMessageSchemaPortion = bind(_this._getFormMessageSchemaPortion, this);
        _this._getMessageSchema = bind(_this._getMessageSchema, this);
        _this._getFormSchema = bind(_this._getFormSchema, this);
        _this._getConfigureSchema = bind(_this._getConfigureSchema, this);
        _this.migratedSchemas = bind(_this.migratedSchemas, this);
        _this.transmogrify = bind(_this.transmogrify, this);
        if (this.device == null) {
          throw new Error('Someone tried to transmogrify an undefined device! Stop doing that.');
        }
      }

      OctobluDeviceSchemaTransmogrifier.prototype.transmogrify = function() {
        var device;
        if (_.get(this.device, 'schemas.version') === '1.0.0') {
          return _.cloneDeep(this.device);
        }
        if (_.get(this.device, 'schemas.version') === '2.0.0') {
          return _.cloneDeep(this.device);
        }
        device = this.migratedSchemas(this.device);
        return _.omit(device, 'messageSchema', 'messageFormSchema', 'optionsSchema');
      };

      OctobluDeviceSchemaTransmogrifier.prototype.migratedSchemas = function(device) {
        device = _.cloneDeep(device);
        return _.assign(device, {
          schemas: {
            version: '1.0.0',
            message: this._getMessageSchema(device),
            configure: this._getConfigureSchema(device),
            form: this._getFormSchema(device)
          }
        });
      };

      OctobluDeviceSchemaTransmogrifier.prototype._getConfigureSchema = function(device) {
        if (_.isEmpty(device.optionsSchema)) {
          return {};
        }
        return {
          "default": {
            type: 'object',
            properties: {
              options: device.optionsSchema
            }
          }
        };
      };

      OctobluDeviceSchemaTransmogrifier.prototype._getFormSchema = function(device) {
        if (_.isEmpty(device.messageFormSchema)) {
          return {};
        }
        return {
          message: {
            "default": {
              angular: device.messageFormSchema
            }
          }
        };
      };

      OctobluDeviceSchemaTransmogrifier.prototype._getMessageSchema = function(device) {
        if (_.isEmpty(device.messageSchema)) {
          return {};
        }
        return {
          "default": _.assign({}, device.messageSchema, this._getFormMessageSchemaPortion(device))
        };
      };

      OctobluDeviceSchemaTransmogrifier.prototype._getFormMessageSchemaPortion = function(device) {
        if (!device.messageFormSchema) {
          return {};
        }
        return {
          'x-form-schema': {
            angular: 'message.default.angular'
          }
        };
      };

      return OctobluDeviceSchemaTransmogrifier;

    })();
    return OctobluDeviceSchemaTransmogrifier;
  };
})(this);


},{}]},{},[1]);
