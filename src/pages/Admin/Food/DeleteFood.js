import { Button, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteFood } from "../../../service/Admin/foodService";
import { getCookie } from "../../../helpers/cookie";

function DeleteFood (props) {
    const { onReload, record } = props;
    const [messageApi, contextHolder] = notification.useNotification()
    const handleDelete = async () => {
        try {
            const accessToken = getCookie("access_token")
            await deleteFood(accessToken, record._id);
            onReload()
        } catch (error) {
            console.log(error)
            messageApi.error(
                {
                    message: "Xóa Thất bại",
                    duration: 3
                }
            )
        }
        
    }
    return (
        <>
            {contextHolder}
            <Popconfirm title="Bạn có muốn xóa hay không" onConfirm={handleDelete} >
                <Button danger size="small" icon={<DeleteOutlined />} style={{margin: "0px 30px 0px 10px"}} />
            </Popconfirm>
        </>
    )
}

export default DeleteFood