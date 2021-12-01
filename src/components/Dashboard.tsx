import * as React from "react";
import Register from "./Register";

export default function Dashboard() {
  // const content = () => {
  //   if (authIsLoading) {
  //     return <div>Loading...</div>;
  //   } else if (!currentUser) {
  //     return <Register />;
  //   } else {
  //     return (
  //       <div>
  //         <a onClick={handleLogout}>Logout</a>
  //         <div>Welcome, {currentUser.email}</div>
  //       </div>
  //     );
  //   }
  // };
  return (
    <div>
      <Register />
    </div>
  );
}
