import { Button } from "components/button/button";
import { useAppStore } from "stores/useAppStore/useAppStore";

export const Home = () => {
  // const { darkMode, showNavbar } = useAppStoreSlice("darkMode", "showNavbar");

  const toggleDarkMode = () => {
    useAppStore.setState((state) => ({
      darkMode: !state.darkMode,
    }));
  };

  const toggleShowNavbar = () => {
    useAppStore.setState((state) => ({
      showNavbar: !state.showNavbar,
    }));
  };

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
      <div>Controls</div>
      <Button
        // label={darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        label="Toggle Dark Mode"
        onClick={toggleDarkMode}
        type="primary"
      />
      <Button
        // label={showNavbar ? "Hide Navbar" : "Show Navbar"}
        // onClick={() => useAppStore.setState({ showNavbar: !showNavbar })}
        label="Toggle Navbar"
        onClick={toggleShowNavbar}
        type="primary"
      />
    </div>
  );
};
