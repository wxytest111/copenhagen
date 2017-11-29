import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, InputNumber, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
const Search = Input.Search;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Region.less';
import { isNull } from 'util';
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  skulist: state.skulist,
  reg: state.region.reg,
  region: state.region,
}))
export default class Region extends PureComponent {
  state = {
    region: {},
    parent: {},
    fileList: [],
    modalVisible: false,
    dis:false,
  };
  
  componentDidMount() {
    this.props.region.region = [];
    this.props.dispatch({
      type: 'region/fetch',
      payload: {
        ancestor_key: 0,
      },
    });
      
  }

  showModal = () => {
    this.setState({
      modalVisible:true,
      // dis:''
    });
  };
  // remove = async (id)=>{
  //   await this.props.dispatch({
  //     type: 'skulist/removeSKU',
  //     payload: id,
  //   });
  //   this.props.region.region = [];
  //   this.props.dispatch({
  //     type: 'region/fetch',
  //     payload: {
  //       ancestor_key: 0,
  //     },
  //   });
  // }

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await this.props.dispatch({
          type: 'region/addRegion',
          payload: values,
        });
       
        this.setState({
          parent: {},
          modalVisible:false
        });
        this.props.region.region = [];
        this.props.dispatch({
          type: 'region/fetch',
          payload: {
            ancestor_key: 0,
          },
        });
      }
    });
    // this.props.reg.reg = {};
    this.props.form.setFieldsValue({
      parentid:null,
      name:null,
      id:null
    })
    this.setState({
      modalVisible: false,
      region: {},
      parent: {},
      dis:false
    });
 }
  handleCancel = () => {
    // this.props.reg.reg = {};
    this.props.form.setFieldsValue({
      parentid:null,
      name:null,
      id:null
    })
    this.setState({
      modalVisible: false,
      region: {},
      parent: {},
      dis:false
    });
    
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });
    this.setState({ fileList });
  }

  save(region) {
    // console.log(region)
    // console.log(region.tt.ancestor_key)
    this.props.reg.reg = {};
    
    this.props.dispatch({
      type: 'region/getParent',
      payload: {
        id: region.id,
      },
    });
   
    this.props.form.setFieldsValue({
     
      parentid:region.tt.ancestor_key,
      name:region.name,
      id:region.id
    })
    this.setState({
      modalVisible:true,
      region:region,
      
      // dis:'none'
      dis:true
    })
  }
  
  remove = async (id)=>{
    
    await this.props.dispatch({
      type: 'region/removeRegion',
      payload: id,
    });
    this.props.region.region = [];
    await this.props.dispatch({
      type: 'region/fetch',
      payload: {
        ancestor_key: 0,
      },
    });
  }

  onRowClick = (record, index, event) => {
    this.props.form.setFieldsValue({
      parentid:record.id
    })
    this.setState({
      dis:false,
      parent:record
    })
  };

  render() {
    
    const { region: { skulist, loading, skuSubmitting, reg, region } } = this.props;
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
  
    const submitForm = () => (
      <Modal width={'800px'}title="添加/编辑区域" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={skuSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="区域名称" >
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入区域名称',
                    }],
                    })(
                    <Input placeholder="请输入区域名称" />
                  )}
                { getFieldDecorator('id', {
                  rules: [{
                      required: false, message: '请输入区域id',
                  }],
                  })(
                  <Input placeholder="请输入区域id" style={{display:'none'}}/>
                )}
                 
            </FormItem>
            {/* <FormItem {...formItemLayout} label="添加位置" style={{display:this.state.dis}}> */}
            <FormItem {...formItemLayout} label="添加位置">
                 
              <Input id='parentname' placeholder="请选择添加区域的位置" disabled value={this.state.dis?reg.name:this.state.parent.name}/>
              { getFieldDecorator('parentid', {
                // initialValue: this.state.parent.id,
                rules: [{
                  required: true, message: '请选择添加区域的位置',
              }],
              })(
                //<Input placeholder="请选择添加区域的位置" disabled style={{display:'none'}}/>
                <Input placeholder="请选择添加区域的位置" disabled style={{display:'none'}}/>
              )}
              <Table style={{border: '1px solid #d9d9d9'}}
                loading={loading}
                onRowClick={this.onRowClick}
                rowKey={record => record.id}
                showHeader={false}
                pagination={false}
                defaultExpandedRowKeys={[6]}
                scroll={{ x: true, y: 300 }}
                columns={columns2} dataSource={region} />
              
            
          </FormItem>
            </Form>
        </Modal>
    );

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '90%',
    },{
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              
                <span>
                  {record.id==6?'':<a onClick={() => this.save(record)}>编辑</a>}

                  { record.children==null?
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.remove(record.id)}>
                      <a>删除</a>
                    </Popconfirm>
                  :''}
                </span>
               
            }
          </div>
        );
      },
    }];

    const columns2 = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '100%',
    }];
    
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
            title="区域树"
            extra={
            
              <Search
              placeholder="请输入搜索关键词"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
            
            }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加
            </Button>
            {submitForm()}

            <Table 
              // onRowClick={this.onRowClick}
              loading={loading}
              rowKey={record => record.id}
              showHeader={false}
              pagination={false}
              defaultExpandedRowKeys={[6]}
              //scroll={{ x: true, y: 300 }}
              columns={columns} dataSource={region} />
            
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
