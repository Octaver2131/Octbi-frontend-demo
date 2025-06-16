import React, { useEffect, useState } from 'react';
import { listMyChartByPageUsingPOST } from '@/services/yubi/chartController';
import { message } from 'antd';


/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {

  const initSearchParams = {
    pageSize: 12,
  }

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});
  const [chartList, setChartList] = useState<API.Chart>();
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
      数据列表
      { JSON.stringify(chartList) }
      <br/>
      总数
      { total }
    </div>
  );
};
export default MyChartPage;
