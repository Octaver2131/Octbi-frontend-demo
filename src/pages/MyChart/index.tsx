import React, { useEffect, useState } from 'react';
import { listMyChartByPageUsingPOST } from '@/services/yubi/chartController';
import { Avatar, Card, List, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useModel } from '@@/exports';


/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {

  const initSearchParams = {
    pageSize: 12,
  }

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const logData = async() => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total?? 0);
        // 隐藏图标的 title
        if (res.data.records) {
          res.data.records?.forEach(data => {
            const chartOption = JSON.parse(data.genChart?? '{}');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);
          })
        }
      } else {
        message.error(' 获取我的数据失败.');
      }
    } catch (e: any) {
      message.error(' 获取我的数据失败.' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    logData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <List
        grid = {{ gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: searchParams.pageSize,
        }}
        loading={loading}
        dataSource={chartList}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={item.chartType ? ('图表类型：' + item.chartType) : undefined }
              />
              <div style={{ marginBottom: 16 }}/>
              <p>{'分析目标：' + item.goal}</p>
              <div style={{ marginBottom: 16 }}/>
              <ReactECharts option={item.genChart && JSON.parse(item.genChart ?? '{}')} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;
