// Old links used HashRouter (/words/#/slug); turn them into /words/slug.
export function legacyHashRedirect(location: Location, history: History, base: string): void {
  if (location.hash.startsWith('#/')) {
    history.replaceState(null, '', base + location.hash.slice(2));
  }
}
