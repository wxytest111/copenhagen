import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Tree, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar, Select, Layout } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Shop.less';
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
  shop: state.shop,
  region: state.region,
  expandedKeys: [],
  nature:undefined,
  autoExpandParent: true,
  // checkedKeys: ['0-0-0'],
  selectedKeys: [],
}))
export default class Shop extends PureComponent {
  state = {
        region: {},
        modalVisible: false,
      };
  
  componentDidMount() {
    this.props.region.region = [];
    this.props.dispatch({
      type: 'region/fetch',
      payload: {
        ancestor_key: 0,
      },
    });
    this.props.shop.shop = [];
    this.props.dispatch({
      type: 'shop/fetch',
      payload: {
        
      },
    });

    
  }



  showModal = () => {
    this.setState({
      modalVisible:true
    });
  };


  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      // console.log('values',values)
      if (!err) {
        var list = new Array();
        this.getRegionIdList(list, values.region_id)
        values.region_id= values.region_id.id?values.region_id.id:values.region_id,
        await this.props.dispatch({
          type: 'shop/addShop',
          payload: values,
        });
        if(this.state.nature){
          values.nature=this.state.nature
        }
       
        this.setState({ 
          selectedKeys:[values.region_id+''],
          expandedKeys:[values.region_id+''],
          autoExpandParent: true,
         });
        this.props.shop.shop = [];
        this.props.dispatch({
          type: 'shop/fetch',
          payload: {
            region_id:list
          },
        });
        // this.props.reg.reg = {};
        this.props.form.setFieldsValue({
          region_id:null,
          region_name:null,
          id:null,
          name:null,
          code:null,
          address:null,
          tel:null,
          desc:null,
        })
        this.setState({
          modalVisible: false,
          nature:undefined,
          region: {},
        });
      }
    });
 }
  handleCancel = () => {
    this.props.form.setFieldsValue({
      region_id:null,
      region_name:null,
      id:null,
      name:null,
      code:null,
      address:null,
      tel:null,
      desc:null,
    })
    this.setState({
      modalVisible: false,
       nature:undefined
    });
    
  }


  save(shop) {
    // console.log(shop)
    this.props.form.setFieldsValue({
      id:shop.id,
      name:shop.name,
      code:shop.code,
      address:shop.address,
      tel:shop.tel,
      desc:shop.desc,
      region_id:shop.region_id,
      region_name:shop.region_name,
    })
    this.setState({
      modalVisible:true,
      // shop:shop,
      nature:shop.nature?shop.nature:undefined,
      dis:true
    })
  }
  
  remove = async (id)=>{
    // console.log(id)
    await this.props.dispatch({
      type: 'shop/removeShop',
      payload: id,
    });
    
    this.props.shop.shop = [];
    await this.props.dispatch({
      type: 'shop/fetch',
      payload: {
        
      },
    });
  }





  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  getRegionIdList(list, region){
    list.push(region.id)
    if(region.children){
      for(var i=0; i<region.children.length;i++){
        this.getRegionIdList(list,region.children[i])
      }
    }
  }

  onSelect = (selectedKeys, info) => {
    
    var list = new Array();
    this.getRegionIdList(list, info.node.props.dataRef)
    this.setState({ selectedKeys });
    this.props.shop.shop = [];
    this.props.dispatch({
      type: 'shop/fetch',
      payload: {
        region_id:list
      },
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} dataRef={item}/>;
      // return <TreeNode {...item} />;
    });
  }



  onRowClick = (record, index, event) => {
    console.log(record)
    this.props.form.setFieldsValue({
      region_id:record,
      region_name:record.name
    })
    // this.setState({
    //   dis:false,
    //   region:record
    // })
  };
  handleNatureChange = (nature) => {
    
      this.setState({ nature });
    
  }


  render() {
        
    const { shop: { shop, shoploading, shopSubmitting } } = this.props;
    
    const { region: { region, loading, skuSubmitting } } = this.props;
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
        total: shop.length,
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
          console.log(page)
        }
      };
  
    const submitForm = () => (
      <Modal title="添加/编辑门店" width={'800px'} style={{ top: 30}} visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={shopSubmitting}>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label="门店名称" hasFeedback>
                { getFieldDecorator('id', {
                    rules: [{
                        required: false, message: '请输入门店名称',
                    }],
                    })(
                    <Input placeholder="请输入门店名称"  disabled style={{display:'none'}}/>
                )}
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入门店名称',
                    }],
                    })(
                    <Input placeholder="请输入门店名称" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="添加位置">
                
                {/* <Input id='parentname' placeholder="请选择添加门店的位置" disabled value={this.state.dis?type.name:this.state.parent.name}/> */}
              
                { getFieldDecorator('region_name', {
                  // initialValue: this.state.parent.id,
                  rules: [{
                    required: true, message: '请选择添加门店的位置',
                  }],
                })(
                  // <Input placeholder="请选择添加类型的位置" disabled value={this.state.region.name} style={{display:'none'}}/>
                  <Input placeholder="请选择添加门店的位置" disabled />
                )}
                { getFieldDecorator('region_id', {
                  // initialValue: this.state.region.id,
                  rules: [{
                    required: true, message: '请选择添加门店的位置',
                }],
                })(
                  // <Input placeholder="请选择添加类型的位置" disabled style={{display:'none'}}/>
                  <Input placeholder="请选择添加门店的位置"  disabled style={{display:'none'}}/>
                )}
                <Table
                  size="small"
                  style={{border: '1px solid #d9d9d9'}}
                  loading={loading}
                  onRowClick={this.onRowClick}
                  rowKey={record => record.id}
                  showHeader={false}
                  pagination={false}
                  defaultExpandedRowKeys={[6]}
                  scroll={{ x: true, y: 120 }}
                  columns={columns} dataSource={region} />
                
              
            </FormItem>
            <FormItem {...formItemLayout} label="门店代码" >
                { getFieldDecorator('code', {
                rules: [{
                    required: true, message: '请输入门店代码',
                }],
                })(
                <Input placeholder="请输入门店代码" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="门店地址" >
                { getFieldDecorator('address')(
                <Input placeholder="请输入门店地址" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话" >
                { getFieldDecorator('tel')(
                <Input placeholder="请输入电话号码" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="门店性质" >
                {/* { getFieldDecorator('nature')( */}
                 {/* <Input placeholder="请输入门店性质" /> */}
                <InputGroup >
                  <Select placeholder="请选择门店性质"
                    value={this.state.nature}
                    onChange={this.handleNatureChange}>
                    <Option value="直营店">直营店</Option>
                    <Option value="加盟店">加盟店</Option>
                  </Select>
                </InputGroup>
                {/* )} */}
            </FormItem>
            <FormItem {...formItemLayout} label="备注" >
                { getFieldDecorator('desc')(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={1} />
                )}
            </FormItem>
            
            </Form>
        </Modal>
    );








    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }];
    
    const columns3 = [
      { title: '店名', dataIndex: 'name', key: 'name',width:'20%', },
      { title: '代码', dataIndex: 'code', key: 'code',width:'20%', },
      { title: '性质', dataIndex: 'nature', key: 'nature',width:'20%', },
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
    
    
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };




    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="门店树"
            // extra={
            
              
            
            // }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 20px 32px' }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加门店
            </Button>
            {submitForm()}
            
            <div style={{ height: 10,backgroundColor:'rgb(240, 242, 245)'}}/>
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
                        {this.renderTreeNodes(region)}
                      </Tree>
                    </Content>
                  </div>
                </Layout>
              </Col>
              <Col span={19}>
                <Table className='table'
                  size="middle"
                  bordered={true}
                  loading={shoploading}
                  rowKey={record => record.id}
                  pagination={paginationProps}
                  showHeader={true}
                  scroll={{ x: true, y: 280 }}
                  columns={columns3}
                  expandedRowRender={record => <p>{record.address}</p>}
                  dataSource={shop}
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
