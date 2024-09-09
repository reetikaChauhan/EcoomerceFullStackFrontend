import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Yup from "yup";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

const DairyPreferenceForm = () => {
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
  const initialValues = {
    preference_description:"",
    preferences:[]
  };

  const validationSchema = Yup.object({
    preference_description: Yup.string().required("description is required"),
    preferences: Yup.array().min(1, 'Please select at least one preference').required('Required')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("hey here are the values",values)
    const formData = new FormData();

    formData.append("preference_description", values.preference_description);
    formData.append("preferences", values.preferences);
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      data: {},
      params: {
        "preference_description" : values.preference_description,
        "preferences": values.preferences
      }
  }
    try {
      const response = await axios.get("http://localhost:4000/dashboard/getitemsbypref", config);
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error in getting filtered data:", error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', paddingTop: '20px' }} // Adjust paddingTop for reduced space above
    >
      <div className="text-center">
        <h3 className="mb-4">Select your dairy preferences to filter the search</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema} onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={4} sm={6} xs={8} className="mb-3">
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
                </Col>
                <Col md={4} sm={6} xs={8} className="mb-3">
                  <Field
                    as="textarea"
                    name="preference_description"
                    id="preference_description"
                    className="form-control"
                    rows="6"  // Adjust the number of rows for the textarea
                    columns = "12"
                    placeholder="Enter a detailed description here"
                  />
                </Col>
                <Col md={2} sm={4} xs={6} className="mb-3">
                  <Button type="submit" variant="primary" className="w-100">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default DairyPreferenceForm;
