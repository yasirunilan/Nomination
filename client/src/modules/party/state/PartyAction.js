import {
  PARTY_LIST_LOADED,
  POST_PARTY_DATA,
  GET_PARTY_DETAILS,
  PUT_PARTY_DETAILS,
  DELETE_PARTY_DETAILS,
  GET_PARTY_LOGO,
} from "./PartyTypes";
import {API_BASE_URL,PDF_GENARATION_SERVICE_URL} from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';
import {saveAs} from 'file-saver';


//get party list for nomination review
const partyListLoaded = (partyList) => {
  return {
    type: PARTY_LIST_LOADED,
    payload: partyList,
  };
};

export function getTeams() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/teams`,
    )
    .then(response => {
      const partyList = response.data;
       dispatch(partyListLoaded(partyList));
    }).catch(err => {
          console.log(err)
    });
  };
}

//insert party
export const setData = (val) => {
  return {
      type: POST_PARTY_DATA,
      payload: val
  }
}

export function saveParty(partyDetails) {
  return function (dispatch) {

      let partyData = {
          partyName: partyDetails.partyName,
          partyType: partyDetails.partyType,
          title:partyDetails.title,
          address:partyDetails.address,
          abbreviation:partyDetails.abbreviation,
          approvedSymbol: partyDetails.approvedSymbol,
          filePath: 'upload',
          createdBy:sessionStorage.getItem('user'),
          createdAt:Date.parse(new Date()),
          updatedAt:Date.parse(new Date()),
          secretaryName: partyDetails.secretaryName,
          phoneList: partyDetails.phoneList,
          faxList: partyDetails.faxList,
          fileName:partyDetails.filename,
          originalname:partyDetails.currentSdocId
      };
    const response = axios
    .post(
      `${API_BASE_URL}/teams`,
          {...partyData}
    )
    .then(response => {
      let newPartyData = {
        team_id: response.data.id,
        team_name: partyDetails.partyName,
        team_abbrevation:partyDetails.abbreviation,
        team_party_type: partyDetails.partyType
    };
       dispatch(setData(newPartyData));
       dispatch(openSnackbar({ message:`New party has been registered successfully!`}));
    }).catch(err => {
          console.log(err)
    });
  };
}

//insert party
export const setUpdateData = (val) => {
  return {
      type: PUT_PARTY_DETAILS,
      payload: val
  }
}

export function updateParty(teamId,partyDetails) {
  return function (dispatch) {

      let partyData = {
          partyName: partyDetails.partyName,
          partyType: partyDetails.partyType,
          title:partyDetails.title,
          address:partyDetails.address,
          abbreviation:partyDetails.abbreviation,
          approvedSymbol: partyDetails.approvedSymbol,
          filePath: 'upload',
          updatedAt:Date.parse(new Date()),
          secretaryName: partyDetails.secretaryName,
          phoneList: partyDetails.phoneList,
          faxList: partyDetails.faxList,
          fileName:partyDetails.filename,
          originalname:partyDetails.currentSdocId
      };
    const response = axios
    .put(
      `${API_BASE_URL}/teams/${teamId}`,
          {...partyData}
    )
    .then(response => {
      let newPartyData = {
        team_id: response.data.id,
        team_name: partyDetails.partyName,
        team_abbrevation:partyDetails.abbreviation,
        team_party_type: partyDetails.partyType
    };
       dispatch(setUpdateData(newPartyData));
       dispatch(openSnackbar({ message:`The party has been updated successfully!`}));
    }).catch(err => {
          console.log(err)
    });
  };
}
//get party details for a particular party
const partyDetailsLoaded = (partyDetails) => {
  return {
    type: GET_PARTY_DETAILS,
    payload: partyDetails,
  };
};

export function getPartyDetails(teamId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/teams/${teamId}`,
    )
    .then(response => {
      const partyDetails = response.data;
       dispatch(partyDetailsLoaded(partyDetails));
    }).catch(err => {
          console.log(err)
    });
  };
}

//--------------- Start of Delete Party -------------
export const setDeleteParty = (getDeletedParty) => {
  return {
      type: DELETE_PARTY_DETAILS,
      payload: getDeletedParty
  }
}

export function deleteParty(teamId) {
    return function (dispatch) {
       
      const response = axios
      .delete(
        `${API_BASE_URL}/teams/${teamId}`,
      )
      .then(response => {
        const getDeletedParty = response.data;
         dispatch(
          setDeleteParty(getDeletedParty)
           );
           dispatch(openSnackbar({ message: "Candidate was deleted successfully!"}));
      }).catch(err => {
        const getDeletedParty = [];
        dispatch(
          setDeleteParty(getDeletedParty)
          );
        dispatch(openSnackbar({ message: err.response.data.message }));
            console.log(err)
      });
    };
  }
//--------------- End of Delete Party -------------

//get party details for a particular party
const partyLogoLoaded = (partyLogo) => {
  return {
    type: GET_PARTY_LOGO,
    payload: partyLogo,
  };
};

export function getPartyLogo(sid) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/image-download/${sid}`,
    )
    .then(response => {
      const partyLogo = response.config;
       dispatch(partyLogoLoaded(partyLogo));
    }).catch(err => {
          console.log(err)
    });
  };
}