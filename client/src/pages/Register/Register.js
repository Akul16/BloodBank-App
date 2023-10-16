import { Form, Input, Button, Radio, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrgHospitalForm from './OrgHospitalForm'
import { RegisterUser } from '../../api/users'
import { getAntdInputValidation } from "../../utils/helpers";
import { SetLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

const Register = () => {
    const [type, setType] = React.useState("donor");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            const response = await RegisterUser({ ...values, userType: type });
            dispatch(SetLoading(false));
            if (response.success) {
                message.success(response.message);
                navigate("/login");
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <div className='flex h-screen items-center justify-center bg-primary'>
            <Form layout="verical" className='bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2' onFinish={onFinish}>
                <h1 className='col-span-2 uppercase text-2xl'><span className="text-primary">{type.toUpperCase()} - Registration</span><hr /></h1>
                <Radio.Group onChange={(e) => setType(e.target.value)}
                    value={type}
                    className="col-span-2"
                >
                    <Radio value="donor">Donor</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>
                {type === 'donor' && (
                    <>
                        {" "}
                        <Form.Item label="Name" name="name" rules={getAntdInputValidation()}><Input /></Form.Item>
                        <Form.Item label="Email" name="email" rules={getAntdInputValidation()}><Input /></Form.Item>
                        <Form.Item label="Phone" name="phone" rules={getAntdInputValidation()}><Input /></Form.Item>
                        <Form.Item label="Password" name="password" rules={getAntdInputValidation()}><Input /></Form.Item>
                    </>
                )}

                {type !== 'donor' && <OrgHospitalForm type={type} />}
                <Button type="primary" block className='col-span-2 bg-primary' htmlType="submit">Register</Button>
                <Link to="/login" className="col-span-2 text-center text-gray-700 underline">Already have an account? Login</Link>
            </Form>
        </div>
    )
}

export default Register