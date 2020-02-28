angular.module("serialGenerator", []);
angular.module("serialGenerator").provider("serialGenerator", function () {
    var _length = 10;
    this.getLength = function () {
        return _length;
    }
    this.setLength = function (length) {
        this._length = length
    }
    this.$get = function () {
        return {
            generate: function () {
                var serial = "";
                while(serial.length < _length) {
                    serial += Math.floor(Math.random() * 64);
                }
                return serial;
            }
        }
    }
})