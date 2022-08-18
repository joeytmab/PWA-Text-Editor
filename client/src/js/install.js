const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // triggered events need to be stored here
    window.deferredPrompt = event;

    // remove hidden class from button?
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    
    const installEventPrompt = window.deferredPrompt;

    if (!installEventPrompt) {
        return;
    
    } else {

        installEventPrompt.prompt();
    }

    // once install event is triggered, can only be used once;
    // so, we need to RESET by toggling the button back to hidden

    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
