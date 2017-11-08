import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './VersionList.less';


const downloadApp = (url) => {
  const elem = document.createElement('iframe');
  elem.src = url;
  elem.style.display = 'none';
  document.body.appendChild(elem);
};

@connect(state => ({
  vlist: state.vlist,
  visible: false,
}))
export default class VersionList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'vlist/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const { vlist: { vlist, loading } } = this.props;

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

    const showDialog = () => {
      this.setState({
        visible: true,
      });
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
                <Card hoverable className={styles.card} actions={[<a>详细</a>, <a onClick={downloadApp.bind(this, item.url)}>下载</a>]}>
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
                  <Button type="dashed" className={styles.newButton} onClick={showDialog}>
                    <Icon type="plus" /> 上传应用
                  </Button>
                  <Modal title="Basic Modal" visible={this.visible}>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
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
