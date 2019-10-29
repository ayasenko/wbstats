import { SET_DATA, EXPAND_RECORD, SORT_BY_GROUP, SET_YEAR } from "../actions/types";

const initialState = {
  contextYear: '2018',
  sorting: {
    direction: 'desc',
    groupName: 'population'
  },
  data: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.payload
      };
    }
    case EXPAND_RECORD: {
      const { data } = state;
      const { targetKey, response } = action.payload;
      const newData = {}
      Object.keys(data).map(itemKey => {
        const item = data[itemKey];
        item.expanded = item.key === targetKey && !item.expanded ? true : false;
        item.extract = item.key === targetKey ? response.extract : '';
        newData[itemKey] = item;
      });

      return {
        ...state,
        data: newData
      };
    }
    case SORT_BY_GROUP: {      
      const { data, contextYear, sorting } = state;
      const { direction } = sorting;
      const { groupName } = action.payload;
      const sortedArray = Object.keys(data).sort((firstKey, secondKey) => {
        const first = data[firstKey][groupName];
        const second = data[secondKey][groupName];
        const a = first ? first[contextYear] ? first[contextYear] : 0 : null;
        const b = second ? second[contextYear] ? second[contextYear] : 0 : null;
        
        return direction === 'asc' ? b - a : a - b;
      });
      const newData = {}
      sortedArray.forEach(itemKey => newData[itemKey] = data[itemKey]);

      return {
        ...state,
        data: newData,
        sorting: {
          direction: direction === 'asc' ? 'desc' : 'asc',
          groupName
        }
      }
    }
    case SET_YEAR: {      
      const { contextYear } = action.payload;
      console.log({ contextYear })
      return {
        ...state,
        contextYear
      }
    }
    default:
      return state;
  }
}
