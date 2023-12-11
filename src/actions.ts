import differenceInYears from "date-fns/differenceInYears";

type stateType = {
  userName: string | undefined;
  message: string | undefined;
};
type validateAndUseInputType = {
  success: boolean;
  message: string;
};
type userNameType = validateAndUseInputType;

export const getUserName = async (
  previousState: string | undefined | null,
  formData: FormData
) => {
  //the previousState variable contains the last recorded value of the user's input
  console.log("previous recorded state ", previousState);
  //from the form, retrieve the value of the input with the name "userName"
  const userName = formData.get("userName");
  //finally, return the user's input value for further processing
  return userName?.toString();
};

export const recordInput = async (
  previousState: stateType,
  formData: FormData
) => {
  console.log("previous recorded value ", previousState);

  //get the value of the input with label 'username'
  const userName = formData.get("userName");
  //next, get the value of the textarea with name 'message'
  const message = formData.get("message");

  return { userName: userName?.toString(), message: message?.toString() };
};

export const validateAndUseInput = async (
  _: userNameType,
  formData: FormData
) => {
  //get the value of the date input field:
  const birthdate = formData.get("birthdate")?.toString();

  //check if the field is null:
  if (!birthdate) {
    return { success: false, message: "Please enter a birthdate!" };
  }
  //ise the date-fns library to check if the user is below 18
  const ageDifference = differenceInYears(new Date(), new Date(birthdate));

  if (ageDifference < 18) {
    return {
      success: false,
      message: "You are not an adult! Please try again later",
    };
  }
  //if this is false, then show a success message
  return { success: true, message: "You may proceed" };
};
export const readUsername = async (_: any, formData: FormData) => {
  //mock delay of 1 second:
  await new Promise((res) => setTimeout(res, 1000));
  //get the value of the userName input field:
  const userName = formData.get("userName")?.toString();
  //Make a comparison check. If username is incorrect:
  if (userName !== "LogRocket") {
    return { success: false, message: "Your username is incorrect!" };
  }
  //otherwise, show a success message
  return { success: true, message: "You may proceed" };
};
