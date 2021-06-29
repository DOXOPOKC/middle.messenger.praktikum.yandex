import {v4 as makeUUID} from 'uuid';
import EventBus from '../eventBus';
import {cloneDeep} from '../../utils';

export interface IProps {
  [key: string]: any
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  private readonly _id: string;
  readonly meta: { tagName: string, props: Record<string, unknown> }
  eventBus: () => EventBus;
  props: ProxyHandler<IProps>;

  constructor(tagName: string = 'div', props: IProps) {
    const eventBus = new EventBus();

    this._id = makeUUID();

    props = this.templateAdapter(props);

    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy({...props, __id: this._id});
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private static createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private templateAdapter(props: IProps) {
    const propsKeys = Object.keys(props);

    if (propsKeys.length) {
      for (const propKey in props) {
        if (props.hasOwnProperty(propKey)) {
          if (props[propKey] instanceof Block) {
            props[propKey] = props[propKey].getTemplate();
          } else if (props[propKey] instanceof Array) {
            props[propKey] = props[propKey].map((prop: Block | unknown) => prop instanceof Block ? prop.getTemplate() : prop);
          }
        }
      }
    }

    return props;
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

  componentDidMount(): void {}

  private _componentDidUpdate(oldProps: IProps, props: IProps): void {
    const response = this.componentDidUpdate(oldProps, props);

    if (response && props?.__id === this._id) {
      const elementInDOM = document.querySelector(`[data-id='${this._id}']`);

      this.eventBus().emit(Block.EVENTS.FLOW_RENDER, props);

      if (elementInDOM) {
        elementInDOM.innerHTML = this.getTemplate();
      }
    }
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    return true;
  }

  private addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
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

  render(newProps: IProps): string {
    return '';
  }

  private makePropsProxy(props: object): ProxyHandler<IProps> {
    return new Proxy(props, {
      get: (target: IProps, prop: string) => {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: IProps, prop: string, value: unknown) => {
        const oldProps = cloneDeep(target);

        target = this.templateAdapter(target);
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.keys(nextProps).forEach(key => {
      this.props[key] = nextProps[key];
    });
  };

  getTemplate(): string {
    return this.element?.outerHTML || '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  show() {
    if (this.element) {
      this.element.classList.add('visible');
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.add('hidden');
    }
  }

  get element(): HTMLElement | null {
    return this._element;
  }
}
