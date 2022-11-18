import axiosClient from './api/axiosClient'
import postApi from './api/postApi'

console.log('hello from main.js')

async function main() {
  // const response = await axiosClient.get('/posts')
  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    }
    const data = await postApi.getAll(queryParams)
    console.log(data)
  } catch (error) {}

  await postApi.updateFormData({
    id: 'lea2aa9l7x3a5th',
    title: 'Error amet sit 444'
  })
}

main()
