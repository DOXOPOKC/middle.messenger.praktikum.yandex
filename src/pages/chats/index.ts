import Block from '../../core/block';
import {render} from '../../utils';
import {template} from './template';
import {Dropdown, Sidebar} from '../../components';

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

const sidebar = new Sidebar({
  classNames: 'sidebar',
});

class Chats extends Block {
  constructor() {
    super('div', {
      classNames: 'chats',
      sidebar,
      topDropdown,
      bottomDropdown,
      events: {
        click: (e: Event) => {
          e.preventDefault();

          if (e.target?.className === 'dropdown__image image') {
            const dropdown = e.target.parentNode;
            const dropdownList = dropdown.nextElementSibling;

            if (dropdownList.style.display) {
              dropdownList.style.display = dropdownList.style.display === 'none' ? 'block' : 'none';
            } else {
              dropdownList.style.display = 'block'
            }
          }
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
