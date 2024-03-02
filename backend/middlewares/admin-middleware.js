
const adminMiddleware = async ( req, res, next ) => {

    try{
        
        const isAdmin = req.isAdmin;

        if( !isAdmin){
            return res.json({
                success: false,
                message: "This user is not an Administrator"
            });
        }

        next();
        
    }
    catch( err ){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {adminMiddleware};