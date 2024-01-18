import {Link} from "react-router-dom";
import '../App.css'
import LeaveForm from "../components/LeaveForm.tsx";
import { List, Card } from 'antd'

const position = "bottom"
const align = "center"
const data = [
    {
        employeeId: 23,
        reason: 'sick',
        startDate: '23',
        endDate: '25'
    },
];

function App() {

    return (
        <div className='flex flex-col items-center border-4 text-sky-500 border-sky-500 mb-20 bg-sky-200/90 rounded-xl p-10' >
            <div className='mb-20 relative'>
                <h2 className='cursor-default text-6xl rounded-full font-bold'>
                    Request Your Leave
                </h2>
            </div>

            <div className='flex'>
                <LeaveForm dataSource={data}/>

                <List
                    dataSource={data}
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 2,
                      md: 4,
                      lg: 4,
                      xl: 6,
                      xxl: 3,
                    }}
                    style={{width: "100%", borderRadius: "10px"}}
                    size="large"
                    pagination={{position, align, pageSize:6}}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{}}
                        >
                            <Card title={item.reason}>
                                {item.reason}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
 export default App
