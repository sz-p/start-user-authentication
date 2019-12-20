import React, { useState } from 'react';
import styles from "./index.scss";
import { withRouter } from 'react-router';
import { login_api } from '../../api/api';

function IndexPage(props) {

  const [user, changeUser] = useState('user');
  const [password, changePassword] = useState('password');

  const login = function () {
    login_api({ user, password }).then((data) => {
      if (data.success) {
        alert('登录成功');
        localStorage.setItem('token', data.data.token);
        props.history.push('/showlog');
      } else {
        alert('账号密码错误');
      }
    })
  }

  return (
    <div className={styles.page}>
      <input type="text" value={user} onChange={changeUser} />
      <br></br>
      <input type="password" value={password} onChange={changePassword} />
      <br></br>
      <button onClick={login}> 登录</button >
    </div >
  );
}
export default withRouter(IndexPage);
