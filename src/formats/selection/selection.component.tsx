import React, { useState } from 'react';
import { SelectedInfo, SelectionProps } from './selection.types';

export function getNodeIndex(node: Node): number {
  let index: number = 0;
  let currentNode = node;
  while (currentNode.previousSibling !== null) {
    index++;
    currentNode = currentNode.previousSibling;
  }
  return index;
}

const Selection: React.FunctionComponent<SelectionProps> = ({
  children,
  onSelect,
}) => {
  const [mouseDownStartedHere, setMouseDownStartedHere] = useState(false);

  const mouseDownHandle = () => {
    setMouseDownStartedHere(true);
  };

  const mouseUPHandle = () => {
    const selection = window.getSelection();
    if (!mouseDownStartedHere) return;
    if (!selection || !selection.anchorNode || !selection.focusNode) return;
    setMouseDownStartedHere(false);
    const { anchorNode, focusNode, anchorOffset, focusOffset } = selection;
    const anchorIndex = anchorNode.parentNode
      ? getNodeIndex(anchorNode.parentNode)
      : 0;
    const focusIndex = focusNode.parentNode
      ? getNodeIndex(focusNode.parentNode)
      : 0;
    const info: SelectedInfo = {
      anchorIndex,
      focusIndex,
      anchorOffset,
      focusOffset,
    };
    onSelect(info);
  };

  return (
    <div onMouseUp={mouseUPHandle} onMouseDown={mouseDownHandle}>
      {children}
    </div>
  );
};

export default Selection;
