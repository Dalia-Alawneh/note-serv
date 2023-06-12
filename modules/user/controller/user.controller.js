import userModel from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs'
import { changePassSchema } from "../user.validation.js"

/*** */
export const getUser = async (req, res) => {
    const user = await userModel.findById(req.id).select(['name', 'email'])
    return res.status(200).json({ message: "user", user })
}



export const deleteUser = async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.id)
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: "user deleted", user })
}


export const updateUser = async (req, res) => {
    let { name } = req.body
    const user = await userModel.findById(req.id)
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    let newUser = await userModel.findByIdAndUpdate(req.id, {name}, {new:true})
    return res.json({ message: 'Info Updated successfully', newUser });
}

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body
    let validator = changePassSchema.validate(req.body)
    let {value, error} = validator
    let isValid = error == null
    if(!isValid){
        return res.json({message:"validation Error", error})
    }
    const user = await userModel.findById(req.id)
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = bcrypt.compareSync(currentPassword, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid current password' })
    }
    let hashNew = await bcrypt.hash(newPassword, parseInt(process.env.SALT))
    await userModel.updateOne({ _id: user.id }, { $set: { password: hashNew } })
    return res.json({ message: 'Password changed successfully' });
}

