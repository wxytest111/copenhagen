import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Tree, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar, Select, Layout } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Equipment.less';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;

@Form.create()
@connect(state => ({
  equipment: state.equipment,
  region: state.region,
  shop: state.region,
  expandedKeys: [],
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
    this.props.equipment.equipment = [];
    // this.props.dispatch({
    //   type: 'equipment/fetch',
    //   payload: {
        
    //   },
    // });

    
  }



  showModal = () => {
    this.setState({
      modalVisible:true
    });
  };


  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      
      if(this.state.shop_id){
        values.shop_id=this.state.shop_id
      }
      // console.log(values)
      if (!err) {
        await this.props.dispatch({
          type: 'equipment/addEquipment',
          payload: values,
        });
       
        
        this.props.equipment.equipment = [];
        this.props.dispatch({
          type: 'equipment/fetch',
          payload: {
            equipment:{
              shop_id:this.state.shop_id,
              type:this.state.type,
            }
          },
        });
        this.props.form.setFieldsValue({
          id:undefined,
          type:undefined,
          equipment_ID:undefined,
          desc:undefined,
        })
        this.setState({
          modalVisible: false,
        });
      }
    });
 }
  handleCancel = () => {
    this.props.form.setFieldsValue({
      id:undefined,
      type:undefined,
      equipment_ID:undefined,
      desc:undefined,
    })
    this.setState({
      modalVisible: false,
    });
    
  }


  save(equipment) {
    // console.log(equipment)
    this.props.form.setFieldsValue({
      id:equipment.id,
      type:equipment.type,
      equipment_ID:equipment.equipment_ID,
      desc:equipment.desc,
    })
    this.setState({
      modalVisible:true,
    })
  }
  
  remove = async (id)=>{
    // console.log(id)
    await this.props.dispatch({
      type: 'equipment/removeEquipment',
      payload: id,
    });
    
    this.props.equipment.equipment = [];
    await this.props.dispatch({
      type: 'equipment/fetch',
      payload: {
        equipment:{
          shop_id:this.state.shop_id,
          type:this.state.type,
        }
      },
    });
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
    if(selectedKeys.length>0 && selectedKeys[0].length>11){
      this.props.equipment.equipment = [];
      this.props.dispatch({
        type: 'equipment/fetch',
        payload: {
          // equipment:{shop_id:selectedKeys}
          equipment:{
            shop_id:selectedKeys[0],
            type:this.state.type
          },
          
        },
      });
      
      this.setState({
        selectedKeys:selectedKeys,
        dis:false,
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
      // if(item.id.length>11){
        var r = (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(shop)}
          </TreeNode>
            )
      // } else {
      //   var r = (
      //     <TreeNode title={item.name} key={item.id} disabled dataRef={item}>
      //       {this.renderTreeNodes(shop)}
      //     </TreeNode>
      //       )
      // }
      
          return (
            r
          );
          
        }
        // if(item.id.length>11){
          var c = (<TreeNode title={item.name} key={item.id} dataRef={item}/>)
        // } else {
        //   var c = (<TreeNode title={item.name} key={item.id} disabled dataRef={item}/>)
        // }
    return (
      c
    );
    });
  }

  handleNatureChange = (type) => {
    // console.log('type',type)
    this.props.equipment.equipment = [];
    this.props.dispatch({
      type: 'equipment/fetch',
      payload: {
        equipment:{
          shop_id:this.state.shop_id,
          type:type,
        }
      },
    });
    this.setState({ type });
    
  }

  render() {
        
    const { equipment: { equipment, equipmentloading, equipmentSubmitting } } = this.props;
    const { shop: { shop, loading, skuSubmitting } } = this.props;
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
        total: equipment.length,
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
  
    const submitForm = () => (
      <Modal title="添加/编辑门店"  style={{ top: 30}} visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={equipmentSubmitting}>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label="id" hasFeedback>
                { getFieldDecorator('id', {
                    rules: [{
                        required: false, message: '请输入id',
                    }],
                    })(
                    <Input placeholder="请输入id"  disabled style={{display:'none'}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="设备类型">
                { getFieldDecorator('type', {
                    rules: [{
                        required: true, message: '请选择设备类型',
                    }],
                    })(
                      <Select placeholder="请选择设备类型"
                      >
                      <Option value="1"><Icon type="camera" />抓拍机</Option>
                      <Option value="2"><Icon type="tablet" />PAD</Option>
                      <Option value="3"><Icon type="laptop" />双面POS机</Option>
                    </Select>
                )}
            </FormItem>
            
            <FormItem {...formItemLayout} label="设备ID" >
                { getFieldDecorator('equipment_ID', {
                rules: [{
                    required: true, message: '请输入设备ID',
                }],
                })(
                <Input placeholder="请输入设备ID" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" >
                { getFieldDecorator('desc')(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={3} />
                )}
            </FormItem>
            
            </Form>
        </Modal>
    );



    
    const columns = [
      { title: '设备ID', dataIndex: 'equipment_ID', key: 'equipment_ID',width:'20%', 
      render: (text, record) => {
        return (
          <span><Icon style={{ fontSize: 18 }} type={record.type==1?"camera":record.type==2?"tablet":"laptop"} />{record.equipment_ID}</span>
        );
      },
    },
      { title: '备注', dataIndex: 'desc', key: 'desc',width:'20%', },
      { title: '操作', dataIndex: '', key: 'x', width:'16%', 
        className:'column-operations',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              <span>
                <a onClick={() => this.save(record)}>编辑</a>
                <span style={{color:'#d9d9d9'}} >|</span>
                { 
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.remove(record.id)}>
                    <a>删除</a>
                  </Popconfirm>
                }
              </span>
            }
          </div>
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
            title="设备列表"
            // extra={
            
              
            
            // }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 20px 32px' }}>
            
            {submitForm()}
            
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
                    <Content style={{ overflow:'auto', border:'1px solid #d9d9d9',width: '95%', height:300, maxHeight:300}}>
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
                <Select placeholder="查看所有设备"
                  style={{ width: 130 }}
                  disabled={this.state.dis}
                  defaultValue="0"
                  onChange={this.handleNatureChange}>
                  
                  <Option value="0">查看所有设备</Option>
                  <Option value="1"><Icon type="camera" />抓拍机</Option>
                  <Option value="2"><Icon type="tablet" />PAD</Option>
                  <Option value="3"><Icon type="laptop" />双面POS机</Option>
                </Select>
                &nbsp;&nbsp;
                <Button type="dashed" style={{ marginBottom: 8 }} disabled={this.state.dis} icon="plus" onClick={this.showModal}>
                  添加设备
                </Button>
                <Table className='table'
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
                />
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
