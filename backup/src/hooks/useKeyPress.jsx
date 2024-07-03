import { useEffect, useState } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {Boolean} ctrlKey - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key,action) {


  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === key.key && e.ctrlKey == key.ctrl && e.altKey == key.alt && e.shiftKey == key.shift) action()
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}