/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';



const defaultConfig = require('./defaultConfig');

const _validate = (config, options) => {
  let hasDeprecationWarnings = false;

  for (const key in config) {
    if (
    options.deprecatedConfig &&
    key in options.deprecatedConfig &&
    typeof options.deprecate === 'function')
    {
      const isDeprecatedKey = options.deprecate(
      config,
      key,
      options.deprecatedConfig,
      options);


      hasDeprecationWarnings = hasDeprecationWarnings || isDeprecatedKey;
    } else if (hasOwnProperty.call(options.exampleConfig, key)) {
      if (
      typeof options.condition === 'function' &&
      typeof options.error === 'function' &&
      !options.condition(config[key], options.exampleConfig[key]))
      {
        options.error(key, config[key], options.exampleConfig[key], options);
      }
    } else {
      options.unknown &&
      options.unknown(config, options.exampleConfig, key, options);
    }
  }

  return { hasDeprecationWarnings };
};

const validate = (config, options) => {
  _validate(options, defaultConfig); // validate against jest-validate config

  const defaultedOptions = Object.assign(
  {},
  defaultConfig,
  options,
  { title: Object.assign({}, defaultConfig.title, options.title) });var _validate2 =


  _validate(config, defaultedOptions);const hasDeprecationWarnings = _validate2.hasDeprecationWarnings;

  return {
    hasDeprecationWarnings,
    isValid: true };

};

module.exports = validate;