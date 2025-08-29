import React from 'react';
import { useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Formik form submitted successfully:', values);
      alert('Form submitted! Check the console for data.');
    },
  });

  return (
    <Form className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register (Formik)</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <Field
          id="username"
          name="username"
          type="text"
          className="w-full p-2 border rounded"
        />
        <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          className="w-full p-2 border rounded"
        />
        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={formik.isSubmitting}
      >
        Register
      </button>
    </Form>
  );
};

export default FormikForm;