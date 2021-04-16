import { useState } from 'react'

export default function CookieStandForm({ onCreate }) {

  const initialValues = {
    location: '',
    max: 0,
    min: 0,
    avg: 0,
  };

  const [values, setValues] = useState(initialValues);

  function submitHandler(event) {
    event.preventDefault();
    onCreate(values);
    setValues(initialValues)
  }

  function inputChangeHandler(event) {
    let { name, value, type } = event.target;

    if (type === "number") {
      value = parseFloat(value);
    }

    setValues({ ...values, [name]: value });
  }
  return (
    <form onSubmit={submitHandler} className="p-1 mt-8 mb-8 ml-auto mr-auto w-5/6 h-auto rounded-md bg-green-300 text-center self-center">
      <section className="grid grid-cols-2">
        <div className="justify-center">
          <label className="block" htmlFor="location">Add Location</label>
          <input className="" type="text" name="location" id="location" value={values.location} onChange={inputChangeHandler} placeholder="Cookie Stand Location" />
        </div>

        <button className="rounded-md bg-green-500 m-1 w-60" type="submit">Create Stand</button>
      </section>
      <section className="grid grid-cols-3">
        <FormInputSection>
          <label className="block" htmlFor="min">Minimum Customers per Hour</label>
          <input className="w-56" type="number" name="min" id="min" value={values.min} onChange={inputChangeHandler} />
        </FormInputSection>
        <FormInputSection>
          <label className="block" htmlFor="max">Maximum Customers per Hour</label>
          <input className="w-56" type="number" name="max" id="max" value={values.max} onChange={inputChangeHandler} />
        </FormInputSection>
        <FormInputSection>
          <label className="block" htmlFor="avg">Average Cookies per Sale</label>
          <input className="w-56" type="number" name="avg" id="avg" value={values.avg} onChange={inputChangeHandler} />
        </FormInputSection>
      </section>
    </form>
  );
}

function FormInputSection({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}