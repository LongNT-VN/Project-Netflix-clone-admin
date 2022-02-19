import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListAction";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/list/get");
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const deleteList = async (id,dispatch) => {
    dispatch(deleteListStart());
    try {
      await axios.delete("/list/delete/"+ id,{
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }});
      dispatch(deleteListSuccess(id));
    } catch (err) {
      dispatch(deleteListFailure());
    }
  };

// create List

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/list/create",list, {headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken}});
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//update List 

export const updateList = async (id,list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put("/list/update/"+id,list, {headers: {token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken}});
    dispatch(updateListSuccess(res.data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};