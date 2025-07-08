function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message || '✅changes Applied successfully';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}


document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const select = document.querySelector("select");
  const enteredtitle = document.getElementById("enteredInput")

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
          title: enteredtitle.value,
        });
      });
    });

    showToast("Changes Applied successfully ✅");
  });
});
