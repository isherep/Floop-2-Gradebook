import React, {Component} from 'react';
import '../css/navTab.css';
import Grades from './grades';


class NavTabDetail extends Component {

   state = {
        visible: false
   }
    render() {
        return (
            <div>
                {this.state.visible ? <Grades/> : null}
            <button onClick={() => {
                this.setState({visible: true})}}>
                <div className="navItems">
                    {this.props.nav.title}
                </div>
            </button>
            </div>
        )
            }
}
export default NavTabDetail;