import Block, {IProps} from '../../core/block';
import {template} from './template';

export default class Dialog extends Block {
	constructor(props: IProps) {
		super('div', props);
	}

	render(newProps = this.props) {
		return template(newProps);
	}
}
