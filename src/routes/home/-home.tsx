import { Table } from "components/table/table";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { people } from "./-people";

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
    <>
      <Table
        data={people}
        items={(person) => [
          {
            id: "avatar",
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U2akySBgSHUK-foX-9SGFmLk6zEuGYNNqw&s",
          },
          {
            id: "firstName",
            type: "text",
            value: person.firstName,
            heading: "First Name",
          },
          {
            id: "lastName",
            type: "text",
            value: person.lastName,
            heading: "Last Name",
          },
          {
            id: "age",
            type: "text",
            value: person.age,
            heading: "Age",
          },
        ]}
        onRowClick={(data) => alert("Click")}
        keyExtractor={(item) => item.id}
      />
      {/* <div>Controls</div>
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
      /> */}
    </>
  );
};
