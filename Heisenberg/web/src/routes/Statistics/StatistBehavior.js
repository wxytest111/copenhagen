import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Form, Row, Col, Button, Icon, Radio, Menu, Table, DatePicker, Select } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import moment from 'moment';
//引入地图文件
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';
import styles from './StatistBehavior.less';
import StandardFormRow from '../../components/StandardFormRow';
import cloneDeep from 'lodash/cloneDeep';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';



@Form.create()
@connect(state => ({
    statist: state.statist,
}))
export default class StatistRegion extends PureComponent {
  state = {
    dis:'none',
    rangePickerValue: 'plane',
    current:'week',
    sex: undefined,
    getdataNmb: getTimeDistance('week'),
    expandedKeys:[],
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'statist/queryBeList',
      payload: {
      },
    });
    
    let data = [];
    this.getData(data);
  }
  
  clisck =(data, type) =>{
    const { expandedKeys } = this.state;
    let status = false;
    for (let index = 0; index < expandedKeys.length; index++) {
      if (expandedKeys[index] == data.id){
        status = true;
        // expandedKeys.splice(index, 1);
      }
    };
    if (!status){
      expandedKeys.push(data.id)
    };
    let newArr = cloneDeep(expandedKeys);
    this.setState({
      expandedKeys: newArr,
    });
    
  }
  hideTableEx = (data) => {
    const { expandedKeys } = this.state;
    for (let index = 0; index < expandedKeys.length; index++) {
      if (expandedKeys[index] == data.id) {
        expandedKeys.splice(index, 1);
      }
    };
    let newArr = cloneDeep(expandedKeys);
    this.setState({
      expandedKeys: newArr,
    });

  }
  
  getOtionLine() {
    const { current } = this.state;
    const { getdataNmb } = this.state;

    for (let index = 0; index < getdataNmb.length; index++) {
      getdataNmb[index] = moment(getdataNmb[index]).format('MM/DD');
    }


    const allAata = [
      [3, 5, 13, 10, 22, 15, 7],
      [3, 5, 13, 10, 22, 15, 7,23,2,33,44,22,7,4],
      [3, 5, 13, 10, 22, 15, 7, 23, 2, 33, 44, 22, 7, 4, 55,66,33,55,5,7,8,24,35,45,67,35,44,23,34,13]
    ]

    const allAata2 = [
      [9, 3, 12, 20, 12, 16, 27],
      [8, 15, 13, 12, 22, 15, 7,13,2,23,24,12,7,4],
      [13, 15, 13, 20, 22, 25, 7, 23, 22, 13, 34, 32, 7, 4, 65,46,33,25,5,27,18,34,31,41,21,25,34,33,24,12]
    ]

    let xValue = [], yValue = [], yValue2 = [];
    xValue=getdataNmb;
    if (current == 'week') {
      yValue = allAata[0];
      yValue2 = allAata2[0];
    } else if (current == 'towWeek') {
      yValue = allAata[1];
      yValue2 = allAata2[1];
    }else{
      yValue = allAata[2];
      yValue2 = allAata2[2];
    };
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        name: '                                                                                              日期',
        nameGap: 30,
        nameTextStyle:{
          color: '#989898'
        },
        nameLocation: 'center',
        axisTick: {
          alignWithLabel:true
        },
        type: 'category',
        boundaryGap: false,
        data: xValue
      },
      yAxis: {
        name:'                                                进店人数',
        nameTextStyle:{
          color: '#989898'
        },
        nameLocation: 'center',
        nameGap: 30,
        nameRotate: 90,
        type: 'value',
        // axisLine:{
        //   show:false
        // },
        axisTick:{
          show:false
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '全部',
          type: 'line',
          data: yValue,
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


  selectDateNmb = (e) =>{
    let data = [];
    this.setState({
      current: e.key,
      getdataNmb : getTimeDistance(e.key)
    });
    this.getData(data);
  }

  isActive(type, value) {
    const { rangePickerValue } = this.state;
    if (rangePickerValue == '' || rangePickerValue == undefined) {
      return;
    }
    if (rangePickerValue == type ) {
      return styles.currentDate;
    }
  }
 
  getData(data){
    const province= [
            '北京市',
            '天津市',
            '上海市',
            '重庆省',
            '河北省',
            '河南省',
            '云南省',
            '辽宁省',
            '黑龙江省',
            '湖南省',
            '安徽省',
            '山东省',
            '新疆省',
            '江苏省',
            '浙江省',
            '江西省',
            '湖北省',
            '广西省',
            '甘肃省',
            '山西省',
            '内蒙古省',
            '陕西省',
            '吉林省',
            '福建省',
            '贵州省',
            '广东省',
            '青海省',
            '西藏省',
            '四川省',
            '宁夏省',
            '海南省',
            '台湾',
            '香港',
            '澳门'
          ]
    for (let i = 0; i < province.length; i++) {
    data.push({
      key: i,
      name: province[i],
      companyAddress: Math.floor(Math.random()*10)+1,
      companyName: Math.floor(Math.random()*100000+i),
    });
  }
  this.setState({
    data:data,
  })
  }
  maptabFn (){

  }
  handleDateChange = (e) => {
    this.setState({ current: e.target.value });
  }
  sexChange = (e) =>{
    this.setState({ sex: e.target.value });
  }

  render() {
    
    const { statist: { statist, statistloading } } = this.props;
    // const { pspage: { pspage } } = this.props;
    // const { shop: { shop, shopSubmitting } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const current = this.state.current;

    const paginationProps = {
      // size:'small',
      // showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize:10,
      showSizeChanger:true,
      // pageSize: 10,
      // current:this.state.current,
      total: this.state.data?this.state.data.length:100,
      onChange:(page)=>{

      }
    };
    const columns = [];
    columns.push({
      title: '日期/区域',
      dataIndex: 'name',
      width: 80,
      key: 'name',
      // className: 'column-operations',
      fixed: 'left'
    });
    const getdataNmb = this.state.getdataNmb;
    for (let i = 0; i < getdataNmb.length; i++) {
      columns.push({
        title: moment(getdataNmb[i]).format('YYYYMMDD'),
        dataIndex: 'companyName',
        key: 'companyName' + i + 1,
      });
    };
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const beTablecolumns= [
      { title: '年龄段', dataIndex: 'ages', key: 'ages', width:250 },
      { title: '人数', dataIndex: 'count', key: 'count', width: 200},
      {
        title: '性别', dataIndex: 'gender', key: 'gender', width: 100, render: (text, record) => (
          <span>{record.gender == 1 ? "男" : "女"}</span>
        ),
      },
      {
        title: '图表选项', key: 'action', width: 400, render: (text, record) => (
          <span>
            <a onClick={this.clisck.bind(this, record ,'1')}><Icon type="shopping-cart" />推荐商品购买信息</a>
            <a onClick={this.clisck.bind(this, record , '2')} ><Icon type="environment" />店铺到访信息</a>
          </span>
        ),
      }
      
    ];
    const bodyHeight = document.body.clientHeight - 210 + 'px';
    
    return (
      
      <PageHeaderLayout>
        <div className={styles.cardContainer}>
          <Tabs type="card">
            <TabPane tab="各年龄段购物行为" key="1">
              <div style={{ minHeight: bodyHeight}}>
                <Card bordered={false}>
                  <Form layout="inline">
                    <StandardFormRow title="时间" block style={{ paddingBottom: 10, paddingTop: 0, border:0, marginBottom: 0}}>
                      <Radio.Group value={current} onChange={this.handleDateChange} className={styles.btnGroup}>
                        <Radio.Button value="week">最近7天</Radio.Button>
                        <Radio.Button value="toweek">最近14天</Radio.Button>
                        <Radio.Button value="month">最近30天</Radio.Button>
                      </Radio.Group>
                      <RangePicker
                        // defaultValue={[moment('', dateFormat), moment('', dateFormat)]}
                        format={dateFormat}
                        style={{marginLeft: '10px'}}
                      />
                    </StandardFormRow>
                    
                    <StandardFormRow
                      title="会员"
                      grid
                      last
                      block style={{ paddingBottom: 20, paddingTop: 0, border: 0 }}
                    >
                      <Row gutter={16}>
                        <Col lg={4} md={6} sm={10} xs={24}>
                          <RadioGroup onChange={this.sexChange} value={this.state.sex} style={{ lineHeight: '32px' }}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                          </RadioGroup>
                        </Col>
                        <Col lg={8} md={10} sm={10} xs={24}>
                          <FormItem
                            {...formItemLayout}
                            label="来源"
                          >
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
                  <Table
                    bordered={false}
                    columns={beTablecolumns}
                    expandedRowRender={record => <div className="expandbox"><Button onClick={() => { this.hideTableEx(record) }}  >关闭</Button></div>}
                    // expandRowByClick={true}
                    rowKey={record => record.id}
                    dataSource={statist}
                    loading={statistloading}
                    scroll={{ x: true, y: 300 }}
                    expandedRowKeys={this.state.expandedKeys}
                    className={styles.tableBehavior}
                  />
                </Card>
               </div>
            </TabPane>
            <TabPane tab="个人购物行为" key="2">
              <div style={{ minHeight: bodyHeight }}>
               </div>
            </TabPane>
          </Tabs>
        </div>
        
      </PageHeaderLayout>
    );
  }
}
