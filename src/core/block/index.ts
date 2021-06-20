import { v4 as makeUUID } from "uuid";
import EventBus from "../eventBus";

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    props: any;
    eventBus: Function;

    private _element: HTMLElement;
    protected readonly template: string;
    private readonly _meta: { tagName: string, props: object };
    private readonly _id: string;

    constructor(tagName: string = "div", template: string, props: any = {
        settings: {
            withInternalID: false
        }
    }) {
        const eventBus: EventBus = new EventBus();
        let proxyProps: object = props

        if (props.settings?.withInternalID) {
            this._id = makeUUID();
            proxyProps = { ...props, __id: this._id }
        }

        this.props = this._makePropsProxy(proxyProps);
        this._meta = { tagName, props };
        this.template = template
        this.eventBus = () => eventBus;

        this._registerEvents();
        this.eventBus().emit(Block.EVENTS.INIT);
    }

    private _registerEvents() {
        this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
      console.log('qwe', this._element);

    }

    private _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
        console.log(oldProps, newProps);
        const needUpdate = this.componentDidUpdate(oldProps, newProps);

        if (needUpdate) {
            this._removeEvents(oldProps);
            this._render();
        }
    }

    private _render(): void {
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду

      console.log(this.getContent());

        this.getContent().innerHTML = this.render();
        this._addEvents();
    }

    private _makePropsProxy(props: object) {
        return new Proxy(props, {
            get: (target: Record<string, unknown>, prop: string) => {
                const value = target[prop];

                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: Record<string, unknown>, prop: string, value: unknown) => {
                const oldProps = { ...target };

                target[prop] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

                return true;
            }
        });
    }

    private _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);

        if (this._id) {
          element.setAttribute("data-id", this._id);
        }

        return element;
    }

    private _addEvents() {
        const { events = {} } = this.props;
        const eventsNames = Object.keys(events);

        if (eventsNames.length) {
            eventsNames.forEach((eventsName) => this._element.addEventListener(eventsName, events[eventsName]));
        }
    }

    private _removeEvents(oldProps: unknown) {
        // @ts-ignore
      const { events = {} } = oldProps;
        const eventsNames = Object.keys(events);

        console.log(eventsNames, events);

        if (eventsNames.length) {
            eventsNames.forEach((eventsName) => this._element.removeEventListener(eventsName, events[eventsName]));
        }
    }

    get element() {
        return this._element;
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    componentDidMount(oldProps: unknown) {}

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return true;
    }

    render(): string {
        return "";
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    getContent() {
        return this.element;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}
