import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, InputNumber, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
const Search = Input.Search;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SKUType.less';
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  skulist: state.skulist,
  type: state.skutype.type,
  skutype: state.skutype,
  typetree: state.typetree,
}))
export default class SKUType extends PureComponent {
  state = {
    type: {},
    parent: {},
    fileList: [],
    rowKeys:[1],
    modalVisible: false,
    dis:false,
  };
  
  componentDidMount() {
    
    this.props.skutype.skutype = [];
    this.props.dispatch({
      type: 'skutype/fetch',
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
  

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          await this.props.dispatch({
            type: 'skutype/addType',
            payload: values,
          });
         
          this.setState({
            parent: {},
            modalVisible:false
          });
          this.props.skutype.skutype = [];
          this.props.dispatch({
            type: 'skutype/fetch',
            payload: {
              ancestor_key: 0,
            },
          });
          this.props.form.setFieldsValue({
            parentid:null,
            name:null,
            code:null,
            id:null
          })
          this.setState({
            modalVisible: false,
            type: {},
            parent: {},
            dis:false
          });
        }
    });
 }
  handleCancel = () => {
    this.props.form.setFieldsValue({
      parentid:null,
      name:null,
      code:null,
      id:null
    })
    this.setState({
      modalVisible: false,
      type: {},
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

  save(type) {
    // console.log(type)
    this.props.type.type = {};
    
    this.props.dispatch({
      type: 'skutype/getParent',
      payload: {
        id: type.id,
      },
    });
   
    this.props.form.setFieldsValue({
      parentid:type.stt.ancestor_key,
      name:type.name,
      code:type.code,
      id:type.id
    })
    this.setState({
      modalVisible:true,
      type:type,
      // dis:'none'
      dis:true
    })
  }

  remove = async (id)=>{

    await this.props.dispatch({
      type: 'skutype/removeType',
      payload: id,
    });
    this.props.skutype.skutype = [];
    this.props.dispatch({
      type: 'skutype/fetch',
      payload: {
        ancestor_key: 0,
      },
    });
  }

  search = (value) => {

    this.props.skulist.skulist = [];
    var rows =[2];
     this.props.dispatch({
      type: 'skutype/tree',
      payload: {
        name: value,
      },
    });
    // var rows = this.props.skulist.skulist;
    // console.log(value)
    // console.log(this.props.skulist.skulist)
    for (let index = 0; index < rows.length; index++) {
      rows.push(index);
      
    }
    // this.setState({
    //   rowKeys:rows
    // })
    let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
    
  };

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
    
    const { skutype: { skulist, loading, skuSubmitting, skutype, type } } = this.props;
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
      <Modal width={'800px'} title="添加/编辑类型" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={skuSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="类型名称" >
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入类型名称',
                    }],
                    })(
                    <Input placeholder="请输入类型名称" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="类型id" style={{display:'none'}}>
              { getFieldDecorator('id', {
                rules: [{
                    required: false, message: '请输入类型id',
                }],
                })(
                <Input placeholder="请输入类型id"/>
              )}
                
            </FormItem>
            <FormItem {...formItemLayout} label="类型代码">
              { getFieldDecorator('code', {
                rules: [{
                    required: true, message: '请输入类型代码',
                }],
                })(
                <Input placeholder="请输入类型代码"/>
              )}
                
            </FormItem>
            {/* <FormItem {...formItemLayout} label="添加位置"  style={{display:this.state.dis}}> */}
            <FormItem {...formItemLayout} label="添加位置">
              
                <Input id='parentname' placeholder="请选择添加类型的位置" disabled value={this.state.dis?type.name:this.state.parent.name}/>
                { getFieldDecorator('parentid', {
                  // initialValue: this.state.parent.id,
                  rules: [{
                    required: true, message: '请选择添加类型的位置',
                }],
                })(
                  // <Input placeholder="请选择添加类型的位置" disabled style={{display:'none'}}/>
                  <Input placeholder="请选择添加类型的位置" disabled style={{display:'none'}}/>
                )}
                <Table style={{border: '1px solid #d9d9d9'}}
                  loading={loading}
                  onRowClick={this.onRowClick}
                  rowKey={record => record.id}
                  showHeader={false}
                  pagination={false}
                  defaultExpandedRowKeys={[1]}
                  scroll={{ x: true, y: 300 }}
                  columns={columns2} dataSource={skutype} />
                
              
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
                  {record.id==1?'':<a onClick={() => this.save(record)}>编辑</a>}
                  
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
    const onRowClick = {
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
            title="类型树"
            extra={
            
              <Search
              placeholder="请输入搜索关键词"
              style={{ width: 200 }}
              // onSearch={value => console.log(value)}
              onSearch={value => this.search(value)}
              />
            
            }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加
            </Button>
            {submitForm()}
           
            <Table 
              // rowSelection={rowSelection}
              // onRowClick={this.onRowClick}
              loading={loading}
              rowKey={record => record.id}
              showHeader={false}
              pagination={false}
              // expandedRowKeys={this.state.rowKeys}
              defaultExpandedRowKeys={[1]}
              //scroll={{ x: true, y: 300 }}
              columns={columns} dataSource={skutype} />
            
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
