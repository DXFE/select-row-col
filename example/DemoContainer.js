/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';
import React, {Component} from "react";
import TableSelector from '../src/index';

export default class DemoContainer extends Component{
    render(){
        return (
            <div style={{marginLeft: '200px',marginTop: '50px'}}>
                <TableSelector />
            </div>
        );
    }
}
