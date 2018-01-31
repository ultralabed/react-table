import Anchor from '@trendmicro/react-anchor';
import React, { Component } from 'react';
import orderBy from 'lodash.orderby';
import Table from '../../src';
import Section from '../Section';
import styles from '../index.styl';

export default class extends Component {
    state = {
        sortColumnKey: 'eventType',
        sortOrder: 'asc'
    };

    columns = [
        {
            title: 'Event Type',
            key: 'eventType',
            headerContentClassName: styles.textEllipsis,
            render: (value, row) => {
                return (<Anchor>{row.eventType}</Anchor>);
            }
        },
        {
            dataIndex: 'affectedDevices',
            title: 'Affected DevicesAffected DevicesAffected DevicesAffected DevicesAffected DevicesAffected DevicesAffected Devices',
            key: 'affectedDevices',
            headerContentClassName: styles.textEllipsis
        },
        {
            dataIndex: 'detections',
            title: 'Detections',
            key: 'detections',
            headerContentClassName: styles.textEllipsis
        }
    ];

    data = [
        { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
        { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
        { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
        { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
        { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
        { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
    ];

    actions = {
        toggleSortOrder: (column) => (event) => {
            this.setState(state => {
                let sortColumnKey = column.key;
                let sortOrder = (state.sortOrder === 'desc') ? 'asc' : 'desc';
                if (state.sortColumnKey !== sortColumnKey) {
                    sortOrder = 'desc';
                }
                return {
                    sortColumnKey,
                    sortOrder
                };
            });
        }
    };

    sortableColumns(columns) {
        return (
            columns.map((column, index) => {
                if (column.key === 'detail' || column.key === 'checked') {
                    return column;
                } else {
                    return {
                        ...column,
                        onClick: this.actions.toggleSortOrder(column),
                        sortable: true,
                        sortOrder: column.key === this.state.sortColumnKey ? this.state.sortOrder : ''
                    };
                }
            })
        );
    }

    render() {
        const columns = this.columns;
        const data = this.data;
        const sortableColumns = this.sortableColumns(columns);
        const sortableData = orderBy(data, [this.state.sortColumnKey], [this.state.sortOrder]);

        return (
            <div className="col-md-12">
                <Section className="row-md-26">
                    <h3>Display and Functionalities</h3>
                    <div className={styles.sectionGroup}>
                        <h5>Row Hover</h5>
                        <Table
                            hoverable
                            justified
                            rowKey={record => record.id}
                            columns={columns}
                            data={data}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>Sortable Header</h5>
                        <Table
                            hoverable
                            justified
                            rowKey={record => record.id}
                            columns={sortableColumns}
                            data={sortableData}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>Loader</h5>
                        <Table
                            justified
                            hoverable={false}
                            loading
                            rowKey={record => record.id}
                            columns={columns}
                            data={data}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>No Data</h5>
                        <Table
                            hoverable={false}
                            justified
                            rowKey={record => record.id}
                            columns={columns}
                            data={[]}
                            emptyText={() => 'No data to display'}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>No Data and Loader</h5>
                        <Table
                            hoverable={false}
                            justified
                            loading
                            rowKey={record => record.id}
                            columns={columns}
                            data={[]}
                            emptyText={() => 'No data to display'}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>No Header</h5>
                        <Table
                            disableHeader
                            hoverable
                            justified
                            maxHeight={180}
                            rowKey={record => record.id}
                            columns={columns}
                            data={data}
                        />
                    </div>
                    <div className={styles.sectionGroup}>
                        <h5>No Header and Loader</h5>
                        <Table
                            loading={true}
                            hoverable
                            disableHeader={true}
                            rowKey={record => record.id}
                            columns={columns}
                            data={[]}
                            emptyText={() => 'No data to display'}
                        />
                    </div>
                </Section>
            </div>
        );
    }
}
