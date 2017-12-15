import React, { PureComponent } from 'react';
import request from '../../utils/request';
import moment from 'moment';
import { connect } from 'dva';
import { DatePicker, Select, Tabs, Tooltip, Popconfirm, Modal, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Dropdown, Menu, Avatar, Tree } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import PromotionWrapper from '../../components/PromotionWrapper'; 

import styles from './PromotionList.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
@Form.create()
@connect(state => ({
  skulist: state.skulist,
  shop: state.skulist,
  promotionlist: state.promotionlist,
  pspage: state.pslist,
}))
export default class PromotionList extends PureComponent {
  state = {
        // psPage: {},
        modalVisible: false,
        psModalVisible: false,  
        currentId:0,
        current: 1,
        promotion:[],
        promotionid:0,
        expandedKeys: ['6'],
        autoExpandParent: true,
        checkedKeys: [],
        nature: '0',
        waresClass: '1',
        checkCode: false,
        checkClass: false,

      };
  
  componentDidMount() {
    this.props.promotionlist.promotionlist = [];
    this.props.dispatch({
      type: 'promotionlist/fetch',
      payload: {
        count: 5,
      },
    });
    this.props.skulist.shop=[];
    this.props.dispatch({
      type: 'skulist/queryRSList',
      payload: {
        ancestor_key: 0,
      },
    });
  }

  showModal = (promotion) => {
    console.log(promotion)
    
    if (promotion){
      if (promotion.shop) {
        var keys = [];
        for (var i = 0; i < promotion.shop.length; i++) {
          keys.push(promotion.shop[i].shopid);
        }
        // if(sku.region){
        //   for(var j=0;j<sku.region.length;j++){
        //     keys.push(sku.region[j].regionid+'')
        //     // console.log(sku.region[j].regionid)
        //   }
        // }
        // console.log('keys',keys)
        this.setState({
          checkedKeys: keys,
          expandedKeys: keys,
        })
      }
    
      this.props.form.setFieldsValue({
        desc: promotion.desc,
        name: promotion.name,
        end_time: moment(promotion.end_time),
        start_time: moment(promotion.start_time),
        id: promotion.id
      })
      this.props.pspage.pslist = {},
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
        promotionid: promotion.id,
        // promotion:promotion,
        modalVisible: true
      });
    }else{
      this.setState({
        modalVisible: true
      });
    }
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
          this.props.form.setFieldsValue({
            keys: undefined
          });
          this.setState({
            nature: '0',
            modalVisible:false,
            checkedKeys: [],
            expandedKeys: ['6'],
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
      end_time: null,
      start_time: null,
      id: null
    })
 }

  handleCancel = () => {
    this.props.form.setFieldsValue({
      desc:null,
      name:null,
      end_time: null,
      start_time: null,
      id: null
    })
    this.setState({
      modalVisible: false,
      nature: '0',
      checkedKeys: [],
      expandedKeys: ['6'],
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

  shop(sku) {
    // console.log('sku',sku)
    if (sku.shop) {
      var keys = [];
      for (var i = 0; i < sku.shop.length; i++) {
        keys.push(sku.shop[i].id);
      }
      // if(sku.region){
      //   for(var j=0;j<sku.region.length;j++){
      //     keys.push(sku.region[j].regionid+'')
      //     // console.log(sku.region[j].regionid)
      //   }
      // }
      // console.log('keys',keys)
      this.setState({
        checkedKeys: keys,
        expandedKeys: keys,
      })
      this.props.form.setFieldsValue({
        id: sku.id,
      })
    } else {
      this.props.form.setFieldsValue({
        id: sku.id,
      })
    }
    this.setState({
      modalVisibleShop: true,
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      var shop = new Array();
      if (item.shop) {
        item.shop.map((s) => {
          (
            shop.push(s)
          );
        });
      }
      if (item.children || shop.length > 0) {
        if (item.children) {
          item.children.map((s) => {
            (
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
      var c = (<TreeNode title={item.name} key={item.id} dataRef={item} />)
      // } else {
      //   var c = (<TreeNode title={item.name} key={item.id} disabled dataRef={item}/>)
      // }
      return (
        c
      );
    });
  }
  handleClassChange = (waresClass) => {
    console.log(waresClass)
    // this.setState({ waresClass });
  }

  handleNatureChange = (nature) => {
    // console.log('nature',nature)
    this.props.skulist.shop = [];
    this.props.dispatch({
      type: 'skulist/queryRSList',
      payload: {
        nature: nature,
      },
    });
    this.setState({ nature });

  }
  onCheck = (checkedKeys, info) => {

    console.log('halfCheckedKeys',info.halfCheckedKeys)
    console.log('checkedKeys',checkedKeys)
    console.log('info',info)
    var keys = checkedKeys.concat(info.halfCheckedKeys);
    this.setState({
      checkedKeys: checkedKeys,
      expandedKeys: keys,
    });

    this.props.form.setFieldsValue({
      keys: keys
    })
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
  callback = (key) => {
    // console.log(key)
    if (key == 2) {
      this.setState({
        checkCode: true,
        checkClass: true
      })
    }
  }

  render() {
    
    const { promotionlist: { promotionlist, loading, promotionSubmitting,psSubmitting } } = this.props;
    const { pspage: { pspage } } = this.props;
    const { shop: { shop, shopSubmitting } } = this.props;
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
    const submitForm = () => (
      
      <Modal title="新建/编辑推荐方案" visible={this.state.modalVisible} width={650} onOk={this.handleOk} onCancel={this.handleCancel} confirmLoading={promotionSubmitting} style={{top: 30}}>
        <Tabs onChange={this.callback} type="card">
          <TabPane tab="基础配置" key="1">
            <Form onSubmit={this.handleSubmit} hideRequiredMark className={styles.tabForm} style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="方案id" style={{ display: 'none' }}>
                {getFieldDecorator('id', {
                  rules: [{
                    required: false, message: '请输入方案id',
                  }],
                })(
                  <Input placeholder="请输入方案id" disabled />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="*方案名称" >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请输入方案名称',
                  }],
                })(
                  <Input placeholder="请输入方案名称" />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="*推荐话术" >
                {getFieldDecorator('desc', {
                  rules: [{
                    required: true, message: '请输入推荐话术',
                  }],
                })(
                  <Input placeholder="请输入推荐话术" />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="方案时间" >
                <Col span={11}>
                  <FormItem>
                    {getFieldDecorator('start_time', {
                      rules: [{
                        required: false, message: '请输入开始时间',
                      }],
                    })(
                      <DatePicker 
                        showTime= {{ format: 'HH:mm' }}
                        format= "YYYY-MM-DD HH:mm"
                        placeholder= '请输入开始时间' />
                    )}
                    
                  </FormItem>
                </Col>
                <Col span={2}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    -
                  </span>
                </Col>
                <Col span={11}>
                  <FormItem>
                    {getFieldDecorator('end_time', {
                      rules: [{
                        required: false, message: '请输入结束时间',
                      }],
                    })(
                      <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder='请结束开始时间' />
                      )}
                  </FormItem>
                </Col>
              </FormItem>
              <FormItem {...formItemLayout} label="选择门店" >
                {getFieldDecorator('keys', {
                  rules: [{
                    required: false, message: '请输入内容描述',
                  }],
                })(
                  <div>
                    <Select placeholder="请选择门店性质"
                      value={this.state.nature}
                      onChange={this.handleNatureChange}>
                      <Option value="0">所有</Option>
                      <Option value="直营店">直营店</Option>
                      <Option value="加盟店">加盟店</Option>
                    </Select>
                    <div style={{ borderRadius: '4px', border: '1px solid #d9d9d9' }}>
                      <Tree
                        defaultExpandedKeys={['6']}
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys ? (this.state.expandedKeys.length > 0 ? this.state.expandedKeys : ['6']) : ['6']}
                        autoExpandParent={this.state.autoExpandParent}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck}
                      // selectedKeys={this.state.selectedKeys}
                      >
                        {this.renderTreeNodes(shop)}
                      </Tree>
                    </div>
                  </div>
                  )}
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="商品配置" key="2">
            <Form onSubmit={this.handleSubmit} visible={this.state.psModalVisible} hideRequiredMark className={styles.tabForm}>
              <FormItem {...formItemLayout} label="商品编码" >
                {getFieldDecorator('code', {
                  rules: [{
                    required: this.state.checkCode,
                     message: '请填写商品编码',
                  }],
                })(
                  <Input placeholder="请填写商品编码" />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="商品级别" >
                {getFieldDecorator('class', {
                  rules: [{
                    required: this.state.checkClass,
                     message: '请选择商品级别',
                  }],
                })(
                  <Select placeholder="请选择商品级别"
                    value={this.state.waresClass}
                    onChange={this.handleClassChange}>
                    <Option value="1">一级</Option>
                    <Option value="2">二级</Option>
                    <Option value="3">三级</Option>
                    <Option value="4">四级</Option>
                    <Option value="5">五级</Option>
                    <Option value="6">六级</Option>
                    <Option value="7">七级</Option>
                    <Option value="8">八级</Option>
                    <Option value="9">九级</Option>
                    <Option value="10">十级</Option>
                  </Select>
                  )}
              </FormItem>
              <FormItem
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 12, offset: 5 },
                }}
              >
                <Button type="primary" onClick={this.handlePSOk} >添加促销商品</Button>
              </FormItem>
            </Form>
            <div style={{ borderTop: '1px solid #d9d9d9' }}>

            </div>
          </TabPane>
        </Tabs>
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
              新建推荐方案
            </Button>
            {submitForm()}
              <List
                size="large"
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                pagination={paginationProps}
                dataSource={promotionlist}
                renderItem={item => (
                  <List.Item key={item.id} style={{ border: 0}}>
                    <Card
                      hoverable
                      bodyStyle={{ padding: 20}}
                      actions={[
                        <Popconfirm title="是否要删除此活动？" onConfirm={() => this.remove(item.id)}>
                            <Tooltip title="删除">删除</Tooltip>
                        </Popconfirm>,
                        <Tooltip title="编辑" onClick={this.showModal.bind(this, item)}>编辑</Tooltip>
                        
                      ]}
                    >
                    
                      {(new Date(item.start_time)).getTime() > Date.now()? <div className={styles.corner} style={{ backgroundColor: '#44952a' }}>等待中</div> : null}
                      {(new Date(item.start_time)).getTime() < Date.now() && (new Date(item.end_time)).getTime() > Date.now() ? <div className={styles.corner} style={{ backgroundColor: '#3b90f7' }}>进行中</div> : null}
                      {(new Date(item.end_time)).getTime() < Date.now() ? <div className={styles.corner} style={{ backgroundColor: '#999' }}>已过期</div> : null}
                      {item.start_time && item.end_time ? null : <div className={styles.corner} style={{ backgroundColor: '#ee6f2d' }}>待配置</div>}

                      <Card.Meta style={{ paddingBottom: '5px'}}
                        title={item.name}
                      />
                      <div className={styles.cardItemContent}>
                        <CardInfo 
                          desc = {item.desc}
                        />
                        <p style={{ paddingTop: '10px' }}> 
                          开始：<span className={styles.blueColor} >{moment(item.start_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </p>
                        <p>
                          结束：<span className={styles.blueColor} >{moment(item.end_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </p>
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
