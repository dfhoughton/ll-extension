chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case 'wake-up':
      wakeUp();
      break;
  }
});

// just notify the active tab that it should attend to things
function wakeUp() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, true, function(response){});
  });
}