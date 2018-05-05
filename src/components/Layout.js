import React, {Component} from 'react';
import MainRoutes from '../containers/MainRoutes';
import { withRouter } from 'react-router-dom';
import {Icon} from "react-font-awesome-5";

class Layout extends Component{

    goBack = () => {
        this.props.history.push("/");
    }
    render(){
        return(
            <div className="layout">
                <div className="top-nav">
                {this.props.history.location.pathname === "/" ? <div /> : <div className="menu-item" onClick={() => this.goBack()}><Icon.AngleLeft color="#238569"/> Back</div>
}
                                    </div>
                <div className="main">
                    <MainRoutes />
                </div>
                <div className="footer">
                    Created by Ronja Knudtsen with React
                </div>
            </div>  
        );
    }
    
}
export default withRouter(Layout);