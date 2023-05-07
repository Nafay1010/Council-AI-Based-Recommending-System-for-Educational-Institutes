import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "./Search";
import Loading from "./Loading";

const SearchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { universities, dispatch } = useUserContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/search", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_UNIVERSITIES", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
    fetchUsers();
  }, [dispatch, user]);

  return (
    <div className="search-content">
      <div className="search-input">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for Institutes..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="search-list">
        {!universities ? (
          <Loading />
        ) : (
          universities
            .filter((university) => {
              if (searchTerm === "") {
                return true;
              } else if (
                university.university_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return university;
              }
              return false;
            })
            .map((university, key) => {
              return (
                <div>
                  {
                    <Search
                      university={university}
                      key={key}
                      border={"none"}
                      preferred_location={university.campuses}
                      budget={""}
                      interest={""}
                      study_group={""}
                      degree_program={""}
                      matric_marks={""}
                      inter_marks={""}
                      choose={false}
                    />
                  }
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default SearchList;
