import { List, Typography } from 'antd';

export default ({ subs }) => (

  <List
    size="small"
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    bordered
    dataSource={subs}
    renderItem={item => (<List.Item>{item.filename} - {item.lang}</List.Item>)}
  />
)
