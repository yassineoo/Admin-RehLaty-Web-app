import jwt from 'jsonwebtoken';

const auth = (req, res,next) => {
    /*console.log (req.headers)
    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]);
        const  isCostume = token?.length <500;
        let decodedData ;
    
        if (token && isCostume){
            decodedData = jwt.verify(token, 'secret_key');
            req.touristId = decodedData.id;
        }
       
        else {
         
            decodedData = jwt.decode(token);
            req.touristId =decodedData?.sub
        }
        next();
    } catch (error) {
        console.error(error)
    }*/
    console.log('huuuu');
    next();
}
export default auth ; 