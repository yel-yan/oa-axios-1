import React from "react";
import { Form, Select, InputNumber, DatePicker, Switch,
    Slider, Button, message, Row, Col, Upload, Icon, Modal, Input,Steps } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
import Common from '../../utils/common'
import * as API from '../../axios/myAxios'


const WPModal = React.createClass({
    mixins: [Form.ValueMixin],

    getInitialState() {
        return {
            formData: {
                purpose: undefined,
                names: undefined,
                quantitys: undefined,
                content:undefined,
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
        console.log(status)
        const formData = this.props.formData;
        const params = {
            approveid: formData.checkApproverid,
            oagoodid: formData.oagoods.Oagoodid,
            status: status,
            summary : this.state.summary
        }
        API.POST('oagoods/approvalto',params).then((data) => {
            console.log('物品审批')
            console.log(data)
            if(data.code == 1){
                message.success(data.msg);
            }else{
                message.error(data.msg)
            }
        }).catch((err) => {
            console.log(err);
        })
        this.props.onOk({visible:!this.props.visible,type:'wp'})
    },
    
    handleCancel(){
        let formData = {
            purpose: undefined,
            names: undefined,
            quantitys: undefined,
            content:undefined,
            picture:undefined,
            approverid:[],
            ccerid:[]
        };
        this.setState({formData:formData})
        this.props.onCancel({visible:!this.props.visible,type:'wp'})
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
        API.POST('oagoods/addto',formData).then((data) => {
            console.log('加班审批提交')
            if(data.code == 1){
                message.success(data.msg);
                this.props.onCancel({visible:!this.props.visible,type:'wp'})
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
            <Modal title="物品" visible={visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    footer={footer}>
                {
                    operationType ?
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="申请人："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 6}}>
                            <Input  value={formData.oagoods.Realname} disabled/>
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem
                                    label="物品名称："
                                    labelCol={{span: 12}}
                                    wrapperCol={{span: 9}}>
                                    <Input value={formData.oagoods.Names} />
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem
                                    label="数量："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 9}}>
                                    <Input value={formData.oagoods.Quantitys} />
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem
                            label="物品用途："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input value={formData.oagoods.Purpose}/>
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="领用详情："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}>
                            <Input type="textarea" value={formData.oagoods.Content} rows="3" />
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
                        <Row>
                            <Col span="12">
                                <FormItem
                                    label="物品名称："
                                    labelCol={{span: 12}}
                                    wrapperCol={{span: 9}}
                                    required>
                                    <Input  name="names" value={formData.names} onChange={this.setValue.bind(this, 'names')}/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem
                                    label="数量："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 9}}>
                                   <Input  name="quantitys" value={formData.quantitys} onChange={this.setValue.bind(this, 'quantitys')}/>
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem
                            id="control-input"
                            label="物品用途："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Input id="control-input" placeholder="Please enter..." name="purpose"
                                value={formData.purpose}
                                onChange={this.setValue.bind(this, 'purpose')}/>
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="领用详情："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required>
                            <Input type="textarea" placeholder="请输入" id="control-textarea" rows="3"name="content"
                                value={formData.content}
                                onChange={this.setValue.bind(this, 'content')} />
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

export default WPModal;