import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Checkbox, InputNumber, Form, List, Card, Row, Col, Input, Upload, Button, Icon, Table, Menu, Avatar, TreeSelect, Tree, Select, Layout } from 'antd';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './System.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;

@Form.create()
@connect(state => ({
    shop: state.skulist,
    skulist: state.skulist,
    skutype: state.skulist,
    sblist: state.sblist,
    rule: state.rule,
}))
export default class SystemTags extends PureComponent {
    state = {
        file: undefined,
        excel: [],
        modalVisible: false,
        modalVisibleRule: false,
        typeCode: undefined,
        expandedKeys: ['6'],
        autoExpandParent: true,
        checkedKeys: [],
        nature: '0',
        fixedvalue: true,
        
        previewVisible: false,
        previewImage: '',
        fileList: [
            // {
            //     uid: -1,
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],

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
        window.addEventListener('resize', this.fixedshow.bind(this))
        let ofWidth = document.getElementById("mynewtable").offsetWidth;
        let flag = false;
        if (ofWidth >= 1280) {
            flag = true;
        }
        this.setState({
            fixedvalue: flag,
        });
    }



    showSKUModal = () => {
        this.setState({
            modalVisibleRule: true
        });
    };

    remove = async (id) => {
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
                if (values.pic) {
                    values.pic = values.pic.file.response.url
                }
                // values.pic = values.pic.file.response.url;
                // values.pic = 'http://fujian.cn-bj.ufileos.com/OMO.jpg';
                await this.props.dispatch({
                    type: 'skulist/addSKU',
                    payload: values,
                });

                this.props.form.setFieldsValue({
                    name: undefined,
                    id: undefined,
                    code: undefined,
                    identity: undefined,
                    input_code: undefined,
                    SKU_type_code: undefined,
                    SKU_type_name: undefined,
                    SKU_brand_code: undefined,
                    SKU_brand_name: undefined,
                    price: undefined,
                    desc: undefined,
                });
                this.setState({
                    modalVisible: false,
                    typeCode: undefined,
                    file: undefined,
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
                modalVisibleRule: false,
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
                params: undefined
            });
            this.setState({
                nature: '0',
                checkedKeys: [],
                expandedKeys: ['6'],
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
            name: undefined,
            id: undefined,
            code: undefined,
            input_code: undefined,
            SKU_type_code: undefined,
            SKU_type_name: undefined,
            SKU_brand_code: undefined,
            SKU_brand_name: undefined,
            identity: undefined,
            price: undefined,
            desc: undefined,
        })
        this.setState({
            modalVisible: false,
            typeCode: undefined,
            file: undefined,
        })

    }

    handleCancelRule = () => {

        this.props.form.setFieldsValue({
            id: undefined,
            rule_id: undefined,
            sex: undefined,
            age_start: undefined,
            age_end: undefined,
            eyeglasses: undefined,
        })
        this.setState({
            modalVisibleRule: false,

        })

    }
    handleCancelShop = () => {

        this.props.form.setFieldsValue({
            params: undefined
        })

        this.setState({
            checkedKeys: [],
            expandedKeys: ['6'],
            nature: '0',
        })

    }

    handleChangeBrand = (values) => {
        this.props.form.setFieldsValue({
            SKU_brand_code: values.key,
            SKU_brand_name: values.label,
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
            file: file.length > 0 ? file : undefined
        });
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
            checkedKeys: checkedKeys,
            expandedKeys: keys,
        });

        this.props.form.setFieldsValue({
            params: keys
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

    save(sku) {
        // console.log('sku',sku)
        this.props.form.setFieldsValue({
            name: sku.name,
            id: sku.id,
            code: sku.code,
            input_code: sku.input_code,
            SKU_type_code: sku.SKU_type_code,
            SKU_type_name: sku.SKU_type_name,
            SKU_brand_code: { key: sku.SKU_brand_code, label: sku.SKU_brand_name },
            //  SKU_brand_code:sku.SKU_brand_code,
            SKU_brand_name: sku.SKU_brand_name,
            identity: sku.identity,
            price: sku.price,
            desc: sku.desc,
        })
        this.setState({
            modalVisible: true,
            typeCode: sku.SKU_type_code,
            //  brand:brand,
        })
    }

    rule(sku) {
        // console.log('sku',sku)
        if (sku.rule_id) {
            this.props.form.setFieldsValue({
                rule_id: sku.rule_id.id,
                sex: sku.rule_id.sex,
                age_start: sku.rule_id.age_start,
                age_end: sku.rule_id.age_end,
                eyeglasses: sku.rule_id.eyeglasses,
            })
        } else {
            this.props.form.setFieldsValue({
                id: sku.id,
                sex: '全部',
                eyeglasses: '否',
            })
        }
        this.setState({
            modalVisibleRule: true,
        })
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



    onChange = (typeCode, title) => {

        this.props.form.setFieldsValue({
            SKU_type_name: title[0].props.children,
        });
        this.setState({ typeCode: typeCode });
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

    fixedshow() {
        let ofWidth = document.getElementById("mynewtable") ? document.getElementById("mynewtable").offsetWidth : null;
        // console.log(ofWidth)
        let flag = false;
        if (ofWidth >= 1280) {
            flag = true;
        }
        this.setState({
            fixedvalue: flag,
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.fixedshow.bind(this))

    }
    onChange2(e) {
        console.log(`${e.target.checked}`);
    }

    handleCancel2 = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange3 = ({ fileList }) => this.setState({ fileList })


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const initProps = {
            name: 'file',
            // action: 'http://127.0.0.1:3000/api/sku/pic',
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
            onChange: (page) => {
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
            { title: '标签名', dataIndex: 'name', key: 'name', width: 120, className: 'column-operations', },
            { title: '人员数量', dataIndex: 'price', key: 'price', width: 60, className: 'column-operations', },
            { title: '备注', dataIndex: 'desc', key: 'desc', width: 180, className: 'column-operations', },
            {
                title: '计入统计', dataIndex: 'rule_id.id', key: 'rule_id.id', width: 40, className: 'column-operations',
                render: (text, record) => {
                    // console.log("record.rule_id",record.rule_id)
                    return (
                        
                            <div>
                                <Checkbox onChange={this.onChange2} defaultChecked = {record.rule_id}></Checkbox>
                                {/* {record.rule_id.sex === '全部' ? '男/女' : record.rule_id.sex}{record.rule_id.sex ? <br /> : null}
                                {record.rule_id.age_start} {record.rule_id.age_start ? '-' : null} {record.rule_id.age_end} {record.rule_id.age_end ? '岁' : null}{record.rule_id.age_end ? <br /> : null}
                                {record.rule_id.eyeglasses === '否' ? '' : '戴眼镜'} */}
                            </div>
                            
                    );
                },
            },

            {
                title: '操作', key: 'x', width: 160, className: 'column-operations', 
                render: (text, record) => {
                    return (
                        <div className="editable-row-operations">
                            {
                                <span>
                                    <Icon type="cloud-upload" style={{ fontSize: 22, color: '#08c'}}/>
                                    <a onClick={() => this.save(record)}>上传</a>
                                    <Icon type="form" style={{ fontSize: 18, color: '#08c'}}/>
                                    <a onClick={() => this.rule(record)}>编辑</a>
                                    <Icon type="delete" style={{ fontSize: 18, color: '#08c'}}/>
                                    {
                                        <Popconfirm title="Sure to delete?" onConfirm={() => this.remove(record.id)}>
                                            <a>删除</a>
                                        </Popconfirm>
                                    }
                                    <Icon type="right-circle"style={{ fontSize: 18, color: '#d9d9d9'}} />
                                    <a onClick={() => this.shop(record)}>详情</a>
                                </span>
                            }
                        </div>
                    );
                },
            },
        ];

        const MoreBtn = ({ data: id }) => (
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
        const formItemLayout2 = {
            labelCol: {
                 span: 2,
                // sm: { span: 5 },
            },
            wrapperCol: {
                 span: 22,
                // sm: { span: 12 },
                // md: { span: 14 },
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
            return <TreeNode key={item.id} title={title} value={item.code} />;
        });
        const loop2 = data => data.map((item) => {
            // console.log('item',item)

            return <Option key={item.id} value={item.code}>{item.name}</Option>;
        });

        const submitForm = () => (
            <Modal width={'700px'} title="上传" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}
                confirmLoading={skuSubmitting}>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} >
                    <FormItem {...formItemLayout2} label="姓名" >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入姓名',
                            }],
                        })(
                            <Input placeholder="请输入姓名" />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout2} label="商品id" style={{ display: 'none' }}>
                        {getFieldDecorator('id', {
                            rules: [{
                                required: false, message: '请输入商品id',
                            }],
                        })(
                            <Input placeholder="请输入商品id" disabled />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout2} label="身份证" >
                        {getFieldDecorator('identity', {
                            rules: [{
                                required: false, message: '请填写正确的身份证号码',
                            }],
                        })(
                            <Input placeholder="请填写正确的身份证号码" />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout2} label="备注" >
                        {getFieldDecorator('desc', {
                            rules: [{
                                required: false, message: '请填写备注信息',
                            }],
                        })(
                            <TextArea style={{ minHeight: 32 }} placeholder="请填写备注信息" rows={3} />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout2}>
                        {getFieldDecorator('pic', {
                            rules: [{
                                required: false, message: '请上传人脸图片',
                            }],
                        })( 

                            <div className="clearfix">
                                
                                <span>上传人脸图片<br/>
                                    <front style={{color:'red'}}>
                                        同一个人最多可上传5张人脸图片，请上传单人的清晰的正脸图片
                                    </front>
                                </span>
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange3}
                                    >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel2}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>

                            // <Upload {...initProps} fileList={this.state.file}>
                            //     <Button disabled={this.state.file}>
                            //         <Icon type="upload" /> 上传商品图片
                            //     </Button>
                            //     <Input type="hidden" />
                            // </Upload>

                            )}
                    </FormItem>
                </Form>
            </Modal>
        );
        const submitRuleForm = () => (
            <Modal title="编辑标签" visible={this.state.modalVisibleRule} onOk={this.handleOkRule} onCancel={this.handleCancelRule}
                confirmLoading={ruleSubmitting}>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} >

                    <FormItem {...formItemLayout} label="商品id" style={{ display: 'none' }}>
                        {getFieldDecorator('id', {
                            rules: [{
                                required: false, message: '请输入商品id',
                            }],
                        })(
                            <Input placeholder="请输入商品id" disabled />
                            )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="标签名" >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入标签名',
                            }],
                        })(
                            <Input placeholder="请输入标签名" />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注" >
                        {getFieldDecorator('desc', {
                            rules: [{
                                required: false, message: '请填写备注信息',
                            }],
                        })(
                            <TextArea style={{ minHeight: 32 }} placeholder="请填写备注信息" rows={3} />
                            )}
                    </FormItem>
                </Form>
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
                        title="会员列表"
                        extra={
                            <div>
                            <Row>
                            <Col span={3}>
                            <Button type="primary" style={{ width: '140px' }} icon="plus" onClick={this.showSKUModal}>
                                添加人员标签
                            </Button>
                            </Col>
                            <Col span={20}>
                            <Search
                            placeholder="请输入标签关键词"
                            style={{ width: 240 }}
                            onSearch={value => console.log(value)}
                          />
                          </Col></Row>
                          </div>
                          }
              
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}>
                        
                        {submitForm()}
                        {submitRuleForm()}
                        <div id="mynewtable">
                            <Table style={{ padding: '8px 0px 0px' }}
                                // style={{border: '1px solid #d9d9d9'}}
                                // onRowClick={this.onRowClick}
                                loading={loading}
                                // size="middle"
                                bordered
                                rowKey={record => record.id}
                                // showHeader={false}
                                pagination={paginationProps}
                                // scroll={{ x: 1300, }}
                                columns={columns} dataSource={skulist} />
                        </div>
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}
