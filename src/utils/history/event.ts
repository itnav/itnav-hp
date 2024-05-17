import type {
  HistoryChangeDisc,
  HistoryChangeListener,
  HistoryChangeType,
} from './change-event';

export class HistoryEvent {
  private _isBrowser = typeof window !== 'undefined';
  private _history = this._isBrowser ? window.history : void 0;
  private _location = this._isBrowser ? window.location : void 0;

  private _listenerStorage: Partial<
    Record<HistoryChangeType, HistoryChangeListener[]>
  > = {};

  private _currentLocation: Location = { ...this._location! };
  get currentLocation() {
    return this._currentLocation as Readonly<Location>;
  }

  constructor() {
    this._overrideOriginalHistoryActions();
  }

  private _overrideOriginalHistoryActions() {
    const self = this;

    const history = this._history;
    if (!history) return;

    addEventListener('popstate', this._onChangeLocation.bind(self));

    addEventListener('navigate', this._onChangeLocation.bind(self));

    document.addEventListener(
      'astro:after-swap',
      this._onChangeLocation.bind(self),
    );
  }

  private _onChangeLocation(event: Event) {
    const oldLocation = this._currentLocation || ({} as Partial<Location>);
    const newLocation = (this._currentLocation = { ...this._location! });

    const disc = { oldLocation, newLocation, state: (event as any).state };

    this.dispatch('location', disc);

    if (oldLocation.hash !== newLocation.hash) {
      this.dispatch('fragment', disc);
    }

    if (oldLocation.search !== newLocation.search) {
      this.dispatch('search', disc);
    }
  }

  addListener(type: HistoryChangeType, listener: HistoryChangeListener) {
    const storage = this._listenerStorage;
    const listeners = (storage[type] ||= []);
    listeners.push(listener);
  }

  removeListener(type: HistoryChangeType, listener: HistoryChangeListener) {
    const listeners = this._listenerStorage[type];
    if (!listeners) return;

    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  }

  listen(type: HistoryChangeType, listener: HistoryChangeListener) {
    this.addListener(type, listener);
    return () => this.removeListener(type, listener);
  }

  dispatch(type: HistoryChangeType, disc: HistoryChangeDisc) {
    const listeners = this._listenerStorage[type];
    if (!listeners) return;

    const event = { type, ...disc };
    listeners.forEach((listener) => listener(event));
  }
}

export const historyEvent = new HistoryEvent();
