/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { throttle } from './lib/utils';
import './index.scss';

var _default = (_temp = _class = function (_Component) {
    _inherits(_default, _Component);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.windowMouseMove = function () {
            return _this.__windowMouseMove__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.windowMouseDown = function () {
            return _this.__windowMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.tableContainerMouseDown = function () {
            return _this.__tableContainerMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.tableClick = function () {
            return _this.__tableClick__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            show: true,
            tableSize: {
                row: 4,
                col: 4
            },
            selectedTableSize: {
                row: 1,
                col: 1
            }
        };
        //单元格的尺寸
        _this.cellSize = {
            with: 25,
            height: 17
        };
        _this.minTableSize = {
            row: 4,
            col: 4
        };
        _this.handleWindowMouseMove = throttle(_this.windowMouseMove, 10, 40);
        return _this;
    }

    _createClass(_default, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('mousemove', this.handleWindowMouseMove);
            window.addEventListener('mousedown', this.windowMouseDown);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.releaseListener();
        }
    }, {
        key: 'releaseListener',
        value: function releaseListener() {
            window.removeEventListener('mousemove', this.handleWindowMouseMove);
            window.removeEventListener('mousedown', this.windowMouseDown);
        }
    }, {
        key: 'closeTable',
        value: function closeTable() {
            this.releaseListener();
            this.setState({
                show: false
            });
        }
    }, {
        key: '__windowMouseMove__REACT_HOT_LOADER__',
        value: function __windowMouseMove__REACT_HOT_LOADER__(e) {
            var clientX = e.clientX,
                clientY = e.clientY;

            var _refs$table$getBoundi = this.refs.table.getBoundingClientRect(),
                top = _refs$table$getBoundi.top,
                left = _refs$table$getBoundi.left;

            //两件事: 改变表格大小 + 设置被选中的表格

            var xOver = clientX - left,
                yOver = clientY - top;

            //应该的table size
            var shouldCol = Math.ceil(xOver / this.cellSize.with),
                shouldRow = Math.ceil(yOver / this.cellSize.height);

            //实际要展示的table size
            var _col = Math.min(Math.max(shouldCol, this.minTableSize.col), this.props.maxSize.col),
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
        }
    }, {
        key: '__windowMouseDown__REACT_HOT_LOADER__',
        value: function __windowMouseDown__REACT_HOT_LOADER__() {
            this.closeTable();
            this.props.onCancel();
        }
    }, {
        key: '__tableContainerMouseDown__REACT_HOT_LOADER__',
        value: function __tableContainerMouseDown__REACT_HOT_LOADER__(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
    }, {
        key: '__tableClick__REACT_HOT_LOADER__',
        value: function __tableClick__REACT_HOT_LOADER__() {
            this.closeTable();
            this.props.onSelect(this.state.selectedTableSize);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                show = _state.show,
                tableSize = _state.tableSize,
                selectedTableSize = _state.selectedTableSize;


            if (!show) {
                return false;
            }

            var tableStyle = {
                width: tableSize.col * this.cellSize.with + 1,
                height: tableSize.row * this.cellSize.height + 1
            };
            var selectedTableStyle = {
                width: selectedTableSize.col * this.cellSize.with + 1,
                height: selectedTableSize.row * this.cellSize.height + 1
            };

            return React.createElement(
                'div',
                { className: 'select-row-col-container', onMouseDown: this.tableContainerMouseDown },
                React.createElement(
                    'div',
                    { className: 'table-bg', ref: 'table', style: tableStyle, onClick: this.tableClick },
                    React.createElement('div', { className: 'table-selected', style: selectedTableStyle })
                ),
                React.createElement(
                    'div',
                    { className: 'footer' },
                    selectedTableSize.col + ' x ' + selectedTableSize.row
                )
            );
        }
    }]);

    return _default;
}(Component), _class.defaultProps = {
    maxSize: {
        row: 20,
        col: 15
    },
    //选择表格大小后的回调
    onSelect: function onSelect(data) {
        console.log('table selector onSelect: ', data);
    },
    //取消选择后的回调
    onCancel: function onCancel() {
        console.log('table selector onCancel');
    }
}, _temp);

export default _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/index.js');
}();

;