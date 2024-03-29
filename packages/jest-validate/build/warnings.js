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



const chalk = require('chalk');var _require =





require('./utils');const format = _require.format,logValidationWarning = _require.logValidationWarning,createDidYouMeanMessage = _require.createDidYouMeanMessage,WARNING = _require.WARNING;

const unknownOptionWarning = (
config,
exampleConfig,
option,
options) =>
{
  const didYouMean =
  createDidYouMeanMessage(option, Object.keys(exampleConfig));
  /* eslint-disable max-len */
  const message =
  `  Unknown option ${chalk.bold(`"${option}"`)} with value ${chalk.bold(format(config[option]))} was found.` + (
  didYouMean && ` ${didYouMean}`) +
  `\n  This is probably a typing mistake. Fixing it will remove this message.`;
  /* eslint-enable max-len */

  const comment = options.comment;
  const name = options.title && options.title.warning || WARNING;

  logValidationWarning(name, message, comment);
};

module.exports = {
  unknownOptionWarning };