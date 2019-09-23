import React from "react";
import { Form, Select, InputNumber, DatePicker, Switch,
    Slider, Button, message, Row, Col, Upload, Icon, Modal, Input,Steps } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
import Common from '../../utils/common'
import * as API from '../../axios/myAxios'
import axios from 'axios'

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

class GWModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:props.visible,
            current:1,
            total:100,
            formData: {
                total: undefined,
                reason: undefined,
                detailed:[],
                picturn:undefined,
                approverid:[],
                ccerid:[]
            },
            summary:'',
            approverlist:[]
        };
    }

    componentDidMount () {
        API.GET('approver/list').then(res => {
          console.log(res)
          this.setState({approverlist:res.data})
        }) .catch(err => {
            console.log(err)
        });
      }

    handleUpload(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(info.file.name + ' 上传成功。');
        } else if (info.file.status === 'error') {
            message.error(info.file.name + ' 上传失败。');
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({summary: event.target.value});
    }

    handleOk = (status) => {
        const formData = this.props.formData;
        const params = {
            approveid: formData.checkApproveid,
            signingid: formData.signing.Approverids,
            status: status,
            summary : this.state.summary
        }
        API.POST('signing/approvalto',params).then((data) => {
            console.log('公文审批')
            console.log(data)
            if(data.code == 1){
                message.success(data.msg);
            }else{
                message.error(data.msg)
            }
          }).catch((err) => {
            console.log(err);
          })
        this.props.onOk({visible:!this.props.visible})
    }
    
    handleCancel = () => {
        this.props.onCancel({visible:!this.props.visible})
    }

    normFile(e) {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
        const fields = this.props.form.getFieldsValue();
        const field = fields.upload
        const param = new FormData();//不兼容ie8以下浏览器
        const file = { uri: field[0].thumbUrl, type: 'multipart/form-data', name: field[0].name };
        
        param.append('file', file);
        const config = {
            baseURL : '/api_img',
            headers: { 'Content-Type': 'multipart/form-data', Accept: 'Application/json' },
            onUploadProgress: e => {
              const completeProgress = (((e.loaded / e.total) * 100) | 0) + '%';
              this.progress = completeProgress;
            }
          };
        axios.post('http://193.112.23.168:8088/file/upload_file', param, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
        // message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
        // if (typeof v === 'undefined') {
        //     return '';
        // }
        //     return v;
        // }));
        // const {formData} = this.state;
        // console.log(formData.started)
        // formData.started = Math.floor(new Date(formData.started).getTime() / 1000)
        // formData.ended = Math.floor(new Date(formData.ended).getTime() / 1000)
        // formData.approverid = formData.approverid.join(',')
        // formData.ccerid = formData.ccerid.join(',')
        // console.log()
        // API.POST('goouts/addto',formData).then((data) => {
        //     console.log('加班审批提交')
        //     if(data.code == 1){
        //         message.success(data.msg);
        //     }else{
        //         message.error(data.msg)
        //     }
        //     this.props.onCancel({visible:!this.props.visible,type:'wc'})
        // }).catch((err) => {
        //     console.log(err);
        // })
    }

    render() {
        const { getFieldProps } = this.props.form;
        let formData ;
        const operationType = this.props.operationType;
        let step;
        const ccers = [];
        if(operationType){
            formData = this.props.formData;
            step = formData.approvers && formData.approvers.map((item,index) => {
                if( item.Status == 1) {
                    Object.assign(item,{status:'finish',title:'已完成'})
                }else if(item.Status == 0){
                    Object.assign(item,{status:'process',title:'进行中'})
                }else {
                    Object.assign(item,{status:'wait',title:'已拒绝'})
                }
                return (
                    <Step key={index} title={item.Realname} status={item.status} description={item.title} />
                )
            })
            formData.ccers && formData.ccers.map((item,index) => {
                ccers.push(item.Realname);
            })
        }

        const children = [],type_children=[]
        if(!operationType){
            formData = this.state.formData;
            console.log('aaaaaaaaaaaaaa')
            const approverlist = this.state.approverlist;
            console.log(approverlist)
            approverlist.map((item,index) => {
                children.push(<Select.Option key={item.Userid}>{item.Realname}</Select.Option>)
            })
        }
        let footer;
        if(operationType){
            console.log(formData.checkStatus)
            switch (formData.checkStatus) {
                case 0:footer = [
                    <Button key="back" type="ghost" size="large" onClick={this.handleOk.bind(this,2)}>不同意</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this,1)}>
                        同 意
                    </Button>
                    ];break
                case 1:footer = ["审批状态：已通过"]; break
                case 2:footer = ["审批状态：未通过"];break
            } 
        }else{
            footer = [
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleSubmit}>
                    提交
                </Button>
                ]
        }
        const visible = this.props.visible;
        return (
            <Modal title="公文签批" visible={visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
                footer={footer}>
                {
                    operationType ?
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="申请人："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 6}}>
                            <Input  value={formData.signing.Realname} disabled/>
                        </FormItem>
                        <FormItem
                            label="公文标题："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input value={formData.signing.Title} disabled/>
                        </FormItem>

                        <FormItem
                            label="公文内容："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input type="textarea"  rows="3" value={formData.signing.Content} disabled/>
                        </FormItem>

                        <FormItem
                            label="审批人："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Steps style={{paddingTop:'7px'}}  size="small" direction="vertical" >{step}</Steps>
                        </FormItem>

                        {
                            formData.ccers && 
                            <FormItem
                                label="抄送人"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}>
                                <Select
                                    multiple
                                    defaultValue={ccers}
                                    disabled
                                >
                                </Select>
                            </FormItem>
                        }

                        <FormItem
                            label="审批意见："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input type="textarea" rows="3"/>
                        </FormItem>
                    </Form>
                    :
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="公文标题："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Input placeholder="请输入..." name="title" {...getFieldProps('title')}/>
                        </FormItem>

                        <FormItem
                            label="公文内容："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Input type="textarea" placeholder="请输入" rows="3" name="content" {...getFieldProps('content')}/>
                        </FormItem>

                        <FormItem
                            label="附件"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            help="提示信息要长长长长长长长长长长长长长长"
                            >
                            <Upload name="logo" action="api/tools/upload_img" listType="picture" onChange={this.handleUpload}
                                {...getFieldProps('upload', {
                                valuePropName: 'fileList',
                                normalize: this.normFile,
                                })}
                            >
                                <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>

                        <FormItem
                            label="审批人"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Select
                                multiple
                                name="approverid"
                                {...getFieldProps('approverid')}
                            >
                                {children}
                            </Select>
                        </FormItem>

                        <FormItem
                            label="抄送人"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Select
                                multiple
                                name="ccerid"
                                {...getFieldProps('ccerid')}
                            >
                                {children}
                            </Select>
                        </FormItem>
                    </Form>
                }
            </Modal>
        );
    }
}

export default Form.create({})(GWModal);