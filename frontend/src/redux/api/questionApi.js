import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: 'https://www.boredapi.com/api/',
  headers: {'Content-Type': 'application/json'}
});

export const getQuestions = async (payload) => {
    try {
      console.log(payload)
      const questions = await axios.get('activity/')
  
      return questions
    } catch(err) {
      return console.error(err)
    }
  }