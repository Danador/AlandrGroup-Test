import Alpine from 'alpinejs'
import mask from '@alpinejs/mask'
import collapse from '@alpinejs/collapse'
import lozad from 'lozad'

window.Alpine = Alpine

Alpine.start()

Alpine.plugin(mask)
Alpine.plugin(collapse)

Alpine.store('bodyLock', false)

const observer = lozad();
observer.observe();

// const focusmenu = document.querySelector('#focusmenu')
// focusmenu.addEventListener('focusin', () => {
// 	import('./test.js' /* webpackChunkName: "test" */).then(module => {
// 		const initCarousel = module.default;
// 		initCarousel.handler()
// 	});
// })
