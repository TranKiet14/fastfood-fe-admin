import { Button, Table, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { EyeOutlined } from "@ant-design/icons"
import { Image } from 'antd';
import { formatDateTime } from "../../../helpers/moment"
import DeleteFood from "./DeleteFood";
import EditFood from "./EditFood";
import { useSelector } from "react-redux";

function TableFood(props) {
    const { foods, onReload, setSelectedItems } = props
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
                    <Link to={`/detail-food/${record._id}`} style={{ margin: "0px 10px 0px 0px" }}>
                        <Tooltip title="Xem chi tiết" color="cyan">
                            <Button size="small" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link>
                    {(user && user?.role?.permissions.includes("foods_edit")) && (
                        <EditFood record={record} onReload={onReload} />
                    )}
                    {(user && user?.role?.permissions.includes("foods_delete")) && (
                        <DeleteFood record={record} onReload={onReload} />
                    )}
                </>
            )
        }
    ]
    const rowSelection = {
        onSelect: (_record, _selected, selectedRows) => {
            const newSelectedRows = selectedRows.map(item => item._id);
            setSelectedItems(newSelectedRows)
        },
        onSelectAll: (_selected, selectedRows, _changeRows) => {
            const newSelectedRows = selectedRows.map(item => item._id);
            setSelectedItems(newSelectedRows)
        },
    }
    return (
        <>
            <Table
                dataSource={foods}
                rowSelection={{
                    ...rowSelection
                }}
                columns={columns} rowKey={"_id"}
            />
        </>
    )
}
export default TableFood