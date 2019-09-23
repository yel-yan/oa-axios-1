import React from "react";
import { Menu, Icon,Tabs,Breadcrumb,Select,Button,Table,Modal,Form, Input,Checkbox, Radio,Row,Col,DatePicker,Slider,Upload,Steps,Card,message } from 'antd'
const FormItem = Form.Item;
const Step = Steps.Step;
import Common from '../../utils/common'
import * as API from '../../axios/myAxios'

let uuid = 0;
class BXModal extends React.Component {
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
            item:{
                amount:undefined,
                cost_type:undefined,
                time:undefined,
                content:undefined
            },
            costType:[],
            cost_total:undefined
        };
    }

    componentDidMount(){
        API.GET('expenses/types',{category:'expense_sub'}).then(res => {
            console.log("费用类型数据")
            this.setState({costType:res.data})
          }) .catch(err => {
              console.log(err)
          });
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({summary: event.target.value});
    }

    handleOk = (status) => {
        const formData = this.props.formData;
        const params = {
            approveid: formData.checkApproverid,
            expenseid: formData.expense.Expenseid,
            status: status,
            summary : this.state.summary
        }
        API.POST('expenses/approvalto',params).then((data) => {
            console.log('报销审批')
            console.log(data)
            if(data.code == 1){
                message.success(data.msg);
            }else{
                message.error(data.msg)
            }
        }).catch((err) => {
            console.log(err);
        })
        this.props.onOk({visible:!this.props.visible,type:'bx'})
    }
    
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.onCancel({visible:!this.props.visible,type:'bx'})
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let formData = {};
        let allCost = []
        console.log(this.props.form.getFieldsValue());
        const fields = this.props.form.getFieldsValue();
        fields.keys.map((key) => {
            let item = {};
            console.log(key)
            console.log(fields[`amount${key}`])
            fields[`time${key}`] = Math.floor(new Date(fields[`time${key}`]).getTime() / 1000)
            Object.assign(item,{amount:parseFloat(fields[`amount${key}`]),cost_type:parseFloat(fields[`cost_type${key}`]),time:fields[`time${key}`],content:fields[`content${key}`]})
            console.log(item)
            allCost.push(item)
        })
        formData.detailed = JSON.stringify(allCost);
        formData.approverid = fields.approverid.join(',')
        formData.ccerid = fields.ccerid.join(',')
        formData.total = fields.total
        formData.reason = fields.reason;
        console.log("----------------")
        console.log(formData)
        
        API.POST('expenses/addto',formData).then((data) => {
            console.log('报销审批提交')
            if(data.code == 1){
                message.success(data.msg);
                this.props.onCancel({visible:!this.props.visible,type:'bx'})
            }else{
                message.error(data.msg)
            }
            this.props.form.resetFields();
        }).catch((err) => {
            console.log(err);
        })





        // message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
        // if (typeof v === 'undefined') {
        //     return '';
        // }
        //     return v;
        // }));
        // const {formData} = this.state;
        // console.log(formData.started)
        // formData.starteds = Math.floor(new Date(formData.starteds).getTime() / 1000)
        // formData.endeds = Math.floor(new Date(formData.endeds).getTime() / 1000)
        
    }

    add = () => {
        uuid++;
        const form  = this.props.form
        // can use data-binding to get
        let keys = form.getFieldValue('keys');
        keys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys,
        });
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        let keys = form.getFieldValue('keys');
        keys = keys.filter((key) => {
          return key !== k;
        });
        // can use data-binding to set
        form.setFieldsValue({
          keys,
        });
    }
    
    render() {
        const { getFieldProps, getFieldValue } = this.props.form;
        const { costType } = this.state;
        let cost_type = [];

        getFieldProps('keys', {
            initialValue: [0],
        });

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };

        costType.map((item,index) => {
            cost_type.push(<Select.Option key={item.Id}>{item.Name}</Select.Option>)
        })

        const formItems = getFieldValue('keys').map((k) => {
            return (
                <Row style={{marginBottom:'24px'}} label={`好朋友${k}：`} key={k}>
                    <Col span="2"></Col>
                    <Col span="20">
                        <Card title={`报销明细${k+1}`} extra={<Button onClick={() => this.remove(k)}>删除</Button>}>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        label={'费用类型：'}
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 12}}>
                                        <Select size="large"  style={{width:100}} name="select" {...getFieldProps(`cost_type${k}`)}>
                                            {cost_type}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        label="报销金额："
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 12}}>
                                        <Input id="defaultInput" placeholder="填入金额" {...getFieldProps(`amount${k}`)}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem
                                label="发生时间："
                                labelCol={{span: 4}}
                                required>
                                <DatePicker name="startDate" {...getFieldProps(`time${k}`)}/>
                            </FormItem>
                            <FormItem
                                label="费用说明："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 14}}>
                                <Input type="textarea" placeholder="请输入" rows="3" {...getFieldProps(`content${k}`)}/>
                            </FormItem>

                        </Card>
                    </Col>
                </Row>
            );
        });


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
            <div>
                <Modal title="报销" visible={visible} width={'620'}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    footer={footer}>
                    {
                        operationType ?
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormItem
                                label="申请人："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 6}}>
                                <Input  value={formData.expense.Realname} disabled/>
                            </FormItem>
                            <FormItem
                                label="报销事由："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}>
                                <Input  value={formData.expense.Reason} />
                            </FormItem>
                            {
                                formData.expense_sub.map((item,index) => {
                                    let type = '';
                                    switch (item.CostType) {
                                        case '18':type = '交通费';break
                                        case '19':type = '燃油过路费'; break
                                        case '20':type = '住宿费';break
                                        case '21':type = '餐饮费'; break
                                        case '22':type = '人工费'; break
                                        case '23':type = '项目开支'; break
                                        case '24':type = '通讯费'; break
                                        case '25':type = '加班餐费'; break
                                        case '26':type = '运费'; break
                                        case '27':type = '办公用品'; break
                                        default: type = '其他'
                                    }
                                    return (
                                        <Row style={{marginBottom:'24px'}}>
                                            <Col span="2"></Col>
                                            <Col span="20">
                                                <Card title="报销明细1" key={index}>
                                                    <Row>
                                                        <Col span="12">
                                                            <FormItem
                                                                label="费用类型："
                                                                labelCol={{span: 8}}
                                                                wrapperCol={{span: 12}}>
                                                                <Input  value={item.CostTypeName} disabled/>
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="12">
                                                            <FormItem
                                                                label="报销金额："
                                                                labelCol={{span: 8}}
                                                                wrapperCol={{span: 12}}>
                                                                <Input   value={item.Amounts}/>
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <FormItem
                                                        label="发生时间："
                                                        labelCol={{span: 4}}>
                                                        <DatePicker name="startDate" value={Common.timeStampToStr(item.Time,'y-m-d')} />
                                                </FormItem>
                                                <FormItem
                                                    id="control-textarea"
                                                    label="费用说明："
                                                    labelCol={{span: 4}}
                                                    wrapperCol={{span: 14}}>
                                                    <Input type="textarea" value={item.Content} rows="3" />
                                                </FormItem>
                                            </Card>
                                        </Col>
                                    </Row>
                                    )
                                })
                            }
                               

                            <FormItem
                                label="报销总额："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 6}}>
                                <Input  value={formData.expense.Total}/>
                            </FormItem>

                            <FormItem
                                label="审批人："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 14}}>
                                <Steps style={{paddingTop:'7px'}}  size="small" direction="vertical" >{step}</Steps>
                            </FormItem>

                            {
                                formData.ccers && 
                                <FormItem
                                    label="抄送人"
                                    labelCol={{span: 4}}
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
                                labelCol={{span: 4}}
                                wrapperCol={{span: 14}}>
                                <Input type="textarea" rows="3" onChange={this.handleChange}/>
                            </FormItem>
                        </Form>
                        :
                        <Form horizontal>
                            <FormItem
                                label="报销事由："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}>
                                <Input placeholder="请输入..." {...getFieldProps('reason')}/>
                            </FormItem>

                            {formItems}

                            <FormItem wrapperCol={{ span: 18, offset: 2 }}>
                                <Button onClick={this.add} icon="plus" size="small" style={{ marginRight: 8 }}>新增明细</Button>
                            </FormItem>
                            
                            <FormItem
                                label="报销总额："
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}>
                                <Input placeholder="请输入..."  {...getFieldProps('total')}/>
                            </FormItem>

                            <FormItem
                                label="审批人"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}
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
                                labelCol={{span: 4}}
                                wrapperCol={{span: 18}}
                                required>
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
            </div>
        );
    }
}

export default Form.create({})(BXModal);