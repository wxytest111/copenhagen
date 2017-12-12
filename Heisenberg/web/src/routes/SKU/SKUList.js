import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Table, Menu, Avatar, TreeSelect, Tree, Select, Layout } from 'antd';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SKUList.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;

@Form.create()
@connect(state => ({
  shop: state.skulist,
  skulist: state.skulist,
  skutype: state.skulist,
  sblist: state.sblist,
  rule:state.rule,
}))
export default class SKUList extends PureComponent {
  state = {
        fileList: [],
        excel: [],
        modalVisible: false,
        modalVisibleRule: false,
        modalVisibleShop: false,
        typeCode: undefined,
        expandedKeys: ['6'],
        autoExpandParent: true,
        checkedKeys: [],
        nature:'0',
      };
  
  componentDidMount() {
    this.props.skulist.skulist = [];
    this.props.skulist.shop = [];
    this.props.skulist.skutype = [];
    this.props.sblist.sblist = [];
    this.props.dispatch({
      type: 'skulist/fetch',
      payload: {
        count: 5,
      },
    });
    this.props.dispatch({
      type: 'skulist/querySTList',
      payload: {
        ancestor_key: 0,
      },
    });
    this.props.dispatch({
      type: 'sblist/fetch',
      payload: {
        
      },
    });
    this.props.dispatch({
      type: 'skulist/queryRSList',
      payload: {
        ancestor_key: 0,
      },
    });
  }



  showSKUModal = () => {
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
        // console.log('values',values)
        if (!err) {
          values.pic = values.pic.file.response.url;
          // values.pic = 'http://fujian.cn-bj.ufileos.com/OMO.jpg';
          await this.props.dispatch({
              type: 'skulist/addSKU',
              payload: values,
          });

          this.props.form.setFieldsValue({
            name:undefined,
            id:undefined,
            code:undefined,
            identity:undefined,
            input_code:undefined,
            SKU_type_code:undefined,
            SKU_type_name:undefined,
            SKU_brand_code:undefined,
            SKU_brand_name:undefined,
            price:undefined,
            desc:undefined,
          });
          this.setState({
            modalVisible:false,
            typeCode:undefined,
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

 handleOkRule = (e) => {
  // e.preventDefault();
  this.props.form.validateFieldsAndScroll(async (err, values) => {
      // console.log('values',values)
      // if (!err) {
        await this.props.dispatch({
            type: 'rule/editRule',
            payload: values,
        });

        this.props.form.setFieldsValue({
          id: undefined,
          rule_id: undefined,
          sex: undefined,
          age_start: undefined,
          age_end: undefined,
          eyeglasses: undefined,
        });
        this.setState({
          modalVisibleRule:false,
        });
        this.props.skulist.skulist = [];
        this.props.dispatch({
          type: 'skulist/fetch',
          payload: {
            count: 5,
          },
        });
      // }
  });
}

handleOkShop = (e) => {
  // e.preventDefault();
  this.props.form.validateFieldsAndScroll(async (err, values) => {
      // console.log('values',values)
      // if (!err) {
        await this.props.dispatch({
            type: 'skulist/editShop',
            payload: values,
        });

        this.props.form.setFieldsValue({
          params:undefined
        });
        this.setState({
          nature:'0',
          modalVisibleShop:false,
          checkedKeys:[],
          expandedKeys:['6'],
        });
        this.props.skulist.skulist = [];
        this.props.dispatch({
          type: 'skulist/fetch',
          payload: {
            count: 5,
          },
        });
      // }
  });
}

  handleCancel = () => {

    this.props.form.setFieldsValue({
      name:undefined,
      id:undefined,
      code:undefined,
      input_code:undefined,
      SKU_type_code:undefined,
      SKU_type_name:undefined,
      SKU_brand_code:undefined,
      SKU_brand_name:undefined,
      identity:undefined,
      price:undefined,
      desc:undefined,
    })
    this.setState({
      modalVisible:false,
      typeCode:undefined,
    })
    
  }

  handleCancelRule = () => {

    this.props.form.setFieldsValue({
      id:undefined,
      rule_id:undefined,
      sex: undefined,
      age_start: undefined,
      age_end: undefined,
      eyeglasses: undefined,
    })
    this.setState({
      modalVisibleRule:false,
      
    })
    
  }
  handleCancelShop = () => {

    this.props.form.setFieldsValue({
      params:undefined
    })

    this.setState({
      modalVisibleShop:false,
      checkedKeys:[],
      expandedKeys:['6'],
      nature:'0',
    })
    
  }
  
  handleChangeBrand = (values) => {
    this.props.form.setFieldsValue({
      SKU_brand_code:values.key,
      SKU_brand_name:values.label,
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

  handleChange2 = (info) => {
    let excel = info.excel;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    excel = excel.slice(-2);

    // 2. read from response and show file link
    excel = excel.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    excel = excel.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });
    this.setState({ excel });
  }

  onCheck = (checkedKeys, info) => {
    
        // console.log('halfCheckedKeys',info.halfCheckedKeys)
        // console.log('checkedKeys',checkedKeys)
        // console.log('info',info)
        var keys = checkedKeys.concat(info.halfCheckedKeys);
        this.setState({ 
          checkedKeys:checkedKeys,
          expandedKeys:keys,
        });
        
        this.props.form.setFieldsValue({
          params:keys
        })
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

  save(sku) {
    // console.log('sku',sku)
     this.props.form.setFieldsValue({
       name:sku.name,
       id:sku.id,
       code:sku.code,
       input_code:sku.input_code,
       SKU_type_code:sku.SKU_type_code,
       SKU_type_name:sku.SKU_type_name,
       SKU_brand_code:{ key: sku.SKU_brand_code, label: sku.SKU_brand_name },
      //  SKU_brand_code:sku.SKU_brand_code,
       SKU_brand_name:sku.SKU_brand_name,
       identity:sku.identity,
       price:sku.price,
       desc:sku.desc,
     })
     this.setState({
       modalVisible:true,
       typeCode:sku.SKU_type_code,
      //  brand:brand,
     })
   }

  rule(sku) {
    // console.log('sku',sku)
    if(sku.rule_id){
      this.props.form.setFieldsValue({
      rule_id:sku.rule_id.id,
      sex: sku.rule_id.sex,
      age_start:sku.rule_id.age_start,
      age_end:sku.rule_id.age_end,
      eyeglasses:sku.rule_id.eyeglasses,
      })
    } else {
      this.props.form.setFieldsValue({
        id:sku.id,
        sex: '全部',
        eyeglasses: '否',
      })
    }
     this.setState({
      modalVisibleRule:true,
     })
   }

  shop(sku) {
    // console.log('sku',sku)
    if(sku.shop){
      var keys = [];
      for(var i=0; i<sku.shop.length; i++){
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
        checkedKeys:keys,
        expandedKeys:keys,
      })
      this.props.form.setFieldsValue({
        id:sku.id,
      })
    } else {
          this.props.form.setFieldsValue({
            id:sku.id,
          })
    }
     this.setState({
      modalVisibleShop:true,
     })
   }
   
  

   onChange = (typeCode, title) => {
     
    this.props.form.setFieldsValue({
      SKU_type_name:title[0].props.children,
    });
    this.setState({ typeCode: typeCode});
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

  render() {
    const initProps = {
      name: 'file',
      action: 'http://console.tman.ai/api/sku/pic',
      onChange: this.handleChange,
      multiple: false,
    };

    const importExcel = {
      name: 'file',
      action: 'http://console.tman.ai/api/sku/import',
      onChange: this.handleChange2,
      multiple: false,
    };
    
    const { skulist: { skulist, loading, skuSubmitting } } = this.props;
    const { skutype: { skutype } } = this.props;
    const { sblist: { sblist } } = this.props;
    const { rule: { ruleSubmitting } } = this.props;
    const { shop: { shop, shopSubmitting } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    


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
      { title: '缩略图', dataIndex: 'pic', key: 'pic',width:20, className:'column-operations',fixed: 'left',
        render: (text, record) => {
          return (
            
            <Avatar style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} src={record.pic} shape="square" size="large" />
          );
        },
      },

      { title: '店铺', dataIndex: 'shop', key: 'shop',width:100, className:'column-operations',
      render: (text, record) => {
        // console.log("record.rule_id",record.rule_id)
        // console.log('shop',record)
        return record.shop?(record.shop.map((item) => {
            //  console.log("item",item)
            return ( 
              <span key={item.id}>
                {item.name}<br/>
              </span>
            )
           })):null
      },
      },
      { title: '商品编码', dataIndex: 'identity', key: 'identity',width:100, className:'column-operations',},
      { title: '商品代码', dataIndex: 'code', key: 'code',width:100, className:'column-operations',},
      { title: '输入码', dataIndex: 'input_code', key: 'input_code',width:100, className:'column-operations',},
      { title: '商品名称', dataIndex: 'name', key: 'name',width:100, className:'column-operations',},
      { title: '类别代码', dataIndex: 'SKU_type_code', key: 'SKU_type_code',width:100, className:'column-operations',},
      { title: '类别名称', dataIndex: 'SKU_type_name', key: 'SKU_type_name',width:100, className:'column-operations',},
      { title: '品牌', dataIndex: 'SKU_brand_name', key: 'SKU_brand_name',width:100, className:'column-operations',},
      { title: '价格', dataIndex: 'price', key: 'price',width:100, className:'column-operations',},
      { title: '备注', dataIndex: 'desc', key: 'desc',width:100, className:'column-operations',},
      { title: '规则', dataIndex: 'rule_id.id', key: 'rule_id.id',width:100, className:'column-operations',
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

      { title: '操作',  key: 'x', width:120, className:'column-operations', fixed: 'right',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            {
              <span>
                <a onClick={() => this.shop(record)}>门店</a>
                <a onClick={() => this.rule(record)}>规则</a>
                <div style={{ height: 8}}/>
                <a onClick={() => this.save(record)}>编辑</a>
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

    const loop = data => data.map((item) => {
      // console.log('item',item)
      const title = <span>{item.name}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.id} title={title} value={item.code} disabled>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={title} value={item.code}/>;
    });
    const loop2 = data => data.map((item) => {
      // console.log('item',item)
      
      return <Option key={item.id} value={item.code}>{item.name}</Option>;
    });
  
    const submitForm = () => (
      <Modal title="添加/编辑商品" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} 
      confirmLoading={skuSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} >
          <FormItem {...formItemLayout} label="商品名称" >
            { getFieldDecorator('name', {
                rules: [{
                    required: true, message: '请输入商品名称',
                }],
                })(
                <Input placeholder="请输入商品名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="商品id" style={{display:'none'}}>
              { getFieldDecorator('id', {
              rules: [{
                  required: false, message: '请输入商品id',
              }],
              })(
              <Input placeholder="请输入商品id" disabled />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="商品编码" >
              { getFieldDecorator('identity', {
              rules: [{
                  required: true, message: '请输入商品编码',
              }],
              })(
              <Input placeholder="请输入商品编码" />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="商品代码" >
              { getFieldDecorator('code', {
              rules: [{
                  required: true, message: '请输入商品代码',
              }],
              })(
              <Input placeholder="请输入商品代码" />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="输入码" >
              { getFieldDecorator('input_code', {
              rules: [{
                  required: true, message: '请输入商品输入代码',
              }],
              })(
              <Input placeholder="请输入商品输入代码" />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="类别" >
              { getFieldDecorator('SKU_type_code', {
              rules: [{
                  required: true, message: '请选择商品类别',
              }],
              })(
                <TreeSelect
                // style={{ width: 300 }}
                // value={this.state.typeValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
               
                // treeData={skutype}
                placeholder="请选择商品类别"
                treeDefaultExpandAll
                onChange={this.onChange}
              >
                {loop(skutype)}
              </TreeSelect>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="类别代码" >
            <Input placeholder="请选择商品类别" disabled value={this.state.typeCode}/>
              { getFieldDecorator('SKU_type_name', {
              rules: [{
                  required: true, message: '请选择商品类别',
              }],
              })(
              <Input placeholder="请选择商品类别" disabled style={{display:'none'}}/>
              // <Input placeholder="请选择商品类别" disabled style={{display:'none'}}/>
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
          <FormItem {...formItemLayout} label="品牌" >
              { getFieldDecorator('SKU_brand_code', {
              rules: [{
                  required: true, message: '请选择品牌',
              }],
              })(
                <Select
                  labelInValue 
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="请选择品牌"
                  optionFilterProp="children"
                  onChange={this.handleChangeBrand}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {loop2(sblist)}
                </Select>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="品牌名称" style={{display:'none'}}>
              { getFieldDecorator('SKU_brand_name', {
              rules: [{
                  required: true, message: '请选择品牌',
              }],
              })(
              <Input placeholder="请选择品牌" disabled/>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="内容描述" >
              { getFieldDecorator('desc', {
              rules: [{
                  required: true, message: '请输入内容描述',
              }],
              })(
              <TextArea style={{ minHeight: 32 }} placeholder="请输入内容描述" rows={3} />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="上传图片">
          { getFieldDecorator('pic', {
              rules: [{
                  required: false, message: '请上传商品图片',
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
    const submitRuleForm = () => (
      <Modal title="添加商品规则属性" visible={this.state.modalVisibleRule} onOk={this.handleOkRule} onCancel={this.handleCancelRule} 
      confirmLoading={ruleSubmitting}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} >

          <FormItem {...formItemLayout} label="商品id" style={{display:'none'}}>
              { getFieldDecorator('id', {
              rules: [{
                  required: false, message: '请输入商品id',
              }],
              })(
              <Input placeholder="请输入商品id" disabled />
              )}
          </FormItem>          
          
          <FormItem {...formItemLayout} label="规则id" style={{display:'none'}}>
              { getFieldDecorator('rule_id', {
              rules: [{
                  required: false, message: '请输入规则id',
              }],
              })(
              <Input placeholder="请输入规则id" disabled />
              )}
          </FormItem>          
          <FormItem {...formItemLayout} label="性别" >
              { getFieldDecorator('sex', {
              rules: [{
                  required: false, message: '请选择性别',
              }],
              })(
                <Select
                  // labelInValue 
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.handleChangeBrand}
                  // defaultValue={'全部'}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value='全部'>全部</Option>
                  <Option value='男'>男</Option>
                  <Option value='女'>女</Option>
                </Select>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="年龄" >
            { getFieldDecorator('age_start', {
            rules: [{
                required: false, message: '请输入年龄起始值',
            }],
            })(
              <InputNumber min={0} step={1} placeholder="起始值" />
            )}
            &nbsp;—&nbsp;&nbsp;
            { getFieldDecorator('age_end', {
            rules: [{
                required: false, message: '请输入年龄结束值',
            }],
            })(
              <InputNumber min={0} step={1} placeholder="结束值" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="戴眼镜" >
              { getFieldDecorator('eyeglasses', {
              rules: [{
                  required: false, message: '请选择是否戴眼镜',
              }],
              })(
                <Select
                  // labelInValue 
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.handleChangeBrand}
                  // defaultValue={'否'}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value='是'>是</Option>
                  <Option value='否'>否</Option>
                </Select>
              )}
          </FormItem>
        </Form>
        </Modal>
    );
    const submitShopForm = () => (
      <Modal title="添加商品规则属性" visible={this.state.modalVisibleShop} onOk={this.handleOkShop} onCancel={this.handleCancelShop} 
      confirmLoading={shopSubmitting}>
      <Row style={{padding: '10px 0px 0px' }}>
        <Col>
          门店类型：
          <Select placeholder="请选择门店性质"
            style={{width:'40%'}}
            value={this.state.nature}
            onChange={this.handleNatureChange}
            >
            <Option value="0">所有</Option>
            <Option value="直营店">直营店</Option>
            <Option value="加盟店">加盟店</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{padding: '20px 0px 0px' }}>
        <Col>
          请选择门店：
          <Content style={{ overflow:'auto', border:'1px solid #d9d9d9',width: '95%', height:300, maxHeight:300}}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} >
              <FormItem {...formItemLayout} label="商品id" style={{display:'none'}}>
                { getFieldDecorator('id', {
                rules: [{
                    required: false, message: '请输入商品id',
                }],
                })(
                <Input placeholder="请输入商品id" disabled />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="">
                { getFieldDecorator('params', {
                rules: [{
                    required: false, message: '请选择是否戴眼镜',
                }],
                })(
                  <Tree
                      defaultExpandedKeys={['6']}
                      checkable
                      onExpand={this.onExpand}
                      expandedKeys={this.state.expandedKeys?(this.state.expandedKeys.length>0?this.state.expandedKeys:['6']):['6']}
                      autoExpandParent={this.state.autoExpandParent}
                      checkedKeys={this.state.checkedKeys}
                      onCheck={this.onCheck}
                      // selectedKeys={this.state.selectedKeys}
                    >
                      {this.renderTreeNodes(shop)}
                  </Tree>
                )}
              </FormItem>
            </Form>
          </Content>
        </Col>
      </Row>
        
    </Modal>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          {/* <Card>
            <h1>123</h1>
          </Card> */}
          <Card
            className={styles.listCard}
            bordered={false}
            title="商品列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}>
            <div style={{display:'flex'}}>
              <Upload {...importExcel} style={{ width: '12%', marginBottom: 4 }}>
              {/* <Upload {...importExcel} fileList={this.state.excel} style={{ width: '12%', marginBottom: 4 }}> */}
                <Button type="dashed" icon="upload" style={{flex:1}}>
                    导入SKU
                </Button>
              </Upload>
              &nbsp;&nbsp;
              <Button type="dashed" style={{ width: '12%', marginBottom: 4 }} icon="plus" onClick={this.showSKUModal}>
                添加SKU
              </Button>
            </div>
            {submitForm()}
            {submitRuleForm()}
            {submitShopForm()}
            
              <Table style={{padding: '8px 0px 0px' }}
              // style={{border: '1px solid #d9d9d9'}}
                // onRowClick={this.onRowClick}
                loading={loading}
                // size="middle"
                bordered
                rowKey={record => record.id}
                // showHeader={false}
                pagination={paginationProps}
                scroll={{ x: 1300,}}
                columns={columns} dataSource={skulist} />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
