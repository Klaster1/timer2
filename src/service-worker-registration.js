if ('serviceWorker' in navigator) {
	if (Notification && Notification.permission !== 'granted') {
		Notification.requestPermission()
	}

	const notify = ({
		title = 'Timer says',
		icon = 'src/favicon.ico',
		body,
		onclick = () => {}
	}) => {
		if (Notification && Notification.permission === 'granted') {
			Object.assign(new Notification(title, {
				icon,
				body,
			}), {onclick})
		}
		console.debug(body)
	}

	navigator.serviceWorker.register('service-worker.js')
	.then(reg => {
		reg.onupdatefound = () => {
			const installingWorker = reg.installing

			installingWorker.onstatechange = () => {
				switch (installingWorker.state) {
					case 'installed':
						if (navigator.serviceWorker.controller) {
							notify({
								body: 'New or updated content is available.'
							})
						} else {
							notify({body: 'Content is now available offline!'})
						}
						break
					case 'redundant':
						// notify({body: 'The installing service worker became redundant.'})
						break
				}
			}
		}
	})
	.catch((e) => {
		notify({body: 'Error during service worker registration.'})
		console.error(e)
	})
}