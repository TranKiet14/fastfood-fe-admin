import { Button, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { getCookie } from "../../../helpers/cookie";
import { deleteCombo } from "../../../service/Admin/comboService";

function DeleteCombo (props) {
    const { onReload, record } = props;
    const [messageApi, contextHolder] = notification.useNotification()
    const handleDelete = async () => {
        try {
            const accessToken = getCookie("access_token")
            await deleteCombo(accessToken, record._id);
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

export default DeleteCombo