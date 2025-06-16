import React, { useEffect, useState } from 'react';
import { listMyChartByPageUsingPOST } from '@/services/yubi/chartController';
import { Avatar, List, message } from 'antd';


/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {

  const initSearchParams = {
    pageSize: 12,
  }

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);

  const logData = async() => {
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total?? 0);
      } else {
        message.error(' 获取我的数据失败.');
      }
    } catch (e: any) {
      message.error(' 获取我的数据失败.' + e.message);
    }
  }

  useEffect(() => {
    logData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={chartList}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}

            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed=1'} />}
              title={item.name}
              description={item.chartType ? ('图表类型：' + item.chartType) : undefined }
            />
            {'分析目标：' + item.goal}
          </List.Item>
        )}
      />
      总数
      { total }
    </div>
  );
};
export default MyChartPage;
