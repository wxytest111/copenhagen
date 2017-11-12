import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Tooltip, Popconfirm, Modal, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './PromotionList.less';
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  promotionlist: state.promotionlist,
}))
export default class PromotionList extends PureComponent {
  state = {
        modalVisible: false,
        psModalVisible: false,
        currentId:0,
      };
  
  componentDidMount() {
    this.props.promotionlist.promotionlist = [];
    this.props.dispatch({
      type: 'promotionlist/fetch',
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

  showPSModal = (id) => {
    this.setState({
      psModalVisible :true,
      currentId:id
    });
  };
  remove = async (id)=>{
    await this.props.dispatch({
      type: 'promotionlist/removePromotion',
      payload: id,
    });
    this.props.promotionlist.promotionlist = [];
    this.props.dispatch({
      type: 'promotionlist/fetch',
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
          
          await this.props.dispatch({
              type: 'promotionlist/addPromotion',
              payload: values,
          });
          this.setState({
            modalVisible:false
          });
          this.props.promotionlist.promotionlist = [];
          this.props.dispatch({
            type: 'promotionlist/fetch',
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



  handlePSOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
        //if (!err) {
         values.promotionid = this.state.currentId;
         console.log(values)
          await this.props.dispatch({
              type: 'promotionlist/addPS',
              payload: values,
          });
        //}
    });
 }
  handlePSCancel = () => {
    this.setState({
      psModalVisible: false,
    });
    
  }

  render() {
    
    const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
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
      total: promotionlist.length,
    };

    
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
      <Modal title="添加/编辑推荐信息" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={promotionSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="推荐名称" >
                { getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入推荐名称',
                    }],
                    })(
                    <Input placeholder="请输入推荐名称" />
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
            </Form>
        </Modal>
    );


    const submitPSForm = () => (
        <Modal title="编辑推荐商品列表" visible={this.state.psModalVisible} onOk={this.handlePSOk} onCancel={this.handlePSCancel} confirmLoading={psSubmitting}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
           
          <FormItem {...formItemLayout} label="优先级" >
                  { getFieldDecorator('priority', {
                      rules: [{
                          required: true, message: '请输入优先级',
                      }],
                      })(
                        <InputNumber min={0} step={1} placeholder="优先级" />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="商品编号" >
                  { getFieldDecorator('SKUid', {
                  rules: [{
                      required: true, message: '请输入商品编号',
                  }],
                  })(
                    <InputNumber style={{ width: '100%' }} min={0} step={1} placeholder="请输入商品编号" />
                  )}
              </FormItem>
              </Form>
          </Modal>
      );

    const CardInfo = ({ desc }) => (
        <div className={styles.cardInfo}>
          <div>
            <p>{desc}</p>
          </div>
        </div>
      );
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="推荐列表"
            style={{ marginTop: 24 }}>
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.showModal}>
              添加
            </Button>
            {submitForm()}
            {submitPSForm()}
            
                <List
                size="large"
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                pagination={paginationProps}
                dataSource={promotionlist}
                renderItem={item => (
                    <List.Item key={item.id}>
                    <Card
                      hoverable
                      bodyStyle={{ paddingBottom: 20 }}
                      actions={[
                        <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(item.id)}>
                            <Tooltip title="删除"><Icon type="delete" /></Tooltip>
                        </Popconfirm>,
                        <Tooltip title="编辑"><Icon type="edit" /></Tooltip>,
                        <Tooltip title="绑定商品"><Icon type="share-alt" onClick={this.showPSModal.bind(this,item.id)}/></Tooltip>

                      ]}
                    >
                      <Card.Meta
                        title={item.name}
                      />
                      <div className={styles.cardItemContent}>
                        <CardInfo
                          desc = {item.desc}
                        />
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
