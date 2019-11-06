import axios from 'axios';
import host from '../constains/host'

export const addFile = file => ({
    type: 'CHANGE_FILE',
    file,
  })
  
  export const uploadFile = url => ({
      type: 'UPLOAD_FILE',
      url
  })
  export const uploadFileFail = () => ({
    type: 'UPLOAD_FILE_FAIL',
})
  
  export const upFile = (filename,token) => {
    const formData = new FormData();
    formData.append("avatar", filename);
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return (dispatch) => {
        axios.post(`${host}/upload/avatar`, formData, config)
            .then(res => {
                dispatch(uploadFile(res.data))
            })
            .catch(()=>dispatch(uploadFileFail()))
    };
}