function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message || 'changes Applied successfully ✅';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}


document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const select = document.querySelector("select");
  const enteredTitle = document.getElementById("enteredInput");

  // Fetch current tab's title if available and set it as placeholder

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;
    const tab = tabs[0];

    // If the tab is already in a group, get the group title
    if (tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      chrome.tabGroups.get(tab.groupId, (group) => {
        if (enteredTitle) {
          enteredTitle.value = group.title || "";
        }
      });
    } else {
      // If tab not in any group
      enteredTitle.placeholder = "Enter the mnemonic for your tab";
    }
  });


  button?.addEventListener("click", () => {
    const selectedColor = select.value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      const tab = tabs[0];

    chrome.tabs.group({ tabIds: [tab.id] }, (groupId) => {
      if (chrome.runtime.lastError) {
          console.error("Grouping failed:", chrome.runtime.lastError);
          return;
        }

    chrome.tabGroups.update(groupId, {
          color: selectedColor,
          title: enteredTitle.value,
        });
      });
    });

    const prefillTitle = chrome.tabGroups.title;
    console.log(prefillTitle, "line 38");
    showToast("Changes Applied successfully ✅");
  });
});
