<template>
  <div>
    <h1>登录</h1>
    <input type="text" v-model.trim="username" placeholder="请输入用户名" />
    <br />
    <input type="password" v-model.trim="password" placeholder="请输入密码" />
    <br />
    <button @click.stop="register">注册</button>
    <button @click.stop="login">登录</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 添加路由实例

const router = useRouter();
let username = ref('');
let password = ref('');
const login = async () => {
  if (!username.value || !password.value) {
    alert('请输入用户名和密码');
    return;
  }
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // 添加请求头
    body: JSON.stringify({ // 使用JSON格式化
      username: username.value,
      password: password.value
    })
  });
  const result = await response.json();
  if (result.code === 200) {
    alert('登录成功');
    localStorage.setItem('token', result.token)
    router.push('/file');
  } else {
    alert(result.msg);
  }
}
const register = async () => {
  if (!username.value || !password.value) {
    alert('请输入用户名和密码');
    return;
  }
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // 添加请求头
    body: JSON.stringify({ // 使用JSON格式化
      username: username.value,
      password: password.value
    })
  });
  const result = await response.json();
  if (result.code === 200) {
    alert('注册成功');
  } else {
    alert(result.msg);
  }
}

</script>