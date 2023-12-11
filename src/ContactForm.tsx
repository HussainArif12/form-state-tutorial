import { useEffect } from "react";
import {
  getUserName,
  readUsername,
  recordInput,
  validateAndUseInput,
} from "./actions";
import { useFormState, useFormStatus } from "react-dom";

export const SimpleContactForm: React.FC = () => {
  //pass in our handler function, getUserName as the first parameter.
  //the second parameter is the initial value of the form.
  const [username, formAction] = useFormState(getUserName, null);
  //this Hook returns two variables: userName(the user's input values),
  //and formAction. This will be the function that will run when the user submits the form
  return (
    <div>
      {/*Pass in our formAction function here to the form handler: */}
      <form action={formAction}>
        {/*The input with the name 'userName' will be recorded by the function*/}
        <input name="userName" />
        <input type="submit" />
      </form>
      {/*Display the user's value in the frontend */}
      <p>Recorded input: {username}</p>
    </div>
  );
};
export const ContactForm: React.FC = () => {
  const [data, formAction] = useFormState(recordInput, {
    userName: undefined,
    message: undefined,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <form action={formAction}>
        <p> Please enter your name here</p>
        <input name="userName" />
        <br />
        <p>Now enter your message </p>
        <textarea name="message" />
        <input type="submit" />
      </form>
    </div>
  );
};

export const ContactForm2: React.FC = () => {
  const [data, formAction] = useFormState(validateAndUseInput, {
    success: false,
    message: "Please enter a birthdate",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <form action={formAction}>
        <p> Please enter your birthday</p>
        <input name="birthdate" type="date" />
        <br />
        <input type="submit" />
      </form>
      <p>Success? {data.success ? <span>Yes</span> : <span> No</span>}</p>
      <p>{data.message}</p>
    </div>
  );
};

const ContactFormChild: React.FC = () => {
  //the useFormStatus Hook will inform the client about the status of their form submission
  const data = useFormStatus();
  return (
    <>
      <p> Please enter your username</p>
      {/*The input that we want to record: */}
      <input name="userName" />
      <br />
      {/* If the submission hasn't completed, disable the submit button*/}
      <input type="submit" disabled={data.pending} />
    </>
  );
};

//this component will be rendered to the DOM:
export const ContactFormParent: React.FC = () => {
  //use the useFormState Hook to handle submissions
  const [data, formAction] = useFormState(readUsername, {
    success: false,
    message: "Please enter your username",
  });
  return (
    <div>
      <form action={formAction}>
        {/* Render our form here */}
        <ContactFormChild />
      </form>
      <p>{data.message}</p>
    </div>
  );
};
