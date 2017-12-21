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

import styles from './StatistPromotion.less';

// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// @Form.create()
@connect(state => ({

}))
export default class StatistPromotion extends PureComponent {
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
          color: '#d1d1d1'
        },
        nameLocation: 'center',
        axisTick: {
          alignWithLabel:true
        },
        type: 'category',
        boundaryGap: false,
        data: ['08/08', '08/09', '08/10', '08/11', '08/12', '08/13', '08/14']
      },
      yAxis: {
        name:'                                                  进店频次',
        nameTextStyle:{
          color: '#d1d1d1'
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
          data: [3, 5, 13, 10, 22, 15, 7],
        },
        {
          name: '未购买推荐商品',
          type: 'line',
          data: [3, 6, 9, 5, 7, 4, 3],
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
 


  render() {
    
    // const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
    // const { pspage: { pspage } } = this.props;
    // const { shop: { shop, shopSubmitting } } = this.props;

    return (
      <PageHeaderLayout>
       
        
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Card style={{ width: '100%', display:'none'}} bordered={false} bodyStyle= {{padding:10}} >
              <Row type="flex" justify="space-between" align="bottom">
                <Col span={13}>
                <Icon type="right-circle" style={{ fontSize: 16, color: '#d1d1d1' }} />
                </Col>
                <Col span={2} className={styles.cardHead}>
                  <h4>总人数<br/>
                    <span>456,789</span>
                  </h4>
                </Col>
                  <span style={{ width:1, height: 45,backgroundColor:'#d1d1d1'}}/>
                <Col span={3} className={styles.cardHead}>
                  <h4>平均来店频次/天<br/>
                    <span>1.5</span>
                  </h4>
                </Col>
                  <span style={{ width:1, height: 45,backgroundColor:'#d1d1d1'}}/>
                <Col span={4} className={styles.cardHead}>
                  <h4>平均购买推荐频次/周<br/>
                    <span>13</span>
                  </h4>
                </Col>
                <Col span={1}/>
              </Row>
              <ReactEcharts
                ref= {(e) => {
                  this.echarts_react = e;
                }}
                option={this.getOtionLine()}
                // style={{ height: '300px', width: '100%' }}
                className='react_for_echarts' />
            </Card>
          </Col>
        </Row>
        
      </PageHeaderLayout>
    );
  }
}
