import * as NavigationStateUtils from 'NavigationStateUtils'

export const actionTypes = {
  NAVIGATE: 'NAVIGATE',
  NAV_PUSH: 'NAV_PUSH',
  NAV_POP: 'NAV_POP',
  NAV_JUMP_TO_KEY: 'NAV_JUMP_TO_KEY',
  NAV_JUMP_TO_INDEX: 'NAV_JUMP_TO_INDEX',
  NAV_RESET: 'NAV_RESET',
};

const initialNavState = {
  key: 'MainNavigation',
  index: 0,
  children: [
    { key: 'login', title: 'Vote app' }
  ]
}

export default function navigationState(state = initialNavState, action) {
  switch (action.type) {
    case actionTypes.NAV_PUSH:
      if (state.children[state.index].key === (action.state && action.state.key)) return state
      return NavigationStateUtils.push(state, action.state)

    case actionTypes.NAV_POP:
      if (state.index === 0 || state.children.length === 1) return state
      return NavigationStateUtils.pop(state)

    case actionTypes.NAV_JUMP_TO_KEY:
      return NavigationStateUtils.jumpTo(state, action.key)

    case actionTypes.NAV_JUMP_TO_INDEX:
      return NavigationStateUtils.jumpToIndex(state, action.index)

    case actionTypes.NAV_RESET:
      return {
        ...state,
        index: action.index,
        children: action.children
      }

    default:
      return state
  }
}

export function navigatePush(state) {
  state = typeof state === 'string' ? { key: state } : state
  return {
    type: actionTypes.NAV_PUSH,
    state
  }
}

export function navigatePop() {
  return {
    type: actionTypes.NAV_POP
  }
}

export function navigateJumpToKey(key) {
  return {
    type: actionTypes.NAV_JUMP_TO_KEY,
    key
  }
}

export function navigateJumpToIndex(index) {
  return {
    type: actionTypes.NAV_JUMP_TO_INDEX,
    index
  }
}

export function navigateReset(children, index) {
  return {
    type: actionTypes.NAV_RESET,
    index,
    children
  }
}
