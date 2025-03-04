#!/bin/bash
Env=$1
[ -z $Env ] && echo 'Please input environment argument' && exit 1
# 启动服务
# 以对应用启动时，1）部分文件没有权限；2）/data/logs 挂载到容器后普通用户无写权限
sudo chown -R ${AppUser}:${AppGroup} /data

# 端口号 5000，启动服务
PORT=5000 node .output/server/index.mjs