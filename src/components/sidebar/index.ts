import Block, {IProps} from '../../core/block';
import {template} from './template';
import ChatsControllerInstance from '../../core/controllers/chats';
import store, {storeEventBus} from '../../store';

export default class Sidebar extends Block {
	constructor(props: IProps) {
		super('aside', props);
	}

	async componentDidMount() {
		super.componentDidMount();

		storeEventBus.on('flow:state-updated', () => {
			const chats = store.get('chats');

			this.setProps({...this.props, chats});
		});

		await ChatsControllerInstance.getAll(true);
	}

	render(newProps = this.props) {
		return template(newProps);
	}
}
