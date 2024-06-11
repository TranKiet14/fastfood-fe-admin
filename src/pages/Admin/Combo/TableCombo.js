import { Button, Table, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { EyeOutlined } from "@ant-design/icons"
import { Image } from 'antd';
import { formatDateTime } from "../../../helpers/moment"
import { useSelector } from "react-redux";
import DeleteCombo from "./DeleteCombo"
import { EditOutlined } from "@ant-design/icons"

function TableCombo(props) {
    const { combos, onReload } = props
    const user = useSelector(state => state.auth.login.currentUser)
    const columns = [
        {
            title: "Tên",
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
            title: "Giá",
            dataIndex: "price",
            key: "price"
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
                    <Link to={`/detail-combo/${record._id}`} style={{ margin: "0px 10px 0px 0px" }}>
                        <Tooltip title="Xem chi tiết" color="cyan">
                            <Button size="small" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link>
                    {(user && user?.role?.permissions.includes("combos_edit")) && (
                        <Link to={`/admin/edit-combo/${record._id}`} >
                            <Tooltip title="Chỉnh sửa" color="blue">
                                <Button ghost type="primary" size="small" ><EditOutlined /></Button>
                            </Tooltip>
                        </Link>
                    )}
                    {(user && user?.role?.permissions.includes("combos_delete")) && (
                        <DeleteCombo record={record} onReload={onReload} />
                    )}
                </>
            )
        }
    ]
    return (
        <>
            <Table dataSource={combos} columns={columns} rowKey={"_id"} />
        </>
    )
}
export default TableCombo