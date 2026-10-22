// localStorage can throw (private mode, blocked site data), so every access is guarded.
export function readStored(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preference simply isn't remembered.
  }
}
