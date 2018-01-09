import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Tree, Form, Table, List, Card, Row, Col, Tooltip, Input, Button, Icon, Menu, Avatar, Select, Layout, Radio, DatePicker } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './MemberIndex.less';
import StandardFormRow from '../../components/StandardFormRow';
import { getTimeDistance } from '../../utils/utils';
import ReactEcharts from 'echarts-for-react';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const Scatterdata = [
    [
        [4.0, 123.0],
        [6.95, 23.0],
        [17.5, 45.0],
        [8.33, 31.0],
        [19.9, 35.0],
        [7.24, 78.0],
        [4.26, 90.0],
        [10.8, 13.0],
        [4.82, 24.0],
        [5.68, 50.0]
    ],
    [
        [19.1, 37.04],
        [8.14, 56.0],
        [8.74, 89.0],
        [18.7, 38.07],
        [9.26, 45.0],
        [3.10, 85.0],
        [6.13, 49.0],
        [2.10, 30.0],
        [7.13, 38.0],
        [7.26, 34.0],
        [4.74, 50.0]
    ],
    [
        [7.46, 19.0],
        [6.77, 84.0],
        [12.7, 54.04],
        [7.11, 30.0],
        [7.8, 110.1],
        [10.8, 18.04],
        [8.08, 94.0],
        [5.39, 65.0],
        [5.15, 30.0],
        [6.42, 79.0],
        [5.73, 54.0]
    ],
    [
        [6.58, 23.0],
        [5.76, 32.0],
        [7.71, 34.0],
        [8.84, 23.0],
        [8.4, 123.7],
        [7.04, 39.0],
        [5.25, 33.0],
        [12.5, 22.00],
        [5.56, 53.0],
        [9.91, 95.0],
        [6.89, 66.0]
    ],
    [
        [6.58, 55.0],
        [5.76, 68.0],
        [17.7, 34.01],
        [8.84, 33.0],
        [18.4, 82.07],
        [7.04, 83.0],
        [5.25, 35.0],
        [12.5, 19.00],
        [5.56, 47.0],
        [7.91, 38.0],
        [6.89, 39.0]
    ],
    [
        [6.58, 82.0],
        [15.7, 18.06],
        [17.7, 37.01],
        [8.84, 45.0],
        [18.4, 44.07],
        [7.04, 73.0],
        [15.2, 35.05],
        [12.5, 19.00],
        [15.5, 84.06],
        [17.9, 67.01],
        [6.89, 29.0]
    ],
    [
        [19.1, 37.04],
        [8.14, 56.0],
        [8.74, 89.0],
        [18.7, 38.07],
        [9.26, 45.0],
        [3.10, 85.0],
        [6.13, 49.0],
        [2.10, 30.0],
        [7.13, 38.0],
        [7.26, 34.0],
        [4.74, 50.0],
        [6.58, 82.0],
        [15.7, 18.06],
        [17.7, 37.01],
        [8.84, 45.0],
        [18.4, 44.07],
        [7.04, 73.0],
        [15.2, 35.05],
        [12.5, 19.00],
        [15.5, 84.06],
        [17.9, 67.01],
        [6.89, 29.0]
    ],
    [
        [6.58, 82.0],
        [15.7, 18.06],
        [17.7, 37.01],
        [8.84, 45.0],
        [18.4, 44.07],
        [7.04, 73.0],
        [15.2, 35.05],
        [12.5, 19.00],
        [15.5, 84.06],
        [17.9, 67.01],
        [6.89, 29.0],
        [6.58, 23.0],
        [5.76, 32.0],
        [7.71, 34.0],
        [8.84, 23.0],
        [8.4, 123.7],
        [7.04, 39.0],
        [5.25, 33.0],
        [12.5, 22.00],
        [5.56, 53.0],
        [9.91, 95.0],
        [6.89, 66.0]
    ]
];

@Form.create()
@connect(state => ({
    skulist: state.skulist,
    shop: state.shop,
    region: state.region,
    expandedKeys: [],
    nature: undefined,
    autoExpandParent: true,
    // checkedKeys: ['0-0-0'],
    selectedKeys: [],
}))
export default class Member extends PureComponent {
    state = {
        region: {},
        modalVisible: false,
        leftOpenStaus: true,
        current: 'week',
        getdataNmb: getTimeDistance('week'),
        showInfo: true,
    };

    componentDidMount() {
        this.props.region.region = [];
        this.props.dispatch({
            type: 'region/fetch',
            payload: {
                ancestor_key: 0,
            },
        });
        this.props.shop.shop = [];
        this.props.dispatch({
            type: 'shop/fetch',
            payload: {

            },
        });


    }

    leftCardOpen(Staus) {
        this.setState({
            leftOpenStaus: !Staus,
        });
    }


    showModal = () => {
        this.setState({
            modalVisible: true
        });
    };
    handleCancel = () => {
        this.setState({
            modalVisible: false
        });

    }
    handleDateChange = (e) => {
        this.setState({ current: e.target.value });
    }

    getOtionScatter() {
        const { scatterPickerValue } = this.state;
        const allAata = [
            [
                {
                    name: '18岁以下',
                    data: Scatterdata[0]
                },
                {
                    name: '18-30',
                    data: Scatterdata[1]
                },
                {
                    name: '31-40',
                    data: Scatterdata[2]
                },
                {
                    name: '41-50',
                    data: Scatterdata[3]
                },
                {
                    name: '51-60',
                    data: Scatterdata[4]
                },
                {
                    name: '60岁以上',
                    data: Scatterdata[5]
                },
            ],
            [
                {
                    name: '男',
                    data: Scatterdata[6]
                },
                {
                    name: '女',
                    data: Scatterdata[7]
                }
            ]
        ];
        let getData = [], xValue = [], yValue = [];
        if (scatterPickerValue == 'age') {
            getData = allAata[0];
        } else if (scatterPickerValue == 'sex') {
            getData = allAata[1];
        };
        if (getData.length) {
            for (var i = 0; i < getData.length; i++) {
                var xAbj = {}, yAbj = {};
                xAbj.icon = 'circle';
                xAbj.name = getData[i].name;
                yAbj.name = getData[i].name;
                yAbj.data = getData[i].data;
                yAbj.type = 'scatter';
                xValue.push(xAbj)
                yValue.push(yAbj)
            }
        };
        const option = {
            color: ['#e9b6ae', '#f59992', '#bed6f2', '#ad35e5', '#f9ce9c', '#dda5fb'],
            grid: {
                left: '5%',
                right: '22%',
                bottom: '8%',
                // top: '5%',
                containLabel: true
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'bottom',
                itemWidth: 10,
                padding: [10, 10, 40, 5],
                align: 'right',
                data: xValue
            },
            tooltip: {
                axisPointer: {
                    show: true,
                    type: 'cross',
                    crossStyle: {
                        type: 'solid',
                        width: 1,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#e9b6ae' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ad35e5' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                }
            },
            xAxis: {
                name: '                                                              X轴（分钟）',
                nameLocation: 'middle',
                nameGap: '25',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                name: '                                          Y轴（元）',
                nameLocation: 'middle',
                nameGap: '30',
                nameRotate: '90',
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: yValue
        }
        return option;
    }

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    getRegionIdList(list, region) {
        list.push(region.id)
        if (region.children) {
            for (var i = 0; i < region.children.length; i++) {
                this.getRegionIdList(list, region.children[i])
            }
        }
    }

    onSelect = (selectedKeys, info) => {

        var list = new Array();
        this.getRegionIdList(list, info.node.props.dataRef)
        this.setState({ selectedKeys });
        this.props.shop.shop = [];
        this.props.dispatch({
            type: 'shop/fetch',
            payload: {
                region_id: list
            },
        });
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item} />;
            // return <TreeNode {...item} />;
        });
    }
    showChart = () => {
        this.setState({
            showInfo: false,
        });  
    }


    render() {

        // const { shop: { shop, shoploading, shopSubmitting } } = this.props;
        const shop = [{id:1}, {id:2}];

        const { region: { region, loading, skuSubmitting } } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const paginationProps = {
            // size:'small',
            // showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            // current:this.state.current,
            total: shop.length,
            onChange: (page) => {
                console.log(page)
            }
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 14 },
            },
        };
        const MemberModal = () => (
            <Modal title="购物行为分析" width={'700px'} wrapClassName='verticalCenterModal' visible={this.state.modalVisible} onCancel={this.handleCancel} footer={null}>
                <StandardFormRow title="时间" block style={{ paddingBottom: 10, paddingTop: 0, border: 0, marginBottom: 0 }}>
                    <Radio.Group value={current} onChange={this.handleDateChange} className={styles.btnGroup}>
                        <Radio.Button value="week">最近7天</Radio.Button>
                        <Radio.Button value="toweek">最近14天</Radio.Button>
                        <Radio.Button value="month">最近30天</Radio.Button>
                    </Radio.Group>
                    <RangePicker
                        // defaultValue={[moment('', dateFormat), moment('', dateFormat)]}
                        format={dateFormat}
                        style={{ marginLeft: '10px' }}
                    />
                </StandardFormRow>
                <Row>
                    <Col className={styles.shopBtn}>
                        <Button icon="shopping-cart" onClick={() => { this.showChart() }}>推荐商品购买信息</Button>
                        <Button icon="environment">店铺到访信息</Button>
                    </Col>
                    <Col>
                        {this.state.showInfo ? <div>111</div> : <ReactEcharts
                            ref={(e) => {
                                this.echarts_react = e;
                            }}
                            option={this.getOtionScatter()}
                            notMerge={true}
                            lazyUpdate={true}
                            style={{ height: '300px', width: '100%' }}
                            className='react_for_echarts' /> }
                        
                    </Col>
                </Row>
            </Modal>
        );

        const bodyHeight = document.body.clientHeight - 150 + 'px';
        const bodyRightHeight = document.body.clientHeight - 130 + 'px';
        const tableHeight = document.body.clientHeight - 182 + 'px';
        const { current } = this.state;


        return (
            <PageHeaderLayout>
                <Row gutter={24}>
                    <Col span={this.state.leftOpenStaus ? "5" : "0"}  style={{paddingRight:"0"}}>
                        <Card bordered={false} className={styles.leftCard}>
                            <Row type="flex" justify="space-around" style={{ height: bodyHeight, maxHeight: bodyHeight}}>
                                <Col span={this.state.leftOpenStaus ? "21" : "0"}>
                                    <Search
                                        placeholder="请输入搜索关键词"
                                        onSearch={value => console.log(value)}
                                    />
                                    <Layout>
                                        <div style={{ background: '#fff' }}>
                                            <Content style={{ overflow: 'auto', border: '1px solid #d9d9d9',  height: tableHeight }}>
                                                <Tree
                                                    onExpand={this.onExpand}
                                                    expandedKeys={this.state.expandedKeys ? this.state.expandedKeys : ['6']}
                                                    autoExpandParent={this.state.autoExpandParent}
                                                    // checkedKeys={this.state.checkedKeys}
                                                    onSelect={this.onSelect}
                                                    selectedKeys={this.state.selectedKeys}
                                                >
                                                    {this.renderTreeNodes(region)}
                                                </Tree>
                                            </Content>
                                        </div>
                                    </Layout>
                                </Col>
                                
                            </Row>
                        </Card>
                    </Col>
                    <Col span={1} className={styles.openLeft} onClick={this.leftCardOpen.bind(this, this.state.leftOpenStaus)} style={{ paddingLeft: 0,height: bodyRightHeight}}>
                        <Icon type={this.state.leftOpenStaus ? "left" : "right"} />
                    </Col>
                    <Col span={this.state.leftOpenStaus ? "18" : "22"} style={{ background: "#fff", height: bodyRightHeight, overflow:"hidden"}}>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            grid={{ gutter: 24, xl: this.state.leftOpenStaus ? 2 : 3, lg: this.state.leftOpenStaus ? 2 : 3, md: 2, sm: this.state.leftOpenStaus ? 1 : 2, xs: this.state.leftOpenStaus ? 1 : 2 }}
                            pagination={paginationProps}
                            dataSource={shop}
                            renderItem={item => (
                                <List.Item key={item.id} style={{ border: 0 }}>
                                    <Card className={styles.memberCards}>
                                        <div className="memberCardtitle">
                                            <Row type="flex" justify="space-between">
                                                <Col className="titleleft">
                                                    <label>店员</label>
                                                    <Button>新人</Button>
                                                </Col>
                                                <Col className="titleright">
                                                    <span>20180105 16:07</span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="memberCardBody">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Col span={8} className="body-avatar">
                                                    <Avatar shape="square" src="http://jianfu.ufile.ucloud.com.cn/a1944ec9-d1ca-4e4e-bdf0-5ecb1daafe78" size="large" />
                                                </Col>
                                                <Col span={16} className="body-lable">
                                                    <FormItem
                                                        label="会员"
                                                        {...formItemLayout}
                                                    >
                                                        34567890987656
                                                    </FormItem>
                                                    <FormItem
                                                        label="手机"
                                                        {...formItemLayout}
                                                    >
                                                        18888009900
                                                    </FormItem>

                                                </Col>
                                            </Row>
                                            <Row span={24}>
                                                <Col span={12} >
                                                    <FormItem
                                                        label="姓名"
                                                        {...formItemLayout}
                                                    >
                                                        刘晓丽
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem
                                                        label="微信"
                                                        {...formItemLayout}
                                                    >
                                                        yinyin990
                                                    </FormItem>
                                                </Col>
                                                
                                            </Row>
                                            <Row type="flex" justify="space-around">
                                                <Col span={this.state.leftOpenStaus ? 6 : 7}>
                                                    来店 <span className="special-nmb">345</span> 次
                                                </Col>
                                                <Col span={this.state.leftOpenStaus ? 6 : 7}>
                                                    消费<span className="special-nmb">43</span> 单 
                                                </Col>
                                                <Col span={this.state.leftOpenStaus ? 6 : 7}>
                                                    <span className="special-nmb">456</span>元
                                                </Col>
                                            </Row>
                                            <Row type="flex" justify="end">
                                                <Col className="model-btn">
                                                    {/* onClick={() => { this.hideTableEx(record) }} */}
                                                    <Button onClick={() => {this.showModal()}}>购物行为分析</Button>
                                                </Col>
                                            </Row>
                                            {MemberModal()}
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </PageHeaderLayout>
        );
    }
}
