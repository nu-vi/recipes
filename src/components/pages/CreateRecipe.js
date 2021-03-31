import React, { createRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Select } from 'semantic-ui-react';
import { Formik, Form, Field, useField } from 'formik';
import recipes from '../../apis/recipes';

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
  const auth = useSelector((state) => state.auth);
  const initialValues = { title: '' };
  const [addStepsButtonClicked, setAddStepsButtonClicked] = useState(false);

  const addIngredientInput = () => {
    setIngredientInputs(ingredientInputs + 1);
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
        <div key={i} style={{ padding: '2px 3px 2px 15px' }}>
          <Field
            name={`quantity${i + 1}`}
            value={values[`quantity${i + 1}`] || ''}
            as={Input}
            autoFocus
            type="text"
            placeholder="qt"
            style={{ width: '7ch' }}
          />
          <Field
            name={`unit${i + 1}`}
            value={values[`unit${i + 1}`]}
            as={Select}
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

  const addStepsInput = () => {
    setStepInputs(stepInputs + 1);
    setAddStepsButtonClicked(true);
  };

  const renderStepInput = () => {
    let inputs = [];
    for (let i = 0; i < stepInputs; i++) {
      inputs.push(
        <div key={i} style={{ padding: '2px 3px 2px 15px' }}>
          <Input
            placeholder={`${inputs.length + 1 + numerals(i + 1)} Step`}
            autoFocus
          />
        </div>
      );
    }
    return <div>{inputs}</div> || null;
  };

  const createRecipe = async (formValues) => {
    const { userId } = auth;
    const response = await recipes.post('/recipes', { ...formValues, userId });

    console.log(response);
    return response;
  };

  return (
    <>
      <h1>New recipe</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues, { setSubmitting }) => {
          createRecipe(formValues).then((response) => {
            setSubmitting(false);
          });
        }}
      >
        {(formikProps) => (
          <Form>
            <Field name="title" as={Input} style={{ paddingBottom: '6px' }} />
            {renderIngredientInput(formikProps)}
            <Button
              type="button"
              onClick={addIngredientInput}
              className="ui button"
              style={{ margin: '6px 0 6px 0' }}
            >
              <i className="icon plus" />
              Add Ingredient
            </Button>
            {renderStepInput()}
            <Button
              type="button"
              onClick={addStepsInput}
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
