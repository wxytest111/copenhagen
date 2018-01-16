import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Checkbox, Tabs, Card, Form, Row, Col, Button, Icon, Radio, Menu, Table, DatePicker, Select } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';
import styles from './StatistHumanCargo.less';
import StandardFormRow from '../../components/StandardFormRow';
import cloneDeep from 'lodash/cloneDeep';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';



@Form.create()
// @connect(state => ({
//     statist: state.statist,
// }))
export default class StatistRegion extends PureComponent {
    state = {
        dis: 'none',
        rangePickerValue: 'plane',
        current: 'week',
        sex: undefined,
        getdataNmb: getTimeDistance('week'),
        expandedKeys: [],
        member:'',
    }
    componentDidMount() {
        let data = [];
        this.getData(data);
    }

    getOtionLine() {
        let ages = ['18岁以下', '18-24岁', '25-35岁', '36-46岁', '47-56岁', '57岁以上'];
        let xValue = ['男', '女', '男购买次数', '女购买次数'], serieValue = [];
        let legendValue = [];
        for (let i = 0; i < xValue.length; i++) {
            let obj = {};
            if(i<2){
                obj.icon = 'circle'
            };
            obj.name = xValue[i];
            legendValue.push(obj)
        };
        for (let i = 0; i < xValue.length; i++) {
            let abj = {};
            abj.name = xValue[i];
            abj.data = [];
            abj.barGap = '10%';
            if (i < 2){
                abj.type = 'bar';
                for (let index = 0; index < ages.length; index++) {
                    let valuedata = parseInt(Math.floor(Math.random() * 600))
                    abj.data.push(valuedata)
                };
            }else{
                abj.type = 'line';
                for (let index = 0; index < ages.length; index++) {
                    let valuedata = parseInt(Math.floor(Math.random() * 300 +600))
                    abj.data.push(valuedata)
                }
            };
            serieValue.push(abj);
        }
        const option = {
            color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
                containLabel: true
            },
            legend: {
                bottom:'5%',
                left:'10%',
                data: legendValue
            },
            xAxis: {
                name: '                                                                                                                                                                                                                             年龄段',
                nameTextStyle: {
                    color: '#989898'
                },
                nameGap: 30,
                nameLocation: 'center',
                axisTick: {
                    alignWithLabel: true
                },
                // xAxis.axisPointer.lineStyle
                type: 'category',
                // boundaryGap: false,
                data: ages
            },
            yAxis: {
                name: '                                 进店人数/次数',
                nameTextStyle: {
                    color: '#989898'
                },
                nameLocation: 'center',
                splitLine: {
                    lineStyle: {
                        type:'dashed'
                    }
                },
                nameRotate: 90,
                nameGap: 40,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: serieValue
        }
        return option;
    };
    getOtionScaCircle() {
        var types = ['食品类', '服装类', '日用品类', '家具类', '家用电器类'];
        var ages = ['18岁以下', '18-24岁', '25-35岁', '36-46岁', '47-56岁', '57岁以上'];
        var data = [];
        for (let i = 0; i < 100; i++) {
            var itemdata = [];
            itemdata[0] = parseInt(Math.floor(Math.random() * 6))
            itemdata[1] = parseInt(Math.floor(Math.random() * 6))
            itemdata[2] = parseInt(Math.floor(Math.random() * 1000))
            data.push(itemdata)
        }

        const option = {
            color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
            legend: {
                data: ['购买次数'],
                left: 'right'
            },
            polar: {},
            tooltip: {
                formatter: function (params) {
                    return ages[params.value[0]] + '购买' + types[params.value[0]] + '商品' + params.value[2] + '次';
                }
            },
            angleAxis: {
                type: 'category',
                data: types,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#999',
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                }
            },
            radiusAxis: {
                type: 'category',
                data: ages,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#999',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    rotate: 30
                }
            },
            series: [{
                name: '购买次数',
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: function (val) {
                    return val[2] * 0.02;
                },
                data: data,
                animationDelay: function (idx) {
                    return idx * 5;
                }
            }]
        };
        return option;
    };
    getOtionPie() {
        var types = ['食品类', '服装类', '日用品类', '家具类', '家用电器类'];
        var data = [];
        for (let i = 0; i < 5; i++) {
            var itemdata = {};
            itemdata.name = types[i];
            itemdata.value = parseInt(Math.floor(Math.random() * 1000))
            data.push(itemdata)
        }
        const option = {
            color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 次 ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: "5%",
                data: types
            },
            series: [
                {
                    name: '热销品类TOP5',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }


    selectDate = (type) => {
        this.setState({
            rangePickerValue: type,
        });
    }


    selectDateNmb = (e) => {
        let data = [];
        this.setState({
            current: e.key,
            getdataNmb: getTimeDistance(e.key)
        });
        this.getData(data);
    }

    isActive(type, value) {
        const { rangePickerValue } = this.state;
        if (rangePickerValue == '' || rangePickerValue == undefined) {
            return;
        }
        if (rangePickerValue == type) {
            return styles.currentDate;
        }
    }

    getData(data) {
       
    }
    maptabFn() {

    }
    handleDateChange = (e) => {
        this.setState({ current: e.target.value });
    }
    sexChange = (e) => {
        this.setState({ sex: e.target.value });
    }
    CheckboxOnChange (checkedValues) {
    console.log('checked = ', checkedValues);
    }

    render() {

        // const { statist: { statist, statistloading } } = this.props;
        const { getFieldDecorator } = this.props.form;
        const current = this.state.current;
        const formItemLayout = {
            labelCol: {
                 span: 8
            },
            wrapperCol: {
                 span: 16
            },
        };
        const bodyHeight = window.screen.availHeight- 370 + 'px';

        return (

            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form layout="inline">
                        <StandardFormRow title="时间" block style={{ paddingBottom: 0, paddingTop: 0, border: 0, marginBottom: 0 }}>
                        <Row gutter={24}>
                            <Col lg={14} md={15} sm={24} xs={24} style={{padding:0}}>
                                <Radio.Group value={current} onChange={this.handleDateChange} className={styles.btnGroup}>
                                    <Radio.Button value="week">最近7天</Radio.Button>
                                    <Radio.Button value="toweek">最近14天</Radio.Button>
                                    <Radio.Button value="month">最近30天</Radio.Button>
                                </Radio.Group>
                                <RangePicker
                                    format={dateFormat}
                                    style={{ marginLeft: '10px' }}
                                />
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="性别"
                                    className={styles.floatLeft}>
                                        {getFieldDecorator('author', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="请选择性别"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">男</Option>
                                                <Option value="2">女</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={5} md={5} sm={5} xs={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="来源"
                                        className={styles.floatLeft}>
                                        {getFieldDecorator('author', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="请选择区域"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="lisa">王昭君</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </StandardFormRow>
                    </Form>
                </Card>
                <div className={styles.cardContainer}>
                    <Tabs type="card">
                        <TabPane tab="以人分析货" key="1">
                            <div style={{ minHeight: bodyHeight}}>  
                            <Row className={styles.echartbody}>
                                <div className={styles.echartheader}>人次关系表</div>
                                <ReactEcharts
                                    ref={(e) => {
                                        this.echarts_react = e;
                                    }}
                                    option={this.getOtionLine()}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    style={{ height: '300px', width: '100%' }}
                                    className='react_for_echarts' />
                            </Row>
                                <div className={styles.echartbody}>
                                    <div className={styles.echartheader}>人货关系表</div>
                                    <Row className={styles.echartSubtitle}>
                                        <label>热销品排行:</label>
                                        <Select
                                            onChange={this.handleFormSubmit}
                                            placeholder="请选择top数目"
                                            style={{ maxWidth: 150, width: '100%' }}
                                            size='small'
                                        >
                                            <Option value="lisa">王昭君</Option>
                                        </Select>
                                    </Row>
                                    <Row span={12}>
                                        <Col span={12} className={styles.card}>
                                            <h3>男性</h3>
                                            <Card bordered={false}>
                                                <ReactEcharts
                                                    ref={(e) => {
                                                        this.echarts_react = e;
                                                    }}
                                                    option={this.getOtionScaCircle()}
                                                    notMerge={true}
                                                    lazyUpdate={true}
                                                    style={{ height: '300px', width: '100%' }}
                                                    className='react_for_echarts' />
                                            </Card>
                                        </Col>
                                        <Col span={12} className={styles.card}>
                                            <h3>女性</h3>
                                             <Card bordered={false}>
                                                <ReactEcharts
                                                    ref={(e) => {
                                                        this.echarts_react = e;
                                                    }}
                                                    option={this.getOtionScaCircle()}
                                                    notMerge={true}
                                                    lazyUpdate={true}
                                                    style={{ height: '300px', width: '100%' }}
                                                    className='react_for_echarts' />
                                            </Card>
                                        </Col>
                                    </Row>
                            </div>
                            </div>
                        </TabPane>
                        <TabPane tab="以货分析人" key="2">
                            <div style={{ minHeight: bodyHeight}}>
                                <Card bordered={false}>
                                    <Row span={24}>
                                        <Col span={6} className={styles.echartSubtitle}>
                                            <label>品类:</label>
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="请选择top数目"
                                                style={{ maxWidth: 150, width: '100%' }}
                                                size='small'
                                            >
                                                <Option value="lisa">王昭君</Option>
                                            </Select>
                                        </Col>
                                        <Col span={6}>
                                            <Checkbox.Group style={{ width: '100%' }} onChange={this.CheckboxOnChange}>
                                                <Row>
                                                    <Col span={8}><Checkbox value="A">全部</Checkbox></Col>
                                                    <Col span={8}><Checkbox value="B">新会员</Checkbox></Col>
                                                    <Col span={8}><Checkbox value="C">老会员</Checkbox></Col>
                                                </Row>
                                            </Checkbox.Group>
                                        </Col>
                                    </Row>
                                    <Card bordered={false}>
                                        <ReactEcharts
                                            ref={(e) => {
                                                this.echarts_react = e;
                                            }}
                                            option={this.getOtionPie()}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            style={{ height: '300px', width: '100%' }}
                                            className='react_for_echarts' />
                                        <div className={styles.chartPieBotoom}>销售前TOP5的品类在全部会员中的占比图</div>
                                    </Card>
                                    <Card bordered={false}>
                                        <ReactEcharts
                                            ref={(e) => {
                                                this.echarts_react = e;
                                            }}
                                            option={this.getOtionPie()}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            style={{ height: '300px', width: '100%' }}
                                            className='react_for_echarts' />
                                        <div className={styles.chartPieBotoom}>销售前TOP5的品类在新会员中的占比图</div>
                                    </Card>
                                    <Card bordered={false}>
                                        <ReactEcharts
                                            ref={(e) => {
                                                this.echarts_react = e;
                                            }}
                                            option={this.getOtionPie()}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            style={{ height: '300px', width: '100%' }}
                                            className='react_for_echarts' />
                                        <div className={styles.chartPieBotoom}>销售前TOP5的品类在老会员中的占比图</div>
                                    </Card>

                                </Card>
                                
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </PageHeaderLayout>
        );
    }
}
