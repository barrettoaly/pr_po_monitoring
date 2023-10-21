import React from "react";

export const PasswordValidator = ({ observe, setPassnotvalid, password }) => {
  if (observe) {
    // Check if all conditions are met
    const isValidPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);

    if (isValidPassword) {
      // Set the state to false if all conditions are met
      setPassnotvalid(false);
    } else {
      setPassnotvalid(true);
    }

    return (
      <>
        <div style={{ padding: "4px", color: "#F15A59", fontSize: "12px" }}>
          <ul>
            {password.length < 8 && (
              <li> Must be at least 8 characters long.</li>
            )}
            {!/[A-Z]/.test(password) && (
              <li> Must contain at least one uppercase letter.</li>
            )}
            {!/[a-z]/.test(password) && (
              <li> Must contain at least one lowercase letter.</li>
            )}
            {!/\d/.test(password) && (
              <li> Must contain at least one number.</li>
            )}
          </ul>
        </div>
      </>
    );
  }

  return null;
};
