import {expect} from 'chai';
import Block from './index';

describe('check Block', () => {
	it('create div', () => {
		const block = new Block('div', {});
		expect(block.element.constructor.name).to.eq('HTMLDivElement');
	});

	it('create input', () => {
		const block = new Block('input', {});
		expect(block.element.constructor.name).to.eq('HTMLInputElement');
	});

	it('create with props && click', () => {
		const props = {
			events: {
				click: (event: Event) => {
					event.preventDefault();

					const element = event.target as Node;
					element.textContent = 'Click';
					return 'click';
				},
			},
		};
		const button = new Block('button', props);
		button.element.click();
		expect(button.element.textContent).to.eq('Click');
	});
});
