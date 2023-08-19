let _intl;

try {
  if (window.chrome !== undefined) {
    _intl = chrome.i18n;
  } else {
    _intl = browser.i18n;
  }
} catch (err) {
  _intl = {
    getMessage: function (messageName, substitutions) {
      if (substitutions) {
        return substitutions;
      }

      return messageName;
    },
  };
}

function getMessage(messageName, substitutions) {
  return _intl.getMessage(messageName, substitutions);
}

function getKudosButtons() {
  const targetPath =
    "M11 2C9.46007 2 8.181 5.17764 7.22851 7.06319C7.09115 7.33509 6.81055 7.5 6.50592 7.5H4.5C3.39543 7.5 2.5 8.39543 2.5 9.5V15C2.5 16.1046 3.39543 17 4.5 17H13.8013C15.1102 17 16.268 16.1515 16.6621 14.9034L18.1782 10.1023C18.5853 8.81322 17.6231 7.5 16.2713 7.5H13.3099C12.6996 7.5 12.2976 6.8631 12.4903 6.28403C13.4157 3.50356 12.4656 2 11 2Z";

  const svgElements = document.querySelectorAll(
    'svg[viewBox="0 0 20 20"][class="w-full h-full"]'
  );
  const collectedDivs = [];

  const validKudoButtons = svgElements.forEach((svg) => {
    const pathElement = svg.querySelector(`path[d="${targetPath}"]`);
    if (pathElement) {
      const parentDiv = svg.parentNode;
      if (
        parentDiv &&
        parentDiv.tagName === "DIV" &&
        !parentDiv.classList.contains("text-tint-warming")
      ) {
        collectedDivs.push(parentDiv);
      }
    }
  });

  return collectedDivs;
}

function kudoAllHandler(event) {
  event.preventDefault();

  const buttons = getKudosButtons();
  const len = buttons.length;

  if (len < 1) {
    return;
  }

  for (let i = 0; i < len; i++) {
    const item = buttons[i];

    if (!item) {
      continue;
    }
    item.click();
  }
}

const prepareKudoButton = (button) => {
  button.style.marginRight = "15px";

  const classNames = button.className.split(" ");
  const updatedClassNames = classNames.filter(
    (className) => !className.includes("Menu__MenuContainer")
  );

  button.className = updatedClassNames.join(" ");

  button.childNodes.forEach((childNode) => {
    if (childNode.tagName === "DIV" || childNode.tagName === "UL") {
      button.removeChild(childNode);
    }
  });
  const newSvgNode = document.createElement("div");
  newSvgNode.innerHTML = `
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <path d="M11 2C9.46007 2 8.181 5.17764 7.22851 7.06319C7.09115 7.33509 6.81055 7.5 6.50592 7.5H4.5C3.39543 7.5 2.5 8.39543 2.5 9.5V15C2.5 16.1046 3.39543 17 4.5 17H13.8013C15.1102 17 16.268 16.1515 16.6621 14.9034L18.1782 10.1023C18.5853 8.81322 17.6231 7.5 16.2713 7.5H13.3099C12.6996 7.5 12.2976 6.8631 12.4903 6.28403C13.4157 3.50356 12.4656 2 11 2Z" stroke="currentColor" stroke-width="1.5"></path>
    <line x1="6.75" y1="7" x2="6.75" y2="17" stroke="currentColor" stroke-width="1.5"></line>
  </svg>
`;
  button.appendChild(newSvgNode);
  return button;
};

const execute = () => {
  console.log("executing...");

  const messageButton = document.querySelector(
    'div[class*="Menu__MenuContainer"]'
  );
  console.log(`messageButton is:${messageButton}`);

  if (messageButton) {
    const button = document.createElement("div");
    button.className = "flex items-center justify-center w-5 h-5 fNhiOc";
    button.style.transform = "none";
    button.style.marginRight = "15px";

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("viewBox", "0 0 20 20");
    svgElement.setAttribute("fill", "none");
    svgElement.setAttribute("class", "w-full h-full");

    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M11 2C9.46007 2 8.181 5.17764 7.22851 7.06319C7.09115 7.33509 6.81055 7.5 6.50592 7.5H4.5C3.39543 7.5 2.5 8.39543 2.5 9.5V15C2.5 16.1046 3.39543 17 4.5 17H13.8013C15.1102 17 16.268 16.1515 16.6621 14.9034L18.1782 10.1023C18.5853 8.81322 17.6231 7.5 16.2713 7.5H13.3099C12.6996 7.5 12.2976 6.8631 12.4903 6.28403C13.4157 3.50356 12.4656 2 11 2Z"
    );
    pathElement.setAttribute("stroke", "currentColor");
    pathElement.setAttribute("stroke-width", "1.5");
    const lineElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineElement.setAttribute("x1", "6.75");
    lineElement.setAttribute("y1", "7");
    lineElement.setAttribute("x2", "6.75");
    lineElement.setAttribute("y2", "17");
    lineElement.setAttribute("stroke", "currentColor");
    lineElement.setAttribute("stroke-width", "1.5");

    svgElement.appendChild(pathElement);
    svgElement.appendChild(lineElement);
    button.appendChild(svgElement);

    button.addEventListener("click", kudoAllHandler);
    messageButton.parentNode.insertBefore(button, messageButton);
  }
};

let loaded = false;
window.onload = function () {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        !loaded &&
        mutation.type === "childList" &&
        mutation.addedNodes &&
        Array.from(mutation.addedNodes).some((node) =>
          node.className.includes("Menu__MenuContainer")
        )
      ) {
        loaded = true;
        execute();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
