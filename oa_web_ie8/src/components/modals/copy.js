import React from "react";
import { Menu, Icon,Tabs,Breadcrumb,Select,Button,Table,Modal,Form, Input,Checkbox, Radio,Row,Col,DatePicker,Slider,Upload,Steps } from 'antd'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Step = Steps.Step;

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

const steps = [{
    status: 'finish',
    title: '已完成',
    description: '严尔林'
  }, {
    status: 'process',
    title: '进行中',
    description: '严尔林'
  }, {
    status: 'wait',
    title: '待定',
    description: '严尔林'
  }, {
    status: 'wait',
    title: '待定',
    description: '严尔林'
  }].map(function(s, i) {
    return (
      <Step key={i} title={s.title} status={s.status} description={s.description} />
    );
  });

class BXModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:props.visible,
            current:1,
            total:100,
            formData: {
                userName: '大眼萌 minion',
                password: undefined,
                gender: 'male',
                remark: undefined,
                agreement: undefined,
            }
        };
    }

    handleOk = () => {
        this.props.onOk({visible:!this.props.visible,type:'bx'})
    }
    
    handleCancel = () => {
        this.props.onCancel({visible:!this.props.visible,type:'bx'})
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
            if (typeof v === 'undefined') {
                return '';
            }
            return v;
        }));
    }

    render() {
        const { formData } = this.state;
        console.log(this.props.visible)
        const visible = this.props.visible;
        return (
            <div>
                <Modal title="报销" visible={true}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem
                        id="control-input"
                        label="输入框："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}>
                        <Input id="control-input" placeholder="Please enter..." />
                        </FormItem>

                        <FormItem
                        id="control-textarea"
                        label="文本域："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}>
                        <Input type="textarea" id="control-textarea" rows="3" />
                        </FormItem>

                        <FormItem
                        label="Slider 滑动输入条："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required>
                        <Slider marks={['张三', '李四', '王五', '地瓜', '土豆', '西红柿', '榴莲']} name="slider"/>
                        </FormItem>

                        <FormItem
                        label="logo图："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        help="提示信息要长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长">
                        <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
                            <Button type="ghost">
                            <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                        </FormItem>

                        <FormItem
                        label="用户名："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required>
                        <Select
                            multiple
                            defaultValue={['a10', 'c12']}
                            onChange={this.handleChange1}
                        >
                            {children}
                        </Select>
                        </FormItem>

                        <FormItem
                        label="用户名："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required>
                        <Steps style={{paddingTop:'7px'}}  size="small" direction="vertical" >{steps}</Steps>
                        </FormItem>

                        <FormItem
                        label="日期选择框："
                        labelCol={{span: 6}}
                        required>
                        <Col span="6">
                            <DatePicker name="startDate" value={formData.startDate} />
                        </Col>
                        <Col span="1">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="6">
                            <DatePicker name="endDate" value={formData.endDate} />
                        </Col>
                        </FormItem>
                        <FormItem
                        label="用户名："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 6}}
                        required>
                        <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
                        </FormItem>
                        <FormItem
                        id="password"
                        label="密码："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required>
                        <Input type="password" id="password" name="password" placeholder="请输入密码" value={formData.password} />
                        </FormItem>
                        <FormItem
                        label="您的性别："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required>
                            <RadioGroup name="gender" value={formData.gender}>
                            <Radio value="male">男的</Radio>
                            <Radio value="female">女的</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                        id="remark"
                        label="备注："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        required
                        help="随便写点什么">
                        <Input type="textarea" placeholder="随便写" id="remark" name="remark" value={formData.remark} />
                        </FormItem>
                        <FormItem
                        wrapperCol={{span: 14, offset: 6}} >
                        <label>
                            <Checkbox name="agreement" value={formData.agreement} /> 同意
                        </label>
                        </FormItem>
                        {/* <Row>
                        <Col span="16" offset="6">
                            <Button type="primary" htmlType="submit">确定</Button>
                            <Button type="ghost" htmlType="submit">取消</Button>
                        </Col>
                        </Row> */}
                    </Form>
                    </Modal>
            </div>
        );
    }
}

export default BXModal;