import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Row, Col, Button, Icon, Radio, Menu, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
//引入地图文件
import 'echarts/map/js/china.js';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';
import styles from './StatistPromotion.less';

// @Form.create()
@connect(state => ({

}))
export default class StatistPromotion extends PureComponent {
  state = {
    dis:'none',
    rangePickerValue: 'age',
    current:'week',
    getdataNmb: getTimeDistance('week'),
    data:[],
  }
  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // }
  
  componentDidMount() {
    let data = [];
    this.getData(data);
    // 初始化echarts实例
    // let myChartLine = echarts.init(document.getElementById('main'));
    // 绘制图表
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
      legend: {
        left: '50px',
        top:'bottom',
        icon: 'circle',
        data: ['购买推荐商品', '未购买推荐商品']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '12%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        name: '                                                                                                                                                                                                                                                               日期',
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
        name:'                                                  进店频次',
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
          name: '购买推荐商品',
          type: 'line',
          data: yValue,
        },
        {
          name: '未购买推荐商品',
          type: 'line',
          data: yValue2,
        }
      ]
  }
    return option;
}

  getOtionLine2() {
    const { current } = this.state;
    const { getdataNmb } = this.state;

    for (let index = 0; index < getdataNmb.length; index++) {
      getdataNmb[index] = moment(getdataNmb[index]).format('MM/DD');
    }


    const allAata = [
      [300, 500, 1300, 1000, 2200, 1500, 700],
      [300, 500, 1300, 1000, 2200, 1500, 700,2300,200,3300,4400,2200,700,400],
      [300, 500, 1300, 1000, 2200, 1500, 700, 2300, 200, 3300, 4400, 2200, 700, 400, 5500,6600,3300,5500,500,700,800,2400,3500,4500,6700,3500,4400,2300,3400,1300]
    ]

    const allAata2 = [
      [900, 300, 1200, 2000, 1200, 1600, 2700],
      [800, 1500, 1300, 1200, 2200, 1500, 700,1300,200,2300,2400,1200,700,400],
      [1300, 1500, 1300, 2000, 2200, 2500, 700, 2300, 2200, 1300, 3400, 3200, 700, 400, 6500,4600,3300,2500,500,2700,1800,3400,3100,4100,2100,2500,3400,3300,2400,1200]
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
      legend: {
        left: '50px',
        top:'bottom',
        icon: 'circle',
        data: ['购买推荐商品', '未购买推荐商品']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '12%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        name: '                                                                                                                                                                                                                                                               日期',
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
        name:'                                                  销售金额',
        nameTextStyle:{
          color: '#989898'
        },
        nameLocation: 'center',
        nameGap: 50,
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
          name: '购买推荐商品',
          type: 'line',
          data: yValue,
        },
        {
          name: '未购买推荐商品',
          type: 'line',
          data: yValue2,
        }
      ]
  }
    return option;
}
  

  selectDate = (type) => {
    this.setState({
      rangePickerValue: type,
      dis:type=='sex'?undefined:'none',
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
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: '辽宁省',
      companyAddress: Math.floor(Math.random()*10)+1,
      companyName: Math.floor(Math.random()*100+i),
    });
  }
  this.setState({
    data:data,
  })
  }

  render() {
    
    // const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
    // const { pspage: { pspage } } = this.props;
    // const { shop: { shop, shopSubmitting } } = this.props;

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
        children: [{
          // width: '45px',
          title: '频次',
          dataIndex: `companyAddress`,
          key: 'companyAddress'+i+1,
        }, {
          // width: '65px',
          title: '消费额度',
          dataIndex: 'companyName',
          key: 'companyName'+i+1,
        }],
      });
    }
    
    


    return (
      <PageHeaderLayout>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['week']}
          onClick={this.selectDateNmb}
          selectedKeys={[this.state.current]}
          style={{ backgroundColor: '#fff', marginBottom: 16, lineHeight: '35px'}}
        >
          <Menu.Item key="week">最近7天</Menu.Item>
          <Menu.Item key="towWeek">最近14天</Menu.Item>
          <Menu.Item key="month">最近30天</Menu.Item>
        </Menu>
        
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Card style={{ width: '100%'}} bordered={false} bodyStyle= {{padding:10}} >
            {/* <Card style={{ width: '100%', display:'none'}} bordered={false} bodyStyle= {{padding:10}} > */}
              <Row type="flex" justify="space-between" align="bottom" style={{display:this.state.dis?undefined:'none'}}>
                <Col span={12}>
                  
                    <div className={styles.salesExtra}>
                      <a className={this.isActive('age')} onClick={() => this.selectDate('age')}>
                        频次
                      </a>
                      <a className={this.isActive('sex')} onClick={() => this.selectDate('sex')}>
                        金额
                      </a>
                    </div>
                  
                
                </Col>
                <Col span={3} className={styles.cardHead}>
                  <h4>总人数<br/>
                    <span>{this.state.current=='week'?'456,789':this.state.current=='towWeek'?'836,729':'1,856,516'}</span>
                  </h4>
                </Col>
                  <span style={{ width:1, height: 45,backgroundColor:'#989898'}}/>
                <Col span={3} className={styles.cardHead}>
                  <h4>平均来店频次/天<br/>
                    <span>{this.state.current=='week'?'1.5':this.state.current=='towWeek'?'1.3':'1.4'}</span>
                  </h4>
                </Col>
                  <span style={{ width:1, height: 45,backgroundColor:'#989898'}}/>
                <Col span={4} className={styles.cardHead}>
                  <h4>平均购买推荐频次/周<br/>
                    <span>{this.state.current=='week'?'18':this.state.current=='towWeek'?'23':'19'}</span>
                  </h4>
                </Col>
                <Col span={1}/>
              </Row>
              <Row style={{display:this.state.dis?undefined:'none'}}>
                <ReactEcharts
                  ref= {(e) => {
                    this.echarts_react = e;
                  }}
                  
                  option={this.getOtionLine()}
                  
                  className='react_for_echarts' />
              </Row>


              <Row type="flex" justify="space-between" align="bottom" style={{display:this.state.dis}}>
                <Col span={15}>
                  
                    <div className={styles.salesExtra}>
                      <a className={this.isActive('age')} onClick={() => this.selectDate('age')}>
                        频次
                      </a>
                      <a className={this.isActive('sex')} onClick={() => this.selectDate('sex')}>
                        金额
                      </a>
                    </div>
                  
                
                </Col>
                <Col span={3} className={styles.cardHead}>
                  <h4>总人数<br/>
                    <span>{this.state.current=='week'?'456,789':this.state.current=='towWeek'?'836,729':'1,856,516'}</span>
                  </h4>
                </Col>
                  <span style={{ width:1, height: 45,backgroundColor:'#989898'}}/>
                <Col span={4} className={styles.cardHead}>
                  <h4>平均来店增长金额/天<br/>
                    <span>{this.state.current=='week'?'¥64':this.state.current=='towWeek'?'¥58':'¥60'}</span>
                  </h4>
                </Col>
                
                <Col span={1}/>
              </Row>
              <Row style={{display:this.state.dis}}>
              <ReactEcharts
               
                ref= {(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionLine2()}
                className='react_for_echarts' />
              </Row>


              <div className={styles.tableStyle}>
              <Table 
                bordered 
                columns={columns} 
                dataSource={this.state.data} 
                size='middle' 
                scroll={{ x: 1000 }}
                pagination={paginationProps}
              />
              </div>
            </Card>
          </Col>
        </Row>
        
      </PageHeaderLayout>
    );
  }
}
