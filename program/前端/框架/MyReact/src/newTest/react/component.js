import {
    renderComponent
} from '../react-dom/diff'
class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }

    setState(newState) {
        // 将修改合并到state
        Object.assign(this.state, newState);
        renderComponent(this);
    }
}
export default Component;