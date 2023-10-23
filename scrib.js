javascript: (function () {
  function simulateClickAtEndOfTextNode(textNode) {
    const range = document.createRange();
    range.selectNodeContents(textNode);
    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const rangeRect = range.getBoundingClientRect();
    const endX = rangeRect.right - 5; // Adjust this value to fine-tune the click position
    const endY = rangeRect.bottom;

    const clickTarget = document.elementFromPoint(endX, endY);

    if (clickTarget) {
      clickTarget.dispatchEvent(clickEvent);

      const insElements = document.querySelectorAll("ins");
      const openedEmptyElement = Array.from(insElements).find(
        (el) => el.textContent.trim() === ""
      );

      if (openedEmptyElement) {
        openedEmptyElement.textContent = "*";
      }
    }
  }

  function clickOnLastCharacterAndTypeInEmptyContentEditable(paragraph) {
    const textNodes = [...paragraph.childNodes].filter(
      (node) => node.nodeType === Node.TEXT_NODE
    );

    if (textNodes.length > 0) {
      const lastTextNode = textNodes[textNodes.length - 1];
      simulateClickAtEndOfTextNode(lastTextNode);
    }
  }

  function processParagraphs() {
    const workBody = document.getElementById("work-body");
    let paragraphs = Array.from(workBody.querySelectorAll("p"));

    const scrollInterval = setInterval(function () {
      if (paragraphs.length > 0) {
        const paragraph = paragraphs[0];
        paragraph.scrollIntoView();
        clickOnLastCharacterAndTypeInEmptyContentEditable(paragraph);
        paragraphs = paragraphs.slice(1); // Remove the processed paragraph

        // Scroll down to reveal the next paragraph
        paragraph.scrollIntoView();
      } else {
        clearInterval(scrollInterval);
      }
    }, 0); // Adjust the delay as needed
  }

  processParagraphs();
})();
