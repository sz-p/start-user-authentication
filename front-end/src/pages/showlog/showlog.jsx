import React, { useState, useEffect } from 'react';
import styles from "./showlog.scss";
import { withRouter } from 'react-router';
import { getLog_api } from '../../api/api';

function ShowLog(props) {

  const [logs, getLog] = useState([]);


  const createRow = function (data) {
    const row = [];
    for (let i = 0; i < data.length; i++) {
      row.push(<td key={`td_${i}`}>{data[i]}</td>)
    }
    return row;
  }
  const createRows = function (data) {
    const len = data.length;
    let doms = [];
    for (let i = 0; i < len; i++) {
      doms.push((<tr key={`tr_${i}`}>{createRow(data[i])}</ tr>))
    }
    return doms;
  }
  const showLog = function () {
    const table = (<table><tbody>{createRows(logs)}</tbody></table>);
    return table;
  }
  useEffect(() => {
    getLog_api({ token: localStorage.getItem('token') }).then((d) => {
      if (d.success) {
        getLog(d.data.log);
      } else {
        alert('登录认证失败');
        props.history.push('/');
      }
    })
  }, [])
  return (
    <div className={styles.page} style={props.style}>
      {showLog()}
    </div>
  );
}
export default ShowLog;
