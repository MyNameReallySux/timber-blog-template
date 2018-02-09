

import $ from '@modules/jquery/dist/jquery.slim'

import Parallax from 'parallax-scroll'
import { Luminous } from '@libs/luminous'

import Navigation from '@libs/navigation/index'

let $document = $(document)
let $window = $(window)

$document.ready(() => {
    let menus = {
		primary: new Navigation('.navbar')
	}
	handleStickyElements()
	handleParallax()
	handleLightbox();
})

let resizeTimeout
$window.resize(() => {
	clearTimeout(resizeTimeout)
	resizeTimeout = setTimeout(() => {
		console.log('resized')
	}, 50)
})

let scrollTimeout
$window.scroll(() => {
	handleStickyElements()

	clearTimeout(scrollTimeout)
	scrollTimeout = setTimeout(() => {
		
	}, 50)
})

const handleStickyElements = (customSelectors = []) => {
	let selectors = [
		'.sticky',
		'[data-sticky]',
		...customSelectors
	]

	let $elements = $(selectors.join(', '))
	$elements.each((i, element) => {
		let $element = $(element)
		handleSticky($element, $element.attr('data-sticky') || 0)
	})
	
}

const handleSticky = ($element) => {
	const buffer = 5;
	let offset = $window.scrollTop()
	let position = $element.position().top
	if(offset > position){
		$element.addClass('is-stuck');
	} else {
		$element.removeClass('is-stuck');
	}
}

const handleParallax = () => {
	const parallax = new Parallax('[data-parallax]')
	parallax.animate({
		speed: 0.3
	})
}

const handleLightbox = () => {
	let luminous = []
	$('[data-lightbox]').each((i, item) => {
		let caption = $(item).attr('data-caption')
		let options = { caption }
		luminous = [...luminous, new Luminous(item, options)]
	})
}