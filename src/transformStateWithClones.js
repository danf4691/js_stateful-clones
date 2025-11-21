'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copy, action.extraData, stateHistory);
        break;

      case 'removeProperties':
        removeProperties(copy, action.keysToRemove, stateHistory);
        break;

      case 'clear':
        clearProperties(copy, stateHistory);
        break;
    }
  }

  return stateHistory;
}

function addProperties(copy, extraData, stateHistory) {
  for (const key in extraData) {
    copy[key] = extraData[key];
  }

  return stateHistory.push({ ...copy });
}

function removeProperties(copy, keysToRemove, stateHistory) {
  for (const key of keysToRemove) {
    delete copy[key];
  }

  return stateHistory.push({ ...copy });
}

function clearProperties(copy, stateHistory) {
  for (const key in copy) {
    delete copy[key];
  }

  return stateHistory.push({ ...copy });
}

module.exports = transformStateWithClones;
