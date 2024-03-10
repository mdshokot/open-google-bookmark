chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case "Alt+1":
      openTab(1);
      break;
    case "Alt+2":
      openTab(2);
      break;
    case "Alt+3":
      checkTabAndActivate(
        "https://smart.bm-informatica.it",
        "https://smart.bm-informatica.it/crm/ticket/dettaglio"
      );
      break;
    case "Alt+4":
      checkTabAndActivate("localhost", "http://localhost/crm");
      break;
    default:
  }
});

function openTab(index) {
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    for (const node of bookmarkTreeNodes) {
      if (node.children) {
        const favoriteNode = node.children[0];
        if (favoriteNode.children) {
          const favorites = favoriteNode.children;
          if (favorites.length >= index) {
            chrome.tabs.create({ url: favorites[index - 1].url, active: true });
          }
        }
      }
    }
  });
}

function checkTabAndActivate(urlToCheck, urlToOpen) {
  chrome.tabs.query({}, function (tabs) {
    let found = false;
    tabs.forEach(function (tab) {
      if (tab.url && tab.url.includes(urlToCheck)) {
        found = true;
        chrome.tabs.update(tab.id, { active: true });
        return;
      }
    });
    if (!found) {
      chrome.tabs.create({
        url: urlToOpen,
        active: true,
      });
    }
  });
}
