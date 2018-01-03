import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Form, Row, Col, Button, Icon, Radio, Menu, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import moment from 'moment';
//引入地图文件
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';
import styles from './StatistBehavior.less';
import StandardFormRow from '../../components/StandardFormRow';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@Form.create()
@connect(state => ({

}))
export default class StatistRegion extends PureComponent {
  state = {
    dis:'none',
    rangePickerValue: 'plane',
    current:'week',
    getdataNmb: getTimeDistance('week'),
    data:[],
  }
  componentDidMount() {
    
    let data = [];
    this.getData(data);
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

  render() {
    
    // const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
    // const { pspage: { pspage } } = this.props;
    // const { shop: { shop, shopSubmitting } } = this.props;
    const { getFieldDecorator } = this.props.form;

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
    }
    const bodyHeight = document.body.clientHeight - 210 + 'px';
    
    return (
      
      <PageHeaderLayout>
        <div className={styles.cardContainer}>
          <Tabs type="card">
            <TabPane tab="各年龄段购物行为" key="1">
              <div style={{ minHeight: bodyHeight}}>
                <Card bordered={false}>
                  <Form layout="inline">
                    <StandardFormRow title="时间" block style={{ paddingBottom: 0, paddingTop: 0, border:0, marginBottom: 0}}>
                     
                    </StandardFormRow>
                    <StandardFormRow
                      title="会员"
                      grid
                      last
                      block style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
                    >
                      <Row gutter={16}>
                        <Col lg={8} md={10} sm={10} xs={24}>
                        </Col>
                        <Col lg={8} md={10} sm={10} xs={24}>
                        </Col>
                      </Row>
                    </StandardFormRow>
                  </Form>
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
