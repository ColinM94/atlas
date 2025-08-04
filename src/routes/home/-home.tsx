import { Button } from "components/button/button";
import { pickFromAppStore, useAppStore } from "stores/useAppStore/useAppStore";

export const Home = () => {
  const { darkMode, showNavbar } = pickFromAppStore("darkMode", "showNavbar");

  return (
    <div
      style={{
        height: 200,
        width: "100%",
        border: "1px solid dodgerblue",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      Controls
      <Button
        label={darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        onClick={() => useAppStore.setState({ darkMode: !darkMode })}
        type="primary"
      />
      <Button
        label={showNavbar ? "Hide Navbar" : "Show Navbar"}
        onClick={() => useAppStore.setState({ showNavbar: !showNavbar })}
        type="primary"
      />
    </div>
  );
};
