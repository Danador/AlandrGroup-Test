import { Swiper, Navigation, Autoplay, Parallax } from "swiper"


export default new class HedgehogSwiper {

	constructor() {

		this.swiper = undefined
		this.swiperClass = "hedgehogs"
		this.handler()
	}

	handler() {
		if (!document.querySelector(`.${this.swiperClass}`)) return
		const config = {
			modules: [Navigation, Autoplay, Parallax],
			spaceBetween: 30,
            breakpoints:{
                '1280':{
					slidesPerView: 2,
                    spaceBetween: 40,
                }
            },
			slidesPerView: 'auto',
			loop: true,
			observer: true,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false
			// },
			navigation: {
				nextEl: '.hedgehogs-button-next',
				prevEl: '.hedgehogs-button-prev',
			},
		}

		this.swiper = new Swiper(`.${this.swiperClass}`, config)
	}
}
