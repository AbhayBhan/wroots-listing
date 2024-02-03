import axios from "./axios";

export function ReferSingle(_data){
    const headers = {
        'x-user-id': _data.userId,
      };
    return axios.post('/referRouter/referSingleCandidate',_data,{
        headers : headers
    })
};

export function ReferMultiple(_data){
    return axios.post('/referRouter/referMultipleCandidates', _data);
}
