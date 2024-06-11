import { Button, Table, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { EyeOutlined } from "@ant-design/icons"
import { Image } from 'antd';
import { formatDateTime } from "../../../helpers/moment"
import { useSelector } from "react-redux";
import  DeleteCategory  from "./DeleteCategory";
import EditCategory from "./EditCategory";

function TableCategory(props) {
    const { categories, onReload } = props
    const user = useSelector(state => state.auth.login.currentUser)
    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Hình ảnh",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (_, record) => (
                <Image
                    width={150}
                    src={record.thumbnail}
                />
            )
        },
        {
            title: "Thời gian",
            key: "time",
            render: (_, record) => (
                <>
                    <small>Tạo mới: <strong>{formatDateTime(record.createdAt)}</strong></small>
                    <br></br>
                    <small>Cập nhật: <strong>{formatDateTime(record.updatedAt)}</strong></small>
                </>
            )
        },
        {
            title: "Trạng thái",
            key: "status",
            render: (_, record) => (
                <>
                    {record.status === "active" ? (
                        <Tag color="green">Đang hoạt động</Tag>
                    ) : (
                        <Tag color="red">Ngừng hoạt động</Tag>
                    )}
                </>
            )
        }
        ,
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
                    {(user && user?.role?.permissions.includes("foods-category_edit")) && (
                        <EditCategory record={record} onReload={onReload} />
                    )}
                    {(user && user?.role?.permissions.includes("foods-category_delete")) && (
                        <DeleteCategory record={record} onReload={onReload} />
                    )}
                </>
            )
        }
    ]
    return (
        <>
            <Table dataSource={categories} columns={columns} rowKey={"_id"} />
        </>
    )
}
export default TableCategory