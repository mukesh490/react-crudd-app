import React, {  useState } from 'react'
import { Formik, Form, Field } from 'formik'

export default function Crud() {
    const [formData, setFormData] = useState([]);
    const [editUser, setEditUser] = useState(null)
    const handleSubmit = (values, resetForm) => {
        const data = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            id: Date.now()
        }

        if (!editUser) {
            setFormData((pre) => [...pre, data])
            resetForm();
        } else {

            setFormData((prev) => {

                return prev.map((user) => {
                    if (user.id === editUser.id) {
                        return { ...user, ...values };
                    }
                    return user;
                });
            });
            resetForm();
            setEditUser(null)

        }


    }


    const editDetail = (user) => {
        setEditUser(user);
    }

    const deleteDetail = (id) => {

        const deleteData = formData.filter((user) => user.id !== id);
        setFormData(deleteData)
        setEditUser(null)


    }

    return (
        <div className=' min-h-screen bg-gray-100 flex  justify-center item-start py-10'>
            <div className='w-full max-w-3xl bg-white shadow-lg rounded-lg p-6'>
                <h1 className='text-center text-2xl font-semibold mb-6'>Add user</h1>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: editUser?.name || '',
                        email: editUser?.email || '',
                        phone: editUser?.phone || ''
                    }}
                    // validationSchema={PostSchema},
                    onSubmit={(values, { resetForm }) =>
                        handleSubmit(values, resetForm)
                    }
                >
                    {({ setFieldValue, isSubmitting, values, resetForm }) => (
                        <Form className="space-y-4" >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <Field type='text' name='name' placeholder="Enter name" className='w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Field type='email' name='email' placeholder="Enter email" className='w-full border rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <Field type='number' name='phone' placeholder="Enter phone No" className='w-full border rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>


                            <button type='submit' className={`w-full py-2 rounded-md text-white font-semibold
                                   ${editUser
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-blue-600 hover:bg-blue-700"}
                                  transition` }>{!editUser ? 'Submit' : "update"}</button>
                        </Form>
                    )}

                </Formik>
                {
                    formData.length > 0 && (
                        <div className="mt-8 overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                                <thead className="bg-gray-200">
                                    <th className="text-left px-4 py-2">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Phone</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </thead>
                                <tbody>
                                    {
                                        formData.map((user, i) => {
                                            return (
                                                <tr key={user?.id} className="border-t hover:bg-gray-50">
                                                    <td className="px-4 py-2">{user?.name}</td>
                                                    <td className="px-4 py-2">{user?.email}</td>
                                                    <td className="px-4 py-2">{user?.phone}</td>
                                                    <td className="px-4 py-2 flex justify-center gap-2">
                                                        <button className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600" onClick={() => editDetail(user)}>Edit</button>
                                                        <button className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700" onClick={() => deleteDetail(user?.id)}>Delete</button>

                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    )
                }
            </div>
        </div>

    )
}





