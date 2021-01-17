
const config = {}

const useProdServer = false;


const server = process.env.NODE_ENV === 'development' ? 
(useProdServer?'https://f19m-rsclone-back.herokuapp.com':'http://127.0.0.1'): 'https://f19m-rsclone-back.herokuapp.com';



export default {server};