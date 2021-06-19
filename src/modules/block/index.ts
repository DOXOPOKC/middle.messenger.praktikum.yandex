import EventBus from "./event-bus.ts";

// Нельзя создавать экземпляр данного класса
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _element: HTMLElement;
  private _meta: { tagName: string, props: object };

  props: object;
  eventBus: Function;

  constructor(tagName = "div", props = {}) {
    const eventBus = EventBus;

    console.log(eventBus);

    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

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
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps: unknown) {}

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const needUpdate = this.componentDidUpdate(oldProps, newProps);

    if (!needUpdate) {
      this._render();
    }
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду

    this._element.innerHTML = block;
  }

    // Переопределяется пользователем. Необходимо вернуть разметку
  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: object) {
    // Еще один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    // Здесь вам предстоит реализовать метод
    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        console.log(target);
        
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);

        return true;
      }
    });
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
