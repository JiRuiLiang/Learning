<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <ul v-if="files.length">
      <li v-for="file in files" :key="file.id" @click="openFile(file.path)">
        <span>{{ file.filename }}</span>
        <button @click.stop="removeFile(file.id)">删除</button>
      </li>
    </ul>
    <p v-else>暂无文件</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const files = ref([]);

// 文件选择事件
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const result = await response.json();
    if (result.code === 200) {
      await fetchFileList();
      e.target.value = null; // 清空文件选择
    }
  } catch (error) {
    console.error('上传失败:', error);
  }
};

// 获取文件列表
const fetchFileList = async () => {
  try {
    const response = await fetch('/api/files', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const result = await response.json();
    files.value = result.data;
  } catch (error) {
    console.error('获取列表失败:', error);
  }
};

// 初始化加载列表
fetchFileList();

const removeFile = async (id) => {
  if(confirm('确认删除？')){
    const response = await fetch(`/api/files/${id}`, {
      method: 'DELETE' ,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }) 
    const result = await response.json()
    if(result.code === 200){
      fetchFileList() 
    }
  } 
}

function openFile (path) {
  window.open(`http://localhost:3000/${path}`, '_blank');
}
</script>