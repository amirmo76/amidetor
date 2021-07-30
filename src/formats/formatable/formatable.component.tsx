import React, { useEffect, useState, useRef } from 'react';
import { MenuPosition, SelectionInfo } from './formatable.types';
import './formatable.styles.scss';

/**
 * Given a node element it will tell you what is that node's index
 * in its parent children array
 * @param node the node you want to get the index for
 * @returns the index of the node in it's parent children
 */
export function getNodeIndex(node: Node): number {
  let index: number = 0;
  let currentNode = node;
  while (currentNode.previousSibling !== null) {
    index++;
    currentNode = currentNode.previousSibling;
  }
  return index;
}

const Formatable: React.FunctionComponent = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    leftOffset: 0,
    topOffset: 0,
  });
  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(
    null
  );

  useEffect(() => {
    if (selectionInfo) setShowMenu(true);
    console.log(selectionInfo);
    const selection = window.getSelection();
    if (!selection) return;

    /**
     * Calculate left and top offset of the menu.
     *  */
    let leftOffset = 0;
    let topOffset = 0;

    try {
      let parentLeftOffset = 0;
      let parentTopOffset = 0;
      if (ref.current) {
        parentLeftOffset = ref.current.getBoundingClientRect().left;
        parentTopOffset = ref.current.getBoundingClientRect().top;
      }
      leftOffset =
        selection.getRangeAt(0).getBoundingClientRect().left -
        parentLeftOffset +
        selection.getRangeAt(0).getBoundingClientRect().width / 2;
      topOffset =
        selection.getRangeAt(0).getBoundingClientRect().bottom +
        10 -
        parentTopOffset;
    } catch {
      leftOffset = 0;
      topOffset = 0;
    }

    setMenuPosition((prev) => ({
      ...prev,
      leftOffset: leftOffset,
      topOffset: topOffset,
    }));

    if (!selectionInfo) setShowMenu(false);
  }, [selectionInfo]);

  const mouseUpHandle = () => {
    console.log('mouseup');
    const selection = window.getSelection();
    try {
      const range = selection?.getRangeAt(0);
      console.log('range', range);
      if (!range) {
        setSelectionInfo(null);
        return;
      }
      const { endContainer, endOffset, startContainer, startOffset } = range;
      if (!startContainer.parentNode || !endContainer.parentNode) return;
      const startIndex = getNodeIndex(startContainer.parentNode);
      const endIndex = getNodeIndex(endContainer.parentNode);
      if (startIndex === endIndex && startOffset === endOffset)
        setSelectionInfo(null);
      else
        setSelectionInfo({
          startIndex,
          startOffset,
          endIndex,
          endOffset,
        });
    } catch {
      setSelectionInfo(null);
      return;
    }
  };

  return (
    <div>
      <span
        className="amidetor__formatable-off-menu"
        onClick={() => setShowMenu(false)}
      />
      <div className="amidetor__formatable" ref={ref}>
        <div onMouseUp={mouseUpHandle}>{children}</div>
        {showMenu && (
          <div
            className="amidetor__formatable-menu"
            style={{
              left: menuPosition.leftOffset,
              top: menuPosition.topOffset,
            }}
            role="menu"
          >
            The Format Menu
          </div>
        )}
      </div>
    </div>
  );
};

export default Formatable;