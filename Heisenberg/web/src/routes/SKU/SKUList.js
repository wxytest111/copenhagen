import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SKUList.less';
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  skulist: state.skulist,
}))
export default class SKUList extends PureComponent {
  state = {
        fileList: [],
        modalVisible: false,
      };
  
  componentDidMount() {
    this.props.skulist.skulist = [];
    this.props.dispatch({
      type: 'skulist/fetch',
      payload: {
        count: 5,
      },
    });
  }



  showModal = () => {
    this.setState({
      modalVisible:true
    });
  };
  remove = async (id)=>{
    await this.props.dispatch({
      type: 'skulist/removeSKU',
      payload: id,
    });
    this.props.skulist.skulist = [];
    this.props.dispatch({
      type: 'skulist/fetch',
      payload: {
        count: 5,
      },
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
        console.log(values)
        if (!err) {
          values.pic = values.pic.file.response.url;
          await this.props.dispatch({
              type: 'skulist/addSKU',
              payload: values,
          });
          this.setState({
            modalVisible:false
          });
          this.props.skulist.skulist = [];
          this.props.dispatch({
            type: 'skulist/fetch',
            payload: {
              count: 5,
            },
          });
        }
    });
 }
  handleCancel = () => {
    this.setState({
      modalVisible: false,
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
  render() {
    const initProps = {
      name: 'file',
      action: 'http://localhost:3000/api/sku/pic',
      onChange: this.handleChange,
      multiple: false,
    };
    
    const { skulist: { skulist, loading, skuSubmitting } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: skulist.length,
    };

    const ListContent = ({ data: { price, createAt, code, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>价格</span>
          <p>￥{price}</p>
        </div>
        <div>
          <span>更新时间</span>
          <p>{createAt}</p>
        </div>
        <div>
          <span>编码</span>
          <p>{code}</p>
        </div>
        <div>
          <span>商品状态</span>
          <p>{status}</p>
        </div>
      </div>
    );


    const MoreBtn = ({data:id}) => (
      <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(id)}>
      <a>删除</a>
    </Popconfirm>
    );
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
      <Modal title="添加/编辑商品" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={skuSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="商品名称" >
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入商品名称',
                    }],
                    })(
                    <Input placeholder="请输入商品名称" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="商品价格" >
              { getFieldDecorator('price', {
              rules: [{
                  required: true, message: '请输入商品价格',
              }],
              })(
                <InputNumber min={0} step={0.1} placeholder="商品价格" />
              )}
          </FormItem>
            <FormItem {...formItemLayout} label="代码" >
                { getFieldDecorator('code', {
                rules: [{
                    required: true, message: '请输入商品代码',
                }],
                })(
                <Input placeholder="请输入商品代码" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="内容描述" >
                { getFieldDecorator('desc', {
                rules: [{
                    required: true, message: '请输入内容描述',
                }],
                })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入内容描述" rows={4} />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="上传图片">
            { getFieldDecorator('pic', {
                rules: [{
                    required: true, message: '请上传商品图片',
                }],
                })(
                    
                  <Upload {...initProps} fileList={this.state.fileList}>
                    <Button>
                      <Icon type="upload" /> 上传商品图片
                    </Button>
                    <Input type="hidden" />
                  </Upload>

                )}
            </FormItem>
            </Form>
        </Modal>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="商品列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加
            </Button>
            {submitForm()}
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={skulist}
              renderItem={item => (
                <List.Item
                  actions={[<a>编辑</a>, <MoreBtn data={item.id}/>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.pic} shape="square" size="large" />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={item.desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
