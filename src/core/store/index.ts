import Block, { IProps } from '../../core/block';
import EventBus from '../eventBus';
import { cloneDeep } from '../../utils';

class Store {
  private static instance: Store;
  public props: IProps = <IProps>{};
  state: Record<string, any>;
  eventBus: () => EventBus;

  static EVENTS = {
    FLOW_SU: 'flow:state-updated',
  };

  constructor(props: IProps) {
    const eventBus = new EventBus();

    this.state = this.makePropsProxy(props);
    this.eventBus = () => eventBus;
  }

  public static getInstance(props): Store {
    if (!Store.instance) {
      Store.instance = new Store(props);
    }

    return Store.instance;
  }

  private makePropsProxy(props: IProps): ProxyHandler<IProps> {
    return new Proxy(props, {
      get: (target: IProps, prop: string) => {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: IProps, prop: string, value: unknown) => {
        target[prop] = value;
        this.eventBus().emit(Store.EVENTS.FLOW_SU, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  set(prop: string, data: unknown): void {
    this.state[prop] = data;
  }

  get(prop: string): unknown {
    return this.state[prop];
  }

  clear(): void {
    const iniIProps = {
      userId: null,
      userInfo: null,
      avatar: null,
      chats: [],
      currentChatId: null,
      currentChat: null,
      messages: [],
      lastMessage: null,
    };

    this.state = this.makePropsProxy(iniIProps);
  }
}

export default Store;