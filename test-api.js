#!/usr/bin/env node

// 测试 WebSSH API 连接
const BASE_URL = 'http://192.168.100.20:3000';

async function testAPI() {
  console.log('🔍 测试 WebSSH API 连接...');
  
  try {
    // 测试服务器状态
    console.log('\n1. 测试服务器状态:');
    const statusResponse = await fetch(`${BASE_URL}`);
    console.log(`   状态: ${statusResponse.status} ${statusResponse.statusText}`);
    
    // 测试登录
    console.log('\n2. 测试登录接口:');
    const loginResponse = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    
    const loginData = await loginResponse.json();
    console.log(`   响应: ${JSON.stringify(loginData)}`);
    
    if (loginData.success) {
      const token = loginData.token;
      console.log(`   Token: ${token}`);
      
      // 测试获取服务器列表
      console.log('\n3. 测试获取服务器列表:');
      const serversResponse = await fetch(`${BASE_URL}/api/servers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const serversData = await serversResponse.json();
      console.log(`   响应: ${JSON.stringify(serversData)}`);
      
    } else {
      console.log('   ❌ 登录失败，请检查用户名密码');
    }
    
  } catch (error) {
    console.error('   ❌ API测试失败:', error.message);
  }
}

testAPI();