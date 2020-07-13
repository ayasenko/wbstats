import {
  SET_DATA,
  EXPAND_RECORD,
  SORT_BY_GROUP,
  SET_YEAR,
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_WIKI_DATA,
  FETCH_WIKI_DATA_SUCCESS,
  FETCH_WIKI_DATA_FAILURE,
  COLLAPSE_RECORDS
} from "./types";
import { getData, getWikiExtract } from "../../helpers";
import { wikiApi } from "../../api";

export const fetchData = content => {
  return dispatch => {
    dispatch({ type: FETCH_DATA });

    getData(content.year, content.itemsCount)
      .then(data => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: FETCH_DATA_FAILURE });
      });
  };
};

export const fetchDataSuccess = content => ({
  type: FETCH_DATA_SUCCESS,
  payload: content.data
});

export const fetchDataFailure = content => ({
  type: FETCH_DATA_FAILURE
});

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

export const fetchWikiData = content => {
  return dispatch => {
    dispatch({ type: FETCH_WIKI_DATA });

    const { name, key } = content;
    wikiApi
      .getShortWikiInfo(name)
      .then(response => {
        dispatch({ type: FETCH_WIKI_DATA_SUCCESS });
        dispatch({
          type: EXPAND_RECORD,
          payload: {
            targetKey: key,
            response: getWikiExtract(response)
          }
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: FETCH_WIKI_DATA_FAILURE });
      });
  };
};

export const collapseRecords = () => ({
  type: COLLAPSE_RECORDS
});
