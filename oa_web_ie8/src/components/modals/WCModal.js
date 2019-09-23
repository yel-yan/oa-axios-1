import React from "react";
import { Form, Select, InputNumber, DatePicker, Switch,
    Slider, Button, message, Row, Col, Upload, Icon, Modal, Input,Steps } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
import Common from '../../utils/common'
import * as API from '../../axios/myAxios'

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

const WCModal = React.createClass({
    mixins: [Form.ValueMixin],

    getInitialState() {
        return {
            formData: {
                type: undefined,
                started: undefined,
                ended: undefined,
                hours:undefined,
                reason:undefined,
                picture:undefined,
                approverid:[],
                ccerid:[]
            },
            summary:''
        };
    },

    handleUpload(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(info.file.name + ' 上传成功。');
        } else if (info.file.status === 'error') {
            message.error(info.file.name + ' 上传失败。');
        }
    },

    handleChange(event) {
        console.log(event.target.value)
        this.setState({summary: event.target.value});
    },

    handleOk(status) {
        const formData = this.props.formData;
        const params = {
            approveid: formData.checkApproverid,
            gooutid: formData.goout.Gooutid,
            status: status,
            summary : this.state.summary
        }
        API.POST('goouts/approvalto',params).then((data) => {
            console.log('外出审批')
            console.log(data)
            if(data.code == 1){
                message.success(data.msg);
            }else{
                message.error(data.msg)
            }
          }).catch((err) => {
            console.log(err);
          })
        this.props.onOk({visible:!this.props.visible,type:'wc'})
    },
    
    handleCancel(){
        let formData = {
            type: undefined,
            started: undefined,
            ended: undefined,
            hours:undefined,
            reason:undefined,
            picture:undefined,
            approverid:[],
            ccerid:[]
        };
        this.setState({formData:formData})
        this.props.onCancel({visible:!this.props.visible,type:'wc'})
    },

    handleSubmit(e) {
        e.preventDefault();
        // message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
        // if (typeof v === 'undefined') {
        //     return '';
        // }
        //     return v;
        // }));
        const {formData} = this.state;
        console.log(formData.started)
        formData.started = Math.floor(new Date(formData.started).getTime() / 1000)
        formData.ended = Math.floor(new Date(formData.ended).getTime() / 1000)
        formData.approverid = formData.approverid.join(',')
        formData.ccerid = formData.ccerid.join(',')
        console.log()
        API.POST('goouts/addto',formData).then((data) => {
            console.log('加班审批提交')
            if(data.code == 1){
                message.success(data.msg);
                this.props.onCancel({visible:!this.props.visible,type:'wc'})
            }else{
                message.error(data.msg)
            }
        }).catch((err) => {
            console.log(err);
        })
    },

    render() {
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
            const types = this.props.types;
            const approverlist = this.props.approverlist;
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
            <Modal title="外出" visible={visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
                footer={footer}>
                {
                    operationType ?
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="申请人："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 6}}>
                            <Input  value={formData.goout.Realname} disabled/>
                        </FormItem>
                        <FormItem
                            label="起止时间："
                            labelCol={{span: 6}}>
                            <Col span="6">
                                <DatePicker name="startDate" onChange={this.setValue.bind(this, 'startDate')} value={Common.timeStampToStr(formData.goout.Created,'y-m-d')} disabled/>
                            </Col>
                            <Col span="1">
                            <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="6">
                                <DatePicker name="endDate" onChange={this.setValue.bind(this, 'endDate')} value={Common.timeStampToStr(formData.goout.Ended,'y-m-d')} disabled/>
                            </Col>
                        </FormItem>

                        <FormItem
                            label="小时数："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input value={formData.goout.Hours} disabled/>
                        </FormItem>

                        <FormItem
                            label="外出事由："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input type="textarea"  rows="3" value={formData.goout.Reason} disabled/>
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
                                    onChange={this.handleChange1}
                                    disabled
                                >
                                </Select>
                            </FormItem>
                        }

                        <FormItem
                            label="审批意见："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input type="textarea" rows="3" onChange={this.handleChange}/>
                        </FormItem>
                    </Form>
                    :
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="起止时间："
                            labelCol={{span: 6}}
                            required>
                            <Col span="6">
                                <DatePicker name="started" onChange={this.setValue.bind(this, 'started')} />
                            </Col>
                            <Col span="1">
                            <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="6">
                                <DatePicker name="ended" onChange={this.setValue.bind(this, 'ended')} />
                            </Col>
                        </FormItem>

                        <FormItem
                            id="control-input"
                            label="小时数："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input id="control-input" placeholder="请输入..." name="hours"
                                value={formData.hours}
                                onChange={this.setValue.bind(this, 'hours')}/>
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="外出事由："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Input type="textarea" placeholder="请输入" id="control-textarea" rows="3" name="reason"
                                value={formData.reason}
                                onChange={this.setValue.bind(this, 'reason')}/>
                        </FormItem>

                        <FormItem
                            label="审批人"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Select
                                multiple
                                name="approverid"
                                value={formData.approverid}
                                onChange={this.setValue.bind(this, 'approverid')}
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
                                value={formData.ccerid}
                                onChange={this.setValue.bind(this, 'ccerid')}
                            >
                                {children}
                            </Select>
                        </FormItem>
                    </Form>
                }
            </Modal>
        );
    }
});

export default WCModal;