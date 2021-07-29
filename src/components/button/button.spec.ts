import 'jsdom-global/register';
import {expect} from 'chai';
import Button from './index';

declare global {
	interface Window {
		api?: any;
	}
}

describe('check Button', () => {
	it('create button', () => {
		const button = new Button({});
		expect(button.element?.constructor.name).to.eq('HTMLButtonElement');
	});

	it('create button with props', () => {
		const props = {
			text: 'Авторизация',
			events: {
				click: (event: Event) => {
					const element = event.target as HTMLButtonElement;
					element.textContent = 'Click';
					return 'click';
				},
			},
		};
		const button = new Button(props);
		button.element?.click();
		expect(button.element?.textContent).to.eq('Click');
	});
});
