import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from '../bars/sidebar'; // Import the Sidebar component

const Category = () => {

  const initialValues = {
    name: "",
    
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    image: Yup.mixed().required("Image is required")
  });

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("hey here are the values",values)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("croppedImage", values.image);

    try {
      const response = await axios.post("http://localhost:4000/dashboard/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Response:", response.data);
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
                <label htmlFor="name">Category Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="image" component="div" />
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

export default Category;
