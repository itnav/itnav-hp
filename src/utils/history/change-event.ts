export type HistoryChangeType = 'location' | 'fragment' | 'search';

export type HistoryChangeDisc = Omit<HistoryChangeEvent, 'type'>;

export type HistoryChangeListener = (event: HistoryChangeEvent) => void;

export class HistoryChangeEvent {
  readonly oldLocation: Location | undefined;
  readonly newLocation: Location;
  readonly state: any;

  constructor(
    public readonly type: HistoryChangeType,
    dict: Partial<HistoryChangeDisc>
  ) {
    this.oldLocation = dict.oldLocation;
    this.newLocation = dict.newLocation || { ...location };
    this.state = dict.state;
  }
}
