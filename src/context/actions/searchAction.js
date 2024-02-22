export const SET_SEARCH_TERM = (searhTerm) => {
  return {
    type: "SET_SEARCH_TERM",
    searhTerm: searhTerm,
  };
};

export const SET_SEARCH_EMPTY = () => {
  return {
    type: "SET_SEARCH_EMPTY",
  };
};
