import React, { useEffect } from "react";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div>
      <h3>Dashboard Content Goes Here...</h3>
    </div>
  );
};

export default Dashboard;
