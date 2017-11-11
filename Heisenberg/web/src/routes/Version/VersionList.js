import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Row, Col, Input, Card, Button, Icon, List, Modal, Upload } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './VersionList.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(state => ({
  vlist: state.vlist,
}))

@Form.create()

export default class VersionList extends PureComponent {
  state = {
      visible:false,
      fileList: [],
    };
  componentDidMount() {
    this.props.dispatch({
      type: 'vlist/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleChange = (info) => {
    console.log(info)
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
  
  // downloadApp = (url) => {
  //   const elem = document.createElement('iframe');
  //   elem.src = url;
  //   elem.style.display = 'none';
  //   document.body.appendChild(elem);
  // };

  showModal = () => {
    this.setState({
      visible:true
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const initProps = {
      name: 'file',
      action: 'http://localhost:3000/api/version/add',
      onChange: this.handleChange,
      multiple: false,
    };
    const { vlist: { vlist, loading } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          应用更新列表，此页面用来展示历史上传应用版本，可以下载，更新，上传应用
        </p>
        
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
          </a>
        </div>
      </div>
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="应用列表"
        content={content}
        extraContent={extraContent} >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...vlist]}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a>详细</a>, <a href={item.url}>下载</a>]}>
                  <Card.Meta
                    avatar={<img alt={item.message} className={styles.cardAvatar} src={item.icon} />}
                    title={item.message}
                    description={(
                      <p className={styles.cardDescription}>
                        <span>{item.content}</span>
                      </p>
                    )}
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={this.showModal}>
                    <Icon type="plus" /> 上传应用
                  </Button>
                  <Modal title="上传应用" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                      <FormItem {...formItemLayout} label="版本号" >
                        { getFieldDecorator('version', {
                          rules: [{
                            required: true, message: '请输入版本号',
                          }],
                        })(
                          <Input placeholder="请输入版本号" />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="标题" >
                        { getFieldDecorator('message', {
                          rules: [{
                            required: true, message: '请输入标题',
                          }],
                        })(
                          <Input placeholder="请输入标题" />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="内容描述" >
                        { getFieldDecorator('content', {
                          rules: [{
                            required: true, message: '请输入内容描述',
                          }],
                        })(
                          <TextArea style={{ minHeight: 32 }} placeholder="请输入内容描述" rows={4} />
                        )}
                      </FormItem>
                      <Row >
                        <Col span={12} offset={5}>
                          <Upload {...initProps} fileList={this.state.fileList}>
                            <Button>
                              <Icon type="upload" /> 上传应用
                            </Button>
                          </Upload>
                        </Col>
                      </Row>
                    </Form>
                  </Modal>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
