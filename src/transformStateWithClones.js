'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData, stateHistory);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove, stateHistory);
        break;

      case 'clear':
        clearProperties(stateCopy, stateHistory);
        break;

      default:
        break;
    }
  }

  return stateHistory;
}

function addProperties(stateCopy, extraData, stateHistory) {
  for (const key in extraData) {
    stateCopy[key] = extraData[key];
  }

  stateHistory.push({ ...stateCopy });
}

function removeProperties(stateCopy, keysToRemove, stateHistory) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }

  stateHistory.push({ ...stateCopy });
}

function clearProperties(stateCopy, stateHistory) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
  stateHistory.push({ ...stateCopy });
}

module.exports = transformStateWithClones;
