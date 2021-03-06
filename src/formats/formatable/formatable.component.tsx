import React, { useEffect, useState, useRef } from 'react';
import { MenuPosition, FormatableProps } from './formatable.types';
import { SelectionInfo } from '../formatters.types';
import './formatable.styles.scss';
import { refactorChildren, updateSelectionInfo } from '../formatters.utils';

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

const Formatable: React.FunctionComponent<FormatableProps> = ({
  children,
  formatters,
  value,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    leftOffset: 0,
    topOffset: 0,
  });
  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(
    null
  );
  /**
   * make a reselection.
   **/
  useEffect(() => {
    try {
      const selection = window.getSelection();
      if (!selection || !ref.current || !selectionInfo) return;
      const editable = ref.current.childNodes[0].childNodes[0];
      let range = new Range();
      range.setStart(
        editable.childNodes[selectionInfo.startIndex].childNodes[0],
        selectionInfo.startOffset
      );
      range.setEnd(
        editable.childNodes[selectionInfo.endIndex].childNodes[0],
        selectionInfo.endOffset
      );
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    } catch {
      window.getSelection()?.removeAllRanges();
    }
  }, [value, selectionInfo]);

  /**
   * Calculate left and top offset of the menu.
   **/
  useEffect(() => {
    setShowMenu(!!selectionInfo);
    if (!selectionInfo) return;
    const selection = window.getSelection();
    if (!selection) return;

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
  }, [selectionInfo, value]);

  const checkForSelection = () => {
    const selection = window.getSelection();
    try {
      const range = selection?.getRangeAt(0);
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
      else if (
        selectionInfo?.startIndex !== startIndex ||
        selectionInfo?.endIndex !== endIndex ||
        selectionInfo?.endOffset !== endOffset ||
        selectionInfo?.startOffset !== startOffset
      )
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
      {showMenu && (
        <span
          className="amidetor__formatable-off-menu"
          onClick={() => setShowMenu(false)}
        />
      )}
      <div className="amidetor__formatable" ref={ref}>
        <div onMouseUp={checkForSelection} onKeyUp={checkForSelection}>
          {children}
        </div>
        {showMenu && (
          <div
            className="amidetor__formatable-menu"
            style={{
              left: menuPosition.leftOffset,
              top: menuPosition.topOffset,
            }}
            role="menu"
          >
            {formatters.length > 0 ? (
              formatters.map((formatter, i) => (
                <formatter.Component
                  key={i}
                  value={value}
                  onChange={(data) => {
                    if (!selectionInfo) onChange(data);
                    else {
                      const updateBlockSelectionInfo = updateSelectionInfo(
                        data,
                        selectionInfo
                      );
                      const {
                        block: newData,
                        selectionInfo: newSelectionInfo,
                      } = refactorChildren(data, updateBlockSelectionInfo);
                      onChange(newData);
                      setSelectionInfo(newSelectionInfo);
                    }
                  }}
                  selectionInfo={selectionInfo}
                />
              ))
            ) : (
              <p>No Formatter Found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Formatable;
