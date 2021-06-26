import EventBus from '../eventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus: () => EventBus;
  _element: HTMLElement | null = null;
  readonly meta: { tagName: string, props: Record<string, unknown> }
  props: { [key: string]: any };
  oldProps: { [key: string]: any };

  constructor(tagName: string = 'div', props: {} = {}) {
    const eventBus = new EventBus();
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);
    this.oldProps = {};
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
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

  init(): void {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {
  }

  private _componentDidUpdate(): void {
    const response = this.componentDidUpdate(this.oldProps, this.props);
    if (response) {
      this._componentDidMount();
    }
  }

  componentDidUpdate(oldProps: { [key: string]: any }, newProps: { [key: string]: any }): boolean {
    return true;
  }

  setProps = (nextProps: { [key: string]: any }) => {
    if (!nextProps) {
      return;
    }

    this.oldProps = {...this.props};

    Object.keys(nextProps).forEach(key => {
      this.props[key] = nextProps[key];
    });
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  getTemplate() {
    this._element.innerHTML = this.render();

    return this._element?.outerHTML;
  }

  private addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _render() {
    const { classNames, attrs } = this.props;

    this.removeEvents();

    if (classNames) {
      classNames.split(' ').forEach((className: string) => {
        this._element?.classList.add(className);
      });
    }

    if (attrs) {
      const attrKeys = Object.keys(attrs);

      attrKeys.forEach((attrKey: string) => {
        this._element?.setAttribute(attrKey, attrs[attrKey]);
      });
    }

    this.addEvents();
  }

  render(): void {}

  getContent(): HTMLElement | null {
    return this.element;
  }

  private makePropsProxy(props: object): ProxyHandler<object> {
    return new Proxy(props, {
      get(target: { [key: string]: any }, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Отказано в доступе');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: any }, prop: string, value: any) {
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);

        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  private static createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
