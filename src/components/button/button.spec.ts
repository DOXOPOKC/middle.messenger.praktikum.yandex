import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Button from './index';

describe('check Button', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
        <body>
        </body>
      </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });

  it('create button', () => {
    const button = new Button({});
    expect(button.element.constructor.name).to.eq('HTMLButtonElement');
  });

  it('create button with props', () => {
    const props = {
      text: 'Авторизация',
      events: {
        click: (event: Event) => {
          event.target.textContent = 'Click';
          return 'click';
        },
      },
    };
    const button = new Button(props);
    button.element.click();
    expect(button.element.textContent).to.eq('Click');
  });
});
