import Store from '../core/store';

const initProps = {
  userId: null,
  userInfo: null,
  avatar: null,
  chats: [],
  currentChatId: null,
  currentChat: null,
  messages: [],
  lastMessage: null,
};

const store = Store.getInstance(initProps);

export default store;
export const storeEventBus = store.eventBus();
