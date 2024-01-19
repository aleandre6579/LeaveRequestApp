import '../App.css'
import LeaveForm from "../components/LeaveForm.tsx";
import { List, Card, Button } from 'antd'
import { useEffect, useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import axios from "axios";
import { useAuth } from "../auth/authProvider.tsx";

const position = "bottom"
const align = "center"

const initData = { Data: [] }

function App() {
    let [data, setData] = useState(initData)
    const auth = useAuth()

    async function fetchData() {
        let res: any = null
        try {
            res = await axios.get("/api/leaves")
        } catch(e: any) {
            if(e.response.status === 401) {
                auth?.setToken("")
            }
            return
        }

        const newData = { Data: res.data }
        setData(newData)
    }
    
    function appendData(newValues) {
        data.Data.push(newValues)
        const newData = { Data: [] }
        newData.Data = data.Data
        setData(newData)
    }

    async function deleteLeaveRequest(leave) {
        try {
            await axios.delete("/api/leave/"+leave.ID)
        } catch(e: any) {
            if(e.response.status === 401) {
                auth?.setToken("")
            }
            return
        }
        fetchData()
    }

    useEffect(() => {

        setTimeout(() => {
            fetchData()
        }, 100)
    }, [])

    const props = {
        appendData: appendData
    }

    return (
        <div style={{width:'100%'}} className='flex flex-col items-center border-4 text-sky-500 border-sky-500 mb-20 bg-sky-200/90 rounded-xl p-10' >
            <div className='mb-20 relative'>
                <h2 className='cursor-default text-6xl rounded-full font-bold'>
                    Request Your Leave
                </h2>
            </div>

            <div className='flex w-full'>
                <LeaveForm {...props}/>
                <span className="m-5"/>
                <List
                    dataSource={data.Data}
                    grid={{
                        gutter: 12,
                    }}
                    style={{width: "100%", borderRadius: "10px"}}
                    pagination={{position, align, pageSize:6}}
                    renderItem={(item, _) => (
                        <List.Item
                        >
                            <Card title={item.reason}>
                                <div className="flex justify-between"><span className='font-medium'>Employee ID:</span><span>{item.employeeId}</span></div>
                                <div className="flex justify-between"><span className='font-medium'>Start Date:</span><span className="ml-2">{item.startDate}</span></div>
                                <div className="flex justify-between"><span className='font-medium'>Duration (days):</span><span>{item.duration}</span></div>
                                <Button onClick={() => deleteLeaveRequest(item)} className="mt-5" danger icon={<CloseOutlined/>}></Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
 export default App
