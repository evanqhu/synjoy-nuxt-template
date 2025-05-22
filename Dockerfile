FROM tencnet-ptc.tencentcloudcr.com/tencent-ptc/nodejs-builder:v20.17.0
# 设置工程目录名称

WORKDIR /data/code

COPY . /data/code/

RUN sudo chown -R ${AppUser}:${AppGroup} /data && \
    npm install                            


CMD ["/bin/bash","-c","bash /data/code/run.sh $Env"]
