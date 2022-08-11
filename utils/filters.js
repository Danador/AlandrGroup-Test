require('dotenv').config()
const { DateTime } = require('luxon');
const YAML = require('json-to-pretty-yaml');

const characteristicsData = (characteristics, ids) => {
	return characteristics
		.map(i => {
			let arr = []
			i.characteristics.forEach(char => {
				ids && ids.forEach(id => {
					if(id === char.id) {
						arr.push(char)
					}
				})
			})
			return {
				title: i.title,
				type: i.typeId,
				characteristics: arr
			}
		})
		.filter(i => i.characteristics.length > 0)
}

const getCollectionToJson = (products) => {
	let bl = ["redirects", "banner", "sitemap", "api","partners", "home", "forms", "info", "bargaining", "benefits", "contacts", "faqs", "icons", "reviews", "site", "eleventy", "pkg", "tags", "page", "collections", "url", "permalink", "privacy", "delivery", "shipment", ]
	if(!Array.isArray(products)) {
		bl.forEach(i => {
			if(products[i]) {
				delete products[i]
			}
		})
	} else {
		products = products.map(product => product.data)
		products = products.map(product => {
			bl.forEach(i => {
				if(product[i]) {
					delete product[i]
				}
			})
			delete product['permalink']
			Object.keys(product).forEach(i => {
				if(product[i]) {
					!product[i] && delete product[i]
				}
			})
			return product
		})
	}

	return products
}

module.exports = {
	envMODE: (str) => {
		return process.env.MODE !== str
	},
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    htmlDateString: (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat('yyyy-LL-dd');
    },

    // date filter (localized)
    formatDate: function (date, format, locale) {
        locale = locale ? locale : "en";
        return DateTime.fromJSDate(date).toFormat(format, { locale });
    },

    // Add filter for data formatting
    dateIso: date => {
        return DateTime.fromJSDate(date).toISO();
    },

    jsonify: text => {
        return JSON.stringify(text); // E.g. May 31, 2019
    },

	dateYML: date => {
		return date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
	},
    // Strip out html
    algExcerpt: function(text) {
        //first remove code
        text = text.replace(/<code class="language-.*?">.*?<\/code>/sg, '');
        //now remove html tags
        text = text.replace(/<.*?>/g, '');
        //now limit to 5k
        return text.substring(0, 8000); // Algolia's limit to 10K
    },
	img: function(img, options) {
		return img !== undefined ? img.replace('/image/upload', `/image/upload/${options}`) : '/assets/icons/not-found.svg'
	},
	top: function(arr, bool) {
		let boolean = bool !== undefined ? bool : false

		return arr.filter(i => {
			let top = i.top !== undefined ? i.top : false
			return top === boolean
		})
	},
	findSlug: function(arr, key) {
		arr = arr.map(i => i.data)
		let obj = arr.find(i => i.pageKey === key)
		if(obj) {
			if(obj.product) {
				return obj.product.page.fileSlug
			} else {
				return obj.category.page.fileSlug
			}
		}
	},
	sortChars: function(arr) {
		return arr.sort(function (a, b) {
			if (a.title > b.title) {
				return 1;
			}
			if (a.title < b.title) {
				return -1;
			}

			return 0;
		});
	},
	sort: function(arr, collections) {

		if(collections) {
			return arr.sort(function (a, b) {
				if (a.data.sort > b.data.sort) {
					return 1;
				}
				if (a.data.sort < b.data.sort) {
					return -1;
				}

				return 0;
			});
		} else {
			return arr.sort(function (a, b) {
				if (a.sort > b.sort) {
					return 1;
				}
				if (a.sort < b.sort) {
					return -1;
				}

				return 0;
			});
		}
	},
	yaml: function(json) {
		return YAML.stringify(json)
	},

	filterPosts: function(items, ids) {
		return items.filter(i => ids.includes(i.data.id))
	},

	archive: function(p) {
		return p.filter(i => !i.categories)
	},
	products: function(products, id) {
		return products.filter(product => {
			return product.categories ? product.categories.includes(id) : false
		})
	},
	getCollectionToJson: function(products) {
		return getCollectionToJson(products)
	},
	toPhone(phone) {
		if(phone) {
			const arr = phone.replace('+','').split('')
			return `+${arr[0]}(${arr[1]}${arr[2]}${arr[3]})${arr[4]}${arr[5]}${arr[6]}-${arr[7]}${arr[8]}-${arr[9]}${arr[10]}`
		} else {
			return ''
		}
	},
	filterEnabled(links) {
		return links.filter(i => {
			if(i.data.enabled === "false" || i.data.enabled === false) {
				return false
			} else {
				return true
			}
		})
	},
	toPhoneLink(phone) {
		if(phone) {
			return `tel:${phone}`
		} else {
			return ''
		}
	},
	characteristicsOffer: function(characteristics, ids) {
		return characteristicsData(characteristics, ids)
	},
	imageFix: function(arr) {
		return arr.map(item => {
			if(Array.isArray(item.img)) {
				item = item.img.map(i => {
					return {
						img: i,
						description: item.description
					}
				})
				return item
			} else {
				return item
			}
		})
		.flat()
	},
	imageExam: function(arr){
		if (Array.isArray(arr)) {
			return arr
		} else {
			return [ arr ]
		}
	},
	offers: function(products) {
		let offers = []

		products.forEach(item => {
			let obj = Object.assign({}, item)
			obj.offers.length > 0 && obj.offers.forEach(offer => {
				offer.url = obj.url
				offer.images = offer.galleryOffer && offer.galleryOffer.length > 0 ? offer.galleryOffer : obj.images
				offer.images = offer.images.map(i => {
					if(Array.isArray(i.img)) {
						i = i.img.map(i => {
							return {
								img: i,
								description: i.description
							}
						})
						return i
					} else {
						return i
					}
				})
				.flat()
				offers.push(offer)
			})
		})

		return offers
	},
	ifObject: function(obj) {
		return typeof obj === "object"
	},
	catalogFilters: function(characteristics, data) {
		let ids = []
		data.forEach(product => {
			product.offers.forEach(offer => {
				offer.characteristicsId.forEach(i => {
					ids.push(i)
				})
			})
		})

		ids = ids.reduce((result, item) => result.find(v => v == item) ? result : [...result, item], [])

		ids = characteristics.reduce((arr, i) => {
			i.characteristics.forEach(char => {
				ids.forEach(id => {
					if(id === char.id) {
						arr.push(char)
					}
				})
			})
			return arr
		},[])
		let filters = ids
			.map(i => {
				return {
					title: i.title,
					type: i.type,
					filter: i.filter,
					about: i.about
				}
			})
			.filter(i => i.filter)
			.reduce((result, item) => result.find(v => v.title == item.title) ? result : [... result, item], [])

		filters = filters.map(filter => {
			filter.characteristics = ids.filter(i => {
				return i.title === filter.title
			})
			filter.characteristics = filter.characteristics.sort((a, b) => {
				if (a.value > b.value) {
					return 1;
				}
				if (a.value < b.value) {
					return -1;
				}

				return 0;
			})
			return filter
		})
		return filters
	},
	productOptions: function(product, fields, characteristics) {
		return product.optionsId !== undefined && product.optionsId.map(item => {
			let { title } = fields.map(i => i.data).find(i => i.page.fileSlug === item.toString())
			let arr = []
			product.offers.forEach(offer => {
				characteristicsData(characteristics, offer.characteristicsId).forEach(group => {
					let obj = group.characteristics.find(i => i.typeId.toString() === item.toString())

					obj !== undefined && arr.push({
						code: offer.code,
						...obj
					})
				})
			})

			arr = arr.reduce((result, item) => result.find(v => v.id == item.id) ? result : [...result, item], [])
			return {
				title: title,
				options: arr
			}
		})
	},
	getBrand: function(brands, id) {
		let brand = brands.find(i => i.data.id === id)
		return brand ? brand : false
	},
	getProducts: (products, ids) => {
		let arr = []
		if(ids && ids.length) {
			ids.forEach(item => {
				let element = products.find(i => i.id === item)
				element !== undefined && arr.push(element)
			})
		}

		return arr
	},
	dateText: function(date) {
		return date.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
	},
	getDataJson: function(data) {
		return data.map(i => i.data)
	}
}
