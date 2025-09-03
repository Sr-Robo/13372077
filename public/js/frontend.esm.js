// eslint-disable-next-line import/no-unresolved
import { codeToHtml } from 'https://esm.sh/shiki@1.1';

const { events } = window.GHOSTKIT;

const copyLabel = 'Copy to Clipboard';
const copiedLabel = 'Copied';

const copyIcon =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8.75" y="8.75" width="10.5" height="10.5" rx="1.25" stroke="currentColor" stroke-width="1.5"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.5H14C14.2761 5.5 14.5 5.72386 14.5 6V8H16V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8V14.5H6C5.72386 14.5 5.5 14.2761 5.5 14V6C5.5 5.72386 5.72386 5.5 6 5.5Z" fill="currentColor"></path></svg>';
const copiedIcon =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5385L11 16L17 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const clipboardButton = `<button class="ghostkit-code-clipboard-button ghostkit-pro-tooltip" aria-label="${copyLabel}">${copyIcon}</button>`;

/**
 * Init code blocks.
 */
async function initCodeBlock() {
	document
		.querySelectorAll('.ghostkit-code:not(.ghostkit-code-ready)')
		.forEach(async ($this) => {
			$this.classList.add('ghostkit-code-ready');

			events.trigger($this, 'prepare.code.gkt');

			const lang = $this.getAttribute('data-language') || 'text';
			const $header = $this.querySelector('.ghostkit-code-header');
			const $pre = $this.querySelector('pre');
			const $code = $this.querySelector('code');

			// Add clipboard button.
			if (
				$this.classList.contains('ghostkit-code-with-clipboard-button')
			) {
				if ($header) {
					$header.insertAdjacentHTML('beforeend', clipboardButton);
				} else {
					$this.insertAdjacentHTML('afterbegin', clipboardButton);
				}
			}

			// Detect theme name.
			let theme = 'github-light';
			Array.from($this.classList).some((className) => {
				if (className.startsWith('is-style-theme-')) {
					theme = className.replace('is-style-theme-', '');
					return true;
				}

				return false;
			});

			const options = {
				lang,
				theme,
			};

			events.trigger($this, 'init.code.gkt', { options });

			const code = await codeToHtml($code?.innerText || '', options);

			if (code) {
				$pre.outerHTML = code;
			}

			events.trigger($this, 'prepared.code.gkt');
		});
}

// We have to run check manually because this script is loaded async.
initCodeBlock();
events.on(document, 'init.blocks.gkt', initCodeBlock);

// Copy code to clipboard.
events.on(document, 'click', '.ghostkit-code-clipboard-button', (e) => {
	const $code = e.delegateTarget.closest('.ghostkit-code');

	if ($code) {
		const code = $code.querySelector('code').innerText;
		// eslint-disable-next-line no-undef
		navigator.clipboard.writeText(code);

		// Update tooltip label.
		e.delegateTarget.innerHTML = copiedIcon;
		e.delegateTarget.setAttribute('aria-label', copiedLabel);
		events.trigger(e.delegateTarget, 'focus');

		clearTimeout($code.gktCodeCopiedTimeout);
		$code.gktCodeCopiedTimeout = setTimeout(() => {
			// Reset tooltip label.
			e.delegateTarget.innerHTML = copyIcon;
			e.delegateTarget.setAttribute('aria-label', copyLabel);

			if (
				e.delegateTarget.matches(':hover') ||
				e.delegateTarget.matches(':focus')
			) {
				events.trigger(e.delegateTarget, 'focus');
			}
		}, 1500);
	}
});
