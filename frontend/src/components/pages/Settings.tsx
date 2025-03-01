import React, { useEffect } from "react";

const Settings: React.FC = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <div>
      <h3>Settings Content Goes Here...</h3>
    </div>
  );
};

export default Settings;
