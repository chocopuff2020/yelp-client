// Generated by CoffeeScript 1.12.1
(function() {
  var Adapter, Less, W, sourcemaps,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Adapter = require('../../adapter_base');

  sourcemaps = require('../../sourcemaps');

  W = require('when');

  Less = (function(superClass) {
    extend(Less, superClass);

    function Less() {
      return Less.__super__.constructor.apply(this, arguments);
    }

    Less.prototype.name = 'less';

    Less.prototype.extensions = ['less'];

    Less.prototype.output = 'css';


    /**
     * LESS has import rules for other LESS stylesheets
     */

    Less.prototype.isolated = false;

    Less.prototype._render = function(str, options) {
      var deferred;
      deferred = W.defer();
      if (options.sourcemap === true) {
        options.sourceMap = true;
      }
      this.engine.render(str, options, function(err, res) {
        var obj;
        if (err) {
          return deferred.reject(err);
        }
        obj = {
          result: res.css,
          imports: res.imports
        };
        if (options.sourceMap && res.map) {
          obj.sourcemap = JSON.parse(res.map);
          return sourcemaps.inline_sources(obj.sourcemap).then(function(map) {
            obj.sourcemap = map;
            return deferred.resolve(obj);
          });
        } else {
          return deferred.resolve(obj);
        }
      });
      return deferred.promise;
    };

    return Less;

  })(Adapter);

  module.exports = Less;

}).call(this);
