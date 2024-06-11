import { Button, Image, InputNumber, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getFoods } from "../../../service/Admin/foodService";
function ListFoods(props) {
    const { listFoods, setDataFoods } = props
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const accessToken = getCookie("access_token")
                const res = await getFoods(accessToken);
                for (const item of res) {
                    if (listFoods.length > 0) {
                        const food = listFoods.find(i => i._id === item._id)
                        food ? item.quantity = food.quantity : item.quantity = 1;
                    }
                }
                setData(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
    }, [listFoods])
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
        },
        {
            title: "Số lượng",
            key: "quantity",
            render: (_, record) => (
                <>
                    <InputNumber min={1} max={10} defaultValue={record?.quantity || 1} onChange={(value) => {
                        record.quantity = value;
                        let newListFoods = [...listFoods];
                        for (const item of newListFoods) {
                            if (item._id === record._id) {
                                item.quantity = record.quantity
                            }
                        }
                        setDataFoods(newListFoods);
                    }} />
                </>
            )
        }
    ]
    const rowSelection = {
        onSelect: (_record, _selected, selectedRows) => {
            for (const item of selectedRows) {
                if (!item.quantity) {
                    item.quantity = 1;
                }
            }
            setDataFoods(selectedRows)
        },
        onSelectAll: (_selected, selectedRows, _changeRows) => {
            for (const item of selectedRows) {
                if (!item.quantity) {
                    item.quantity = 1;
                }
            }
            setDataFoods(selectedRows)
        },
        selectedRowKeys: listFoods.map(item => item = item._id)
    };
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCancle = () => {
        setShowModal(false);
    }
    const handleOk = () => {

    }
    return (
        <>
            <Button type="primary" onClick={handleShowModal}>Chỉnh sửa</Button>
            <Modal title="Chọn món ăn" open={showModal} onCancel={handleCancle} onOk={handleOk} width={700}>
                <Table
                    columns={columns}
                    rowSelection={{
                        ...rowSelection
                    }}
                    dataSource={data}
                    rowKey={"_id"}
                />
            </Modal>
        </>
    )
}
export default ListFoods