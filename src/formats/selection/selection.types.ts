export type SelectedInfo = {
  anchorIndex: number;
  anchorOffset: number;
  focusIndex: number;
  focusOffset: number;
};

export type SelectionProps = {
  onSelect(info: SelectedInfo): void;
};
