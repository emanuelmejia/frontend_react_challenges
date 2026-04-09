export const initialLists = () => ({
  characters: [],
  planets: [],
});

const listsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CHARS":
      return { ...state, characters: [...state.characters, action.payload] };
    case "ADD_PLANETS":
      return { ...state, planets: [...state.planets, action.payload] };
    case "RESET_CHARS":
      return { ...state, characters: action.payload };
    case "RESET_PLANETS":
      return { ...state, planets: action.payload };
    default:
      return state;
  }
};

export default listsReducer;
