self.addEventListener('message', function (event) {
  self.postMessage({
    portCallerResponseId: event.data.portCallerMessageId,
    value: Math.random()
  });
});