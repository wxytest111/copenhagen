import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
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
        [ 7.8, 110.1],
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
        [ 8.4, 123.7],
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
    current:'week',
    getdataNmb: getTimeDistance('week'),
    dataMap: [],
  }
  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // }
  
  componentDidMount() {
    let data = [];
    this.getMapData(data);
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
    let getData = [], xValue = [], yValue = [];
    xValue = getdataNmb
    if (current == 'week') {
      yValue = allAata[0];
    } else if (current == 'towWeek') {
      yValue = allAata[1];
    }else{
      yValue = allAata[2];
    };
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
        data: xValue
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
          data: yValue,
        }
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
            { value: 120, name: '人脸支付' },
            { value: 310, name: '微信支付' },
            { value: 224, name: '支付宝支付' },
            { value: 155, name: '银联支付' },
            { value: 30, name: '其他' }
          ],
          roseType: 'radius'
        }
      ]
    }
    return option;
  }
  getOtionBar () {
    const { current } = this.state;
    const { getdataNmb } = this.state;

    for (let index = 0; index < getdataNmb.length; index++) {
      getdataNmb[index] = moment(getdataNmb[index]).format('MM/DD');
    }
    const allAata = [
      [
        [220, 202, 201, 234, 290, 230, 220],
        [120, 132, 101, 134, 90, 230, 210]
      ],
      [
        [220, 202, 201, 234, 290, 230, 220, 223, 240, 330, 224, 220, 300, 280],
        [120, 132, 101, 134, 90, 230, 210, 203, 200, 230, 204, 120, 200, 180]
      ],
      [
        [220, 202, 201, 234, 290, 230, 220, 223, 240, 330, 224, 220, 300, 280, 215, 106, 193, 155, 115, 117, 180, 240, 235, 145, 167, 135, 144, 123, 234, 113],
        [120, 132, 101, 134, 90, 230, 210, 203, 200, 230, 204, 120, 200, 180, 155, 166, 133, 155, 135, 127, 128, 124, 135, 145, 167, 135, 144, 123, 134, 213],
      ]
    ]
    let getData = [], xValue = [], yValue = [];
    xValue = getdataNmb;
    if (current == 'week') {
      yValue = allAata[0];
    } else if (current == 'towWeek') {
      yValue = allAata[1];
    } else {
      yValue = allAata[2];
    };
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
        data: xValue
        
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
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'inside'
          //   }
          // },
          data: yValue[0]
        },
        {
          name: '老会员',
          type: 'bar',
          stack: '总量',
          barWidth: '40%',
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'inside'
          //   }
          // },
          data: yValue[1]
        }
      ]

    }
    return option;
  }

  getOtionMap () {
    // 地图数据
    var randomValue = () => Math.round(Math.random() * 1000);
    const option = {
      color: ['#6ea5e2', '#91cb63', '#e9cb70', '#d99666', '#d36e5d', '#dea8fb', '#e9b6ae'],
      tooltip: {},
      visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom', 
        padding: [10, 0, 30, 0],
        calculable: false,
        itemWidth: 15,
        itemHeight: 100,
        text: ['高', '低'],
        realtime: false,
        align: 'right',
        // calculable: true,
        inRange: {
          symbolSize: [10, 70],
          color: ['#e0ffff', '#006edd']
        },
        outOfRange: {
          symbolSize: [10, 70]
        },
        orient: 'horizontal',
        inverse: true,
      },
      series: [
        {
          name: '区域图分布图',
          type: 'map',
          mapType: 'china',
          data: this.state.dataMap
      }]
    }
    return option;
  };
  getMapData(data) {
    const province = [
      '北京',
      '天津',
      '上海',
      '重庆',
      '河北',
      '河南',
      '云南',
      '辽宁',
      '黑龙江',
      '湖南',
      '安徽',
      '山东',
      '新疆',
      '江苏',
      '浙江',
      '江西',
      '湖北',
      '广西',
      '甘肃',
      '山西',
      '内蒙古',
      '陕西',
      '吉林',
      '福建',
      '贵州',
      '广东',
      '青海',
      '西藏',
      '四川',
      '宁夏',
      '海南',
      '台湾',
      '香港',
      '澳门'
    ]
    for (let i = 0; i < province.length; i++) {
      data.push({
        name: province[i],
        value: Math.floor(Math.random() * 1000)
      });
    }
    this.setState({
      dataMap: data,
    })
  }
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
      // grid: {
      //   left: '5%',
      //   right: '5%',
      //   bottom: '5%',
      //   top: '5%',
      //   containLabel: true
      // },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        itemWidth:15,
        padding: [15, 10],
        align:'right',
        data: xValue
      },
      // graphic: {
      //   show:false,
      //   type: 'text',
      //   left: 'center',
      //   top: 'center',
      //   style: {
      //     text: '总人数\n 11000',
      //     textAlign: 'center',
      //     fill: '#3b91f7',
      //     fontSize: '26'
      //   }
      // },
      series: [
        {
          name: '年龄',
          type: 'pie',
          radius: ['40%', '60%'],
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
            var xAbj = {}, yAbj= {};
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
        itemWidth:10,
        padding: [10, 10, 40, 5],
        align:'right',
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
        nameGap:'30',
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
        series: yValue
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
  selectDateNmb = (e) =>{
    this.setState({
      current: e.key,
      getdataNmb : getTimeDistance(e.key)
    });
    let data = [];
    this.getMapData(data);
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
          defaultSelectedKeys={['week']}
          onClick={this.selectDateNmb}
          selectedKeys={[this.state.current]}
          style={{ backgroundColor: '#fff', marginBottom: 16, lineHeight: '35px'}}
        >
          <Menu.Item key="week">最近7天</Menu.Item>
          <Menu.Item key="towWeek">最近14天</Menu.Item>
          <Menu.Item key="month">最近30天</Menu.Item>
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
              <Row type="flex" justify="space-between" align="bottom" >
               
                <Col className={styles.cardHead}>
                    <h4>推荐商品购买频次
                   <span>全会员购买推荐商品频次</span>
                    </h4>
                  </Col>
                  <Col>
                    <Link to="/statistics/statist-promotion">
                      <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                    </Link>
                  </Col>
              </Row>
              <ReactEcharts
                ref= {(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionLine()}
                notMerge={true}
                lazyUpdate={true}
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
                {/* <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col> */}
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionCustPie()}
                notMerge={true}
                lazyUpdate={true}
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
                {/* <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col> */}
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionBar()}
                notMerge={true}
                lazyUpdate={true}
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
                  <Link to="/statistics/statist-region">
                    <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                  </Link>
                </Col>
              </Row>
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionMap()}
                notMerge={true}
                lazyUpdate={true}
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
                {/* <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col> */}
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
                notMerge={true}
                lazyUpdate={true}
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
                {/* <Col>
                  <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col> */}
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
                notMerge={true}
                lazyUpdate={true}
                style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    );
  }
}
