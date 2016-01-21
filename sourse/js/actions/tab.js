/*
 * action types
 */

export const SHOW_TAB = 'SHOW_TAB';

/*
 * action creators
 */

export function showTab(name, index) {
  return { type: SHOW_TAB, name, index }
}
