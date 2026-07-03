import { asyncHandler } from "../util/asyncHandler.js";
import { Profile } from "../model/profile.model.js";
import { apiResponse } from "../util/apiResponse.js";

const getData = asyncHandler( async (req , res)=>{

    const user = await Profile.find().select("-marks.subjects").lean();

    return res.json(
        new apiResponse(
            200 ,
            user,
            "Data fetched Successfully"
        )

    )

})

export { getData }