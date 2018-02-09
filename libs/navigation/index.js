import $ from 'jquery'
import { getType, isArray, isBoolean, isRegExp, isString, isUndefined } from '@beautiful-code/type-utils'

export default class Navigation {
	static classes = {
		children: 	'has-children',		
		item:		'menu-item-',
		level: 		'level-',
	}

	$el = null
	config = {
		
	}

	constructor(selector, options){
		this.setElement(selector)
		this._handleOptions(options)
		if(this.hasValidElement){
			this.addMenuClasses()
		}
	}

	_handleOptions = (options) => {

	}

	getElement = () => {
		return this.$el
	}

	setElement = (...args) => {
		let $el
		switch(args.length){
			case 0: throw new Error(`Navigation.setElement() must have at least 1 argument, ${args.length} supplied.`)
			case 1: {
				let unknown = args[0]
				if(unknown instanceof $){
					this.$el = unknown
				} else if(isString(unknown)){
					this.$el = $(unknown)
				}
			} break
			default: throw new Error(`Navigation.setElement() must have no more than 1 arguments, ${args.length} supplied.`)
		}
	}

	hasValidElement = () => {
		return !isUndefined(this.$el) && this.$el.length > 0
	}

	addMenuClasses = () => {
		const $el = this.$el
		const $menu = $el.children('ul')
		this.addMenuClassesToLevel($menu)
	}

	addMenuClassesToLevel = ($root, level = 1) => {
		$root.addClass(`${Navigation.classes.level}${level}`) // .level-1
		$root.attr('data-menu-level', level)

		const $items = $root.children('li')
		$items.each((i, item) => {
			const $item = $(item)
			this._handleTimberClasses($item)

			const itemIndex = i + 1
			$item.addClass(`${Navigation.classes.item}${itemIndex}`) // .menu-item-1
			$item.attr('data-menu-item', itemIndex)

			const $child = $item.children('ul')
			if($child.length > 0){
				$item.addClass(Navigation.classes.children)
				this.addMenuClassesToLevel($child, ++level)
			} 
		})
	}

	_handleTimberClasses = ($el) => {
		this.removeClasses($el, [
			'menu-item', 'menu-item-object-page', 'menu-item-has-children'
		])
		this.replaceClasses($el, [
			this.makeReplacementObject('menu-item-type-post_type', 'type-post'),
			this.makeReplacementObject(/(menu-item-\d+)/g, 'type-post')
		])
	}

	makeReplacementObject(test, replacement){
		return { test, replacement }
	}

	removeClasses($el, classes){
		if(!isArray(classes)) throw new Error(`Navigation.removeClasses() parameter must be of type array, ${getType(classes)} provided.`) 
		classes.map((classToRemove) => {
			$el.removeClass(classToRemove)
		})
	}

	replaceClass($el, test, replacement){
		if(isString(test)){
			if($el.hasClass(test)){
				$el.removeClass(test)
				$el.addClass(replacement)
			}
		} else if(isRegExp(test)){
			const classes = $el.attr('class')
			if(test.test(classes)){
				classes.match(test).map((classToRemove) => {
					this.replaceClass($el, classToRemove, replacement)
				})	
			}
		}
	}

	replaceClasses($el, classes){
		classes.map(({test, replacement}) => {
			this.replaceClass($el, test, replacement)
		})
	}
}