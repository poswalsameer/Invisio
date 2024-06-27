import multer from "multer";
import nextConnect from 'next-connect';





// CODE TO INTEGRATE MULTER IN NEXT JS APPLICATION TAKEN FROM CHAT GPT

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// const upload = multer.single('file'); 

// apiRoute.use(upload);

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'File uploaded successfully', file: req.file });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };