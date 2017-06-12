import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import React, { Component } from 'react';
import _ from 'lodash';
import Table from '../../src';
import Section from '../Section';
import styles from '../index.styl';

export default class extends Component {

    state = {
        selectionData: [
            { id: 1, checked: true, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
            { id: 2, checked: false, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
            { id: 3, checked: false, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
            {
                id: 4,
                checked: false,
                eventType: 'Test long long long long long long long long long long long long long long long long content',
                affectedDevices: 15,
                detections: 598
            },
            { id: 5, checked: false, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
            { id: 6, checked: false, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
        ]
    };

    actions = {
        handleClickRow: (record, index, e) => {
            const checked = record.checked;
            const data = this.state.selectionData.map(item => {
                if (record.id === item.id) {
                    return {
                        ...item,
                        checked: !checked
                    };
                }
                return item;
            });

            this.setState({ selectionData: data });
            e.stopPropagation();
            e.preventDefault();
        },
        handleRowClassName: (record, key) => {
            const checked = record.checked;
            if (checked) {
                return styles['tr-active'];
            } else {
                return null;
            }
        },
        handleHeaderCheckbox: (e) => {
            const checkbox = e.target;
            const data = this.state.selectionData.map((item, i) => {
                return {
                    ...item,
                    checked: checkbox.checked
                };
            });
            this.setState({ selectionData: data });
            e.stopPropagation();
        },
        renderHeaderCheckbox: () => {
            let className = 'input-checkbox';
            const selectedItems = _.filter(this.state.selectionData, { 'checked': true });
            const dataLength = this.state.selectionData.length;
            const selectedLength = selectedItems.length;
            const isSelectedAll = selectedLength > 0 && selectedLength === dataLength;
            if (selectedLength > 0 && selectedLength < dataLength) {
                className += ' checkbox-partial';
            }
            return (
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="headerCheckbox"
                        checked={isSelectedAll}
                        className={className}
                        onChange={this.actions.handleHeaderCheckbox}
                    />
                    <label htmlFor="headerCheckbox" />
                </div>
            );
        },
        renderCheckbox: (value, row) => {
            return (
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id={row.id}
                        className="input-checkbox"
                        checked={row.checked}
                        onChange={(e) => {}}
                    />
                    <label />
                </div>
            );
        }
    };

    columns = [
        { title: this.actions.renderHeaderCheckbox, key: 'checked', dataIndex: 'checked', render: this.actions.renderCheckbox, width: 38 },
        { title: 'Event Type', key: 'eventType', dataIndex: 'eventType' },
        { title: 'Affected Devices', key: 'affectedDevices', dataIndex: 'affectedDevices' },
        { title: 'Detections', key: 'detections', dataIndex: 'detections' }
    ];

    render() {
        const columns = this.columns.map(c => {
            return c;
        });
        const data = this.state.selectionData;

        return (
            <div className="col-md-12">
                <Section className="row-md-8">
                    <h3>Row selection</h3>
                    <p>Change the color of a table row when it is selected.</p>
                    <ul>
                        <li>
                            Row selection should take effect when the user clicks anywhere in a row,
                            except for table cells that contain hyperlinks. Note the following checkboxes are greyed out for demo purposes.
                        </li>
                    </ul>
                    <div className={styles.sectionGroup}>
                        <h5>Row Selection</h5>
                        <Table
                            rowKey="id"
                            columns={columns}
                            data={data}
                            rowClassName={this.actions.handleRowClassName}
                            onRowClick={this.actions.handleClickRow}
                        />
                    </div>
                </Section>
            </div>
        );
    }

}
