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

import styles from './StatistGenera.less';

// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// @Form.create()
@connect(state => ({

}))
export default class StatistGenera extends PureComponent {
  state = {
    
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
              <ReactEcharts
                ref={(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionMap()}
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

      </PageHeaderLayout>
    );
  }
}
