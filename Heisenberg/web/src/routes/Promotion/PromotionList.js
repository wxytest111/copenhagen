import React, { PureComponent } from 'react';
import request from '../../utils/request';
import { connect } from 'dva';
import { Select, Tooltip, Popconfirm, Modal, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import PromotionWrapper from '../../components/PromotionWrapper'; 

import styles from './PromotionList.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const confirm = Modal.confirm;
@Form.create()
@connect(state => ({
  promotionlist: state.promotionlist,
  pspage: state.pslist,
}))
export default class PromotionList extends PureComponent {
  state = {
        // psPage: {},
        modalVisible: false,
        modalVisible2: false,
        psModalVisible: false,
        currentId:0,
        current: 1,
        promotion:[],
        promotionid:0,
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
  showModal2 = (promotion) => {

    this.props.form.setFieldsValue({
      desc:promotion.desc,
      name:promotion.name,
    })
    this.props.pspage.pslist =  {},
    // console.log('pageSize'),
    // console.log(promotion),
    this.props.dispatch({
      type: 'pslist/queryPskuList',
      payload: {
        pageSize: 3,
        pageNum: 1,
        promotionid: promotion.id,
      },
    });
    

    this.setState({
      promotionid:promotion.id,
      // promotion:promotion,
      modalVisible2:true
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
  removepsku = async (id)=>{
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
    this.props.form.setFieldsValue({
      desc:null,
      name:null,
    })
 }
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
    
  }
  handleCancel2 = () => {
    this.props.form.setFieldsValue({
      desc:null,
      name:null,
    })
    this.setState({
      modalVisible2: false,
      current: 1,
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
    const { pspage: { pspage } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    
    const ListContent = ({ data: { price, createAt, code, status } }) => (
      <div style={{width: '500px',display:'flex' }}>
        <div style={{flex:1}}>
          <span>价格</span>
          <p>￥{price}</p>
        </div>
        <div style={{flex:1}}>
          <span>更新时间</span>
          <p>{createAt}</p>
        </div>
        <div style={{flex:1}}>
          <span>编码</span>
          <p>{code}</p>
        </div>
        <div style={{flex:1}}>
          <span>商品状态</span>
          <p>{status}</p>
        </div>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: promotionlist.length,
    };
    
    const paginationProps2 = {
      // size:'small',
      // showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 3,
      current:this.state.current,
      total: pspage.count,
      onChange:(page)=>{
        this.props.pspage.pslist =  {},
        // console.log(this.state.promotionid)
        this.props.dispatch({
          type: 'pslist/queryPskuList',
          payload: {
            pageSize: 3,
            pageNum: page,
            // promotionid: pspage.rows[0].promotionSKU.promotionid,
            promotionid: this.state.promotionid,
          },
        });
        
        this.setState({
          current:page,
        });
        console.log(page)
      }
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
                      <Input placeholder="请输入推荐名称"/>
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


      function showDeleteConfirm() {
        confirm({
          title: 'Are you sure delete this SKU?',
          content: '',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const MoreBtn = ({data:id}) => (
      <Popconfirm title="是否要删除此行？" onConfirm={() => this.removepsku(id)}>
      <a>删除</a>
    </Popconfirm>
    );
  
    // console.log(pspage)
    const submitForm2 = () => (
      
      <Modal title="编辑推荐信息" visible={this.state.modalVisible2} onOk={this.handleOk}
      width={1200} onCancel={this.handleCancel2} confirmLoading={promotionSubmitting} style={{top: 30}}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 4 }}>
          <FormItem {...formItemLayout} label="推荐名称" >
                { getFieldDecorator('name', {
                    initialValue: this.state.promotion.name,
                    rules: [{
                        required: true, message: '请输入推荐名称',
                    }],
                    })(
                      
                      // <Input placeholder='请输入推荐名称' defaultValue={this.state.promotion.name}/>
                       <Input placeholder='请输入推荐名称' />
                )}
          </FormItem>
          <FormItem {...formItemLayout} label="内容描述" >
              { getFieldDecorator('desc', {
                initialValue: this.state.promotion.desc,
              rules: [{
                  required: true, message: '请输入内容描述',
              }],
              })(
              // <TextArea style={{ minHeight: 32 }} placeholder="请输入内容描述" value={this.state.promotion.desc} rows={4} />
              <TextArea style={{ minHeight: 32 }} placeholder="请输入内容描述" rows={4} />
              )}
          </FormItem>  
            


          <FormItem>
            <Card
              className={styles.listCard}
              bordered={false}
              title="商品列表"
              extra={<Button style={{ marginRight: 950}} type="primary" onClick={this.showPSModal.bind(this,this.state.promotion.id)}>添加</Button>}
              //style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}>
              
              <List
                style={{height:270}}
                //size="small"
                rowKey="id"
                loading={loading}
                pagination={paginationProps2}
                dataSource={pspage.rows}
                renderItem={item => (
                  
                // console.log(item),
                  <List.Item
                  style={{height:70}}
                    //actions={[<a>编辑</a>, <MoreBtn data={item.id}/>]}
                    actions={[
                      
                      <Button onClick={showDeleteConfirm} type="dashed">
                        解绑
                      </Button>
                    ]}
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
                    <Input style={{ width: '100%' }}  placeholder="请输入商品编号" />
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
            {submitForm2()}
            {submitPSForm()}
            {/* <PromotionWrapper
              src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
              desc="示意图"
            />; */}
            
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
                        <Tooltip title="编辑"><Icon type="edit" onClick={this.showModal2.bind(this,item)}/></Tooltip>,
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
