/// <reference types="cypress" />

type setSelectionParam = {
  query: string;
  offset: number;
};

export function getTextNode(el: Element, match: string) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  if (!match) {
    return walk.nextNode();
  }

  let node: Node | null;
  while ((node = walk.nextNode())) {
    if (node.textContent?.includes(match)) {
      return node;
    }
  }
  return null;
}

export function setSelection(
  query: string,
  start: setSelectionParam,
  end: setSelectionParam
) {
  cy.get(query)
    .trigger('mousedown')
    .then(($el) => {
      const el = $el[0];
      const document = el.ownerDocument;
      const range = document.createRange();
      const anchorNode = getTextNode($el[0], start.query);
      const focusNode = getTextNode($el[0], end.query);
      range.selectNodeContents(el);
      if (anchorNode) range.setStart(anchorNode, start.offset);
      if (focusNode) range.setEnd(focusNode, end.offset);
      document.getSelection()?.removeAllRanges();
      document.getSelection()?.addRange(range);
    })
    .trigger('mouseup');
  cy.document().trigger('selectionchange');
  return cy.get(query);
}
