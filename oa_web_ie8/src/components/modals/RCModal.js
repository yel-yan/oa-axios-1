import React from "react";
import { Form, Select, InputNumber, DatePicker, Switch,
    Slider, Button, message, Row, Col, Upload, Icon, Modal, Input,Steps } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
const RangePicker = DatePicker.RangePicker;
import Common from '../../utils/common'
import * as API from '../../axios/myAxios'

const notification = [{id:'-1',value:'无'}, {id:'0',value:'日程开始时'}, {id:'5',value:'提前五分钟'}, {id:'15',value:'提前十五分钟'}, {id:'30',value:'提前三十分钟'}, {id:'60',value:'提前一小时'}, {id:'1440',value:'提前一天'}]
const repeat = [{id:'0',value:'不重复'}, {id:'1',value:'每天'}, {id:'7',value:'每周'}, {id:'14',value:'每两周'}, {id:'30',value:'每月'}, {id:'365',value:'每年'}]
let children = [], children2 = [];
notification.map((item,index) => {
    children.push(<Select.Option key={item.id}>{item.value}</Select.Option>)
})

repeat.map((item,index) => {
    children2.push(<Select.Option key={item.id}>{item.value}</Select.Option>)
})

const RCModal = React.createClass({
    mixins: [Form.ValueMixin],

    getInitialState() {
        return {
            start:'',
            end:''
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

    onDateChange (value, dateString) {
        console.log('From: ', value[0], ', to: ', value[1]);
        console.log('From: ', dateString[0], ', to: ', dateString[1]);
        this.setState({start:dateString[0],end:dateString[1]})
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
        this.props.onCancel({visible:!this.props.visible})
    },

    handleSubmit(e) {
        e.preventDefault();
        const { start,end } = this.state;
        console.log(this.props.form.getFieldsValue());
        const fields = this.props.form.getFieldsValue();
        let formData = {};
        formData.reason = fields.reason
        formData.started = start
        formData.ended = end
        formData.remind = fields.remind
        formData.repeat = fields.repeat
        console.log(formData)
        API.POST('/schedule/do_add',formData).then((data) => {
            console.log('日程提交')
            if(data.code == 1){
                message.success(data.msg);
                this.props.onCancel({visible:!this.props.visible})
            }else{
                message.error(data.msg)
            }
        }).catch((err) => {
            console.log(err);
        })
    },

    render() {
        const { getFieldProps } = this.props.form;
        let formData , remindValue, repeatValue;
        const operationType = this.props.operationType;
        if(operationType){
            formData = this.props.formData;
            notification.map((item) => {
                if(item.id == formData.Remind ){
                    remindValue = item.value;
                    return;
                }
            })

            repeat.map((item) => {
                if(item.id == formData.Repeat){
                    repeatValue = item.value;
                    return;
                }
            })
        }
        if(!operationType){
            formData = this.state.formData;
        }
        let footer;
        if(!operationType){
            footer = [
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleSubmit}>
                    提交
                </Button>
                ]
        }
        const visible = this.props.visible;
        return (
            <Modal title="日程" visible={visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
                footer={footer}>
                {
                    operationType ?
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="日程内容："
                            labelCol={{span: 5}}
                            wrapperCol={{span: 15}}>
                            <Input type="textarea"  rows="3" value={formData.Reason} disabled/>
                        </FormItem>
                        <FormItem
                            label="起止时间："
                            labelCol={{span: 5}}
                            wrapperCol={{span: 15}}>
                            <RangePicker format="yyyy-MM-dd HH:mm"  value={[Common.timeStampToStr(formData.Start,'y-m-d h:i:s'),Common.timeStampToStr(formData.Start,'y-m-d h:i:s')]} disabled/>
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem
                                    label="提醒："
                                    labelCol={{span: 12}}
                                    wrapperCol={{span: 9}}>
                                    <Input value={remindValue} disabled />
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem
                                    label="重复："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 9}}>
                                    <Input value={repeatValue} disabled />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    :
                    <Form horizontal onSubmit={this.handleSubmit} >
                        <FormItem
                            label="日程内容："
                            labelCol={{span: 5}}
                            wrapperCol={{span: 15}}
                            required>
                            <Input type="textarea"  rows="3" {...getFieldProps('reason')}/>
                        </FormItem>
                        <FormItem
                            label="起止时间："
                            labelCol={{span: 5}}
                            wrapperCol={{span: 15}}
                            required>
                            <RangePicker showTime   format="yyyy-MM-dd HH:mm" onChange={this.onDateChange} {...getFieldProps('time')}/>
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem
                                    label="提醒："
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 12}}
                                    required>
                                    <Select size="large" style={{width:110}} name="remind" {...getFieldProps('remind')}>
                                        {children}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem
                                    label="重复："
                                    labelCol={{span: 5}}
                                    wrapperCol={{span: 10}}
                                    required>
                                    <Select size="large" style={{width:110}} name="repeat" {...getFieldProps('repeat')}>
                                        {children2}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal>
        );
    }
});

export default Form.create()(RCModal);