import { useSelector } from "react-redux";
import { Button, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import EditRole from "./EditRole";
function TableRole (props) {
    const { roles, onReload } = props
    const user = useSelector(state => state.auth.login.currentUser)
    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Mô tả ngắn",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to={`/detail-food/${record._id}`} style={{margin: "0px 10px 0px 0px"}}>
                        <Tooltip title="Xem chi tiết" color="cyan">
                            <Button size="small" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link>
                    {(user && user?.role?.permissions.includes("roles_edit")) && (
                        <EditRole record={record} onReload={onReload} />
                    )}
                </>
            )
        }
    ]
    return (
        <>
            <Table dataSource={roles} columns={columns} rowKey={"_id"} />
        </>
    )
}
export default TableRole