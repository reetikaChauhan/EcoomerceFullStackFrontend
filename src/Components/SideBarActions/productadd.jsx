import React from "react";
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from '../bars/sidebar'; // Import the Sidebar component
import Select from 'react-select';

const UploadForm = () => {
  const MultiSelect = ({
    field,
    form,
    options,
    isMulti = false,
    placeholder = 'Select'
}) => {
    function onChange(option) {
        form.setFieldValue(
            field.name,
            option ? (option).map((item) => item.value) : [],
        );
    }

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter((option) => field.value.indexOf(option.value) >= 0)
                : options.find((option) => option.value === field.value);
        } else {
            return isMulti ? [] : ('');
        }
    };

    if (!isMulti) {
        return (
            <Select
                options={options}
                name={field.name}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={(option) => form.setFieldValue(field.name, option.value)}
                onBlur={field.onBlur}
                placeholder={placeholder}
            />
        )
    } else {
        return (
            <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name={field.name}
                value={getValue()}
                onChange={onChange}
                options={options}
                isMulti={true}
                placeholder={placeholder}
            />
        )
    }
}
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
    category_id: "",
    subcategory_id: "",
    price:"",
    stockquantity:"",
    description:"",
    preferences:[],
    image: ""
  };
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Item name is required"),
    category_id: Yup.string().required("Parent category is required"),
    subcategory_id: Yup.string().required("Subcategory is required"),
    price: Yup.string().required("Price is required"),
    stockquantity: Yup.string().required("Stock quantity is required"),
    description: Yup.string().required("description is required"),
    image: Yup.mixed().required("Image is required"),
    preferences: Yup.array().min(1, 'Please select at least one preference').required('Required')
  });
  const handleCategoryChange = async (categoryId, setFieldValue) => {
    setFieldValue('category_id', categoryId);
    setFieldValue('subcategory_id', ''); // Reset subcategory when category changes

    if (categoryId) {
        const response = await axios.get(`http://localhost:4000/dashboard/subcategories/${categoryId}`);
        setSubcategories(response.data);
    } else {
        setSubcategories([]);
    }
};
  const onSubmit = async (values, { setSubmitting,resetForm }) => {
    console.log("hey here are the values",values)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("subcategory_id", values.subcategory_id);
    formData.append("price", values.price);
    formData.append("stockquantity", values.stockquantity);
    formData.append("description", values.description);
    //formData.append("preferences", values.preferences);
    formData.append("image", values.image);
    values.preferences.forEach(pref => {
      formData.append("preferences[]", pref);
  });
    try {
      const response = await axios.post("http://localhost:4000/dashboard/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Response:", response.data);
      resetForm()
    } catch (error) {
      console.error("Error:", error.response.data);
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
                <label htmlFor="name">Item Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
               <div>
                <label htmlFor="category_id">Parent Category:</label>
                <Field as="select" name="category_id"
                onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>
                    {category.name}
                    </option>
                ))}
                </Field>
                <ErrorMessage name="category_id" component="div" className="error-message" />
              </div>
              <div>
                  <label htmlFor="subcategory_id">Subcategory:</label>
                  <Field as="select" name="subcategory_id">
                      <option value="">Select Subcategory</option>
                      {subcategories.map(subcategory => (
                          <option key={subcategory._id} value={subcategory._id}>
                              {subcategory.name}
                          </option>
                      ))}
                  </Field>
                  <ErrorMessage name="subcategory" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <Field type="text" name="price" />
                <ErrorMessage name="price" component="div" />
              </div>
              <div>
                <label htmlFor="stockquantity">Stock Quantity:</label>
                <Field type="text" name="stockquantity" />
                <ErrorMessage name="stockquantity" component="div" />
              </div>
            
            <div>
              <label htmlFor="preference">Item Type:</label>
              <Field
                name="preferences"
                id="preferences"
                placeholder="Multi Select"
                isMulti={true}
                component={MultiSelect}
                options={[
                  { value: 'lactose free', label: 'Lactose free' },
                  { value: 'keto', label: 'Keto' },
                  { value: 'organic', label: 'Organic' },
                  { value: 'vegan', label: 'Vegan' },
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'non-vegetarian', label: 'Non-Vegetarian' }
                ]}
              />
          </div>
              <div>
              <label htmlFor="description">Description:</label>
              <Field
                    as="textarea"
                    name="description"
                    id="description"
                    className="form-control"
                    rows="6"  // Adjust the number of rows for the textarea
                    columns = "12"
                    placeholder="Enter a detailed description here"
                  />
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

export default UploadForm;
