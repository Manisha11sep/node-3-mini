module.exports ={

    createInitalSession: (req,res, next) =>{
        if(!req.session.user)
        {
             req.session.user = {
                    messages: []
            }
        }
           
        next(); 
    }
}