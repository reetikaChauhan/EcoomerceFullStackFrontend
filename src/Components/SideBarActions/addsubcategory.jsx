import React from "react";
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from '../bars/sidebar'; // Import the Sidebar component

const SubCategory = () => {

  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("useEffect called");
        const response = await axios.get("http://localhost:4000/dashboard/categories");
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    console.log("categories",categories)
  }, []);

  
  const initialValues = {
    name: "",
    parentCategoryId:""
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Sub Category name is required"),
    parentCategoryId: Yup.mixed().required("Category Selection is required")
  });

  const onSubmit = async (values, { setSubmitting,resetForm}) => {
    console.log("hey here are the values", values);
    
    // Ensure the values are not undefined here
   
  
      try {
        const response = await axios.post("http://localhost:4000/dashboard/subcategories", {
          name: values.name,
          category: values.parentCategoryId
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Response:", response.data);
        resetForm();
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar /> {/* Sidebar component included */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Sub Category Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label>Parent Category:</label>
                <Field as="select" name="parentCategoryId">
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>
                    {category.name}
                    </option>
                ))}
                </Field>
                <ErrorMessage name="parentCategoryId" component="div" className="error-message" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubCategory;
