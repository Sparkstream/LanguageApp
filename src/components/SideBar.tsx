import * as React from "react";
import { slide as Menu } from "react-burger-menu";
import {Link} from 'react-router-dom';
export default class SideBar extends React.Component<{ pageWrapId: any, outerContainerId: any }> {

    constructor(props: any) {
        super(props);

    }

    public render() {
        return (
            
            <Menu pageWrapId={this.props.pageWrapId} outerContainerId={this.props.outerContainerId}>
                <Link to="/" ><i className="fas fa-language"/> &nbsp;&nbsp;Translate</Link>
                <Link to="/randomWord"><i className="fas fa-question"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Random Word</Link>
                <Link to="/myList"><i className="fas fa-clipboard-list"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Favourite Words</Link>
            </Menu>
        );
    }
};