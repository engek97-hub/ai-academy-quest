/* AI Academy Quest password-input accessibility helper.
   Staging module: include only after verifying the existing login DOM.
   Usage: AAQPasswordHints.attach(document.querySelector('#password'));
*/
window.AAQPasswordHints = {
  attach(input) {
    if (!input || input.dataset.aaqHints) return;
    input.dataset.aaqHints = '1';
    const note = document.createElement('div');
    note.className = 'aaq-password-hint';
    note.setAttribute('role', 'status');
    note.setAttribute('aria-live', 'polite');
    note.style.cssText = 'margin-top:6px;font-size:13px;color:#ffe0a0;min-height:1.3em';
    input.insertAdjacentElement('afterend', note);
    const update = event => {
      const warnings = [];
      if (event && typeof event.getModifierState === 'function' && event.getModifierState('CapsLock')) {
        warnings.push('Caps Lock is ON.');
      }
      if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u.test(input.value)) {
        warnings.push('Arabic characters detected. Switch your keyboard to English if your password uses English letters.');
      }
      note.textContent = warnings.join(' ');
    };
    input.addEventListener('keydown', update);
    input.addEventListener('keyup', update);
    input.addEventListener('input', update);
    input.addEventListener('blur', () => { note.textContent = ''; });
  }
};
