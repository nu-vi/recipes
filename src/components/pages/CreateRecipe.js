import React, { createRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Select } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import recipes from '../../apis/recipes';

const options = [
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

/*
  useEffect(() => {
    if (inputRefs[inputRefs.length - 1]) {
      inputRefs[inputRefs.length - 1].current.focus();
    }
  }, [inputRefs]);
*/

  const addIngredientInput = () => {
    setIngredientInputs(ingredientInputs + 1);
  };

  const renderIngredientInput = () => {
    let inputs = [];

    for (let i = 0; i < ingredientInputs; i++) {
      inputs.push(
        <div key={i} style={{ padding: '2px 3px 2px 15px' }}>
          <Field
            name={`ingredient${i + 1}`}
            as={Input}
            autoFocus
            type="text"
            placeholder="qt"
            style={{ width: '7ch' }}
          />
          <Select
            compact
            options={options}
            defaultValue="un"
            style={{ backgroundColor: '#e0e1e2' }}
          />
          <Input placeholder="ingredient" style={{ paddingLeft: 6 }} />
        </div>
      );
    }
    return <div>{inputs}</div> || null;
  };

  const addStepsInput = () => {
    setStepInputs(stepInputs + 1);
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

  const initialValues = () => {
    return { title: '' };
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
        initialValues={initialValues()}
        onSubmit={(formValues, { setSubmitting }) => {
          createRecipe(formValues).then((response) => {
            setSubmitting(false);
          });
        }}
      >
        {(formikProps) => (
          <Form>
            <Field name="title" as={Input} style={{ paddingBottom: '6px' }} />
            {renderIngredientInput()}
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
              style={{ margin: '6px 0 6px 0' }}
            >
              <i className="icon plus" />
              Add Step
            </Button>
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
