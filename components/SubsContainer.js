import React, { useState, useEffect } from "react";
import { List, Typography, Spin, Icon } from 'antd';

import fetch from 'isomorphic-unfetch';

import { getCodeFromName } from '../utils/CountryUtils'

export default ({ service, imdb }) => {
  const [subs, setSubs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchSubs = async () => {
      setIsFetching(true);

      const res = await fetch(`/subtitles/${service}/${imdb}`);
      const json = await res.json();

      setSubs(json);
      setIsFetching(false);
    }

    fetchSubs();
  }, [service])

  return isFetching ? (
    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
  ) : (
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={subs}
      renderItem={item => (
        <List.Item>{item.filename} - {item.lang}</List.Item>
      )}
    />
  )
}
