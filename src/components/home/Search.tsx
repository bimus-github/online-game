import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  return (
    <div className={styles.searchDiv}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search ..."
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Search;

const styles = {
  searchDiv:
    "pl-2 p-1 border-[1px] border-black w-[300px] md:w-[200px] mb-5 rounded-lg flex flex-row shadow-lg",
  searchInput: "w-full border-none outline-none",
};
