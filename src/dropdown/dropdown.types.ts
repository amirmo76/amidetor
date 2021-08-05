export type DropdownItem = {
  TYPE: string;
  title: string;
  Icon: () => JSX.Element;
};

export type DropdownProps = {
  items: DropdownItem[];
  onClick?: (type: string) => void;
};
