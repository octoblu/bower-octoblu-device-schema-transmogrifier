{_,angular} = window
OctobluDeviceSchemaTransmogrifier = require('octoblu-device-schema-transmogrifier/src/transmogrifier')(_)

angular
.module('octoblu-device-schema-transmogrifier', [])
.constant('octobluDeviceSchemaTransmogrifier', OctobluDeviceSchemaTransmogrifier)
