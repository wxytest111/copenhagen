import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, InputNumber, Form, Table, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
const Search = Input.Search;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SKUBrand.less';
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  sblist: state.sblist,
}))
export default class SKUBrand extends PureComponent {
  state = {
    brand: {},
    file:undefined,
    modalVisible: false,
  };
  
  componentDidMount() {
    this.props.sblist.sblist = [];
    this.props.dispatch({
      type: 'sblist/fetch',
      payload: {
        
      },
    });
      
  }

  showModal = () => {
    this.setState({
      modalVisible:true,
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await this.props.dispatch({
          type: 'sblist/addSKUBrand',
          payload: values,
        });
       
        this.setState({
          modalVisible:false
        });
        this.props.sblist.sblist = [];
        this.props.dispatch({
          type: 'sblist/fetch',
          payload: {
            ancestor_key: 0,
          },
        });
        this.props.form.setFieldsValue({
          name:null,
          id:null,
          code:null,
          desc:null,
        })
        this.setState({
          modalVisible: false,
          file:undefined
        });
      }
    });
 }
  handleCancel = () => {
    this.props.form.setFieldsValue({
      name:null,
      id:null,
      code:null,
      name:null,
    })
    this.setState({
      modalVisible: false,
      file:undefined
    });
    
  }

  handleChange = (info) => {
    let file = info.fileList;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    file = file.slice(-2);

    // 2. read from response and show file link
    file = file.map((f) => {
      if (f.response) {
        // Component will show file.url as link
        f.url = f.response.url;
      }
      return f;
    });

    // 3. filter successfully uploaded files according to response from server
    file = file.filter((f) => {
      if (f.response) {
        return f.response.status === 'success';
      }
      return true;
    });
    this.setState({ 
      file:file.length>0?file:undefined
     });
  }

  save(brand) {
   
    this.props.form.setFieldsValue({
      name:brand.name,
      id:brand.id,
      code:brand.code,
      desc:brand.desc
    })
    this.setState({
      modalVisible:true,
      brand:brand,
    })
  }
  
  remove = async (id)=>{
    
    await this.props.dispatch({
      type: 'sblist/removeSKUBrand',
      payload: id,
    });
    this.props.sblist.sblist = [];
    await this.props.dispatch({
      type: 'sblist/fetch',
      payload: {
        ancestor_key: 0,
      },
    });
  }

  search = async (name)=>{
    this.props.sblist.sblist = [];
    await this.props.dispatch({
      type: 'sblist/fetch',
      payload: {
        name: name,
      },
    });
  }


  render() {
    
    const { sblist: { sblist, loading, brandSubmitting } } = this.props;
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
        total: sblist.length,
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

    const initProps = {
      name: 'file',
      action: 'http://console.tman.ai/api/sku/pic',
      onChange: this.handleChange,
      multiple: false,
    };

  
    const submitForm = () => (
      <Modal width={'40%'}title="添加/编辑SKU品牌" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={brandSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="品牌名称" >
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入品牌名称',
                    }],
                    })(
                    <Input placeholder="请输入品牌名称" />
                  )}
                { getFieldDecorator('id', {
                  rules: [{
                      required: false, message: '请输入品牌id',
                  }],
                  })(
                  <Input placeholder="请输入品牌id" style={{display:'none'}}/>
                )}
                 
            </FormItem>
            <FormItem {...formItemLayout} label="品牌编码">
                 
              { getFieldDecorator('code', {
                rules: [{
                    required: true, message: '请输入品牌编码',
                }],
                })(
                <Input placeholder="请输入品牌编码" />
              )}

            </FormItem>
            <FormItem {...formItemLayout} label="备注" >
                { getFieldDecorator('desc')(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={3} />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="上传图片">
              { getFieldDecorator('pic', {
                rules: [{
                    required: false, message: '请上传品牌图片',
                }],
                })(
                    
                  
                  <Upload {...initProps} fileList={this.state.file}>
                    <Button disabled={this.state.file}>
                      <Icon type="upload" /> 上传品牌图片
                    </Button>
                    <Input type="hidden" />
                  </Upload>

                )}
            </FormItem>
          </Form>
        </Modal>
    );

    const columns = [
      { title: 'logo', dataIndex: 'pic', key: 'pic',width:'20%', className:'column-operations',
        render: (text, record) => {
          return (
            
            <Avatar style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} src={record.pic} shape="square" size="large" />
                  
          );
        },
      },
      { title: '名称', dataIndex: 'name', key: 'name',width:'20%', className:'column-operations',},
      { title: '编码', dataIndex: 'code', key: 'code',width:'20%', className:'column-operations',},
      { title: '备注', dataIndex: 'desc', key: 'desc',width:'20%', className:'column-operations',},
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
            title="SKU品牌"
            extra={
            
              <Search
              placeholder="请输入品牌名称关键词"
              style={{ width: 200 }}
              onSearch={value => this.search(value)}
            />
            
            }

            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加
            </Button>
            {submitForm()}
            <div style={{ height: 10,backgroundColor:'rgb(240, 242, 245)'}}/>
            <Table style={{padding: '10px 0px 0px' }}
              // onRowClick={this.onRowClick}
              loading={loading}
              size="middle"
              rowKey={record => record.id}
              // showHeader={false}
              pagination={paginationProps}
              //scroll={{ x: true, y: 300 }}
              columns={columns} dataSource={sblist} />
            
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
