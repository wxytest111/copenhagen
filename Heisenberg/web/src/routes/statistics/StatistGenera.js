import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Row, Col, Button, Icon, Radio, Menu} from 'antd';
import ReactEcharts from 'echarts-for-react';
//引入地图文件
import 'echarts/map/js/china.js';
// // 引入 ECharts 主模块
// import echarts from 'echarts/lib/echarts';
// // 引入柱状图
// import 'echarts/map/js/china.js';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';

import styles from './StatistGenera.less';
// import styles from './Analysis.less';

const Scatterdata = [
  [
        [123.0, 3.04],
        [23.0, 6.95],
        [45.0, 17.58],
        [31.0, 8.33],
        [35.0, 19.96],
        [78.0, 7.24],
        [90.0, 4.26],
        [13.0, 10.84],
        [24.0, 4.82],
        [50.0, 5.68]
    ],
    [
        [37.0, 19.14],
        [56.0, 8.14],
        [89.0, 8.74],
        [38.0, 18.77],
        [45.0, 9.26],
        [85.0, 3.10],
        [49.0, 6.13],
        [30.0, 2.10],
        [38.0, 7.13],
        [34.0, 7.26],
        [50.0, 4.74]
    ],
    [
        [19.0, 7.46],
        [84.0, 6.77],
        [54.0, 12.74],
        [30.0, 7.11],
        [110.0, 7.81],
        [18.0, 10.84],
        [94.0, 8.08],
        [65.0, 5.39],
        [30.0, 5.15],
        [79.0, 6.42],
        [54.0, 5.73]
    ],
    [
        [23.0, 6.58],
        [32.0, 5.76],
        [34.0, 7.71],
        [23.0, 8.84],
        [123.0, 8.47],
        [39.0, 7.04],
        [33.0, 5.25],
        [22.0, 12.50],
        [53.0, 5.56],
        [95.0, 9.91],
        [66.0, 6.89]
    ],
    [
        [55.0, 6.58],
        [68.0, 5.76],
        [34.0, 17.71],
        [33.0, 8.84],
        [82.0, 18.47],
        [83.0, 7.04],
        [35.0, 5.25],
        [19.0, 12.50],
        [47.0, 5.56],
        [38.0, 7.91],
        [39.0, 6.89]
    ],
    [
        [82.0, 6.58],
        [18.0, 15.76],
        [37.0, 17.71],
        [45.0, 8.84],
        [44.0, 18.47],
        [73.0, 7.04],
        [35.0, 15.25],
        [19.0, 12.50],
        [84.0, 15.56],
        [67.0, 17.91],
        [29.0, 6.89]
    ]
];
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// @Form.create()
@connect(state => ({

}))
export default class StatistGenera extends PureComponent {
  state = {
    rangePickerValue: 'age' ,
    scatterPickerValue: 'age' ,
    dataPickerValue: '7' ,
  }
  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // }
  
  componentDidMount() {
    // 初始化echarts实例
    // let myChartLine = echarts.init(document.getElementById('main'));
    // 绘制图表
  }
  
  getOtionLine() {
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['最高气温', '最低气温']
      // },
      // grid: {
      //   left: '5%',
      //   right: '5%',
      //   bottom: '5%',
      //   top: '5%',
      //   containLabel: true
      // },
      xAxis: {
        axisTick: {
          alignWithLabel:true
        },
        data: ['08/08', '08/09', '08/10', '08/11', '08/12', '08/13', '08/14']
      },
      yAxis: {
        type: 'value',
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '购买频次',
          type: 'line',
          data: [3, 5, 13, 10, 22, 15, 7],
        }
        // {
        //   name: '会员购买频次',
        //   type: 'line',
        //   data: [3, 6, 9, 5, 7, 4, 3],
        // }
      ]
  }
    return option;
}
  getOtionCustPie (){
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // grid: {
      //   left: '5%',
      //   right: '5%',
      //   bottom: '5%',
      //   top: '5%',
      //   containLabel: true
      // },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            { value: 250, name: '人脸支付' },
            { value: 210, name: '微信支付' },
            { value: 184, name: '支付宝支付' },
            { value: 125, name: '银联支付' },
            { value: 100, name: '其他' }
          ],
          roseType: 'radius'
        }
      ]
    }
    return option;
  }
  getOtionBar () {
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        left:'0',
        top:'10',
        data: ['新会员', '老会员']
      },
      // grid: {
      //   left: '5%',
      //   right: '5%',
      //   bottom: '5%',
      //   containLabel: true
      // },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: ['08/08', '08/09', '08/10', '08/11', '08/12', '08/13', '08/14']
        
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: '新会员',
          type: 'bar',
          stack: '总量',
          barWidth: '40%',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '老会员',
          type: 'bar',
          stack: '总量',
          barWidth: '40%',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]

    }
    return option;
  }

// 地图数据
 randomValue() {
  return Math.round(Math.random() * 1000);
}
  //地图数据结束
  getOtionMap () {
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {},
      visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        padding: 10,
        calculable: false,
        itemWidth:15,
        itemHeight:100,
        text: ['高', '低'],
        realtime: false,
        // calculable: true,
        inRange: {
          color: ['#e0ffff', '#006edd']
        },
        // orient:'horizontal',
        // inverse:true,
      },
      series: [
        {
          name: '区域图分布图',
          type: 'map',
          mapType: 'china',
          data: [
            { name: '北京', value: this.randomValue() },
            { name: '天津', value: this.randomValue() },
            { name: '上海', value: this.randomValue() },
            { name: '重庆', value: this.randomValue() },
            { name: '河北', value: this.randomValue() },
            { name: '河南', value: this.randomValue() },
            { name: '云南', value: this.randomValue() },
            { name: '辽宁', value: this.randomValue() },
            { name: '黑龙江', value: this.randomValue() },
            { name: '湖南', value: this.randomValue() },
            { name: '安徽', value: this.randomValue() },
            { name: '山东', value: this.randomValue() },
            { name: '新疆', value: this.randomValue() },
            { name: '江苏', value: this.randomValue() },
            { name: '浙江', value: this.randomValue() },
            { name: '江西', value: this.randomValue() },
            { name: '湖北', value: this.randomValue() },
            { name: '广西', value: this.randomValue() },
            { name: '甘肃', value: this.randomValue() },
            { name: '山西', value: this.randomValue() },
            { name: '内蒙古', value: this.randomValue() },
            { name: '陕西', value: this.randomValue() },
            { name: '吉林', value: this.randomValue() },
            { name: '福建', value: this.randomValue() },
            { name: '贵州', value: this.randomValue() },
            { name: '广东', value: this.randomValue() },
            { name: '青海', value: this.randomValue() },
            { name: '西藏', value: this.randomValue() },
            { name: '四川', value: this.randomValue() },
            { name: '宁夏', value: this.randomValue() },
            { name: '海南', value: this.randomValue() },
            { name: '台湾', value: this.randomValue() },
            { name: '香港', value: this.randomValue() },
            { name: '澳门', value: this.randomValue() }
          ]
      }]
    }
    return option;
  };
  getOtionRingPie () {
    const { rangePickerValue } = this.state;
    const pieAllData = [
      [
        { value: 335, name: '18岁以下' },
        { value: 310, name: '18-24岁' },
        { value: 124, name: '25-35岁' },
        { value: 135, name: '36-46岁' },
        { value: 12, name: '47岁以上' }
      ],
      [
        { value: 405, name: '男' },
        { value: 460, name: '女' }
      ],
      [
        { value: 135, name: '有帽子' },
        { value: 710, name: '没帽子' },
      ],
      [
        { value: 335, name: '有眼镜' },
        { value: 510, name: '没眼镜' }
      ]
      

    ];
    let pieData = [], xValue = [], yValue = [] ;
    if(rangePickerValue == 'age'){
      pieData = pieAllData[0];
    }else if(rangePickerValue == 'sex'){
      pieData = pieAllData[1];
    }else if(rangePickerValue == 'hat'){
      pieData = pieAllData[2];
    }else{
      pieData = pieAllData[3];
    };
    if(pieData.length){
      for(var i = 0; i < pieData.length; i++){ 
        var abj = {};
        abj.icon ='circle';
        abj.name = pieData[i].name;
        xValue.push(abj)  
      }
    };
    yValue = pieData;

    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        itemWidth:15,
        padding: [15, 10],
        align:'right',
        data: xValue
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{c}\n{b}'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '28',
                fontWeight: 'bold',
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: yValue
        }
      ]

    }
    return option;
  }
  getOtionScatter () {
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
        itemWidth:10,
        padding: [10, 5, 20, 5],
        align:'right',
        data: [
          {
            icon: 'circle',
            name:'18岁以下'
            
          },
          {
            name: '18-30',
            icon: 'circle'
          },
          {
            name: '31-41',
            icon: 'circle'
          },
          {
            name: '41-50',
            icon: 'circle'
          },
          {
            name: '51-60',
            icon: 'circle'
          },
          {
            name: '60岁以上',
            icon: 'circle'
          }
        ]
      },
      xAxis: {
        name : '                                                              X轴（分钟）',
        nameLocation:'middle',
        nameGap:'25',
        axisLabel:{
          formatter: '{value}'
        },
        splitLine: {
          show:false,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        name : '                                          Y轴（元）',
        nameLocation:'middle',
        nameGap:'25',
        nameRotate:'90',
        axisTick:{
          show:false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        scale: true
      },
      series: [{
        name: '18岁以下',
        data: Scatterdata[0],
        type: 'scatter'
      }, 
      {
        name: '18-30',
          data: Scatterdata[1],
        type: 'scatter'
      },
      {
        name: '31-40',
          data: Scatterdata[2],
        type: 'scatter'
      },
      {
        name: '41-50',
          data: Scatterdata[3],
        type: 'scatter'
      },
      {
        name: '51-60',
          data: Scatterdata[4],
        type: 'scatter'
      },
      {
        name: '60岁以上',
          data: Scatterdata[5],
        type: 'scatter'
      },
    ]
    }
    return option;
  }

  selectDate = (type, value) => {
    if(value == 'pie'){
       this.setState({
        rangePickerValue: type,
      });
    }else{
      this.setState({
        scatterPickerValue: type,
      });
    }
   
  }

  isActive(type, value) {
    let realvalue ;
    if(value == 'pie'){
      const { rangePickerValue } = this.state;
      realvalue = rangePickerValue;
    }else{
      const { scatterPickerValue } = this.state;
      realvalue = scatterPickerValue;
    }
    if (realvalue == '' || realvalue == undefined) {
      return;
    }
    if (realvalue == type ) {
      return styles.currentDate;
    }
  }


  render() {
    
    // const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
    // const { pspage: { pspage } } = this.props;
    // const { shop: { shop, shopSubmitting } } = this.props;

    return (
      <PageHeaderLayout>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ backgroundColor: '#fff', marginBottom: 16, lineHeight: '35px'}}
        >
          <Menu.Item key="1">最近7天</Menu.Item>
          <Menu.Item key="2">最近14天</Menu.Item>
          <Menu.Item key="3">最近30天</Menu.Item>
        </Menu>
        {/* <div style={{ backgroundColor: '#fff', marginBottom: 16 }}>
          <RadioGroup defaultValue="a">
            <RadioButton value="a">最近7天</RadioButton>
            <RadioButton value="b">最近14天</RadioButton>
            <RadioButton value="c">最近30天</RadioButton>
          </RadioGroup>
        </div> */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle= {{padding:10}} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>推荐商品购买频次收盘
                   <span>全会员购买推荐商品频次</span>
                  </h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <ReactEcharts
                ref= {(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionLine()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle={{ padding: 10 }} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>支付方式</h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionCustPie()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle={{ padding: 10 }} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>新老会员</h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionBar()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle={{ padding: 10 }} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>区域分布</h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionMap()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle={{ padding: 10 }} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>自然属性</h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <div style={{position: 'relative'}}>
                <div className={styles.salesExtra}>
                  <a className={this.isActive('age', 'pie')} onClick={() => this.selectDate('age', 'pie')}>
                    年龄
                  </a>
                  <a className={this.isActive('sex', 'pie')} onClick={() => this.selectDate('sex', 'pie')}>
                    性别
                  </a>
                  <a className={this.isActive('hat', 'pie')} onClick={() => this.selectDate( 'hat', 'pie')}>
                    戴帽子
                  </a>
                  <a className={this.isActive('glasses', 'pie')} onClick={() => this.selectDate('glasses', 'pie')}>
                    戴眼镜
                  </a>
                </div>
              </div>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionRingPie()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ width: '100%' }} bordered={false} bodyStyle={{ padding: 10 }} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col className={styles.cardHead}>
                  <h4>购物行为
                    <span>消费金额与驻留时间</span>
                  </h4>
                </Col>
                <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
              </Row>
              <div style={{position: 'relative'}}>
                <div className={styles.salesExtra}>
                  <a className={this.isActive('age')} onClick={() => this.selectDate('age')}>
                    年龄
                  </a>
                  <a className={this.isActive('sex')} onClick={() => this.selectDate('sex')}>
                    性别
                  </a>
                </div>
              </div>
               
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionScatter()}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    );
  }
}
