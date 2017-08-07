/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';
import React, {Component} from 'react';
import {throttle} from './lib/utils';
import './index.scss';

export default class extends Component{
    static defaultProps = {
        maxSize: {
            row: 20,
            col: 15
        },
        //选择表格大小后的回调
        onSelect: (data) => {
            console.log('table selector onSelect: ',data);
        },
        //取消选择后的回调
        onCancel: () => {
            console.log('table selector onCancel');
        }
    };

    constructor(){
        super();
        this.state = {
            show: true,
            tableSize:{
                row: 4,
                col: 4
            },
            selectedTableSize: {
                row: 1,
                col: 1
            }
        };
        //单元格的尺寸
        this.cellSize = {
            with: 25,
            height: 17
        };
        this.minTableSize = {
            row: 4,
            col: 4
        };
        this.handleWindowMouseMove = throttle(this.windowMouseMove, 10, 40);
    }

    componentDidMount(){
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mousedown', this.windowMouseDown);
    }

    componentWillUnmount(){
        this.releaseListener();
    }

    releaseListener(){
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        window.removeEventListener('mousedown', this.windowMouseDown);
    }

    closeTable(){
        this.releaseListener();
        this.setState({
            show: false
        });
    }

    windowMouseMove = (e) => {
        let {clientX, clientY} = e;
        let {top, left} = this.refs.table.getBoundingClientRect();

        //两件事: 改变表格大小 + 设置被选中的表格

        let xOver = clientX - left, yOver = clientY - top;

        //应该的table size
        let shouldCol = Math.ceil(xOver/this.cellSize.with),
            shouldRow = Math.ceil(yOver/this.cellSize.height);

        //实际要展示的table size
        let _col = Math.min(Math.max(shouldCol, this.minTableSize.col), this.props.maxSize.col),
            _row = Math.min(Math.max(shouldRow, this.minTableSize.row), this.props.maxSize.row);

        this.setState({
            tableSize: {
                row: _row,
                col: _col
            },
            selectedTableSize: {
                row: Math.max(1, Math.min(shouldRow, this.props.maxSize.row)),
                col: Math.max(1, Math.min(shouldCol, this.props.maxSize.col))
            }
        });
    };

    windowMouseDown = (e) => {
        this.closeTable();
        if(e.target !== this.refs.tableSelect) {
            this.props.onCancel();
        }
    };

    tableContainerMouseDown = (e) => {
        if(e.target !== this.refs.tableSelect) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
    };

    tableSelect = () => {
        this.closeTable();
        this.props.onSelect(this.state.selectedTableSize);
    };


    render(){
        let {show, tableSize, selectedTableSize} = this.state;

        if(!show){
            return false;
        }

        let tableStyle = {
            width: tableSize.col * this.cellSize.with + 1,
            height: tableSize.row * this.cellSize.height + 1
        };
        let selectedTableStyle = {
            width: selectedTableSize.col * this.cellSize.with + 1,
            height: selectedTableSize.row * this.cellSize.height + 1
        };

        return (
            <div className="select-row-col-container" onMouseDown={this.tableContainerMouseDown}>
                <div className="table-bg" ref='table' style={tableStyle} onMouseDown={this.tableSelect}>
                    <div ref="tableSelect" className="table-selected" style={selectedTableStyle}></div>
                </div>
                <div className="footer">{`${selectedTableSize.col} x ${selectedTableSize.row}`}</div>
            </div>
        );
    }
}
