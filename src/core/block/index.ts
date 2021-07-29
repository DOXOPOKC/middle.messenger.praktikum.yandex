import {v4 as makeUUID} from 'uuid';
import EventBus from '../eventBus';

export interface IProps {
	[key: string]: any;
	events?: Record<string, (event: Event) => unknown>;
}

export default class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	readonly meta: {tagName: string; props: Record<string, unknown>};
	eventBus: () => EventBus;
	props: IProps;
	private _element: HTMLElement | null = null;
	private readonly _id: string;

	constructor(tagName: string, props: IProps) {
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this._id = makeUUID();
		this.meta = {tagName, props};
		this.props = this.makePropsProxy({...props, __id: this._id});
		this.registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private static createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	init(): void {
		this.createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	componentDidMount(): void {}

	componentDidUpdate(): boolean {
		return true;
	}

	render(newProps: IProps): string {
		return '';
	}

	setProps = (nextProps: IProps) => {
		if (!nextProps) {
			return;
		}

		Object.keys(nextProps).forEach((key: string) => {
			this.props[key] = nextProps[key];
		});
	};

	getTemplate(): string {
		return this.element?.outerHTML ?? '';
	}

	getContent(): HTMLElement | null {
		return this.element;
	}

	getUUID() {
		return this._id;
	}

	show() {
		const element = document.querySelector(`[data-id='${this.getUUID()}']`);

		if (element) {
			element.classList.remove('hidden');
		}
	}

	hide() {
		const element = document.querySelector(`[data-id='${this.getUUID()}']`);

		if (element) {
			element.classList.add('hidden');
		}
	}

	private registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private createResources() {
		const {tagName} = this.meta;
		this._element = Block.createDocumentElement(tagName);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidUpdate(oldProps: IProps, props: IProps): void {
		const response = this.componentDidUpdate();
		const nextProps = Object.assign(oldProps, props);

		if (response) {
			const elementInDOM = document.querySelector(`[data-id='${this._id}']`);

			this.eventBus().emit(Block.EVENTS.FLOW_RENDER, nextProps);

			if (elementInDOM) {
				elementInDOM.innerHTML = this.getContent()?.innerHTML;
			}
		}
	}

	private addEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach((eventName: string) => {
			this.element?.addEventListener(eventName, events[eventName]);
		});
	}

	private removeEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach(eventName => {
			this.element?.removeEventListener(eventName, events[eventName]);
		});
	}

	private _render(newProps = this.props) {
		const {classNames, attrs, __id} = this.props;

		this.removeEvents();

		if (__id) {
			this.element?.setAttribute('data-id', this._id);
		}

		if (classNames) {
			classNames.split(' ').forEach((className: string) => {
				this.element?.classList.add(className);
			});
		}

		if (attrs) {
			const attrKeys = Object.keys(attrs);

			attrKeys.forEach((attrKey: string) => {
				this.element?.setAttribute(attrKey, attrs[attrKey]);
			});
		}

		this.addEvents();

		if (this.element) {
			this.element.innerHTML = this.render(newProps);
		}
	}

	private makePropsProxy(props: IProps): IProps {
		return new Proxy(props, {
			get: (target: IProps, prop: string) => {
				const value: any = target[prop];

				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: IProps, prop: string, value: unknown) => {
				const oldProps = {...target};
				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе');
			},
		});
	}

	get element(): HTMLElement | null {
		return this._element;
	}
}
