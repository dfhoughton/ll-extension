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
    const msg = 'wake-up';
    chrome.tabs.sendMessage(tabs[0].id, msg, function(response){});
  });
}