export type SelectableInfo = {
  anchorIndex: number;
  anchorOffset: number;
  focusIndex: number;
  focusOffset: number;
};

export type SelectableProps = {
  onSelect(info: SelectableInfo): void;
};
