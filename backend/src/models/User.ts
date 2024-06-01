import {Schema, model, Document} from "mongoose"

interface IUser extends Document {
  username: string
  password: string
  googleId?: string
}

const userSchema = new Schema<IUser>({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  googleId: {type: String, unique: true, sparse: true}
})

export default model<IUser>("User", userSchema)
