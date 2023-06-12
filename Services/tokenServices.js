import jwt from 'jsonwebtoken'
export const generateToken = (payload, secretKey=process.env.SECRET, expiresIn= {expiresIn:'7d'})=>{
    return jwt.sign(payload, secretKey, {expiresIn})
}

export const verifyToken=(token, secretKey)=>{
    return jwt.verify(token, secretKey)
}