import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Tree, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar, Select, Layout } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ShopSKU.less';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;

@Form.create()
@connect(state => ({
  skulist: state.skulist,
  region: state.region,
  shop: state.region,
  expandedKeys: ['6'],
  autoExpandParent: true,
  selectedKeys: [],
}))
export default class Equipment extends PureComponent {
  state = {
        modalVisible: false,
        dis:true,
        shop_id:undefined,
        type:undefined,
      };
  
  componentDidMount() {
    this.props.region.shop = [];
    this.props.dispatch({
      type: 'region/queryRSList',
      payload: {
        // type: 0,
      },
    });
    this.props.skulist.skulist = [];
    // this.props.dispatch({
    //   type: 'skulist/fetch',
    //   payload: {
    //     count: 5,
    //   },
    // });

    
  }






  onExpand = (expandedKeys) => {
    // console.log('onExpand', expandedKeys);
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  getEquipmentIdList(list, region){
    // console.log('region',region.shop.length)
    if(region.shop.length>0){
      for(var i=0; i<region.shop.length;i++){
        list.push(region.shop[i])
      }
    }
    if(region.children.length>0){
      this.getEquipmentIdList(list,region.children[i])
    }
  }

  onSelect = (selectedKeys, info) => {

    // console.log('selectedKeys',selectedKeys)
    // console.log('info',info)
    if(selectedKeys.length>0){
      this.props.skulist.skulist = [];
      this.props.dispatch({
        type: 'skulist/fetch',
        payload: {
          key:selectedKeys[0],
        },
      });
      
      this.setState({
        selectedKeys:selectedKeys,
        shop_id:selectedKeys[0],
        
      })
    }
    // if(selectedKeys.length>0){
    //   var list = new Array();
    //   for(var i=0; i<selectedKeys.length;i++){
    //     if(selectedKeys[i].length>11){
    //       list.push(selectedKeys[i])
    //     } else {
    //       this.getEquipmentIdList(list, info.node.props.dataRef)
    //     }
    //   }
    //   console.log('list',list)
    //   this.props.equipment.equipment = [];
    //   this.props.dispatch({
    //     type: 'equipment/fetch',
    //     payload: {
    //       equipment:list
    //       // equipment:{shop_id:selectedKeys[0]}
    //     },
    //   });
      
    //   this.setState({
    //     selectedKeys:selectedKeys,
    //     dis:false,
    //     shop_id:selectedKeys[0],
        
    //   })
    // }
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      var shop = new Array();
      if (item.shop) {
        item.shop.map((s) => {(
          shop.push(s)
        );
      });
    }
    if (item.children || shop.length>0) {
      if(item.children){
        item.children.map((s) => {(
          shop.push(s)
        );
      });
      }
        var r = (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(shop)}
          </TreeNode>
            )
          return (
            r
          );
          
        }
          var c = (<TreeNode title={item.name} key={item.id} dataRef={item}/>)
    return (
      c
    );
    });
  }

 

  render() {
        
    // const { equipment: { equipment, equipmentloading, equipmentSubmitting } } = this.props;
    const { skulist: { skulist, loading, skuSubmitting, ruleSubmitting } } = this.props;
    const { shop: { shop } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 14 },
        },
      };

      const paginationProps = {
        // size:'small',
        // showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        // current:this.state.current,
        total: skulist.length,
        onChange:(page)=>{
          // this.props.pspage.pslist =  {},
          // // console.log(this.state.promotionid)
          // this.props.dispatch({
          //   type: 'pslist/queryPskuList',
          //   payload: {
          //     pageSize: 3,
          //     pageNum: page,
          //     // promotionid: pspage.rows[0].promotionSKU.promotionid,
          //     promotionid: this.state.promotionid,
          //   },
          // });
          
          // this.setState({
          //   current:page,
          // });
          // console.log(page)
        }
      };



    
    const columns = [
      { title: '缩略图', dataIndex: 'pic', key: 'pic',width:120, className:'column-operations',fixed: 'left',
        render: (text, record) => {
          return (
            <Avatar style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} src={record.pic} shape="square" size="large" />
          );
        },
      },

      { title: '店铺', dataIndex: 'shop', key: 'shop',width:110, className:'column-operations',
      render: (text, record) => {
          return record.shop?(
            record.shop.map((item) => {
            return ( 
              <span key={item.id}>
                {item.name}<br/>
              </span>
            )
            })):null
      },
      },
      { title: '商品编码', dataIndex: 'identity', key: 'identity',width:110, className:'column-operations',},
      { title: '商品代码', dataIndex: 'code', key: 'code',width:110, className:'column-operations',},
      { title: '输入码', dataIndex: 'input_code', key: 'input_code',width:110, className:'column-operations',},
      { title: '商品名称', dataIndex: 'name', key: 'name',width:110, className:'column-operations',},
      { title: '类别代码', dataIndex: 'SKU_type_code', key: 'SKU_type_code',width:110, className:'column-operations',},
      { title: '类别名称', dataIndex: 'SKU_type_name', key: 'SKU_type_name',width:110, className:'column-operations',},
      { title: '品牌', dataIndex: 'SKU_brand_name', key: 'SKU_brand_name',width:110, className:'column-operations',},
      { title: '价格', dataIndex: 'price', key: 'price',width:110, className:'column-operations',},
      { title: '备注', dataIndex: 'desc', key: 'desc',width:110, className:'column-operations',},
      { title: '规则', dataIndex: 'rule_id.id', key: 'rule_id.id',width:110, className:'column-operations',
        render: (text, record) => {
          // console.log("record.rule_id",record.rule_id)
          return (
              record.rule_id?
              <div>
              {record.rule_id.sex==='全部'?'男/女':record.rule_id.sex}{record.rule_id.sex?<br/>:null}
              {record.rule_id.age_start} {record.rule_id.age_start?'-':null} {record.rule_id.age_end} {record.rule_id.age_end?'岁':null}{record.rule_id.age_end?<br/>:null}
              {record.rule_id.eyeglasses==='否'?'':'戴眼镜'}
              </div>
              :null
          );
        },
      },
    ];
    
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="门店SKU列表"
            // extra={
            
              
            
            // }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 20px 32px' }}>
            
            
            
            {/* <div style={{ height: 10,backgroundColor:'rgb(240, 242, 245)'}}/> */}
            <Row style={{padding: '10px 0px 0px' }}>
              <Col span={5}>
                <Search
                  placeholder="请输入搜索关键词"
                  style={{ width: '95%' }}
                  onSearch={value => console.log(value)}
                />
                <Layout>
                  <div style={{ background: '#fff' }}>
                    <Content style={{ overflow:'auto', border:'1px solid #d9d9d9',width: '95%', height:435, maxHeight:435}}>
                      <Tree
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys?this.state.expandedKeys:['6']}
                        autoExpandParent={this.state.autoExpandParent}
                        // checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                      >
                        {this.renderTreeNodes(shop)}
                      </Tree>
                    </Content>
                  </div>
                </Layout>
              </Col>
              <Col span={19}>
                
                {/* <Table className='table'
                  size="small"
                  bordered={true}
                  loading={equipmentloading}
                  rowKey={record => record.id}
                  pagination={paginationProps}
                  showHeader={true}
                  scroll={{ x: true, y: 280 }}
                  columns={columns}
                  // expandedRowRender={record => <p>{record.address}</p>}
                  dataSource={equipment}
                /> */}
                <Table 
              // style={{border: '1px solid #d9d9d9'}}
                // onRowClick={this.onRowClick}
                loading={loading}
                size="small"
                bordered
                rowKey={record => record.id}
                // showHeader={false}
                pagination={paginationProps}
                scroll={{ x: 1300,y:435}}
                columns={columns} dataSource={skulist} />
              </Col>
            </Row>
          </Card>

          {/* <div style={{ backgroundColor:'#fff', padding: '10px 30px 20px' }}>
          </div> */}
        </div>
      </PageHeaderLayout>
    );
  }
}
