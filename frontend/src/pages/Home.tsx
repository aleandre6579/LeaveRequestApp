import {Link} from "react-router-dom";
import '../App.css'
import LeaveForm from "../components/LeaveForm.tsx";
import { List, Card } from 'antd'
import { useEffect, useState } from "react";

const position = "bottom"
const align = "center"

const initData = { Data: []}

function App() {
    const [data, setData] = useState(initData)

    function appendData(newValues) {
        data.Data.push(newValues)
        const newData = { Data: [] }
        newData.Data = data.Data
        setData(newData)
    }

    return (
        <div style={{width:'100%'}} className='flex flex-col items-center border-4 text-sky-500 border-sky-500 mb-20 bg-sky-200/90 rounded-xl p-10' >
            <div className='mb-20 relative'>
                <h2 className='cursor-default text-6xl rounded-full font-bold'>
                    Request Your Leave
                </h2>
            </div>

            <div className='flex w-full'>
                <LeaveForm appendData={appendData}/>
                <span className="m-5"/>
                <List
                    dataSource={data.Data}
                    grid={{
                        gutter: 12,
                    }}
                    style={{width: "100%", borderRadius: "10px"}}
                    pagination={{position, align, pageSize:6}}
                    renderItem={(item, index) => (
                        <List.Item
                        >
                            <Card title={item.reason}>
                                <div className="flex justify-between"><span>Employee ID:</span><span>{item.employeeId}</span></div>
                                <div className="flex justify-between"><span>Start Date:</span><span className="ml-2">{item.startDate}</span></div>
                                <div className="flex justify-between"><span>Duration (days):</span><span>{item.duration}</span></div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
 export default App
