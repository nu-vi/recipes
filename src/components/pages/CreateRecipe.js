import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Input, Select } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import { GreenTextField } from '../InputFields';
import { createRecipe } from '../../actions';

const options = [
  { key: ' ', text: ' ', value: ' ' },
  { key: 'un', text: 'un', value: 'un' },
  { key: 'g', text: 'g', value: 'g' },
  { key: 'Kg', text: 'Kg', value: 'Kg' },
  { key: 'ml', text: 'ml', value: 'ml' },
  { key: 'L', text: 'L', value: 'L' },
  { key: 'tbsp', text: 'tbsp', value: 'tbsp' },
  { key: 'tsp', text: 'tsp', value: 'tsp' },
  { key: 'cup', text: 'cup', value: 'cup' },
  { key: 'oz', text: 'oz', value: 'oz' },
  { key: 'gallon', text: 'gallon', value: 'gallon' },
];

const numerals = (number) => {
  if (number === 1) return 'st';
  if (number === 2) return 'nd';
  if (number === 3) return 'rd';
  else return 'th';
};

const CreateRecipe = () => {
  const [ingredientInputs, setIngredientInputs] = useState(0);
  const [stepInputs, setStepInputs] = useState(0);
  const [addStepsButtonClicked, setAddStepsButtonClicked] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues = { title: '', description: '' };

  const handleAddIngredientInput = () => {
    setIngredientInputs(ingredientInputs + 1);
  };

  const handleAddStepsInput = () => {
    setStepInputs(stepInputs + 1);
    setAddStepsButtonClicked(true);
  };

  const handleSubmit = async (formValues) => {
    const response = await dispatch(createRecipe(formValues));

    return response;
  };

  const renderIngredientInput = ({
    values,
    setFieldValue,
    setFieldTouched,
  }) => {
    let inputs = [];
    const handleChange = (e, { name, value }) => setFieldValue(name, value);
    const handleBlur = (e, { name, value }) => setFieldTouched(name, value);

    for (let i = 0; i < ingredientInputs; i++) {
      inputs.push(
        <div key={`ingredientInput${i}`} style={{ padding: '2px 3px 2px 0' }}>
          <Field
            as={Input}
            name={`quantity${i + 1}`}
            value={values[`quantity${i + 1}`] || ''}
            autoFocus
            type="text"
            placeholder="qt"
            style={{ width: '7ch' }}
          />
          <Field
            as={Select}
            name={`unit${i + 1}`}
            value={values[`unit${i + 1}`]}
            onChange={handleChange}
            onBlur={handleBlur}
            compact
            options={options}
            defaultValue=" "
            style={{ backgroundColor: '#e0e1e2' }}
          />
          <Field
            as={Input}
            name={`ingredient${i + 1}`}
            value={values[`ingredient${i + 1}`] || ''}
            placeholder="ingredient"
            style={{ paddingLeft: 6 }}
          />
        </div>
      );
    }
    return <div>{inputs}</div> || null;
  };

  const renderStepInput = ({ values }) => {
    let inputs = [];

    for (let i = 0; i < stepInputs; i++) {
      inputs.push(
        <div key={`stepInput${i}`} style={{ padding: '2px 3px 2px 0' }}>
          <Field
            as={Input}
            name={`step${i + 1}`}
            value={values[`step${i + 1}`] || ''}
            placeholder={`${inputs.length + 1 + numerals(i + 1)} Step`}
            autoFocus
          />
        </div>
      );
    }
    return <div>{inputs}</div> || null;
  };

  return (
    <>
      <h1>New recipe</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues, { setSubmitting }) => {
          handleSubmit(formValues).then((response) => {
            setSubmitting(false);
            if (response.status === 201) {
              history.push('/');
            }
          });
        }}
      >
        {(formikProps) => (
          <Form>
            <div>
              <Field
                name="title"
                as={GreenTextField}
                style={{ paddingBottom: '6px', minWidth: '280px' }}
                label={<strong>Title</strong>}
                id="standard-size-huge"
              />
            </div>
            <div>
              <Field
                name="description"
                as={GreenTextField}
                style={{ paddingBottom: '6px', minWidth: '280px' }}
                label={<strong>Description</strong>}
                multiline
              />
            </div>
            {renderIngredientInput(formikProps)}
            <Button
              type="button"
              onClick={handleAddIngredientInput}
              className="ui button"
              style={{ margin: '6px 0 6px 0' }}
            >
              <i className="icon plus" />
              Add Ingredient
            </Button>
            {renderStepInput(formikProps)}
            <Button
              type="button"
              onClick={handleAddStepsInput}
              className="ui button"
              style={
                addStepsButtonClicked
                  ? { margin: '6px 0px 6px 0px' }
                  : { margin: '0px 0 6px 0' }
              }
            >
              <i className="icon plus" />
              Add Step
            </Button>
            <div>
              <Button type="submit" disabled={formikProps.isSubmitting}>
                Submit
              </Button>
            </div>
            <pre>
              {JSON.stringify(formikProps.values, null, 2)}
              {JSON.stringify(formikProps.errors, null, 2)}
            </pre>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateRecipe;
