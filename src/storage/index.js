let token = ""

export default {


  setToken: (newToken) => {
    token = newToken
    localStorage.setItem('token', newToken)
  },

  getToken: ()=>{
    if(token===""){
      return localStorage.getItem('token')
    }else{
      return token
    }
  }


}

