import * as React from "react";
import api from "./api";
import CurrentUserContext, { UserType } from "./CurrentUserContext";

type UserForm = {
  isSubmitting: boolean;
  email: string;
  password: string;
};
export default function Register() {
  const { setCurrentUser } = React.useContext(CurrentUserContext);
  const [formData, setFormData] = React.useState<UserForm>({
    isSubmitting: false,
    email: "",
    password: "",
  });

  const { isSubmitting, email, password } = formData;

  const handleError = (error: string) => {
    alert(error);
    setFormData({
      ...formData,
      isSubmitting: false,
    });
  };

  const handleRegistration = (evt: React.FormEvent) => {
    evt?.preventDefault();

    if (isValid) {
      setFormData({ ...formData, isSubmitting: true });
      const params = {
        user: {
          email,
          password,
        },
      };
      api
        .post("users", params)
        .then(
          async (response: {
            data: {
              user?: UserType;
              id?: string;
            };
          }) => {
            const { user, id } = response.data;
            console.log("user", user);

            if (user) {
              localStorage.setItem("bottega_workshop_token", id);
              setCurrentUser(user);
            } else {
              handleError("An error occurred");
            }
          }
        )
        .catch((error) => {
          handleError("An error occurred");
          console.error("Registration error", error);
          setFormData({
            ...formData,
            isSubmitting: false,
          });
        });
    } else {
      handleError("Please fill out all fields");
      setFormData({ ...formData });
    }
  };

  const isValid = email && password;

  return (
    <form onSubmit={handleRegistration}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </form>
  );
}
