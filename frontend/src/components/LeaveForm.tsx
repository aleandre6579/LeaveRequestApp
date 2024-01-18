import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
} from 'antd';
import axios from "axios";


const {RangePicker} = DatePicker;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};


const LeaveForm: React.FC = ({dataSource}) => {

    const submitForm = async (values: any) => {
        console.log('Received values of form: ', values);
        let res: any = null
        try {
            res = await axios.post("/api/leave", JSON.stringify({employeeID:values['employeeId'],reason:values['reason'],startDate:values['startDate'],endDDate:values['endDate']}))
        } catch (e) {
            window.alert("Failed to create leave")
            return
        }
        console.log(res)
        dataSource.append(res.data)
    }

    return (
        <div style={{border: '1px solid rgba(0,0,0,0.3)', padding: "30px", marginBottom: "0px", marginRight: "30px"}}>
            <Form {...formItemLayout} labelCol={{span: 10}} variant="outlined" className='' onFinish={submitForm}
            >
                <Form.Item label="Employee ID" name="Input" rules={[{required: true, message: 'ID is required!'}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Reason"
                    name="TextArea"
                    rules={[{required: true, message: 'Reason required!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    label="Leave Dates"
                    name="RangePicker"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <RangePicker/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 6, span: 16}}>
                    <Button type="primary" htmlType="submit" onClick={submitForm}>
                        Submit
                    </Button>
                </Form.Item>

            </Form>

        </div>
    )
}


export default LeaveForm;