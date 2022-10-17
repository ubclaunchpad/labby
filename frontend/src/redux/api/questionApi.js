import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: 'https://google.com/',
  headers: {'Content-Type': 'application/json'}
});

export const getQuestions = async () => {
    try {
      const questions = await axios.get('question')
  
      return questions.data
    } catch(err) {
      return console.error(err)
    }
  }