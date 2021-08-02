import Block from '../../core/block';
import {Button, Form, Input, Sidebar} from '../../components';
import {template} from './template';
import UserController from '../../core/controllers/users';
import router from '../../core';
import {storeEventBus} from '../../store';

const firstBtn = new Button({
	classNames: 'button body-1 text-light button_profile',
	text: 'Сохранить',
	attrs: {type: 'submit'},
	settings: {withInternalID: true},
});

const sidebar = new Sidebar({
	mini: true,
	classNames: 'sidebar sidebar_mini',
});

const oldPasswordField = new Input({
	isRow: true,
	classNames: 'input',
	name: 'oldPassword',
	type: 'password',
	label: 'Старый пароль',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});

const newPasswordField = new Input({
	isRow: true,
	classNames: 'input',
	name: 'newPassword',
	type: 'password',
	label: 'Новый пароль',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});

const repeatPasswordField = new Input({
	isRow: true,
	classNames: 'input',
	name: 'repeatPassword',
	type: 'password',
	label: 'Повторите новый пароль',
	value: '',
	classes: [],
	settings: {withInternalID: true},
});

const fields = [
	oldPasswordField,
	newPasswordField,
	repeatPasswordField,
];

const formProps = {
	isRow: true,
	classNames: 'form',
	firstBtn,
	fields,
	settings: {withInternalID: true},
};

const form = new Form(formProps);

export default class Profile extends Block {
	constructor() {
		super('div', {
			classNames: 'profile-page',
			shouldAvatar: false,
			sidebar,
			form,
			events: {
				click: async (e: Event) => {
					const sidebarButton = document.querySelector('.rounded_button');

					if (e.target === sidebarButton) {
						router().go('/profile');
					}
				},
				submit: async (e: Event) => {
					const formElement: HTMLInputElement | null = document.querySelector(`[data-id='${form.getUUID()}']`);

					e.preventDefault();

					if (e.target === formElement) {
						const data = new FormData(formElement);

						await UserController.changePassword(Object.fromEntries(data.entries()));

						router().go('/profile');
					}
				},
			},
		});
	}

	async componentDidMount() {
		storeEventBus.on('flow:state-updated', async state => {
			this.setProps({avatar: state.user.avatar});
		});

		const user = await UserController.getUser(true);

		if (user) {
			this.setProps({avatar: user.avatar, title: user.first_name});

			fields.forEach((field => {
				field.setProps({value: user[field.props.name]});
			}));
		}
	}

	render() {
		return template(this.props);
	}
}
