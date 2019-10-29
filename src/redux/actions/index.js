import { SET_DATA, EXPAND_RECORD, SORT_BY_GROUP, SET_YEAR } from "./types";

export const setData = content => ({
  type: SET_DATA,
  payload: content.data
});

export const expandRecord = content => ({
  type: EXPAND_RECORD,
  payload: {
    targetKey: content.targetKey,
    response: content.response
  }
});

export const sortByGroup = content => ({
  type: SORT_BY_GROUP,
  payload: {
    groupName: content.groupName
  }
});

export const setYear = content => ({
  type: SET_YEAR,
  payload: {
    contextYear: content.contextYear
  }
});

