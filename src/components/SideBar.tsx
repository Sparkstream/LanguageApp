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
                <Link to="/" >Translate</Link>
                <Link to="/dailyWord">Daily Word</Link>
            </Menu>
        );
    }
};