export const handleError = (error: any) => {

  if (error.response.status == 500) {
    return  {
      erroStatus: "Ocorreu um erro tente novamente mais tarde",
      erroDialog: true
    }
  }
  if (error.response.status == 403) {
    return {
      erroStatus: error.response.data.message,
      errors: [],
      erroDialog: true,
    }
  }
  else {
    return {
      errors: error.response.data.errors,
      erroStatus: "",
      erroDialog: true
    }
  }
}
