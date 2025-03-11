// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/js/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Logic to handle PWA installation prompt
let deferredPrompt;
const installButton = document.createElement('button');
installButton.classList.add('btn', 'btn-gold', 'btn-install', 'mb-2');
installButton.innerHTML = '<i class="fas fa-download me-1"></i>Install App';
installButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Update UI to show the install button
  installButton.style.display = 'block';
  
  // Add install button to modal
  const modalContent = document.querySelector('#appDownloadModal .modal-body');
  if (modalContent && !document.querySelector('.btn-install')) {
    modalContent.prepend(installButton);
  }
});

installButton.addEventListener('click', (e) => {
  // Hide the install button
  installButton.style.display = 'none';
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

// If app is already installed, add an event listener for appinstalled
window.addEventListener('appinstalled', (evt) => {
  // App is installed, update UI or log analytics
  console.log('Lottery App was installed');
});
