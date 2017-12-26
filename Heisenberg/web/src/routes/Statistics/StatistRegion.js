import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Row, Col, Button, Icon, Radio, Menu, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import bmap from 'echarts/extension/bmap/bmap';
import moment from 'moment';
//引入地图文件
import 'echarts/map/js/china.js';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getTimeDistance } from '../../utils/utils';
import styles from './StatistRegion.less';
import tracksData from "../../assets/data/tracks.json";
import buslines from "../../assets/data/bus_lines.json";

// @Form.create()
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
  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
    let data = [];
    this.getData(data);
    // this.initalECharts(buslines);
    this.initalEChartshot(tracksData)
  }
  initalEChartshot(data) {
    const myChart = echarts.init(document.getElementById('map'));
    var points = [].concat.apply([], data.map(function (track) {
      return track.map(function (seg) {
        return seg.coord.concat([1]);
      });
    }));
    myChart.setOption({
      animation: false,
      bmap: {
        center: [116.46, 39.92],
        zoom: 4,
        roam: true
      },
      visualMap: {
        show: false,
        top: 'top',
        min: 0,
        max: 30,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'green', 'yellow', 'red']
        }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data: points,
        pointSize: 5,
        blurSize: 6
      }]
    });
  }
  
  initalECharts(data) {
    const myChart = echarts.init(document.getElementById('map'));
    const hStep = 300 / (data.length - 1);
    const busLines = [].concat.apply([], data.map(function (busLine, idx) {
      let prevPt;
      let points = [];
      for (let i = 0; i < busLine.length; i += 2) {
        let pt = [busLine[i], busLine[i + 1]];
        if (i > 0) {
          pt = [
            prevPt[0] + pt[0],
            prevPt[1] + pt[1]
          ];
        }
        prevPt = pt;

        points.push([pt[0] / 1e4, pt[1] / 1e4]);
      }
      return {
        coords: points,
        lineStyle: {
          normal: {
            color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
          }
        }
      };
    }));

    myChart.setOption({
      bmap: {
        center: [116.46, 39.92],
        zoom: 10,
        roam: true,
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#031628'
              }
            },
            {
              'featureType': 'land',
              'elementType': 'geometry',
              'stylers': {
                'color': '#000102'
              }
            },
            {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#0b3d51'
              }
            },
            {
              'featureType': 'local',
              'elementType': 'geometry',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#08304b'
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -70
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#857f7f'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.stroke',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              'featureType': 'green',
              'elementType': 'geometry',
              'stylers': {
                'color': '#062032'
              }
            },
            {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#465b6c'
              }
            },
            {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              'featureType': 'label',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }
          ]
        }
      },
      series: [{
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        data: busLines,
        silent: true,
        lineStyle: {
          normal: {
            // color: '#c23531',
            // color: 'rgb(200, 35, 45)',
            opacity: 0.2,
            width: 1
          }
        },
        progressiveThreshold: 500,
        progressive: 200
      }, {
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        data: busLines,
        lineStyle: {
          normal: {
            width: 0
          }
        },
        effect: {
          constantSpeed: 20,
          show: true,
          trailLength: 0.1,
          symbolSize: 1.5
        },
        zlevel: 1
      }]
    });
  }

  getOtionMap() {
    const { rangePickerValue } = this.state;
    let mapValuecolor = [];
    if (rangePickerValue == 'plane'){
      mapValuecolor = ['#e0ffff', '#006edd'];
    }else{
      mapValuecolor = ['#fbdf89', 'red'];
    }
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
        align:'right',
        // calculable: true,
        inRange: {
          symbolSize: [10, 70],
          color: mapValuecolor
        },
        outOfRange: {
          symbolSize: [10, 70]
        },
        orient:'horizontal',
        inverse:true,
      },
      series: [
        {
          name: '区域图分布图',
          type: 'map',
          mapType: 'china',
          data: [
            { name: '北京', value: randomValue() },
            { name: '天津', value: randomValue() },
            { name: '上海', value: randomValue() },
            { name: '重庆', value: randomValue() },
            { name: '河北', value: randomValue() },
            { name: '河南', value: randomValue() },
            { name: '云南', value: randomValue() },
            { name: '辽宁', value: randomValue() },
            { name: '黑龙江', value: randomValue() },
            { name: '湖南', value: randomValue() },
            { name: '安徽', value: randomValue() },
            { name: '山东', value: randomValue() },
            { name: '新疆', value: randomValue() },
            { name: '江苏', value: randomValue() },
            { name: '浙江', value: randomValue() },
            { name: '江西', value: randomValue() },
            { name: '湖北', value: randomValue() },
            { name: '广西', value: randomValue() },
            { name: '甘肃', value: randomValue() },
            { name: '山西', value: randomValue() },
            { name: '内蒙古', value: randomValue() },
            { name: '陕西', value: randomValue() },
            { name: '吉林', value: randomValue() },
            { name: '福建', value: randomValue() },
            { name: '贵州', value: randomValue() },
            { name: '广东', value: randomValue() },
            { name: '青海', value: randomValue() },
            { name: '西藏', value: randomValue() },
            { name: '四川', value: randomValue() },
            { name: '宁夏', value: randomValue() },
            { name: '海南', value: randomValue() },
            { name: '台湾', value: randomValue() },
            { name: '香港', value: randomValue() },
            { name: '澳门', value: randomValue() }
          ]
        }]
    }
    return option;
  };
  
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
  for (let i = 0; i < 100; i++) {
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
        dataIndex: 'companyName',
        key: 'companyName' + i + 1,
      });
    }
    // const mapHtml = this.state.rangePickerValue == 'plane' ?
    //   <ReactEcharts
    //     ref={(e) => {
    //       this.echarts_react = e;
    //     }}
    //     option={this.getOtionMap()}
    //     notMerge={true}
    //     lazyUpdate={true}
    //     // style={{ height: '300px', width: '100%' }}
    //     className='react_for_echarts' /> : 
    //   <div id="map" style={{ width: '100%', height: 300, }} />;
    
    


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
              <Row type="flex" justify="space-between" align="bottom" >
                <Col span={12}>
                  <Row>
                    <div className={styles.salesExtra}>
                      <a className={this.isActive('plane')} onClick={() => this.selectDate('plane')}>
                        平面图
                      </a>
                      <a className={this.isActive('heat')} onClick={() => this.selectDate('heat')}>
                        热力图
                      </a>
                    </div>
                  </Row>
                  <div style={{ paddingLeft: 30, paddingRight: 15 }}>
                    {/* {mapHtml} */}
                    <div className={this.state.rangePickerValue == 'plane' ? styles.mapshow : styles.maphide}>
                      <ReactEcharts
                        ref={(e) => {
                          this.echarts_react = e;
                        }}
                        option={this.getOtionMap()}
                        notMerge={true}
                        lazyUpdate={true}
                        className='react_for_echarts' /> 
                    </div>
                    <div className={this.state.rangePickerValue == 'plane' ? styles.maphide : styles.mapHotshow}>
                      <div id="map" style={{width:'100%', height:300}}></div>
                    </div> 
                  </div>
                
                </Col>
                <Col span={12}>
                  <Row type="flex" justify="space-between" align="bottom">
                    <Col span={6} className={styles.cardHead}>
                      <h4>总人数<br />
                        <span>{this.state.current == 'week' ? '4,516,789' : this.state.current == 'towWeek' ? '8,236,729' : '12,856,516'}</span>
                      </h4>
                    </Col>
                    <span style={{ width: 1, height: 45, backgroundColor: '#989898' }} />
                    <Col span={8} className={styles.cardHead}>
                      <h4>平均来店人数/天<br />
                        <span>{this.state.current == 'week' ? '224,344' : this.state.current == 'towWeek' ? '443,523' : '1,343,341'}</span>
                      </h4>
                    </Col>
                    <span style={{ width: 1, height: 45, backgroundColor: '#989898' }} />
                    <Col span={8} className={styles.cardHead}>
                      <h4>平均增长人数/周<br />
                        <span>{this.state.current == 'week' ? '560' : this.state.current == 'towWeek' ? '1203' : '1803'}</span>
                      </h4>
                    </Col>
                 </Row>
                  <div style={{ paddingLeft: 15, paddingRight: 30 }}>
                    <ReactEcharts
                      ref={(e) => {
                        this.echarts_react = e;
                      }}

                      option={this.getOtionLine()}

                      className='react_for_echarts' />
                  </div> 
                </Col>
                
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
