import Alpine from 'alpinejs'
import lozad from 'lozad'

window.Alpine = Alpine

window.Cookies = Cookies

Alpine.start()

const observer = lozad();
observer.observe();

// const focusmenu = document.querySelector('#focusmenu')
// focusmenu.addEventListener('focusin', () => {
// 	import('./test.js' /* webpackChunkName: "test" */).then(module => {
// 		const initCarousel = module.default;
// 		initCarousel.handler()
// 	});
// })
