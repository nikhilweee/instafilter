function searchInShadowDOM(element) {
  // Check if the element has a shadow DOM
  let shadowRoot = null;
  try {
    shadowRoot = chrome.dom.openOrClosedShadowRoot(element);
  } catch (error) {
    // silence errors
  }

  // If yes, search for the sponsored tag
  if (shadowRoot) {
    const sponsored = shadowRoot.querySelector("img[alt='Sponsored']");
    if (sponsored) {
      // If yes, dim the search result
      const parent = shadowRoot.host.closest("li");
      parent.style = "opacity: 0.25";
    }
  }

  // Recursively search children
  element.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      searchInShadowDOM(child);
    }
  });
}

function removeSponsored() {
  searchInShadowDOM(document.body);
}

// Run every five seconds
setInterval(removeSponsored, 5000);
