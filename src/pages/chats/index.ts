import Block from '../../core/block';
import {render} from '../../utils';
import {template} from './template';
import {Dropdown} from '../../components';

import verticalDotsIcon from "url:../../assets/icons/vertical-dots.svg";
import attachIcon from "url:../../assets/icons/attach.svg";
import appendIcon from "url:../../assets/icons/append.svg";
import deleteIcon from "url:../../assets/icons/delete.svg";


const topDropdown = new Dropdown({
  classNames: 'dropdown dropdown_right dropdown_top',
  id: 'controls-dropdown',
  icon: verticalDotsIcon,
  actions: [
    {icon: appendIcon, text: 'qwe'},
    {icon: deleteIcon, text: 'ewq'},
  ]
});

const bottomDropdown = new Dropdown({
  classNames: 'dropdown dropdown_left dropdown_bottom',
  id: 'controls-dropdown',
  icon: attachIcon,
  actions: [
    {icon: appendIcon, text: 'qwe'},
    {icon: deleteIcon, text: 'ewq'},
  ]
});

class Chats extends Block {
  constructor() {
    super('div', {
      classNames: 'chats',
      topDropdown,
      bottomDropdown,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          console.log(e);

          if (e.target.className === 'dropdown__label') {}
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}

const page = new Chats();

render('.app', page);
