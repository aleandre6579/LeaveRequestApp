import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
} from 'antd';
import axios from "axios";
import { useAuth } from '../auth/authProvider'; 

interface Props {
    appendData: any
}

const LeaveForm: React.FC<Props> = (props: Props) => {

    const auth = useAuth()

    const submitForm = async (values: any) => {
        values['startDate'] = values['startDate'].format('D-MM-YYYY')
        let res: any = null
        try {
            res = await axios.post("/api/leave", JSON.stringify({employeeID:values['employeeId'],reason:values['reason'],startDate:values['startDate'],duration:values['duration']}))
        } catch (e: any) {
            if(e.response.status === 401) {
                auth?.setToken("")
            }
            return
        }
        values['ID'] = res.data.leaveID
        props.appendData(values)
    }

    return (
        <div style={{border: '1px solid rgba(0,0,0,0.3)',padding:'15px'}}>
            <Form labelCol={{span: 10}} variant="outlined" style={{width:'300px'}} onFinish={submitForm}
            >
                <Form.Item label="Employee ID" name="employeeId" rules={[{required: true, message: 'ID is required!'}]}>
                    <InputNumber className='w-full'/>
                </Form.Item>

                <Form.Item
                    label="Reason"
                    name="reason"
                    rules={[{required: true, message: 'Reason required!'}]}
                >
                    <Input.TextArea className='w-full'/>
                </Form.Item>

                <Form.Item
                    label="Leave Date"
                    name="startDate"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <DatePicker className='w-full'/>
                </Form.Item>
                
                <Form.Item
                    label="Duration (Days)"
                    name="duration"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <InputNumber className='w-full'/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" className='bg-sky-500' htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>

        </div>
    )
}


export default LeaveForm;
