import React from 'react';
import { useFormik } from 'formik';
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
      // This is where you would send data to your API
      console.log('Formik form submitted successfully:', values);
      alert('Form submitted! Check the console for data.');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register (Formik)</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          {...formik.getFieldProps('username')}
          className="w-full p-2 border rounded"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
          className="w-full p-2 border rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={formik.isSubmitting}
      >
        Register
      </button>
    </form>
  );
};

export default FormikForm;