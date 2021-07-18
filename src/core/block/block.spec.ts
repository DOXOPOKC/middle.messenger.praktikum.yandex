import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Block from './index';

describe('check Block', () => {
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
          event.target.textContent = 'Click';
          return 'click';
        },
      },
    };
    const button = new Block('button', props);
    button.element.click();
    expect(button.element.textContent).to.eq('Click');
  });
});
