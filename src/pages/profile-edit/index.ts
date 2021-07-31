import Block from '../../core/block';
import {Button, Dialog, Form, Input, Sidebar} from '../../components';
import UserController from '../../core/controllers/users';
import {storeEventBus} from '../../store';
import {template} from './template';
import router from '../../core';

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
const emailField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'email',
	type: 'email',
	label: 'Почта',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const loginField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'login',
	type: 'text',
	label: 'Логин',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const firstNameField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'first_name',
	type: 'text',
	label: 'Имя',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const lastNameField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'second_name',
	type: 'text',
	label: 'Фамилия',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const userNameField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'display_name',
	type: 'text',
	label: 'Имя в чате',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const phoneField = new Input({
	isRow: true,
	required: true,
	classNames: 'input',
	name: 'phone',
	type: 'phone',
	label: 'Телефон',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const fields = [
	emailField,
	loginField,
	firstNameField,
	lastNameField,
	userNameField,
	phoneField,
];
const form = new Form({
	isRow: true,
	classNames: 'form',
	firstBtn,
	fields,
	settings: {withInternalID: true},
});
const button = new Button({
	classNames: 'button body-1 text-light',
	text: 'Добавить аватар',
	attrs: {type: 'submit'},
	settings: {withInternalID: true},
});
const avatarInput = new Input({
	isAvatar: true,
	classNames: 'photo',
	name: 'avatar',
	type: 'photo',
	label: 'Выбрать файл на компьютере',
	value: '',
	classes: [],
	messages: [],
	settings: {withInternalID: true},
});
const avatarForm = new Form({
	classNames: 'form',
	title: 'Загрузите файл',
	isRow: false,
	fields: [avatarInput],
	firstBtn: button,
	settings: {withInternalID: true},
});
const dialog = new Dialog({
	classNames: 'dialog',
	hasBackground: false,
	show: false,
	content: avatarForm,
});

const hideDialog = (otherProps = {}) => {
	dialog.setProps({show: false, hasBackground: false, ...otherProps});
	dialog.hide();
};

const showDialog = (otherProps = {}) => {
	dialog.setProps({show: true, hasBackground: true, ...otherProps});
};

export default class Profile extends Block {
	constructor() {
		super('div', {
			classNames: 'profile-page',
			shouldAvatar: true,
			sidebar,
			dialog,
			form,
			events: {
			  change: async e => {
			    const avatar = document.querySelector('input[type="file"]');
			    const fileLabel = document.querySelector('.file-uploader');

			    if (e.target === avatar) {
						const photo = e.target.files[0];

						fileLabel.classList.add('file-label');
						fileLabel.textContent = photo.name;
					}
				},
				click: async (e: Event) => {
					const sidebarButton = document.querySelector('.rounded_button');
					const profileAvatar = document.querySelector('.profile__avatar-wrapper.avatar');
					const avatarButtonElement: HTMLFormElement | null = document.querySelector(`[data-id='${button.getUUID()}']`);
					const avatarFormElement: HTMLFormElement | null = document.querySelector(`[data-id='${avatarForm.getUUID()}']`);
					const dialogBackground = document.querySelector('.blur-background');

					if (e.target === avatarButtonElement) {
						const isValid: boolean = avatarFormElement.checkValidity();

						if (!isValid) {
							dialog.setProps({messages: ['Нужно выбрать файл']});
							this.setProps({dialog});
						}
					}

					if (e.target === dialogBackground) {
						hideDialog();
						this.setProps({dialog: null});
					}

					if (e.target === profileAvatar) {
						showDialog();
						this.setProps({dialog});
					}

					if (e.target === sidebarButton) {
						router().go('/profile');
					}
				},
				submit: async (e: Event) => {
					e.preventDefault();

					const formElement: HTMLFormElement | null = document.querySelector(`[data-id='${form.getUUID()}']`);
					const avatarFormElement: HTMLFormElement | null = document.querySelector(`[data-id='${avatarForm.getUUID()}']`);
					const formTitle: HTMLFormElement | null = document.querySelector('.form__title.title');

					if (e.target === avatarFormElement) {
						const formdata = new FormData(e.target as HTMLFormElement);

						try {
							await UserController.updateAvatar(formdata);
						} catch (error: Error) {
							formTitle.classList.add('text-error');
							console.log(error);
						}
					}

					if (e.target === formElement) {
						const data = new FormData(formElement);
						const requestData: Record<string, string> = Object.fromEntries(data);

						Object.keys(requestData).forEach(field => {
							if (!requestData[field]) {
								delete requestData[field];
							}
						});

						await UserController.changeUserProfile(requestData);

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
			fields.forEach((field => {
				field.setProps({value: user[field.props.name]});
			}));
		}
	}

	render() {
		return template(this.props);
	}
}
